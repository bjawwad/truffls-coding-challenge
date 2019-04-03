import React from 'react';
// React Router
import { Switch, Route } from 'react-router-dom';
// Components
import TemplatesPage from '../TemplatesPage'
import TemplatesEditPage from '../TemplatesEditPage';
// CSS
import './App.style.css';


const App = () => {
    return (
        <div className="App">
            <Switch>
                <Route exact path="/" component={TemplatesPage}></Route>
                <Route exact path="/add" render={props => <TemplatesEditPage {...props} type="add" />} />
                <Route path="/edit/:templateId" render={props => <TemplatesEditPage {...props} type="edit" />} />
            </Switch>
        </div>
    );
}

export default App;
