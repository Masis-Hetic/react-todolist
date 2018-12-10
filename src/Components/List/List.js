import React from 'react';
import './List.css';
import Countdown from "../CountDown/CountDown";

export class List extends React.Component {
	triggerClick;

	render() {
		return (
			<ul>
				{this.props.storage &&
					this.props.storage.map((item, i) =>
					<li
						key={i}
						id={i}
						onClick={this.props.triggerClick}
					>
						<p className="no-click">{item.nameSite} : {item.urlSite}</p>
						<p className="no-click"><Countdown date={this.props.storage[i].date}/></p>
					</li>
					)
				}
			</ul>
		);
	}
}