import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-primary text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 grid grid-cols-1 md:grid-cols-4 gap-10">
                <div className="md:col-span-1">
                    <Link href="/" className="flex items-center mb-4">
                        <span className="font-display text-2xl tracking-wide text-white">
                            Lii<span className="text-secondary-accent">_</span>treats
                        </span>
                    </Link>
                    <p className="font-body text-white/60 text-sm max-w-xs leading-relaxed">
                        Premium, customizable fresh rice bowls designed for the modern taste.
                    </p>
                </div>

                <div className="md:col-span-1 flex flex-col space-y-3">
                    <h3 className="font-body text-sm font-semibold uppercase tracking-widest text-white/80">Menu</h3>
                    <Link href="/menu" className="font-body text-sm text-white/50 hover:text-white transition-colors">Rice Bowls</Link>
                    <Link href="/tracking" className="font-body text-sm text-white/50 hover:text-white transition-colors">Order Tracking</Link>
                    <Link href="/admin" className="font-body text-sm text-white/50 hover:text-white transition-colors">Admin</Link>
                </div>

                <div className="md:col-span-1 flex flex-col space-y-3">
                    <h3 className="font-body text-sm font-semibold uppercase tracking-widest text-white/80">Contact</h3>
                    <p className="font-body text-sm text-white/50">hello@liitreats.com</p>
                    <p className="font-body text-sm text-white/50">+251 900 000 000</p>
                    <p className="font-body text-sm text-white/50">123 Health Ave, Food District</p>
                </div>

                <div className="md:col-span-1 flex flex-col space-y-3">
                    <h3 className="font-body text-sm font-semibold uppercase tracking-widest text-white/80">Follow Us</h3>
                    <div className="flex space-x-3">
                        {["IG", "FB", "TW"].map(s => (
                            <a key={s} href="#" className="font-body w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-secondary-accent transition-colors text-white text-xs font-bold">{s}</a>
                        ))}
                    </div>
                </div>
            </div>

            <div className="border-t border-white/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col md:flex-row items-center justify-between">
                    <p className="font-body text-sm text-white/40">&copy; {new Date().getFullYear()} Lii_treats. All rights reserved.</p>
                    <div className="flex space-x-4 mt-3 md:mt-0">
                        <Link href="/" className="font-body text-sm text-white/40 hover:text-white transition-colors">Privacy</Link>
                        <Link href="/" className="font-body text-sm text-white/40 hover:text-white transition-colors">Terms</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
