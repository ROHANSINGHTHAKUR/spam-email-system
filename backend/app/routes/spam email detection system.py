from fastapi import APIRouter
from app.ml_model import predict_email, save_prediction

router = APIRouter(prefix="/emails", tags=["Emails"])

history_db = []

@router.post("/predict")
def predict(data: dict):

    subject = data.get("subject", "")
    body = data.get("body", "")

    text = subject + " " + body

    prediction, confidence = predict_email(text)

    # ✅ DEBUG LINE (ADD THIS)
    print("DB SAVE CALLED:", subject, prediction, confidence)

    save_prediction(subject, body, prediction, confidence)

    return {
        "email_subject": subject,
        "prediction": prediction,
        "confidence": confidence
    }

    # 🔥 SAVE TO MYSQL (THIS WAS MISSING)
    save_prediction(subject, body, prediction, confidence)

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