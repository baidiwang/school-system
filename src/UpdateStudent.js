import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updateStudent } from './store'

class UpdateStudent extends Component {

	handleSubmit = (e) => {
		e.preventDefault();
		const { firstname, lastname, email, imageUrl, gpa, campus } = e.target.elements;
		if (firstname.value.trim() === '') {
			alert('firstname required!');
			return;
		}
		if (lastname.value.trim() === '') {
			alert('lastname required!');
			return;
		}
		if (email.value.trim() === '') {
			alert('email required!');
			return;
		}
        //not sure about this if statement and got from google, but it works
		if (!/\S+@\S+\.\S+/.test(email.value)) {
			alert('invalid email!');
			return;
		}
		this.props.updateStudent({
			id: this.props.students.student.id,
			firstName: firstname.value,
			lastName: lastname.value,
			email: email.value,
			imageUrl: imageUrl.value,
			gpa: gpa.value,
			campusId: campus.value,
		});
		alert('update successful!');
	}

	render() {
		const { campuses, students } = this.props;

		return (
			<form onSubmit={this.handleSubmit}>
				<div style={{marginBottom: 10}}>
					<input name="firstname" placeholder="firstname" defaultValue={students.student.firstName} />
				</div>
				<div style={{marginBottom: 10}}>
					<input name="lastname" placeholder="lastname" defaultValue={students.student.lastName} />
				</div>
				<div style={{marginBottom: 10}}>
					<input name="email" placeholder="email" defaultValue={students.student.email} />
				</div>
				<div style={{marginBottom: 10}}>
					<input name="imageUrl" placeholder="image url" defaultValue={students.student.imageUrl} />
				</div>
				<div style={{marginBottom: 10}}>
					<input name="gpa" placeholder="gpa" defaultValue={students.student.gpa} />
				</div>
				<div style={{marginBottom: 10}}>
					<select name="campus" defaultValue={students.student.campusId}>
						{
							campuses.campuses.map(campus => <option key={campus.id} value={campus.id}>{campus.name}</option>)
						}
					</select>
				</div>
				<div>
					<button class="click">Update</button>
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
		updateStudent: (student) => {
			dispatch(updateStudent(student))
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateStudent);
