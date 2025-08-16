from flask import Flask, request, jsonify, make_response
from flask_restful import Api, Resource
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)

CORS(app, resources={
    r"/api/*": {
        "origins": ["http://localhost:4200"],
        "methods": ["GET", "POST", "DELETE", "OPTIONS"],
        "allow_headers": ["Content-Type"],
        "supports_credentials": True
    }
})

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///courier.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
api = Api(app)

class Courier(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    sender = db.Column(db.String(100), nullable=False)
    recipient = db.Column(db.String(100), nullable=False)
    address = db.Column(db.String(200), nullable=False)
    weight = db.Column(db.Float, nullable=False)
    charges = db.Column(db.Float, nullable=False)

    def serialize(self):
        return {
            'id': self.id,
            'sender': self.sender,
            'recipient': self.recipient,
            'address': self.address,
            'weight': self.weight,
            'charges': self.charges
        }


def calculate_charges(weight):
   
    if weight > 10:
        raise ValueError("Maximum weight limit is 10kg")
    
    if weight <= 1:
        return 200     
    elif weight <= 2:
        return 300     
    elif weight <= 5:
        return 400     
    else:
        return 500     

@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', 'http://localhost:4200')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
    response.headers.add('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS')
    return response

class CourierResource(Resource):
    def get(self):
        couriers = Courier.query.all()
        return make_response(jsonify([courier.serialize() for courier in couriers]), 200)

    def post(self):
        data = request.get_json()
        
        try:
            weight = float(data['weight'])
            new_courier = Courier(
                sender=data['sender'],
                recipient=data['recipient'],
                address=data['address'],
                weight=weight,
                charges=calculate_charges(weight)
            )
            db.session.add(new_courier)
            db.session.commit()
            return make_response(jsonify(new_courier.serialize()), 201)
        except Exception as e:
            return make_response(jsonify({'error': str(e)}), 400)

class CourierDeleteResource(Resource):
    def delete(self, courier_id):
        courier = Courier.query.get(courier_id)
        if not courier:
            return make_response(jsonify({'error': 'Courier not found'}), 404)
            
        db.session.delete(courier)
        db.session.commit()
        return make_response(jsonify({'message': 'Courier deleted successfully'}), 200)

api.add_resource(CourierResource, '/api/couriers')
api.add_resource(CourierDeleteResource, '/api/couriers/<int:courier_id>')

with app.app_context():
    db.create_all()

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
