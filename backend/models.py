from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import DateTime
from config import db

class ReplayOrm(db.Model):
        __tablename__ = "replay_metadata"

        p1 = db.Column(db.String(255))
        p1_toon = db.Column(db.Integer)
        p2 = db.Column(db.String(255))
        p2_toon = db.Column(db.Integer)
        recorder = db.Column(db.String(255))
        winner = db.Column(db.Integer)
        filename = db.Column(db.String(255), primary_key=True)
        datetime_ = db.Column(DateTime)
        upload_datetime_ = db.Column(DateTime)
        p1_steamid64 = db.Column(db.Integer)
        p2_steamid64 = db.Column(db.Integer)
        recorder_steamid64 = db.Column(db.Integer)

        def to_json(self):
                return{
                        "p1": self.p1,
                        "p1Toon": self.p1_toon,
                        "p2": self.p2,
                        "p2Toon": self.p2_toon,
                        "recorder": self.recorder,
                        "winner": self.winner,
                        "filename": self.filename,
                        "datetime": self.datetime_,
                        "uploadDateTime": self.upload_datetime_,
                        "p1Steamid64": self.p1_steamid64,
                        "p2Steamid64": self.p2_steamid64,
                        "recorderSteamid64": self.recorder_steamid64,
                }
        
