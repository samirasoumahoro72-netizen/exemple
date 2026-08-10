import { DEMO_COURSES } from '@/lib/data/coursesData';
import { CourseDetailView } from '@/components/course-detail-view';

export function generateStaticParams() {
  return DEMO_COURSES.map((course) => ({
    id: course.id,
  }));
}

export default function CourseDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const courseId = params?.id;
  const course = DEMO_COURSES.find((c) => c.id === courseId || c.slug === courseId) || DEMO_COURSES[0];

  return <CourseDetailView course={course} />;
}
