import React, { Component } from 'react';

import Form from "./Components/Form/Form";
import List from "./Components/ListTodos/List";
import AsideNav from "./Components/AsideNav/AsideNav";
import ListSites from "./Components/ListSites/ListSites";

const MyContext = React.createContext();

class MyProvider extends Component {
	state = {
		nameSite: '',
		nameUrl: '',
		taskValue: '',
		date: 'yyyy-MM-ddThh:mm',
		dateToDisplay: 'yyyy-MM-ddThh:mm',
		id: null,
		toggleForm: 'open',
		taskOrSite: '',
		storageArray: [],
		storageArraySite: [],
		localStorage: JSON.parse( localStorage.getItem( 'tasks_todo' ) ),
		localStorageSites: JSON.parse( localStorage.getItem( 'sites' ) )
	};

	componentWillMount() {
		this.setState( {
			storageArray: JSON.parse( localStorage.getItem( 'tasks_todo' ) ) || [],
			storageArraySite: JSON.parse( localStorage.getItem( 'sites' ) ) || []
		} );
		if (!localStorage.getItem( 'tasks_todo' )) {
			localStorage.setItem( 'tasks_todo', JSON.stringify( this.state.storageArray ) );
			this.setState( { localStorage: [] } );
		}
		if (!localStorage.getItem( 'sites' )) {
			localStorage.setItem( 'sites', JSON.stringify( this.state.storageArraySite ) );
			this.setState( { localStorageSites: [] } );
		}
	}

	handleClickOnItem = e => {
		const id = e.target.getAttribute( 'id' );
		const todelete = e.target.getAttribute( 'todelete' );

		if (todelete) {
			const myStorage = this.state.localStorage.filter( item => item !== this.state.localStorage[ id ] );
			localStorage.setItem( 'tasks_todo', JSON.stringify( myStorage ) );
			this.setState( { localStorage: myStorage } );
		} else {
			this.setState( {
				toggleForm: 'close',
				id: id,
				taskOrSite: 'task',
				taskValue: this.state.localStorage[ id ].taskValue,
				nameUrl: this.state.localStorage[ id ].urlSite,
				dateToDisplay: this.state.localStorage[ id ].dateToDisplay
			} );
		}
	};

	handleClickEdit = (e) => {
		const id = e.target.getAttribute( 'id' );

		this.setState( {
			id: id,
			taskOrSite: 'site',
			toggleForm: this.state.toggleForm === 'close' ? 'open' : 'close',
			nameSite: this.state.localStorageSites[ id ].nameSite,
			nameUrl: this.state.localStorageSites[ id ].urlSite
		} );
	};

	handleClickDelete = e => {
		const id = e.target.getAttribute( 'class' );

		const myStorage = this.state.localStorageSites.filter( item => item !== this.state.localStorageSites[ id ] );
		localStorage.setItem( 'sites', JSON.stringify( myStorage ) );
		this.setState( { localStorageSites: myStorage } );
	};

	render() {
		return (
			<MyContext.Provider
				value={ {
					state: this.state,
					handleClickOnItem: this.handleClickOnItem,
					changeTask: e => this.setState( { taskValue: e.target.value } ),
					changeUrl: e => this.setState( { nameUrl: e.target.value } ),
					changeName: e => this.setState( { nameSite: e.target.value } ),
					changeDate: e => this.setState( { date: Date.parse( e.target.value ), dateToDisplay: e.target.value } ),
					submitForm: e => {
						e.preventDefault();
						if (this.state.taskOrSite === 'task') {
							if (!this.state.taskValue) {
								return false;
							}

							if (!this.state.id) {
								this.state.localStorage.push( {
									taskValue: this.state.taskValue,
									date: this.state.date,
									dateToDisplay: this.state.dateToDisplay
								} );
							} else {
								const myStorage = this.state.localStorage;
								myStorage[ this.state.id ].taskValue = this.state.taskValue;
								myStorage[ this.state.id ].urlSite = this.state.nameUrl;
								myStorage[ this.state.id ].dateToDisplay = this.state.dateToDisplay;
								myStorage[ this.state.id ].date = Date.parse( this.state.dateToDisplay );
								this.setState( { localStorage: myStorage } );
							}

							const myTab = this.state.localStorage.sort( ( a, b ) => a.date - b.date );
							localStorage.setItem( 'tasks_todo', JSON.stringify( myTab ) );

							const date = 'yyyy-MM-ddThh:mm';
							this.setState( {
								id: null, taskValue: '', date: date, dateToDisplay: date, toggleForm: this.state.toggleForm === 'close' ? 'open' : 'close'
							} );
						}

						if (this.state.taskOrSite === 'site') {
							if (!this.state.nameUrl && !this.state.nameSite) { return false; }

							if (!this.state.id) {
								this.state.localStorageSites.push( {
									nameSite: this.state.nameSite,
									urlSite: this.state.nameUrl
								} );
							} else {
								const myStorage = this.state.localStorageSites;
								myStorage[ this.state.id ].nameSite = this.state.nameSite;
								myStorage[ this.state.id ].urlSite = this.state.nameUrl;
								this.setState({ localStorageSites: myStorage });
							}
							this.setState({ toggleForm: this.state.toggleForm === 'close' ? 'open' : 'close' });
							localStorage.setItem( 'sites', JSON.stringify( this.state.localStorageSites ) );
						}
					},
					handleClickItem: e => { this.handleClickOnItem( e ); },
					handleClickEdit: e => { e.stopPropagation(); this.handleClickEdit(e) },
					handleClickDelete: e => { e.stopPropagation(); this.handleClickDelete(e) },
					toggleFormOnClick: (e) => {
						if (e.target.getAttribute( 'class' )) {
							this.setState({ taskOrSite: e.target.getAttribute('class') } );
						}
						if (e.target.getAttribute( 'class' ) === 'close_btn') {
							this.setState({ taskValue: '', dateToDisplay: 'yyyy-MM-ddThh:mm', nameSite: '', nameUrl: '', id: null});
						}
						this.setState( { toggleForm: this.state.toggleForm === 'close' ? 'open' : 'close' } );
					}
				} }
			>
				{ this.props.children }
			</MyContext.Provider>
		)
	};
}

class App extends Component {
	render() {
		return (
			<MyProvider>
				<MyContext.Consumer>
					{ context => (
						<Form
							validForm={ context.submitForm }
							handleChangeTask={ context.changeTask }
							handleChangeUrl={ context.changeUrl }
							taskValue={ context.state.taskValue }
							urlValue={ context.state.nameUrl }
							handleChangeDate={ context.changeDate }
							nameValue={ context.state.nameSite }
							handleChangeName={ context.changeName }
							dateValue={ context.state.dateToDisplay }
							formProp={ context.state.toggleForm }
							handleToggleForm={ context.toggleFormOnClick }
							form={ context.state.taskOrSite }
						/>
					) }
				</MyContext.Consumer>

				<main>
					<MyContext.Consumer>
						{ context => (
							<AsideNav
								click={ context.toggleFormOnClick }
								task={ context.state.taskOrSite }
							/>
						) }
					</MyContext.Consumer>

					<MyContext.Consumer>
						{ context => (
							<List
								storage={ context.state.localStorage }
								formProp={ context.state.toggleForm }
								click={ e => context.handleClickItem( e ) }
							/>
						) }
					</MyContext.Consumer>

					<MyContext.Consumer>
						{ context => (
							<ListSites
								storage={ context.state.localStorageSites }
								formProp={ context.state.toggleForm }
								edit={ context.handleClickEdit }
								deleteItem={ context.handleClickDelete }
							/>
						) }
					</MyContext.Consumer>
				</main>
			</MyProvider>
		);
	}
}

export default App;