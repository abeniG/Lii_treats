"use client";

import { useState, useEffect } from "react";
import { Search, Package, TrendingUp, DollarSign, Clock, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

const STATUSES = [
    "Order Placed",
    "Order Confirmed",
    "Preparing Your Food",
    "Ready for Pickup / Out for Delivery",
    "Completed",
    "Cancelled",
];

const ADMIN_PIN = "1234";

export default function AdminDashboard() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [pin, setPin] = useState("");
    const [error, setError] = useState("");
    const [orders, setOrders] = useState<any[]>([]);

    const loadOrders = () => {
        const data = JSON.parse(localStorage.getItem("liitreats_orders") || "[]");
        // reverse so newest are first
        setOrders(data.reverse());
    };

    useEffect(() => {
        if (isAuthenticated) {
            loadOrders();
            const interval = setInterval(loadOrders, 5000); // refresh incoming orders
            return () => clearInterval(interval);
        }
    }, [isAuthenticated]);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (pin === ADMIN_PIN) {
            setIsAuthenticated(true);
        } else {
            setError("Incorrect PIN. Try 1234");
        }
    };

    const updateOrderStatus = (orderId: string, newStatus: string) => {
        const updated = orders.map((o) => (o.orderId === orderId ? { ...o, status: newStatus } : o));
        setOrders(updated);
        // save to local storage (un-reverse before saving)
        localStorage.setItem("liitreats_orders", JSON.stringify([...updated].reverse()));
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-cream flex flex-col items-center justify-center p-4">
                <div className="bg-white p-8 rounded-3xl border border-border-light shadow-2xl max-w-sm w-full relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-olive to-terracotta" />
                    <div className="text-center mb-8">
                        <h1 className="text-2xl font-extrabold text-espresso tracking-tight">Admin Gateway</h1>
                        <p className="text-sm text-muted-text mt-1">Authorized personnel only.</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-espresso mb-2">Access PIN</label>
                            <input
                                type="password"
                                value={pin}
                                onChange={(e) => setPin(e.target.value)}
                                className="w-full px-4 py-3 text-center tracking-widest text-xl rounded-xl border border-border-light focus:ring-2 focus:ring-terracotta/50 focus:border-terracotta outline-none transition-all"
                                placeholder="****"
                                autoFocus
                            />
                            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                        </div>
                        <button
                            type="submit"
                            className="w-full py-3 bg-espresso hover:bg-black text-white font-bold rounded-xl transition-all"
                        >
                            Verify Access
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    // Dashboard Stats
    const activeOrders = orders.filter(o => !["Completed", "Cancelled"].includes(o.status));
    const completedOrders = orders.filter(o => o.status === "Completed");
    const totalRevenue = completedOrders.reduce((sum, o) => sum + o.total, 0);

    return (
        <div className="min-h-screen bg-cream py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-extrabold text-espresso">Management Dashboard</h1>
                        <p className="text-muted-text">Overview and real-time operations</p>
                    </div>
                    <button
                        onClick={loadOrders}
                        className="inline-flex items-center px-4 py-2 bg-white border border-border-light text-espresso font-semibold rounded-full hover:bg-olive hover:text-white transition-all shadow-sm"
                    >
                        <RefreshCw className="w-4 h-4 mr-2" /> Refresh Data
                    </button>
                </div>

                {/* Stats Row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-3xl border border-border-light shadow-sm flex items-center">
                        <div className="w-12 h-12 rounded-full bg-olive/10 flex items-center justify-center mr-4">
                            <Clock className="w-6 h-6 text-olive" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-muted-text">Active Orders</p>
                            <p className="text-2xl font-bold text-espresso">{activeOrders.length}</p>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-3xl border border-border-light shadow-sm flex items-center">
                        <div className="w-12 h-12 rounded-full bg-terracotta/10 flex items-center justify-center mr-4">
                            <Package className="w-6 h-6 text-terracotta" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-muted-text">Completed Today</p>
                            <p className="text-2xl font-bold text-espresso">{completedOrders.length}</p>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-3xl border border-border-light shadow-sm flex items-center">
                        <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mr-4">
                            <DollarSign className="w-6 h-6 text-green-700" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-muted-text">Revenue</p>
                            <p className="text-2xl font-bold text-espresso">{totalRevenue.toLocaleString()} ETB</p>
                        </div>
                    </div>
                </div>

                {/* Orders Table */}
                <div className="bg-white rounded-3xl border border-border-light shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-border-light flex justify-between items-center">
                        <h2 className="text-xl font-bold text-espresso">Live Orders</h2>
                        <div className="text-xs font-semibold px-3 py-1 bg-olive/10 text-olive rounded-full flex items-center">
                            <span className="w-2 h-2 rounded-full bg-olive animate-pulse mr-2" /> Live
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-cream/50 text-muted-text text-sm uppercase tracking-wider">
                                    <th className="p-4 font-medium">Order ID</th>
                                    <th className="p-4 font-medium">Customer</th>
                                    <th className="p-4 font-medium">Items</th>
                                    <th className="p-4 font-medium">Total</th>
                                    <th className="p-4 font-medium">Status Update</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border-light">
                                {orders.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="p-8 text-center text-muted-text">No orders yet.</td>
                                    </tr>
                                ) : (
                                    orders.map(order => (
                                        <tr key={order.orderId} className="hover:bg-gray-50 transition-colors">
                                            <td className="p-4 font-mono font-bold text-espresso">#{order.orderId}</td>
                                            <td className="p-4">
                                                <div className="font-semibold text-espresso">{order.customer.name}</div>
                                                <div className="text-xs text-muted-text">{order.customer.phone} - {order.customer.deliveryMethod}</div>
                                            </td>
                                            <td className="p-4 text-sm max-w-[200px] truncate">
                                                {order.items.map((i: any) => `${i.quantity}x ${i.item.name}`).join(", ")}
                                            </td>
                                            <td className="p-4 font-bold text-terracotta">{order.total} ETB</td>
                                            <td className="p-4">
                                                <select
                                                    value={order.status}
                                                    onChange={(e) => updateOrderStatus(order.orderId, e.target.value)}
                                                    className={cn(
                                                        "text-sm font-semibold rounded-full px-4 py-2 border outline-none appearance-none cursor-pointer",
                                                        order.status === "Completed" ? "bg-green-100 text-green-800 border-green-200" :
                                                            order.status.includes("Cancelled") ? "bg-red-100 text-red-800 border-red-200" :
                                                                "bg-white border-border-light text-espresso focus:border-terracotta"
                                                    )}
                                                >
                                                    {STATUSES.map(s => (
                                                        <option key={s} value={s}>{s}</option>
                                                    ))}
                                                </select>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </div>
    );
}
