"""
Simple email service for contact notifications.
Uses SMTP settings from environment variables:
SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD,
SMTP_FROM_EMAIL, SMTP_TO_EMAIL
"""

import os
import smtplib
import ssl
from email.mime.text import MIMEText
from email.utils import formataddr
from typing import Dict

from dotenv import load_dotenv

# Ensure .env is loaded when this module is imported
load_dotenv()


def _get_smtp_config():
    host = os.getenv("SMTP_HOST")
    port = int(os.getenv("SMTP_PORT", "587"))
    user = os.getenv("SMTP_USER")
    password = os.getenv("SMTP_PASSWORD")
    from_email = os.getenv("SMTP_FROM_EMAIL") or user
    to_email = os.getenv("SMTP_TO_EMAIL") or from_email

    if not all([host, port, user, password, from_email, to_email]):
        missing = [k for k, v in [
            ("SMTP_HOST", host),
            ("SMTP_PORT", port),
            ("SMTP_USER", user),
            ("SMTP_PASSWORD", password),
            ("SMTP_FROM_EMAIL", from_email),
            ("SMTP_TO_EMAIL", to_email),
        ] if not v]
        raise ValueError(f"Missing SMTP config: {', '.join(missing)}")

    return {
        "host": host,
        "port": port,
        "user": user,
        "password": password,
        "from_email": from_email,
        "to_email": to_email,
    }


def send_contact_email(payload: Dict[str, str]) -> None:
    """
    Send contact form details via email.

    Expected payload keys: name, email, project, message.
    """
    cfg = _get_smtp_config()

    subject = f"New contact from {payload.get('name', 'Unknown')} — {payload.get('project', 'No project')}"
    body = (
        f"New contact submission\n\n"
        f"Name: {payload.get('name')}\n"
        f"Email: {payload.get('email')}\n"
        f"Project: {payload.get('project')}\n\n"
        f"Message:\n{payload.get('message')}\n"
    )

    msg = MIMEText(body, "plain", "utf-8")
    msg["Subject"] = subject
    msg["From"] = formataddr(("Portfolio Contact", cfg["from_email"]))
    msg["To"] = cfg["to_email"]

    context = ssl.create_default_context()
    with smtplib.SMTP(cfg["host"], cfg["port"], timeout=15) as server:
        server.starttls(context=context)
        server.login(cfg["user"], cfg["password"])
        server.sendmail(cfg["from_email"], [cfg["to_email"]], msg.as_string())


