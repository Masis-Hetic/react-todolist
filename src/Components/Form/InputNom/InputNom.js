import React from 'react';

export class InputNom extends React.Component {
	render() {
		return <input
			onChange={this.props.selectDefaultValue}
			defaultValue={this.props.defaultValue}
			type="text"
			placeholder="nom"
		/>
	}
}