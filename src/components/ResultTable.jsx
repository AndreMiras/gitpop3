import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Fork = ({ info }) => (
  <tr>
    <td>{info.nameWithOwner}</td>
    <td>Stars</td>
    <td>Forks</td>
    <td>Modified</td>
  </tr>
);
Fork.propTypes = {
  info: PropTypes.shape({
    nameWithOwner: PropTypes.string.isRequired,
  }).isRequired,
};

const ResultTable = ({ forks }) => (
  <>
    <FontAwesomeIcon icon="search" />
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Repo</th>
          <th>Stars</th>
          <th>Forks</th>
          <th>Modified</th>
        </tr>
      </thead>
      <tbody>
        { forks.map((fork) => <Fork info={fork} />)}
      </tbody>
    </Table>
  </>
);
ResultTable.propTypes = {
  forks: PropTypes.arrayOf(Fork.propTypes.info).isRequired,
};

export default ResultTable;
