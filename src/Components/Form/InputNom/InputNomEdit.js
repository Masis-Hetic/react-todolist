import React from 'react';

export class InputNomEdit extends React.Component {
	constructor(props) {
		super(props);
		this.state = { onChange: this.props.onChange };
		// this.handleChanges = this.handleChanges.bind(this);
	}
	onChange;
	// handleChanges(e) {
	// 	this.setState({ onChange: e.target.value }, () => console.log(this.state.onChange));
	// }

	render() {
		return <input
			type="text"
			onChange={this.state.onChange}
		  defaultValue={this.props.value}
			placeholder="nomnom"
		/>
	}
}