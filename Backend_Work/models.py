from sqlalchemy import Column, Integer, String, Float, DateTime
from database import Base
from datetime import datetime

class Expense(Base):
    __tablename__= "my_expenses"

    id = Column(Integer,primary_key=True, index=True)
    title = Column(String, nullable=False)
    price = Column(Float, nullable=False)
    expense_type = Column(String, nullable=False)
    created_time = Column(DateTime, default=datetime.utcnow)
    payment_mode = Column(String, nullable=False)

