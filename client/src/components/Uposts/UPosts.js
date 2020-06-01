import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getUposts } from '../../actions/upost';
import UPostItem from './UPostItem';
const UPosts = ({ getUposts, upost: { posts, loading } }) => {
  useEffect(() => {
    getUposts();
  }, [getUposts]);
  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className='large text-primary'> Posts</h1>
      <p className='lead'>
        <i className='fas fa-user'> Bienvenue</i>
      </p>
      <div className='posts'>
        {posts.map((upost) => (
          <UPostItem key={upost._id} upost={upost} />
        ))}
      </div>
    </Fragment>
  );
};

UPosts.propTypes = {
  getUposts: PropTypes.func.isRequired,
  upost: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  upost: state.upost,
});
export default connect(mapStateToProps, { getUposts })(UPosts);
