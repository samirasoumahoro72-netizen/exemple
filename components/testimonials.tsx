import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { Star, Quote } from 'lucide-react';

export function Testimonials() {
  const reviews = [
    {
      id: 1,
      name: 'Thomas Morel',
      role: 'Product Designer chez TechCorp',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
      content: 'E-Lab a totalement changé ma manière d\'aborder les Design Systems. Les leçons sont concrètes, immédiatement applicables sur mes projets d\'entreprise.',
      rating: 5,
    },
    {
      id: 2,
      name: 'Sophie Bernard',
      role: 'Growth Lead chez Analytics.io',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=250&q=80',
      content: 'La qualité des formateurs et des projets pratiques est inégalée. J\'ai pu valider ma certification et obtenir une promotion en moins de 3 mois.',
      rating: 5,
    },
    {
      id: 3,
      name: 'David Kassem',
      role: 'Développeur Full-Stack',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80',
      content: 'Le cours sur l\'IA et le Machine Learning en pratique est une mine d\'or. Tout est structuré avec clarté, de l\'API jusqu\'au déploiement.',
      rating: 5,
    },
  ];

  return (
    <section className="py-20 bg-white dark:bg-slate-950">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-extrabold uppercase tracking-wider text-elab-600 dark:text-elab-400">
            Témoignages & Avis
          </span>
          <h2 className="text-3xl font-black text-slate-900 dark:text-white mt-1">
            Rejoint par des milliers d'apprenants et équipes de premier plan
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
            Découvrez comment nos étudiants et éducateurs transforment leurs compétences et leurs carrières.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review) => (
            <Card key={review.id} className="p-6 relative flex flex-col justify-between hover:shadow-xl transition-shadow">
              <Quote className="h-8 w-8 text-elab-200 dark:text-elab-900 absolute top-4 right-4" />
              <div>
                <div className="flex gap-1 text-amber-400 mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-slate-700 dark:text-slate-300 italic leading-relaxed">
                  "{review.content}"
                </p>
              </div>

              <div className="mt-6 border-t border-slate-100 pt-4 dark:border-slate-800 flex items-center gap-3">
                <div className="relative h-10 w-10 overflow-hidden rounded-full border border-slate-200">
                  <Image
                    src={review.avatar}
                    alt={review.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">
                    {review.name}
                  </h4>
                  <p className="text-xs text-slate-500">{review.role}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Partner Logos Banner */}
        <div className="mt-16 pt-10 border-t border-slate-100 dark:border-slate-800 text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-6">
            Utilisé et approuvé par les équipes de
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all">
            <span className="font-black text-xl text-slate-700 dark:text-slate-300 tracking-tighter">TECHCORP</span>
            <span className="font-black text-xl text-slate-700 dark:text-slate-300 tracking-tighter">NEXUS AI</span>
            <span className="font-black text-xl text-slate-700 dark:text-slate-300 tracking-tighter">GLOBAL DESIGN</span>
            <span className="font-black text-xl text-slate-700 dark:text-slate-300 tracking-tighter">GROWTH LABS</span>
            <span className="font-black text-xl text-slate-700 dark:text-slate-300 tracking-tighter">DATASTREAM</span>
          </div>
        </div>
      </div>
    </section>
  );
}
