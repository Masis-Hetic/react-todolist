import React, { Component } from 'react';

import './List.css';
import Countdown from '../CountDown/CountDown';

class List extends Component {
	click;

	render() {
		return (
			<div className="list-wrapper">
				<h2>Tâches à faire</h2>
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
								<svg style={ { width: 24, height: 24 } } viewBox="0 0 24 24">
									<path fill="#3c6382" style={ { opacity: 0.8 } }
									      d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z"/>
								</svg>
							</div>
							<p className="task" id={ i }>{ item.taskValue }</p>
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