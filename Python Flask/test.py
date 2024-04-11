from flask import Flask, jsonify

app = Flask(__name__)

@app.route("/api/users", methods=["GET"])
def get_users():
    return jsonify({
        "users":[
            "test1",
            "test2"
        ]
    }
    )
if __name__ == "__main__":
    app.run(debug=True)