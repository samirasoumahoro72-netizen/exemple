'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactSchema, ContactInput } from '@/lib/validations/contact';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';

export default function ContactPage() {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactInput) => {
    setIsLoading(true);
    // Submit contact message simulation
    await new Promise((resolve) => setTimeout(resolve, 800));
    setIsLoading(false);
    setIsSuccess(true);
    reset();
  };

  return (
    <div className="py-16 bg-slate-50 dark:bg-slate-950 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-extrabold uppercase tracking-wider text-elab-600 dark:text-elab-400">
            Contact & Assistance
          </span>
          <h1 className="text-4xl font-black text-slate-900 dark:text-white mt-1">
            Contactez notre Équipe
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
            Une question sur nos cours, les modalités de paiement ou le partenariat éducatif ? Écrivez-nous.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Contact Details Column */}
          <div className="lg:col-span-5 space-y-6">
            <Card className="p-6 bg-slate-900 text-white border-slate-800 shadow-xl space-y-6">
              <h3 className="font-extrabold text-xl text-white">Nos Coordonnées</h3>
              
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-elab-600 text-white">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-200">Adresse e-mail</h4>
                  <p className="text-xs text-slate-400 mt-0.5">hi@e-lab.com</p>
                  <p className="text-xs text-slate-400">support@e-lab.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-elab-600 text-white">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-200">Téléphone</h4>
                  <p className="text-xs text-slate-400 mt-0.5">+1 (212) 456-7890</p>
                  <p className="text-xs text-slate-400">Du Lundi au Vendredi, 9h - 18h</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-elab-600 text-white">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-200">Siège social</h4>
                  <p className="text-xs text-slate-400 mt-0.5">75 Broadway Avenue, Suite 400</p>
                  <p className="text-xs text-slate-400">New York, NY 10006, États-Unis</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Form Column */}
          <div className="lg:col-span-7">
            <Card className="p-8 shadow-xl border-slate-200 dark:border-slate-800">
              {isSuccess ? (
                <div className="py-12 text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400">
                    <CheckCircle2 className="h-10 w-10" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                    Message envoyé avec succès !
                  </h3>
                  <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto">
                    Merci de nous avoir contactés. Notre équipe pédagogique vous répondra dans un délai maximum de 24 heures ouvrées.
                  </p>
                  <Button
                    className="mt-6"
                    onClick={() => setIsSuccess(false)}
                  >
                    Envoyer un autre message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                        Votre nom complet <span className="text-red-500">*</span>
                      </label>
                      <Input
                        placeholder="Jean Dupont"
                        {...register('name')}
                        error={errors.name?.message}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                        Adresse e-mail <span className="text-red-500">*</span>
                      </label>
                      <Input
                        type="email"
                        placeholder="jean.dupont@exemple.com"
                        {...register('email')}
                        error={errors.email?.message}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                      Sujet de votre demande <span className="text-red-500">*</span>
                    </label>
                    <Input
                      placeholder="Ex: Demande de renseignement sur la formation UX"
                      {...register('subject')}
                      error={errors.subject?.message}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                      Message <span className="text-red-500">*</span>
                    </label>
                    <Textarea
                      placeholder="Décrivez votre besoin en détails..."
                      {...register('message')}
                      error={errors.message?.message}
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full font-bold py-3 text-base shadow-lg shadow-elab-600/20"
                    isLoading={isLoading}
                  >
                    <Send className="h-4 w-4 mr-2" /> Envoyer le message
                  </Button>
                </form>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
