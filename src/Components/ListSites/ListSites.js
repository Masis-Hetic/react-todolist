import React, { Component } from 'react';
import './ListSite.css';

class ListSites extends Component {
	edit;
	deleteItem;

	controlUrls = sitesUrlValue => {
		if (sitesUrlValue.slice(0, 12) === "https://www.") { sitesUrlValue = sitesUrlValue.slice(12); }
		if (sitesUrlValue.slice(0, 11) === "http://www.") { sitesUrlValue = sitesUrlValue.slice(11); }
		if (sitesUrlValue.slice(0, 8) === "https://") { sitesUrlValue = sitesUrlValue.slice(8); }
		if (sitesUrlValue.slice(0, 7) === "http://") { sitesUrlValue = sitesUrlValue.slice(7); }
		if (sitesUrlValue.slice(0, 4) === 'www.') { sitesUrlValue = sitesUrlValue.slice(4); }

		return sitesUrlValue;
	};

	render() {
		return (
			<div className="list-wrapper__sites">
				<h2>Sites favoris</h2>
				<ul className="list-container__sites">
					{ this.props.storage &&
					this.props.storage.map( ( item, i ) =>
						<li
							key={ i }
							id={ i }
						>
							<a href={`http://${item.urlSite}`} key={ i } target="_blank">
								<img
									key={ i }
									src={ `http://logo.clearbit.com/${ this.controlUrls(item.urlSite) }` }
									alt=""
								/>
								<p className="name-site">{ item.nameSite }</p>
							</a>
							<span
								onClick={ this.props.deleteItem }
								className={ i }
								role="delete"
							>
								<svg className={ i } style={ { width: 20, height: 20 } } viewBox="0 0 24 24">
									<path className={ i } fill="#3c6382" style={ { opacity: .8 } }
									      d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z"/>
								</svg>
							</span>
							<span
								onClick={ this.props.edit }
								className="site"
								role="edit"
								id={ i }
							>
								..
							</span>
						</li>
					) }
				</ul>
			</div>
		);
	}
}

export default ListSites;