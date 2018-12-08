import React from 'react';
import { List } from "../List/List";
import './Form.css';
import {InputName} from "./InputName";
import {InputUrl} from "./InputUrl";

export class Form extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			nameSite: '',
			urlSite: '',
			index: null,
			count: 0,
			myStorageTab: [],
			storage: JSON.parse(localStorage.getItem('mes-sites'))
		};
		Form.handleSubmit = Form.handleSubmit.bind(this);
	}

	componentWillMount() { this.setState({ myStorageTab: JSON.parse(localStorage.getItem('mes-sites')) || [] });	}
	handleNameChanges = e => { this.setState({ nameSite: e.target.value }); };
	handleUrlChanges = e => {	this.setState({ urlSite: e.target.value });	};

	static handleSubmit(e) {
		e.preventDefault();

		if ((this.state.nameSite !== '' && this.state.urlSite !== '') && this.state.index === null) {
			this.state.myStorageTab.push({ nameSite: this.state.nameSite, urlSite: this.state.urlSite });
			localStorage.setItem('mes-sites', JSON.stringify(this.state.myStorageTab));
			this.setState({ count: this.state.count + 1, storage: JSON.parse(localStorage.getItem('mes-sites')) });
		}

		if (this.state.index !== null) {
			const storageTab = this.state.myStorageTab;
			storageTab[this.state.index].nameSite = this.state.nameSite;
			storageTab[this.state.index].urlSite = this.state.urlSite;

			this.setState({ myStorageTab: storageTab });
			localStorage.setItem('mes-sites', JSON.stringify(this.state.myStorageTab));

			this.setState({
				count: this.state.count + 1, storage: JSON.parse(localStorage.getItem('mes-sites')), index: null
			});
		}

		this.setState({ nameSite: '', urlSite: '' });
		this.refName.value = this.state.nameSite;
		this.refUrl.value = this.state.urlSite;
	}

	handleClickItem = e => {
		const getIndex = e.target.getAttribute('id');
		this.setState({ index: getIndex });
		this.setState({ nameSite: this.state.storage[getIndex].nameSite, urlSite: this.state.storage[getIndex].urlSite });

		this.refName.value = this.state.nameSite;
		this.refUrl.value = this.state.urlSite
	};

	render() {
		return (
			<div>
				<form onSubmit={Form.handleSubmit}>
					<div className="wrapper">
						<InputName
							triggerChanges={this.handleNameChanges}
							storage={this.state.nameSite}
							reference={input => this.refName = input}
						/>
					</div>

					<div className="wrapper">
						<InputUrl
							triggerChanges={this.handleUrlChanges}
							storage={this.state.urlSite}
							reference={input => this.refUrl = input}
						/>
					</div>

					<div className="wrapper">
						<input type="submit" />
					</div>
				</form>

				<div className="list-wrapper">
					{ this.state.count >= 0 && <List triggerClick={this.handleClickItem} storage={this.state.storage} /> }
				</div>
			</div>
		);
	}
}