#capture.py
import cv2
import time
import os
from tkinter import Tk
from tkinter import filedialog

def capture_faces(num_photos=10, interval=1):
    # Use Tkinter to open a file dialog to select the output folder
    root = Tk()
    root.withdraw()  # Hide the root window
    output_dir = filedialog.askdirectory(title="Select Directory to Save Photos")
    
    # If no folder is selected, return
    if not output_dir:
        print("No folder selected.")
        return

    # Load the pre-trained face and eye detectors
    face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')
    eye_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_eye.xml')

    # Open a connection to the camera
    cap = cv2.VideoCapture(0)
    
    # Check if the camera is opened successfully
    if not cap.isOpened():
        print("Error: Could not open video capture.")
        return

    photo_count = 0

    while photo_count < num_photos:
        # Read a frame from the camera
        ret, frame = cap.read()
        if not ret:
            print("Error: Could not read frame.")
            break

        # Convert the frame to grayscale for face detection
        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

        # Detect faces in the frame
        faces = face_cascade.detectMultiScale(gray, scaleFactor=1.1, minNeighbors=5, minSize=(100, 100))  # Larger minimum size

        # Show the frame in a window
        cv2.imshow('Capturing Photos - Press "q" to Quit', frame)

        # Loop through detected faces
        for (x, y, w, h) in faces:
            # Extract the region of interest (ROI) containing the face
            face_roi = gray[y:y+h, x:x+w]

            # Detect eyes in the face ROI to ensure face is clear (not covered)
            eyes = eye_cascade.detectMultiScale(face_roi, scaleFactor=1.1, minNeighbors=5, minSize=(30, 30))

            # If two eyes are detected, the face is considered clear
            if len(eyes) >= 2:
                # Save the frame as an image file in the selected folder
                filename = os.path.join(output_dir, f"photo_{photo_count + 1}.jpg")
                cv2.imwrite(filename, frame)
                print(f"Saved: {filename}")
                photo_count += 1
                time.sleep(interval)  # Wait before capturing the next photo
                break  # Move to the next frame after capturing a photo

        # Press 'q' to exit early if needed
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

    # Release the camera and close any open windows
    cap.release()
    cv2.destroyAllWindows()

# Example usage
capture_faces(num_photos=10, interval=1)
