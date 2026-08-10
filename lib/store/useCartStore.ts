import { create } from 'zustand';
import { Course } from '@/types';

interface CartState {
  items: Course[];
  addItem: (course: Course) => void;
  removeItem: (courseId: string) => void;
  clearCart: () => void;
  isInCart: (courseId: string) => boolean;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  addItem: (course) => {
    const { items } = get();
    if (!items.some((item) => item.id === course.id)) {
      set({ items: [...items, course] });
    }
  },
  removeItem: (courseId) => {
    set({ items: get().items.filter((item) => item.id !== courseId) });
  },
  clearCart: () => set({ items: [] }),
  isInCart: (courseId) => get().items.some((item) => item.id === courseId),
  getTotalPrice: () =>
    get().items.reduce((total, item) => total + Number(item.price), 0),
}));
