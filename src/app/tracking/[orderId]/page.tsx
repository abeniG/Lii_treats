"use client";

import { use } from "react";
import { useEffect, useState } from "react";
import { CheckCircle2, Clock, ChefHat, Bike, Check, Package, XCircle } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const orderTimeline = [
    { status: "Order Placed", label: "Order Placed", icon: Clock },
    { status: "Order Confirmed", label: "Confirmed", icon: CheckCircle2 },
    { status: "Preparing Your Food", label: "Preparing", icon: ChefHat },
    { status: "Ready for Pickup / Out for Delivery", label: "Dispatched", icon: Bike }, // or Package
    { status: "Completed", label: "Completed", icon: Check }
];

export default function OrderTrackingPage({ params }: { params: Promise<{ orderId: string }> }) {
    const resolvedParams = use(params);
    const [order, setOrder] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    // Poll for updates to simulate real-time
    useEffect(() => {
        const fetchOrder = () => {
            const allOrders = JSON.parse(localStorage.getItem("liitreats_orders") || "[]");
            const found = allOrders.find((o: any) => o.orderId === resolvedParams.orderId);
            if (found) setOrder(found);
            setLoading(false);
        };

        fetchOrder();
        const interval = setInterval(fetchOrder, 3000); // query every 3 seconds for mock updates
        return () => clearInterval(interval);
    }, [resolvedParams.orderId]);

    if (loading) {
        return (
            <div className="min-h-screen bg-cream flex justify-center items-center">
                <div className="animate-spin w-8 h-8 border-4 border-terracotta border-t-transparent rounded-full"></div>
            </div>
        );
    }

    if (!order) {
        return (
            <div className="min-h-screen bg-cream flex flex-col justify-center items-center p-4 text-center">
                <h1 className="text-3xl font-bold text-espresso mb-4">Order Not Found</h1>
                <p className="text-muted-text mb-8">We couldn't find an order with this ID.</p>
                <Link href="/" className="text-terracotta hover:underline">Go Home</Link>
            </div>
        );
    }

    const isCancelled = order.status === "Cancelled" || order.status === "Rejected" || order.status === "Failed";

    // Find current index
    let currentIndex = orderTimeline.findIndex(t => t.status === order.status);
    if (currentIndex === -1) {
        // maybe it's completed or cancelled
        if (order.status === "Completed") currentIndex = orderTimeline.length - 1;
        else currentIndex = 0; // fallback
    }

    return (
        <div className="min-h-screen bg-cream py-16">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="text-center mb-12">
                    <h1 className="text-3xl md:text-5xl font-extrabold text-espresso mb-4">Track Order</h1>
                    <p className="text-lg text-muted-text font-mono">#{order.orderId}</p>
                </div>

                <div className="bg-white rounded-3xl p-8 md:p-12 border border-border-light shadow-sm mb-8">

                    {isCancelled ? (
                        <div className="flex flex-col items-center justify-center py-12 text-center text-red-500">
                            <XCircle className="w-16 h-16 mb-4" />
                            <h2 className="text-2xl font-bold">Order {order.status}</h2>
                            <p className="text-muted-text mt-2 text-espresso">Please contact the restaurant for more details.</p>
                        </div>
                    ) : (
                        <div className="relative">
                            {/* Progress bar line */}
                            <div className="absolute top-8 left-8 right-8 h-1 bg-border-light hidden md:block z-0" />
                            <div
                                className="absolute top-8 left-8 h-1 bg-olive hidden md:block z-0 transition-all duration-1000 ease-out"
                                style={{ width: `${(currentIndex / (orderTimeline.length - 1)) * 100}%` }}
                            />

                            <div className="flex flex-col md:flex-row justify-between relative z-10 gap-8 md:gap-0">
                                {orderTimeline.map((step, index) => {
                                    const isCompleted = index <= currentIndex;
                                    const isActive = index === currentIndex;
                                    const Icon = step.icon;
                                    return (
                                        <div key={index} className="flex flex-row md:flex-col items-center gap-4 md:gap-0">
                                            <div className={cn(
                                                "w-16 h-16 rounded-full flex items-center justify-center transition-all duration-500 border-4",
                                                isActive ? "bg-olive border-olive/20 text-white shadow-lg scale-110" :
                                                    isCompleted ? "bg-olive border-olive text-white" : "bg-white border-border-light text-muted-text"
                                            )}>
                                                <Icon className="w-6 h-6" />
                                            </div>

                                            {/* Mobile connector line */}
                                            {index !== orderTimeline.length - 1 && (
                                                <div className={cn(
                                                    "h-12 w-1 md:hidden transition-all duration-500",
                                                    isCompleted ? "bg-olive" : "bg-border-light"
                                                )} />
                                            )}

                                            <div className="md:mt-4 md:text-center flex-1">
                                                <span className={cn(
                                                    "font-bold block",
                                                    isActive ? "text-espresso text-lg" : isCompleted ? "text-espresso" : "text-muted-text"
                                                )}>
                                                    {step.label}
                                                </span>
                                                {isActive && <span className="text-xs text-olive animate-pulse">Current Status</span>}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-white rounded-3xl p-8 border border-border-light shadow-sm">
                        <h3 className="text-xl font-bold text-espresso mb-4">Order Details</h3>
                        <div className="space-y-4">
                            {order.items.map((cartItem: any) => (
                                <div key={cartItem.cartItemId} className="flex justify-between items-start text-sm">
                                    <div className="flex-1 pr-4">
                                        <span className="font-semibold text-espresso">{cartItem.quantity}x {cartItem.item.name}</span>
                                        {cartItem.selectedToppings.length > 0 && (
                                            <div className="text-muted-text text-xs mt-1">
                                                +{cartItem.selectedToppings.map((t: any) => t.name).join(", ")}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                            <div className="pt-4 border-t border-border-light mt-4 flex justify-between font-bold text-espresso text-lg">
                                <span>Total</span>
                                <span>{order.total} ETB</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-3xl p-8 border border-border-light shadow-sm">
                        <h3 className="text-xl font-bold text-espresso mb-4">Customer Info</h3>
                        <div className="space-y-2 text-sm text-muted-text">
                            <p><strong className="text-espresso">Name:</strong> {order.customer.name}</p>
                            <p><strong className="text-espresso">Phone:</strong> {order.customer.phone}</p>
                            <p><strong className="text-espresso">Delivery:</strong> {order.customer.deliveryMethod}</p>
                            {order.customer.deliveryMethod === 'delivery' && (
                                <p><strong className="text-espresso">Address:</strong> {order.customer.address}</p>
                            )}
                            {order.customer.notes && (
                                <p className="mt-4 p-4 bg-cream rounded-xl text-espresso italic flex">
                                    "{order.customer.notes}"
                                </p>
                            )}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
