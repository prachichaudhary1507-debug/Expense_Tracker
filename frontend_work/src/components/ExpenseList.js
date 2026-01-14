import React from 'react';

const ExpenseList = ({ expenses }) => {
    return (
        <table className="table table-bordered">
            <thead>
                <tr>
                    <th>Expense Type</th>
                    <th>Amount</th>
                    <th>Date</th>
                </tr>
            </thead>
            <tbody>
                {expenses.map((expense) => (
                    <tr key={expense.id}>
                        <td>{expense.expense_type}</td>
                        <td>{expense.price}</td>
                        <td>{expense.created_time?.split("T")[0]}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default ExpenseList;
