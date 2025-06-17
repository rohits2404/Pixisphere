<div align="center">
    <h3 align="center">PixisPhere</h3>
</div>

## 📋 <a name="table">Table of Contents</a>

1. 🤖 [Introduction](#introduction)
2. ⚙️ [Tech Stack](#tech-stack)
3. 🤸 [Quick Start](#quick-start)
4. 🕸️ [Snippets (Code to Copy)](#snippets)
5.  🧠 [Explanation (Search,Filter)](#explanation)

## <a name="introduction">🤖 Introduction</a>

Pixisphere, a platform that connects customers with the best photographers and studios for maternity, newborn, birthday, and other special shoots.

## <a name="tech-stack">⚙️ Tech Stack</a>

- React 19
- Next.js 15
- TailwindCSS
- ShadCN
- TypeScript

## <a name="quick-start">🤸 Quick Start</a>

Follow these steps to set up the project locally on your machine.

**Prerequisites**

Make sure you have the following installed on your machine:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en)
- [npm](https://www.npmjs.com/) (Node Package Manager)

**Cloning the Repository**

```bash
git clone https://github.com/rohits2404/pixisphere.git
cd pixisphere
```

**Installation**

Install the project dependencies using npm:

```bash
npm install
```

**Running the Project**

```bash
Step-1 : npm install -g json-server
Step-2 : Save The **db.json** Provided Below in the Root Directory
Step-3 : json-server --watch db.json --port 3001

npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the project.

## <a name="snippets">🕸️ Snippets</a>

<details>
<summary><code>globals.css</code></summary>

```css
@import "tailwindcss";
@import "tw-animate-css";

@custom-variant dark (&:is(.dark *));

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --font-sans: var(--font-geist-sans);
  --font-mono: var(--font-geist-mono);
  --color-sidebar-ring: var(--sidebar-ring);
  --color-sidebar-border: var(--sidebar-border);
  --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
  --color-sidebar-accent: var(--sidebar-accent);
  --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
  --color-sidebar-primary: var(--sidebar-primary);
  --color-sidebar-foreground: var(--sidebar-foreground);
  --color-sidebar: var(--sidebar);
  --color-chart-5: var(--chart-5);
  --color-chart-4: var(--chart-4);
  --color-chart-3: var(--chart-3);
  --color-chart-2: var(--chart-2);
  --color-chart-1: var(--chart-1);
  --color-ring: var(--ring);
  --color-input: var(--input);
  --color-border: var(--border);
  --color-destructive: var(--destructive);
  --color-accent-foreground: var(--accent-foreground);
  --color-accent: var(--accent);
  --color-muted-foreground: var(--muted-foreground);
  --color-muted: var(--muted);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-secondary: var(--secondary);
  --color-primary-foreground: var(--primary-foreground);
  --color-primary: var(--primary);
  --color-popover-foreground: var(--popover-foreground);
  --color-popover: var(--popover);
  --color-card-foreground: var(--card-foreground);
  --color-card: var(--card);
  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);
}

:root {
  --radius: 0.625rem;
  --background: oklch(1 0 0);
  --foreground: oklch(0.145 0 0);
  --card: oklch(1 0 0);
  --card-foreground: oklch(0.145 0 0);
  --popover: oklch(1 0 0);
  --popover-foreground: oklch(0.145 0 0);
  --primary: oklch(0.205 0 0);
  --primary-foreground: oklch(0.985 0 0);
  --secondary: oklch(0.97 0 0);
  --secondary-foreground: oklch(0.205 0 0);
  --muted: oklch(0.97 0 0);
  --muted-foreground: oklch(0.556 0 0);
  --accent: oklch(0.97 0 0);
  --accent-foreground: oklch(0.205 0 0);
  --destructive: oklch(0.577 0.245 27.325);
  --border: oklch(0.922 0 0);
  --input: oklch(0.922 0 0);
  --ring: oklch(0.708 0 0);
  --chart-1: oklch(0.646 0.222 41.116);
  --chart-2: oklch(0.6 0.118 184.704);
  --chart-3: oklch(0.398 0.07 227.392);
  --chart-4: oklch(0.828 0.189 84.429);
  --chart-5: oklch(0.769 0.188 70.08);
  --sidebar: oklch(0.985 0 0);
  --sidebar-foreground: oklch(0.145 0 0);
  --sidebar-primary: oklch(0.205 0 0);
  --sidebar-primary-foreground: oklch(0.985 0 0);
  --sidebar-accent: oklch(0.97 0 0);
  --sidebar-accent-foreground: oklch(0.205 0 0);
  --sidebar-border: oklch(0.922 0 0);
  --sidebar-ring: oklch(0.708 0 0);
}

.dark {
  --background: oklch(0.145 0 0);
  --foreground: oklch(0.985 0 0);
  --card: oklch(0.205 0 0);
  --card-foreground: oklch(0.985 0 0);
  --popover: oklch(0.205 0 0);
  --popover-foreground: oklch(0.985 0 0);
  --primary: oklch(0.922 0 0);
  --primary-foreground: oklch(0.205 0 0);
  --secondary: oklch(0.269 0 0);
  --secondary-foreground: oklch(0.985 0 0);
  --muted: oklch(0.269 0 0);
  --muted-foreground: oklch(0.708 0 0);
  --accent: oklch(0.269 0 0);
  --accent-foreground: oklch(0.985 0 0);
  --destructive: oklch(0.704 0.191 22.216);
  --border: oklch(1 0 0 / 10%);
  --input: oklch(1 0 0 / 15%);
  --ring: oklch(0.556 0 0);
  --chart-1: oklch(0.488 0.243 264.376);
  --chart-2: oklch(0.696 0.17 162.48);
  --chart-3: oklch(0.769 0.188 70.08);
  --chart-4: oklch(0.627 0.265 303.9);
  --chart-5: oklch(0.645 0.246 16.439);
  --sidebar: oklch(0.205 0 0);
  --sidebar-foreground: oklch(0.985 0 0);
  --sidebar-primary: oklch(0.488 0.243 264.376);
  --sidebar-primary-foreground: oklch(0.985 0 0);
  --sidebar-accent: oklch(0.269 0 0);
  --sidebar-accent-foreground: oklch(0.985 0 0);
  --sidebar-border: oklch(1 0 0 / 10%);
  --sidebar-ring: oklch(0.556 0 0);
}

@layer base {
  * {
    @apply border-border outline-ring/50;
  }
  body {
    @apply bg-background text-foreground;
  }
}

@keyframes float {
    0%, 100% { transform: translateY(0) rotate(0deg); }
    50% { transform: translateY(-20px) rotate(2deg); }
}

@keyframes floatDelay {
    0%, 100% { transform: translateY(0) rotate(0deg); }
    50% { transform: translateY(20px) rotate(-2deg); }
}

@keyframes floatRandom {
    0% { transform: translate(0, 0) rotate(0deg); }
    33% { transform: translate(10px, -15px) rotate(5deg); }
    66% { transform: translate(-5px, 10px) rotate(-3deg); }
    100% { transform: translate(0, 0) rotate(0deg); }
}

@keyframes fadeInDown {
    from { opacity: 0; transform: translateY(-20px); }
    to { opacity: 1; transform: translateY(0); }
}

@keyframes fadeInUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
}

.animate-float-slow {
    animation: float 8s ease-in-out infinite;
}

.animate-float-delay {
    animation: floatDelay 10s ease-in-out 1s infinite;
}

.animate-float-random {
    animation: floatRandom 15s ease-in-out infinite;
}

.animate-fade-in-down {
    animation: fadeInDown 1s ease-out forwards;
}

.animate-fade-in-up {
    animation: fadeInUp 1s ease-out 0.2s forwards;
}

@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes fade-in-up {
  from { opacity: 0; transform: translateY(5px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-fade-in {
  animation: fade-in 0.3s ease-out forwards;
}

.animate-fade-in-up {
  animation: fade-in-up 0.3s ease-out forwards;
}

@keyframes fade-in {
    from { opacity: 0; }
    to { opacity: 1; }
}

@keyframes scale-in {
    from { transform: scale(0.95); opacity: 0; }
    to { transform: scale(1); opacity: 1; }
}

.animate-fade-in {
    animation: fade-in 0.3s ease-out forwards;
}

.animate-scale-in {
    animation: scale-in 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes pulse {
    0%, 100% { opacity: 0.8; }
    50% { opacity: 1; }
}

.animate-pulse-slow {
    animation: pulse 3s ease-in-out infinite;
}

@keyframes fade-in {
    from { opacity: 0; transform: translateY(5px); }
    to { opacity: 1; transform: translateY(0); }
}

.animate-fade-in {
    animation: fade-in 0.5s ease-out forwards;
}

@keyframes fade-in {
    from { opacity: 0; transform: translateY(5px); }
    to { opacity: 1; transform: translateY(0); }
}

.animate-fade-in {
    animation: fade-in 0.5s ease-out forwards;
}

/* Add this to your button variants if not already present */
.bg-gradient-to-r {
    background-size: 200% auto;
    transition: background-position 0.5s ease;
}

.bg-gradient-to-r:hover {
    background-position: right center;
}

/* Entry animations */
@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes fade-in-up {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes slide-in-left {
  from { opacity: 0; transform: translateX(-20px); }
  to { opacity: 1; transform: translateX(0); }
}

@keyframes scale-in {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}

.animate-fade-in {
  animation: fade-in 0.6s ease-out forwards;
}

.animate-fade-in-up {
  animation: fade-in-up 0.6s ease-out forwards;
}

.animate-slide-in-left {
  animation: slide-in-left 0.6s ease-out forwards;
}

.animate-scale-in {
  animation: scale-in 0.6s ease-out forwards;
}

@keyframes fade-in {
  from { opacity: 0; transform: translateY(5px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes pulse-slow {
  0%, 100% { opacity: 0.8; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.05); }
}

.animate-fade-in {
  animation: fade-in 0.5s ease-out forwards;
}

.animate-pulse-slow {
  animation: pulse-slow 2s ease-in-out infinite;
}

/* For gradient buttons */
.bg-gradient-to-r {
  background-size: 200% auto;
  transition: background-position 0.5s ease;
}

.bg-gradient-to-r:hover {
  background-position: right center;
}

@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

.animate-fade-in {
  animation: fade-in 0.6s ease-out forwards;
}

/* For gradient buttons */
.bg-gradient-to-r {
  background-size: 200% auto;
  transition: background-position 0.5s ease;
}

.bg-gradient-to-r:hover {
  background-position: right center;
}
```
</details>

<details>
<summary><code>db.json</code></summary>
```
    {
    "photographers": [
        {
            "id": 1,
            "name": "Ravi Studio",
            "location": "Bengaluru",
            "price": 10000,
            "rating": 4.6,
            "styles": ["Outdoor", "Studio"],
            "tags": ["Candid", "Maternity"],
            "bio": "Award-winning studio specializing in maternity and newborn shoots.",
            "profilePic": "/images/1/ravi.png",
            "portfolio": ["/images/1/m1.jpg", "/images/1/m2.jpg"],
            "reviews": [
                {
                    "name": "Ananya",
                    "rating": 5,
                    "comment": "Truly amazing photos and experience!",
                    "date": "2024-12-15"
                }
            ]
        },
        {
            "id": 2,
            "name": "Lens Queen Photography",
            "location": "Delhi",
            "price": 15000,
            "rating": 4.2,
            "styles": ["Candid", "Indoor"],
            "tags": ["Newborn", "Birthday"],
            "bio": "Delhi-based candid specialist for kids and birthday parties.",
            "profilePic": "/images/2/lens.png",
            "portfolio": ["/images/2/m1.png", "/images/2/m2.png"],
            "reviews": [
                {
                    "name": "Priya",
                    "rating": 4,
                    "comment": "Very professional and punctual!",
                    "date": "2024-10-01"
                }
            ]
        },
        {
            "id": 3,
            "name": "Click Factory",
            "location": "Mumbai",
            "price": 8000,
            "rating": 4.8,
            "styles": ["Studio", "Outdoor", "Traditional"],
            "tags": ["Wedding", "Pre-wedding"],
            "bio": "Capturing timeless wedding stories across India.",
            "profilePic": "/images/3/clickfactory.png",
            "portfolio": ["/images/3/clickfactory1.png", "/images/3/clickfactory2.png"],
            "reviews": [
                {
                    "name": "Rahul",
                    "rating": 5,
                    "comment": "We loved every single moment they captured.",
                    "date": "2025-01-22"
                }
            ]
        },
        {
            "id": 4,
            "name": "Moments by Neha",
            "location": "Bengaluru",
            "price": 12000,
            "rating": 4.3,
            "styles": ["Outdoor", "Candid"],
            "tags": ["Maternity", "Couple"],
            "bio": "Natural light specialist focusing on emotional storytelling.",
            "profilePic": "/images/4/neha.png",
            "portfolio": ["/images/4/neha1.png", "/images/4/neha2.png"],
            "reviews": [
                {
                    "name": "Sneha",
                    "rating": 4.5,
                    "comment": "Captured our maternity journey so beautifully.",
                    "date": "2024-11-05"
                }
            ]
        },
        {
            "id": 5,
            "name": "Snapshot Studio",
            "location": "Hyderabad",
            "price": 7000,
            "rating": 3.9,
            "styles": ["Studio"],
            "tags": ["Birthday", "Family"],
            "bio": "Affordable indoor shoots with creative themes.",
            "profilePic": "/images/5/snapshot.png",
            "portfolio": ["/images/5/snapshot1.png", "/images/5/snapshot2.png"],
            "reviews": [
                {
                    "name": "Vikram",
                    "rating": 3.5,
                    "comment": "Decent service, could improve on punctuality.",
                    "date": "2024-09-10"
                }
            ]
        }
    ]
}
```
</details>

## <a name="explanation">🧠 Explanation</a>

<details>
<summary><code>Search Bar</code></summary>
```

## 🔍 `SearchBar` Component

The `SearchBar` is a responsive, debounced search input component that allows users to search for photographers by name, location, or tag. It integrates seamlessly with global state management via `Zustand` and is optimized to avoid unnecessary updates using debounce logic.

### 📁 Location

`/components/SearchBar.tsx`

---

### ⚙️ Core Features

* **Debounced Search Input:** Prevents excessive filtering by applying a 300ms debounce delay.
* **Live State Binding:** Connects user input to the global filter store (`useFilterStore`) in real-time.
* **Focus and UX Enhancements:** Stylish input with animated focus states, icon transitions, and a dynamic clear button.
* **Lucide Icons + Shadcn UI:** Clean and consistent visuals using the `lucide-react` and `shadcn/ui` libraries.

---

### 🧠 Logic Breakdown

#### 1. **State Management**

```ts
const [input, setInput] = useState('');
const [isFocused, setIsFocused] = useState(false);
```

* `input`: Stores current value of the search bar.
* `isFocused`: Tracks input focus for styling.

#### 2. **Global Filter Update via Zustand**

```ts
const setFilters = useFilterStore((s) => s.setFilters);
```

* Links the search value to the app's global filter state using Zustand store.

#### 3. **Debounce Implementation**

```ts
useEffect(() => {
  const timeout = setTimeout(() => {
    setFilters({ search: input.toLowerCase() });
  }, 300);

  return () => clearTimeout(timeout);
}, [input, setFilters]);
```

* A **debounce** is a method to delay function execution until user stops typing.
* Here, every time `input` changes:

  * A 300ms timer starts.
  * If the user types again, the previous timer is **cleared**.
  * After 300ms of no typing, `setFilters()` is triggered.
* This ensures **efficient** and **minimal** re-rendering and store updates.

#### 4. **Clear Input Logic**

```ts
const clearInput = () => {
  setInput('');
  setFilters({ search: '' });
};
```

* Resets input and clears filters when the ❌ icon is clicked.

---

### 🎨 UI Behavior Highlights

* 💡 Gradient background appears on focus or hover.
* 🔍 Search icon animates based on focus.
* ❌ Clear button only appears when input is not empty.
* 🎯 Fully accessible with `aria-labels`.

---

### 🧰 Dependencies

* ✅ React
* ✅ Zustand (via `useFilterStore`)
* ✅ Lucide React (icons)
* ✅ Shadcn UI (`Input`, `Button`)

</details>

<details>
<summary><code>Filter Sidebar</code></summary>
```
---

## 🧠 `useFilterStore` (Zustand Store)

The `useFilterStore` is a global state management store built with [Zustand](https://github.com/pmndrs/zustand). It provides a centralized way to manage and update filtering criteria for a photographer listing application.

---

### 📁 Location

`/store/FilterStore.ts`

---

### 🎯 Purpose

This store allows components across the app (like `SearchBar`, filters, sorting dropdowns, etc.) to:

* ✅ Update filter values (city, rating, price, etc.)
* ✅ Apply search queries (with debounce)
* ✅ Reset all filters with a single action

---

### 🧩 Filter State Structure

```ts
interface FilterState {
  city: string;
  priceRange: [number, number];   // Min and max price
  rating: number;                 // Minimum rating
  styles: string[];               // Selected photography styles (e.g. portrait, wedding)
  sortBy: 'price-asc' | 'rating-desc' | 'recent'; // Sorting method
  search: string;                 // Search input text
}
```

These fields are tailored to refine search results dynamically across the application.

---

### ⚙️ Store Initialization & Methods

```ts
export const useFilterStore = create<FilterState>((set) => ({
  city: '',
  priceRange: [0, 20000],
  rating: 0,
  styles: [],
  sortBy: 'recent',
  search: '',

  setFilters: (filters) => set((state) => ({ ...state, ...filters })),

  resetFilters: () => set({
    city: '',
    priceRange: [0, 20000],
    rating: 0,
    styles: [],
    sortBy: 'recent',
    search: '',
  }),
}));
```

#### ✅ `setFilters(filters: Partial<FilterState>)`

* Merges incoming filters with existing state.
* Used in components like `SearchBar`, price sliders, rating filters, etc.
* Supports partial updates, e.g., `{ rating: 4 }` only updates rating without affecting other filters.

#### 🔁 `resetFilters()`

* Resets all filters to their initial values.
* Useful when user clicks “Clear Filters” or navigates to a fresh search.

---

### 🕒 Debounce Integration (from `SearchBar`)

The `search` field is often updated **indirectly via debounce** from the `SearchBar` component:

```ts
useEffect(() => {
  const timeout = setTimeout(() => {
    setFilters({ search: input.toLowerCase() });
  }, 300);
  return () => clearTimeout(timeout);
}, [input]);
```

This means:

* The store only receives `search` updates **after 300ms of inactivity**.
* Reduces unnecessary store updates or re-renders.
* Keeps filtering performance smooth, especially with larger datasets.

---

### 🧰 Tech Stack

* ✅ [Zustand](https://github.com/pmndrs/zustand) for state management
* ✅ TypeScript for type safety and autocomplete
* 🔗 Connected to debounced inputs like `SearchBar`

---

</details>
