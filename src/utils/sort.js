const sortByString = (attribute) => (a, b) =>
  attribute(a).toLowerCase().localeCompare(attribute(b).toLowerCase());
const sortByNumber = (attribute) => (a, b) => attribute(a) - attribute(b);
const sortByAnything = (attribute) => (a, b) =>
  typeof attribute(a) === "number"
    ? sortByNumber(attribute)(a, b)
    : sortByString(attribute)(a, b);
const sortObjectsFunc = sortByAnything;

/**
 * Sorts object by given attribute.
 */
const sortObjects = (objects, attribute, reverse = false) =>
  objects
    .slice()
    .sort(sortByAnything(attribute))
    [reverse ? "reverse" : "slice"]();

export { sortObjects, sortObjectsFunc };
