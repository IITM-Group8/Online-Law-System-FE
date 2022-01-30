import { Route, Routes, BrowserRouter } from 'react-router-dom';

import Home from './Components/Home';
import Dashboard from './Components/Dashboard/Dashboard';
import LogoutPage from "./Components/LogoutPage";

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={ <Home /> } />
                <Route exact path="/home" element={ <Home /> } />
                <Route exact path="/dashboard" element={ <Dashboard /> } />
                <Route exact path="/logout" element={ <LogoutPage /> } />
            </Routes>
        </BrowserRouter>
    );
}

export default Router;