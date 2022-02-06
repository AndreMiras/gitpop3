import React, { useState } from "react";
import PropTypes from "prop-types";
import { orderBy as lodashOrderBy } from "lodash";
import { OverlayTrigger, Table, Tooltip } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Pagination from "react-js-pagination";
import ForkLine from "./ForkLine";

const paginatedForks = (forks, activePage, itemsCountPerPage) =>
  forks.slice(
    (activePage - 1) * itemsCountPerPage,
    activePage * itemsCountPerPage
  );

const sortIconDirection = (direction) =>
  direction === "asc" ? "sort-down" : "sort-up";

const SortIcon = ({ column, orderBy }) => (
  <FontAwesomeIcon
    icon={
      orderBy.column === column ? sortIconDirection(orderBy.direction) : "sort"
    }
  />
);
SortIcon.propTypes = {
  column: PropTypes.string.isRequired,
  orderBy: PropTypes.shape({
    column: PropTypes.string.isRequired,
    direction: PropTypes.string.isRequired,
  }).isRequired,
};

const HeaderModified = ({ onHeaderClick, sortByCommittedDate, orderBy }) => (
  <OverlayTrigger
    transition={false}
    overlay={<Tooltip>Last commit on master.</Tooltip>}
  >
    <th onClick={() => onHeaderClick("committedDate", sortByCommittedDate)}>
      <FontAwesomeIcon icon="calendar-alt" /> Modified{" "}
      <SortIcon column="committedDate" orderBy={orderBy} />
    </th>
  </OverlayTrigger>
);
HeaderModified.propTypes = {
  onHeaderClick: PropTypes.func.isRequired,
  sortByCommittedDate: PropTypes.func.isRequired,
  orderBy: PropTypes.shape({
    column: PropTypes.string.isRequired,
    direction: PropTypes.string.isRequired,
  }).isRequired,
};

const ForkLinePropTypes = {
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

const ResultTable = ({
  forks,
  activePage,
  itemsCountPerPage,
  onPageChange,
}) => {
  const sortObjectsFunc = (attribute) => (collection, order) =>
    lodashOrderBy(collection, [attribute], [order]);
  const sortByNameWithOwner = sortObjectsFunc((x) =>
    x.nameWithOwner.toLowerCase()
  );
  const sortByStargazerCount = sortObjectsFunc((x) => x.stargazerCount);
  const sortByForkCount = sortObjectsFunc((x) => x.forkCount);
  const sortByCommits = sortObjectsFunc((x) => x.object.history.totalCount);
  const sortByCommittedDate = sortObjectsFunc((x) =>
    Date.parse(x.object.committedDate)
  );
  const [orderBy, setOrderBy] = useState({
    column: "stargazerCount",
    direction: "desc",
    sortFunc: sortByStargazerCount,
  });
  const onHeaderClick = (column, sortFunc) => {
    // change direction only if the same order was selected
    const toggledDirection = orderBy.direction === "desc" ? "asc" : "desc";
    const direction =
      column === orderBy.column ? toggledDirection : orderBy.direction;
    setOrderBy({ column, direction, sortFunc });
  };
  const sortedForks = orderBy.sortFunc(forks.slice(), orderBy.direction);
  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th
              onClick={() =>
                onHeaderClick("nameWithOwner", sortByNameWithOwner)
              }
            >
              <FontAwesomeIcon icon={["fab", "github-alt"]} /> Repo{" "}
              <SortIcon column="nameWithOwner" orderBy={orderBy} />
            </th>
            <th
              onClick={() =>
                onHeaderClick("stargazerCount", sortByStargazerCount)
              }
            >
              <FontAwesomeIcon icon="star" /> Stars{" "}
              <SortIcon column="stargazerCount" orderBy={orderBy} />
            </th>
            <th onClick={() => onHeaderClick("forkCount", sortByForkCount)}>
              <FontAwesomeIcon icon="code-branch" /> Forks{" "}
              <SortIcon column="forkCount" orderBy={orderBy} />
            </th>
            <th onClick={() => onHeaderClick("commits", sortByCommits)}>
              <FontAwesomeIcon icon="dot-circle" /> Commits{" "}
              <SortIcon column="commits" orderBy={orderBy} />
            </th>
            <HeaderModified
              onHeaderClick={onHeaderClick}
              sortByCommittedDate={sortByCommittedDate}
              orderBy={orderBy}
            />
          </tr>
        </thead>
        <tbody>
          {paginatedForks(sortedForks, activePage, itemsCountPerPage).map(
            (fork) => (
              <ForkLine key={fork.nameWithOwner} info={fork} />
            )
          )}
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
};
ResultTable.propTypes = {
  forks: PropTypes.arrayOf(ForkLinePropTypes.info).isRequired,
  activePage: PropTypes.number.isRequired,
  itemsCountPerPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default ResultTable;
