import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from "./App";
import { AuthProvider } from "./components/auth/Auth";
import { Provider } from "react-redux";
import { store } from "./store";

ReactDOM.render(
	<Provider store={store}>
		<AuthProvider>
			<App />
		</AuthProvider>
	</Provider>,
	document.getElementById("root"),
);


