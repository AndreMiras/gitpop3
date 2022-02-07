import { FunctionComponent, useState } from "react";
import { orderBy as lodashOrderBy } from "lodash";
import { OverlayTrigger, Table, Tooltip } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Pagination from "react-js-pagination";
import { Node } from "../utils/types";
import ForkLine from "./ForkLine";

type Direction = "desc" | "asc";

type SortFunc = (collection: any, order: Direction) => any;

const paginatedForks = (
  forks: Node[],
  activePage: number,
  itemsCountPerPage: number
) =>
  forks.slice(
    (activePage - 1) * itemsCountPerPage,
    activePage * itemsCountPerPage
  );

const sortIconDirection = (direction: Direction) =>
  direction === "asc" ? "sort-down" : "sort-up";

type SortIconProps = {
  column: string;
  orderBy: {
    column: string;
    direction: Direction;
  };
};

const SortIcon: FunctionComponent<SortIconProps> = ({ column, orderBy }) => (
  <FontAwesomeIcon
    icon={
      orderBy.column === column ? sortIconDirection(orderBy.direction) : "sort"
    }
  />
);

type HeaderModifiedProps = {
  onHeaderClick: (column: string, sortFunc: SortFunc) => void;
  // TODO
  sortByCommittedDate: SortFunc;
  orderBy: {
    column: string;
    direction: Direction;
  };
};

const HeaderModified: FunctionComponent<HeaderModifiedProps> = ({
  onHeaderClick,
  sortByCommittedDate,
  orderBy,
}) => (
  <OverlayTrigger
    transition={false}
    overlay={<Tooltip id="last-commit-tooltip">Last commit on master.</Tooltip>}
  >
    <th onClick={() => onHeaderClick("committedDate", sortByCommittedDate)}>
      <FontAwesomeIcon icon="calendar-alt" /> Modified{" "}
      <SortIcon column="committedDate" orderBy={orderBy} />
    </th>
  </OverlayTrigger>
);

type ResultTableProps = {
  forks: Node[];
  activePage: number;
  itemsCountPerPage: number;
  onPageChange: (pageNumber: number) => void;
};

const ResultTable: FunctionComponent<ResultTableProps> = ({
  forks,
  activePage,
  itemsCountPerPage,
  onPageChange,
}) => {
  const sortObjectsFunc =
    (attribute: (attribute: any) => any) =>
    (collection: any[], order: Direction) =>
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
  const [orderBy, setOrderBy] = useState<{
    column: string;
    direction: Direction;
    sortFunc: SortFunc;
  }>({
    column: "stargazerCount",
    direction: "desc",
    sortFunc: sortByStargazerCount,
  });
  const onHeaderClick = (column: string, sortFunc: SortFunc) => {
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

export default ResultTable;
