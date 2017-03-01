import { Platform } from 'react-native';
import {
	createStore,
	applyMiddleware,
	compose
} from 'redux';
import thunk from 'redux-thunk';
import devTools, { composeWithDevTools } from 'remote-redux-devtools';
import reducer from 'config/rootReducer';

let store;
 if (__DEV__) {
	 const enhancer = compose(
     applyMiddleware(thunk),
     devTools({
       name: Platform.OS,
       hostname: 'localhost',
       port: 5678
     })
   );
	 store = createStore(reducer, {}, enhancer);
} else {
	store = createStore(
	 reducer,
	 composeWithDevTools(
		 applyMiddleware(thunk)
	 )
	);
}

export default store;
