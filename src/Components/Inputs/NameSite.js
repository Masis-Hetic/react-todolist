import React, { Component } from 'react';

class NameSite extends Component {
	handleChanges;
	nameValue;

	render() {
		return (
			<div className="wrapper">
				<textarea
					placeholder="Tâche à ajouter"
					onChange={ this.props.handleChanges }
					value={ this.props.nameValue }
				>
				</textarea>
				{/*<input*/ }
				{/*type="text"*/ }
				{/*placeholder="Nom du site"*/ }
				{/*onChange={ this.props.handleChanges }*/ }
				{/*value={ this.props.nameValue }*/ }
				{/*/>*/ }
			</div>
		);
	}
}

export default NameSite;