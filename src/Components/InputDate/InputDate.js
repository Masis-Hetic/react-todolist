import React from 'react';

export class InputDate extends React.Component {
	reference;

	render() {
		return (
			<input
				type="datetime-local"
				ref={this.props.reference}
				onChange={this.props.triggerChanges}
				value={this.props.storage}
			/>
		)
		}
}