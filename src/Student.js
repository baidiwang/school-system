import React, { Component } from 'react';
import { fetchStudentById } from './store';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import UpdateStudent from './UpdateStudent'

class Student extends Component {

	componentDidMount() {
		const id =(this.props.match.params.id) * 1;
		this.props.getStudentById(id);
	}

	render() {
		const { student } = this.props.students;

		return (
			<div style={{marginTop: 20}}>
				{
					student && (
						<>
							<div>Detail page for {student.firstName} {student.lastName}</div>
							<div>{student.firstName} {student.lastName} - attends <span className='sub_nav'><Link to={`/campuses/${student.campusId}`}>{student.campus.name}</Link></span></div>
							<div>
								<img src={student.imageUrl}/>
							</div>
							<div>
								<label>Email: </label>
								<span>{student.email}</span>
							</div>
							<div style={{marginBottom: 20}}>
								<label>GPA: </label>
								<span>{student.gpa}</span>
							</div>
							<UpdateStudent />
						</>
					)
				}
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return state;
}

const mapDispatchToProps = (dispatch) => {
	return {
		getStudentById: (id) => {
			dispatch(fetchStudentById(id));
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Student);
