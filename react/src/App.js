import { Routes, Route, Link } from "react-router-dom";
import logo from "./logo.svg";
import "styles/App.module.scss";

import UserLayout from "layouts/User.layout";
import AdminLayout from "layouts/Admin.layout";

// pages
import TestPage from "page/Test";

// Inventory page
import ManageInventoryPage from 'page/common/inventory/Manage';

// Order page
import AddOrderPage from 'page/common/order/AddOrder';
import ApproveOrderPage from 'page/common/order/ApproveOrder';
import UpdateOrderPage from 'page/common/order/UpdateOrder';

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
					<Route path="inventory" element={<ManageInventoryPage />} />
					<Route path="order" element={<ApproveOrderPage />} />
					<Route path="add" element={<AddOrderPage />} />
					<Route path="update" element={<UpdateOrderPage />} />
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
