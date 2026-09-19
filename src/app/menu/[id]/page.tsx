"use client";

import { use } from "react";
import Image from "next/image";
import { menuItems, Topping } from "@/data/menu";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ChevronLeft, Check, Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export default function CustomizationPage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = use(params);
    const router = useRouter();
    const { addItem } = useCart();

    const item = menuItems.find((m) => m.id === resolvedParams.id);

    const [selectedToppings, setSelectedToppings] = useState<Topping[]>([]);
    const [quantity, setQuantity] = useState(1);

    if (!item) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-cream">
                <h1 className="text-3xl font-bold text-espresso mb-4">Item Not Found</h1>
                <button onClick={() => router.back()} className="text-terracotta hover:underline">
                    Go Back
                </button>
            </div>
        );
    }

    const toggleTopping = (topping: Topping) => {
        setSelectedToppings(prev =>
            prev.some(t => t.id === topping.id)
                ? prev.filter(t => t.id !== topping.id)
                : [...prev, topping]
        );
    };

    const handleAddToCart = () => {
        addItem(item, selectedToppings, quantity);
        router.push("/cart");
    };

    const currentPrice = item.basePrice + selectedToppings.reduce((acc, t) => acc + t.price, 0);

    return (
        <div className="min-h-screen bg-cream py-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

                <button
                    onClick={() => router.back()}
                    className="inline-flex items-center text-sm font-medium text-muted-text hover:text-espresso mb-8 transition-colors"
                >
                    <ChevronLeft className="w-4 h-4 mr-1" /> Back to Menu
                </button>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-white p-6 md:p-12 rounded-3xl border border-border-light shadow-sm">
                    {/* Image Area */}
                    <div className="aspect-square bg-gray-50 rounded-2xl border border-border-light flex items-center justify-center relative overflow-hidden">
                        {item.image ? (
                            <Image
                                src={item.image}
                                alt={item.name}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, 50vw"
                                priority
                            />
                        ) : (
                            <>
                                <div className="absolute inset-0 bg-gradient-to-tr from-olive/10 to-terracotta/5" />
                                <span className="text-8xl relative z-10 opacity-70">
                                    {item.category === "rice-bowls" ? "🍲" : "🥗"}
                                </span>
                            </>
                        )}
                    </div>

                    <div className="flex flex-col">
                        <h1 className="text-3xl font-extrabold text-espresso mb-3">{item.name}</h1>
                        <p className="text-muted-text mb-6 pb-6 border-b border-border-light">{item.description}</p>

                        <div className="flex items-center justify-between mb-8">
                            <span className="text-xl font-bold text-espresso">Base Price</span>
                            <span className="text-xl font-bold text-terracotta">{item.basePrice} ETB</span>
                        </div>

                        {/* Customization Options */}
                        {item.toppingsAllowed.length > 0 && (
                            <div className="mb-8">
                                <h3 className="text-lg font-bold text-espresso mb-4">Add Toppings (Optional)</h3>
                                <div className="space-y-3">
                                    {item.toppingsAllowed.map(topping => {
                                        const isSelected = selectedToppings.some(t => t.id === topping.id);
                                        return (
                                            <button
                                                key={topping.id}
                                                onClick={() => toggleTopping(topping)}
                                                className={cn(
                                                    "w-full flex items-center justify-between p-4 rounded-xl border text-left transition-all",
                                                    isSelected
                                                        ? "border-olive bg-olive/5 shadow-sm"
                                                        : "border-border-light hover:border-olive/50 bg-white"
                                                )}
                                            >
                                                <div className="flex items-center">
                                                    <div className={cn(
                                                        "w-6 h-6 mr-3 rounded-full flex items-center justify-center border transition-colors",
                                                        isSelected ? "bg-olive border-olive" : "border-gray-300"
                                                    )}>
                                                        {isSelected && <Check className="w-4 h-4 text-white" />}
                                                    </div>
                                                    <span className={cn("font-medium", isSelected ? "text-espresso" : "text-muted-text")}>
                                                        {topping.name}
                                                    </span>
                                                </div>
                                                <span className="text-sm font-semibold text-terracotta">
                                                    {topping.price > 0 ? `+${topping.price} ETB` : "Free"}
                                                </span>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        {/* Controls & Add to Cart */}
                        <div className="mt-auto pt-8 border-t border-border-light flex flex-col space-y-6">
                            <div className="flex items-center justify-between">
                                <span className="font-bold text-espresso">Quantity</span>
                                <div className="flex items-center space-x-4 bg-cream border border-border-light rounded-full p-1">
                                    <button
                                        className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white text-espresso transition-colors disabled:opacity-50"
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        disabled={quantity <= 1}
                                    >
                                        <Minus className="w-5 h-5" />
                                    </button>
                                    <span className="font-bold text-espresso w-4 text-center">{quantity}</span>
                                    <button
                                        className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white text-espresso transition-colors"
                                        onClick={() => setQuantity(quantity + 1)}
                                    >
                                        <Plus className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>

                            <button
                                onClick={handleAddToCart}
                                className="w-full py-4 bg-terracotta hover:bg-terracotta-hover text-white font-bold rounded-full transition-all shadow-lg shadow-terracotta/20 flex justify-between items-center px-8"
                            >
                                <span>Add to Cart</span>
                                <span>{currentPrice * quantity} ETB</span>
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
