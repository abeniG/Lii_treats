"use client";

import Link from "next/link";
import { ShoppingCart, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useCart } from "@/context/CartContext";

export default function Navigation() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { totalItems } = useCart();

    useEffect(() => {
        setMounted(true);
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const navLinks = [
        { name: "Menu", href: "/menu" },
        { name: "How It Works", href: "/#how-it-works" },
        { name: "Order Tracking", href: "/tracking" },
    ];

    return (
        <nav className={cn(
            "sticky top-0 z-50 w-full border-b border-border-light transition-all duration-300",
            scrolled
                ? "bg-surface/95 backdrop-blur-md shadow-sm"
                : "bg-background/90 backdrop-blur-sm"
        )}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    {/* Logo — Kaushan Script brush font */}
                    <Link href="/" className="flex-shrink-0 flex items-center">
                        <span className="font-display text-3xl tracking-wide text-primary">
                            Lii<span className="text-secondary-accent">_</span>treats
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="font-body text-muted hover:text-primary transition-colors font-medium text-sm tracking-wide"
                            >
                                {link.name}
                            </Link>
                        ))}

                        <Link
                            href="/cart"
                            className="flex items-center text-primary hover:text-secondary-accent transition-colors relative group"
                            aria-label="Shopping Cart"
                        >
                            <div className="p-2 bg-background rounded-full border border-border-light group-hover:border-secondary-accent transition-colors">
                                <ShoppingCart className="w-5 h-5" />
                            </div>
                            {mounted && totalItems > 0 && (
                                <span className="absolute -top-1 -right-1 bg-secondary-accent text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center shadow-sm">
                                    {totalItems}
                                </span>
                            )}
                        </Link>
                    </div>

                    {/* Mobile */}
                    <div className="flex items-center space-x-4 md:hidden">
                        <Link href="/cart" className="text-primary relative" aria-label="Shopping Cart">
                            <ShoppingCart className="w-6 h-6" />
                            {mounted && totalItems > 0 && (
                                <span className="absolute -top-2 -right-2 bg-secondary-accent text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                                    {totalItems}
                                </span>
                            )}
                        </Link>
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="text-primary p-2 -mr-2"
                            aria-expanded={isMobileMenuOpen}
                            aria-label="Toggle navigation"
                        >
                            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden border-t border-border-light bg-surface/95 backdrop-blur-md absolute w-full shadow-lg">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="block px-3 py-3 text-base font-medium text-primary hover:bg-background hover:text-secondary-accent rounded-md transition-colors"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </nav>
    );
}
