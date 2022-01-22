import { Route, Routes, BrowserRouter } from 'react-router-dom';

import Home from './Components/Home';

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={ <Home /> } />
                <Route exact path="/home" element={ <Home /> } />
            </Routes>
        </BrowserRouter>
    );
}

export default Router;