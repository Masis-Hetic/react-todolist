import React from 'react';
import './App.css';
import {Test} from "./Components/Test/Test";
// import { FormWrapper } from "./Components/Form/FormWrapper/FormWrapper";

class App extends React.Component {
	render() {
		return (
			<div className="App">
				{/*<FormWrapper />*/}
				<Test/>
			</div>
		);
	}
}

export default App;
