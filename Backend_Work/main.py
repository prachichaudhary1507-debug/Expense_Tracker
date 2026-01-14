from database import engine
from models import Base

Base.metadata.create_all(bind=engine)

print("expense database created successfully")

from request import add_expense_data
print(add_expense_data("Groceries", 150.75, "Food","cash"))
print(add_expense_data("Bus Ticket", 2.50, "Transport","card"))

