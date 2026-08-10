'use client';

import { useState } from 'react';
import Link from 'next/link';
import { GraduationCap, Send, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function Footer() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="border-t border-slate-200 bg-slate-900 text-slate-300 dark:border-slate-800 dark:bg-slate-950">
      <div className="container mx-auto px-4 py-16 sm:px-6">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand & Tagline */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-elab-500 to-elab-400 text-white">
                <GraduationCap className="h-6 w-6" />
              </div>
              <span className="text-2xl font-black tracking-tight text-white">
                E-lab<span className="text-elab-400">.</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-slate-400 max-w-sm">
              E-Lab est la plateforme d'apprentissage de référence dédiée aux professionnels et éducateurs. Plus de 50+ modules interactifs, cours guidés et formations certifiantes.
            </p>
            <div className="pt-2">
              <p className="text-xs font-semibold uppercase text-slate-400 tracking-wider">
                Inscrivez-vous à notre newsletter
              </p>
              {isSubscribed ? (
                <p className="mt-2 text-sm text-emerald-400 font-medium">
                  Merci ! Vous êtes maintenant inscrit(e) à nos actualités.
                </p>
              ) : (
                <form onSubmit={handleSubscribe} className="mt-3 flex gap-2 max-w-md">
                  <Input
                    type="email"
                    placeholder="Votre adresse e-mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-400"
                  />
                  <Button type="submit" size="icon" className="shrink-0">
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">
              Plateforme
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link href="/courses" className="hover:text-elab-400 transition-colors">
                  Tous les cours
                </Link>
              </li>
              <li>
                <Link href="/courses?category=design" className="hover:text-elab-400 transition-colors">
                  Design UI/UX
                </Link>
              </li>
              <li>
                <Link href="/courses?category=technology" className="hover:text-elab-400 transition-colors">
                  Développement & IA
                </Link>
              </li>
              <li>
                <Link href="/courses?category=management" className="hover:text-elab-400 transition-colors">
                  Management Produit
                </Link>
              </li>
              <li>
                <Link href="/courses?category=data" className="hover:text-elab-400 transition-colors">
                  Data Science
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">
              Ressources
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link href="/blog" className="hover:text-elab-400 transition-colors">
                  Blog & Articles
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-elab-400 transition-colors">
                  Aide & Support
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-elab-400 transition-colors">
                  Espace Étudiant
                </Link>
              </li>
              <li>
                <Link href="/register" className="hover:text-elab-400 transition-colors">
                  Devenir Formateur
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Info */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">
              Informations
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li className="text-slate-400">Politique de confidentialité</li>
              <li className="text-slate-400">Conditions générales d'utilisation</li>
              <li className="text-slate-400">Mentions légales</li>
              <li className="text-slate-400">+1 (212) 456-7890</li>
              <li className="text-slate-400">contact@e-lab.com</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-slate-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} E-Lab. Tous droits réservés.</p>
          <p className="flex items-center gap-1">
            Conçu avec <Heart className="h-3.5 w-3.5 text-red-500 fill-current" /> pour l'excellence éducative.
          </p>
        </div>
      </div>
    </footer>
  );
}
