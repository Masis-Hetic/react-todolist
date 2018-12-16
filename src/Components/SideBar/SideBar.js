import React from 'react';
import './SideBar.css';
import plus from './img/plus.png';
import { connect } from "react-redux";

class SideBar extends React.Component {

	render() {
		return (
			<aside>
				<nav>
					<ul>
						<li onClick={this.props.toggleFormF}><img src={plus} alt="" /></li>
					</ul>
				</nav>
			</aside>
		)
	}
}

const mapStateToProps = (state) => {
	return { toggleForm: state.toggleForm };
};

const mapDispatchToProps = (dispatch) => {
	return { toggleFormF: () => dispatch( {type: 'OPEN_CLOSE'} ) }
};

export default connect(mapStateToProps, mapDispatchToProps)(SideBar);