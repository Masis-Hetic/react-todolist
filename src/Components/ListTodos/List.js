import React, { Component } from 'react';

import './List.css';
import Countdown from '../CountDown/CountDown';

class List extends Component {
	click;

	render() {
		return (
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
						<p><Countdown date={ this.props.storage[ i ].date }/></p>
					</li>
				)
				}
			</ul>
		);
	}
}

export default List;