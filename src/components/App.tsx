import './App.scss';
import Header from './Header/Header';
import HomePage from './HomePage/HomePage';
import Nav from './Nav/Nav';

function App() {
	return (
		<div className="App">
			<div className="App-left">
				<Nav />
			</div>
			<div className="App-right">
				<Header />
				<HomePage />
			</div>
		</div>
	);
}

export default App;
