import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import './App.css';
import 'react-toastify/dist/ReactToastify.css';


import SignIn from './pages/SignIn';
import Navbar from './components/Navbar';
import SignUp from './pages/Signup';
import LandingPage from './pages/LandingPage';
import { useEffect } from 'react';
import { backendURL } from './utils';
import StockGen from './pages/StockGen';

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
                <Route path="/signin" element={<SignIn />} />
                <Route path="/stockgen" element={<StockGen />} />
            </Routes>
            <ToastContainer
                autoClose={2000}
                position="bottom-right"
            />
        </BrowserRouter>
    );
}

export default App;
