'use client';

import { useState } from 'react';
import { Course } from '@/types';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useCartStore } from '@/lib/store/useCartStore';
import { formatPrice } from '@/lib/utils';
import {
  Star,
  Clock,
  BookOpen,
  CheckCircle,
  ShieldCheck,
  Award,
  PlayCircle,
  ShoppingBag,
  ArrowLeft,
  Check,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface CourseDetailViewProps {
  course: Course;
}

export function CourseDetailView({ course }: CourseDetailViewProps) {
  const { addItem, isInCart } = useCartStore();
  const alreadyInCart = isInCart(course.id);
  const [activeTab, setActiveTab] = useState<'overview' | 'syllabus' | 'instructor'>('overview');

  const modules = [
    { title: 'Module 1: Introduction & Fondations', duration: '2h 15m', lessons: '4 leçons' },
    { title: 'Module 2: Principes Avancés & Architecture', duration: '4h 30m', lessons: '6 leçons' },
    { title: 'Module 3: Projets Pratiques & Cas Réels', duration: '5h 00m', lessons: '5 leçons' },
    { title: 'Module 4: Synthèse & Certification finale', duration: '2h 45m', lessons: '3 leçons' },
  ];

  return (
    <div className="py-10 bg-slate-50 dark:bg-slate-950 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Back Link */}
        <Link href="/courses" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-elab-600 mb-6">
          <ArrowLeft className="h-4 w-4" /> Retour aux cours
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Main Details Column */}
          <div className="lg:col-span-8 space-y-8">
            <div>
              <div className="flex flex-wrap gap-2 mb-3">
                <Badge variant="default">{course.category?.name}</Badge>
                <Badge variant="secondary">{course.level}</Badge>
              </div>

              <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white leading-tight">
                {course.title}
              </h1>

              <p className="mt-4 text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                {course.description}
              </p>

              {/* Rating & Metadata Bar */}
              <div className="mt-6 flex flex-wrap items-center gap-6 text-sm text-slate-600 dark:text-slate-400 border-y border-slate-200 dark:border-slate-800 py-4">
                <div className="flex items-center gap-1 font-bold text-amber-500">
                  <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
                  <span>{course.rating.toFixed(1)}</span>
                  <span className="text-slate-400 font-normal">(124 évaluations)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-elab-500" />
                  <span>{course.duration_hours}h de cours</span>
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-elab-500" />
                  <span>{course.lessons_count} leçons</span>
                </div>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="border-b border-slate-200 dark:border-slate-800 flex gap-6">
              <button
                onClick={() => setActiveTab('overview')}
                className={`pb-3 font-bold text-sm border-b-2 transition-colors ${
                  activeTab === 'overview'
                    ? 'border-elab-600 text-elab-600 dark:text-elab-400'
                    : 'border-transparent text-slate-500 hover:text-slate-900'
                }`}
              >
                Aperçu & Objectifs
              </button>
              <button
                onClick={() => setActiveTab('syllabus')}
                className={`pb-3 font-bold text-sm border-b-2 transition-colors ${
                  activeTab === 'syllabus'
                    ? 'border-elab-600 text-elab-600 dark:text-elab-400'
                    : 'border-transparent text-slate-500 hover:text-slate-900'
                }`}
              >
                Programme du Cours ({modules.length} modules)
              </button>
              <button
                onClick={() => setActiveTab('instructor')}
                className={`pb-3 font-bold text-sm border-b-2 transition-colors ${
                  activeTab === 'instructor'
                    ? 'border-elab-600 text-elab-600 dark:text-elab-400'
                    : 'border-transparent text-slate-500 hover:text-slate-900'
                }`}
              >
                Formateur
              </button>
            </div>

            {/* Tab Content */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <Card className="p-6 bg-white dark:bg-slate-900">
                  <h3 className="font-bold text-lg text-slate-900 dark:text-slate-100 mb-4">
                    Ce que vous allez apprendre :
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-slate-700 dark:text-slate-300">
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                      <span>Maîtrise des meilleures pratiques du secteur</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                      <span>Création de projets concrets réutilisables</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                      <span>Optimisation et intégration de workflows modernes</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                      <span>Certification nominative à la fin du parcours</span>
                    </div>
                  </div>
                </Card>

                <div className="prose dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
                  <h4 className="font-bold text-base text-slate-900 dark:text-slate-100">
                    Description détaillée
                  </h4>
                  <p>{course.full_content || course.description}</p>
                </div>
              </div>
            )}

            {activeTab === 'syllabus' && (
              <div className="space-y-4">
                {modules.map((mod, i) => (
                  <Card key={i} className="p-5 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <PlayCircle className="h-6 w-6 text-elab-600 shrink-0" />
                      <div>
                        <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">
                          {mod.title}
                        </h4>
                        <p className="text-xs text-slate-500">{mod.lessons}</p>
                      </div>
                    </div>
                    <span className="text-xs font-semibold text-slate-500">{mod.duration}</span>
                  </Card>
                ))}
              </div>
            )}

            {activeTab === 'instructor' && (
              <Card className="p-6 flex items-start gap-4">
                {course.instructor?.avatar_url && (
                  <div className="relative h-16 w-16 overflow-hidden rounded-full border-2 border-elab-500 shrink-0">
                    <Image
                      src={course.instructor.avatar_url}
                      alt={course.instructor.full_name}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div>
                  <h3 className="font-bold text-lg text-slate-900 dark:text-slate-100">
                    {course.instructor?.full_name || 'Équipe E-Lab'}
                  </h3>
                  <p className="text-xs font-semibold text-elab-600 dark:text-elab-400">
                    {course.instructor?.bio || 'Expert & Formateur Senior'}
                  </p>
                  <p className="mt-3 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    Professionnel passionné avec plusieurs années d'expérience dans l'enseignement et le développement de produits digitaux à fort impact.
                  </p>
                </div>
              </Card>
            )}
          </div>

          {/* Sidebar CTA Box */}
          <div className="lg:col-span-4">
            <Card className="p-6 sticky top-24 shadow-xl border-slate-200 dark:border-slate-800">
              <div className="relative h-48 w-full overflow-hidden rounded-xl mb-5">
                <Image
                  src={course.image_url}
                  alt={course.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-slate-950/30 flex items-center justify-center">
                  <PlayCircle className="h-14 w-14 text-white hover:scale-110 transition-transform cursor-pointer" />
                </div>
              </div>

              <div className="flex items-baseline justify-between mb-4">
                <span className="text-3xl font-black text-slate-900 dark:text-white">
                  {formatPrice(course.price)}
                </span>
                <span className="text-xs text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-100 dark:bg-emerald-950 px-2.5 py-1 rounded-full">
                  Accès à vie
                </span>
              </div>

              <div className="space-y-3">
                <Button
                  size="lg"
                  variant={alreadyInCart ? 'secondary' : 'default'}
                  className="w-full font-bold text-base shadow-lg shadow-elab-600/20"
                  onClick={() => addItem(course)}
                >
                  {alreadyInCart ? (
                    <>
                      <Check className="h-5 w-5 mr-2 text-emerald-600" />
                      Dans votre panier
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="h-5 w-5 mr-2" />
                      S'inscrire maintenant
                    </>
                  )}
                </Button>
              </div>

              <div className="mt-6 border-t border-slate-100 pt-4 dark:border-slate-800 space-y-2 text-xs text-slate-500">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-emerald-500" />
                  <span>Garantie 14 jours satisfait ou remboursé</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="h-4 w-4 text-elab-500" />
                  <span>Certificat de réussite inclus</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
