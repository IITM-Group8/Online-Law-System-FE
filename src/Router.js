import { Route, Routes, BrowserRouter } from 'react-router-dom';

import Home from './Components/Home';
import Dashboard from './Components/Dashboard';

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={ <Home /> } />
                <Route exact path="/home" element={ <Home /> } />
                <Route path="/dashboard" element={ <Dashboard /> } />
            </Routes>
        </BrowserRouter>
    );
}

export default Router;