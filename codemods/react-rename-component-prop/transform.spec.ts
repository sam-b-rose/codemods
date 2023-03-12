import { check } from '../../utils/check'
import transformer from './transform'

describe('react-rename-component-prop transform', () => {
  check({
    transformer,
    options: { componentName: 'Text', from: 'prop', to: 'newProp' },
    it: 'should rename prop to newProp without a value',
    original: `
    import {Text} from '@shopify/polaris';
    function App() {
      return <Text prop>hello</Text>;
    }
  `,
    expected: `
    import {Text} from '@shopify/polaris';
    function App() {
      return <Text newProp>hello</Text>;
    }
  `,
  })

  check({
    transformer,
    options: { componentName: 'Text', from: 'prop', to: 'newProp' },
    it: 'should rename prop to newProp with a value',
    original: `
    import {Text} from '@shopify/polaris';
    function App() {
      return <Text prop="value">hello</Text>;
    }
  `,
    expected: `
    import {Text} from '@shopify/polaris';
    function App() {
      return <Text newProp="value">hello</Text>;
    }
  `,
  })
})
