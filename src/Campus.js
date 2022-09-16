import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCampusById, studentUnregister } from './store';
import { Link } from 'react-router-dom';
import UpdateCampus from './UpdateCampus';

class Campus extends Component {

	componentDidMount() {
		const id = (this.props.match.params.id) * 1;
		this.props.getCampusById(id);
	}

	unregisterHandler = (student) => {
		student.campusId = null;
		const id = (this.props.match.params.id) * 1;
		this.props.studentUnregister(id, student);
	}

	render() {
		const { campus } = this.props.campuses;

		return (
			<div style={{marginTop: 20}}>
				{
					campus && (
						<>
							<div style={{marginBottom: 10}}>Detail page for {campus.name}</div>
							<div>
								<img src={campus.imageUrl}/>
							</div>
							<div>
								<label>Address: </label>
								<span>{campus.address}</span>
							</div>
							<div style={{marginBottom: 20}}>
								<label>Description: </label>
								<span>{campus.description}</span>
							</div>
							<UpdateCampus />
							<div style={{marginTop: 15}}>Enrollees:</div>
							{
								campus.students.map(student => (
									<div key={student.id}>
										<span className='sub_nav'><Link to={`/students/${student.id}`}>{student.firstName} {student.lastName}</Link></span>
										<button className="unregister" style={{marginLeft: 10}} onClick={() => this.unregisterHandler(student)}>Unregister</button>
									</div>
								))
							}
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
		getCampusById: (id) => {
			dispatch(fetchCampusById(id));
		},
		studentUnregister: (id, student) => {
			dispatch(studentUnregister(id, student))
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Campus);
