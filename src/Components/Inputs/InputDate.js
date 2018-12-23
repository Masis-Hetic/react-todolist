import React, { Component } from 'react';

class InputDate extends Component {
	dateValue;

	render() {
		return (
			<div className="wrapper">
				<input
					type="datetime-local"
					onChange={ this.props.handleChanges }
					value={ this.props.dateValue }
				/>
			</div>
		);
	}
}

export default InputDate;