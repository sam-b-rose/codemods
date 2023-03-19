import type { FileInfo, API, Options } from 'jscodeshift'

import v9ScssReplaceBorderRadius from './v9-scss-replace-border-radius/transform'

export default function transform(
  fileInfo: FileInfo,
  api: API,
  options: Options,
) {
  const transforms = [v9ScssReplaceBorderRadius]
  return transforms.reduce((source, transform) => {
    return transform({ ...fileInfo, source }, api, options)
  }, fileInfo.source)
}

export const extensions = ['css', 'scss']
export const options = {
  namespace: {
    name: 'namespace',
    type: 'string',
    description: 'Provide an optional SCSS module namespace to target.',
  },
}
