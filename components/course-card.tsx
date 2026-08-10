'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Course } from '@/types';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { formatPrice } from '@/lib/utils';
import { Star, Clock, BookOpen, ShoppingBag, Check } from 'lucide-react';
import { useCartStore } from '@/lib/store/useCartStore';

interface CourseCardProps {
  course: Course;
}

export function CourseCard({ course }: CourseCardProps) {
  const { addItem, isInCart } = useCartStore();
  const alreadyInCart = isInCart(course.id);

  return (
    <Card className="group overflow-hidden flex flex-col h-full hover:border-elab-400/50 hover:shadow-xl transition-all duration-300">
      {/* Thumbnail */}
      <div className="relative h-48 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
        <Image
          src={course.image_url}
          alt={course.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3 flex gap-2">
          <Badge variant="default" className="shadow-md">
            {course.category?.name || 'Général'}
          </Badge>
          {course.is_featured && (
            <Badge variant="warning" className="shadow-md">
              Populaire
            </Badge>
          )}
        </div>
        <div className="absolute top-3 right-3">
          <Badge variant="secondary" className="bg-white/90 backdrop-blur-md dark:bg-slate-900/90 font-bold shadow-md">
            {course.level}
          </Badge>
        </div>
      </div>

      {/* Body */}
      <div className="flex-1 p-5 flex flex-col justify-between">
        <div>
          {/* Rating & Stats */}
          <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
            <div className="flex items-center gap-1 font-semibold text-amber-500">
              <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
              <span>{course.rating.toFixed(1)}</span>
              <span className="text-slate-400">(120+ avis)</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" /> {course.duration_hours}h
              </span>
              <span className="flex items-center gap-1">
                <BookOpen className="h-3.5 w-3.5" /> {course.lessons_count} leçons
              </span>
            </div>
          </div>

          {/* Title */}
          <Link href={`/courses/${course.id}`}>
            <h3 className="font-bold text-lg text-slate-900 group-hover:text-elab-600 dark:text-slate-100 dark:group-hover:text-elab-400 line-clamp-2 transition-colors">
              {course.title}
            </h3>
          </Link>

          {/* Description */}
          <p className="mt-2 text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
            {course.description}
          </p>
        </div>

        {/* Footer info & Price */}
        <div className="mt-5 border-t border-slate-100 pt-4 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {course.instructor?.avatar_url && (
              <div className="relative h-7 w-7 overflow-hidden rounded-full border border-slate-200">
                <Image
                  src={course.instructor.avatar_url}
                  alt={course.instructor.full_name}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
              {course.instructor?.full_name || 'Équipe E-Lab'}
            </span>
          </div>

          <div className="text-right">
            <span className="text-base font-extrabold text-slate-900 dark:text-white">
              {formatPrice(course.price)}
            </span>
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-4 flex gap-2">
          <Link href={`/courses/${course.id}`} className="flex-1">
            <Button variant="outline" className="w-full text-xs font-semibold">
              Détails
            </Button>
          </Link>
          <Button
            size="sm"
            variant={alreadyInCart ? 'secondary' : 'default'}
            className="gap-1.5 text-xs font-semibold"
            onClick={() => addItem(course)}
          >
            {alreadyInCart ? (
              <>
                <Check className="h-3.5 w-3.5 text-emerald-600" />
                Dans le panier
              </>
            ) : (
              <>
                <ShoppingBag className="h-3.5 w-3.5" />
                Ajouter
              </>
            )}
          </Button>
        </div>
      </div>
    </Card>
  );
}
