import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import UpostItem from '../Uposts/UPostItem';
import { getUpost } from '../../actions/upost';
import UPostItem from '../Uposts/UPostItem';
const Upost = ({ getUpost, upost: { post, loading }, match }) => {
  useEffect(() => {
    getUpost(match.params.id);
  }, [getUpost, match.params.id]);
  return loading || post === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <Link to='/uposts' className='btn'>
        {' '}
        Posts
      </Link>
      <UPostItem upost={post} ShowActions={false} />
    </Fragment>
  );
};

Upost.propTypes = {
  getUpost: PropTypes.func.isRequired,
  upost: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  upost: state.upost,
});
export default connect(mapStateToProps, { getUpost })(Upost);
