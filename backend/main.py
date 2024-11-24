from flask import request, jsonify
from config import app, db
from sqlalchemy import or_, desc
from models import ReplayOrm
from flask_cors import CORS

CORS(app)

@app.route("/allreplays", methods=['GET'])
def get_replays():
        page_num = request.args.get('page_num', default=1, type=int)
        page_max = request.args.get('page_max', default=10, type=int)
        p1_char = request.args.get('p1_char', default=None, type=int)
        p2_char = request.args.get('p2_char', default=None, type=int)
        p1_name = request.args.get('p1_name', default=None, type=str)
        p2_name = request.args.get('p2_name', default=None, type=str)
        date_before = request.args.get('date_before', default=None, type=str)
        date_after = request.args.get('date_after', default=None, type=str)

        replays = ReplayOrm.query

         # Helper function to apply filters
        def apply_filters(character, name, is_player_one):
                conditions = []
                
                if character is not None:
                        if is_player_one:
                                conditions.append((ReplayOrm.p1_toon == character) | (ReplayOrm.p2_toon == character))
                        else:
                                conditions.append((ReplayOrm.p2_toon == character) | (ReplayOrm.p1_toon == character))

                if name is not None:
                        if is_player_one:
                                conditions.append((ReplayOrm.p1 == name) | (ReplayOrm.p2 == name))
                        else:
                                conditions.append((ReplayOrm.p2 == name) | (ReplayOrm.p1 == name))

                if conditions:
                        return replays.filter(or_(*conditions))
                return replays
    
        # Apply filters for Player 1
        if p1_char is not None or p1_name is not None:
                replays = apply_filters(p1_char, p1_name, True)

        # Apply filters for Player 2
        if p2_char is not None or p2_name is not None:
                replays = apply_filters(p2_char, p2_name, False)


        json_replays = list(map(lambda x: x.to_json(), replays.order_by(desc(ReplayOrm.datetime_)).paginate(per_page=page_max, page=page_num, error_out=True)))
        return jsonify({"replays":json_replays})

@app.route("/allplayers", methods=['GET'])
def get_players():
        p1_players = ReplayOrm.query.with_entities(ReplayOrm.p1).distinct().all()
        p2_players = ReplayOrm.query.with_entities(ReplayOrm.p2).distinct().all()
        
        players = set(player[0] for player in p1_players + p2_players)
        
        sorted_players = sorted(players)
        
        return jsonify({"players": sorted_players})

if __name__ == "__main__":
    app.run(debug=True,port=8080)


