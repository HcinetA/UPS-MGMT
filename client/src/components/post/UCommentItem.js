import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { deleteUcomment } from '../../actions/upost';
const UCommentItem = ({
  postId,
  comments: { _id, text, name, avatar, user, date },
  auth,
  deleteUcomment,
}) => {
  return (
    <Fragment>
      <div class='post bg-white p-1 my-1'>
        <div>
          <Link to={`/uprofiles/${user}`}>
            <img class='round-img' src={avatar} alt='' />
            <h4>{name}</h4>
          </Link>
        </div>
        <div>
          <p class='my-1'>{text}</p>
          <p class='post-date'>
            Posté le <Moment format='YYYY/MM/DD'>{date}</Moment>
          </p>
        </div>
      </div>
    </Fragment>
  );
};

UCommentItem.propTypes = {
  postId: PropTypes.number.isRequired,
  comments: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteUcomment: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { deleteUcomment })(UCommentItem);
