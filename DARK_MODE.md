# Dark Mode Implementation

## Overview
This portfolio now includes a fully functional dark/light mode toggle with smooth transitions and persistent theme preferences.

## Features

### 🎨 Theme Toggle
- **Location**: Top-right corner of the navbar
- **Icon Animation**: Smooth transition between sun (light mode) and moon (dark mode) icons
- **Accessibility**: Proper ARIA labels for screen readers

### 💾 Persistence
- Theme preference is saved to `localStorage`
- Automatically restores user's last selected theme on page reload
- Respects system preference on first visit

### 🎭 Styling
- **Dark Mode** (Default):
  - Background: Deep black (#050505)
  - Text: White (#ffffff)
  - Glassmorphism effects with white tints

- **Light Mode**:
  - Background: Pure white (#ffffff)
  - Text: Dark (#050505)
  - Glassmorphism effects with dark tints

### ⚡ Performance
- CSS variables for instant theme switching
- Smooth 0.3s transitions for background and text colors
- No layout shift during theme changes

## Implementation Details

### Files Created
1. **`src/context/ThemeContext.jsx`** - React Context for global theme state
2. **`src/components/ThemeToggle/ThemeToggle.jsx`** - Animated toggle button component
3. **`src/components/ThemeToggle/ThemeToggle.css`** - Toggle button styles

### Files Modified
1. **`src/index.css`** - Added CSS variables for both themes
2. **`src/main.jsx`** - Wrapped app with ThemeProvider
3. **`src/components/Navbar/Navbar.jsx`** - Added ThemeToggle component

### CSS Variables
All theme-dependent colors use CSS variables:
- `--bg-primary` - Main background color
- `--bg-secondary` - Alternate background color
- `--text-primary` - Main text color
- `--text-secondary` - Secondary/dimmed text color
- `--glass` - Glassmorphism background
- `--glass-border` - Glassmorphism border
- `--divider` - Section divider color

## Usage

### Accessing Theme in Components
```jsx
import { useTheme } from '../../context/ThemeContext';

function MyComponent() {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <div>
      Current theme: {theme}
      <button onClick={toggleTheme}>Toggle</button>
    </div>
  );
}
```

### Using Theme Variables in CSS
```css
.my-element {
  background-color: var(--bg-primary);
  color: var(--text-primary);
  border: 1px solid var(--glass-border);
}
```

## Browser Support
- Modern browsers with CSS custom properties support
- localStorage for persistence
- Graceful fallback to dark mode if localStorage is unavailable
