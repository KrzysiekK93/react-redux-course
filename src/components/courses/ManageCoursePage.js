import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { loadCourses } from '../../redux/actions/courseAction';
import { loadAuthors } from '../../redux/actions/authorAction';
import PropTypes from 'prop-types';

function ManageCoursesPage({ courses, authors, loadAuthors, loadCourses }) {
    useEffect( () => {
        if (authors.length === 0) {
            loadAuthors().catch(error => {
                alert("loading authors failed" + error);
            });
        }
        if (courses.length === 0) {
            loadCourses().catch(error => {
                alert("loading courses failed" + error);
            });
        }
    }, []);

    return (
        <>
            <h2>Manage Courses</h2>
        </>
    )
}

function mapStateToProps( state ) {
    const { courses, authors } = state;
    return {
        courses,
        authors
    }
}

const mapDispatchToProps = {
    loadCourses,
    loadAuthors
}

ManageCoursesPage.propTypes = {
    courses: PropTypes.array.isRequired,
    authors: PropTypes.array.isRequired,
    loadAuthors: PropTypes.func.isRequired,
    loadCourses: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursesPage);