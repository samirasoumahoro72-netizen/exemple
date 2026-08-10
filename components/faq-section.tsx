'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { ChevronDown } from 'lucide-react';

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: 'Comment fonctionnent les cours sur E-Lab ?',
      answer: 'Tous nos cours sont accessibles 24/7 en ligne. Une fois inscrit, vous bénéficiez d\'un accès illimité aux leçons vidéo, exercices pratiques, quiz et projets téléchargeables.',
    },
    {
      question: 'Obtiendrai-je un certificat à la fin de ma formation ?',
      answer: 'Oui, une fois que vous avez complété 100% des modules et projets d\'un cours, vous recevez automatiquement un certificat nominatif certifiant vos compétences.',
    },
    {
      question: 'Puis-je suivre les cours sur mobile ou tablette ?',
      answer: 'Absolument ! La plateforme E-Lab est entièrement responsive et adaptée à tous les écrans (ordinateur, tablette, téléphone).',
    },
    {
      question: 'Proposez-vous un remboursement en cas d\'insatisfaction ?',
      answer: 'Oui, nous offrons une garantie de satisfaction de 14 jours satisfaits ou remboursés sans justification.',
    },
    {
      question: 'Puis-je devenir formateur sur E-Lab ?',
      answer: 'Oui ! Si vous êtes un expert dans votre domaine, créez un compte formateur ou contactez notre équipe pour publier vos cours sur la plateforme.',
    },
  ];

  return (
    <section className="py-20 bg-slate-50 dark:bg-slate-900/50">
      <div className="container mx-auto px-4 sm:px-6 max-w-3xl">
        <div className="text-center mb-12">
          <span className="text-xs font-extrabold uppercase tracking-wider text-elab-600 dark:text-elab-400">
            Foire Aux Questions
          </span>
          <h2 className="text-3xl font-black text-slate-900 dark:text-white mt-1">
            Questions Fréquentes
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
            Tout ce que vous devez savoir sur la plateforme, les inscriptions et la certification E-Lab.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <Card
                key={index}
                className="overflow-hidden border border-slate-200 dark:border-slate-800 transition-colors"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full p-5 text-left flex items-center justify-between font-bold text-base text-slate-900 dark:text-slate-100 hover:text-elab-600 transition-colors"
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`h-5 w-5 text-slate-400 shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 text-elab-600' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-0 text-sm text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-800/60 mt-1">
                    <p className="pt-3">{faq.answer}</p>
                  </div>
                )}
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
