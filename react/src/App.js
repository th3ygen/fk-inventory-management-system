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
//UpdatePW
import UpdatePasswordPage from 'page/common/UpdatePassword';

// Account page
import ManageAccountPage from 'page/admin/account/ManageAccount';
import AddAccountPage from 'page/admin/account/AddAccount';
import UpdateAccountPage from 'page/admin/account/UpdateAccount';


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
				<Route path="/ForgotPassword" element={<ForgotPasswordPage />} />
				<Route path="/user" element={<UserLayout />}>
					<Route index element={<Home />} />
					<Route path="inventory" element={<ManageInventoryPage />} />

					<Route path="report" element={<DisplayReportPage />} />
					<Route path="accounts" element={<ManageAccountPage />} />
					<Route path="order" element={<ApproveOrderPage />} />
					<Route path="add" element={<AddOrderPage />} />
					<Route path="update" element={<UpdateOrderPage />} />
					<Route path="UpdatePassword" element={<UpdatePasswordPage />} />

					<Route path="tests" element={<TestPage />} />
				</Route>
				<Route path="/admin" element={<AdminLayout />}>
					<Route index element={<Home />} />
					<Route path="UpdatePassword" element={<UpdatePasswordPage />} />
					<Route path="accounts" element={<ManageAccountPage />} />
					<Route path="/admin/accounts/AddAccount" element={<AddAccountPage />} />
					<Route path="/admin/accounts/UpdateAccount" element={<UpdateAccountPage />} />
					<Route path="report" element={<DisplayReportPage />} />
					<Route path="inventory" element={<ManageInventoryPage />} />
				</Route>
			</Routes>
		</div>
	);
}

export default App;
