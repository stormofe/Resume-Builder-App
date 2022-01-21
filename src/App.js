import "./App.css";
import Header from "./components/Header";
import { Route, Switch } from "react-router";
import { HashRouter } from "react-router-dom";
import Login from "./components/auth/Login";
import Profile from "./components/Profile";
import Layout from "./components/layout/Layout";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material/styles";
import SnackbarError from "./components/styledComponents/SnackbarError";
import SnackbarSuccess from "./components/styledComponents/SnackbarSuccess";
import StartPage from "./components/StartPage";

let theme = createTheme({
	palette: {
		primary: {
			main: "#202040",
		},
		secondary: {
			main: "#fff",
		},
		error: {
			main: "#c62828",
		},
	},
});

function App() {
	return (
		<ThemeProvider theme={theme}>
			<HashRouter>
				<Header />
				<SnackbarError />
				<SnackbarSuccess />
				<Layout>
					<Switch>
						<Route path='/login'>
							<Login />
						</Route>
						<Route path='/profile'>
							<Profile />
						</Route>
						<Route path='/startpage'>
							<StartPage />
						</Route>
					</Switch>
				</Layout>
			</HashRouter>
		</ThemeProvider>
	);
}

export default App;
