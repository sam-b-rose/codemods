import { check } from '../../../../testUtils/check'
import transformer from './transform'

describe('v9-scss-replace-border-radius transform', () => {
  check({
    transformer,
    extension: 'scss',
    it: 'should replace the border-radius() function with the proper @shopify/polaris-token',
    original: `
    .border-radius {
      /* Migrate */
      border-radius: border-radius();
      border-radius: border-radius(base);
      border-radius: border-radius(large);

      /* Ignore */
      border-radius: calc(border-radius(base) * 2);
      border-radius: calc(border-radius() * rem(1px));

      /* Comment */
      border-radius: border-radius(base) * 2;
      border-radius: border-radius() * rem(1px);
      border-top-right-radius: border-radius() * rem(4px);
    }
  `,
    expected: `
    .border-radius {
      /* Migrate */
      border-radius: var(--p-border-radius-base);
      border-radius: var(--p-border-radius-base);
      border-radius: var(--p-border-radius-large);

      /* Ignore */
      border-radius: calc(border-radius(base) * 2);
      border-radius: calc(border-radius() * rem(1px));

      /* Comment */
      // polaris-migrator: Unable to migrate the following expression. Please upgrade manually.
      // border-radius: var(--p-border-radius-base) * 2;
      border-radius: border-radius(base) * 2;
      // polaris-migrator: Unable to migrate the following expression. Please upgrade manually.
      // border-radius: var(--p-border-radius-base) * rem(1px);
      border-radius: border-radius() * rem(1px);
      // polaris-migrator: Unable to migrate the following expression. Please upgrade manually.
      // border-top-right-radius: var(--p-border-radius-base) * rem(4px);
      border-top-right-radius: border-radius() * rem(4px);
    }
  `,
  })

  check({
    transformer,
    extension: 'scss',
    options: { namespace: 'legacy-polaris-v8' },
    it: 'should replace the border-radius() function with a module namespace',
    original: `
    @use 'global-styles/legacy-polaris-v8';

    .border-radius {
      /* Migrate */
      border-radius: legacy-polaris-v8.border-radius();
      border-radius: legacy-polaris-v8.border-radius(base);
      border-radius: legacy-polaris-v8.border-radius(large);

      /* Ignore */
      border-radius: calc(legacy-polaris-v8.border-radius(base) * 2);
      border-radius: calc(
        legacy-polaris-v8.border-radius() * legacy-polaris-v8.rem(1px)
      );

      /* Comment */
      border-radius: legacy-polaris-v8.border-radius(base) * 2;
      border-radius: legacy-polaris-v8.border-radius() * legacy-polaris-v8.rem(1px);
      border-top-right-radius: legacy-polaris-v8.border-radius() *
        legacy-polaris-v8.rem(4px);
    }
  `,
    expected: `
    @use 'global-styles/legacy-polaris-v8';

    .border-radius {
      /* Migrate */
      border-radius: var(--p-border-radius-base);
      border-radius: var(--p-border-radius-base);
      border-radius: var(--p-border-radius-large);

      /* Ignore */
      border-radius: calc(legacy-polaris-v8.border-radius(base) * 2);
      border-radius: calc(
        legacy-polaris-v8.border-radius() * legacy-polaris-v8.rem(1px)
      );

      /* Comment */
      // polaris-migrator: Unable to migrate the following expression. Please upgrade manually.
      // border-radius: var(--p-border-radius-base) * 2;
      border-radius: legacy-polaris-v8.border-radius(base) * 2;
      // polaris-migrator: Unable to migrate the following expression. Please upgrade manually.
      // border-radius: var(--p-border-radius-base) * legacy-polaris-v8.rem(1px);
      border-radius: legacy-polaris-v8.border-radius() * legacy-polaris-v8.rem(1px);
      // polaris-migrator: Unable to migrate the following expression. Please upgrade manually.
      // border-top-right-radius: var(--p-border-radius-base) * legacy-polaris-v8.rem(4px);
      border-top-right-radius: legacy-polaris-v8.border-radius() *
        legacy-polaris-v8.rem(4px);
    }
  `,
  })
})
