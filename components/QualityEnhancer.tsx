
import React, { useState, useCallback } from 'react';
import { Button } from './Button';
import { Spinner } from './Spinner';
import { ImageComparisonSlider } from './ImageComparisonSlider';
import { fileToBase64, generateImageWithPrompt } from '../services/geminiService';

interface ImageState {
  file: File;
  url: string;
  base64: string;
}

const UploadIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
    </svg>
);

const ENHANCER_PROMPT = 'Enhance this image to ultra-high quality. Intelligently deblur, fix pixelation, reduce noise, and sharpen details without creating an artificial or over-processed look. Pay special attention to faces, eyes, and fine textures to ensure they appear realistic and sharp. Preserve the natural color balance and contrast. The final output should look as if it were captured with a high-end camera. Upscale the resolution significantly, aiming for HD or 4K quality.';


export const QualityEnhancer: React.FC = () => {
    const [originalImage, setOriginalImage] = useState<ImageState | null>(null);
    const [processedImage, setProcessedImage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const resetState = useCallback(() => {
        if (originalImage) {
            URL.revokeObjectURL(originalImage.url);
        }
        setOriginalImage(null);
        setProcessedImage(null);
        setIsLoading(false);
        setError(null);
        const fileInput = document.getElementById('enhancer-upload') as HTMLInputElement;
        if(fileInput) fileInput.value = '';
    }, [originalImage]);

    const handleFileChange = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            resetState();
            const imageUrl = URL.createObjectURL(file);
            const base64 = await fileToBase64(file);
            setOriginalImage({ file, url: imageUrl, base64 });
        }
    }, [resetState]);

    const handleProcess = useCallback(async () => {
        if (!originalImage) return;
        setIsLoading(true);
        setError(null);
        try {
            const resultBase64 = await generateImageWithPrompt(originalImage.base64, originalImage.file.type, ENHANCER_PROMPT);
            setProcessedImage(`data:image/png;base64,${resultBase64}`);
        } catch (e: any) {
            setError(e.message || 'An unknown error occurred.');
        } finally {
            setIsLoading(false);
        }
    }, [originalImage]);
  
    const handleDownload = useCallback(() => {
        if (!processedImage) return;
        const link = document.createElement('a');
        link.href = processedImage;
        link.download = `enhanced-photo.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }, [processedImage]);

    return (
        <section>
            <div className="bg-white dark:bg-gray-800 p-6 md:p-8 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700">
                <div className="text-center mb-6">
                    <h2 className="text-3xl font-bold text-sky-600 dark:text-sky-400">Image Quality Enhancer</h2>
                    <p className="text-lg text-gray-600 dark:text-gray-300 mt-2">Instantly fix blurry, pixelated, and noisy photos to achieve stunning clarity.</p>
                </div>

                <div className="w-full max-w-4xl mx-auto">
                    <div className="min-h-[300px] flex items-center justify-center bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                        {isLoading ? (
                            <div className="text-center">
                                <Spinner />
                                <p className="mt-4 text-gray-600 dark:text-gray-300">Enhancing your image... This may take a moment.</p>
                            </div>
                        ) : error ? (
                             <div className="text-center p-4 bg-red-50 dark:bg-red-900/50 text-red-700 dark:text-red-300 rounded-lg">
                                <p><strong>Error:</strong> {error}</p>
                                <Button variant="secondary" onClick={resetState} className="mt-4">Try Again</Button>
                            </div>
                        ) : processedImage && originalImage ? (
                            <div className="w-full">
                                <ImageComparisonSlider before={originalImage.url} after={processedImage} />
                            </div>
                        ) : originalImage ? (
                             <img src={originalImage.url} alt="Uploaded" className="max-h-[50vh] w-auto object-contain rounded-lg shadow-md" />
                        ) : (
                            <div className="w-full text-center p-8 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-transparent">
                                <UploadIcon className="w-16 h-16 text-gray-400 dark:text-gray-500 mx-auto" />
                                <label htmlFor="enhancer-upload" className="mt-4 bg-sky-500 text-white px-6 py-3 rounded-md font-semibold cursor-pointer hover:bg-sky-600 transition-colors inline-block">
                                    Upload Image
                                </label>
                                <input type="file" id="enhancer-upload" className="hidden" onChange={handleFileChange} accept="image/png, image/jpeg, image/webp" />
                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">PNG, JPG, WEBP</p>
                            </div>
                        )}
                    </div>

                    <div className="mt-6 flex flex-wrap gap-4 justify-center">
                        {originalImage && !isLoading && (
                             <Button onClick={resetState} variant="secondary">
                                Clear Image
                            </Button>
                        )}
                         {!isLoading && !processedImage && originalImage && (
                            <Button onClick={handleProcess} variant="primary">
                                Enhance Quality
                            </Button>
                        )}
                        {processedImage && !isLoading && (
                           <Button onClick={handleDownload} variant="primary">
                                Download Enhanced Image
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};
