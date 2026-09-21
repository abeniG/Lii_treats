"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { menuItems } from "@/data/menu";
import { Search, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import MangaAccent from "@/components/MangaAccent";

export default function MenuPage() {
    const [filter, setFilter] = useState<"all" | "rice-bowls">("all");
    const [searchQuery, setSearchQuery] = useState("");

    const filteredItems = menuItems.filter((item) => {
        const matchesFilter = filter === "all" || item.category === filter;
        const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesFilter && matchesSearch && item.available;
    });

    return (
        <div className="min-h-screen bg-cream py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header & Controls */}
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 space-y-6 md:space-y-0">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-extrabold text-espresso tracking-tight mb-3 relative inline-block z-10">
                            <MangaAccent styleType={2} className="-top-3 -left-6 text-terracotta/80" />
                            Our Menu
                        </h1>
                        <p className="text-muted-text text-lg max-w-xl">
                            Select a category to explore fresh, high-quality ingredients tailor-made for your bowl.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                        {/* Search */}
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search menu..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full sm:w-64 pl-10 pr-4 py-3 rounded-full border border-border-light bg-white focus:outline-none focus:ring-2 focus:ring-terracotta/50 focus:border-terracotta transition-all shadow-sm"
                            />
                            <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
                        </div>

                        {/* Filter */}
                        <div className="flex bg-white rounded-full border border-border-light p-1 shadow-sm">
                            {(["all", "rice-bowls"] as const).map((f) => (
                                <button
                                    key={f}
                                    onClick={() => setFilter(f)}
                                    className={cn(
                                        "px-4 py-2 rounded-full text-sm font-medium transition-all capitalize",
                                        filter === f
                                            ? "bg-olive text-white shadow-md"
                                            : "text-muted-text hover:text-espresso"
                                    )}
                                >
                                    {f.replace("-", " ")}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Listings */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredItems.map((item) => (
                        <div key={item.id} className="group bg-white rounded-3xl border border-border-light overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col">
                            <div className="aspect-[4/3] bg-gray-50 flex items-center justify-center relative overflow-hidden border-b border-border-light">
                                {item.image ? (
                                    <div className="absolute inset-6">
                                        <Image
                                            src={item.image}
                                            alt={item.name}
                                            fill
                                            className="object-contain group-hover:scale-110 transition-transform duration-500"
                                            sizes="(max-width: 768px) 100vw, 33vw"
                                        />
                                    </div>
                                ) : (
                                    <span className="text-5xl relative z-10 opacity-60 group-hover:scale-110 transition-transform duration-500">
                                        {item.category === "rice-bowls" ? "🍲" : "🥗"}
                                    </span>
                                )}
                                <div className="absolute inset-0 bg-gradient-to-br from-olive/5 to-terracotta/5 pointer-events-none" />
                            </div>
                            <div className="p-6 flex flex-col flex-grow">
                                <div className="flex justify-between items-start mb-4 pt-1">
                                    <h3 className="text-xl font-bold text-espresso relative inline-block z-10">
                                        <span className="brush-highlight">{item.name}</span>
                                    </h3>
                                    <span className="font-bold text-terracotta px-1 mt-1 shrink-0">
                                        <span className="brush-highlight-dark text-sm inline-block scale-90">{item.basePrice} ETB</span>
                                    </span>
                                </div>
                                <p className="text-muted-text text-sm mb-6 flex-grow">{item.description}</p>
                                <Link
                                    href={`/menu/${item.id}`}
                                    className="w-full inline-flex items-center justify-center px-6 py-3 bg-cream text-espresso border border-border-light font-medium rounded-full outline-offset-2 hover:bg-espresso hover:text-cream transition-colors group-hover:border-espresso"
                                >
                                    <Plus className="w-4 h-4 mr-2" /> Select & Customize
                                </Link>
                            </div>
                        </div>
                    ))}

                    {filteredItems.length === 0 && (
                        <div className="col-span-full py-24 text-center">
                            <p className="text-lg text-muted-text">No items found matching your criteria.</p>
                            <button
                                onClick={() => { setSearchQuery(""); setFilter("all"); }}
                                className="mt-4 text-terracotta font-semibold hover:underline"
                            >
                                Clear filters
                            </button>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
}
