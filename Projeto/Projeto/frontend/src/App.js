import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Post from './pages/Post';
import Vote from "./pages/Vote";
import VoteCreate from "./pages/VoteCreate";
import Profile from './pages/Profile';
import Login from './pages/Login';
import Register from './pages/Register';
import UsersList from './pages/UsersList';
import UserProfileAdmin from './pages/UserProfileAdmin';
import UserProfileAdminEdit from "./pages/UserProfileAdminEdit";
import './App.css';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="app">
          <Header />
          <main className="app-main">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/post/:id" element={<Post />} />
              <Route path="/post/new" element={<Post />} />
              <Route path="/votes/new" element={<VoteCreate />} />
              <Route path="/votes/:id" element={<Vote />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/users" element={<UsersList />} />
              <Route path="/users/:username" element={<UserProfileAdmin />} />
              <Route path="/users/:username/edit" element={<UserProfileAdminEdit />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
