"use client";

import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Check, Loader2 } from "lucide-react";
import Link from "next/link";

export default function CheckoutPage() {
    const { items, subtotal, clearCart, totalItems } = useCart();
    const router = useRouter();

    const [mounted, setMounted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        deliveryMethod: "delivery",
        address: "",
        notes: "",
        paymentMethod: "cod"
    });

    const deliveryFee = subtotal > 0 && formData.deliveryMethod === "delivery" ? 50 : 0;
    const total = subtotal + deliveryFee;

    useEffect(() => setMounted(true), []);

    if (!mounted) return null;

    if (items.length === 0) {
        return (
            <div className="min-h-screen bg-cream flex flex-col items-center pt-32 px-4 text-center">
                <h1 className="text-3xl font-bold text-espresso mb-4">No items to checkout</h1>
                <Link href="/menu" className="text-terracotta hover:underline">Return to Menu</Link>
            </div>
        );
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (isSubmitting) return;

        setIsSubmitting(true);

        // Simulate network delay
        await new Promise(r => setTimeout(r, 1500));

        // Generate Mock Order
        const orderId = "LIIX" + Math.floor(1000 + Math.random() * 9000);
        const newOrder = {
            orderId,
            items,
            total,
            status: "Order Placed", // initial status
            customer: formData,
            timestamp: new Date().toISOString(),
        };

        // Save mock order specifically for tracking mock functionality
        const existingOrders = JSON.parse(localStorage.getItem("liitreats_orders") || "[]");
        localStorage.setItem("liitreats_orders", JSON.stringify([...existingOrders, newOrder]));

        clearCart();
        router.push(`/tracking/${orderId}`);
    };

    return (
        <div className="min-h-screen bg-cream py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-4xl font-extrabold text-espresso tracking-tight mb-8">Checkout</h1>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-12">

                    {/* Customer Form */}
                    <div className="lg:col-span-2 space-y-8">
                        <div className="bg-white p-8 rounded-3xl border border-border-light shadow-sm">
                            <h2 className="text-2xl font-bold text-espresso mb-6">Contact & Delivery</h2>

                            <div className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-espresso mb-2">Full Name</label>
                                        <input
                                            required
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 rounded-xl border border-border-light focus:ring-2 focus:ring-terracotta/50 focus:border-terracotta outline-none transition-all"
                                            placeholder="Jane Doe"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-espresso mb-2">Phone Number</label>
                                        <input
                                            required
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 rounded-xl border border-border-light focus:ring-2 focus:ring-terracotta/50 focus:border-terracotta outline-none transition-all"
                                            placeholder="+251 900 000 000"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-espresso mb-2">Order Type</label>
                                    <div className="flex gap-4">
                                        <label className="flex-1">
                                            <input
                                                type="radio" name="deliveryMethod" value="delivery"
                                                checked={formData.deliveryMethod === "delivery"}
                                                onChange={handleInputChange}
                                                className="peer sr-only"
                                            />
                                            <div className="p-4 rounded-xl border border-border-light text-center cursor-pointer peer-checked:border-terracotta peer-checked:bg-terracotta/5 transition-all">
                                                <span className="font-bold text-espresso">Delivery</span>
                                            </div>
                                        </label>
                                        <label className="flex-1">
                                            <input
                                                type="radio" name="deliveryMethod" value="pickup"
                                                checked={formData.deliveryMethod === "pickup"}
                                                onChange={handleInputChange}
                                                className="peer sr-only"
                                            />
                                            <div className="p-4 rounded-xl border border-border-light text-center cursor-pointer peer-checked:border-terracotta peer-checked:bg-terracotta/5 transition-all">
                                                <span className="font-bold text-espresso">Pickup</span>
                                            </div>
                                        </label>
                                    </div>
                                </div>

                                {formData.deliveryMethod === "delivery" && (
                                    <div>
                                        <label className="block text-sm font-medium text-espresso mb-2">Delivery Address</label>
                                        <textarea
                                            required
                                            name="address"
                                            value={formData.address}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 rounded-xl border border-border-light focus:ring-2 focus:ring-terracotta/50 focus:border-terracotta outline-none transition-all"
                                            placeholder="Apartment, Studio, or Floor, Street address..."
                                            rows={3}
                                        />
                                    </div>
                                )}

                                <div>
                                    <label className="block text-sm font-medium text-espresso mb-2">Order Notes (Optional)</label>
                                    <textarea
                                        name="notes"
                                        value={formData.notes}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 rounded-xl border border-border-light focus:ring-2 focus:ring-terracotta/50 focus:border-terracotta outline-none transition-all"
                                        placeholder="Any special instructions..."
                                        rows={2}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-8 rounded-3xl border border-border-light shadow-sm">
                            <h2 className="text-2xl font-bold text-espresso mb-6">Payment</h2>
                            <div className="space-y-4">
                                <label className="flex w-full">
                                    <input
                                        type="radio" name="paymentMethod" value="cod"
                                        checked={formData.paymentMethod === "cod"}
                                        onChange={handleInputChange}
                                        className="peer sr-only"
                                    />
                                    <div className="w-full p-4 flex items-center justify-between rounded-xl border border-border-light cursor-pointer peer-checked:border-olive peer-checked:bg-olive/5 transition-all">
                                        <span className="font-bold text-espresso">Cash on Delivery</span>
                                        {formData.paymentMethod === "cod" && <Check className="w-5 h-5 text-olive" />}
                                    </div>
                                </label>
                                <label className="flex w-full opacity-50 cursor-not-allowed">
                                    <input type="radio" name="paymentMethod" value="card" disabled className="peer sr-only" />
                                    <div className="w-full p-4 flex items-center justify-between rounded-xl border border-border-light">
                                        <span className="font-bold text-espresso">Credit Card (Coming soon)</span>
                                    </div>
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Checkout Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-white p-8 rounded-3xl border border-border-light shadow-sm sticky top-28">
                            <h2 className="text-xl font-bold text-espresso mb-6">Order Review</h2>

                            <div className="space-y-4 mb-6">
                                {items.map(cartItem => (
                                    <div key={cartItem.cartItemId} className="flex justify-between items-start text-sm">
                                        <div className="flex-1 pr-4">
                                            <span className="font-semibold text-espresso">{cartItem.quantity}x {cartItem.item.name}</span>
                                            {cartItem.selectedToppings.length > 0 && (
                                                <div className="text-muted-text text-xs mt-1">
                                                    +{cartItem.selectedToppings.map(t => t.name).join(", ")}
                                                </div>
                                            )}
                                        </div>
                                        <span className="font-medium text-espresso shrink-0 text-right">
                                            {(cartItem.item.basePrice + cartItem.selectedToppings.reduce((a, b) => a + b.price, 0)) * cartItem.quantity} ETB
                                        </span>
                                    </div>
                                ))}
                            </div>

                            <div className="space-y-3 pt-6 border-t border-border-light text-sm mb-6">
                                <div className="flex justify-between text-muted-text">
                                    <span>Subtotal</span>
                                    <span className="text-espresso font-medium">{subtotal} ETB</span>
                                </div>
                                <div className="flex justify-between text-muted-text">
                                    <span>Delivery Fee</span>
                                    <span className="text-espresso font-medium">{deliveryFee} ETB</span>
                                </div>
                            </div>

                            <div className="pt-4 border-t border-border-light mb-8 flex justify-between items-center">
                                <span className="text-lg font-bold text-espresso">Total</span>
                                <span className="text-2xl font-extrabold text-terracotta">{total} ETB</span>
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full py-4 bg-terracotta hover:bg-terracotta-hover text-white font-bold rounded-full transition-all shadow-lg shadow-terracotta/20 flex justify-center items-center disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="w-5 h-5 mr-2 animate-spin" /> Processing...
                                    </>
                                ) : (
                                    `Place Order • ${total} ETB`
                                )}
                            </button>
                        </div>
                    </div>

                </form>
            </div>
        </div>
    );
}
