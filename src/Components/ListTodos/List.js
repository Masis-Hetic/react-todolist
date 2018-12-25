import React, { Component } from 'react';

import './List.css';
import Countdown from '../CountDown/CountDown';

class List extends Component {
	constructor(props) {
		super(props);
		this.state = {
			date: ''
		};
	}
	click;
	
	componentWillMount() {
		this.setState({ date: this.props.storage });
	}

	render() {
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
						<button
							id={ i }
							todelete="true"
							className="button"
						>
							💩👻
						</button>
						<p>{ item.nameSite }</p>
						<p>{ item.urlSite }</p>
						<p>
							{
								this.props.storage.length < this.state.date.length ? null : <Countdown date={ this.state.date[ i ].date }/>
							}
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