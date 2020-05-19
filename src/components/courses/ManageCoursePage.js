import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import CourseForm from './CourseForm';
import { loadCourses, saveCourse } from '../../redux/actions/courseActions';
import { getCourseBySlug } from '../../redux/reducers/courseReducer';
import { loadAuthors } from '../../redux/actions/authorActions';
import { newCourse } from '../../../tools/mockData';
import Spinner from '../common/Spinner';

export function ManageCoursePage({
  courses,
  authors,
  loadCourses,
  loadAuthors,
  saveCourse,
  history,
  ...props
}) {  
  const [course, setCourse] = useState({ ...props.course });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  const loadData = async () => {
		if (courses.length === 0) {
			try {
				await loadCourses();
			} catch (error) {
				alert('Loading courses failed' + error);
			}
		} else {
			setCourse({ ...props.course });
		}
		if (authors.length === 0) {
			try {
				await loadAuthors();
			} catch (error) {
				alert('Loading authors failed' + error);
			}
		}
  };
  
  useEffect(() => {
    loadData();
  }, [props.course]);

  const handleChange = event => {
    const { name, value } = event.target;
    setCourse(prevCourse => ({
      ...prevCourse,
      [name]: name === 'authorId' ? parseInt(value, 10) : value
    }));
  };

  function formIsValid() {
		const { title, authorId, category } = course;
		const errors = {};

		if (!title) errors.title = 'Title is required.';
		if (!authorId) errors.author = 'Author is required';
		if (!category) errors.category = 'Category is required';

		setErrors(errors);
		// Form is valid if the errors object still has no properties
		return Object.keys(errors).length === 0;
	}

  const handleSave = async event => {
    event.preventDefault();
    if (!formIsValid()) return;
    setSaving(true);
    try {
      await saveCourse(course);
      toast.success('Course saved!');
      history.push('/courses');
    } catch (e) {
      alert("Failed to save course" + e);
      setSaving(false);
      setErrors({ onSave: e.message });
    }
  };

  return (
    authors.length === 0 || courses.length === 0 ? (<Spinner />) : (
      <CourseForm
        course={course}
        errors={errors}
        authors={authors}
        onChange={handleChange}
        onSave={handleSave}
        saving={saving}
      />
    )
  );
}

ManageCoursePage.propTypes = {
	authors: PropTypes.array.isRequired,
	courses: PropTypes.array.isRequired,
	course: PropTypes.object.isRequired,
	loadCourses: PropTypes.func.isRequired,
	loadAuthors: PropTypes.func.isRequired,
  saveCourse: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
};

const mapStateToProps = (state, ownProps) => {
  const slug = ownProps.match.params.slug;
  const course = slug ? getCourseBySlug(state.courses, slug) : newCourse;
  return {
    course,
		courses: state.courses,
    authors: state.authors
	};
};

const mapDispatchToProps = {
	loadCourses,
	loadAuthors,
	saveCourse
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);
