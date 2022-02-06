import React from 'react';
import PropTypes from 'prop-types';
import timeSince from '../utils/time';
import RepoLink from './RepoLink';

const ForkLine = ({ info }) => (
  <tr>
    <td><RepoLink nameWithOwner={info.nameWithOwner} /></td>
    <td>{info.stargazerCount}</td>
    <td>{info.forkCount}</td>
    <td>{info.object.history.totalCount}</td>
    <td>{timeSince(new Date(info.object.committedDate))}</td>
  </tr>
);
ForkLine.propTypes = {
  info: PropTypes.shape({
    nameWithOwner: PropTypes.string.isRequired,
    stargazerCount: PropTypes.number.isRequired,
    forkCount: PropTypes.number.isRequired,
    object: PropTypes.shape({
      committedDate: PropTypes.string.isRequired,
      history: PropTypes.shape({
        totalCount: PropTypes.number.isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
};

export default ForkLine;
