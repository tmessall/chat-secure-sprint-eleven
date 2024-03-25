from flask import Flask, Response, request
import cv2
import numpy as np
from naoqi import ALProxy
import vision_definitions
import sys

app = Flask(__name__)

# NAO robot IP and Port
NAO_IP = ""  # Replace 'your_nao_ip' with your NAO robot's actual IP address
NAO_PORT = 9559  # Default port

#head angle
head_yaw_angle = 0.0

# Create a proxy to ALVideoDevice on the robot
try:
    video_service = ALProxy("ALVideoDevice", NAO_IP, NAO_PORT)
except Exception as e:
    print("Could not create proxy to ALVideoDevice: {}".format(e))
    exit(1)

# Subscribe to the camera feed
resolution = vision_definitions.kVGA  # 640x480
colorSpace = vision_definitions.kRGBColorSpace
fps = 20

camera_index = 0  # 0 for the top camera, 1 for the bottom camera

try:
    video_client = video_service.subscribeCamera(
        "python_client", camera_index, resolution, colorSpace, fps)
except Exception as e:
    print("Could not subscribe to camera: {}".format(e))
    exit(1)

def gen_frames():
    while True:
        # Obtain an image from the robot's camera
        nao_image = video_service.getImageRemote(video_client)

        if nao_image is None:
            continue

        # Get the image size and pixel array.
        image_width = nao_image[0]
        image_height = nao_image[1]
        array = nao_image[6]
        image_string = bytes(bytearray(array))

        # Convert the string to an image
        img = np.frombuffer(image_string, dtype=np.uint8)
        img = img.reshape((image_height, image_width, 3))

        # Encode the frame in JPEG format
        (flag, encodedImage) = cv2.imencode(".jpg", img)
        if not flag:
            continue

        # Yield the encoded image in byte format
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + 
               encodedImage.tobytes() + b'\r\n')

def speak(data):
    try:
        tts = ALProxy("ALTextToSpeech", NAO_IP, NAO_PORT)
    except Exception as e:
        print ("Could not create proxy to ALTextToSpeech: {}".format(e))
        exit(1)
    
    #Says a test std::string
    tts.say(data)


def right_head_turn():
    try:
        # Create proxies for necessary modules
        motion_proxy = ALProxy("ALMotion", NAO_IP, NAO_PORT)
    except Exception as e:
        print("Could not create a proxy to ALMotionDevice: {}".format(e)) 
        exit(1)

    # Set stiffness for head motors
    motion_proxy.setStiffnesses("Head", 1.0)

    # Define the desired angles for head movement (in radians)
    # The head joints are HeadYaw and HeadPitch
    # HeadYaw controls left-right movement and HeadPitch controls up-down movement
    # Make sure the values are within the range supported by the robot
    head_yaw_angle = head_yaw_angle - .1  # Example angle for left-right movement
    head_pitch_angle = 0.0  # Example angle for up-down movement

    # Set the angles for head movement
    motion_proxy.setAngles(["HeadYaw", "HeadPitch"], [head_yaw_angle, head_pitch_angle], 0.5)

    # Wait for the movement to complete (you can adjust this time according to your needs)
    motion_proxy.waitUntilMoveIsFinished()

def left_head_turn():
    try:
        # Create proxies for necessary modules
        motion_proxy = ALProxy("ALMotion", NAO_IP, NAO_PORT)
    except Exception as e:
        print("Could not create a proxy to ALMotionDevice: {}".format(e)) 
        exit(1)

    # Set stiffness for head motors
    motion_proxy.setStiffnesses("Head", 1.0)

    # Define the desired angles for head movement (in radians)
    # The head joints are HeadYaw and HeadPitch
    # HeadYaw controls left-right movement and HeadPitch controls up-down movement
    # Make sure the values are within the range supported by the robot
    head_yaw_angle = head_yaw_angle + .1  # Example angle for left-right movement
    head_pitch_angle = 0.0  # Example angle for up-down movement

    # Set the angles for head movement
    motion_proxy.setAngles(["HeadYaw", "HeadPitch"], [head_yaw_angle, head_pitch_angle], 0.5)

    # Wait for the movement to complete (you can adjust this time according to your needs)
    motion_proxy.waitUntilMoveIsFinished()


    




@app.route('/video_feed')
def video_feed():
    # Return the response generated along with the specific media
    # type (mime type).
    return Response(gen_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')

@app.route('/speak_function', methods=['POST'])
def speak_function():
    data = request.form['text']
    speak(data)
    return 'Function called successfully'

@app.route('/turn_left', methods=['POST'])
def turn_head_left():
    return left_head_turn()

@app.route('/turn_right', methods=['POST'])
def turn_head_right():
    return right_head_turn()



if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)