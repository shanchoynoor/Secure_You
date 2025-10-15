import React from 'react';

const features = [
  {
    icon: '🔐',
    title: 'Password Protection',
    description: 'Secure your browser with a strong password or 6-digit PIN using SHA-256 encryption.'
  },
  {
    icon: '🔒',
    title: 'Instant Lock',
    description: 'Lock all browser tabs instantly with a single click. Full-page overlay blocks all interactions.'
  },
  {
    icon: '⏰',
    title: 'Auto-Lock Timer',
    description: 'Set automatic lock after 5, 15, 30, or 60 minutes of inactivity for hands-free security.'
  },
  {
    icon: '🎨',
    title: 'Modern UI',
    description: 'Beautiful glassmorphic design with smooth animations and intuitive user experience.'
  },
  {
    icon: '🛡️',
    title: 'Extension Protection',
    description: 'Blocks access to chrome://extensions when locked to prevent unauthorized changes.'
  },
  {
    icon: '💪',
    title: 'Password Strength',
    description: 'Real-time password strength indicator helps you create secure passwords.'
  },
  {
    icon: '🔄',
    title: 'Change Password',
    description: 'Easily update your password anytime with secure verification of current password.'
  },
  {
    icon: '💾',
    title: 'Persistent Lock',
    description: 'Lock state survives browser restarts. Your browser stays locked until you unlock it.'
  },
  {
    icon: '🚫',
    title: 'Navigation Blocking',
    description: 'Prevents all navigation, new tabs, and page interactions when browser is locked.'
  },
  {
    icon: '🌐',
    title: 'Works Everywhere',
    description: 'Compatible with Chrome, Edge, Brave, and all Chromium-based browsers.'
  },
  {
    icon: '🔓',
    title: 'Easy Unlock',
    description: 'Quick unlock with your password. Simple, fast, and secure access restoration.'
  },
  {
    icon: '📱',
    title: 'Responsive Design',
    description: 'Clean, modern interface that works perfectly at any screen size or resolution.'
  }
];

const Features: React.FC = () => {
  return (
    <div id="features" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Powerful Features
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Everything you need to keep your browser secure and private
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all transform hover:-translate-y-1"
            >
              <div className="text-5xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;
