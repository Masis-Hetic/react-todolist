import React from 'react';
import './App.css';
import Form from "./Components/Form/Form";
import SideBar from "./Components/SideBar/SideBar";

class App extends React.Component {
	render() {
		console.log(this.props);
		return (
			<div className="App">

				<SideBar/>

				<main>
						<Form/>
				</main>

			</div>
		);
	}
}

export default App;
