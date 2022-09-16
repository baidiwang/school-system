import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createCampus, createStudent } from './store'

class CreateCampus extends Component {

	handleSubmit = (e) => {
		e.preventDefault();
		const { name, address } = e.target.elements;
		if (name.value.trim() === '') {
			alert('Name required!');
			return;
		}
		if (address.value.trim() === '') {
			alert('Address required!');
			return;
		}
		this.props.createCampus({
			name: name.value,
			address: address.value,
		});
		name.value = '';
		address.value = '';
	}

	render() {
		return (
			<form onSubmit={this.handleSubmit}>
				<div style={{marginBottom: 10}}>
					<input name="name" placeholder="Name" />
				</div>
				<div style={{marginBottom: 10}}>
					<input name="address" placeholder="Address" />
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
		createCampus: (campus) => {
			dispatch(createCampus(campus))
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateCampus);
