import React, { useState, useCallback, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Globe, Loader2 } from 'lucide-react';

const languages = [
  { code: 'en', name: 'English' },
  { code: 'tl', name: 'Tagalog' },
  { code: 'il', name: 'Ilocano' },
  { code: 'ib', name: 'Ibanag' },
  { code: 'gd', name: 'Gaddang' },
  { code: 'cb', name: 'Cebuano' }
];

const LanguageSelector: React.FC = () => {
  const { i18n } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLanguageChange = useCallback(async (langCode: string) => {
    try {
      setIsLoading(true);
      localStorage.setItem('i18nextLng', langCode);
      await i18n.changeLanguage(langCode);
    } catch (error) {
      console.error('Language change error:', error);
    } finally {
      setIsLoading(false);
      setIsDropdownOpen(false);
    }
  }, [i18n]);

  return (
    <div className="relative">
      <button 
        className={`flex items-center space-x-2 px-4 py-2 rounded-lg bg-white dark:bg-gray-800 shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
          isLoading ? 'opacity-50 cursor-wait' : ''
        }`}
        disabled={isLoading}
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        aria-expanded={isDropdownOpen}
        aria-label="Select language"
      >
        {isLoading ? (
          <Loader2 className="h-5 w-5 animate-spin text-gray-500 dark:text-gray-400" />
        ) : (
          <Globe className="h-5 w-5 text-gray-500 dark:text-gray-400" />
        )}
        <span className="text-sm text-gray-700 dark:text-gray-300">
          {languages.find(lang => lang.code === i18n.language)?.name || 'Select Language'}
        </span>
      </button>

      {isDropdownOpen && (
        <div 
          ref={dropdownRef}
          className="absolute top-full right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg z-50 border border-gray-200 dark:border-gray-700 overflow-hidden"
        >
          {languages.map(lang => (
            <button
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
              disabled={isLoading}
              className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                i18n.language === lang.code 
                  ? 'text-green-600 dark:text-green-400 font-medium bg-green-50 dark:bg-green-900/20' 
                  : 'text-gray-700 dark:text-gray-300'
              }`}
            >
              {lang.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;