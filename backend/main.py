from flask import request, jsonify
from config import app, db
from models import ReplayOrm
from flask_cors import CORS

CORS(app)

@app.route("/allreplays", methods=['GET'])
def get_replays():
        page_num = request.args.get('page_num', default=1, type=int)
        replays = ReplayOrm.query.paginate(per_page=10, page=page_num, error_out=True)
        json_replays = list(map(lambda x: x.to_json(), replays))
        return jsonify({"replays":json_replays})

if __name__ == "__main__":
    app.run(debug=True,port=8080)


