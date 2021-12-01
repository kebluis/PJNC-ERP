import React from 'react';
import './App.css';
import 'antd/dist/antd.css';
import EntryPoint from './sections/EntryPoint/EntryPoint';
import Layout from './sections/Layout/LayoutSection';

const App = () => {
	return (
		<div className="App">
			<header className="App-header">
				<EntryPoint>
					<Layout />
				</EntryPoint>
			</header>
		</div>
	);
};

export default App;
