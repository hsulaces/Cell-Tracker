import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs } from 'firebase/firestore';
import { getAuth, signInAnonymously, onAuthStateChanged, User } from 'firebase/auth';
import firebaseConfig from './firebase/config';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Research from './pages/Research';
import Publications from './pages/Publications';
import Cell_tracking from './pages/Cell_tracking';
import Protocols from './pages/Protocols';
import Variant_helper from './pages/Variant_helper';
import './App.css';
import Login from './pages/Login';


// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const auth = getAuth(app)

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <nav className="flex items-center justify-between px-4 py-2 bg-darkBlue">
            <ul className="flex gap-6 text-sky-300 font-bold text-base">
              <li><Link to="/">About</Link></li>
              <li><Link to="/research">Research</Link></li>
              <li><Link to="/publications">Publications</Link></li>
              <li><Link to="/cell-tracking">Cell Tracking</Link></li>
              <li><Link to="/protocols">Protocols</Link></li>
              <li><Link to="/variant-helper">Variant Helper</Link></li>
            </ul>
            <Link to="/login" className="login-btn ml-auto">
            Login
            </Link>
          </nav>
        </header>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/research" element={<Research />}/>
          <Route path="/publications" element={<Publications />}/>
          <Route path="/cell-tracking" element={<Cell_tracking />} />
          <Route path="/protocols" element={<Protocols />} />
          <Route path="/variant-helper" element={<Variant_helper />} />
          <Route path="/login" element={<Login/>} />
        </Routes>

      </div>
    </Router>
  )
}

export default App
