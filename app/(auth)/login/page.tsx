'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, LoginInput } from '@/lib/validations/auth';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { GraduationCap, LogIn, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginInput) => {
    setIsLoading(true);
    setServerError(null);

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });

    setIsLoading(false);

    if (error) {
      setServerError('Adresse e-mail ou mot de passe incorrect.');
    } else {
      router.push('/dashboard');
      router.refresh();
    }
  };

  return (
    <div className="py-16 min-h-[85vh] flex items-center justify-center bg-slate-50 dark:bg-slate-950 px-4">
      <Card className="w-full max-w-md shadow-2xl border-slate-200 dark:border-slate-800">
        <CardHeader className="text-center space-y-2">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-elab-600 to-elab-400 text-white shadow-md">
            <GraduationCap className="h-7 w-7" />
          </div>
          <CardTitle className="text-2xl font-black">Connexion à E-Lab</CardTitle>
          <CardDescription>
            Accédez à votre espace d'apprentissage et retrouvez tous vos cours.
          </CardDescription>
        </CardHeader>

        <CardContent>
          {serverError && (
            <div className="mb-4 flex items-center gap-2 rounded-xl bg-red-50 p-3 text-xs font-medium text-red-600 dark:bg-red-950/50 dark:text-red-400 border border-red-200 dark:border-red-900">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{serverError}</span>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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

            <Button
              type="submit"
              className="w-full font-bold py-3 text-base shadow-lg shadow-elab-600/20"
              isLoading={isLoading}
            >
              <LogIn className="h-4 w-4 mr-2" /> Se connecter
            </Button>
          </form>
        </CardContent>

        <CardFooter className="flex flex-col space-y-3 text-center border-t border-slate-100 pt-4 dark:border-slate-800 text-xs text-slate-500">
          <p>
            Vous n'avez pas encore de compte ?{' '}
            <Link href="/register" className="font-bold text-elab-600 dark:text-elab-400 hover:underline">
              S'inscrire gratuitement
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
