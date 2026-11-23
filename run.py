import os
from dotenv import load_dotenv
load_dotenv()

from application import create_app, socketio

# debug exposes the Werkzeug console (remote code execution) — only on when .env says so
debug = os.environ.get('FLASK_DEBUG', '').lower() in ('1', 'true')
app = create_app(debug=debug)

if __name__ == "__main__":
    socketio.run(app, host="0.0.0.0", port=8080, debug=debug)
