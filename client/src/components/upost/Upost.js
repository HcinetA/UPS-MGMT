import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getUpost } from '../../actions/upost';
import UPostItem from '../Uposts/UPostItem';
import UCommentForm from './UCommentForm';
import UCommentItem from './UCommentItem';
import CommentItem from './CommentItem';
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
      <UCommentForm postId={post._id} />
      <div className='comments'>
        {post.comments.map((comments) => (
          <UCommentItem
            key={comments._id}
            comments={comments}
            postId={post._id}
          />
        ))}
      </div>
      <div className='comments'>
        {post.commentsprof.map((commentsprof) => (
          <CommentItem
            key={commentsprof._id}
            commentsprof={commentsprof}
            postId={post._id}
          />
        ))}
      </div>
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
