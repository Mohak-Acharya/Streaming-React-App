import React from 'react';
import Modal from '../Modal';
import history from '../../history';
import {Link} from 'react-router-dom'
import { connect } from 'react-redux';
import { fetchStream, deleteStream } from '../../actions';

class StreamDelete extends React.Component {
  renderActions = () => {
    const actions = (
      <React.Fragment>
        <button
          onClick={() => this.props.deleteStream(this.props.match.params.id)}
          className="ui primary negative button">
          Delete
        </button>
        <Link to="/" className="ui button">
          Cancel
        </Link>
      </React.Fragment>
    );

    return actions; 
  };

  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id);
  }

  renderContent = () => {
    if (!this.props.stream) {
      return 'Are you sure you want to delete this stream ?';
    }

    return `Are you sure you want to delete this stream with title : ${this.props.stream.title} ?`;
  };

  render() {
    return (
      <Modal
        title="Delete Stream"
        description={this.renderContent()}
        actions={this.renderActions()}
        onDismiss={() => history.push('/')}
      />
    );
  }
}

const mapStateToProps = (state, props) => {
  return { stream: state.streams[props.match.params.id] };
};

export default connect(mapStateToProps, { fetchStream, deleteStream })(
  StreamDelete
);
