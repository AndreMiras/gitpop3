import { sortObjects } from "./sort";

const objects = [
  {
    foo: 3,
    bar: "c",
  },
  {
    foo: 1,
    bar: "b",
  },
  {
    foo: 2,
    bar: "a",
  },
];

test("number", () => {
  const attribute = (x) => x.foo;
  const sorted = sortObjects(objects, attribute);
  const expected = [
    {
      foo: 1,
      bar: "b",
    },
    {
      foo: 2,
      bar: "a",
    },
    {
      foo: 3,
      bar: "c",
    },
  ];
  expect(sorted).toEqual(expected);
  const reverse = sortObjects(objects, attribute, true);
  expect(reverse).toEqual(expected.reverse());
});

test("string", () => {
  const attribute = (x) => x.bar;
  const sorted = sortObjects(objects, attribute);
  const expected = [
    {
      foo: 2,
      bar: "a",
    },
    {
      foo: 1,
      bar: "b",
    },
    {
      foo: 3,
      bar: "c",
    },
  ];
  expect(sorted).toEqual(expected);
  const reverse = sortObjects(objects, attribute, true);
  expect(reverse).toEqual(expected.reverse());
});
