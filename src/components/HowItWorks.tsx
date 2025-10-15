import React from 'react';

const steps = [
  {
    number: '1',
    title: 'Install Extension',
    description: 'Download and install Browser Lock Pro from the Chrome Web Store or load it as an unpacked extension.',
    icon: '📥'
  },
  {
    number: '2',
    title: 'Set Your Password',
    description: 'Create a secure password or PIN. The extension will guide you with a strength indicator.',
    icon: '🔑'
  },
  {
    number: '3',
    title: 'Lock Your Browser',
    description: 'Click the extension icon and hit "Lock Browser". All tabs are instantly secured.',
    icon: '🔒'
  },
  {
    number: '4',
    title: 'Unlock When Needed',
    description: 'Enter your password to unlock. Simple, fast, and secure access restoration.',
    icon: '🔓'
  }
];

const HowItWorks: React.FC = () => {
  return (
    <div className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get started in less than 5 minutes
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <div className="relative mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center text-white text-3xl font-bold mx-auto shadow-lg">
                  {step.number}
                </div>
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 text-5xl">
                  {step.icon}
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-8">
                {step.title}
              </h3>
              <p className="text-gray-600">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
