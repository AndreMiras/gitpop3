import React from "react";
import renderer from "react-test-renderer";
import ForkLine from "./ForkLine";

test("renders", () => {
  const info = {
    nameWithOwner: "django/django",
    stargazerCount: 123,
    forkCount: 321,
    defaultBranchRef: {
      target: {
        committedDate: "2020-08-29T14:23:26Z",
        history: {
          totalCount: 1234,
        },
      },
    },
  };
  const spy = jest
    .spyOn(Date, "now")
    .mockImplementation(() => new Date("2020-12-08T19:18:03.135Z").valueOf());
  const tree = renderer.create(<ForkLine info={info} />).toJSON();
  spy.mockRestore();
  expect(tree).toMatchSnapshot();
});
