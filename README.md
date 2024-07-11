# Vite + React

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


