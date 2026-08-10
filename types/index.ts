export type UserRole = 'student' | 'instructor' | 'admin';
export type CourseLevel = 'Beginner' | 'Intermediate' | 'Advanced';
export type EnrollmentStatus = 'active' | 'completed' | 'cancelled';

export interface Profile {
  id: string;
  full_name: string;
  avatar_url?: string;
  role: UserRole;
  bio?: string;
  created_at: string;
  updated_at?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  course_count: number;
  created_at?: string;
}

export interface Course {
  id: string;
  title: string;
  slug: string;
  description: string;
  full_content?: string;
  price: number;
  category_id?: string;
  category?: Category;
  instructor_id?: string;
  instructor?: Profile;
  level: CourseLevel;
  image_url: string;
  duration_hours: number;
  lessons_count: number;
  rating: number;
  is_featured: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface Enrollment {
  id: string;
  user_id: string;
  course_id: string;
  course?: Course;
  progress: number;
  status: EnrollmentStatus;
  created_at: string;
}

export interface Review {
  id: string;
  user_id: string;
  user?: Profile;
  course_id: string;
  rating: number;
  comment: string;
  created_at: string;
}

export interface ContactMessage {
  id?: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status?: string;
  created_at?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  date: string;
  image_url: string;
  read_time: string;
}
