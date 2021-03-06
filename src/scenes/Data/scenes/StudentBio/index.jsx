import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import studentBioActions from './actions';
import StudentBioForm from './components/StudentBioForm';

class StudentBio extends Component {
  constructor(props) {
    super(props);
    this.props.read();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);


    this.state = {
      disabled: true,
    };
  }

  componentWillReceiveProps(nextProps) {
    let disabled;
    if (isEmpty(nextProps.studentBio.data)) {
      disabled = false;
    } else {
      disabled = true;
    }
    this.setState({ disabled });
  }

  handleSubmit(values) {
    if (isEmpty(this.props.studentBio.data)) {
      this.props.create(values);
    } else {
      const { id } = this.props.studentBio.data;
      this.props.update(values, id);
    }
  }

  handleEdit() {
    this.setState({
      disabled: false,
    });
  }

  handleDelete() {
    const { id } = this.props.studentBio.data;
    this.props.delete(id);
  }

  render() {
    const { flash, status, data } = this.props.studentBio;
    return (
      <StudentBioForm
        initialValues={data}
        enableReinitialize
        flash={flash}
        status={status}
        disabled={this.state.disabled}
        onSubmit={this.handleSubmit}
        onEdit={this.handleEdit}
        onDelete={this.handleDelete}
      />
    );
  }
}

StudentBio.defaultProps = {

};

StudentBio.propTypes = {
  studentBio: PropTypes.shape({
    flash: PropTypes.string,
    status: PropTypes.shape({
      success: PropTypes.bool,
      failure: PropTypes.bool,
    }),
    data: PropTypes.shape({
      id: PropTypes.number,
    }),
  }).isRequired,
  create: PropTypes.func.isRequired,
  read: PropTypes.func.isRequired,
  update: PropTypes.func.isRequired,
  delete: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({ studentBio: state.studentBio });
const { create, read, update } = studentBioActions;
const mapActionToProps = {
  create, read, update, delete: studentBioActions.delete,
};
export default connect(mapStateToProps, mapActionToProps)(StudentBio);
