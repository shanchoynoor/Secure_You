import React from 'react';

const Hero: React.FC = () => {
  return (
    <div className="relative bg-gradient-to-br from-purple-600 via-blue-600 to-purple-800 text-white overflow-hidden">
      <div className="absolute inset-0 bg-black opacity-10"></div>
      <div className="absolute inset-0" style={{
        backgroundImage: `url('https://d64gsuwffb70l.cloudfront.net/68ef80691fcf98059a4255ff_1760526486969_b12d7cf8.webp')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        opacity: 0.2
      }}></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <div className="text-center">
          <div className="flex justify-center mb-8">
            <img 
              src="https://d64gsuwffb70l.cloudfront.net/68ef80691fcf98059a4255ff_1760526485471_6f5926fd.webp" 
              alt="Browser Lock Pro"
              className="w-24 h-24 md:w-32 md:h-32 animate-pulse"
            />
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
            Browser Lock Pro
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 text-purple-100 max-w-3xl mx-auto">
            Secure your Chrome browser with password protection. Lock your browser instantly and prevent unauthorized access.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a 
              href="#download" 
              className="bg-white text-purple-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-purple-50 transition-all transform hover:scale-105 shadow-xl"
            >
              Download Extension
            </a>
            <a 
              href="#features" 
              className="bg-purple-500 bg-opacity-30 backdrop-blur-sm border-2 border-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-opacity-40 transition-all"
            >
              Learn More
            </a>
          </div>
          
          <div className="mt-12 flex flex-wrap justify-center gap-8 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🔒</span>
              <span>SHA-256 Encrypted</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">⚡</span>
              <span>Instant Lock</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">🎨</span>
              <span>Modern UI</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">🆓</span>
              <span>100% Free</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
