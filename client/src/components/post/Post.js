import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import PostItem from '../posts/PostItem';
import CommentForm from '../post/CommentForm';
import CommentItem from '../post/CommentItem';
import UCommentItem from './UCommentItem';
import { getPost } from '../../actions/post';
import { Link } from 'react-router-dom';
const Post = ({ getPost, post: { post, loading }, match }) => {
  useEffect(() => {
    getPost(match.params.id);
  }, [getPost, match.params.id]);

  return loading || post === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <Link to='/posts' className='btn'>
        Retour aux posts
      </Link>
      <PostItem post={post} showActions={false} />

      <CommentForm postId={post._id} />

      <div className='comments'>
        {post.commentsprof.map((commentsprof) => (
          <CommentItem
            key={commentsprof._id}
            commentsprof={commentsprof}
            postId={post._id}
          />
        ))}
      </div>
      <div className='comments'>
        {post.comments.map((comments) => (
          <UCommentItem
            key={comments._id}
            comments={comments}
            postId={post._id}
          />
        ))}
      </div>
    </Fragment>
  );
};

Post.propTypes = {
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
});
export default connect(mapStateToProps, { getPost })(Post);
