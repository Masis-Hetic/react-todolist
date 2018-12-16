import React from 'react';
import './List.css';
import Countdown from "../CountDown/CountDown";
import { connect } from "react-redux";

class List extends React.Component {
	// triggerClick;

	render() {
		return (
			<ul>
				{this.props.storage &&
					this.props.storage.map((item, i) =>
					<li
						key={i}
						id={i}
						// onClick={this.props.triggerClick}
						onClick={this.props.toggleFormF}
					>
						<p className="no-click">{item.nameSite} : {item.urlSite}</p>
						<div className="no-click"><Countdown date={this.props.storage[i].date}/></div>
					</li>
					)
				}
			</ul>
		);
	}
}

const mapStateToProps = (state) => {
	return { toggleForm: state.toggleForm };
};

const mapDispatchToProps = (dispatch) => {
	return { toggleFormF: () => dispatch( {type: 'OPEN_CLOSE'} ) }
};

export default connect(mapStateToProps, mapDispatchToProps)(List);