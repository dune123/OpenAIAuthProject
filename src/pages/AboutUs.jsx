import React from 'react';

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-white py-12 px-6 md:px-20 text-gray-800">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-red-600">About Us</h1>

        <p className="mb-4 text-lg">
          Welcome to <span className="font-semibold text-red-500">VisionQuery</span>, your intelligent companion for discovering products using the power of AI.
        </p>

        <p className="mb-4">
          Our platform combines advanced <span className="font-semibold">image recognition</span> and <span className="font-semibold">natural language processing</span> to help users find what they’re looking for faster, whether through a photo or a few descriptive words.
        </p>

        <p className="mb-4">
          Powered by state-of-the-art AI models and real-time search APIs, VisionQuery delivers fast and relevant results to enhance your shopping or research experience. Whether you're snapping a picture of a product or typing in a prompt, we’ve got you covered.
        </p>

        <p className="mb-4">
          Our mission is simple: make search smarter, more intuitive, and accessible to everyone.
        </p>

        <h2 className="text-2xl font-semibold mt-10 mb-2 text-gray-900">What We Offer:</h2>
        <ul className="list-disc pl-6 text-gray-700 space-y-2">
          <li>AI-powered product search from images</li>
          <li>Text-based intelligent matching</li>
          <li>Real-time results using SerpAPI and custom logic</li>
          <li>Clean, user-friendly interface</li>
        </ul>

        <div className="mt-10">
          <p className="text-md text-gray-600">
            Built with ❤️ using React, Tailwind CSS, and modern APIs.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
