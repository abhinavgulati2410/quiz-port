import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

//Importing Pages
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import DashboardTeacher from "./pages/DashboardTeacher";
import Quiz from "./pages/common/Quiz";

import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

import PrivateRoute from "./components/PrivateRoute";

const App = () => {
	return (
		<div className="App">
			<Router>
				<NavBar />
				<Switch>
					<Route path="/" exact component={Home} />
					<PrivateRoute
						path="/dashboard"
						exact
						component={Dashboard}
					/>
					<Route path="/signup" exact component={SignUp} />
					<Route path="/login" exact component={Login} />

					<Route path="/quiz/:id" exact component={Quiz} />

					<PrivateRoute
						path="/dashboardTeacher"
						exact
						doc
						component={DashboardTeacher}
					/>
				</Switch>
				<Footer />
			</Router>
		</div>
	);
};

export default App;
