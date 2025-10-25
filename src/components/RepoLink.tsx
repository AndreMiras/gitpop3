import { FunctionComponent } from "react";

type RepoLinkProps = {
  nameWithOwner: string;
};

const RepoLink: FunctionComponent<RepoLinkProps> = ({ nameWithOwner }) => (
  <a href={`https://github.com/${nameWithOwner}`}>{nameWithOwner}</a>
);

export default RepoLink;
