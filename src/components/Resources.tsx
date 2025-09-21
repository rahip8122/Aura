import React from 'react';
import { ArrowLeft, Phone, ExternalLink, Clock, Heart } from 'lucide-react';
import { mentalHealthResources } from '../data/resources';

interface ResourcesProps {
  onBack: () => void;
}

const Resources: React.FC<ResourcesProps> = ({ onBack }) => {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'helpline':
        return <Phone className="w-5 h-5 text-blue-600" />;
      case 'website':
        return <ExternalLink className="w-5 h-5 text-green-600" />;
      case 'organization':
        return <Heart className="w-5 h-5 text-rose-600" />;
      default:
        return <Heart className="w-5 h-5 text-gray-600" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'helpline':
        return 'bg-blue-50 border-blue-200';
      case 'website':
        return 'bg-green-50 border-green-200';
      case 'organization':
        return 'bg-rose-50 border-rose-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-100">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center">
            <button
              onClick={onBack}
              className="mr-4 p-2 rounded-full hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-rose-300"
            >
              <ArrowLeft className="w-6 h-6 text-gray-600" />
            </button>
            <div>
              <h1 className="text-2xl font-semibold text-gray-800">Mental Health Resources</h1>
              <p className="text-gray-600">Trusted support services in India</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Emergency Notice */}
          <div className="bg-red-50 border border-red-200 rounded-2xl p-6 mb-8">
            <div className="flex items-start">
              <div className="bg-red-100 rounded-full p-2 mr-4">
                <Phone className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-red-800 mb-2">In Case of Emergency</h2>
                <p className="text-red-700 mb-3">
                  If you or someone you know is having thoughts of self-harm or suicide, please reach out immediately:
                </p>
                <div className="space-y-2">
                  <p className="font-medium text-red-800">• AASRA: 91-9820466726 (24/7)</p>
                  <p className="font-medium text-red-800">• Vandrevala Foundation: 1860-2662-345 (24/7)</p>
                  <p className="font-medium text-red-800">• Kiran Helpline: 1800-599-0019 (24/7)</p>
                </div>
              </div>
            </div>
          </div>

          {/* Resources List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mentalHealthResources.map((resource, index) => (
              <div
                key={index}
                className={`bg-white rounded-2xl border ${getTypeColor(resource.type)} p-6 hover:shadow-lg transition-all duration-300`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center">
                    {getTypeIcon(resource.type)}
                    <h3 className="text-lg font-semibold text-gray-800 ml-2">{resource.name}</h3>
                  </div>
                  <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full capitalize">
                    {resource.type}
                  </span>
                </div>

                <p className="text-gray-600 mb-4 leading-relaxed">{resource.description}</p>

                <div className="space-y-3">
                  {resource.contact && (
                    <div className="flex items-center">
                      <Phone className="w-4 h-4 text-blue-500 mr-2" />
                      <a
                        href={`tel:${resource.contact}`}
                        className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
                      >
                        {resource.contact}
                      </a>
                    </div>
                  )}

                  {resource.website && (
                    <div className="flex items-center">
                      <ExternalLink className="w-4 h-4 text-green-500 mr-2" />
                      <a
                        href={resource.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-green-600 hover:text-green-800 font-medium transition-colors"
                      >
                        Visit Website
                      </a>
                    </div>
                  )}

                  {resource.availability && (
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 text-orange-500 mr-2" />
                      <span className="text-gray-600 text-sm">{resource.availability}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Additional Information */}
          <div className="mt-8 bg-blue-50 border border-blue-200 rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-blue-800 mb-3">Important Information</h2>
            <div className="space-y-2 text-blue-700">
              <p>• All helplines listed are specifically for Indian users</p>
              <p>• Services may be available in multiple Indian languages</p>
              <p>• Most helplines offer free counseling and support</p>
              <p>• Keep these numbers saved for easy access when needed</p>
              <p>• Don't hesitate to reach out - seeking help is a sign of strength</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resources;