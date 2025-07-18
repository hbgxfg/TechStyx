from flask import Blueprint, request, jsonify
from app.extensions import mongo
from flask_jwt_extended import jwt_required, get_jwt_identity
from datetime import datetime

report_bp = Blueprint('reports', __name__)

# ---------------------------
# Submit Report (Anonymous or Logged-In)
# ---------------------------
@report_bp.route('/api/reports', methods=['POST'])
@jwt_required(optional=True)  # optional so anonymous users can still post
def submit_report():
    data = request.get_json()
    required_fields = ['issueType', 'location', 'priority']

    for field in required_fields:
        if not data.get(field):
            return jsonify({"message": f"{field} is required"}), 400

    identity = get_jwt_identity()
    email = identity.get('email') if identity else "anonymous"

    report = {
        "issueType": data['issueType'],
        "location": data['location'],
        "priority": data['priority'],
        "details": data.get('details', ''),
        "timestamp": datetime.utcnow(),
        "userEmail": email
    }

    mongo.db.reports.insert_one(report)
    return jsonify({"message": "Report submitted successfully!"}), 201

# ---------------------------
# Get All Reports (Public)
# ---------------------------
@report_bp.route('/api/reports', methods=['GET'])
def get_all_reports():
    reports = list(mongo.db.reports.find().sort("timestamp", -1))
    for report in reports:
        report['_id'] = str(report['_id'])  # Convert ObjectId to string
    return jsonify(reports), 200

# ---------------------------
# Get My Reports (JWT Required)
# ---------------------------
@report_bp.route('/api/my-reports', methods=['GET'])
@jwt_required()
def get_my_reports():
    identity = get_jwt_identity()
    email = identity.get("email")
    reports = list(mongo.db.reports.find({"userEmail": email}).sort("timestamp", -1))
    for report in reports:
        report['_id'] = str(report['_id'])  # Convert ObjectId to string
    return jsonify(reports), 200
