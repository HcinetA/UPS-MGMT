import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';

const PostItem = ({
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
  pisAuthenticated,
}) => (
  <div class='posts'>
    <div class='post bg-white p-1 my-1'>
      <div>
        <a href={'profile.html'}>
          <img class='round-img' src={avatar} alt='' />
          <h4>{name}</h4>
        </a>
      </div>
      <div>
        <h4>Classe: {classes}</h4>
        <p class='my-1'>{text}</p>
        {!document == 0 && (
          <a href={document} class='btn btn-primary'>
            Document{' '}
          </a>
        )}

        <p class='post-date'>
          Posted on <Moment format='YYYY/MM/DD'>{date}</Moment>
        </p>
        <h4>Réactions Professeurs</h4>
        <button type='button' class='btn btn-light'>
          <i class='fas fa-thumbs-up'></i>
          <span>
            {' '}
            {likesporf.length > 0 && <span>{likesporf.length}</span>}
          </span>
        </button>
        <button type='button' class='btn btn-light'>
          <i class='fas fa-thumbs-down'></i>
        </button>
        <Link to={`/post/${_id}`} class='btn btn-primary'>
          Discussion{' '}
          {commentsprof.length > 0 && (
            <span class='comment-count'>{commentsprof.length}</span>
          )}
        </Link>
        {!pauth.loading && prof === pauth.prof._id && (
          <button type='button' class='btn btn-danger'>
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
          <Link to={`/post/${_id}`} class='btn btn-primary'>
            Discussion{' '}
            {comments.length > 0 && (
              <span class='comment-count'>{comments.length}</span>
            )}
          </Link>
        </div>
      </div>
    </div>
  </div>
);

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  pauth: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  pauth: state.pauth,
  auth: state.auth,
  pisAuthenticated: state.pisAuthenticated,
});
export default connect(mapStateToProps, {})(PostItem);
