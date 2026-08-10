'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema, RegisterInput } from '@/lib/validations/auth';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { GraduationCap, UserPlus, AlertCircle, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      role: 'student',
    },
  });

  const currentRole = watch('role');

  const onSubmit = async (data: RegisterInput) => {
    setIsLoading(true);
    setServerError(null);

    const supabase = createClient();
    const { error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          full_name: data.fullName,
          role: data.role,
        },
      },
    });

    setIsLoading(false);

    if (error) {
      setServerError(error.message || 'Une erreur est survenue lors de l\'inscription.');
    } else {
      setIsSuccess(true);
      setTimeout(() => {
        router.push('/dashboard');
        router.refresh();
      }, 1500);
    }
  };

  return (
    <div className="py-16 min-h-[85vh] flex items-center justify-center bg-slate-50 dark:bg-slate-950 px-4">
      <Card className="w-full max-w-lg shadow-2xl border-slate-200 dark:border-slate-800">
        <CardHeader className="text-center space-y-2">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-elab-600 to-elab-400 text-white shadow-md">
            <GraduationCap className="h-7 w-7" />
          </div>
          <CardTitle className="text-2xl font-black">Créer un compte E-Lab</CardTitle>
          <CardDescription>
            Rejoignez notre communauté d'apprenants et accédez à nos formations certifiantes.
          </CardDescription>
        </CardHeader>

        <CardContent>
          {isSuccess ? (
            <div className="text-center py-6">
              <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400">
                <CheckCircle className="h-8 w-8" />
              </div>
              <h3 className="font-bold text-lg text-slate-900 dark:text-slate-100">
                Inscription réussie !
              </h3>
              <p className="mt-1 text-sm text-slate-500">
                Redirection automatique vers votre tableau de bord...
              </p>
            </div>
          ) : (
            <>
              {serverError && (
                <div className="mb-4 flex items-center gap-2 rounded-xl bg-red-50 p-3 text-xs font-medium text-red-600 dark:bg-red-950/50 dark:text-red-400 border border-red-200 dark:border-red-900">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  <span>{serverError}</span>
                </div>
              )}

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Role Switcher */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                    Je souhaite être :
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setValue('role', 'student')}
                      className={`p-3 rounded-xl border text-xs font-bold transition-all ${
                        currentRole === 'student'
                          ? 'border-elab-600 bg-elab-50 text-elab-700 dark:bg-elab-950 dark:text-elab-300'
                          : 'border-slate-200 bg-white text-slate-600 dark:border-slate-800 dark:bg-slate-900'
                      }`}
                    >
                      🎓 Étudiant / Apprenant
                    </button>
                    <button
                      type="button"
                      onClick={() => setValue('role', 'instructor')}
                      className={`p-3 rounded-xl border text-xs font-bold transition-all ${
                        currentRole === 'instructor'
                          ? 'border-elab-600 bg-elab-50 text-elab-700 dark:bg-elab-950 dark:text-elab-300'
                          : 'border-slate-200 bg-white text-slate-600 dark:border-slate-800 dark:bg-slate-900'
                      }`}
                    >
                      👨‍🏫 Formateur / Éducateur
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                    Nom complet <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="text"
                    placeholder="Jean Dupont"
                    {...register('fullName')}
                    error={errors.fullName?.message}
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                    Adresse e-mail <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="email"
                    placeholder="votre.email@exemple.com"
                    {...register('email')}
                    error={errors.email?.message}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                      Mot de passe <span className="text-red-500">*</span>
                    </label>
                    <Input
                      type="password"
                      placeholder="••••••••"
                      {...register('password')}
                      error={errors.password?.message}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                      Confirmation <span className="text-red-500">*</span>
                    </label>
                    <Input
                      type="password"
                      placeholder="••••••••"
                      {...register('confirmPassword')}
                      error={errors.confirmPassword?.message}
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full font-bold py-3 text-base shadow-lg shadow-elab-600/20"
                  isLoading={isLoading}
                >
                  <UserPlus className="h-4 w-4 mr-2" /> Créer mon compte
                </Button>
              </form>
            </>
          )}
        </CardContent>

        <CardFooter className="flex flex-col space-y-3 text-center border-t border-slate-100 pt-4 dark:border-slate-800 text-xs text-slate-500">
          <p>
            Vous avez déjà un compte ?{' '}
            <Link href="/login" className="font-bold text-elab-600 dark:text-elab-400 hover:underline">
              Se connecter
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
