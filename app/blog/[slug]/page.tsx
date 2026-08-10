import { DEMO_BLOG_POSTS } from '@/lib/data/coursesData';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Calendar, Clock, User } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export function generateStaticParams() {
  return DEMO_BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

export default function BlogPostDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const slug = params?.slug;
  const post = DEMO_BLOG_POSTS.find((p) => p.slug === slug) || DEMO_BLOG_POSTS[0];

  return (
    <div className="py-12 bg-slate-50 dark:bg-slate-950 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
        <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-elab-600 mb-6">
          <ArrowLeft className="h-4 w-4" /> Retour aux articles
        </Link>

        <Card className="p-8 shadow-xl bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
          <Badge variant="default" className="mb-3">{post.category}</Badge>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white leading-tight">
            {post.title}
          </h1>

          <div className="mt-4 flex flex-wrap items-center gap-6 text-xs text-slate-500 border-y border-slate-100 dark:border-slate-800 py-3">
            <span className="flex items-center gap-1 font-semibold text-slate-700 dark:text-slate-300">
              <User className="h-3.5 w-3.5" /> {post.author}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" /> {post.date}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" /> {post.read_time}
            </span>
          </div>

          <div className="relative h-80 w-full overflow-hidden rounded-2xl my-6">
            <Image
              src={post.image_url}
              alt={post.title}
              fill
              className="object-cover"
            />
          </div>

          <div className="prose dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 leading-relaxed space-y-4">
            <p className="text-base font-semibold leading-relaxed text-slate-800 dark:text-slate-200">
              {post.excerpt}
            </p>
            <p>{post.content}</p>
            <p>
              L'apprentissage continu est le pilier de toute carrière réussie dans les domaines de la tech, du design et du management. En investissant seulement quelques heures par semaine sur des projets structurés, vous développerez une expertise concrète recherchée par les entreprises leaders.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
