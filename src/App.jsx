import React, { useState, useEffect } from 'react';
import AddEmployeeForm from './components/AddEmployeeForm';
import EmployeeList from './components/EmployeeList';
import SignupFormDemo from './components/SignupFormDemo'; // Import SignupFormDemo
import { Button } from './components/ui/button';

// Custom hook to manage local storage
const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.log(error);
    }
  };

  return [storedValue, setValue];
};

const App = () => {
  const [employees, setEmployees] = useLocalStorage('employees', []);
  const [authenticated, setAuthenticated] = useLocalStorage('authenticated', false);

  const fixedPassword = "6Sensei"; // Fixed password for authentication

  const addEmployee = (employee) => {
    setEmployees([...employees, { ...employee, id: employees.length + 1, isBlocked: false }]);
  };

  const updateEmployee = (id, updatedInfo) => {
    setEmployees(employees.map(emp => emp.id === id ? { ...emp, ...updatedInfo } : emp));
  };

  const deleteEmployee = (id) => {
    setEmployees(employees.filter(emp => emp.id !== id));
  };

  const toggleBlockEmployee = (id) => {
    setEmployees(employees.map(emp => emp.id === id ? { ...emp, isBlocked: !emp.isBlocked } : emp));
  };

  const handleLogin = (password) => {
    if (password === fixedPassword) {
      setAuthenticated(true);
    } else {
      alert("Incorrect password. Please try again.");
    }
  };

  const handleLogout = () => {
    setAuthenticated(false);
  };

  return (
    <div className="app">
      <div className="flex-container">
        <div className="w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
          {authenticated ? (
            <div className='flex items-center flex-col w-full'>
              <AddEmployeeForm addEmployee={addEmployee} />
              <EmployeeList
                employees={employees}
                updateEmployee={updateEmployee}
                deleteEmployee={deleteEmployee}
                toggleBlockEmployee={toggleBlockEmployee}
                className="w-full"
              />
              <Button onClick={handleLogout}>Logout</Button>
            </div>
          ) : (
            <SignupFormDemo onLogin={handleLogin} className="w-1/2" />
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
