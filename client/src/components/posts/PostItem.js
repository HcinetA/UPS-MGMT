import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { addLike, removeLike, deletePost } from '../../actions/post';
const PostItem = ({
  addLike,
  removeLike,
  deletePost,
  auth,
  pauth,
  post: {
    _id,
    text,
    name,
    avatar,
    prof,
    document,
    likes,
    comments,
    likesporf,
    commentsprof,
    date,
    classes,
  },
  showActions,
}) => (
  <div class='posts'>
    <div class='post bg-white p-1 my-1'>
      <div>
        <Link to={`/profile/${prof}`}>
          <img class='round-img' src={avatar} alt='' />
          <h4>{name}</h4>
        </Link>
      </div>
      <div>
        <Link to={`/posts/${classes}`}>
          <h4> {classes}</h4>
        </Link>
        <p class='my-1'>{text}</p>
        {
          // eslint-disable-next-line
          !document == 0 && (
            <a href={document} class='btn btn-primary'>
              Document{' '}
            </a>
          )
        }
        <p class='post-date'>
          Posted on <Moment format='YYYY/MM/DD'>{date}</Moment>
        </p>
        {showActions && (
          <Fragment>
            <h4>Réactions Professeurs</h4>
            <button
              onClick={() => addLike(_id)}
              type='button'
              class='btn btn-light'
            >
              <i class='fas fa-thumbs-up'></i>
              <span>
                {' '}
                <span>
                  {likesporf.length > 0 && <span>{likesporf.length}</span>}
                </span>
              </span>
            </button>
            <button
              onClick={(e) => removeLike(_id)}
              type='button'
              class='btn btn-light'
            >
              <i class='fas fa-thumbs-down'></i>
            </button>
            <Link to={`/posts/${_id}`} class='btn btn-primary'>
              Discussion{' '}
              {commentsprof.length > 0 && (
                <span class='comment-count'>{commentsprof.length}</span>
              )}
            </Link>
            {!pauth.loading && prof === pauth.prof._id && (
              <button
                onClick={(e) => deletePost(_id)}
                type='button'
                class='btn btn-danger'
              >
                <i class='fas fa-times'></i>
              </button>
            )}
            <div>
              <h4>Réactions Etudiant</h4>
              <button type='button' class='btn btn-light'>
                <i class='fas fa-thumbs-up'></i>
                <span> {likes.length > 0 && <span>{likes.length}</span>}</span>
              </button>
              <button type='button' class='btn btn-light'>
                <i class='fas fa-thumbs-down'></i>
              </button>
            </div>
          </Fragment>
        )}
      </div>
    </div>
  </div>
);
PostItem.defaultProps = {
  showActions: true,
};
PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  pauth: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  pauth: state.pauth,
  auth: state.auth,
  pisAuthenticated: state.pisAuthenticated,
});
export default connect(mapStateToProps, { addLike, removeLike, deletePost })(
  PostItem
);
