import React, { useState } from 'react';
import { Leaf } from 'lucide-react';
import ImageUploader from './components/ImageUploader';
import DetectionResults from './components/DetectionResults';
import Navigation from './components/Navigation';
import LanguageSelector from './components/LanguageSelector';
import ThemeToggle from './components/ThemeToggle';
import WeatherDisplay from './components/WeatherDisplay';
import FarmMap from './components/FarmMap';
import Calendar from './components/Calendar';
import Home from './components/Home';
import UserManual from './components/UserManual';
import { DetectionResult } from './types';
import { detectRiceLeafDisease } from './services/mockDetectionService';

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string>('');
  const [detectionResult, setDetectionResult] = useState<DetectionResult | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageSelected = (imageFile: File | null, url: string) => {
    setSelectedImage(imageFile);
    setImageUrl(url);
    setDetectionResult(null);
    setError(null);
    
    if (imageFile) {
      processImage(imageFile);
    }
  };

  const processImage = async (imageFile: File) => {
    try {
      setIsProcessing(true);
      setError(null);
      const result = await detectRiceLeafDisease(imageFile);
      setDetectionResult(result);
    } catch (err) {
      setError('An error occurred while processing the image. Please try again.');
      console.error('Error processing image:', err);
    } finally {
      setIsProcessing(false);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <Home />;
      case 'camera':
        return (
          <div className="space-y-6 pb-20">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Upload or Capture Rice Leaf Image</h2>
              <ImageUploader onImageSelected={handleImageSelected} />
            </div>
            <DetectionResults result={detectionResult} isProcessing={isProcessing} />
          </div>
        );
      case 'calendar':
        return <div className="pb-20"><Calendar /></div>;
      case 'guide':
        return <div className="pb-20"><UserManual /></div>;
      case 'weather':
        return <div className="pb-20"><WeatherDisplay /></div>;
      case 'map':
        return <div className="pb-20"><FarmMap /></div>;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 dark:from-gray-900 dark:to-gray-800 dark:text-white transition-colors duration-200">
      <div className="container mx-auto px-4 py-4">
        <header className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Leaf className="h-8 w-8 text-green-600 dark:text-green-400 mr-2" />
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Rice Disease Detection</h1>
          </div>
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <LanguageSelector />
          </div>
        </header>

        {error && (
          <div className="bg-red-50 dark:bg-red-900/50 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6">
            <p className="text-red-700 dark:text-red-200">{error}</p>
          </div>
        )}

        {renderContent()}
      </div>

      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}

export default App;