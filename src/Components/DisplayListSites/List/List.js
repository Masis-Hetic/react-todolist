import React from 'react';

export class List extends React.Component {
	onSubmit;
	triggerClick;

	render() {
		return (
			<ul className="list">
				{
					this.props.onSubmit &&
					this.props.onSubmit.map((item, i) =>
						<li
							key={i}
							id={i}
							onClick={this.props.triggerClick}
						>
							<span className={i}>{item.nom}</span>, <span className={i}>{item.url}</span>
						</li>
					)
				}
			</ul>
		);
	}
}