import logo from './logo.svg';
import './App.css';

function App() {
<<<<<<< HEAD
  return (
    <div className="App">
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
    </div>
  );
=======
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
>>>>>>> 0d43f40 (nav link click area fix)
}

export default App;
