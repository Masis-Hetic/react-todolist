import React, { Component } from 'react';

class NameSite extends Component {
	render() {
		return (
			<div className="wrapper">
				<input
					type="text"
					placeholder="Nom du site"
					onChange={ this.props.handleChanges }
					value={ this.props.nameValue }
					className="site-name"
				/>
			</div>
		);
	}
}

export default NameSite;