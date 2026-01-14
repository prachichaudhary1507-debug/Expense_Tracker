# Expense Tracker Application

## Objective
This project is a simple Expense Tracker application built to manage daily expenses.
Users can add, view, update, and delete expenses.

## Tech Stack
### Backend
- Python
- FastAPI
- SQLite

### Frontend
- React
- Basic CSS

---

## Features
- Add new expense
- View all expenses
- Update expense
- Delete expense
- Amount validation (must be positive)

---

## Backend Setup Steps

1. Go to backend folder:
   ```bash
   cd Backend_Work
2. Install required packages:
   pip install fastapi uvicorn


3. Run the backend server:

   uvicorn app:app --reload


4. Open Swagger API docs:

   http://127.0.0.1:8000/docs

## Frontend Setup Steps

1. Go to frontend folder:

   cd frontend_work


2. Install dependencies:

   npm install


3. Start React app:

   npm start


4. Open browser:

   http://localhost:3000

## API Endpoints

      | Method | Endpoint       | Description      |
   | ------ | -------------- | ---------------- |
   | POST   | /expenses      | Add new expense  |
   | GET    | /expenses      | Get all expenses |
   | PUT    | /expenses/{id} | Update expense   |
   | DELETE | /expenses/{id} | Delete expense   |

#  Validation

   Amount must be greater than zero.

## Screenshots

1. Home Page
   ![Home Page](screenshots/home.png)

2.  Add Expense
   ![Add Expense](screenshots/add_expense.png)

3. View Expenses
   ![View Expenses](screenshots/view_expenses.png)

