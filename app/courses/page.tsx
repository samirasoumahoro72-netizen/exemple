'use client';

import { useState, useMemo } from 'react';
import { DEMO_COURSES, DEMO_CATEGORIES } from '@/lib/data/coursesData';
import { CourseCard } from '@/components/course-card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, SlidersHorizontal, BookOpen } from 'lucide-react';

export default function CoursesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'rating'>('featured');

  const filteredCourses = useMemo(() => {
    return DEMO_COURSES.filter((course) => {
      const matchesSearch =
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory =
        selectedCategory === 'all' || course.category?.slug === selectedCategory;

      const matchesLevel =
        selectedLevel === 'all' || course.level === selectedLevel;

      return matchesSearch && matchesCategory && matchesLevel;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return (b.is_featured ? 1 : 0) - (a.is_featured ? 1 : 0);
    });
  }, [searchQuery, selectedCategory, selectedLevel, sortBy]);

  return (
    <div className="py-12 bg-slate-50 dark:bg-slate-950 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="mb-10 text-center max-w-2xl mx-auto">
          <Badge variant="default" className="mb-2">Catalogue Complet</Badge>
          <h1 className="text-4xl font-black text-slate-900 dark:text-white">
            Formations & Cours en Ligne
          </h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            Développez des compétences recherchées auprès des meilleurs éducateurs du secteur.
          </p>
        </div>

        {/* Filter & Search Bar Controls */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm mb-10 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            {/* Search Input */}
            <div className="md:col-span-6 relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                type="text"
                placeholder="Rechercher un cours (ex: Design, AI, Strategy...)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Level Filter */}
            <div className="md:col-span-3">
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="w-full h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-elab-500 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200"
              >
                <option value="all">Tous les niveaux</option>
                <option value="Beginner">Débutant</option>
                <option value="Intermediate">Intermédiaire</option>
                <option value="Advanced">Avancé</option>
              </select>
            </div>

            {/* Sort Select */}
            <div className="md:col-span-3">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-elab-500 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200"
              >
                <option value="featured">Populaires d'abord</option>
                <option value="rating">Mieux notés</option>
                <option value="price-low">Prix : croissant</option>
                <option value="price-high">Prix : décroissant</option>
              </select>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                selectedCategory === 'all'
                  ? 'bg-elab-600 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300'
              }`}
            >
              Toutes catégories ({DEMO_COURSES.length})
            </button>
            {DEMO_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.slug)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                  selectedCategory === cat.slug
                    ? 'bg-elab-600 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Results Grid */}
        {filteredCourses.length === 0 ? (
          <div className="my-20 text-center bg-white dark:bg-slate-900 p-12 rounded-3xl border border-slate-200 dark:border-slate-800">
            <BookOpen className="mx-auto h-12 w-12 text-slate-400" />
            <h3 className="mt-4 text-lg font-bold text-slate-900 dark:text-slate-100">
              Aucun cours ne correspond à votre recherche
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              Essayez de modifier vos filtres ou de réinitialiser vos mots-clés.
            </p>
            <Button
              className="mt-6"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setSelectedLevel('all');
              }}
            >
              Réinitialiser les filtres
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
