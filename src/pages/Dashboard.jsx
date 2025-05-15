import React from "react";
import ChatInput from "../components/ChatInput";
import Footer from "../components/Footer";

const Dashboard = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Main content (takes remaining height minus footer) */}
      <div className="flex-grow flex flex-col items-center">
        <div className="p-10">
          <p className="text-center text-2xl font-semibold text-gray-700 mb-4 max-w-xl">
            Start your conversation by entering a message below or upload an image
            to get the most relevant and accurate search results tailored to your
            needs.
          </p>
        </div>
        <ChatInput />
      </div>

      {/* Footer (sticks to bottom) */}
      <Footer />
    </div>
  );
};

export default Dashboard;
