"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { MenuItem, Topping } from "@/data/menu";

// Generate a random ID for each cart item instance so they can be uniquely identified
// even if they represent the same menu item but with different toppings.
const generateId = () => Math.random().toString(36).substring(2, 9);

export type CartItem = {
    cartItemId: string;
    item: MenuItem;
    selectedToppings: Topping[];
    quantity: number;
};

type CartContextType = {
    items: CartItem[];
    addItem: (item: MenuItem, toppings: Topping[], quantity: number) => void;
    removeItem: (cartItemId: string) => void;
    updateQuantity: (cartItemId: string, quantity: number) => void;
    clearCart: () => void;
    totalItems: number;
    subtotal: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        // Load from local storage
        setIsMounted(true);
        const saved = localStorage.getItem("liitreats_cart");
        if (saved) {
            try {
                setItems(JSON.parse(saved));
            } catch (e) {
                console.error("Failed to parse cart", e);
            }
        }
    }, []);

    useEffect(() => {
        if (isMounted) {
            localStorage.setItem("liitreats_cart", JSON.stringify(items));
        }
    }, [items, isMounted]);

    const addItem = (item: MenuItem, toppings: Topping[], quantity: number) => {
        // We could group identical items, but for simplicity, we just add new entries
        setItems((prev) => [
            ...prev,
            { cartItemId: generateId(), item, selectedToppings: toppings, quantity },
        ]);
    };

    const removeItem = (cartItemId: string) => {
        setItems((prev) => prev.filter((i) => i.cartItemId !== cartItemId));
    };

    const updateQuantity = (cartItemId: string, quantity: number) => {
        setItems((prev) =>
            prev.map((i) =>
                i.cartItemId === cartItemId ? { ...i, quantity: Math.max(1, quantity) } : i
            )
        );
    };

    const clearCart = () => setItems([]);

    const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
    const subtotal = items.reduce((sum, item) => {
        const itemTotal = item.item.basePrice + item.selectedToppings.reduce((acc, t) => acc + t.price, 0);
        return sum + (itemTotal * item.quantity);
    }, 0);

    return (
        <CartContext.Provider value={{ items, addItem, removeItem, updateQuantity, clearCart, totalItems, subtotal }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
}
