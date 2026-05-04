<p align="center">
  <img src="public/Logo.png" alt="Pickr logo" width="200" />
</p>

# Pickr

A collection of fun, interactive randomizer tools built with React 19 + TypeScript + Vite, deployed to GitHub Pages.

## Tools

### Picker Wheel
Add a list of items, spin the wheel, and get a random winner. Supports custom entries and displays an animated spinning wheel with a winner dialog.

### Finger Picker
A multi-touch randomizer — place multiple fingers on the screen and the app picks one at random after a short countdown. Each finger gets a unique color, and the winner's color fills the screen.

## Development

```bash
npm run dev       # Start Vite dev server with HMR
npm run build     # TypeScript check + production build
npm run lint      # Run ESLint
npm run preview   # Serve the built output locally
npm run deploy    # Build and deploy to GitHub Pages
```

## Tech Stack

- **React 19** + **TypeScript**
- **Vite** for bundling and dev server
- **Tailwind CSS 4** for styling
- **shadcn/ui** + **@base-ui/react** for UI components
- **vaul** for the mobile drawer
- Deployed to **GitHub Pages** at base path `/Pickrs/`
