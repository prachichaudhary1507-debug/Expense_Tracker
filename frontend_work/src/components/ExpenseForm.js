import React, { useState, useEffect } from 'react';

const ExpenseForm = ({ addExpense, editingExpense, cancelEdit }) => {
    const [title, setTitle] = useState('');
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('');
    const [paymentMode, setPaymentMode] = useState('');
    const [date, setDate] = useState('');

    useEffect(() => {
        if (editingExpense) {
            setTitle(editingExpense.title);
            setAmount(editingExpense.amount);
            setCategory(editingExpense.category);
            setPaymentMode(editingExpense.payment_mode);
            setDate(editingExpense.date);
        }
    }, [editingExpense]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!title || !amount || !category || !paymentMode || !date) {
            alert("All fields are required");
            return;
        }

        const expenseData = {
            title,
            amount: Number(amount),
            category,
            date,
            payment_mode: paymentMode,
        };

        // ⬅️ ONLY send data to App.js
        if (editingExpense) {
            addExpense({ ...expenseData, id: editingExpense.id });
        } else {
            addExpense(expenseData);
        }

        // Reset form
        setTitle('');
        setAmount('');
        setCategory('');
        setPaymentMode('');
        setDate('');
    };

    return (
        <form onSubmit={handleSubmit} className="mb-3">

            <input
                type="text"
                className="form-control mb-2"
                placeholder="Expense Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />

            <input
                type="number"
                className="form-control mb-2"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
            />

            <input
                type="text"
                className="form-control mb-2"
                placeholder="Category (Food, Travel, Rent)"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
            />

            <select
                className="form-control mb-2"
                value={paymentMode}
                onChange={(e) => setPaymentMode(e.target.value)}
            >
                <option value="">Select Payment Mode</option>
                <option value="Cash">Cash</option>
                <option value="Card">Card</option>
                <option value="UPI">UPI</option>
            </select>

            <input
                type="date"
                className="form-control mb-2"
                value={date}
                onChange={(e) => setDate(e.target.value)}
            />

            <button type="submit" className="btn btn-primary me-2">
                {editingExpense ? "Update Expense" : "Add Expense"}
            </button>

            {editingExpense && (
                <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={cancelEdit}
                >
                    Cancel
                </button>
            )}
        </form>
    );
};

export default ExpenseForm;
