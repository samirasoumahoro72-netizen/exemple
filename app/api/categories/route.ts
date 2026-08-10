import { NextResponse } from 'next/server';
import { DEMO_CATEGORIES } from '@/lib/data/coursesData';

export async function GET() {
  return NextResponse.json({ success: true, data: DEMO_CATEGORIES });
}
