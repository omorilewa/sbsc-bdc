import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { NewRateForm } from '.';

class NewRatePage extends Component {
  static navigationOptions = {
    title: "INPUT NEW RATE"
  };

  render() {
    const { handleSubmit, reset } = this.props;
    return (
      <NewRateForm handleSubmit={handleSubmit} reset={reset}/>
    );
  }
}

const NewRate = reduxForm({
  form: 'newrate'
})(NewRatePage);

export default NewRate;
