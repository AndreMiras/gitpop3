import React from "react";
import PropTypes from "prop-types";

const RepoLink = ({ nameWithOwner }) => (
  <a href={`https://github.com/${nameWithOwner}`}>{nameWithOwner}</a>
);
RepoLink.propTypes = {
  nameWithOwner: PropTypes.string.isRequired,
};

export default RepoLink;
