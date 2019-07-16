import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as courseAction from '../../redux/actions/courseAction';
import PropTypes from 'prop-types';

class CoursesPage extends Component {
    state = {
        courses: {
            title: ""
        }
    };

    handleChange = e => {
        const courses = { ...this.state.courses, title: e.target.value };
        this.setState({ courses });
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.createCourse(this.state.courses);
    } 

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <h2>Courses</h2>
                <h3>Add Course</h3>
                <input type="text" onChange={this.handleChange} value={this.state.courses.title} />
                <input type="submit" value="Save" />
                { this.props.courses.map( course => (
                    <div key={course.title}>{course.title}</div>
                ))}
            </form>
        )
    }
}

CoursesPage.propTypes = {
    courses: PropTypes.array.isRequired,
    createCourse: PropTypes.func.isRequired
}

function mapStateToProps( state ) {
    return {
        courses: state.courses,
    }
}

function mapDispatchToProps(dispatch){
    return {
        createCourse: courses => dispatch(courseAction.createCourse(courses))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);