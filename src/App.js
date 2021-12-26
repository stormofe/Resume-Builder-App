import "./App.css";
import Header from "./components/Header";
import { Route, Switch } from "react-router";
import { HashRouter } from "react-router-dom";
import Login from "./components/auth/Login";
import Profile from "./components/Profile";
import Forms from "./components/Forms";
import Templates from "./components/Templates";
import NewPage from "./components/NewPage";
import NewPageTwo from "./components/NewPageTwo";
import Layout from "./components/layout/Layout";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material/styles";
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

function App(props) {
	return (
		<ThemeProvider theme={theme}>
			<HashRouter>
				<Header />
				<Layout>
					<Switch>
						<Route path='/login'>
							<Login />
						</Route>
						<Route path='/profile'>
							<Profile />
						</Route>
						<Route path='/forms'>
							<Forms />
						</Route>
						<Route path='/templates'>
							<Templates />
						</Route>
						<Route path='/newpage'>
							<NewPage />
						</Route>
						<Route path='/newpagetwo'>
							<NewPageTwo />
						</Route>
					</Switch>
				</Layout>
			</HashRouter>
		</ThemeProvider>
	);
}

export default App;
