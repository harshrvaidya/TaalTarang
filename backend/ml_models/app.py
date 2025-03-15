from flask import Flask, request, jsonify
import librosa
import numpy as np
import pickle
import os

app = Flask(__name__)

# Load your trained model
MODEL_PATH = "tabla_classifier2.pkl"  # Ensure the correct path
with open(MODEL_PATH, "rb") as model_file:
    model = pickle.load(model_file)

# Function to extract features from the uploaded audio
def extract_features(file_path):
    y, sr = librosa.load(file_path, sr=None)  # Load the audio file
    mfccs = librosa.feature.mfcc(y=y, sr=sr, n_mfcc=20)  # Extract MFCC features
    return np.mean(mfccs, axis=1).reshape(1, -1)  # Reshape for model input

# Route to handle audio file uploads and return predictions
@app.route("/predict", methods=["POST"])
def predict():
    if "file" not in request.files:
        return jsonify({"error": "No file provided"}), 400

    file = request.files["file"]
    
    if file.filename == "":
        return jsonify({"error": "No selected file"}), 400

    file_path = "temp.wav"
    file.save(file_path)  # Save the uploaded file temporarily

    try:
        features = extract_features(file_path)  # Extract features
        prediction = model.predict(features)[0]  # Make prediction
        os.remove(file_path)  # Clean up temp file
        return jsonify({"prediction": prediction})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Run the Flask app
if __name__ == "__main__":
    app.run(debug=True)
