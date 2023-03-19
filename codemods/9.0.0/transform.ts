import type { FileInfo, API, Options } from 'jscodeshift'

import v9ScssReplaceBorderRadius from './v9-scss-replace-border-radius/transform.js'

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

transform.extensions = ['css', 'scss']
transform.options = {
  namespace: {
    name: 'namespace',
    type: 'string',
    description: 'Provide an optional SCSS module namespace to target.',
  },
}
