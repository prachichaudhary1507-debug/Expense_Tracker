// src/components/ExpenseItem.js
import React from 'react';

const ExpenseItem = ({ expense }) => {
    return (
        <tr>
            <td>{expense.expense_type}</td>
            <td>{expense.amount}</td>
            <td>{expense.date}</td>
        </tr>
    );
};

export default ExpenseItem;
