import React from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';

const clientid =
  '891882023383-4bbc65d6h67ctanugr250oo3cqp08vcs.apps.googleusercontent.com';

class GoogleAuth extends React.Component {
  componentDidMount() {
    window.gapi.load('client:auth2', () =>
      window.gapi.client
        .init({
          clientId: clientid,
          scope: 'email',
        })
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance();
          this.authChange(this.auth.isSignedIn.get());
          this.auth.isSignedIn.listen(this.authChange);
        })
    );
  }

  authChange = (isSignedIn) => {
    if (isSignedIn) {
      this.props.signIn(this.auth.currentUser.get().getId());
    } else {
      this.props.signOut();
    }
  };

  onSignInClick = () => {
    this.auth.signIn();
  };

  onSignOutClick = () => {
    this.auth.signOut();
  };

  renderAuth() {
    if (this.props.isSignedIn === null) {
      return null;
    } else if (this.props.isSignedIn === true) {
      return (
        <button onClick={this.onSignOutClick} className="ui red google button">
          <i className="google icon"></i>
          Sign Out
        </button>
      );
    } else {
      return (
        <button onClick={this.onSignInClick} className="ui red google button">
          <i className="google icon"></i>
          Sign In with Google
        </button>
      );
    }
  }
  render() {
    return <div>{this.renderAuth()}</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    isSignedIn: state.auth.isSignedIn,
  };
};

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);
