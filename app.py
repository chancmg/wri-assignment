import sqlite3
from flask import Flask, send_from_directory, request, jsonify
from flask_cors import CORS  # comment this on deployment
from dotenv import load_dotenv
from os import environ
import requests
import json

load_dotenv()


def test_server():
    return {
        'resultStatus': 'SUCCESS',
        'message': "Hello Api Handler"
    }


def connect_to_db():
    conn = sqlite3.connect('database.db')
    return conn


def create_db_table():
    try:
        conn = connect_to_db()
        conn.execute('''DROP TABLE IF EXISTS depotinfo''')
        conn.execute('''
            CREATE TABLE depotinfo (
                depot_id INTEGER PRIMARY KEY NOT NULL,
                name TEXT NOT NULL,
                latitude TEXT NOT NULL,
                longitude TEXT NOT NULL,
                type TEXT NOT NULL
            );
        ''')
        conn.commit()
        print("Depot Details table created successfully")
    except:
        print("Depot Details table creation failed - Maybe table")
    finally:
        conn.close()


def insert_depot(depot):
    inserted_depot = {}
    try:
        conn = connect_to_db()
        cur = conn.cursor()
        cur.execute("INSERT INTO depotinfo (name, latitude, longitude, type) VALUES (?, ?, ?, ?)",
                    (depot['name'], depot['latitude'], depot['longitude'], depot['type']))
        conn.commit()
        inserted_depot = get_depot_by_id(cur.lastrowid)
    except:
        conn().rollback()

    finally:
        conn.close()

    return inserted_depot


def get_depots():
    depots = []
    try:
        conn = connect_to_db()
        conn.row_factory = sqlite3.Row
        cur = conn.cursor()
        cur.execute("SELECT * FROM depotinfo")
        rows = cur.fetchall()

        # convert row objects to dictionary
        for i in rows:
            depot = {}
            depot["depot_id"] = i["depot_id"]
            depot["name"] = i["name"]
            depot["latitude"] = i["latitude"]
            depot["longitude"] = i["longitude"]
            depot["type"] = i["type"]
            depots.append(depot)

    except:
        depots = []

    return depots


def get_depot_by_id(depot_id):
    depot = {}
    try:
        conn = connect_to_db()
        conn.row_factory = sqlite3.Row
        cur = conn.cursor()
        cur.execute("SELECT * FROM depotinfo WHERE depot_id = ?", (depot_id,))
        row = cur.fetchone()

        # convert row object to dictionary
        depot["depot_id"] = row["depot_id"]
        depot["name"] = row["name"]
        depot["latitude"] = row["latitude"]
        depot["longitude"] = row["longitude"]
        depot["type"] = row["type"]
    except:
        depot = {}

    return depot


def update_depot(depot):
    updated_depot = {}
    try:
        conn = connect_to_db()
        cur = conn.cursor()
        cur.execute("UPDATE depotinfo SET name = ?, latitude = ?, longitude = ?, type = ? WHERE depot_id =?",
                    (depot["name"], depot["latitude"], depot["longitude"], depot["type"], depot["depot_id"],))
        conn.commit()
        # return the depot
        updated_depot = get_depot_by_id(depot["depot_id"])

    except:
        conn.rollback()
        updated_depot = {}
    finally:
        conn.close()

    return updated_depot


def delete_depot(depot_id):
    message = {}
    try:
        conn = connect_to_db()
        conn.execute("DELETE from depotinfo WHERE depot_id = ?", (depot_id,))
        conn.commit()
        message["status"] = "depot deleted successfully"
    except:
        conn.rollback()
        message["status"] = "Cannot delete depot"
    finally:
        conn.close()

    return message


def get_distance_matrix():
    origins = []
    destinations = []
    response = {}
    black_list_values = set(("type", "name"))
    try:
        conn = connect_to_db()
        conn.row_factory = sqlite3.Row
        cur = conn.cursor()
        cur.execute("SELECT * FROM depotinfo")
        rows = cur.fetchall()
        if rows:
            # convert row objects to dictionary
            for i in rows:
                depot = {}
                depot["latitude"] = i["latitude"]
                depot["longitude"] = i["longitude"]
                depot["name"] = i["name"]
                depot["type"] = i["type"]
                if i["type"] == "depot":
                    origins.append(depot)
                else:
                    destinations.append(depot)
            payload = {
                "origins": origins,
                "destinations": destinations,
                "travelMode": "driving",
            }
            paramtr = {
                "key": environ.get('BING_KEY')}
            r = requests.post('https://dev.virtualearth.net/REST/v1/Routes/DistanceMatrix',
                              data=json.dumps(payload), params=paramtr)
            response["matrix"] = r.json()
            response["origins"] = origins
            response["destinations"] = destinations
    except:
        response = {}

    return response


create_db_table()
app = Flask(__name__, static_url_path='', static_folder='frontend/dist')
CORS(app)  # comment this on deployment
app.config['CORS_HEADERS'] = 'Content-Type'


@app.route("/", defaults={'path': ''})
def serve(path):
    return send_from_directory(app.static_folder, 'index.html')


@app.route('/api/', methods=['GET'])
def api_get_test():
    return jsonify(test_server())


@app.route('/api/depot', methods=['GET'])
def api_get_depots():
    return jsonify(get_depots())


@app.route('/api/depot/<depot_id>', methods=['GET'])
def api_get_depot(depot_id):
    return jsonify(get_depot_by_id(depot_id))


@app.route('/api/depot/add',  methods=['POST'])
def api_add_depot_bulk():
    depot = request.get_json()
    return jsonify(insert_depot(depot))


@app.route('/api/depot/add/bulk',  methods=['POST'])
def api_add_depot():
    response = []
    depots = request.get_json()
    for i in depots:
        response.append(insert_depot(i))
    return jsonify(response)


@app.route('/api/depot/update',  methods=['PUT'])
def api_update_depot():
    depot = request.get_json()
    return jsonify(update_depot(depot))


@app.route('/api/depot/delete/<depot_id>',  methods=['DELETE'])
def api_delete_depot(depot_id):
    return jsonify(delete_depot(depot_id))


@app.route('/api/depot/distance', methods=['GET'])
def api_get_distance_matrix():
    return jsonify(get_distance_matrix())


if __name__ == "__main__":
    # app.debug = True
    app.run(debug=True)
    # app.run()
