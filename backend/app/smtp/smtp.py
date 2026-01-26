import smtplib, ssl, os
from dotenv import load_dotenv


load_dotenv()


context = ssl.create_default_context()


with smtplib.SMTP("smtp.office365.com", 587) as server:
    server.ehlo()
    server.starttls(context=context)
    server.ehlo()
    server.login(os.getenv("MAIL_USERNAME"), os.getenv("MAIL_PASSWORD"))
    server.sendmail(
    os.getenv("MAIL_USERNAME"),
    os.getenv("MAIL_USERNAME"),
    "Subject: SMTP Test\n\nHallo Test"
    )


print("SMTP OK")