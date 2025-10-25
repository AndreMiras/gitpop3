import { FunctionComponent } from "react";
import { Node } from "../utils/types";
import timeSince from "../utils/time";
import RepoLink from "./RepoLink";

type ForkLineProps = {
  info: Node;
};

const ForkLine: FunctionComponent<ForkLineProps> = ({ info }) => (
  <tr>
    <td>
      <RepoLink nameWithOwner={info.nameWithOwner} />
    </td>
    <td>{info.stargazerCount}</td>
    <td>{info.forkCount}</td>
    <td>{info.defaultBranchRef.target.history.totalCount}</td>
    <td>{timeSince(new Date(info.defaultBranchRef.target.committedDate))}</td>
  </tr>
);

export default ForkLine;
