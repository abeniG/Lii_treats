export default function MangaAccent({ className = "", styleType = 1 }: { className?: string, styleType?: 1 | 2 | 3 }) {
    // styleType 1: Burst sparks
    // styleType 2: Action lines
    // styleType 3: Curved accent
    return (
        <div className={`absolute pointer-events-none opacity-80 ${className}`} aria-hidden="true">
            {styleType === 1 && (
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 0C21 8 26 13 34 14C26 15 21 20 20 28C19 20 14 15 6 14C14 13 19 8 20 0Z" fill="currentColor" />
                    <circle cx="33" cy="7" r="2" fill="currentColor" />
                    <circle cx="7" cy="31" r="1.5" fill="currentColor" />
                </svg>
            )}
            {styleType === 2 && (
                <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 26L12 4M10 28L18 8M18 29L24 13" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            )}
            {styleType === 3 && (
                <svg width="40" height="20" viewBox="0 0 40 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 15C10 5 25 3 37 13" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                    <path d="M9 18C15 10 25 8 33 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
                </svg>
            )}
        </div>
    );
}
