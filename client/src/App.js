import './App.css';
import routes from './router';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import { AuthContextProvider } from './contexts/AuthContext';
import { PostContextProvider } from './contexts/PostContext';


function App() {

    const showPage = (routes) => {
        let result = null;
        if (routes.length > 0) {
            result = routes.map((route, index) => {
                return (
                    <Route key={index} path={route.path} exact={route.exact}
                        component={route.main} render={route.render}>

                    </Route>)
            })
        }
        return <Switch>{result}</Switch>
    }

    return (
        <Router>
            <div className="App">
                <PostContextProvider>
                    <AuthContextProvider>
                        {showPage(routes)}
                    </AuthContextProvider>
                </PostContextProvider>
            </div>
        </Router>
    );
}

export default App;
