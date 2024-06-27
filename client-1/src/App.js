import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Register from './components/Register';
import UserList from './components/UserList';

const App = () => {
  return (
    <Router>
      <div className="bg-gray-800 text-white min-h-screen">
        <nav className="flex items-center justify-between p-4">
          <div className="flex space-x-4">
            <Link to="/users" className="px-3 my-5 rounded-md bg-blue-500 text-white hover:bg-blue-600">See Users</Link>
            <Link to="/register" className="px-3 my-5 rounded-md bg-gray-300 text-gray-800 hover:bg-gray-400">Register User</Link>
          </div>
        </nav>
        <main className="p-4">
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/users" element={<UserList />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
