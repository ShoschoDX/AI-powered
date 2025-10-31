
import { FC, SVGProps } from 'react';

export interface Tool {
  id: 'background-remover' | 'watermark-remover' | 'image-enhancer' | 'colorizer' | 'restorer';
  title: string;
  description: string;
  Icon: FC<SVGProps<SVGSVGElement>>;
  prompt: string;
  feature: 'slider' | 'toggle' | 'default';
}
