import React from 'react';
import './List.css';
import Countdown from "../CountDown/CountDown";

export class List extends React.Component {
	triggerClick;

	render() {
		console.log(this.props.storage);
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
						<div className="no-click"><Countdown date={this.props.storage[i].date}/></div>
					</li>
					)
				}
			</ul>
		);
	}
}