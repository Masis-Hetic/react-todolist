import React, { Component } from 'react';

import './AsideNav.css';
import planet from '../../img/web.png'

class AsideNav extends Component {
	render() {
		return (
			<aside>
				<nav>
					<ul>
						<li
							onClick={ this.props.click }
							className="task"
						>
							<svg className="task" style={ { width: 24, height: 24 } } viewBox="0 0 24 24">
								<path className="task" fill="#ffffff" d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z"/>
							</svg>
						</li>
						<li
							onClick={ this.props.click }
							className="site"
						>
							<img src={planet} alt=""/>
							{/*<svg className="site" style={ { width: 24, height: 24 } } viewBox="0 0 24 24">*/}
								{/*<path className="site" fill="#ffffff" d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z"/>*/}
							{/*</svg>*/}
						</li>
					</ul>
				</nav>
			</aside>
		);
	}
}

export default AsideNav;