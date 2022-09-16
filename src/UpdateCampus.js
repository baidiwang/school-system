import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updateCampus } from './store'

class UpdateCampus extends Component {

	handleSubmit = (e) => {
		e.preventDefault();
		const { name, address, description, imageUrl } = e.target.elements;
		if (name.value.trim() === '') {
			alert('name required!');
			return;
		}
		if (address.value.trim() === '') {
			alert('address required!');
			return;
		}
		this.props.updateCampus({
			id: this.props.campuses.campus.id,
			name: name.value,
			address: address.value,
			description: description.value,
			imageUrl: imageUrl.value,
		});
		alert('update successful!');
	}

	render() {
		const { campuses } = this.props;

		return (
			<form onSubmit={this.handleSubmit}>
				<div style={{marginBottom: 10}}>
					<input name="name" placeholder="Name" defaultValue={campuses.campus.name} />
				</div>
				<div style={{marginBottom: 10}}>
					<input name="address" placeholder="Address" defaultValue={campuses.campus.address}/>
				</div>
				<div style={{marginBottom: 10}}>
					<input name="description" placeholder="Description" defaultValue={campuses.campus.description}/>
				</div>
				<div style={{marginBottom: 10}}>
					<input name="imageUrl" placeholder="Image url" defaultValue={campuses.campus.imageUrl}/>
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
		updateCampus: (campus) => {
			dispatch(updateCampus(campus))
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateCampus);
