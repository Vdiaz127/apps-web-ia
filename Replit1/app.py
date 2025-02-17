from flask import Flask, render_template, send_from_directory
import os

app = Flask(__name__, 
            static_folder='static',
            template_folder='templates')
app.secret_key = os.environ.get("SESSION_SECRET")

@app.route('/')
def index():
    return render_template('index.html')

# Rutas para servir archivos estáticos
@app.route('/js/<path:path>')
def send_js(path):
    return send_from_directory('static/js', path)

@app.route('/css/<path:path>')
def send_css(path):
    return send_from_directory('static/css', path)
