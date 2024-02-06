import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import './App.css';
import 'react-toastify/dist/ReactToastify.css';


import Home from './pages/Home';
import Navbar from './components/Navbar';
import SignUp from './pages/Signup';
import Dashboard from './pages/Dashboard';
import { useEffect } from 'react';
import { backendURL } from './utils';
import Footer from './components/Footer';

function App() {
    useEffect(() => {
        console.log(backendURL);
    }, []);
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
            <ToastContainer
                autoClose={2000}
                position="bottom-right"
            />
            <Footer />
        </BrowserRouter>
    );
}

export default App;
