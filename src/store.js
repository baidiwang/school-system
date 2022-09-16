import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import axios from 'axios';
import logger from 'redux-logger';

const studentsReducer = (state = { students: [], student: null }, action) => {
    if(action.type === 'SET_STUDENTS'){
        return {
            ...state,
            students: action.students
        };
    } else if (action.type === 'SET_STUDENT') {
        return {
            ...state,
            student: action.student
        }
    }
    return state;
};

const campusesReducer = (state = { campuses: [], campus: null }, action) => {
    if(action.type === 'SET_CAMPUSES'){
        return {
            ...state,
            campuses: action.campuses
        };
    } else if (action.type === 'SET_CAMPUS') {
        return {
            ...state,
            campus: action.campus
        }
    }
    return state;
};

const reducer = combineReducers({
    students: studentsReducer,
    campuses: campusesReducer
});

const store = createStore(reducer, applyMiddleware(thunk,logger));


// For page /students or /campuses
export const fetchStudents = () => {
    return async(dispatch)=> {
        const students = (await axios.get('/students')).data;
        dispatch({ type: 'SET_STUDENTS', students });
    };
};

export const fetchCampuses = () => {
    return async(dispatch)=> {
        const campuses = (await axios.get('/campuses')).data;
        dispatch({ type: 'SET_CAMPUSES', campuses });
    };
};


// For page students/id or campuses/id
export const fetchStudentById = (id) => {
    return async(dispatch)=> {
        const student = (await axios.get('/students/' + id)).data;
        dispatch({ type: 'SET_STUDENT', student });
    };
}

export const fetchCampusById = (id) => {
    return async(dispatch)=> {
        const campus = (await axios.get('/campuses/' + id)).data;
        dispatch({ type: 'SET_CAMPUS', campus });
    };
}

// For page of CreateStudent or CreateCampus or Update... or Delete... form
export const createStudent = (student) => {
    return async(dispatch)=> {
        await axios.post('/students', student);
        dispatch(fetchStudents());
    };
}


export const createCampus = (campus) => {
    return async(dispatch)=> {
        await axios.post('/campuses', campus);
        dispatch(fetchCampuses());
    };
}

export const updateStudent = (student) => {
    return async(dispatch) => {
        await axios.put('/students/' + student.id, student);
        dispatch(fetchStudentById(student.id));
    }
}

export const updateCampus = (campus) => {
    return async(dispatch) => {
        await axios.put('/campuses/' + campus.id, campus);
        dispatch(fetchCampusById(campus.id));
    }
}

export const deleteStudent = (id) => {
    return async(dispatch)=> {
        await axios.delete(`/students/${id}`);
        dispatch(fetchStudents());
    };
}

export const deleteCampus = (id) => {
    return async(dispatch)=> {
        await axios.delete(`/campuses/${id}`);
        dispatch(fetchCampuses());
    };
}

export const studentUnregister = (id, student) => {
    return async(dispatch) => {
        await axios.put('/students/' + student.id, student);
        dispatch(fetchCampusById(id));
    }
}

export default store;
