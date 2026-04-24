# H&S Online Store — E-Commerce Website

A fully responsive e-commerce web application built with pure HTML, CSS, and JavaScript. Developed as an ICT project by **Hamza Saleem** and **Shuja ul Hassan**.

---

## Live Preview

Open `index.html` in any modern browser — no server or build tools required.

---

## Features

- **Product Catalog** — 18 products across fashion, tech, and accessories with discount badges and star ratings
- **Shopping Cart** — Add, remove, and adjust quantities; live subtotal, 20% discount, and total calculation via `localStorage`
- **Login Modal** — CSS-only state management (checkbox hack) with Google login simulation and phone number flow
- **3D Animated Logo** — Pure CSS cube animation in the navbar
- **Typewriter Hero** — Animated headline on the home page
- **Responsive Design** — Mobile-friendly layout with CSS Grid and media queries
- **Dark Theme** — Full dark UI with red accent color (`--accent-color`)

---

## Project Structure

```
├── index.html          # Home page — hero, product grid, login modal
├── cart.html           # Shopping cart page — order summary & checkout
├── css/
│   ├── styles.css      # Main stylesheet (theme, layout, components)
│   └── responsive.css  # Media queries for mobile/tablet
├── js/
│   └── cart.js         # Cart logic — localStorage, quantity controls, checkout
├── assets/             # Static assets
└── CART_GUIDE.md       # Cart feature documentation
```

---

## Tech Stack

| Technology | Usage |
|------------|-------|
| HTML5 | Semantic page structure |
| CSS3 | Animations, Grid, Flexbox, CSS variables, checkbox state management |
| Vanilla JavaScript | Cart logic, localStorage persistence |

---

## How It Works

### Cart System
Products are stored in `localStorage` as a JSON array. The cart page reads this data on load, renders items dynamically, and recalculates totals on every change.

### Login Modal (CSS-only State)
Visibility of the login modal and user profile icon is driven entirely by a hidden `<input type="checkbox">` and its `<label>`. No JavaScript needed — toggling the checkbox changes sibling element visibility via CSS selectors.

### Responsive Layout
The product grid uses `auto-fill` CSS Grid columns, collapsing from 4 columns on desktop down to 1 on mobile. The cart layout switches from a 2-column grid to a single column below 768px.

---

## Getting Started

```bash
# Clone the repository
git clone https://github.com/hamzasaleem22/E-Commerce-Webiste.git

# Open in browser
cd E-Commerce-Webiste
open index.html   # macOS
start index.html  # Windows
```

No dependencies. No npm install. Just open and run.

---

## Screenshots

| Page | Description |
|------|-------------|
| Home | Hero section + 18-product grid with add-to-cart |
| Cart | Live order summary with quantity controls and checkout |

---

## Developers

| Name | Email |
|------|-------|
| Hamza Saleem | hamzasaleem22@gmail.com |
| Shuja ul Hassan | shujaulhassan@gmail.com |

**Contact:** 0303-5070436

---

## License

&copy; 2024 H&S E-Commerce. All rights reserved.
