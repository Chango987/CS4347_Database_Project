import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import './App.css';
import 'react-toastify/dist/ReactToastify.css';


import Home from './pages/Home';
import Navbar from './components/Navbar';
import SignUp from './pages/Signup';
import Dashboard from './pages/Dashboard';
import LandingPage from './pages/LandingPage';
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
                <Route path="/" element={<LandingPage />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/signin" element={<Home />} />
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
