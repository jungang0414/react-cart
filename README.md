# Vite + React

### 如何在本地使用
1. 複製專案
```
git clone https://github.com/jungang0414/react-cart.git
```

2. 切換路徑到專案資料夾
```
cd react-cart
```

3. 安裝所有依賴項目
```
npm install
```

4. 啟動專案
```
npm run dev
```

## 知識點

React的re-render的時機

1. state改變
2. props改變


## useEffect

- 依賴變化時執行副作用
- 給函數組件模擬生命週期

##### 頁面渲染後useEffect才會執行, 換句話說就是Effect延遲了一段程式碼的執行,直到渲染反映在頁面上.

### useEffect運行

```
1.  (state/props)
useEffect(() => {
    //在每一次渲染後執行
});

當任意的props和state發生變化都會執行useEffect

2.
useEffect(() => {
    //只在元件出現的第一次執行
}, []);

保證在清除函數執行前執行一次useEffect

3.
useEffect(() => {
    //在元件出現的第一次執行或者是依賴數組a, b與上一次的渲染不同時
}, [a, b]);

當特定依賴數組 a,b 變化時才會執行useEffect

```
## useCallback

### useCallback運行

- 允許在多次渲染的情況下緩存函數，其目的是為了減少子組件中不必要的重複渲染。
- useCallback return 的是緩存的函數

```
useCallback(fn, dependencies) 
```

父子組件，子組件使用的是父組件的方法，當父組件更新，子組件同樣也會執行更新。
在某些場景下，更新函數是沒有必要的。所以可以使用useCallback緩存函數，再傳遞給子組件使用。


## memo

### memo運行

- 利用淺比較的方式
- 如果傳遞props給子組件是屬於原始型態則會比較value，若是物件則會比較記憶體位置

會依據傳入的物件重新封裝並創建一個新物件。這個新的物件會在每一次re-render前依據父組件傳入的prop有沒有更新來判斷是否需要re-render。

###### 在React中每一次的re-render，component都會指向不同的記憶體位置

#### 建構場景

- 父組件
```
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
```

- 子組件
```
import { memo } from "react";

const Child = memo(function Child() {
  return <span>{Math.random()}</span>;
});

export default Child;

```
