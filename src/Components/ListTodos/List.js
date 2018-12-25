import React, { Component } from 'react';

import './List.css';
import Countdown from '../CountDown/CountDown';

class List extends Component {
	constructor( props ) {
		super( props );
		this.state = {
			date: ''
		};
	}

	click;

	// componentWillMount() {
	// 	this.setState( { date: this.props.storage } );
	// }

	// componentWillReceiveProps( nextProps, nextContext ) {
	// 	// console.log( 'this.props.storage => ', this.props.storage );
	// 	// console.log( 'nextProps.storage => ', nextProps.storage );
	// 	if (nextProps.storage !== this.props.storage) { this.setState( { date: nextProps.storage } ); }
	// }

	render() {
		console.log( this.state.date );
		return (
			<div className="list-wrapper">
				<ul className="list-container">
					{ this.props.storage &&
					this.props.storage.map( ( item, i ) =>
						<li
							key={ i }
							id={ i }
							onClick={ this.props.click }
						>
							<div
								id={ i }
								todelete="true"
								className="button"
							>
								<svg style={{width:24, height:24}} viewBox="0 0 24 24">
									<path fill="#000" d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" />
								</svg>
							</div>
							<p>{ item.nameSite }</p>
							{/*<p>{ item.urlSite }</p>*/}
							<p>
								<Countdown date={ this.props.storage[ i ].date }/>
							</p>
						</li>
					)
					}
				</ul>
			</div>
		);
	}
}

export default List;