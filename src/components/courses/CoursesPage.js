import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as courseAction from '../../redux/actions/courseAction';
import * as authorAction from '../../redux/actions/authorAction';
import { bindActionCreators } from 'redux';
import CourseList from './CourseList';
import PropTypes from 'prop-types';

class CoursesPage extends Component {
    componentDidMount() {
        const { courses, authors, actions } = this.props;
        if (authors.length === 0) {
            actions.loadAuthors().catch(error => {
                alert("loading authors failed" + error);
            });
        }
        if (courses.length === 0) {
            actions.loadCourses().catch(error => {
                alert("loading courses failed" + error);
            });
        }
    }

    render() {
        const { courses } = this.props;
        return (
            <>
                <h2>Courses</h2>
                <CourseList courses={courses}/>
            </>
        )
    }
}

function mapStateToProps( state ) {
    console.log(state);
    return {
        courses: state.authors.lenght === 0 ? [] : state.courses.map(course => {
            return {
                ...course,
                authorName: state.authors.find(a => a.id === course.authorId).name
            }
        }),
        authors: state.authors
    }
}

function mapDispatchToProps(dispatch){
    return {
        actions : {
            loadCourses : bindActionCreators(courseAction.loadCourses, dispatch),
            loadAuthors : bindActionCreators(authorAction.loadAuthors, dispatch)
        }
    }
}

CoursesPage.propTypes = {
    courses: PropTypes.array.isRequired,
    authors: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);