import { Routes, Route } from "react-router-dom";
import logo from "./logo.svg";
import "styles/App.module.scss";

import UserLayout from "layouts/User.layout";
import AdminLayout from "layouts/Admin.layout";

// pages
import TestPage from "page/Test";

// Vendor page
// import ManageVendor from "page/common/vendor/ManageVendor";
// import RegisterVendor from "page/common/vendor/RegisterVendor";
// import EditVendor from "page/common/vendor/EditVendor";
// Inventory page
import ManageInventoryPage from 'page/common/inventory/ManageInventory';
import InventoryAddItemPage from 'page/common/inventory/AddItem';
import InventoryEditItemPage from 'page/common/inventory/UpdateItem';
import InventoryAddSoldPage from 'page/common/inventory/AddSold';

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
					{/* <Route path="vendors" element={<ManageVendor />} />
					<Route path="/user/vendors/add" element={<RegisterVendor />}/>
					<Route path="/user/vendors/edit" element={<EditVendor />}/> */}
					<Route path="inventory" element={<ManageInventoryPage />} />
					<Route path="/user/inventory/add" element={<InventoryAddItemPage />} />
					<Route path="/user/inventory/edit" element={<InventoryEditItemPage />} />
					<Route path="/user/inventory/sell" element={<InventoryAddSoldPage />} />

					<Route path="orders" element={<ManageOrderPage />} />
					<Route path="report" element={<DisplayReportPage />} />
					<Route path="accounts" element={<ManageAccountPage />} />
					<Route path="approve" element={<ApproveOrderPage />} />
					<Route path="add" element={<AddOrderPage />} />
					<Route path="update" element={<UpdateOrderPage />} />
					<Route path="UpdatePassword" element={<UpdatePasswordPage />} />

					<Route path="tests" element={<TestPage />} />
				</Route>
				<Route path="/admin" element={<AdminLayout />}>
					<Route index element={<Home />} />
					<Route path="UpdatePassword" element={<UpdatePasswordPage />} />
					<Route path="accounts" element={<ManageAccountPage />} />
					<Route path="/admin/accounts/add_account" element={<AddAccountPage />} />
					<Route path="/admin/accounts/update_account" element={<UpdateAccountPage />} />
					<Route path="report" element={<DisplayReportPage />} />
					<Route path="inventory" element={<ManageInventoryPage />} />
				</Route>
			</Routes>
		</div>
	);
}

export default App;
