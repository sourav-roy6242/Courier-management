from flask import Flask, request, jsonify, make_response
from werkzeug.security import generate_password_hash, check_password_hash
from flask_restful import Api, Resource
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import re

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

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)  
    user_id_number = db.Column(db.String(20), unique=True, nullable=False)  
    full_name = db.Column(db.String(80), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)


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

# signup endpoints

@app.route('/api/signup', methods=['POST'])
def signup():
    data = request.get_json()

    full_name = data.get('full_name', '').strip()
    email = data.get('email', '').strip()
    password = data.get('password', '')
    confirm_password = data.get('confirm_password', '')

    if not full_name or not email or not password or not confirm_password:
        return make_response(jsonify({'error': 'All fields are required'}), 400)

    if not re.match(r"[^@]+@[^@]+\.[^@]+", email):
        return make_response(jsonify({'error': 'Invalid email format'}), 400)

    if password != confirm_password:
        return make_response(jsonify({'error': 'Passwords do not match'}), 400)

    if User.query.filter_by(email=email).first():
        return make_response(jsonify({'error': 'Email already registered'}), 400)

    # Generate user ID like USR1001
    last_user = User.query.order_by(User.id.desc()).first()
    next_id = 1001 if not last_user else 1001 + last_user.id
    user_id_number = f"USR{next_id}"

    new_user = User(
        user_id_number=user_id_number,
        full_name=full_name,
        email=email
    )
    new_user.set_password(password)

    db.session.add(new_user)
    db.session.commit()

    return make_response(jsonify({'message': 'User registered successfully', 'user_id_number': user_id_number}), 201)


# login endpoints

@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()

    email = data.get('email', '').strip()
    password = data.get('password', '')

    if not email or not password:
        return make_response(jsonify({'error': 'Email and password are required'}), 400)

    user = User.query.filter_by(email=email).first()

    if user and user.check_password(password):
        return make_response(jsonify({'message': 'Login successful', 'user_id_number': user.user_id_number}), 200)
    else:
        return make_response(jsonify({'error': 'Invalid email or password'}), 401)
    

@app.route('/api/login', methods=['OPTIONS'])
def login_options():
    response = make_response()
    response.headers.add('Access-Control-Allow-Origin', 'http://localhost:4200')
    response.headers.add('Access-Control-Allow-Methods', 'POST, OPTIONS')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
    return response

    # Get user by ID number endpoint

@app.route('/api/user/<user_id_number>', methods=['GET'])
def get_user_by_id(user_id_number):
    user = User.query.filter_by(user_id_number=user_id_number).first()

    if not user:
        return make_response(jsonify({'error': 'User not found'}), 404)

    return jsonify({
        'user_id_number': user.user_id_number,
        'full_name': user.full_name,
        'email': user.email
    })

@app.route('/api/users', methods=['GET'])
def get_all_users():
    users = User.query.all()
    user_list = []
    for user in users:
        user_list.append({
            'user_id_number': user.user_id_number,
            'full_name': user.full_name,
            'email': user.email
        })
    return jsonify(user_list)



@app.route('/api/signup', methods=['OPTIONS'])
def signup_options():
    response = make_response()
    response.headers.add('Access-Control-Allow-Origin', 'http://localhost:4200')
    response.headers.add('Access-Control-Allow-Methods', 'POST, OPTIONS')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
    return response


with app.app_context():
    db.create_all()

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
