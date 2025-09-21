import React from 'react';
import { MessageCircle, BookOpen, Heart, Sparkles } from 'lucide-react';

interface DashboardProps {
  onNavigate: (page: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Sparkles className="text-blue-500 w-8 h-8 mr-3" />
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800">Aura Wellness</h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Your safe space for mental wellness and emotional support. Take a moment to care for yourself today.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <button
            onClick={() => onNavigate('chat')}
            className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-blue-200"
          >
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-colors">
                <MessageCircle className="w-10 h-10 text-blue-600" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-3">Start Chat</h3>
              <p className="text-gray-600 leading-relaxed">
                Talk to our supportive AI companion for guidance and emotional support whenever you need it.
              </p>
            </div>
          </button>

          <button
            onClick={() => onNavigate('journal')}
            className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-green-200"
          >
            <div className="text-center">
              <div className="bg-green-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200 transition-colors">
                <BookOpen className="w-10 h-10 text-green-600" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-3">Journal</h3>
              <p className="text-gray-600 leading-relaxed">
                Write your thoughts and reflections in a private space. Your entries are saved securely on your device.
              </p>
            </div>
          </button>

          <button
            onClick={() => onNavigate('resources')}
            className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-rose-200"
          >
            <div className="text-center">
              <div className="bg-rose-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4 group-hover:bg-rose-200 transition-colors">
                <Heart className="w-10 h-10 text-rose-600" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-3">Resources</h3>
              <p className="text-gray-600 leading-relaxed">
                Find trusted mental health helplines and resources specifically for Indian users.
              </p>
            </div>
          </button>
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-500 max-w-md mx-auto">
            Remember: You're not alone. Taking care of your mental health is just as important as your physical health.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;