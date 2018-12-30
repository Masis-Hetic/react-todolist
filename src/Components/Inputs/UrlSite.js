import React, { Component } from 'react';

class UrlSite extends Component {
	render() {
		return (
			<div className="wrapper">
				<input
					type="text"
					placeholder="Url du site"
					onChange={ this.props.handleChanges }
					value={ this.props.urlValue }
					className="site-url"
				/>
			</div>
		);
	}
}

export default UrlSite;