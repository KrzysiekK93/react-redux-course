import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadCourses, deleteCourses } from '../../redux/actions/courseAction';
import * as authorAction from '../../redux/actions/authorAction';
import { bindActionCreators } from 'redux';
import CourseList from './CourseList';
import { Redirect } from 'react-router-dom';
import Spinner from '../common/Spinner';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

class CoursesPage extends Component {
    state = {
        redirectToAddCoursePage: false
    };

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

    handleDeleteCourse = course => {
        toast.success("Course deleted");
        this.props.actions.deleteCourses(course);
    }

    render() {
        const { courses } = this.props;
        return (
            <>
                {this.state.redirectToAddCoursePage && <Redirect to="/course" />}
                <h2>Courses</h2>
                {this.props.loading ? ( <Spinner /> ) : (
                    <>
                        <button style={{marginBottom: 20}} className="btn btn-primary add-course" onClick={() => this.setState({redirectToAddCoursePage: true})}>Add Course</button>
                        <CourseList courses={courses} onDeleteClick={this.handleDeleteCourse}/>
                    </>
                )}
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
        authors: state.authors,
        loading: state.apiCallsInProgress > 0
    }
}

function mapDispatchToProps(dispatch){
    return {
        actions : {
            loadCourses : bindActionCreators(loadCourses, dispatch),
            deleteCourses : bindActionCreators(deleteCourses, dispatch),
            loadAuthors : bindActionCreators(authorAction.loadAuthors, dispatch)
        }
    }
}

CoursesPage.propTypes = {
    courses: PropTypes.array.isRequired,
    authors: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);