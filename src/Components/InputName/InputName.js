import React from 'react';

export class InputName extends React.Component {
	triggerChanges;
	reference;

	render() {
		return (
			<input
				type="text"
				placeholder="nom"
				value={this.props.storage}
				onChange={this.props.triggerChanges}
				ref={this.props.reference}
			/>
		)
	}
}