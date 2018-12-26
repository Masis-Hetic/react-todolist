import React, { Component } from 'react';

class AddTask extends Component {
	handleChanges;
	taskValue;

	render() {
		return (
			<div className="wrapper">
				<textarea
					placeholder="Tâche à ajouter"
					onChange={ this.props.handleChanges }
					value={ this.props.taskValue }
				>
				</textarea>
			</div>
		);
	}
}

export default AddTask;