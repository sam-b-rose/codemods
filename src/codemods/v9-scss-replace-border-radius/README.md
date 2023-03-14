# `v9-scss-replace-border-radius`

Replace usage of the legacy SCSS `border-radius()`) function in `border-radius` declarations with corresponding Polaris [shape](https://polaris.shopify.com/tokens/shape) tokens.

```diff
- border-radius: border-radius();
+ border-radius: var(--p-border-radius-1);

- border-radius: border-radius(large);
+ border-radius: var(--p-border-radius-large);
```
