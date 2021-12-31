import { Routes, Route } from "react-router-dom";
import logo from "./logo.svg";
import "styles/App.module.scss";

import UserLayout from "layouts/User.layout";
import AdminLayout from "layouts/Admin.layout";

// pages
import TestPage from "page/Test";

// Inventory page
import ManageInventoryPage from 'page/common/inventory/Manage';


// Report page
import DisplayReportPage from 'page/common/report/DisplayReport';
import ForgotPasswordPage from 'page/common/ForgotPassword';

// Account page
import ManageAccountPage from 'page/admin/account/ManageAccount';

// Order page
import ManageOrderPage from 'page/common/order/ManageOrder';
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
				<Route path="/ForgotPassword" element={<ForgotPasswordPage />} />
				<Route path="/user" element={<UserLayout />}>
					<Route index element={<Home />} />
					<Route path="inventory" element={<ManageInventoryPage />} />
					<Route path="orders" element={<ManageOrderPage />} />
					<Route path="report" element={<DisplayReportPage />} />
					<Route path="accounts" element={<ManageAccountPage />} />
					<Route path="approve" element={<ApproveOrderPage />} />
					<Route path="add" element={<AddOrderPage />} />
					<Route path="update" element={<UpdateOrderPage />} />

					<Route path="tests" element={<TestPage />} />
				</Route>
				<Route path="/admin" element={<AdminLayout />}>
					<Route index element={<Home />} />
					<Route path="accounts" element={<ManageAccountPage />} />
					<Route path="report" element={<DisplayReportPage />} />
					<Route path="inventory" element={<ManageInventoryPage />} />
				</Route>
			</Routes>
		</div>
	);
}

export default App;
