import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { Connector } from "mqtt-react-hooks";
import mqtt from "mqtt";

import logo from "./logo.svg";
import "styles/App.module.scss";

import UserLayout from "layouts/User.layout";
import AdminLayout from "layouts/Admin.layout";


// Report page
import DisplayReportPage from "page/common/facilities/PondDevices";


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
	const [mqttData, setMqttData] = useState(null);

	const mqttConnect = () => {
		try {
			const client = mqtt.connect("ws://localhost:9001");
			client.on("connect", () => {
				console.log("Connected to MQTT broker");
				client.subscribe("server/state");
				client.subscribe("test/state");
			});

			client.on("message", (topic, message) => {
				setMqttData({
					topic, message: message.toString(),
				});
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
				<Route path="/user" element={<UserLayout mqtt={mqttData}/>}>
					<Route index element={<Home />} />
					<Route
						path="productivity"
						element={<DisplayReportPage />}
					/>

					<Route
						path="visualization"
						element={<DisplayReportPage />}
					/>
					<Route
						path="facilities"
						element={<DisplayReportPage />}
					/>
				</Route>
				<Route path="/admin" element={<AdminLayout />}>
					<Route index element={<Home />} />
					
				</Route>
			</Routes>
		</div>
	);
}

export default App;
