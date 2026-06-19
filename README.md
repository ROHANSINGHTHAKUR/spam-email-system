# Spam Email Detection System

## Project Overview

The Spam Email Detection System is a web-based application that uses Machine Learning to classify emails as **Spam** or **Not Spam**. The system allows users to enter an email subject and content, then predicts whether the email is legitimate or spam.

This project was developed as an internship project to demonstrate the integration of Machine Learning, FastAPI, React, and MySQL in a real-world application.

---

## Objective

The main objectives of this project are:

* Detect spam emails automatically.
* Reduce unwanted email communication.
* Demonstrate Machine Learning model deployment.
* Integrate frontend, backend, and database technologies into a complete application.

---

## Technologies Used

### Frontend

* React.js
* HTML5
* CSS3
* JavaScript

### Backend

* FastAPI
* Python

### Machine Learning

* Scikit-learn
* Pandas
* NumPy

### Database

* MySQL (XAMPP)

### Version Control

* Git
* GitHub

---

## Features
* Spam Email Detection
* Confidence Score Prediction
* Email History Storage
* FastAPI REST API
* Responsive User Interface
* Database Integration

---

## Project Structure

```text
spam-email-system/
│
├── backend/
│   ├── app/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   └── venv/
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── database/
│
├── README.md
└── .gitignore
```

---

## Installation and Setup

### Clone Repository

```bash
git clone https://github.com/ROHANSINGHTHAKUR/spam-email-system.git

cd spam-email-system
```

---

## Backend Setup

```bash
cd backend

python -m venv venv

venv\Scripts\activate

pip install -r requirements.txt

uvicorn app.main:app --reload
```

Backend URL:

```text
http://127.0.0.1:8000
```

API Documentation:

```text
http://127.0.0.1:8000/docs
```

---

## Frontend Setup

```bash
cd frontend

npm install

npm start
```

Frontend URL:

```text
http://localhost:3000
```

---

## Database Setup

1. Start XAMPP.
2. Open phpMyAdmin.
3. Create a new database.
4. Import the SQL file from the database folder.
5. Update database credentials in the backend configuration file.

---

## Working Process

1. User enters email subject and email content.
2. Frontend sends the data to the FastAPI backend.
3. Backend processes the text.
4. Machine Learning model predicts whether the email is Spam or Not Spam.
5. Prediction result and confidence score are returned to the frontend.
6. Results can be stored in the database for future reference.

---

## Sample Output

### Input

Subject:

```text
Congratulations! You have won a free prize.
```

Message:

```text
Click the link below to claim your reward.
```

### Output

```text
Prediction: Spam

Confidence: 98%
```

---

## Future Enhancements

* Real Email Service Integration
* Advanced NLP Models
* Dashboard Analytics
* Email Attachment Scanning
* Cloud Deployment
* Admin Panel

---

## Screenshots

### Dashboard
<img width="928" height="404" alt="image" src="https://github.com/user-attachments/assets/b198ea18-05d6-49e0-ab1a-7428c0b75403" />



### Spam Detection Page

<img width="920" height="165" alt="image" src="https://github.com/user-attachments/assets/abd8267e-923d-48f6-a63f-a9bfc6eaa33e" />


### Prediction Result

<img width="909" height="320" alt="image" src="https://github.com/user-attachments/assets/1b2b8ab9-1f4a-4e5e-b365-3efa92cbb7b9" />


### Database Tables

<img width="170" height="302" alt="image" src="https://github.com/user-attachments/assets/9fabceaf-0683-4b60-8c32-1da5875ef2e3" />


---

## GitHub Repository

Repository Link:

https://github.com/ROHANSINGHTHAKUR/spam-email-system

---

## Author

**Rohan Singh**

Spam Email Detection System

Internship Project – 2026
