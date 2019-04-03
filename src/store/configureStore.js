import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from './reducer';

let composeEnhancers = compose;
if (!!window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
}

function configureStore() {
    const middlewares = [thunk];

    const enhancers = [
        applyMiddleware(...middlewares)
    ];
    const enhancer = composeEnhancers(...enhancers);

    const store = createStore(
        rootReducer,
        {},
        enhancer
    );

    if (module.hot) {
        module.hot.accept('./reducer.js', () => {
            const nextReducer = require('./reducer.js').default;
            store.replaceReducer(nextReducer);
        });
    }

    return store;
}

export default configureStore;
