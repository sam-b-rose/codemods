import { API, FileInfo, Options } from 'jscodeshift'
const applyTransform = require('jscodeshift/dist/testUtils').applyTransform
import prettier from 'prettier'

interface ParserExtensionMap {
  [key: string]: prettier.BuiltInParserName
}

const parserExtensionMap: ParserExtensionMap = {
  tsx: 'typescript',
  scss: 'scss',
} as const

interface TestArgs {
  it: string
  original: string
  expected: string
  transformer: (file: FileInfo, jscodeshift: API, options: Options) => void
  options?: Options
  mode?: 'only' | 'skip' | 'standard'
  extension?: keyof typeof parserExtensionMap
  before?: () => void
  after?: () => void
}

export function check({
  it: name,
  original,
  expected,
  transformer,
  options = {},
  extension = 'tsx',
  before = () => {},
  after = () => {},
  mode = 'standard',
}: TestArgs) {
  const parser = parserExtensionMap[extension]
  const run = mode === 'only' ? it.only : mode === 'skip' ? it.skip : it

  run(name, () => {
    before()
    try {
      const output = applyTransform(
        { default: transformer, parser: 'tsx' },
        options,
        { source: original },
      )
      expect(prettier.format(output, { parser })).toBe(
        prettier.format(expected, { parser }),
      )
    } catch (e) {
      // a failed assertion will throw
      after()
      throw e
    }
    // will only be hit if we don't throw
    after()
  })
}
