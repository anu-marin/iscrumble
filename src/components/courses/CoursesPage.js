import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import CourseList from './CourseList';
import Spinner from '../common/Spinner';
import * as courseActions from '../../redux/actions/courseActions';
import * as authorActions from '../../redux/actions/authorActions';

class CoursesPage extends React.Component {
	state = {
		redirectToAddCoursePage: false
	};

	async componentDidMount() {
		if (this.props.courses.length === 0) {
			try {
				await this.props.loadCourses();
			} catch (error) {
				alert('Loading courses failed' + error);
			}
		}
		if (this.props.authors.length === 0) {
			try {
				await this.props.loadAuthors();
			} catch (error) {
				alert('Loading authors failed' + error);
			}
		}
	}

	handleDeleteCourse = async course => {
		toast.success('Course deleted');
		try{
			await this.props.deleteCourse(course);
		} catch (err)	{
			toast.error('Delete Failed' + err.message, { autoClose: false });
		}
	};

	render() {
		return (
			<>
        {this.state.redirectToAddCoursePage && <Redirect to="/course" />}
				<h2>Courses</h2>
				{this.props.loading ? (
					<Spinner />
				) : (
					<>
						<button
						style={{ marginBottom: 20 }}
						className="btn btn-primary add-course"
						onClick={() => this.setState({ redirectToAddCoursePage: true })}
					>
						Add Course
					</button>
							<CourseList
								onDeleteClick={this.handleDeleteCourse}
								courses={this.props.courses} />
					</>
				)}
			</>
		);
	}
}

CoursesPage.propTypes = {
  authors: PropTypes.array.isRequired,
  courses: PropTypes.array.isRequired,
  loadCourses: PropTypes.func.isRequired,
	loadAuthors: PropTypes.func.isRequired,
	loading: PropTypes.bool.isRequired,
	deleteCourse: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
  return {
    courses: state.authors.length === 0 
      ? [] 
      : state.courses.map(course => {
        return {
          ...course,
          authorName: state.authors.find(author => author.id = course.authorId).name
        };
      }),
		authors: state.authors,
		loading: state.apiCallsInProgress > 0
  };
};

const mapDispatchToProps = {
  loadCourses: courseActions.loadCourses,
	loadAuthors: authorActions.loadAuthors,
	deleteCourse: courseActions.deleteCourse
};

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);
