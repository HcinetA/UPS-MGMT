import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';

const PrivateRouteP = ({
  component: Component,
  pauth: { pisAuthenticated, ploading },
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) =>
      ploading ? (
        <Spinner />
      ) : pisAuthenticated ? (
        <Component {...props} />
      ) : (
        <Redirect to='/loginprof' />
      )
    }
  />
);

PrivateRouteP.propTypes = {
  pauth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  pauth: state.pauth,
});

export default connect(mapStateToProps)(PrivateRouteP);
