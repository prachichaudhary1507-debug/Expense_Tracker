import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ExpenseForm from './components/ExpenseForm';

function App() {
  const [expenses, setExpenses] = useState([]);
  const [editingExpense, setEditingExpense] = useState(null);

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const res = await axios.get('http://127.0.0.1:8000/expenses');
      setExpenses(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // ✅ SINGLE FUNCTION FOR ADD + UPDATE
  const addExpense = async (expenseData) => {
    try {
      if (expenseData.id) {
        // UPDATE
        await axios.put(
          `http://127.0.0.1:8000/expenses/${expenseData.id}`,
          expenseData
        );
        setEditingExpense(null);
      } else {
        // CREATE
        await axios.post(
          'http://127.0.0.1:8000/expenses',
          expenseData
        );
      }
      fetchExpenses();
    } catch (err) {
      console.error(err);
      alert("Error saving expense");
    }
  };

  const deleteExpense = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/expenses/${id}`);
      setExpenses(expenses.filter(exp => exp.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const startEdit = (expense) => {
    setEditingExpense(expense);
  };

  return (
    <div className="container mt-3">
      <h2>Expense Tracker</h2>

      <ExpenseForm
        addExpense={addExpense}
        editingExpense={editingExpense}
        cancelEdit={() => setEditingExpense(null)}
      />

      <table className="table table-bordered mt-3">
        <thead>
          <tr>
            <th>Title</th>
            <th>Amount</th>
            <th>Category</th>
            <th>Date</th>
            <th>Payment Mode</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {expenses.map(exp => (
            <tr key={exp.id}>
              <td>{exp.title}</td>
              <td>{exp.amount}</td>
              <td>{exp.category}</td>
              <td>{exp.date}</td>
              <td>{exp.payment_mode}</td>
              <td>
                <button
                  className="btn btn-sm btn-warning me-2"
                  onClick={() => startEdit(exp)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => deleteExpense(exp.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
