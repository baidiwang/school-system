import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import CreateStudent from './CreateStudent';
import { deleteStudent } from './store'

class Students extends Component {
	state = {
		page: 1,
		pageSize: 10,
		totalSize: 0
	}

	componentDidMount() {
		this.setState({
			totalSize: this.props.students.students.length
		})
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.students.students.length !== this.state.totalSize) {
			this.setState({
				totalSize: nextProps.students.students.length
			});
		}
	}


	onPageChange = (page) => {
		this.setState({
			page
		});
	}

	render() {
		const { students } = this.props;
		const { totalSize, pageSize, page } = this.state;
		// confused here
		const pageStudents = students.students.slice((page - 1) * 10, (page - 1) * 10 + 10);

		return (
			<div>
				<ul>
					{
						pageStudents.map(student => (
							<li key={student.id} style={{marginBottom: 20}}>
								<span>{student.firstName} {student.lastName} - attends {student.campus ? student.campus.name : 'None'}</span>
								<div>
								<span className='sub_nav'><Link to={`/students/${student.id}`}>Details for {student.firstName} {student.lastName}</Link></span>
									<button style={{marginLeft: 10}} onClick={() => this.props.deleteStudent(student.id)}>x</button>
								</div>
							</li>
						))
					}
				</ul>
				<div className="pagination">
					{
						[...Array(Math.ceil(totalSize / pageSize))].map((item, index) => (
							<button class='click_small' key={index} disabled={page === index + 1} onClick={() => this.onPageChange(index + 1)}>{index + 1}</button>
						))
					}
				</div>
				<CreateStudent />
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return state;
}

const mapDispatchToProps = (dispatch) => {
	return {
		deleteStudent: (id) => {
			dispatch(deleteStudent(id));
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Students);
