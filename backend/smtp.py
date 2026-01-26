import requests


url = "http://127.0.0.1:5000/mail/send"


data = {
"to": "empfaenger@example.com",
"subject": "Testmail von Flask",
"body": "Hallo, dies ist eine Testmail!"
}


response = requests.post(url, json=data)


print(response.status_code)
print(response.json())