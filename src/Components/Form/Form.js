import React from 'react';
import { List } from "../List/List";
import './Form.css';
import {InputName} from "../InputName/InputName";
import {InputUrl} from "../InputUrl/InputUrl";
import {InputDate} from "../InputDate/InputDate";

export class Form extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			nameSite: '',
			urlSite: '',
			index: null,
			count: 0,
			dateToDisplay: '',
			date: 'yyyy-MM-ddThh:mm',
			myStorageTab: [],
			storage: JSON.parse(localStorage.getItem('mes-sites'))
		};
		Form.handleSubmit = Form.handleSubmit.bind(this);
	}

	componentWillMount() { this.setState({ myStorageTab: JSON.parse(localStorage.getItem('mes-sites')) || [] });	}
	handleNameChanges = e => { this.setState({ nameSite: e.target.value }); };
	handleUrlChanges = e => {	this.setState({ urlSite: e.target.value });	};
	handleDateChanges = e => { this.setState( { dateToDisplay: e.target.value, date: Date.parse(e.target.value) }); }

	static handleSubmit(e) {
		e.preventDefault();

		if ((this.state.nameSite !== '' && this.state.urlSite !== '') && this.state.index === null) {
			this.state.myStorageTab.push({
				nameSite: this.state.nameSite,
				urlSite: this.state.urlSite,
				dateToDisplay: this.state.dateToDisplay,
				date: this.state.date
			});
			localStorage.setItem('mes-sites', JSON.stringify(this.state.myStorageTab));
			this.setState({ count: this.state.count + 1, storage: JSON.parse(localStorage.getItem('mes-sites')) });
		}

		if (this.state.index !== null) {
			const storageTab = this.state.myStorageTab;
			storageTab[this.state.index].nameSite = this.state.nameSite;
			storageTab[this.state.index].urlSite = this.state.urlSite;
			storageTab[this.state.index].dateToDisplay = this.state.dateToDisplay
			storageTab[this.state.index].date = this.state.date;

			this.setState({ myStorageTab: storageTab });
			localStorage.setItem('mes-sites', JSON.stringify(this.state.myStorageTab));

			this.setState({
				count: this.state.count + 1, storage: JSON.parse(localStorage.getItem('mes-sites')), index: null
			});
		}

		this.setState({ nameSite: '', urlSite: '', dateToDisplay: 'yyyy-MM-ddThh:mm' });
		this.refName.value = this.state.nameSite;
		this.refUrl.value = this.state.urlSite;
		this.refDate.value = this.state.dateToDisplay;

	}
	// TODO
	//  faire en sorte que la date s'affiche dans le input au premier click et pas au second
	handleClickItem = e => {
		const getIndex = e.target.getAttribute('id');

		this.setState({ index: getIndex });
		this.setState({
			nameSite: this.state.storage[getIndex].nameSite,
			urlSite: this.state.storage[getIndex].urlSite,
			dateToDisplay: this.state.storage[getIndex].dateToDisplay
		});

		this.refName.value = this.state.nameSite;
		this.refUrl.value = this.state.urlSite
		this.refDate.value = this.state.dateToDisplay;
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
						<InputDate
							triggerChanges={this.handleDateChanges}
							storage={this.state.dateToDisplay}
							reference={input => this.refDate = input}
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