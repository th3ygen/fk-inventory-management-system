import { Routes, Route, Link } from "react-router-dom";
import logo from "./logo.svg";
import "styles/App.module.scss";

import UserLayout from "layouts/User.layout";
import AdminLayout from "layouts/Admin.layout";

// pages
import TestPage from "page/Test";

// Vendor page
import ManageVendor from "page/common/vendor/ManageVendor";
import RegisterVendor from "page/common/vendor/RegisterVendor";
import EditVendor from "page/common/vendor/EditVendor";

function Home() {
	return (
		<header className="App-header">
			<img src={logo} className="App-logo" alt="logo" />
			<p>
				Edit <code>src/App.js</code> and save to reload.
			</p>
			<a
				className="App-link"
				href="https://reactjs.org"
				target="_blank"
				rel="noopener noreferrer"
			>
				Learn React
			</a>
		</header>
	);
}

function App() {
	return (
		<div className="App">
			<Routes>
				<Route path="/user" element={<UserLayout />}>
					<Route index element={<Home />} />
					<Route path="vendors" element={<ManageVendor />} />
					<Route path="/user/vendors/add" element={<RegisterVendor />}/>
					<Route path="/user/vendors/edit" element={<EditVendor />}/>
					<Route path="tests" element={<TestPage />} />
				</Route>
				<Route path="/admin" element={<AdminLayout />}>
					<Route index element={<Home />} />
				</Route>
			</Routes>
		</div>
	);
}

export default App;
