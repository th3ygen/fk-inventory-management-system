import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import mqtt from "mqtt";

import logo from "./logo.svg";
import "styles/App.module.scss";

import UserLayout from "layouts/User.layout";
import AdminLayout from "layouts/Admin.layout";

// Inventory page
import ManageInventoryPage from 'page/common/inventory/Manage';


// Report page
import DisplayReportPage from 'page/common/facilities/PondDevices';
import ForgotPasswordPage from 'page/common/ForgotPassword';

// Account page
import ManageAccountPage from 'page/admin/account/ManageAccount';


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
	const [mqttClient, setMqttClient] = useState(null);

	const mqttConnect = () => {
		try {
			const client = mqtt.connect("ws://localhost:9001");
			client.on("connect", () => {
				console.log("Connected to MQTT broker");
				client.subscribe("server/state");

				setMqttClient(client);
			});
			client.on("error", (err) => {
				console.log("Error connecting to MQTT broker", err);
			});
		} catch (error) {
			console.log("Error connecting to MQTT broker", error);
		}
	};

	useEffect(() => {
		mqttConnect();
	}, []);

	return (
		<div className="App">
			<Routes>
				<Route path="/ForgotPassword" element={<ForgotPasswordPage />} />
				<Route path="/user" element={<UserLayout />}>
					<Route index element={<Home />} />
					<Route path="productivity" element={<DisplayReportPage />} />

					<Route path="visualization" element={<DisplayReportPage />} />
					<Route path="facilities" element={<DisplayReportPage mqtt={mqttClient} />} />
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
