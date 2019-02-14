import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import rootReducer from "./redux/rootReducer";
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import TablePage from './tablepage/TablePage'



const composeEnhancers =
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
            // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
        }) : compose;

const enhancer = composeEnhancers(
    applyMiddleware(thunk),
    // other store enhancers if any
);
const store = createStore(rootReducer, enhancer);

const BootstrapApp = () => {
    return (
        <Provider store={store}>

                <BrowserRouter >
                    <Switch>
                        <Route exact path="/" component={App}/>
                        <Route path="/table" component={TablePage}/>
                    </Switch>

                </BrowserRouter>

        </Provider>
    )
}


ReactDOM.render(
    <Provider store={store}>
        <BootstrapApp />
    </Provider>,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
