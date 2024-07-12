import { useState, useCallback } from "react";
import Child from "./Child";

const Parent = () => {
  const [count, setCount] = useState(0);
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);

  //child1 未使用useCallback
  const handleCount1 = () => {
    setCount1(count1 + 1);
  }
  //child2 使用useCallback緩存函數
  const handleCount2 = useCallback(() => {
    setCount2(count2 + 1);
    //依賴函數設為count2 當count2的數值改變時才會重新生成函數
  }, [count2])


  return (
    <div>
      Count : {count}
      <button onClick={() => setCount(count + 1)}>Click !</button>
      <br />
      <br />
      {/*  */}
      child1: <Child click1={handleCount1} />
      <br />
      <br />
      {/*  */}
      child2:
      <Child click2={handleCount2} />
    </div>
  );
};

export default Parent;
