import { API, FileInfo, Options } from 'jscodeshift';
const applyTransform = require('jscodeshift/dist/testUtils').applyTransform;

interface TestArgs {
  it: string;
  original: string;
  expected: string;
  transformer: (file: FileInfo, jscodeshift: API, options: Options) => void;
  options?: Options,
  mode?: 'only' | 'skip' | 'standard';
  before?: () => void;
  after?: () => void;
}

export function check({
  it: name,
  original,
  expected,
  transformer,
  options = {},
  before = () => {},
  after = () => {},
  mode = 'standard',
}: TestArgs) {
  const run = mode === 'only' ? it.only : mode === 'skip' ? it.skip : it;

  run(name, () => {
    before();
    try {
      const output = applyTransform(
        { default: transformer, parser: 'tsx' },
        options,
        { source: original },
      );
      expect(output).toBe(expected.trim());
    } catch (e) {
      // a failed assertion will throw
      after();
      throw e;
    }
    // will only be hit if we don't throw
    after();
  });
}
