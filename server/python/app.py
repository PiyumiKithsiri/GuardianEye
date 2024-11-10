from flask import Flask, jsonify
from flask_cors import CORS
import subprocess
import os

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/run-recognition', methods=['POST'])
def run_recognition():
    try:
        script_path = os.path.join(os.path.dirname(__file__), 'recognition.py')
        if not os.path.isfile(script_path):
            return jsonify({'message': 'Facial recognition script not found.', 'path': script_path}), 404
        
        result = subprocess.run(['python', script_path], capture_output=True, text=True)
        if result.returncode == 0:
            return jsonify({'message': 'Facial recognition started successfully!', 'output': result.stdout}), 200
        else:
            return jsonify({'message': 'Error in facial recognition script.', 'error': result.stderr}), 500
    except Exception as e:
        return jsonify({'message': 'Failed to run the recognition script.', 'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
