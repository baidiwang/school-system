import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import CreateCampus from './CreateCampus';
import { deleteCampus } from './store';

class Campuses extends Component {
	state = {
		page: 1,
		pageSize: 10,
		totalSize: 0
	}

	componentDidMount() {
		this.setState({
			totalSize: this.props.campuses.campuses.length
		})
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.campuses.campuses.length !== this.state.totalSize) {
			this.setState({
				totalSize: nextProps.campuses.campuses.length
			});
		}
	}

	onPageChange = (page) => {
		this.setState({
			page
		});
	}

	render() {
		const { campuses } = this.props;
		const { totalSize, pageSize, page } = this.state;
		const pageCampuses = campuses.campuses.slice((page - 1) * 10, (page - 1) * 10 + 10);

		return (
			<div>
				<ul>
					{
						pageCampuses.map(campus => (
							<li key={campus.id} style={{marginBottom: 20}}>
								<span>{campus.name} ({campus.students.length} enrollments)</span>
								<div>
									<Link to={`/campuses/${campus.id}`}>Details for {campus.name}</Link>
									<button style={{marginLeft: 10}} onClick={() => this.props.deleteCampus(campus.id)}>x</button>
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
				<CreateCampus />
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return state;
}

const mapDispatchToProps = (dispatch) => {
	return {
		deleteCampus: (id) => {
			dispatch(deleteCampus(id));
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Campuses);
