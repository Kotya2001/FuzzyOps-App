import { BrowserRouter as Router} from 'react-router-dom';
import AppRouter from './components/AppRoute'
import NavBar from './components/NavBar';


const App = () => {
    return (
        <Router>
            <div>
                <NavBar />
                <AppRouter />
            </div>
        </Router>

    )
}

export default App;