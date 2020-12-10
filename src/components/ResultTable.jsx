import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Pagination from 'react-js-pagination';
import ForkLine from './ForkLine';

const paginatedForks = (forks, activePage, itemsCountPerPage) => (
  forks.slice((activePage - 1) * itemsCountPerPage, activePage * itemsCountPerPage)
);

const ResultTable = ({
  forks, activePage, itemsCountPerPage, onPageChange,
}) => (
  <>
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>
            <FontAwesomeIcon icon={['fab', 'github-alt']} />
            {' '}
            Repo
          </th>
          <th>
            <FontAwesomeIcon icon="star" />
            {' '}
            Stars
          </th>
          <th>
            <FontAwesomeIcon icon="code-branch" />
            {' '}
            Forks
          </th>
          <th>
            <FontAwesomeIcon icon="dot-circle" />
            {' '}
            Commits
          </th>
          <th>
            <FontAwesomeIcon icon="calendar-alt" />
            {' '}
            Modified
          </th>
        </tr>
      </thead>
      <tbody>
        {
          paginatedForks(
            forks,
            activePage,
            itemsCountPerPage,
          ).map(
            (fork) => <ForkLine key={fork.nameWithOwner} info={fork} />,
          )
        }
      </tbody>
    </Table>
    <Pagination
      itemClass="page-item"
      linkClass="page-link"
      activePage={activePage}
      itemsCountPerPage={itemsCountPerPage}
      totalItemsCount={forks.length}
      pageRangeDisplayed={5}
      onChange={onPageChange}
    />
  </>
);
ResultTable.propTypes = {
  forks: PropTypes.arrayOf(ForkLine.propTypes.info).isRequired,
  activePage: PropTypes.number.isRequired,
  itemsCountPerPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default ResultTable;
