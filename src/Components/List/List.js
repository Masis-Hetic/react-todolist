import React from 'react';
import './List.css';

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
						{item.nameSite} : {item.urlSite}
					</li>
					)
				}
			</ul>
		);
	}
}