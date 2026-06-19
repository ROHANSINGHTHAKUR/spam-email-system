import pandas as pd
from sklearn.pipeline import Pipeline
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.naive_bayes import MultinomialNB
import joblib

# Load dataset
data = pd.read_csv("spam.csv", encoding="latin-1")

# Keep only required columns
data = data.rename(columns={"v1": "label", "v2": "message"})

# FIX: remove extra columns (VERY IMPORTANT for this dataset)
data = data[["label", "message"]]

X = data["message"]
y = data["label"]

# Model pipeline
model = Pipeline([
    ("tfidf", TfidfVectorizer()),
    ("nb", MultinomialNB())
])

# Train
model.fit(X, y)

# Save model
joblib.dump(model, "spam_model.pkl")

print("✅ Model Saved Successfully")