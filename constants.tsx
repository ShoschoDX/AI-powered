
import React from 'react';
import { Tool } from './types';

const EraserIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M16.243 3.464a2 2 0 0 1 2.828 2.828L12.243 13H9v-3.243l7.243-7.293zM5 19h14v-2H5v2zM15 15l-5 5H7l5-5h3z"/></svg>
);
const SparkleIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.36 7.195H22l-6 4.345L18.36 22 12 17.655 5.64 22 8 13.54 2 9.195h7.64L12 2z"/></svg>
);
const WandIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12.3 3.7l4 4L12 12l-4-4 4.3-4.3zM3.8 8.3l4 4L3.5 17.5 2 16l1.8-7.7zM16.3 8.3l4.3-4.3-1.8-1.8-4.3 4.3 1.8 1.8zM12 13.4L16.3 17.7 18 16l-4.3-4.3-1.7 1.7zM8.3 17.7L12 14l-1.7-1.7-4.3 4.3L8 18l.3-.3zM18.5 12.5L13.2 7.2l-1.4 1.4 5.3 5.3 1.4-1.4z"/></svg>
);
const PaletteIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c.34 0 .67-.02 1-.05-2.06-1.35-3.5-3.6-3.5-6.24 0-4.04 3.16-7.33 7.13-7.33.34 0 .67.02 1 .05-1.45-3.05-4.48-5.42-8.13-5.42zm4 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-4 4c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm4 4c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-8 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/></svg>
);
const ShieldIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-3zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V13H5V6.3l7-3.11v10.8z"/></svg>
);


export const TOOLS: Tool[] = [
  {
    id: 'background-remover',
    title: 'Background Remover',
    description: 'Automatically remove the background from any photo to get a transparent PNG.',
    Icon: EraserIcon,
    prompt: 'Remove the background from this image. The output must be a transparent PNG with an RGBA color profile.',
    feature: 'default',
  },
  {
    id: 'watermark-remover',
    title: 'Watermark Remover',
    description: 'Detect and erase unwanted watermarks, logos, or text from your images seamlessly.',
    Icon: ShieldIcon,
    prompt: 'Remove any watermarks, logos, or text overlays from this image. Use inpainting or content-aware fill to replace the removed area with realistic pixels that match the surrounding background.',
    feature: 'default',
  },
  {
    id: 'image-enhancer',
    title: 'Image Enhancer',
    description: 'Improve sharpness, details, and lighting to transform low-quality photos into high-resolution.',
    Icon: SparkleIcon,
    prompt: 'Enhance this image to high quality. Improve its sharpness, details, contrast, and lighting. Upscale the resolution if possible. Fix any compression artifacts.',
    feature: 'slider',
  },
  {
    id: 'colorizer',
    title: 'B&W Photo Colorizer',
    description: 'Bring your black and white photos to life with natural, realistic colors.',
    Icon: PaletteIcon,
    prompt: 'Colorize this black and white photo. Apply natural and realistic colors, paying special attention to skin tones, clothing, and background elements.',
    feature: 'default',
  },
  {
    id: 'restorer',
    title: 'Old Photo Restoration',
    description: 'Fix scratches, fading, tears, and other damage on old photographs.',
    Icon: WandIcon,
    prompt: 'Restore this old, damaged photo. Fix any scratches, tears, fading, and blur. Enhance faces and improve overall clarity and quality.',
    feature: 'toggle',
  },
];
