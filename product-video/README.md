# AIDA Product Video

A Product Hunt teaser video for AIDA - Crisis Intelligence Platform, built with [Remotion](https://remotion.dev).

## Video Structure

The video is 30 seconds long (900 frames at 30 fps) and includes:

1. **Intro Scene** (0-4s) - Logo reveal with animated particles
2. **Problem Scene** (4-8s) - Highlighting humanitarian crisis challenges
3. **Solution Scene** (8-12s) - Introducing AIDA
4. **Features Scene** (12-18s) - Showcasing AI-powered capabilities
5. **Demo Scene** (18-23s) - Dashboard walkthrough
6. **Tech Stack Scene** (23-26s) - Llama 3.2, SAM2, FastAPI, PyTorch
7. **CTA Scene** (26-30s) - Call to action for Product Hunt

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
cd product-video
npm install
```

### Development

Start the Remotion Studio to preview and edit the video:

```bash
npm start
```

### Rendering

Render the final video:

```bash
# Full HD (1920x1080)
npm run build

# Output: out/aida-product-hunt.mp4
```

## Compositions

- **AidaProductVideo** - 16:9 format (1920x1080) for YouTube/Product Hunt
- **AidaProductVideoShort** - 1:1 format (1080x1080) for social media

## Customization

Edit the scene components in `src/components/` to customize:

- Colors and gradients
- Animation timing
- Text content
- Feature highlights

## Tech Stack

- [Remotion](https://remotion.dev) - React video framework
- TypeScript
- React 18
