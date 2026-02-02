IN .env GMAIL EMAIL und APP-PASSWORT hinterlegen
MAIL_SERVER=smtp.gmail.com
MAIL_PORT=587
MAIL_USE_TLS=true
MAIL_USE_SSL=false
MAIL_USERNAME=
MAIL_PASSWORD=
MAIL_DEFAULT_SENDER=

TEST zum EMAIL versenden in Powershell reinkopieren + EMPFÄNGER eintippen:
$body = @{
    to = "EMPFÄNGER"
    subject = "Gmail Test"
    body = "Hallo, dies ist eine Testmail über Gmail!"
} | ConvertTo-Json

Invoke-RestMethod `
  -Uri "http://127.0.0.1:5000/mail/send" `
  -Method POST `
  -ContentType "application/json; charset=utf-8" `
  -Body ([System.Text.Encoding]::UTF8.GetBytes($body))
