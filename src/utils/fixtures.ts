const origin = {
  nameWithOwner: "django/django",
  stargazerCount: 54393,
  forkCount: 23386,
  defaultBranchRef: {
    target: {
      committedDate: "2020-12-18T08:23:22Z",
      history: {
        totalCount: 29060,
      },
    },
  },
};

const forks = [
  {
    nameWithOwner: "django-nonrel/django",
    stargazerCount: 214,
    forkCount: 84,
    defaultBranchRef: {
      target: {
        committedDate: "2020-08-29T14:23:26Z",
        history: {
          totalCount: 13990,
        },
      },
    },
  },
  {
    nameWithOwner: "FlipperPA/django-mssql-backend",
    stargazerCount: 18,
    forkCount: 2,
    defaultBranchRef: {
      target: {
        committedDate: "2020-01-13:11:12Z",
        history: {
          totalCount: 28017,
        },
      },
    },
  },
];

const originAndForks = [origin, ...forks];

export { origin, forks, originAndForks };
