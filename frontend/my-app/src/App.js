import Base from './pages/Base';
import Login from './pages/Login';
import Resources from './pages/Resources';
import { BrowserRouter as Router} from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';


const App = () => {
    return (
        <Router>
            <div>
                <Routes>
                    <Route path='/' element={<Base/>}/>
                    <Route path='/login' element={<Login/>}/>
                    <Route path='/resources' element={<Resources/>}/>  
                </Routes>
            </div>
        </Router>

    )
}

export default App;