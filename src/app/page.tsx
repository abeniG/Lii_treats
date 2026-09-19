import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Leaf, Clock, ShoppingBag } from "lucide-react";

const featuredMenu = [
  {
    id: "chicken-bowl",
    name: "Chicken Bowl",
    desc: "Tender, flavorful chicken with fresh toppings and a bed of premium rice.",
    price: 400,
    image: "/images/Chicken Bowl.png",
    badge: "Most Popular",
  },
  {
    id: "beef-bowl",
    name: "Beef Bowl",
    desc: "Juicy beef with fresh toppings and a bed of premium rice.",
    price: 350,
    image: "/images/Beef Bowl.png",
    badge: null,
  },
  {
    id: "veggie-bowl",
    name: "Veggie Bowl",
    desc: "Fresh, vibrant vegetables with tasty toppings and a bed of premium rice.",
    price: 300,
    image: "/images/Veggie Bowl.png",
    badge: null,
  },
];

export default function Home() {
  return (
    <div className="flex flex-col w-full">

      {/* ── HERO ───────────────────────────────────────────────── */}
      <section className="relative w-full py-16 md:py-24 overflow-hidden bg-background">
        {/* Ambient blobs */}
        <div className="absolute -top-32 right-0 w-[500px] h-[500px] bg-accent/10 rounded-full blur-3xl pointer-events-none opacity-70" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-secondary-accent/10 rounded-full blur-3xl pointer-events-none opacity-50" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

            {/* Text */}
            <div className="flex flex-col items-start text-left space-y-5 max-w-xl">
              <span className="font-body text-secondary-accent font-semibold tracking-widest uppercase text-xs">
                Fresh &amp; Customizable
              </span>
              <h1 className="font-heading text-5xl md:text-6xl text-primary leading-[1.1]">
                Modern Rice Bowls,<br />
                <span className="text-secondary-accent">Engineered</span> for Taste.
              </h1>
              <p className="font-body text-muted max-w-md leading-relaxed text-base">
                Premium flavors, bold ingredients, complete customization — all at Lii_treats.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Link
                  href="/menu"
                  className="font-body inline-flex items-center justify-center px-7 py-3.5 text-white bg-secondary-accent hover:bg-terracotta-hover transition-all rounded-full font-semibold text-sm shadow-lg shadow-secondary-accent/20"
                >
                  Order Your Bowl
                </Link>
                <Link
                  href="/#how-it-works"
                  className="font-body inline-flex items-center justify-center px-7 py-3.5 text-primary bg-surface border border-border-light hover:border-secondary-accent hover:text-secondary-accent transition-all rounded-full font-semibold text-sm"
                >
                  Explore Menu
                </Link>
              </div>
            </div>

            {/* Hero image — Chicken Bowl, smaller, cloud of steam */}
            <div className="relative w-full flex justify-center">
              {/* Outer glow ring */}
              <div className="absolute inset-0 rounded-3xl bg-accent/8 blur-2xl scale-95 pointer-events-none" />

              <div className="relative w-full max-w-[400px] md:max-w-[440px] aspect-[4/5] rounded-3xl shadow-2xl border border-border-light overflow-hidden bg-surface">
                <Image
                  src="/images/Chicken Bowl.png"
                  alt="Signature Chicken Bowl"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 768px) 90vw, 440px"
                  priority
                />

                {/* ── STEAM EFFECT ─── */}
                <div aria-hidden="true">
                  <div className="smoke-puff smoke-puff-1" />
                  <div className="smoke-puff smoke-puff-2" />
                  <div className="smoke-puff smoke-puff-3" />
                  <div className="smoke-puff smoke-puff-4" />
                </div>

                {/* Overlay badge */}
                <div className="absolute bottom-4 left-4 right-4 bg-primary/85 backdrop-blur-sm rounded-2xl px-4 py-3 flex items-center justify-between shadow-xl">
                  <div>
                    <p className="font-body text-secondary-accent text-[10px] font-semibold uppercase tracking-widest mb-0.5">
                      Signature Bowl
                    </p>
                    <h3 className="font-display text-white text-lg leading-none">Chicken Bowl</h3>
                  </div>
                  <span className="font-price text-xl text-secondary-accent">400 ETB</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── FEATURED MENU ─────────────────────────────────────── */}
      <section className="py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-10">
            <div>
              <span className="font-body text-secondary-accent text-xs font-semibold uppercase tracking-widest block mb-2">
                What we serve
              </span>
              <h2 className="font-heading text-4xl text-primary">Our Signature Bowls</h2>
            </div>
            <Link href="/menu" className="hidden sm:inline-flex items-center font-body text-secondary-accent font-semibold hover:opacity-80 transition-opacity text-sm">
              Full menu <ArrowRight className="ml-1.5 w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredMenu.map((item) => (
              <div key={item.id} className="group flex flex-col bg-background rounded-3xl border border-border-light overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative">
                {item.badge && (
                  <span className="absolute top-3 left-3 z-10 font-body text-xs font-bold text-white bg-secondary-accent px-3 py-1 rounded-full shadow">
                    {item.badge}
                  </span>
                )}
                <div className="aspect-[5/4] relative overflow-hidden bg-surface">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-heading text-xl text-primary">{item.name}</h3>
                    <span className="font-price text-secondary-accent text-base">{item.price} ETB</span>
                  </div>
                  <p className="font-body text-muted text-sm mb-5 flex-grow leading-relaxed">{item.desc}</p>
                  <Link
                    href={`/menu/${item.id}`}
                    className="font-body w-full inline-flex items-center justify-center px-5 py-2.5 bg-surface text-primary border border-border-light font-medium rounded-full text-sm hover:bg-primary hover:text-white hover:border-primary transition-colors"
                  >
                    Customize &amp; Add
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 text-center sm:hidden">
            <Link href="/menu" className="font-body inline-flex items-center text-secondary-accent font-semibold text-sm">
              Full menu <ArrowRight className="ml-1.5 w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── WHY LII_TREATS ──────────────────────────────────── */}
      <section id="how-it-works" className="py-20 bg-primary text-white relative overflow-hidden">
        {/* Subtle smoke-like soft blobs in the background */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-accent/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-secondary-accent/20 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="font-heading text-4xl mb-4 text-white">Taste the Difference</h2>
            <p className="font-body text-white/70 leading-relaxed">
              We bring precision and care to your everyday nourishment — seamlessly from order to delivery.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                Icon: Leaf,
                title: "Fresh Ingredients",
                desc: "Sourced from quality suppliers, prepared fresh daily for maximum flavor and nutrition.",
              },
              {
                Icon: ShoppingBag,
                title: "Customizable Meals",
                desc: "Your bowl exactly how you want it. Select your base, salads, and signature toppings.",
              },
              {
                Icon: Clock,
                title: "Convenient Tracking",
                desc: "Know exactly when your food is ready with real-time order status tracking.",
              },
            ].map(({ Icon, title, desc }) => (
              <div key={title} className="flex flex-col items-center text-center space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center">
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-heading text-xl text-white">{title}</h3>
                <p className="font-body text-white/65 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
