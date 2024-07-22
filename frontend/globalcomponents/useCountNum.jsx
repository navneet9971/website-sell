"use client";

import create from 'zustand';

const useCountNum = create((set) => ({
  likeCount: 0,
  cartCount: 0,
  increaseLikeCount: () => set((state) => ({ likeCount: state.likeCount + 1 })),
  decreaseLikeCount: () => set((state) => ({ likeCount: state.likeCount - 1 })),
  increaseCartCount: () => set((state) => ({ cartCount: state.cartCount + 1 })),
  decreaseCartCount: () => set((state) => ({ cartCount: state.cartCount - 1 })),
}));

export default useCountNum;
