import logo from './logo.svg';
import './App.css';

function App() {
	return (
		<div className="App">
			<Routes>
				<Route path="/user" element={<UserLayout />}>
					<Route index element={<Home />} />
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
