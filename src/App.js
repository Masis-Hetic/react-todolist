import React, { Component } from 'react';

import Form from "./Components/Form/Form";
import List from "./Components/ListTodos/List";
import AsideNav from "./Components/AsideNav/AsideNav";

const MyContext = React.createContext();

class MyProvider extends Component {
	state = {
		nameSite: '',
		nameUrl: '',
		date: 'yyyy-MM-ddThh:mm',
		dateToDisplay: 'yyyy-MM-ddThh:mm',
		id: null,
		toggleForm: 'open',
		storageArray: [],
		localStorage: JSON.parse( localStorage.getItem( 'todo_sites' ) )
	};

	// [{"nameSite":"zheriu","urlSite":"oijoij","date":1546646460000,"dateToDisplay":"2019-01-05T01:01"},{"nameSite":"porgjkroeijoij","urlSite":"eroijgoreijgiore","date":1546739760000,"dateToDisplay":"2019-01-06T02:56"},{"nameSite":"rzeareza","urlSite":"eza","date":1548979320000,"dateToDisplay":"2019-02-01T01:02"},{"nameSite":"rzeapiojr","urlSite":"oijroizejroiez","date":1580605320000,"dateToDisplay":"2020-02-02T02:02"}, {"nameSite":"rzeapiojr","urlSite":"oijroizejroiez","date":1580605320000,"dateToDisplay":"2020-02-02T02:02"}, {"nameSite":"rzeapiojr","urlSite":"oijroizejroiez","date":1580605320000,"dateToDisplay":"2020-02-02T02:02"}, {"nameSite":"rzeapiojr","urlSite":"oijroizejroiez","date":1580605320000,"dateToDisplay":"2020-02-02T02:02"}, {"nameSite":"rzeapiojr","urlSite":"oijroizejroiez","date":1580605320000,"dateToDisplay":"2020-02-02T02:02"}]
	componentWillMount() {
		this.setState( { storageArray: JSON.parse( localStorage.getItem( 'todo_sites' ) ) || [] } );
		if (!localStorage.getItem( 'todo_sites' )) {
			localStorage.setItem( 'todo_sites', JSON.stringify( this.state.storageArray ) );
			this.setState( { localStorage: [] } );
		}
	}

	handleClickOnItem = e => {
		const id = e.target.getAttribute( 'id' );
		const todelete = e.target.getAttribute( 'todelete' );

		if (todelete) {
			const myStorage = this.state.localStorage.filter( item => item !== this.state.localStorage[ id ] );
			localStorage.setItem( 'todo_sites', JSON.stringify( myStorage ) );
			this.setState( { localStorage: myStorage } );
		} else {
			this.setState( {
				toggleForm: 'close',
				id: id,
				nameSite: this.state.localStorage[ id ].nameSite,
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
					changeName: e => this.setState( { nameSite: e.target.value } ),
					changeUrl: e => this.setState( { nameUrl: e.target.value } ),
					changeDate: e => this.setState( { date: Date.parse( e.target.value ), dateToDisplay: e.target.value } ),
					submitForm: e => {
						e.preventDefault();
						if (!this.state.nameSite && !this.state.nameUrl) {
							return false;
						}

						if (!this.state.id) {
							this.state.localStorage.push( {
								nameSite: this.state.nameSite,
								urlSite: this.state.nameUrl,
								date: this.state.date,
								dateToDisplay: this.state.dateToDisplay
							} );
						} else {
							const myStorage = this.state.localStorage;
							myStorage[ this.state.id ].nameSite = this.state.nameSite;
							myStorage[ this.state.id ].urlSite = this.state.nameUrl;
							myStorage[ this.state.id ].dateToDisplay = this.state.dateToDisplay;
							myStorage[ this.state.id ].date = Date.parse( this.state.dateToDisplay );
							this.setState( { localStorage: myStorage } );
						}

						const myTab = this.state.localStorage.sort( ( a, b ) => a.date - b.date );
						localStorage.setItem( 'todo_sites', JSON.stringify( myTab ) );

						const date = 'yyyy-MM-ddThh:mm';
						this.setState( {
							id: null, nameSite: '', nameUrl: '', date: date, dateToDisplay: date,
							toggleForm: this.state.toggleForm === 'close' ? 'open' : 'close'
						} );
					},
					handleClickItem: e => { this.handleClickOnItem( e ); },
					toggleFormOnClick: () => {
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
							handleChangeName={ context.changeName }
							handleChangeUrl={ context.changeUrl }
							nameValue={ context.state.nameSite }
							urlValue={ context.state.nameUrl }
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