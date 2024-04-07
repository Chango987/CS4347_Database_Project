import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import './App.css';
import 'react-toastify/dist/ReactToastify.css';


import SignIn from './pages/SignIn';
import Navbar from './components/Navbar';
import SignUp from './pages/Signup';
import Dashboard from './pages/Dashboard';
import LandingPage from './pages/LandingPage';
import StockGen from './pages/StockGen';
import Footer from './components/Footer';

function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/stockgen" element={<StockGen />} />
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
