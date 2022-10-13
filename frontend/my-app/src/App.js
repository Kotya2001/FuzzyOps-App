import { BrowserRouter as Router} from 'react-router-dom';
import AppRouter from './components/AppRoute'
import NavBar from './components/NavBar';
import { observer } from "mobx-react-lite";

const App = observer(() => {
    return (
        <Router>
            <div>
                <NavBar />
                <AppRouter />
            </div>
        </Router>

    )
})

export default App;