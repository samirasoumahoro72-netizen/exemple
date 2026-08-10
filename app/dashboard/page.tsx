'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { DEMO_COURSES } from '@/lib/data/coursesData';
import { Course } from '@/types';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { courseSchema, CourseInput } from '@/lib/validations/course';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  GraduationCap,
  BookOpen,
  Award,
  PlusCircle,
  PlayCircle,
  CheckCircle2,
  BarChart2,
  Users,
  DollarSign,
  X,
  Plus,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<'my-courses' | 'certificates' | 'manage'>('my-courses');
  const [enrolledCourses, setEnrolledCourses] = useState<Course[]>([
    DEMO_COURSES[0],
    DEMO_COURSES[1],
  ]);
  const [coursesList, setCoursesList] = useState<Course[]>(DEMO_COURSES);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => {
      if (data?.user) {
        setUser(data.user);
      }
    });
  }, []);

  // Form handling for adding a course
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CourseInput>({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      price: 49.99,
      durationHours: 12,
      lessonsCount: 15,
      level: 'Beginner',
      categorySlug: 'design',
      isFeatured: false,
    },
  });

  const onCreateCourse = async (data: CourseInput) => {
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 800));

    const newCourse: Course = {
      id: `course-${Date.now()}`,
      title: data.title,
      slug: data.title.toLowerCase().replace(/\s+/g, '-'),
      description: data.description,
      full_content: data.fullContent || data.description,
      price: data.price,
      level: data.level,
      image_url: data.imageUrl || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80',
      duration_hours: data.durationHours,
      lessons_count: data.lessonsCount,
      rating: 5.0,
      is_featured: data.isFeatured,
      created_at: new Date().toISOString(),
    };

    setCoursesList([newCourse, ...coursesList]);
    setIsSubmitting(false);
    setIsModalOpen(false);
    reset();
  };

  return (
    <div className="py-10 bg-slate-50 dark:bg-slate-950 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6">
        {/* User Header Profile Banner */}
        <Card className="p-6 mb-8 bg-gradient-to-r from-slate-900 to-slate-800 text-white border-slate-800 shadow-xl">
          <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6">
            <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
              <div className="relative h-20 w-20 overflow-hidden rounded-full border-4 border-elab-500 shadow-md">
                <Image
                  src={
                    user?.user_metadata?.avatar_url ||
                    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80'
                  }
                  alt="Avatar"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <div className="flex items-center gap-2 justify-center sm:justify-start">
                  <h1 className="text-2xl font-extrabold">
                    {user?.user_metadata?.full_name || 'Étudiant E-Lab'}
                  </h1>
                  <Badge variant="default" className="capitalize">
                    {user?.user_metadata?.role || 'Apprenant'}
                  </Badge>
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  {user?.email || 'compte.demo@e-lab.com'}
                </p>
                <p className="text-xs text-slate-300 mt-2">
                  Inscrit le {new Date().toLocaleDateString('fr-FR')}
                </p>
              </div>
            </div>

            <Button
              className="gap-2 bg-elab-500 hover:bg-elab-600 font-bold"
              onClick={() => setIsModalOpen(true)}
            >
              <Plus className="h-4 w-4" /> Créer un cours
            </Button>
          </div>
        </Card>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="p-5 flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-elab-100 text-elab-600 dark:bg-elab-950 dark:text-elab-400 font-bold">
              <BookOpen className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs text-slate-500">Cours inscrits</p>
              <h4 className="text-2xl font-black text-slate-900 dark:text-white">
                {enrolledCourses.length}
              </h4>
            </div>
          </Card>

          <Card className="p-5 flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400 font-bold">
              <CheckCircle2 className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs text-slate-500">Formations complétées</p>
              <h4 className="text-2xl font-black text-slate-900 dark:text-white">1</h4>
            </div>
          </Card>

          <Card className="p-5 flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100 text-amber-600 dark:bg-amber-950 dark:text-amber-400 font-bold">
              <Award className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs text-slate-500">Certificats obtenus</p>
              <h4 className="text-2xl font-black text-slate-900 dark:text-white">1</h4>
            </div>
          </Card>

          <Card className="p-5 flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-100 text-purple-600 dark:bg-purple-950 dark:text-purple-400 font-bold">
              <BarChart2 className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs text-slate-500">Progression moyenne</p>
              <h4 className="text-2xl font-black text-slate-900 dark:text-white">65%</h4>
            </div>
          </Card>
        </div>

        {/* Dashboard Tabs */}
        <div className="border-b border-slate-200 dark:border-slate-800 flex gap-6 mb-6">
          <button
            onClick={() => setActiveTab('my-courses')}
            className={`pb-3 font-bold text-sm border-b-2 transition-colors ${
              activeTab === 'my-courses'
                ? 'border-elab-600 text-elab-600 dark:text-elab-400'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            Mes Cours ({enrolledCourses.length})
          </button>
          <button
            onClick={() => setActiveTab('certificates')}
            className={`pb-3 font-bold text-sm border-b-2 transition-colors ${
              activeTab === 'certificates'
                ? 'border-elab-600 text-elab-600 dark:text-elab-400'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            Certificats
          </button>
          <button
            onClick={() => setActiveTab('manage')}
            className={`pb-3 font-bold text-sm border-b-2 transition-colors ${
              activeTab === 'manage'
                ? 'border-elab-600 text-elab-600 dark:text-elab-400'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            Gestion des Cours ({coursesList.length})
          </button>
        </div>

        {/* Tab 1: Enrolled Courses */}
        {activeTab === 'my-courses' && (
          <div className="space-y-4">
            {enrolledCourses.map((course, idx) => {
              const progress = idx === 0 ? 75 : 40;
              return (
                <Card key={course.id} className="p-5 flex flex-col md:flex-row items-center gap-6">
                  <div className="relative h-28 w-44 shrink-0 overflow-hidden rounded-xl bg-slate-100">
                    <Image
                      src={course.image_url}
                      alt={course.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 w-full">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="default">{course.category?.name}</Badge>
                      <span className="text-xs text-slate-400">{course.lessons_count} leçons</span>
                    </div>
                    <h3 className="font-bold text-lg text-slate-900 dark:text-slate-100">
                      {course.title}
                    </h3>
                    {/* Progress bar */}
                    <div className="mt-3 w-full">
                      <div className="flex justify-between text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                        <span>Progression</span>
                        <span>{progress}%</span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                        <div
                          className="h-full bg-elab-600 transition-all duration-500 rounded-full"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </div>
                  </div>
                  <Link href={`/courses/${course.id}`}>
                    <Button className="gap-2 shrink-0 w-full md:w-auto font-semibold">
                      <PlayCircle className="h-4 w-4" /> Continuer
                    </Button>
                  </Link>
                </Card>
              );
            })}
          </div>
        )}

        {/* Tab 2: Certificates */}
        {activeTab === 'certificates' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6 border-2 border-dashed border-elab-300 dark:border-elab-900 bg-white dark:bg-slate-900 text-center">
              <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-amber-100 text-amber-600 dark:bg-amber-950 dark:text-amber-400">
                <Award className="h-8 w-8" />
              </div>
              <h4 className="font-bold text-lg text-slate-900 dark:text-slate-100">
                Certificat de Réussite - Design Principles Essentials
              </h4>
              <p className="text-xs text-slate-500 mt-1">Délivré le {new Date().toLocaleDateString('fr-FR')}</p>
              <Button variant="outline" className="mt-4 gap-2">
                Télécharger le Certificat (PDF)
              </Button>
            </Card>
          </div>
        )}

        {/* Tab 3: Manage Courses */}
        {activeTab === 'manage' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-lg text-slate-900 dark:text-slate-100">
                Catalogue Global & Cours Créés
              </h3>
              <Button onClick={() => setIsModalOpen(true)} className="gap-2">
                <Plus className="h-4 w-4" /> Ajouter un nouveau cours
              </Button>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
              <table className="w-full text-left text-sm text-slate-600 dark:text-slate-300">
                <thead className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 text-xs font-bold uppercase tracking-wider text-slate-500">
                  <tr>
                    <th className="p-4">Cours</th>
                    <th className="p-4">Catégorie</th>
                    <th className="p-4">Niveau</th>
                    <th className="p-4">Prix</th>
                    <th className="p-4">Note</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {coursesList.map((c) => (
                    <tr key={c.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                      <td className="p-4 font-bold text-slate-900 dark:text-slate-100">
                        {c.title}
                      </td>
                      <td className="p-4">
                        <Badge variant="outline">{c.category?.name || 'Général'}</Badge>
                      </td>
                      <td className="p-4 text-xs font-medium">{c.level}</td>
                      <td className="p-4 font-bold text-elab-600">{c.price} $</td>
                      <td className="p-4 font-semibold text-amber-500">★ {c.rating}</td>
                      <td className="p-4 text-right space-x-2">
                        <Link href={`/courses/${c.id}`}>
                          <Button size="sm" variant="ghost">Voir</Button>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Modal Create Course */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-sm p-4 animate-fade-in">
            <Card className="w-full max-w-xl p-6 bg-white dark:bg-slate-900 shadow-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between border-b border-slate-200 pb-4 mb-4 dark:border-slate-800">
                <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                  Créer un Nouveau Cours
                </h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-1 rounded-full text-slate-400 hover:bg-slate-100"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit(onCreateCourse)} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 dark:text-slate-300 mb-1">
                    Titre du cours *
                  </label>
                  <Input
                    placeholder="Ex: Maîtriser React et Next.js 14"
                    {...register('title')}
                    error={errors.title?.message}
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 dark:text-slate-300 mb-1">
                    Description courte *
                  </label>
                  <Textarea
                    placeholder="Résumer l'objectif principal du cours..."
                    {...register('description')}
                    error={errors.description?.message}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-700 dark:text-slate-300 mb-1">
                      Prix ($) *
                    </label>
                    <Input
                      type="number"
                      step="0.01"
                      {...register('price')}
                      error={errors.price?.message}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-700 dark:text-slate-300 mb-1">
                      Niveau
                    </label>
                    <select
                      {...register('level')}
                      className="w-full h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm dark:border-slate-800 dark:bg-slate-950"
                    >
                      <option value="Beginner">Débutant</option>
                      <option value="Intermediate">Intermédiaire</option>
                      <option value="Advanced">Avancé</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-700 dark:text-slate-300 mb-1">
                      Durée (Heures) *
                    </label>
                    <Input
                      type="number"
                      {...register('durationHours')}
                      error={errors.durationHours?.message}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-700 dark:text-slate-300 mb-1">
                      Nombre de leçons *
                    </label>
                    <Input
                      type="number"
                      {...register('lessonsCount')}
                      error={errors.lessonsCount?.message}
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsModalOpen(false)}
                  >
                    Annuler
                  </Button>
                  <Button type="submit" isLoading={isSubmitting}>
                    Publier le cours
                  </Button>
                </div>
              </form>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
