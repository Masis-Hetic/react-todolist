import React from 'react';
// import { InputNom } from '../InputNom/InputNom';
import { InputUrl } from "../InputUrl/InputUrl";
import { List } from "../../DisplayListSites/List/List";
import {InputNom} from "../InputNom/InputNom";

export class FormWrapper extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			nom: '',
			url: '',
			myStorage: [],
			count : 0,
			storage: JSON.parse(localStorage.getItem('sites')),
			index: '',
			clickedItem: '',
		};
		this.getNom = this.getNom.bind(this);
		this.getUrl = this.getUrl.bind(this);
		FormWrapper.handleSubmit = FormWrapper.handleSubmit.bind(this);
		this.handleClick = this.handleClick.bind(this);

		this.selectDefaultValue = this.selectDefaultValue.bind(this);
	}

	componentWillMount() { this.setState({ myStorage: JSON.parse(localStorage.getItem('sites')) || [] });	}
	getNom(e) { this.setState({ nom: e.target.value });	}
	getUrl(e) { this.setState({ url: e.target.value }); }

	static handleSubmit(e) {
		e.preventDefault();
		if (this.state.nom !== '' && this.state.url !== '') {
			this.state.myStorage.push({ nom: this.state.nom, url: this.state.url });
			localStorage.setItem('sites', JSON.stringify(this.state.myStorage));
			this.setState({
				count: this.state.count + 1,
				storage: JSON.parse(localStorage.getItem('sites'))
			});
		}
	}

	handleClick(e) {
		const index = e.target.getAttribute('id') || e.target.getAttribute('class');
		const storage = JSON.parse(localStorage.getItem('sites'));
		this.setState({ clickedItem: storage[index] }, () => console.log('from FormWrapper => ', this.state.clickedItem.nom));
	}

	selectDefaultValue(e) {
		if (this.state.nom !== '') {
			this.setState({ nom: this.state.clickedItem.nom });
		} else {
			this.setState({ nom: e.target.value });
		}
	}

	render() {
		return (
			<div>
				<h4>Valid Form</h4>
				<form onSubmit={FormWrapper.handleSubmit}>

					<div className="wrapper">
						<InputNom
							type="text"
						  onChange={this.selectDefaultValue}
							defaultValue={this.state.clickedItem.nom}
						/>
					</div>

					{/*<div className="wrapper">*/}
						{/*{this.state.valueFromStorage === false &&*/}
							{/*<InputNom*/}
								{/*onChange={this.getNom}*/}
								{/*value={this.state.nom}*/}
							{/*/>*/}
						{/*}*/}
						{/*{this.state.valueFromStorage === true &&*/}
							{/*<InputNomEdit*/}
								{/*onChange={this.test}*/}
								{/*ref={(input) => this.test = input}*/}
                {/*value={this.state.clickedItem.nom}*/}
							{/*/>*/}
						{/*}*/}
					{/*</div>*/}
					<div className="wrapper">
						<InputUrl onChange={this.getUrl} value={this.state.url} />
					</div>
					<div className="wrapper">
						<input type="submit" />
					</div>
				</form>
				{	this.state.count >= 0 && <List onSubmit={this.state.storage} triggerClick={this.handleClick} />	}
			</div>
		);
	}
}
