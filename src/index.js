import React, { Component} from 'react';
import { createRoot } from 'react-dom/client';
import { Provider, connect } from 'react-redux';
import { HashRouter as Router, Route, Link } from 'react-router-dom';
import store, { fetchStudents, fetchCampuses } from './store';
import Student from './Student';
import Students from './Students';
import Campus from './Campus';
import Campuses from './Campuses';
import './index.css';

const App = connect(
    state => state,
    dispatch => {
        return {
            loadData: () => {
                dispatch(fetchStudents());
                dispatch(fetchCampuses());
            }
        };
    }
) (class App extends Component {
    componentDidMount(){
        this.props.loadData();
    }
    render(){
        const { students, campuses } = this.props;
         return (
        <div>
               <h1>Students and Campuses</h1>
            <div>
               <span className='nav'><Link to='/students'>Students({ students.students.length })</Link></span>
               <span className='nav'><Link to='/campuses' style={{marginLeft: 10}}>Campuses({campuses.campuses.length})</Link></span>
            </div>
            <Route path='/students' component={ Students } exact />
            <Route path='/campuses' component={ Campuses } exact />
            <Route path='/students/:id' component={ Student } />
            <Route path='/campuses/:id' component={ Campus } />
        </div>
      );
  }
}
);

const root = createRoot(document.querySelector('#root'));
root.render(<Provider store={ store }><Router><App /></Router></Provider>);
