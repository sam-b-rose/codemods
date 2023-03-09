import core, {Collection} from 'jscodeshift';

export function renameProps(
  _j: core.JSCodeshift,
  source: Collection<any>,
  componentName: string,
  props: {[from: string]: string},
) {
  const fromProps = Object.keys(props);
  const isFromProp = (prop: unknown): prop is keyof typeof props =>
    fromProps.includes(prop as string);

  source.findJSXElements(componentName)?.forEach((path) => {
    path.node.openingElement.attributes?.forEach((node) => {
      if (node.type === 'JSXAttribute' && isFromProp(node.name.name)) {
        node.name.name = props[node.name.name];
      }
    });
  });

  return source;
}
