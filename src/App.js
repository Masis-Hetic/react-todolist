import React, { Component } from 'react';

import Form from "./Components/Form/Form";
import List from "./Components/ListTodos/List";
import AsideNav from "./Components/AsideNav/AsideNav";

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
		storageArray: [],
		localStorage: JSON.parse( localStorage.getItem( 'tasks_todo' ) )
	};

	componentWillMount() {
		this.setState( { storageArray: JSON.parse( localStorage.getItem( 'tasks_todo' ) ) || [] } );
		if (!localStorage.getItem( 'tasks_todo' )) {
			localStorage.setItem( 'tasks_todo', JSON.stringify( this.state.storageArray ) );
			this.setState( { localStorage: [] } );
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
				taskValue: this.state.localStorage[ id ].taskValue,
				nameUrl: this.state.localStorage[ id ].urlSite,
				dateToDisplay: this.state.localStorage[ id ].dateToDisplay
			} );
		}
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
						if (!this.state.taskValue && !this.state.nameUrl) {
							return false;
						}

						if (!this.state.id) {
							this.state.localStorage.push( {
								taskValue: this.state.taskValue,
								urlSite: this.state.nameUrl,
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
							id: null, taskValue: '', nameUrl: '', date: date, dateToDisplay: date,
							toggleForm: this.state.toggleForm === 'close' ? 'open' : 'close'
						} );
					},
					handleClickItem: e => { this.handleClickOnItem( e ); },
					toggleFormOnClick: (e) => {
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
							// handleChangeUrl={ context.changeUrl }
							taskValue={ context.state.taskValue }
							// urlValue={ context.state.nameUrl }
							handleChangeDate={ context.changeDate }
							dateValue={ context.state.dateToDisplay }
							formProp={ context.state.toggleForm }
							handleToggleForm={ context.toggleFormOnClick }
						/>
					) }
				</MyContext.Consumer>

				<main>
					<MyContext.Consumer>
						{ context => (
							<AsideNav click={ context.toggleFormOnClick }/>
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
				</main>
			</MyProvider>
		);
	}
}

export default App;