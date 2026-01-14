from database import SessionLocal
from models import Expense

def add_expense_data(title, price, expense_type, payment_mode):
    db = SessionLocal()
    new_expense = Expense(
        title=title,
        price=price,
        expense_type=expense_type,
        payment_mode=payment_mode
    )
    db.add(new_expense)
    db.commit()
    db.close()
    return "Expense data added successfully"