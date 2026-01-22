# CleanHealth Waste Women's Cooperative

Professional website for Uganda's first women-owned healthcare waste management cooperative.

## Overview

CleanHealth Waste Women's Cooperative empowers women through dignified employment in environmental services while solving Uganda's healthcare waste management crisis through professional, community-based solutions that protect public health and the environment.

## Website Features

### Interactive Visualizations (D3.js)
- **Financial Projections Chart**: 3-year revenue, expenses, and profit visualization
- **Revenue Streams Pie Chart**: Interactive breakdown of income sources
- **Impact Assessment Chart**: Three-fold impact analysis (Environmental, Economic, Regulatory)
- **Growth Timeline**: Roadmap with client and member projections
- **Team Growth Visualization**: Visual representation of cooperative expansion

### Animations (GSAP)
- Smooth scroll-triggered animations throughout the site
- Interactive hover effects on cards and buttons
- Parallax background effects
- Staggered reveal animations for content sections
- Respects `prefers-reduced-motion` for accessibility

### Machine Learning Demo (TensorFlow.js)
- Interactive waste classification demonstration
- Drag-and-drop image upload
- Sample waste type buttons for quick testing
- Real-time classification results with confidence scores
- Recommended actions based on waste category

### Accessibility Features
- **Color-Blind Safe Palette**: Uses IBM's colorblind-safe palette (blues, oranges, purples)
- **Pattern Overlays**: Charts include patterns in addition to colors
- **High Contrast Support**: Responds to `prefers-contrast: high`
- **Screen Reader Support**: ARIA labels and live regions
- **Keyboard Navigation**: Full keyboard accessibility
- **Skip Links**: Quick navigation for assistive technologies

## Technology Stack

- **HTML5**: Semantic markup with accessibility features
- **CSS3**: Modern CSS with custom properties, Grid, Flexbox
- **JavaScript (ES6+)**: Modular architecture
- **D3.js v7**: Data visualizations
- **GSAP 3.12**: Animations and scroll effects
- **TensorFlow.js 4.10**: Machine learning in browser

## Project Structure

```
CleanHealthWasteWomenCooperative/
├── index.html              # Main HTML file
├── css/
│   └── style.css          # Main stylesheet (color-blind friendly)
├── js/
│   ├── main.js            # Core functionality
│   ├── visualizations.js  # D3.js charts
│   ├── animations.js      # GSAP animations
│   └── ml-model.js        # TensorFlow.js demo
├── assets/
│   └── favicon.svg        # Site favicon
├── package.json           # Project configuration
├── vercel.json           # Vercel deployment config
└── README.md             # This file
```

## Deployment

### Vercel (Recommended)

1. Push the repository to GitHub
2. Connect to Vercel
3. Deploy with default settings

Or use Vercel CLI:

```bash
npm i -g vercel
vercel
```

### Other Platforms

The site is static and can be deployed to:
- Netlify
- GitHub Pages
- AWS S3 + CloudFront
- Any static hosting service

## Local Development

```bash
# Install a simple server (if needed)
npm install -g serve

# Run locally
npx serve .

# Or open index.html directly in a browser
```

## Color Palette (Colorblind Safe)

| Color | Hex | Usage |
|-------|-----|-------|
| Blue | `#648fff` | Primary charts, environmental |
| Gold | `#ffb000` | Secondary charts, economic |
| Purple | `#785ef0` | Accent charts, regulatory |
| Orange | `#fe6100` | Warnings, hazardous |
| Teal | `#22c1c3` | Success, environment |
| Magenta | `#dc267f` | Highlights |

## Key Metrics (Year 3 Targets)

- **15** women directly employed
- **180+** tonnes of waste diverted annually
- **25** healthcare facility clients
- **72%** compliance rate improvement
- **200+** healthcare workers trained
- **$35,200** projected annual revenue

## About the Cooperative

**Founder**: Samura Boona, Medical Laboratory Technologist

**Location**: Kampala, Uganda (serving Kampala Central, Wakiso, and Mukono districts)

**Services**:
1. Facility Service Contracts
2. Waste Segregation Training
3. Recycling Linkage

## License

MIT License - See LICENSE file for details

## Contact

- **Email**: info@cleanhealthwaste.org
- **Location**: Kampala, Uganda

---

*Women-Led | Community-Based | Environmentally Responsible*
