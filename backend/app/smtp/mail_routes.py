from flask import Blueprint, request, jsonify
from flask_mail import Message
from app.extensions import mail
import os;
from dotenv import load_dotenv;

load_dotenv()

mail_bp = Blueprint('mail', __name__)

@mail_bp.route('/send', methods=['POST'])
def send_mail():
    data = request.get_json(force=True)
    recipient = data.get('to')
    subject = data.get('subject')
    body = data.get('body')
    
    print("REQUEST JSON:", data)

    if not all([recipient, subject, body]):
        return jsonify({"error": "Missing fields"}), 400

    msg = Message(
        subject=subject,
        recipients=[recipient],
        body=body,
        sender=os.getenv('MAIL_USERNAME')
    )
    
    try:
        mail.send(msg)
        return jsonify({"message": "Email sent successfully"}), 200
    except Exception as e:
        print("MAIL ERROR:", e)
        return jsonify({"error": str(e)}), 500