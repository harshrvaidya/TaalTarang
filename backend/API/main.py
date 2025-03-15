
# from flask import Flask, request, jsonify
# import librosa
# import numpy as np
# from flask_cors import CORS
# import pickle
# import os

# app = Flask(__name__)
# CORS(app)  # Enable CORS
# # Load your trained model
# MODEL_PATH = "tabla_classifier2.pkl"  # Ensure the correct path
# with open(MODEL_PATH, "rb") as model_file:
#     model = pickle.load(model_file)

# # Function to extract features from the uploaded audio
# def extract_features(file_path):
#     y, sr = librosa.load(file_path, sr=None)  # Load the audio file
#     mfccs = librosa.feature.mfcc(y=y, sr=sr, n_mfcc=20)  # Extract MFCC features
#     return np.mean(mfccs, axis=1).reshape(1, -1)  # Reshape for model input

# # Route to handle audio file uploads and return predictions
# @app.route("/predict", methods=["POST"])
# def predict():
#     if "file" not in request.files:
#         return jsonify({"error": "No file provided"}), 400

#     file = request.files["file"]
    
#     if file.filename == "":
#         return jsonify({"error": "No selected file"}), 400

#     file_path = "temp.wav"
#     file.save(file_path)  # Save the uploaded file temporarily

#     try:
#         features = extract_features(file_path)  # Extract features
#         prediction = model.predict(features)[0]  # Make prediction
#         os.remove(file_path)  # Clean up temp file
#         return jsonify({"prediction": prediction})
#     except Exception as e:
#         return jsonify({"error": str(e)}), 500

# # Run the Flask app
# if __name__ == "__main__":
#     app.run(debug=True)

# from flask import Flask, request, jsonify
# from flask_cors import CORS
# import librosa
# import numpy as np
# import pickle
# import os

# app = Flask(__name__)
# CORS(app)  # Enable CORS

# # Load your trained model
# MODEL_PATH = "tabla_classifier2.pkl"  # Ensure the correct path
# try:
#     with open(MODEL_PATH, "rb") as model_file:
#         model = pickle.load(model_file)
# except Exception as e:
#     print(f"Error loading model: {e}")

# # Function to extract features from the uploaded audio
# def extract_features(file_path):
#     y, sr = librosa.load(file_path, sr=None)  # Load the audio file
#     mfccs = librosa.feature.mfcc(y=y, sr=sr, n_mfcc=20)  # Extract MFCC features
#     return np.mean(mfccs, axis=1).reshape(1, -1)  # Reshape for model input

# # Route to handle audio file uploads and return predictions
# @app.route("/predict", methods=["POST"])
# def predict():
#     if "file" not in request.files:
#         return jsonify({"error": "No file provided"}), 400

#     file = request.files["file"]
    
#     if file.filename == "":
#         return jsonify({"error": "No selected file"}), 400

#     file_path = "temp.wav"
#     file.save(file_path)  # Save the uploaded file temporarily

#     try:
#         features = extract_features(file_path)  # Extract features
#         prediction = model.predict(features)[0]  # Make prediction
#         os.remove(file_path)  # Clean up temp file
#         return jsonify({"prediction": prediction})
#     except Exception as e:
#         os.remove(file_path)  # Clean up temp file in case of error
#         return jsonify({"error": str(e)}), 500

# # Run the Flask app
# if __name__ == "__main__":
#     app.run(debug=True)


# from flask import Flask, request, jsonify
# from flask_cors import CORS
# import librosa
# import numpy as np
# import pickle
# import os

# app = Flask(__name__)
# CORS(app)  # Enable CORS

# # Load your trained model
# MODEL_PATH = "tabla_classifier2.pkl"
# model = None

# try:
#     if os.path.exists(MODEL_PATH):  # Check if the model file exists
#         with open(MODEL_PATH, "rb") as model_file:
#             model = pickle.load(model_file)
#         print("✅ Model loaded successfully!")
#     else:
#         print(f"❌ ERROR: Model file '{MODEL_PATH}' not found.")
# except Exception as e:
#     print(f"❌ ERROR loading model: {e}")

# # Function to extract features from the uploaded audio
# def extract_features(file_path):
#     try:
#         y, sr = librosa.load(file_path, sr=None)  # Load the audio file
#         mfccs = librosa.feature.mfcc(y=y, sr=sr, n_mfcc=20)  # Extract MFCC features
#         return np.mean(mfccs, axis=1).reshape(1, -1)  # Reshape for model input
#     except Exception as e:
#         raise ValueError(f"Error extracting features: {str(e)}")

# # Route to handle audio file uploads and return predictions
# @app.route("/predict", methods=["POST"])
# def predict():
#     if "file" not in request.files:
#         return jsonify({"error": "No file provided"}), 400

#     file = request.files["file"]
#     if file.filename == "":
#         return jsonify({"error": "No selected file"}), 400

#     file_path = "temp.wav"
#     file.save(file_path)  # Save the uploaded file temporarily

#     try:
#         if model is None:
#             return jsonify({"error": "Model not loaded. Check logs for errors."}), 500

#         features = extract_features(file_path)  # Extract features
#         prediction = model.predict(features)[0]  # Make prediction
        
#         os.remove(file_path)  # Clean up temp file
#         return jsonify({"prediction": prediction})
    
#     except ValueError as ve:
#         os.remove(file_path)  # Clean up temp file
#         return jsonify({"error": f"Feature extraction error: {str(ve)}"}), 500

#     except Exception as e:
#         os.remove(file_path)  # Clean up temp file
#         return jsonify({"error": f"Server error: {str(e)}"}), 500

# # Run the Flask app
# if __name__ == "__main__":
#     app.run(debug=True)


from flask import Flask, request, jsonify
from flask_cors import CORS
import librosa
import numpy as np
import pickle
import os
import traceback  # For error debugging

app = Flask(__name__)
CORS(app)  # Enable CORS

# Load the trained model
MODEL_PATH = "tabla_classifier2.pkl"  # Ensure the correct path

try:
    with open(MODEL_PATH, "rb") as model_file:
        model = pickle.load(model_file)
    print("✅ Model loaded successfully!")
except Exception as e:
    print(f"❌ Error loading model: {e}")
    model = None  # Set to None if loading fails

# Function to extract MFCC features from an audio file
def extract_features(file_path):
    try:
        y, sr = librosa.load(file_path, sr=None)  # Load the audio file
        mfccs = librosa.feature.mfcc(y=y, sr=sr, n_mfcc=13)  # Extract MFCC features
        return np.mean(mfccs, axis=1).reshape(1, -1)  # Reshape for model input
    except Exception as e:
        print(f"❌ Error extracting features: {e}")
        traceback.print_exc()
        return None  # Return None if feature extraction fails

# Route to handle audio file uploads and return predictions
@app.route("/predict", methods=["POST"])
def predict():
    if "file" not in request.files:
        return jsonify({"error": "No file provided"}), 400

    file = request.files["file"]
    
    if file.filename == "":
        return jsonify({"error": "No selected file"}), 400

    file_path = "temp.wav"
    file.save(file_path)  # Save uploaded file temporarily

    try:
        if model is None:
            return jsonify({"error": "Model not loaded."}), 500

        print("ℹ️ Extracting features from the uploaded file...")
        features = extract_features(file_path)

        if features is None:
            return jsonify({"error": "Feature extraction failed"}), 500

        print(f"ℹ️ Extracted Features Shape: {features.shape}")
        
        # Ensure model expects the correct input shape
        prediction = model.predict(features)[0]  # Make prediction
        print(f"✅ Prediction: {prediction}")

        os.remove(file_path)  # Clean up temp file
        return jsonify({"prediction": prediction})

    except Exception as e:
        os.remove(file_path)  # Clean up temp file in case of error
        print("❌ ERROR:", str(e))
        traceback.print_exc()  # Print full error trace in terminal
        return jsonify({"error": f"Server error: {str(e)}"}), 500

# Run the Flask app
if __name__ == "__main__":
    app.run(debug=True)
