type Node = {
  nameWithOwner: string;
  stargazerCount: number;
  forkCount: number;
  object: {
    committedDate: string;
    history: {
      totalCount: number;
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
