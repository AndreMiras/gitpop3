import setupSentry from './sentry';

describe('client', () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    jest.resetModules(); // most important - it clears the cache
    process.env = { ...OLD_ENV }; // make a copy
  });

  afterAll(() => {
    process.env = OLD_ENV; // restore old env
  });

  it('production settings', () => {
    expect(setupSentry()).toBe(false);
    process.env = { ...OLD_ENV, NODE_ENV: 'production' };
    expect(setupSentry()).toBe(true);
  });
});
