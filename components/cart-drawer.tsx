'use client';

import { useState } from 'react';
import { useCartStore } from '@/lib/store/useCartStore';
import { Button } from '@/components/ui/button';
import { formatPrice } from '@/lib/utils';
import { ShoppingBag, X, Trash2, CheckCircle2, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { items, removeItem, clearCart, getTotalPrice } = useCartStore();
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleCheckout = async () => {
    setIsLoading(true);
    // Simulate enrollment processing
    await new Promise((resolve) => setTimeout(resolve, 1200));
    setIsLoading(false);
    setIsSuccess(true);
    clearCart();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/60 backdrop-blur-sm transition-opacity animate-fade-in">
      <div className="absolute inset-y-0 right-0 flex max-w-full pl-10">
        <div className="w-screen max-w-md bg-white p-6 shadow-2xl dark:bg-slate-900 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-slate-200 pb-4 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <ShoppingBag className="h-5 w-5 text-elab-600 dark:text-elab-400" />
                <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                  Votre Panier ({items.length})
                </h2>
              </div>
              <button
                onClick={onClose}
                className="rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {isSuccess ? (
              <div className="my-12 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400">
                  <CheckCircle2 className="h-10 w-10" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                  Inscription effectuée avec succès !
                </h3>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                  Vos cours ont été ajoutés à votre compte. Retrouvez-les directement dans votre tableau de bord.
                </p>
                <div className="mt-6 flex flex-col gap-3">
                  <Link href="/dashboard" onClick={() => { setIsSuccess(false); onClose(); }}>
                    <Button className="w-full">Accéder à mon Tableau de bord</Button>
                  </Link>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => { setIsSuccess(false); onClose(); }}
                  >
                    Continuer à explorer
                  </Button>
                </div>
              </div>
            ) : items.length === 0 ? (
              <div className="my-16 text-center">
                <ShoppingBag className="mx-auto h-12 w-12 text-slate-300 dark:text-slate-600" />
                <p className="mt-4 text-base font-medium text-slate-700 dark:text-slate-300">
                  Vous n'avez encore aucun cours dans votre panier.
                </p>
                <p className="mt-1 text-sm text-slate-500">
                  Découvrez nos formations et boostez vos compétences dès aujourd'hui.
                </p>
                <Button
                  className="mt-6 gap-2"
                  onClick={onClose}
                >
                  <Link href="/courses" className="flex items-center gap-2">
                    Découvrir les cours <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            ) : (
              <div className="mt-4 space-y-4 max-h-[60vh] overflow-y-auto pr-1">
                {items.map((course) => (
                  <div
                    key={course.id}
                    className="flex items-center gap-4 rounded-xl border border-slate-200/80 p-3 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50"
                  >
                    <div className="relative h-16 w-20 flex-shrink-0 overflow-hidden rounded-lg">
                      <Image
                        src={course.image_url}
                        alt={course.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="truncate font-semibold text-sm text-slate-900 dark:text-slate-100">
                        {course.title}
                      </h4>
                      <p className="text-xs text-slate-500">
                        {course.instructor?.full_name || 'Équipe E-Lab'}
                      </p>
                      <p className="mt-1 font-bold text-sm text-elab-600 dark:text-elab-400">
                        {formatPrice(course.price)}
                      </p>
                    </div>
                    <button
                      onClick={() => removeItem(course.id)}
                      className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                      title="Supprimer du panier"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {!isSuccess && items.length > 0 && (
            <div className="border-t border-slate-200 pt-4 dark:border-slate-800">
              <div className="flex justify-between text-base font-bold text-slate-900 dark:text-slate-100 mb-4">
                <span>Total</span>
                <span className="text-elab-600 dark:text-elab-400">{formatPrice(getTotalPrice())}</span>
              </div>
              <Button
                className="w-full text-base py-3 font-semibold"
                isLoading={isLoading}
                onClick={handleCheckout}
              >
                Confirmer l'inscription ({formatPrice(getTotalPrice())})
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
