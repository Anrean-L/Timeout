import './App.css';
import Discovery from './components/Discovery';
import DataFlow from './components/DataFlow';
import classNames from 'classnames';
const isDiscovery = window.location.pathname.replace(/\//g, '') === 'discovery';
function App() {
	return (
		<main
			className={classNames({
				discovery: isDiscovery,
				container: true,
			})}
		>
			{isDiscovery ? <Discovery /> : <DataFlow />}
		</main>
	);
}

export default App;
