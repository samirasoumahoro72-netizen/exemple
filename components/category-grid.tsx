import Link from 'next/link';
import { DEMO_CATEGORIES } from '@/lib/data/coursesData';
import { Card } from '@/components/ui/card';
import { Palette, Briefcase, Code, TrendingUp, BarChart3, ArrowUpRight } from 'lucide-react';

const iconMap: Record<string, any> = {
  Palette,
  Briefcase,
  Code,
  TrendingUp,
  BarChart3,
};

export function CategoryGrid() {
  return (
    <section className="py-16 bg-slate-50 dark:bg-slate-900/50">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-wider text-elab-600 dark:text-elab-400">
              Spécialisations
            </span>
            <h2 className="text-3xl font-black text-slate-900 dark:text-white mt-1">
              Explorez par Catégorie
            </h2>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md mt-2 md:mt-0">
            Trouvez la formation idéale adaptée à vos objectifs et découvrez nos parcours complets guidés par des professionnels.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {DEMO_CATEGORIES.map((category) => {
            const IconComponent = iconMap[category.icon] || Code;
            return (
              <Link key={category.id} href={`/courses?category=${category.slug}`}>
                <Card className="group p-6 h-full flex flex-col justify-between hover:border-elab-500 hover:shadow-lg transition-all duration-300">
                  <div>
                    <div className="flex items-center justify-between">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-elab-50 text-elab-600 dark:bg-elab-950 dark:text-elab-400 group-hover:bg-elab-600 group-hover:text-white transition-colors">
                        <IconComponent className="h-6 w-6" />
                      </div>
                      <ArrowUpRight className="h-5 w-5 text-slate-400 group-hover:text-elab-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>

                    <h3 className="font-bold text-lg text-slate-900 dark:text-slate-100 mt-4 group-hover:text-elab-600 dark:group-hover:text-elab-400 transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                      {category.description}
                    </p>
                  </div>

                  <div className="mt-6 border-t border-slate-100 pt-3 dark:border-slate-800">
                    <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                      {category.course_count} cours disponibles
                    </span>
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
