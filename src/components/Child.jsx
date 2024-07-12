import { memo } from "react";

const Child = memo(function Child() {
  return <span>{Math.random()}</span>;
});

export default Child;
