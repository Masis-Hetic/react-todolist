import React from 'react';

export class InputUrl extends React.Component {
	render() {
		return (
			<input
				type="text"
				placeholder="url"
				value={this.props.storage}
				onChange={this.props.triggerChanges}
				ref={this.props.reference}
			/>
		)
	}
}