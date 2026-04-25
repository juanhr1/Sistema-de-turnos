from flask import Flask, request, jsonify
import requests

app = Flask(__name__)

# Usuarios

@app.route("/usuarios", methods=["GET"])
def get_usuarios():
    for i in range(3):
        try:
            print("[GATEWAY] Consultando usuarios...", flush=True)
            response = requests.get("http://users-service:5000/users", timeout=2)
            data = response.json()
            if not data:
                return jsonify({"error": "No hay usuarios para mostrar"}), 404
            if response.status_code != 200:
                return jsonify({"error": "Error en users-service"}), response.status_code
            print("[GATEWAY] Usuarios obtenidos correctamente", flush=True)
            return jsonify(data)
        except requests.exceptions.ConnectionError:
            print("[GATEWAY] users-service caído", flush=True)
            return jsonify({"error": "Servicio de usuarios no disponible"}), 503
        except requests.exceptions.Timeout:
            print(f"[GATEWAY] Timeout intento {i+1} - usuarios", flush=True)
    return jsonify({"error": "Tiempo de espera agotado - usuarios"}), 504


@app.route("/usuarios", methods=["POST"])
def create_usuario():
    for i in range(3):
        try:
            print("[GATEWAY] Creando usuario...", flush=True)
            response = requests.post(
                "http://users-service:5000/users",
                json=request.json,
                timeout=2
            )
            if response.status_code != 200:
                return jsonify({"error": "Error al crear usuario"}), response.status_code
            print("[GATEWAY] Usuario creado correctamente", flush=True)
            return jsonify(response.json())
        except requests.exceptions.ConnectionError:
            print("[GATEWAY] users-service caído", flush=True)
            return jsonify({"error": "Servicio de usuarios no disponible"}), 503
        except requests.exceptions.Timeout:
            print(f"[GATEWAY] Timeout intento {i+1} - crear usuario", flush=True)
    return jsonify({"error": "Tiempo de espera agotado - crear usuario"}), 504


# Turnos

@app.route("/turnos", methods=["GET"])
def get_turnos():
    for i in range(3):
        try:
            print("[GATEWAY] Consultando turnos...", flush=True)
            response = requests.get("http://turns-service:5000/turns", timeout=2)
            data = response.json()
            if not data:
                return jsonify({"error": "No hay turnos para mostrar"}), 404
            if response.status_code != 200:
                return jsonify({"error": "Error en turns-service"}), response.status_code
            print("[GATEWAY] Turnos obtenidos correctamente", flush=True)
            return jsonify(data)
        except requests.exceptions.ConnectionError:
            print("[GATEWAY] turns-service caído", flush=True)
            return jsonify({"error": "Servicio de turnos no disponible"}), 503
        except requests.exceptions.Timeout:
            print(f"[GATEWAY] Timeout intento {i+1} - turnos", flush=True)
    return jsonify({"error": "Tiempo de espera agotado - turnos"}), 504


@app.route("/turnos", methods=["POST"])
def create_turno():
    for i in range(3):
        try:
            print("[GATEWAY] Creando turno...", flush=True)
            response = requests.post(
                "http://turns-service:5000/turn",
                json=request.json,
                timeout=2
            )
            if response.status_code != 200:
                return jsonify({"error": "Error al crear turno"}), response.status_code
            print("[GATEWAY] Turno creado correctamente", flush=True)
            return jsonify(response.json())
        except requests.exceptions.ConnectionError:
            print("[GATEWAY] turns-service caído", flush=True)
            return jsonify({"error": "Servicio de turnos no disponible"}), 503
        except requests.exceptions.Timeout:
            print(f"[GATEWAY] Timeout intento {i+1} - crear turno", flush=True)
    return jsonify({"error": "Tiempo de espera agotado - crear turno"}), 504


# Notificaciones

@app.route("/notificaciones", methods=["GET"])
def get_notificaciones():
    for i in range(3):
        try:
            print("[GATEWAY] Consultando notificaciones...", flush=True)
            response = requests.get("http://notifications-service:5000/notifications", timeout=2)
            if response.status_code != 200:
                return jsonify({"error": "Error en notifications-service"}), response.status_code
            print("[GATEWAY] Notificaciones obtenidas correctamente", flush=True)
            return jsonify(response.json())
        except requests.exceptions.ConnectionError:
            print("[GATEWAY] notifications-service caído", flush=True)
            return jsonify({"error": "Servicio de notificaciones no disponible"}), 503
        except requests.exceptions.Timeout:
            print(f"[GATEWAY] Timeout intento {i+1} - notificaciones", flush=True)
    return jsonify({"error": "Tiempo de espera agotado - notificaciones"}), 504


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)