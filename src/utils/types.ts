type Node = {
  nameWithOwner: string;
  stargazerCount: number;
  forkCount: number;
  defaultBranchRef: {
    target: {
      committedDate: string;
      history: {
        totalCount: number;
      };
    };
  };
};

type Repository = Node & {
  forks: {
    nodes: Node[];
  };
};
type Result = {
  data: {
    repository: Repository;
  };
};

export type { Node, Result };
