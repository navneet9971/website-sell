"use client"

import create from 'zustand';

const useCartStore = create((set) => ({
    cartCount: 0,
    increaseCartCount: () => set((state) => ({ cartCount: state.cartCount + 1 })),
}));

export default useCartStore;
