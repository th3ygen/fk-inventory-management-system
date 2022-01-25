import { useEffect } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import logo from "./logo.svg";
import "styles/App.module.scss";

import * as alertify from "alertifyjs";

import UserLayout from "layouts/User.layout";
import AdminLayout from "layouts/Admin.layout";

// pages
import TestPage from "page/Test";

// Vendor page
import ManageVendor from "page/common/vendor/ManageVendor";
import RegisterVendor from "page/common/vendor/RegisterVendor";
import EditVendor from "page/common/vendor/EditVendor";
import ShowVendor from "page/common/vendor/ShowVendor";

// Inventory page
import ManageInventoryPage from "page/common/inventory/ManageInventory";
import InventoryAddItemPage from "page/common/inventory/AddItem";
import InventoryEditItemPage from "page/common/inventory/UpdateItem";
import InventoryAddSoldPage from "page/common/inventory/AddSold";

// Report page
import DisplayReportPage from "page/common/report/DisplayReport";
import ForgotPasswordPage from "page/common/ForgotPassword";
import LoginPage from "page/common/Login";
import RegisterPage from "page/common/Register";

//UpdatePW
import UpdatePasswordPage from "page/common/UpdatePassword";

// Account page
import ManageAccountPage from "page/admin/account/ManageAccount";
import AddAccountPage from "page/admin/account/AddAccount";
import UpdateAccountPage from "page/admin/account/UpdateAccount";

// Order page
import ManageOrderPage from "page/common/order/ManageOrder";
import AddOrderPage from "page/common/order/AddOrder";
import ApproveOrderPage from "page/common/order/ApproveOrder";
import UpdateOrderPage from "page/common/order/UpdateOrder";

//Inbox page
import InboxPage from "page/common/Inbox";

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
	const location = useLocation();
	const navigate = useNavigate();

	useEffect(() => {
		if (!["/login", "/register", "/img"].includes(location.pathname)) {
			try {
				const user = JSON.parse(localStorage.getItem("user"));

				if (user) {
					if (user.role === "admin") {
						if (!location.pathname.includes("/admin")) {
							navigate("/admin/accounts", { replace: true });
						}
					} else {
						if (!location.pathname.includes("/user")) {
							navigate("/user/inventory", { replace: true });
						}
					}
				} else {
					alertify.error("You are not authorized");
					navigate("/login");
				}
			} catch (e) {
				console.log(e);
				localStorage.removeItem("user");

				alertify.error("Auth error");
				navigate("/login");
			}
		}
	}, [location, navigate]);

	return (
		<div className="App">
			<Routes>
				<Route
					path="/ForgotPassword"
					element={<ForgotPasswordPage />}
				/>
				<Route path="/Login" element={<LoginPage />} />
				<Route path="/Register" element={<RegisterPage />} />
				<Route path="/user" element={<UserLayout />}>
					<Route index element={<Home />} />
					<Route path="vendors" element={<ManageVendor />} />
					<Route path="/user/vendors/add" element={<RegisterVendor />}/>
					<Route path="/user/vendors/edit" element={<EditVendor />}/>
					<Route path="/user/vendors/show" element={<ShowVendor />}/>

					<Route path="inventory" element={<ManageInventoryPage />} />
					<Route
						path="/user/inventory/add"
						element={<InventoryAddItemPage />}
					/>
					<Route
						path="/user/inventory/edit"
						element={<InventoryEditItemPage />}
					/>
					<Route
						path="/user/inventory/sell"
						element={<InventoryAddSoldPage />}
					/>

					<Route path="orders" element={<ManageOrderPage />} />
					<Route
						path="/user/order/approve"
						element={<ApproveOrderPage />}
					/>
					<Route path="/user/order/add" element={<AddOrderPage />} />
					<Route
						path="/user/order/update"
						element={<UpdateOrderPage />}
					/>

					<Route path="report" element={<DisplayReportPage />} />
					<Route path="accounts" element={<ManageAccountPage />} />

					<Route
						path="UpdatePassword"
						element={<UpdatePasswordPage />}
					/>

					<Route path="tests" element={<TestPage />} />
					<Route path="inbox" element={<InboxPage />} />
				</Route>
				<Route path="/admin" element={<AdminLayout />}>
					<Route index element={<Home />} />
					<Route
						path="UpdatePassword"
						element={<UpdatePasswordPage />}
					/>
					<Route path="accounts" element={<ManageAccountPage />} />
					<Route
						path="/admin/accounts/add_account"
						element={<AddAccountPage />}
					/>
					<Route
						path="/admin/accounts/update_account"
						element={<UpdateAccountPage />}
					/>
					<Route path="orders" element={<ManageOrderPage />} />
					<Route
						path="/admin/order/approve"
						element={<ApproveOrderPage />}
					/>
					<Route path="/admin/order/add" element={<AddOrderPage />} />
					<Route
						path="/admin/order/update"
						element={<UpdateOrderPage />}
					/>
					<Route path="report" element={<DisplayReportPage />} />
					<Route path="inventory" element={<ManageInventoryPage />} />
					<Route
						path="/admin/inventory/add"
						element={<InventoryAddItemPage />}
					/>
					<Route
						path="/admin/inventory/edit"
						element={<InventoryEditItemPage />}
					/>
					<Route
						path="/admin/inventory/sell"
						element={<InventoryAddSoldPage />}
					/>
					<Route path="inbox" element={<InboxPage />} />
					<Route path="vendors" element={<ManageVendor />} />
					<Route path="/admin/vendors/add" element={<RegisterVendor />}/>
					<Route path="/admin/vendors/edit" element={<EditVendor />}/>
					<Route path="/admin/vendors/show" element={<ShowVendor />}/>
				</Route>
			</Routes>
		</div>
	);
}

export default App;
