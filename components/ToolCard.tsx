import React, { useState, useCallback, useMemo } from 'react';
import { Tool } from '../types';
import { Button } from './Button';
import { Spinner } from './Spinner';
import { ImageComparisonSlider } from './ImageComparisonSlider';
import { fileToBase64, generateImageWithPrompt } from '../services/geminiService';
import { useAuth } from '../contexts/AuthContext';
import { useHistory } from '../contexts/HistoryContext';

interface ToolCardProps {
  tool: Tool;
}

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

export const ToolCard: React.FC<ToolCardProps> = ({ tool }) => {
  const [originalImage, setOriginalImage] = useState<ImageState | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showProcessed, setShowProcessed] = useState(true);
  const { isLoggedIn } = useAuth();
  const { addHistoryItem } = useHistory();

  const handleFileChange = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      resetState();
      const imageUrl = URL.createObjectURL(file);
      const base64 = await fileToBase64(file);
      setOriginalImage({ file, url: imageUrl, base64 });
    }
  }, []);

  const handleProcess = useCallback(async () => {
    if (!originalImage) return;
    setIsLoading(true);
    setError(null);
    try {
      const resultBase64 = await generateImageWithPrompt(originalImage.base64, originalImage.file.type, tool.prompt);
      const processedImageUrl = `data:image/png;base64,${resultBase64}`;
      setProcessedImage(processedImageUrl);

      if (isLoggedIn) {
          const originalDataUrl = `data:${originalImage.file.type};base64,${originalImage.base64}`;
          addHistoryItem({
              toolTitle: tool.title,
              originalImageUrl: originalDataUrl,
              processedImageUrl: processedImageUrl,
          });
      }
    } catch (e: any) {
      setError(e.message || 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, [originalImage, tool.prompt, tool.title, isLoggedIn, addHistoryItem]);
  
  const resetState = () => {
    if (originalImage) {
        URL.revokeObjectURL(originalImage.url);
    }
    setOriginalImage(null);
    setProcessedImage(null);
    setIsLoading(false);
    setError(null);
    setShowProcessed(true);
  }

  const handleDownload = useCallback(() => {
    if (!processedImage) return;
    const link = document.createElement('a');
    link.href = processedImage;
    const fileExtension = tool.id === 'background-remover' ? 'png' : 'jpeg';
    link.download = `smart-photo-studio-${tool.id}.${fileExtension}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [processedImage, tool.id]);
  
  const renderResult = useMemo(() => {
    if (!originalImage || !processedImage) return null;

    switch (tool.feature) {
      case 'slider':
        return <ImageComparisonSlider before={originalImage.url} after={processedImage} />;
      case 'toggle':
        return (
          <div className="relative">
            <img src={showProcessed ? processedImage : originalImage.url} alt="Result" className="w-full h-auto object-contain rounded-lg" />
            <div className="absolute top-2 right-2 flex space-x-2 bg-black/50 p-1 rounded-lg">
                <button onClick={() => setShowProcessed(false)} className={`px-3 py-1 text-sm rounded ${!showProcessed ? 'bg-sky-500 text-white' : 'bg-white/80 text-black dark:bg-gray-600 dark:text-white'}`}>Old</button>
                <button onClick={() => setShowProcessed(true)} className={`px-3 py-1 text-sm rounded ${showProcessed ? 'bg-sky-500 text-white' : 'bg-white/80 text-black dark:bg-gray-600 dark:text-white'}`}>New</button>
            </div>
          </div>
        );
      default:
        return <img src={processedImage} alt="Processed" className="w-full h-auto object-contain rounded-lg" />;
    }
  }, [originalImage, processedImage, tool.feature, showProcessed]);

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-2xl dark:shadow-sky-900/20 transition-shadow duration-300 flex flex-col border border-transparent dark:border-gray-700">
      <div className="flex items-center mb-4">
        <tool.Icon className="w-8 h-8 text-sky-500 dark:text-sky-400 mr-4" />
        <div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">{tool.title}</h3>
          <p className="text-gray-500 dark:text-gray-400 text-sm">{tool.description}</p>
        </div>
      </div>
      <div className="flex-grow space-y-4 flex flex-col">
        {isLoading ? (
            <div className="flex-grow flex flex-col items-center justify-center p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <Spinner />
                <p className="mt-4 text-gray-600 dark:text-gray-300">AI is working its magic...</p>
            </div>
        ) : error ? (
            <div className="flex-grow flex flex-col items-center justify-center p-4 bg-red-50 dark:bg-red-900/50 text-red-700 dark:text-red-300 rounded-lg">
                <p><strong>Error:</strong> {error}</p>
                <Button variant="secondary" onClick={resetState} className="mt-4">Try Again</Button>
            </div>
        ) : processedImage ? (
            <div className="flex-grow flex flex-col items-center justify-center p-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              {renderResult}
            </div>
        ) : originalImage ? (
            <div className="flex-grow flex flex-col items-center justify-center p-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <img src={originalImage.url} alt="Original" className="max-h-64 w-auto object-contain rounded-lg" />
            </div>
        ) : (
            <div className="flex-grow flex flex-col items-center justify-center p-8 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-transparent text-center">
              <UploadIcon className="w-12 h-12 text-gray-400 dark:text-gray-500" />
              <label htmlFor={`upload-${tool.id}`} className="mt-4 bg-sky-500 text-white px-4 py-2 rounded-md font-semibold cursor-pointer hover:bg-sky-600 transition-colors">
                Upload Image
              </label>
              <input type="file" id={`upload-${tool.id}`} className="hidden" onChange={handleFileChange} accept="image/png, image/jpeg, image/webp" />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">PNG, JPG, WEBP</p>
            </div>
        )}
      </div>
      <div className="mt-6 flex flex-wrap gap-2 justify-center">
        {originalImage && !processedImage && !isLoading && !error && (
            <Button onClick={handleProcess}>
                Process Image
            </Button>
        )}
        {processedImage && !isLoading && (
            <>
                <Button onClick={handleDownload} variant="primary">
                    Download {tool.id === 'background-remover' ? 'Transparent PNG' : 'Image'}
                </Button>
                <Button onClick={resetState} variant="secondary">Start Over</Button>
            </>
        )}
        {originalImage && !isLoading && !processedImage && (
             <Button onClick={resetState} variant="secondary">Clear</Button>
        )}
      </div>
    </div>
  );
};