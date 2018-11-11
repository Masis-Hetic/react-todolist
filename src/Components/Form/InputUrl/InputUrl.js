import React from 'react';

export class InputUrl extends React.Component {
	render() {
		return <input type="text" placeholder="url" onChange={this.props.onChange} value={this.props.url} />
	}
}