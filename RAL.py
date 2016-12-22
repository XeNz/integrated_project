#!flask/bin/python
import sys
sys.path.append("/usr/lib/pynaoqi")
from flask import Flask, abort, jsonify, request
import naoqi
import random

from naoqi import ALProxy
#import logger

app = Flask(__name__)

from datetime import timedelta  
from flask import make_response, current_app  
from functools import update_wrapper


def crossdomain(origin=None, methods=None, headers=None, max_age=21600, attach_to_all=True, automatic_options=True):  
    if methods is not None:
        methods = ', '.join(sorted(x.upper() for x in methods))
    if headers is not None and not isinstance(headers, basestring):
        headers = ', '.join(x.upper() for x in headers)
    if not isinstance(origin, basestring):
        origin = ', '.join(origin)
    if isinstance(max_age, timedelta):
        max_age = max_age.total_seconds()

    def get_methods():
        if methods is not None:
            return methods

        options_resp = current_app.make_default_options_response()
        return options_resp.headers['allow']

    def decorator(f):
        def wrapped_function(*args, **kwargs):
            if automatic_options and request.method == 'OPTIONS':
                resp = current_app.make_default_options_response()
            else:
                resp = make_response(f(*args, **kwargs))
            if not attach_to_all and request.method != 'OPTIONS':
                return resp

            h = resp.headers

            h['Access-Control-Allow-Origin'] = origin
            h['Access-Control-Allow-Methods'] = get_methods()
            h['Access-Control-Max-Age'] = str(max_age)
            if headers is not None:
                h['Access-Control-Allow-Headers'] = headers
            return resp

        f.provide_automatic_options = False
        return update_wrapper(wrapped_function, f)
    return decorator


@app.route('/')
@crossdomain(origin='*')
def landing():  
    return jsonify(i_am_a='cross domain resource!')


nao_host = "127.0.0.1"
webserverIp = "0.0.0.0"
nao_port = 9559
#logger = logger.Logger(4) # Initialize logger with level "debug"

#@app.route('/')
#def index():
#    return "Hello Robotic World!"

@app.route('/getTest', methods=['GET'])
@crossdomain(origin='*')
def getTest():
    response = jsonify({'data': "test"}), 200
    return response
	
@app.route('/getType', methods=['GET'])
@crossdomain(origin='*')
def getType():
    rng = random.randint(0, 3)
    if rng == 0:
        return jsonify({'type': "NAO"}), 200
    elif rng == 1:
        return jsonify({'type': "PEPPER"}), 200
    elif rng == 2:
        return jsonify({'type': "JIBO"}), 200
    else:
        return jsonify({'type': "NAO"}), 200
	
@app.route('/getName/<string:robotType>', methods=['GET'])
@crossdomain(origin='*')
def getName(robotType):
    if robotType == "NAO":
        return jsonify({'name': "Mister NAO"}), 200
    elif robotType == "PEPPER":
        return jsonify({'name': "Mister PEPPER"}), 200
    elif robotType == "JIBO":
        return jsonify({'name': "Mister JIBO"}), 200
    else:
        return jsonify({'name': "NOTDEFINED"}), 400
	
@app.route('/getBatteryLevel', methods=['GET'])
@crossdomain(origin='*')
def getBatteryLevel():
    return jsonify({'level': "99"}), 200

@app.route('/getActions/<string:robotType>', methods=['GET'])
@crossdomain(origin='*')
def getActions(robotType):
    defaultActions = ["Talk","Camera"]
    if robotType == "NAO":
        return jsonify({'postureActions': ["StandInit","SitRelax","StandZero","LyingBelly","LyingBack","Stand","Crouch","Sit"],'actions': ["Talk","Camera","Walk"]}), 200
    elif robotType == "PEPPER":
        return jsonify({'postureActions': [],'actions': ["Talk","Camera","Ride","Tablet","GuessAge"]}), 200
    elif robotType == "JIBO":
        return jsonify({'postureActions': [],'actions': ["Talk","Camera","MoveHead","Display"]}), 200
    else:
    	return jsonify({'postureActions': [],'actions': ["error"]}), 400

@app.route('/actions/<string:actionName>', methods=['GET'])
@crossdomain(origin='*')
def doAction(actionName):
    postureProxy = ALProxy("ALRobotPosture", nao_host, nao_port)
    postureProxy.goToPosture(str(actionName), 1.0)
    return jsonify({'posture': postureProxy.getPostureFamily()}), 200

@app.route('/ask/<string:text>', methods=['GET'])
@crossdomain(origin='*')
def ask(text):
    tts = ALProxy("ALTextToSpeech", nao_host, nao_port)
    tts.say(str(text))
    return jsonify({'text': text}), 200

@app.route('/guessAge', methods=['GET'])
@crossdomain(origin='*')
def guessAge():
    age = random.randint(0, 101)
    return jsonify({'age': age}), 200

#http://doc.aldebaran.com/2-1/_downloads/almotion_moveTo1.py
@app.route('/move/<int:x>/<int:y>/<int:d>', methods=['GET'])
@crossdomain(origin='*')
def move(x, y, d):
    motionProxy = ALProxy("ALMotion", nao_host, nao_port)
    motionProxy.wakeUp()
    xCoo = float(x)
    yCoo = float(y)
    theta = float(d)
    motionProxy.moveTo(xCoo, yCoo, theta)
    return jsonify({'coordinates': [x, y, d]}), 200

@app.route('/getVolume', methods=['GET'])
@crossdomain(origin='*')
def getVolume():
    audioProxy = ALProxy("ALAudioPlayer", nao_host, nao_port)
    volume = audioProxy.getVolume()
    return jsonify({'volume': volume}), 200

if __name__ == '__main__':
    app.run(debug=True,host=webserverIp)