import React, { useState } from "react";
import { FiImage, FiSend, FiLoader } from "react-icons/fi";
import axios from "axios";
import ProductList from "./ProductList";
import ProductCardSkeleton from "./ProductSkeleton";

// Upload image to imgbb to get a public URL
const uploadToImgbb = async (base64Image) => {
  const formData = new FormData();
  formData.append("image", base64Image);

  const response = await fetch(
    `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,
    {
      method: "POST",
      body: formData,
    }
  );

  const data = await response.json();

  if (data.success) {
    return data.data.url; // Image URL from imgbb
  } else {
    throw new Error("Image upload failed");
  }
};

//to filter the data for ecommerce

const filterEcommerceLinks = (responses) => {
  if (!Array.isArray(responses)) return [];

  const allowedSites = ["ebay.com", "amazon.com", "flipkart.com"];

  return responses.filter((item) => {
    // If item is a string URL:
    if (typeof item === "string") {
      return allowedSites.some((site) => item.includes(site));
    }
    // If item is an object with a url property (adjust as needed):
    if (item.url && typeof item.url === "string") {
      return allowedSites.some((site) => item.url.includes(site));
    }
    return false;
  });
};

// SerpApi integration
const querySerpApi = async (imageUrl, textPrompt) => {
  try {
    const response = await axios.post(
      "https://backendforsearch.onrender.com/api/reverse-image-search",
      { imageUrl, textPrompt }
    );

    if (response.data.error) {
      throw new Error(response.data.error);
    }

    const imageResponse = response.data.imageResponse;

    const textResponse = response.data.textResponse;

    // Combine and return both sets of titles (optional)
    return { imageResponse, textResponse };
  } catch (error) {
    if (error.response) {
      throw new Error(
        `API Error: ${error.response.status} - ${
          error.response.data.message || "No details"
        }`
      );
    } else if (error.request) {
      throw new Error("Network Error: No response received");
    } else {
      throw new Error(`Request Error: ${error.message}`);
    }
  }
};

const ChatInput = ({ onSend }) => {
  const [textPrompt, setTextPrompt] = useState("");
  const [image, setImage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [imageResponse, setImageResponse] = useState([]);
  const [textResponse, setTextResponse] = useState([]);

  const handleSend = async () => {
    if (!textPrompt || !image || isProcessing) return;

    setIsProcessing(true);
    setError(null);

    try {
      const reader = new FileReader();
      reader.onloadend = async () => {
        try {
          const base64String = reader.result.split(",")[1];

          // Step 1: Upload to imgbb
          const uploadedImageUrl = await uploadToImgbb(base64String);

          // Step 2: Send to backend
          const results = await querySerpApi(uploadedImageUrl, textPrompt);

          const filteredImageResponse = filterEcommerceLinks(results.imageResponse);
          const filteredTextResponse = filterEcommerceLinks(results.textResponse);

          // Step 3: Update state
          setImageResponse(filteredImageResponse);
          setTextResponse(filteredTextResponse);
          setTextPrompt("");

          // Reset form
          setImage(null);
          setTextPrompt("");
        } catch (err) {
          setError("Failed to process image");
          console.error("Image processing error:", err);
        } finally {
          setIsProcessing(false);
        }
      };

      reader.readAsDataURL(image);
    } catch (err) {
      setError("Failed to read image file");
      setIsProcessing(false);
      console.error("File reading error:", err);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImage(file);
  };

  return (
    <div className="flex flex-col w-full bg-white gap-1 items-center">
      {/* Error message */}
      {error && <div className="text-xs text-red-500 px-4">{error}</div>}

      <div className="flex items-center p-4 gap-2 w-200 h-30">
        {/* Image Upload */}
        <label className="cursor-pointer relative">
          {isProcessing ? (
            <FiLoader className="text-xl text-gray-500 animate-spin" />
          ) : (
            <FiImage className="text-xl text-gray-500 cursor-pointer" />
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            disabled={isProcessing}
            className="absolute inset-0 w-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
          />
        </label>

        {/* Text Area */}
        <textarea
          className="flex-1 border rounded-md p-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-300 h-full"
          rows={1}
          placeholder={
            isProcessing ? "Processing image..." : "Type your message..."
          }
          value={textPrompt}
          onChange={(e) => setTextPrompt(e.target.value)}
          disabled={isProcessing}
        />

        {/* Send Button */}
        <button
          className={`p-2 rounded-md cursor-pointer flex items-center justify-center 
            ${
              isProcessing
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-red-500 text-white hover:bg-white hover:text-red-500 hover:border-red-500"
            }`}
          onClick={handleSend}
          disabled={isProcessing}
        >
          {isProcessing ? <FiLoader className="animate-spin" /> : <FiSend />}
        </button>
      </div>

      {/* Image preview */}
      {image && (
        <div className="px-4 pb-2">
          <img
            src={URL.createObjectURL(image)}
            alt="Preview"
            className="max-h-20 rounded-md border"
          />
        </div>
      )}

      {/* Image Results and Text Reponse */}
      {isProcessing ? (
        <ProductCardSkeleton />
      ) : imageResponse.length === 0 && textResponse.length === 0 ? (
        <div className="text-center text-gray-500 p-4">
          Upload an image and enter a product description to search.
        </div>
      ) : (
        <ProductList
          imageResponse={imageResponse}
          textResponse={textResponse}
        />
      )}
    </div>
  );
};

export default ChatInput;
