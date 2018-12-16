import React from 'react';
import List from "../List/List";
import './Form.css';
import { InputName } from "../InputName/InputName";
import { InputUrl } from "../InputUrl/InputUrl";
import { InputDate } from "../InputDate/InputDate";

import { connect } from 'react-redux';

export class Form extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			nameSite: '',
			urlSite: '',
			index: null,
			count: 0,
			dateToDisplay: 'yyyy-MM-ddThh:mm',
			date: 'yyyy-MM-ddThh:mm',
			myStorageTab: [],
			storage: JSON.parse(localStorage.getItem('mes-sites'))
		};
	}

	componentWillMount() { this.setState({ myStorageTab: JSON.parse(localStorage.getItem('mes-sites')) || [] });	}
	handleNameChanges = e => { this.setState({ nameSite: e.target.value }); };
	handleUrlChanges = e => {	this.setState({ urlSite: e.target.value });	};
	handleDateChanges = e => { this.setState( { dateToDisplay: e.target.value, date: Date.parse(e.target.value) }); }

	handleSubmit = e => {
		e.preventDefault();

		if ((this.state.nameSite !== '' && this.state.urlSite !== '' && this.state.date !== 'yyyy-MM-ddThh:mm') && this.state.index === null) {
			this.state.myStorageTab.push({
				nameSite: this.state.nameSite,
				urlSite: this.state.urlSite,
				dateToDisplay: this.state.dateToDisplay,
				date: this.state.date
			});

			let myTab = this.state.myStorageTab;
			myTab.sort(function(a, b) { return a.date - b.date; });

			localStorage.setItem('mes-sites', JSON.stringify(myTab));

			this.setState({ count: this.state.count + 1, storage: JSON.parse(localStorage.getItem('mes-sites')) });
		}

		if (this.state.index !== null) {
			const storageTab = this.state.myStorageTab;
			storageTab[this.state.index].nameSite = this.state.nameSite;
			storageTab[this.state.index].urlSite = this.state.urlSite;
			storageTab[this.state.index].dateToDisplay = this.state.dateToDisplay
			storageTab[this.state.index].date = this.state.date;

			this.setState({ myStorageTab: storageTab });

			let myTab = this.state.myStorageTab;
			myTab.sort(function(a, b) { return a.date - b.date; });

			localStorage.setItem('mes-sites', JSON.stringify(myTab));

			this.setState({
				count: this.state.count + 1, storage: JSON.parse(localStorage.getItem('mes-sites')), index: null
			});
		}

		this.setState({ nameSite: '', urlSite: '', dateToDisplay: 'yyyy-MM-ddThh:mm', date: 'yyyy-MM-ddThh:mm' });
		this.refName.value = this.state.nameSite;
		this.refUrl.value = this.state.urlSite;
		this.refDate.value = this.state.dateToDisplay;

	}

	handleClickItem = e => {
		const getIndex = e.target.getAttribute('id');

		this.setState({ index: getIndex });
		this.setState({
			nameSite: this.state.storage[getIndex].nameSite,
			urlSite: this.state.storage[getIndex].urlSite,
			dateToDisplay: this.state.storage[getIndex].dateToDisplay,
			date: this.state.storage[getIndex].date
		});

		this.refName.value = this.state.nameSite;
		this.refUrl.value = this.state.urlSite;
		this.refDate.value = this.state.dateToDisplay;
	};


	render() {
		return (
			<div className="form-wrapper">
				<form
					className={this.props.toggleForm}
					onSubmit={this.handleSubmit}>
					<div className="close-menu" onClick={this.props.toggleFormF }>
						<svg className="width:24px;height:24px" viewBox="0 0 24 24">
							<path fill="#000000"
							      d="M12,2C17.53,2 22,6.47 22,12C22,17.53 17.53,22 12,22C6.47,22 2,17.53 2,12C2,6.47
							      6.47,2 12,2M15.59,7L12,10.59L8.41,7L7,8.41L10.59,12L7,15.59L8.41,17L12,13.41L15.59,17L17,15.59L13.41,12L17,8.41L15.59,7Z"
							/>
						</svg>
					</div>

					<div className="input-wrapper">
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
							<input type="submit" onClick={this.closeForm}/>
						</div>
					</div>
				</form>

				<div className="list-wrapper">
					{ this.state.count >= 0 &&
						<List
							storage={this.state.storage}
							// triggerClick={this.handleClickItem}
						// openForm={this.props.openOrCloseForm}
						// openClose={this.state.openCloseForm}
						/>
					}
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => { return { toggleForm: state.toggleForm }; };

const mapDispatchToProps = (dispatch) => { return { toggleFormF: () => dispatch( {type: 'OPEN_CLOSE'} ) } };

export default connect(mapStateToProps, mapDispatchToProps)(Form);