from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from datetime import datetime
import sqlite3

app = FastAPI()

# ---------- CORS ----------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------- DATABASE ----------
conn = sqlite3.connect("expenses.db", check_same_thread=False)
cursor = conn.cursor()

cursor.execute("""
CREATE TABLE IF NOT EXISTS expenses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    category TEXT,
    payment_mode TEXT,
    amount REAL,
    date TEXT
)
""")
conn.commit()

# ---------- SCHEMA ----------
class Expense(BaseModel):
    title: str
    category: str
    payment_mode: str
    amount: float

# ---------- ROUTES ----------
@app.get("/")
def home():
    return {"message": "Expense Tracker API is running"}

@app.post("/expenses")
def add_expense(expense: Expense):
    if expense.amount <= 0:
        raise HTTPException(status_code=400, detail="Amount must be positive")

    cursor.execute(
        """
        INSERT INTO expenses (title, category, payment_mode, amount, date)
        VALUES (?, ?, ?, ?, ?)
        """,
        (
            expense.title,
            expense.category,
            expense.payment_mode,
            expense.amount,
            datetime.now().strftime("%d-%m-%Y")
        )
    )
    conn.commit()
    return {"message": "Expense added successfully"}

@app.get("/expenses")
def get_expenses():
    cursor.execute(
        "SELECT id, title, category, payment_mode, amount, date FROM expenses"
    )
    rows = cursor.fetchall()

    return [
        {
            "id": r[0],
            "title": r[1],
            "category": r[2],
            "payment_mode": r[3],
            "amount": r[4],
            "date": r[5]
        }
        for r in rows
    ]

@app.put("/expenses/{id}")
def update_expense(id: int, expense: Expense):
    if expense.amount <= 0:
        raise HTTPException(status_code=400, detail="Amount must be positive")

    cursor.execute(
        """
        UPDATE expenses
        SET title = ?, category = ?, payment_mode = ?, amount = ?
        WHERE id = ?
        """,
        (
            expense.title,
            expense.category,
            expense.payment_mode,
            expense.amount,
            id
        )
    )
    conn.commit()

    if cursor.rowcount == 0:
        raise HTTPException(status_code=404, detail="Expense not found")

    return {"message": "Expense updated successfully"}

@app.delete("/expenses/{id}")
def delete_expense(id: int):
    cursor.execute("DELETE FROM expenses WHERE id = ?", (id,))
    conn.commit()

    if cursor.rowcount == 0:
        raise HTTPException(status_code=404, detail="Expense not found")

    return {"message": "Expense deleted successfully"}
