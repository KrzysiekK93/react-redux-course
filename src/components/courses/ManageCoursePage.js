import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { loadCourses, saveCourses } from '../../redux/actions/courseAction';
import { loadAuthors } from '../../redux/actions/authorAction';
import PropTypes from 'prop-types';
import CourseForm from './CourseForm';
import { newCourse } from '../../../tools/mockData';
import Spinner from '../common/Spinner';
import { toast } from 'react-toastify';

function ManageCoursesPage({ courses, authors, loadAuthors, loadCourses, saveCourses, history, ...props }) {
    const [course, setCourse] = useState({...props.course});
    const [errors, setErrors] = useState({});
    const [saving, setSaving] = useState(false)

    useEffect( () => {
        if (authors.length === 0) {
            loadAuthors().catch(error => {
                alert("loading authors failed" + error);
            });
        } else {
            setCourse({...props.course})
        }

        if (courses.length === 0) {
            loadCourses().catch(error => {
                alert("loading courses failed" + error);
            });
        }
    }, [props.course]);

    function handleChange(event) {
        const { name, value } = event.target;
        setCourse( prevCourse => ({
            ...prevCourse,
            [name]: name === "authorId" ? parseInt(value, 10): value
        }))
    }

    function formIsValid() {
        const { title, authorId, category } = course;
        const errors = {};
    
        if (!title) errors.title = "Title is required.";
        if (!authorId) errors.author = "Author is required";
        if (!category) errors.category = "Category is required";
    
        setErrors(errors);
        // Form is valid if the errors object still has no properties
        return Object.keys(errors).length === 0;
      }

    function handleSave(event) {
        event.preventDefault();
        if(!formIsValid()) return;
        setSaving(true);
        saveCourses(course)
            .then(() => {
                toast.success('Course saved.')
                history.push('/courses');
            })
            .catch(error => {
                setSaving(false);
                setErrors({ onSave: error.message });
            })
    }

    return ( authors.length === 0 || courses.length === 0 ? ( <Spinner /> ) : (
            <CourseForm onSave={handleSave} onChange={handleChange} course={course} errors={errors} saving={saving} authors={authors}/>
        )
    )
}

export function getCourseBySlug(courses, slug){
    return courses.find(course => course.slug === slug) || null;
}

function mapStateToProps( state, ownProps ) {
    const slug = ownProps.match.params.slug;
    const course = slug && state.courses.length > 0 ? getCourseBySlug(state.courses, slug) : newCourse;
    const { courses, authors } = state;
    return {
        course,
        courses,
        authors
    }
}

const mapDispatchToProps = {
    loadCourses,
    loadAuthors,
    saveCourses
}

ManageCoursesPage.propTypes = {
    courses: PropTypes.array.isRequired,
    course: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    authors: PropTypes.array.isRequired,
    loadAuthors: PropTypes.func.isRequired,
    loadCourses: PropTypes.func.isRequired,
    saveCourses: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursesPage);