"use client";

import { useCart } from "@/context/CartContext";
import Link from "next/link";
import { Minus, Plus, Trash2, ArrowRight, ShoppingCart } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export default function CartPage() {
    const { items, updateQuantity, removeItem, subtotal, totalItems } = useCart();
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    if (!mounted) return null; // Prevent hydration mismatch on initial load

    const deliveryFee = subtotal > 0 ? 50 : 0;
    const total = subtotal + deliveryFee;

    if (items.length === 0) {
        return (
            <div className="min-h-screen bg-cream flex flex-col items-center pt-32 px-4 text-center">
                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm border border-border-light">
                    <ShoppingCart className="w-10 h-10 text-muted-text" />
                </div>
                <h1 className="text-3xl font-bold text-espresso mb-4">Your cart is empty</h1>
                <p className="text-muted-text mb-8 max-w-sm">Looks like you haven't added any premium bowls to your cart yet.</p>
                <Link
                    href="/menu"
                    className="inline-flex items-center px-8 py-4 bg-terracotta text-white font-bold rounded-full hover:bg-terracotta-hover transition-colors shadow-lg shadow-terracotta/20"
                >
                    Explore Menu
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-cream py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-4xl font-extrabold text-espresso tracking-tight mb-8">Your Order</h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Cart Items List */}
                    <div className="lg:col-span-2 space-y-6">
                        {items.map((cartItem) => {
                            const itemTotal = (cartItem.item.basePrice + cartItem.selectedToppings.reduce((s, t) => s + t.price, 0)) * cartItem.quantity;

                            return (
                                <div key={cartItem.cartItemId} className="bg-white p-6 rounded-3xl border border-border-light shadow-sm flex gap-6">
                                    <div className="w-24 h-24 bg-gray-50 rounded-2xl flex items-center justify-center text-4xl shrink-0">
                                        {cartItem.item.category === "rice-bowls" ? "🍲" : "🥗"}
                                    </div>

                                    <div className="flex-grow flex flex-col">
                                        <div className="flex justify-between items-start mb-1">
                                            <h3 className="text-xl font-bold text-espresso">{cartItem.item.name}</h3>
                                            <button
                                                onClick={() => removeItem(cartItem.cartItemId)}
                                                className="text-muted-text hover:text-terracotta transition-colors p-1"
                                                aria-label="Remove item"
                                            >
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                        </div>

                                        {cartItem.selectedToppings.length > 0 && (
                                            <div className="text-sm text-muted-text mb-4">
                                                <span className="font-medium text-espresso">Includes:</span> {cartItem.selectedToppings.map(t => t.name).join(", ")}
                                            </div>
                                        )}

                                        <div className="mt-auto flex items-center justify-between pt-4 border-t border-border-light/50">
                                            <div className="flex items-center space-x-3 bg-cream rounded-full border border-border-light p-1">
                                                <button
                                                    className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white text-espresso transition-colors disabled:opacity-50"
                                                    onClick={() => updateQuantity(cartItem.cartItemId, cartItem.quantity - 1)}
                                                    disabled={cartItem.quantity <= 1}
                                                >
                                                    <Minus className="w-4 h-4" />
                                                </button>
                                                <span className="font-bold text-espresso w-4 text-center text-sm">{cartItem.quantity}</span>
                                                <button
                                                    className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white text-espresso transition-colors"
                                                    onClick={() => updateQuantity(cartItem.cartItemId, cartItem.quantity + 1)}
                                                >
                                                    <Plus className="w-4 h-4" />
                                                </button>
                                            </div>
                                            <span className="font-bold text-espresso text-lg">{itemTotal} ETB</span>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-white p-8 rounded-3xl border border-border-light shadow-sm sticky top-28">
                            <h2 className="text-2xl font-bold text-espresso mb-6">Order Summary</h2>

                            <div className="space-y-4 mb-8 text-sm">
                                <div className="flex justify-between text-muted-text">
                                    <span>Subtotal ({totalItems} items)</span>
                                    <span className="text-espresso font-medium">{subtotal} ETB</span>
                                </div>
                                <div className="flex justify-between text-muted-text">
                                    <span>Delivery Fee</span>
                                    <span className="text-espresso font-medium">{deliveryFee} ETB</span>
                                </div>
                            </div>

                            <div className="pt-4 border-t border-border-light mb-8 flex justify-between items-center">
                                <span className="text-xl font-bold text-espresso">Total</span>
                                <span className="text-2xl font-extrabold text-terracotta">{total} ETB</span>
                            </div>

                            <Link
                                href="/checkout"
                                className="w-full py-4 bg-espresso hover:bg-black text-white font-bold rounded-full transition-all shadow-lg shadow-espresso/10 flex justify-center items-center group"
                            >
                                Proceed to Checkout
                                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
