import Link from 'next/link';
import { HeroSection } from '@/components/hero-section';
import { CategoryGrid } from '@/components/category-grid';
import { CourseCard } from '@/components/course-card';
import { Testimonials } from '@/components/testimonials';
import { FAQSection } from '@/components/faq-section';
import { DEMO_COURSES, DEMO_BLOG_POSTS } from '@/lib/data/coursesData';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowRight, Sparkles, BookOpen, Clock, Calendar } from 'lucide-react';
import Image from 'next/image';

export default function HomePage() {
  const featuredCourses = DEMO_COURSES.filter((c) => c.is_featured);

  return (
    <div className="space-y-0">
      {/* Hero */}
      <HeroSection />

      {/* Categories */}
      <CategoryGrid />

      {/* Featured Courses Section */}
      <section className="py-20 bg-white dark:bg-slate-950">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-elab-600 dark:text-elab-400">
                <Sparkles className="h-4 w-4" />
                <span>Sélection Spéciale</span>
              </div>
              <h2 className="text-3xl font-black text-slate-900 dark:text-white mt-1">
                Cours à la Une
              </h2>
            </div>
            <Link href="/courses" className="mt-4 sm:mt-0">
              <Button variant="outline" className="gap-2 font-semibold">
                Voir tous les cours <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <Testimonials />

      {/* Blog & Insights Preview */}
      <section className="py-20 bg-slate-50 dark:bg-slate-900/40 border-t border-slate-200/60 dark:border-slate-800">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-wider text-elab-600 dark:text-elab-400">
                Actualités & Conseils
              </span>
              <h2 className="text-3xl font-black text-slate-900 dark:text-white mt-1">
                Derniers Insights & Articles
              </h2>
            </div>
            <Link href="/blog" className="mt-4 sm:mt-0">
              <Button variant="outline" className="gap-2 font-semibold">
                Lire le blog <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {DEMO_BLOG_POSTS.map((post) => (
              <Card key={post.id} className="group overflow-hidden flex flex-col h-full hover:shadow-lg transition-all">
                <div className="relative h-48 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                  <Image
                    src={post.image_url}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-elab-600 text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow-md">
                    {post.category}
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 text-xs text-slate-400 mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5" /> {post.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" /> {post.read_time}
                      </span>
                    </div>
                    <Link href={`/blog/${post.slug}`}>
                      <h3 className="font-bold text-lg text-slate-900 dark:text-slate-100 group-hover:text-elab-600 transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                    </Link>
                    <p className="mt-2 text-xs text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed">
                      {post.excerpt}
                    </p>
                  </div>
                  <div className="mt-6 border-t border-slate-100 pt-4 dark:border-slate-800 flex items-center justify-between">
                    <span className="text-xs font-medium text-slate-500">Par {post.author}</span>
                    <Link href={`/blog/${post.slug}`} className="text-xs font-bold text-elab-600 dark:text-elab-400 flex items-center gap-1 hover:underline">
                      Lire la suite <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FAQSection />

      {/* Bottom CTA Banner */}
      <section className="py-20 bg-gradient-to-r from-elab-700 via-elab-600 to-indigo-700 text-white relative overflow-hidden">
        <div className="container relative z-10 mx-auto px-4 sm:px-6 text-center max-w-3xl">
          <h2 className="text-3xl font-black sm:text-4xl tracking-tight">
            Rejoignez 8,000+ apprenants dès aujourd'hui !
          </h2>
          <p className="mt-4 text-base text-elab-100 leading-relaxed">
            Inscrivez-vous gratuitement et commencez votre apprentissage avec nos cours d'introduction et ateliers certifiés.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/register">
              <Button size="lg" className="bg-white text-elab-700 hover:bg-slate-100 font-bold px-8 text-base shadow-xl">
                Créer un compte gratuit
              </Button>
            </Link>
            <Link href="/courses">
              <Button variant="outline" size="lg" className="border-white/40 bg-transparent text-white hover:bg-white/10 font-bold px-8 text-base">
                Explorer le catalogue
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
