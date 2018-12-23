import React, { Component } from 'react';
import NameSite from "../Inputs/NameSite";
import UrlSite from "../Inputs/UrlSite";
import InputDate from "../Inputs/InputDate";

class Form extends Component {
	handleChangeName;
	handleChangeUrl;
	validForm;
	urlValue;
	handleChangeDate;

	render() {
		return (
			<form onSubmit={ this.props.validForm }>
				<NameSite
					handleChanges={ this.props.handleChangeName }
					nameValue={ this.props.nameValue }
				/>
				<UrlSite
					handleChanges={ this.props.handleChangeUrl }
					urlValue={ this.props.urlValue }
				/>
				<InputDate
					handleChanges={ this.props.handleChangeDate }
					dateValue={ this.props.dateValue }
				/>

				<div className="wrapper">
					<input type="submit"/>
				</div>
			</form>
		)
	}
}

export default Form;