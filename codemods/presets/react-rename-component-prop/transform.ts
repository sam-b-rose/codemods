import type { API, FileInfo, Options } from 'jscodeshift'
import { renameProps } from '../../../utils/jsx'

export default function transform(
  file: FileInfo,
  { jscodeshift: j }: API,
  options: Options,
) {
  if (!options.componentName || !options.from || !options.to) {
    throw new Error('Missing required options: componentName, from, to')
  }

  const source = j(file.source)
  const componentName = options.componentName
  const props = { [options.from]: options.to }

  renameProps(j, source, componentName, props)

  return source.toSource()
}

export const extensions = ['js', 'ts', 'jsx', 'tsx']
export const options = {
  componentName: {
    name: 'componentName',
    type: 'string',
    description: 'The JSX element to target.',
  },
  from: {
    name: 'from',
    type: 'string',
    description: 'The target prop to rename.',
  },
  to: {
    name: 'to',
    type: 'string',
    description: 'The desired new prop name.',
  },
}
