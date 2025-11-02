import { FC, SVGProps } from 'react';

export interface Tool {
  id: 'background-remover' | 'watermark-remover' | 'image-enhancer' | 'colorizer' | 'restorer';
  title: string;
  description: string;
  Icon: FC<SVGProps<SVGSVGElement>>;
  prompt: string;
  feature: 'slider' | 'toggle' | 'default';
}

export interface HistoryItem {
    id: string;
    toolTitle: string;
    originalImageUrl: string; // data: URL
    processedImageUrl: string; // data: URL
    timestamp: number;
}
