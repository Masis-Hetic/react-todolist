import React from 'react';

export class Test extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			nameSite: '',
			urlSite: '',
			myStorageTab: [],
			storage: JSON.parse(localStorage.getItem('mes-sites'))
		};
		Test.handleSubmit = Test.handleSubmit.bind(this);
		this.handleNameChanges = this.handleNameChanges.bind(this);
		this.handleUrlChanges = this.handleUrlChanges.bind(this);
		this.handleClickItem = this.handleClickItem.bind(this);
	}

	componentWillMount() { this.setState({ myStorageTab: JSON.parse(localStorage.getItem('mes-sites')) || [] });	}
	handleNameChanges(e) { this.setState({ nameSite: e.target.value });	}
	handleUrlChanges(e) {	this.setState({ urlSite: e.target.value });	}

	static handleSubmit(e) {
		e.preventDefault();
		if (this.state.nameSite !== '' && this.state.urlSite !== '') {
			this.state.myStorageTab.push({ nameSite: this.state.nameSite, urlSite: this.state.urlSite });
			localStorage.setItem('mes-sites', JSON.stringify(this.state.myStorageTab));
		}
	}

	handleClickItem(e) {
		const getIndex = e.target.getAttribute('id');
		this.setState({ nameSite: this.state.storage[getIndex].nameSite, urlSite: this.state.storage[getIndex].urlSite });
		this.refName.value = this.state.nameSite;
		this.refUrl.value = this.state.urlSite
	}
	// todo utiliser un booleen pour faire le switch entre nouvelle entrée dans le storage, et mise à jour dans le storage
	render() {
		return (
			<div>
				<form onSubmit={Test.handleSubmit}>

					<div className="wrapper">
						<input
							type="text"
							placeholder="nom"
							value={this.state.nameSite}
							onChange={this.handleNameChanges}
							ref={input => this.refName = input}
						/>
					</div>

					<div className="wrapper">
						<input
							type="text"
							placeholder="url"
							onChange={this.handleUrlChanges}
							value={this.state.urlSite}
							ref={(input) => this.refUrl = input}
						/>
					</div>

					<div className="wrapper">
						<input type="submit" />
					</div>

				</form>

				<ul>
					{this.state.storage.length > 0 &&
						this.state.storage.map((item, i) =>
							<li
								key={i}
								id={i}
								onClick={this.handleClickItem}
							>
								{item.nameSite} : {item.urlSite}
							</li>
						)
					}
				</ul>
			</div>
		);
	}
}