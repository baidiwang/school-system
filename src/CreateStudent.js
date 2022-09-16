import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createStudent } from './store'

class CreateStudent extends Component {

	handleSubmit = (e) => {
		e.preventDefault();
		const { firstname, lastname, email, campus } = e.target.elements;
		if (firstname.value.trim() === '') {
			alert('Firstname required!');
			return;
		}
		if (lastname.value.trim() === '') {
			alert('Lastname required!');
			return;
		}
		if (email.value.trim() === '') {
			alert('Email required!');
			return;
		}
		if (!/\S+@\S+\.\S+/.test(email.value)) {
			alert('invalid email!');
			return;
		}
		this.props.createStudent({
			firstName: firstname.value,
			lastName: lastname.value,
			email: email.value,
			campusId: campus.value,
		});
		firstname.value = '';
		lastname.value = '';
		email.value = '';
	}

	render() {
		const { campuses } = this.props;

		return (
			<form onSubmit={this.handleSubmit}>
				<div style={{marginBottom: 10}}>
					<input name="firstname" placeholder="Firstname" />
				</div>
				<div style={{marginBottom: 10}}>
					<input name="lastname" placeholder="Lastname" />
				</div>
				<div style={{marginBottom: 10}}>
					<input name="email" placeholder="Email" />
				</div>
				<div style={{marginBottom: 10}}>
					<select name="campus">
						{
							campuses.campuses.map(campus => <option key={campus.id} value={campus.id}>{campus.name}</option>)
						}
					</select>
				</div>
				<div>
					<button class='click'>Create</button>
				</div>
			</form>
		)
	}
}

const mapStateToProps = (state) => {
	return state;
}

const mapDispatchToProps = (dispatch) => {
	return {
		createStudent: (student) => {
			dispatch(createStudent(student))
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateStudent);
