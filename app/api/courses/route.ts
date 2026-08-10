import { NextResponse } from 'next/server';
import { DEMO_COURSES } from '@/lib/data/coursesData';
import { courseSchema } from '@/lib/validations/course';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const level = searchParams.get('level');
  const query = searchParams.get('q')?.toLowerCase();

  let courses = [...DEMO_COURSES];

  if (category && category !== 'all') {
    courses = courses.filter((c) => c.category?.slug === category);
  }

  if (level && level !== 'all') {
    courses = courses.filter((c) => c.level === level);
  }

  if (query) {
    courses = courses.filter(
      (c) =>
        c.title.toLowerCase().includes(query) ||
        c.description.toLowerCase().includes(query)
    );
  }

  return NextResponse.json({ success: true, count: courses.length, data: courses });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = courseSchema.parse(body);

    const newCourse = {
      id: `course-${Date.now()}`,
      title: validatedData.title,
      slug: validatedData.title.toLowerCase().replace(/\s+/g, '-'),
      description: validatedData.description,
      full_content: validatedData.fullContent || validatedData.description,
      price: validatedData.price,
      level: validatedData.level,
      image_url: validatedData.imageUrl || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80',
      duration_hours: validatedData.durationHours,
      lessons_count: validatedData.lessonsCount,
      rating: 5.0,
      is_featured: validatedData.isFeatured,
      created_at: new Date().toISOString(),
    };

    return NextResponse.json({ success: true, data: newCourse }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.errors || 'Données invalides' },
      { status: 400 }
    );
  }
}
