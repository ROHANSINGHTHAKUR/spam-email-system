from fastapi import APIRouter
from app.ml_model import predict_email, save_prediction

router = APIRouter()

# in-memory fallback (optional)
history_db = []

@router.post("/predict")
def predict(data: dict):

    subject = data.get("subject", "")
    body = data.get("body", "")

    text = subject + " " + body

    prediction, confidence = predict_email(text)

    # 🔥 DEBUG
    print("DB SAVE CALLED:", subject, prediction, confidence)

    # ✅ SAVE TO MYSQL
    save_prediction(subject, body, prediction, confidence)

    # store in memory (optional)
    record = {
        "email_subject": subject,
        "prediction": prediction,
        "confidence": confidence
    }

    history_db.append(record)

    return record


@router.get("/history")
def history():
    return history_db