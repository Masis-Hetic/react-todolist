import React from 'react';

export class Test extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			nameSite: '',
			urlSite: '',
			index: null,
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
		if (this.state.index !== null) {
			const storageIndex = this.state.storage;
			storageIndex[this.state.index].nameSite = this.state.nameSite;
			storageIndex[this.state.index].urlSite = this.state.urlSite;
			localStorage.setItem('mes-sites', JSON.stringify(storageIndex));
			this.setState({ index: null });
		}
		this.setState({ nameSite: '', urlSite: '' });
		this.refName.value = this.state.nameSite;
		this.refUrl.value = this.state.urlSite;
	}

	handleClickItem(e) {
		const getIndex = e.target.getAttribute('id');
		this.setState({ index: getIndex }, () => console.log(this.state.index));

		this.setState({ nameSite: this.state.storage[getIndex].nameSite, urlSite: this.state.storage[getIndex].urlSite });
		this.refName.value = this.state.nameSite;
		this.refUrl.value = this.state.urlSite
	}

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