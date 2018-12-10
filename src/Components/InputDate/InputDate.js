import React from 'react';

export class InputDate extends React.Component {
	render() {
		return (
			<input
				type="datetime-local"
				ref={this.props.reference}
				onChange={this.props.triggerChanges}
				defaultValue={this.props.storage}
			/>
		)
		}
}