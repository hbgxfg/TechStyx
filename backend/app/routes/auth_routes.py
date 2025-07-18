from flask import Blueprint, request, jsonify
from werkzeug.security import check_password_hash
from app.extensions import mongo
from flask_jwt_extended import create_access_token

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    role = data.get('role')  # 'user' or 'admin'

    collection = mongo.db.admins if role == 'admin' else mongo.db.users
    user = collection.find_one({"email": email})

    if user and check_password_hash(user['password'], password):
        access_token = create_access_token(identity={'email': email, 'role': role})
        return jsonify({"access_token": access_token}), 200
    return jsonify({"error": "Invalid credentials"}), 401
