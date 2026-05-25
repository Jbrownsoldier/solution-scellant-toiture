# VISUAL & UI Enhancement Plan

## Phase 1: Logo Integration & Branding Baseline
- [x] Move the provided logo `461054357_1573919903523138_7641452721899237233_n.jpg` into the project assets.
- [x] Update `<Navigation />` to use the image logo instead of the text placeholder. Optimize size for the navbar.
- [x] Update `<Footer />` to use the image logo. 
- [x] Extract the exact brand colors (the specific orange/amber from the logo) and update `tailwind.config.js` to perfectly match the real-world branding.

## Phase 2: Micro-Interactions & Hover States
- [x] Implement magnetic hover effects on primary buttons across `<Hero />` and `<HomeServicesPreview />`.
- [x] Add subtle scale transforms and border glows to service cards when hovered.
- [x] Enhance navigation links with expanding underline animations on hover.

## Phase 3: Scroll-Triggered Motion Graphics 
- [x] Introduce framer-motion (or use Tailwind's `aos` equivalent) to fade in sections as the user scrolls down the home page.
- [x] Add staggered entry animations for grids (like the services and reviews grids).
- [x] Animate the numbers in the TrustBar (e.g., counting up to 20+ years, 4.9 rating).

## Phase 4: Dynamic Abstract Backgrounds
- [x] Upgrade the static background grids to have slow, pulsing breathing effects.
- [x] Add subtle parallax effect to the energy conduits in the Hero section based on mouse position.
- [x] Introduce interactive glowing orbs in the background that lightly follow the user's cursor.

## Phase 5: High-Fidelity UI Polish
- [x] Apply glassmorphism strategically to overlapping elements (like the stats panel floating over the hero image).
- [x] Interactive Map Implementation: Replace static map with Interactive SVG Map in `AreasPage.tsx`. [Completed]
- [x] Refine typography hierarchy with tighter tracking on headlines and improved line-heights on body text.
- [x] Ensure dark mode contrasts are strictly accessible but visually striking (true black vs. deep slate).

### Phase 6: Custom Image Generation [BONUS] [x]
- [x] Abstract Electrical Grid graphics (Hero & Backgrounds)
- [x] Branded Service Imagery (Industrial, Smart Home, Maintenance)
- [x] Realistic Branded Van mockup with logo and phone number
