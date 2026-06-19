from app.database import get_connection

# ---------------------------
# PREDICTION FUNCTION
# ---------------------------
def predict_email(text):
    text = text.lower()

    spam_words = [
        "win",
        "winner",
        "prize",
        "free",
        "offer",
        "click",
        "money",
        "congratulations"
    ]

    for word in spam_words:
        if word in text:
            return "spam", 0.95   # ✅ FIXED FORMAT

    return "safe", 0.85        # ✅ FIXED FORMAT (better than 0.95 fake confidence)


# ---------------------------
# SAVE TO DATABASE
# ---------------------------
def save_prediction(subject, body, prediction, confidence):
    conn = get_connection()
    cursor = conn.cursor()

    query = """
    INSERT INTO email_predictions 
    (email_subject, email_body, prediction, confidence)
    VALUES (%s, %s, %s, %s)
    """

    values = (subject, body, prediction, confidence)

    cursor.execute(query, values)
    conn.commit()

    cursor.close()
    conn.close()