import Base from './pages/Base';
import Login from './pages/Login';
import Resources from './pages/Resources';
import Register from './pages/Register';
import { BrowserRouter as Router} from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';




const App = () => {
    return (
        <Router>
            <Provider store={store}>
                <div>
                    <Routes>
                        <Route path='/' element={<Base/>}/>
                        <Route path='/register' element={<Register/>}/>
                        <Route path='/login' element={<Login/>}/>
                        <Route path='/resources' element={<Resources/>}/>  
                    </Routes>
                </div>
            </Provider>
        </Router>

    )
}

export default App;