# Devanshu Shekhar - Personal Portfolio

A sleek, modern, and highly interactive personal portfolio for Devanshu Shekhar, a Full Stack Developer. Built with React, Vite, and Framer Motion, it features dynamic scroll animations, a responsive Bento Grid for projects, and a custom interactive cursor.

## Live Demo
View the live site here: [https://Devanshu269.github.io/Portfolio2.0](https://Devanshu269.github.io/Portfolio2.0)

## Features
- **Fluid Bento Grid Layout**: Scalable and responsive project showcase layout.
- **Framer Motion Animations**: Smooth page transitions, scroll-linked animations, and staggered list effects.
- **Infinite Scrolling Certificates**: A continuous marquee displaying professional qualifications.
- **Testimonial Carousel**: Interactive UI for peer recommendations.
- **SEO Optimized**: Pre-configured with Open Graph (OG) and Twitter meta tags.

## Technology Stack
- **React 19**
- **Vite** (Build Tool)
- **Framer Motion** (Animations)
- **Lucide React** (Icons)
- **EmailJS** (Contact Form)
- **CSS Modules & Variables** (Styling)

## Local Development Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Devanshu269/Portfolio2.0.git
   cd Portfolio2.0
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

## Deployment to GitHub Pages

This project is pre-configured for one-click deployment to GitHub Pages via the `gh-pages` NPM package.

To build and deploy the application, run:
```bash
npm run deploy
```

This command will automatically:
1. Run the Vite build process (`npm run build`).
2. Publish the generated `/dist` folder to the `gh-pages` branch on GitHub.

**Note on Routing:** The `vite.config.js` is currently set up with `base: '/Portfolio2.0/'` which is required for GitHub Pages project sites. If you ever connect a custom domain, you may need to update this `base` configuration to `'/'`.
