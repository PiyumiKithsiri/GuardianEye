import cv2
import face_recognition
import os
import pygame  # For playing sounds
import numpy as np
import pymongo
import requests  # For fetching images from URLs
from io import BytesIO
from PIL import Image
from datetime import datetime  # To get the current date and time
import tkinter as tk  # For creating popup messages
from tkinter import messagebox  # For displaying popup messages

# Initialize pygame mixer
pygame.mixer.init()

# MongoDB connection setup
client = pymongo.MongoClient("mongodb://localhost:27017/")  # Replace with your MongoDB URI if needed
db = client["eyedb"]  # Replace with your database name
missing_collection = db["missingpatients"]  # Collection for missing patients
found_collection = db["foundpatients"]  # Collection for found patients

# Function to load images from URLs and return their face encodings
def load_face_encodings_from_urls(image_urls):
    encodings = []
    for url in image_urls:
        try:
            response = requests.get(url)
            if response.status_code == 200:
                img = Image.open(BytesIO(response.content))
                img = np.array(img)
                face_encodings = face_recognition.face_encodings(img)
                if face_encodings:
                    encodings.append(face_encodings[0])  # Assuming one face per image
        except Exception as e:
            print(f"Error loading image from {url}: {e}")
    return encodings

# Fetch missing patients data from MongoDB
def load_patients_from_db():
    known_faces = {}
    patients = missing_collection.find({})
    for patient in patients:
        if "index" in patient and "imageUrls" in patient:
            index = patient["index"]
            image_urls = patient["imageUrls"]
            known_faces[index] = load_face_encodings_from_urls(image_urls)
    return known_faces

# Function to save patient details in the foundpatients collection
def save_found_patient(index, captured_image):
    captured_date = datetime.now().strftime("%Y-%m-%d")
    captured_time = datetime.now().strftime("%H:%M:%S")
    cctv_id = "CCTV_023"
    location = "Mulleriyawa East"
    
    found_patient_data = {
        "index": index,
        "captured_date": captured_date,
        "captured_time": captured_time,
        "cctv_id": cctv_id,
        "location": location,
    }
    
    # Insert into the foundpatients collection
    found_collection.insert_one(found_patient_data)
    print(f"Saved found patient data: {found_patient_data}")

# Function to show a popup message
def show_popup(message):
    root = tk.Tk()
    root.withdraw()  # Hide the main window
    messagebox.showinfo("Notification", message)
    root.destroy()

# Load known faces from the database
known_faces = load_patients_from_db()
print("Connected to MongoDB and loaded patient data.")

# Open the webcam
video_capture = cv2.VideoCapture(0)

# Correct alert sound file path
alert_sound_path = r"client\src\Assests\alert_sound.mp3"  # Ensure sound file exists

# Set a lower tolerance for higher precision
TOLERANCE = 0.45

# Set to track identified patients
identified_patients = set()

while True:
    ret, frame = video_capture.read()
    rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    face_locations = face_recognition.face_locations(rgb_frame)

    if face_locations:
        frame_encodings = face_recognition.face_encodings(rgb_frame, face_locations)

        for face_encoding, (top, right, bottom, left) in zip(frame_encodings, face_locations):
            name = "Unknown"
            best_match_name = None
            min_distance = float("inf")

            for person_index, encodings in known_faces.items():
                face_distances = face_recognition.face_distance(encodings, face_encoding)
                best_match_index = np.argmin(face_distances)
                if face_distances[best_match_index] < min_distance:
                    min_distance = face_distances[best_match_index]
                    best_match_name = person_index

            if min_distance < TOLERANCE:
                name = best_match_name
                if name not in identified_patients:
                    # Play alert sound when identified correctly
                    pygame.mixer.music.load(alert_sound_path)
                    pygame.mixer.music.play()
                    
                    # Save found patient details
                    captured_image = cv2.imencode('.jpg', frame)[1].tobytes()  # Capture image as bytes
                    save_found_patient(name, captured_image)
                    
                    # Show popup notification
                    show_popup("Patient found notification was sent")
                    
                    # Mark this patient as identified
                    identified_patients.add(name)

            # Display the name and confidence score
            confidence_text = f"{name} ({round(1 - min_distance, 2) * 100}% confident)" if name != "Unknown" else name
            cv2.putText(frame, confidence_text, (left + 6, bottom - 6), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 1)
            cv2.rectangle(frame, (left, top), (right, bottom), (0, 255, 0), 2)

    cv2.imshow("Video", frame)

    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

video_capture.release()
cv2.destroyAllWindows()
