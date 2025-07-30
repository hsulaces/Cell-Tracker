import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs } from 'firebase/firestore';
import { getAuth, signInAnonymously, onAuthStateChanged, User } from 'firebase/auth';
import firebaseConfig from './firebase/config';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Cell_tracking from './pages/Cell_tracking';
import Protocols from './pages/Protocols';
import Variant_helper from './pages/Variant_helper';
import Research from './pages/Research';
import './App.css';


// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const auth = getAuth(app)

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <nav>
            <ul className="menu-bar">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/cell-tracking">Cell Tracking</Link></li>
              <li><Link to="/protocols">Protocols</Link></li>
              <li><Link to="/variant-helper">Variant Helper</Link></li>
              <li><Link to="/research">Research</Link></li>
            </ul>
            <button className="login-btn" onClick={() => alert("Login coming soon!")}>
              Login
            </button>
          </nav>
        </header>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cell-tracking" element={<Cell_tracking />} />
          <Route path="/protocols" element={<Protocols />} />
          <Route path="/variant-helper" element={<Variant_helper />} />
          <Route path="/research" element={<Research />}/>
        </Routes>

      </div>
    </Router>
  )
}

export default App
