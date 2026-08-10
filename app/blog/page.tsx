import Link from 'next/link';
import { DEMO_BLOG_POSTS } from '@/lib/data/coursesData';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Calendar, Clock } from 'lucide-react';
import Image from 'next/image';

export default function BlogPage() {
  return (
    <div className="py-16 bg-slate-50 dark:bg-slate-950 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <Badge variant="default" className="mb-2">Blog & Insights</Badge>
          <h1 className="text-4xl font-black text-slate-900 dark:text-white">
            Articles, Tendances & Conseils
          </h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            Découvrez nos dernières analyses sur la formation en ligne, le design et l'apprentissage de l'IA.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {DEMO_BLOG_POSTS.map((post) => (
            <Card key={post.id} className="group overflow-hidden flex flex-col h-full hover:shadow-xl transition-all">
              <div className="relative h-52 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
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
    </div>
  );
}
