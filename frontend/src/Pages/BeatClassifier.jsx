

import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BeatClassifier = () => {
  const [file, setFile] = useState(null);
  const [prediction, setPrediction] = useState('');
  const [error, setError] = useState('');
  const [audioUrl, setAudioUrl] = useState(null);
  const [countdown, setCountdown] = useState(null);

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    setFile(uploadedFile);
    setAudioUrl(URL.createObjectURL(uploadedFile));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Please select a file to upload.');
      return;
    }

    setCountdown(3);

    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev === 1) {
          clearInterval(interval);
          makePrediction();
          return null;
        }
        return prev - 1;
      });
    }, 1000);
  };



  const makePrediction = async () => {
    if (!file) {
      return; // No toast for missing file
    }
  
    const formData = new FormData();
    formData.append("file", file);
  
    try {
      const response = await axios.post("http://localhost:5000/predict", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
  
      console.log("Response:", response.data); // Debugging
  
      if (response.status === 200 && response.data.prediction) {
        setPrediction(response.data.prediction);
        toast.success("✅ Prediction successful!");
      }
    } catch (err) {
      console.error("Error:", err.response ? err.response.data : err.message); // Only log the error, no toast
    }
  };
  

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-orange-300 to-rose-300 p-6">
      <h1 className="text-4xl font-bold text-red-700 mb-6 drop-shadow-md">ML Beat Classifier</h1>

      <div className="bg-white bg-opacity-30 backdrop-blur-md p-6 rounded-2xl shadow-lg w-full max-w-md">
        <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4">
          <input
            type="file"
            accept=".wav"
            onChange={handleFileChange}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-red-500"
          />

          {audioUrl && (
            <audio controls className="w-full mt-2">
              <source src={audioUrl} type="audio/wav" />
              Your browser does not support the audio element.
            </audio>
          )}

          <button
            type="submit"
            className="w-full px-4 py-2 bg-red-600 text-white rounded-lg shadow-md transition-transform duration-200 hover:scale-105 active:scale-95"
          >
            {countdown ? `Predicting in ${countdown}...` : 'Upload and Classify'}
          </button>
        </form>

        {prediction && (
          <div className="mt-4 p-4 bg-green-200 text-green-900 rounded-lg shadow">
            <h2 className="font-semibold">Prediction:</h2>
            <p>{prediction}</p>
          </div>
        )}

    
      </div>

      <ToastContainer />
    </div>
  );
};

export default BeatClassifier;


