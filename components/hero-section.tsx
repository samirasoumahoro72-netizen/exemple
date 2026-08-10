import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sparkles, ArrowRight, ShieldCheck, Users, Award, PlayCircle } from 'lucide-react';
import Image from 'next/image';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-slate-950 text-white pt-12 pb-20 md:pt-20 md:pb-28">
      {/* Dynamic Background Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-tr from-elab-600/30 via-indigo-600/20 to-purple-600/10 blur-3xl opacity-60 pointer-events-none" />
      <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-elab-500/20 rounded-full blur-3xl pointer-events-none" />

      <div className="container relative z-10 mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
          {/* Left Column: Headlines & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <Badge
              variant="default"
              className="inline-flex items-center gap-2 bg-elab-500/10 text-elab-300 border border-elab-500/20 px-3.5 py-1.5 text-xs font-semibold rounded-full"
            >
              <Sparkles className="h-3.5 w-3.5 text-elab-400" />
              <span>Plateforme de Formation Web & E-Learning Certifiée</span>
            </Badge>

            <h1 className="text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl text-white leading-[1.1]">
              Learn<span className="text-elab-400">.</span> Grow<span className="text-elab-400">.</span> Succeed<span className="text-elab-400">.</span>
            </h1>

            <p className="text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Propulsez votre carrière avec nos formations interactives conçues par des experts de l'industrie. Accédez à plus de 50+ cours certifiants en Design, Développement, Data & Strategy.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Link href="/courses">
                <Button size="lg" className="w-full sm:w-auto gap-2 text-base font-bold shadow-xl shadow-elab-600/30">
                  Explorer les cours <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Link href="/register">
                <Button variant="outline" size="lg" className="w-full sm:w-auto gap-2 border-slate-700 bg-slate-900/60 text-white hover:bg-slate-800 text-base">
                  Rejoindre 8,000+ étudiants
                </Button>
              </Link>
            </div>

            {/* Key Value Proposition Badges */}
            <div className="pt-6 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-medium text-slate-300">
              <div className="flex items-center justify-center lg:justify-start gap-2">
                <ShieldCheck className="h-4 w-4 text-elab-400" />
                <span>Formateurs Experts Certifiés</span>
              </div>
              <div className="flex items-center justify-center lg:justify-start gap-2">
                <Users className="h-4 w-4 text-elab-400" />
                <span>Réseau Global d'Apprenants</span>
              </div>
              <div className="flex items-center justify-center lg:justify-start gap-2">
                <Award className="h-4 w-4 text-elab-400" />
                <span>Certificats Reconnus</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Card Stack & Stats */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Main Banner Image */}
              <div className="relative h-[380px] w-full overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80"
                  alt="Students learning on E-lab platform"
                  fill
                  className="object-cover opacity-85 hover:scale-105 transition-transform duration-700"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                
                {/* Floating Video Preview Badge */}
                <div className="absolute top-4 left-4 flex items-center gap-2 rounded-xl bg-slate-900/90 backdrop-blur-md px-3.5 py-2 border border-slate-700/50 shadow-lg text-xs font-semibold text-white">
                  <PlayCircle className="h-4 w-4 text-elab-400 animate-pulse" />
                  <span>Aperçu vidéo en direct</span>
                </div>
              </div>

              {/* Floating Stat Card 1 */}
              <div className="absolute -bottom-6 -left-6 rounded-2xl bg-white p-4 text-slate-900 shadow-2xl dark:bg-slate-900 dark:text-white border border-slate-200 dark:border-slate-800 flex items-center gap-3 animate-fade-in">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-elab-100 text-elab-600 dark:bg-elab-950 dark:text-elab-400 font-extrabold text-xl">
                  8k+
                </div>
                <div>
                  <h4 className="font-extrabold text-sm">Apprenants Actifs</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">À travers 45+ pays</p>
                </div>
              </div>

              {/* Floating Stat Card 2 */}
              <div className="absolute -top-6 -right-4 rounded-2xl bg-slate-900/90 backdrop-blur-md p-4 text-white shadow-2xl border border-slate-700/60 hidden sm:flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-400 font-bold">
                  98%
                </div>
                <div>
                  <h4 className="font-bold text-xs">Satisfaction globale</h4>
                  <p className="text-[11px] text-slate-400">Évaluation moyenne 4.9/5</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
