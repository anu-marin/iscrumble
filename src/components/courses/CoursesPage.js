import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import CourseList from './CourseList';
import * as courseActions from '../../redux/actions/courseActions';
import * as authorActions from '../../redux/actions/authorActions';

class CoursesPage extends React.Component {
  state = {
    course: {
      title: '',
    },
  };

  async componentDidMount() {
    if (this.props.courses.length === 0) {
      try {
        await this.props.loadCourses();
      } catch (error) {
        alert("Loading courses failed" + error);
      }
    }
    if (this.props.authors.length === 0) {
      try {
        await this.props.loadAuthors();
      } catch (error) {
        alert("Loading authors failed" + error);
      }
    }
  }

  handleChange = (event) => {
    const course = { ...this.state.course, title: event.target.value };
    this.setState({ course });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.createCourse(this.state.course);
    this.setState({
      course: {
        title: '',
      },
    });
  };

  render() {
    return (
      <>
        <h2>Courses</h2>
        <CourseList courses={this.props.courses} />
        <form onSubmit={this.handleSubmit}>
          <h3>Add Course</h3>
          <input
            type="text"
            onChange={this.handleChange}
            value={this.state.course.title}
          />
          <input type="submit" value="Save" />
        </form>
      </>
    );
  }
}

CoursesPage.propTypes = {
  authors: PropTypes.array.isRequired,
  courses: PropTypes.array.isRequired,
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
    authors: state.authors
  };
};

const mapDispatchToProps = {
  createCourse: courseActions.createCourse,
  loadCourses: courseActions.loadCourses,
  loadAuthors: authorActions.loadauthors
};

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);
