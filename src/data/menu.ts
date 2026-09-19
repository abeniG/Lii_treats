export type Topping = {
    id: string;
    name: string;
    price: number;
};

export type MenuItem = {
    id: string;
    name: string;
    description: string;
    basePrice: number;
    category: "rice-bowls" | "salads";
    toppingsAllowed: Topping[];
    available: boolean;
    /** Path relative to /public — e.g. /images/chicken-bowl.jpg */
    image: string;
};

export const defaultToppings: Topping[] = [
    { id: "red-salad", name: "Red Salad", price: 0 },
    { id: "green-salad", name: "Green Salad", price: 0 },
    { id: "sweet-corn", name: "Sweet Corn", price: 15 },
    { id: "red-beans", name: "Red Beans", price: 15 },
    { id: "onion", name: "Onion", price: 10 },
    { id: "carrots", name: "Carrots", price: 10 },
];

export const menuItems: MenuItem[] = [
    {
        id: "chicken-bowl",
        name: "Chicken Bowl",
        description: "Tender, flavorful chicken with fresh toppings and a bed of premium rice.",
        basePrice: 400,
        category: "rice-bowls",
        toppingsAllowed: defaultToppings,
        available: true,
        image: "/images/Chicken Bowl.png",
    },
    {
        id: "beef-bowl",
        name: "Beef Bowl",
        description: "Juicy beef with fresh toppings and a bed of premium rice.",
        basePrice: 350,
        category: "rice-bowls",
        toppingsAllowed: defaultToppings,
        available: true,
        image: "/images/Beef Bowl.png",
    },
    {
        id: "veggie-bowl",
        name: "Veggie Bowl",
        description: "Fresh vegetables with tasty toppings and a bed of premium rice.",
        basePrice: 300,
        category: "rice-bowls",
        toppingsAllowed: defaultToppings,
        available: true,
        image: "/images/Veggie Bowl.png",
    },

];
