import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Home, Calendar, Camera, BookOpen, Cloud, MapPin, Menu } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeTab, onTabChange }) => {
  const { t } = useTranslation();
  const [isMobile, setIsMobile] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 300) {
        setIsMobile(true);
        setIsCollapsed(window.innerWidth < 220);
      } else {
        setIsMobile(false);
        setIsCollapsed(false);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navItems = [
    { id: 'home', icon: Home, label: t('nav.home') },
    { id: 'calendar', icon: Calendar, label: t('nav.calendar') },
    { id: 'camera', icon: Camera, label: t('nav.camera') },
    { id: 'guide', icon: BookOpen, label: t('nav.guide') },
    { id: 'weather', icon: Cloud, label: t('nav.weather') },
    { id: 'map', icon: MapPin, label: t('nav.map') }
  ];

  return (
    <>
      <div className="pb-20"></div>

      {!isCollapsed ? (
        <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 shadow-lg border-t border-gray-200 dark:border-gray-700 px-4 py-3 z-[1000]">
          <div className="max-w-screen-xl mx-auto flex justify-around items-center">
            {navItems.map(({ id, icon: Icon, label }) => (
              <button
                key={id}
                onClick={() => onTabChange(id)}
                className={`flex flex-col items-center p-2 relative transition-all ${
                  activeTab === id ? 'text-white' : 'text-gray-600 dark:text-gray-400'
                }`}
                aria-label={label}
              >
                <motion.div className="relative flex items-center justify-center w-10 h-10">
                  {activeTab === id && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute w-10 h-10 bg-green-500 dark:bg-green-600 rounded-full"
                      initial={false}
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                  <Icon className={`h-6 w-6 z-10 ${
                    activeTab === id ? 'text-white' : 'text-gray-600 dark:text-gray-400'
                  }`} />
                </motion.div>
                {!isMobile && (
                  <span className={`text-xs mt-1 ${
                    activeTab === id ? 'text-green-500 dark:text-green-400' : 'text-gray-600 dark:text-gray-400'
                  }`}>
                    {label}
                  </span>
                )}
              </button>
            ))}
          </div>
        </nav>
      ) : (
        <button
          onClick={() => setIsCollapsed(false)}
          className="fixed bottom-4 right-4 bg-green-500 dark:bg-green-600 text-white p-4 rounded-full shadow-lg z-[1000] hover:bg-green-600 dark:hover:bg-green-700 transition-colors"
          aria-label="Open Navigation"
        >
          <Menu size={24} />
        </button>
      )}
    </>
  );
};

export default Navigation;