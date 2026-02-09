from flask import Blueprint, request, jsonify
from flask_mail import Message
from app.extensions import mail
import os
from flask_cors import CORS
from flask import current_app, render_template

mail_bp = Blueprint('mail', __name__, url_prefix="/api/smtp")

CORS(
    mail_bp,
    resources={r"/*": {"origins": "http://localhost:5173"}},
    supports_credentials=True
)

def send_template_mail(to: str, subject: str, template: str, context: dict):
    """
    Sendet eine HTML-Mail basierend auf einem Jinja-Template.
 
    Args:
        to (str): Empfänger-E-Mail-Adresse
        subject (str): Betreff der E-Mail
        template (str): Name des HTML-Templates (z.B. 'registration_received.html')
        context (dict): Kontext-Daten für das Template
    """
 
    if not to:
        raise ValueError("No recipient email provided")
 
    # 🔹 HTML aus Template rendern
    html_body = render_template(
        f"smtp/{template}",
        **context,
        subject=subject
    )
 
    # 🔹 Plain-Text Fallback (wichtig für Mail-Clients)
    text_body = render_template(
        f"smtp/{template}",
        **context,
        subject=subject
    )
 
    msg = Message(
        subject=subject,
        recipients=[to],
        sender=current_app.config.get(
            "MAIL_DEFAULT_SENDER",
            os.getenv("MAIL_DEFAULT_SENDER")
        ),
        html=html_body,
        body=text_body
    )
 
    try:
        mail.send(msg)
        current_app.logger.info(
            f"Mail sent to {to} using template {template}"
        )
    except Exception as e:
        current_app.logger.error(
            f"Mail sending failed to {to}: {str(e)}"
        )
        raise

# @mail_bp.route('/send', methods=['POST'])
# def send_raw_mail():
#     data = request.get_json(force=True)
#     recipient = data.get('to')
#     subject = data.get('subject')
#     body = data.get('body')

#     if not all([recipient, subject, body]):
#         return jsonify({"error": "Missing fields"}), 400

#     msg = Message(
#         subject=subject,
#         recipients=[recipient],
#         body=body,
#         sender=os.getenv('MAIL_DEFAULT_SENDER')
#     )

#     try:
#         mail.send(msg)
#         return jsonify({"message": "Email sent successfully"}), 200
#     except Exception as e:
#         print("MAIL ERROR:", e)
#         return jsonify({"error": str(e)}), 500
    
    
@mail_bp.route('/registration/received', methods=['POST'])
def send_registration_received():
    data = request.json

    send_template_mail(
        to=data['email'],
        subject='Registrierung eingegangen',
        template='registration_received.html',
        context=data
    )

    return jsonify({'message': 'Mail sent'}), 200 

@mail_bp.route('/registration/status', methods=['POST']) 
def send_registration_status():
    data = request.json

    send_template_mail(
        to=data['email'],
        subject='Status Ihrer Registrierung',
        template='registration_status_changed.html',
        context=data
    )

    return jsonify({'message': 'Mail sent'}), 200 

@mail_bp.route('/lecture/status', methods=['POST'])
def send_lecture_status():
    data = request.json
 
    send_template_mail(
        to=data['email'],
        subject='Status Ihres Vortrags',
        template='lecture_status_changed.html',
        context=data
    )
 
    return jsonify({'message': 'Lecture status mail sent'}), 200