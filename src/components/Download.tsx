import React, { useState } from 'react';

const Download: React.FC = () => {
  const [showInstructions, setShowInstructions] = useState(false);

  return (
    <div id="download" className="py-20 bg-gradient-to-br from-purple-600 via-blue-600 to-purple-800 text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          Download Browser Lock Pro
        </h2>
        <p className="text-xl mb-8 text-purple-100">
          Free, open-source, and ready to secure your browser
        </p>
        
        <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl p-8 mb-8">
          <div className="space-y-4">
            <button
              onClick={() => {
                const link = document.createElement('a');
                link.href = '/dist.zip'; // Path to the ZIP file
                link.download = 'BrowserLockPro.zip';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }}
              className="w-full bg-white text-purple-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-purple-50 transition-all transform hover:scale-105 shadow-xl"
            >
              📦 Download Browser Lock Pro
            </button>
            
            <button 
              onClick={() => setShowInstructions(!showInstructions)}
              className="w-full bg-purple-500 bg-opacity-30 backdrop-blur-sm border-2 border-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-opacity-40 transition-all"
            >
              📖 Installation Instructions
            </button>
          </div>
        </div>

        {showInstructions && (
          <div className="bg-white text-gray-900 rounded-2xl p-8 text-left shadow-2xl animate-fadeIn">
            <h3 className="text-2xl font-bold mb-6 text-center">Installation Steps</h3>
            <ol className="space-y-4">
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold">1</span>
                <div>
                  <strong>Download the extension files</strong>
                  <p className="text-gray-600">Get the latest release from GitHub and extract the ZIP file.</p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold">2</span>
                <div>
                  <strong>Open Chrome Extensions</strong>
                  <p className="text-gray-600">Type <code className="bg-gray-100 px-2 py-1 rounded">chrome://extensions</code> in your address bar.</p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold">3</span>
                <div>
                  <strong>Enable Developer Mode</strong>
                  <p className="text-gray-600">Toggle the "Developer mode" switch in the top-right corner.</p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold">4</span>
                <div>
                  <strong>Load Unpacked Extension</strong>
                  <p className="text-gray-600">Click "Load unpacked" and select the extracted extension folder.</p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold">5</span>
                <div>
                  <strong>Set Your Password</strong>
                  <p className="text-gray-600">Click the extension icon and create your secure password.</p>
                </div>
              </li>
            </ol>
          </div>
        )}

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div>
            <div className="text-3xl mb-2">✅</div>
            <div className="font-semibold">100% Free</div>
            <div className="text-sm text-purple-200">No hidden costs</div>
          </div>
          <div>
            <div className="text-3xl mb-2">🔓</div>
            <div className="font-semibold">Open Source</div>
            <div className="text-sm text-purple-200">Review the code</div>
          </div>
          <div>
            <div className="text-3xl mb-2">🔒</div>
            <div className="font-semibold">Privacy First</div>
            <div className="text-sm text-purple-200">No data collection</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Download;
