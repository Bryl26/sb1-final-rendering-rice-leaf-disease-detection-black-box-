import React from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Camera, AlertCircle, HelpCircle, Mail, Phone, Globe,
  Upload, Search, BookOpen, Zap, CheckCircle, RefreshCw
} from 'lucide-react';

const UserManual: React.FC = () => {
  const { t } = useTranslation();

  const quickStartSteps = [
    {
      icon: <Camera className="h-8 w-8 text-blue-500 dark:text-blue-400" />,
      title: 'Capture Image',
      description: 'Take a clear photo of the affected rice leaf'
    },
    {
      icon: <Upload className="h-8 w-8 text-green-500 dark:text-green-400" />,
      title: 'Upload',
      description: 'Submit the image for analysis'
    },
    {
      icon: <Search className="h-8 w-8 text-purple-500 dark:text-purple-400" />,
      title: 'Analysis',
      description: 'AI processes the image'
    },
    {
      icon: <BookOpen className="h-8 w-8 text-orange-500 dark:text-orange-400" />,
      title: 'Results',
      description: 'Get detailed diagnosis and treatment recommendations'
    }
  ];

  const systemFeatures = [
    {
      icon: <Zap className="h-6 w-6 text-yellow-500 dark:text-yellow-400" />,
      title: 'Fast Detection',
      description: 'Results in Milli Seconds'
    },
    {
      icon: <CheckCircle className="h-6 w-6 text-green-500 dark:text-green-400" />,
      title: '99% Accuracy',
      description: 'Using Modified ResNet50 CNN'
    },
    {
      icon: <RefreshCw className="h-6 w-6 text-blue-500 dark:text-blue-400" />,
      title: 'Real-time Updates',
      description: 'Live weather and alerts'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          Quick Start Guide
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-8">
          {quickStartSteps.map((step, index) => (
            <div key={index} className="flex flex-col items-center">
              {step.icon}
              <h3 className="font-semibold mt-4 text-gray-900 dark:text-gray-100">{step.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">{step.description}</p>
            </div>
          ))}
        </div>
      </div>

      <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4 text-center">
        System Features
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {systemFeatures.map((feature, index) => (
          <div key={index} className="p-6 bg-gray-50 dark:bg-gray-700 rounded-lg text-center">
            <div className="flex justify-center mb-4">
              {feature.icon}
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-gray-100">{feature.title}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">{feature.description}</p>
          </div>
        ))}
      </div>

      <div className="my-8">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4 text-center">
          Disease Management Recommendations
        </h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Disease</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Symptoms</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Recommended Management</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {/* Table rows with dark mode styles */}
               <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Bacterial Leaf Blight (Xanthomonas oryzae)</td>
                  <td className="px-6 py-4 text-sm text-gray-500">Yellowing and wilting</td>
                  <td className="px-6 py-4 text-sm text-gray-500">Ensure proper water drainage, avoid overhead irrigation</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Rice Blast (Magnaporthe oryzae)</td>
                  <td className="px-6 py-4 text-sm text-gray-500">Brown lesions on leaves</td>
                  <td className="px-6 py-4 text-sm text-gray-500">Use resistant varieties, apply proper fertilization</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Brown Spot (Cochliobolus miyabeanus)</td>
                  <td className="px-6 py-4 text-sm text-gray-500">Small brown spots on leaves</td>
                  <td className="px-6 py-4 text-sm text-gray-500">Use balanced fertilization, avoid nutrient deficiency</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Sheath Blight (Rhizoctonia solani)</td>
                  <td className="px-6 py-4 text-sm text-gray-500">Irregularly shaped lesions</td>
                  <td className="px-6 py-4 text-sm text-gray-500">Maintain plant spacing, apply fungicides</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Tungro Virus Disease (Rice Tungro Bacilliform Virus & Rice Tungro Spherical Virus)</td>
                  <td className="px-6 py-4 text-sm text-gray-500">Yellow-orange leaves, stunted growthunted growth</td>
                  <td className="px-6 py-4 text-sm text-gray-500">Control leafhoppers, plant resistant varieties</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Leaf Scald (Microdochium oryzae)</td>
                  <td className="px-6 py-4 text-sm text-gray-500">Large brown lesions with a wavy edge</td>
                  <td className="px-6 py-4 text-sm text-gray-500">Improve field drainage, plant resistant varieties</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Bakanae Disease (Fusarium fujikuroi)</td>
                  <td className="px-6 py-4 text-sm text-gray-500">Abnormally tall plants with thin leaves</td>
                  <td className="px-6 py-4 text-sm text-gray-500">Use certified seeds, treat seeds with fungicides</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">False Smut (Ustilaginoidea virens)</td>
                  <td className="px-6 py-4 text-sm text-gray-500">Orange spore masses on grains</td>
                  <td className="px-6 py-4 text-sm text-gray-500">Avoid excessive nitrogen fertilizer, apply fungicides</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Grain Discoloration (Multiple Fungal Pathogens)</td>
                  <td className="px-6 py-4 text-sm text-gray-500">Various colored spots on grains</td>
                  <td className="px-6 py-4 text-sm text-gray-500">Proper drying and storage, use disease-free seeds</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Sheath Rot (Sarocladium oryzae)</td>
                  <td className="px-6 py-4 text-sm text-gray-500">Reddish-brown lesions on the sheath</td>
                  <td className="px-6 py-4 text-sm text-gray-500">Use disease-free seeds, apply fungicides</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Narrow Brown Leaf Spot (Cercospora janseana)</td>
                  <td className="px-6 py-4 text-sm text-gray-500">Small linear brown lesions on leaves</td>
                  <td className="px-6 py-4 text-sm text-gray-500">Improve plant nutrition, use resistant varieties</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Stem Rot (Magnaporthe salvinii)</td>
                  <td className="px-6 py-4 text-sm text-gray-500">Dark lesions on lower stem</td>
                  <td className="px-6 py-4 text-sm text-gray-500">Improve soil drainage, reduce nitrogen application</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Yellow Dwarf Disease (Rice Yellow Dwarf Virus)</td>
                  <td className="px-6 py-4 text-sm text-gray-500">Stunted growth, yellowing leaves</td>
                  <td className="px-6 py-4 text-sm text-gray-500">Control insect vectors, plant resistant varieties</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Healthy Rice Leaf (For reference and proper classification)</td>
                  <td className="px-6 py-4 text-sm text-gray-500">No visible disease symptoms</td>
                  <td className="px-6 py-4 text-sm text-gray-500">Maintain good agricultural practices</td>
                </tr>
              {/* Add more rows with similar dark mode styling */}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-8 text-center">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Need help? Contact our support team:
        </p>
        <div className="flex justify-center space-x-6 mt-4">
          <a href="mailto:support@ricedetection.com" className="flex items-center text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400">
            <Mail className="h-5 w-5 mr-2" />
            <span>Email Support</span>
          </a>
          <a href="tel:+639066894830" className="flex items-center text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400">
            <Phone className="h-5 w-5 mr-2" />
            <span>Phone Support</span>
          </a>
        </div>
      </div>

      <p className="text-sm text-gray-500 dark:text-gray-400 mt-6 text-center italic">
        © 2025 James Bryan Aquino Tababa @ ISU CYN | Master of Information Technology
      </p>
    </div>
  );
};

export default UserManual;