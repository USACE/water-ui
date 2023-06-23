// https://blog.hackages.io/conditionally-wrap-an-element-in-react-a8b9a47fab2

function ConditionalWrapper({ condition, wrapper, children }) {
  return condition ? wrapper(children) : children;
}

export { ConditionalWrapper, ConditionalWrapper as default };
