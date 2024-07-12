import { useCallback, useState } from "react";
import cartLists from "../utils/cart.json";
import "./Cart.css";
import { useEffect } from "react";
import CartItem from "./CartItem";

const Cart = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    !cart.length && setCart(cartLists);
  }, []);

  //增加商品數量
  const addItem = useCallback(
    (i) => {
      console.log("AddItem", i);
      setCart(
        cart.map((item, _i) => {
          _i === i && item.count++;
          return item;
        })
      );
    },
    [cart]
  );

  //減少商品數量
  const subItem = useCallback(
    (i) => {
      console.log("SubItem", i);
      setCart(
        cart.map((item, _i) => {
          _i === i && item.count && item.count--;
          return item;
        })
      );
    },
    [cart]
  );

  //移除商品

  //選取商品 使用useCallback避免重複創建函數
  const selectItem = useCallback(
    (i) => {
      //選取商品的item
      const item = cart.find((item, _i) => {
        console.log("_i", _i);
        return _i === i;
      });

      if (item) {
        //反轉選取狀態
        item.selected = !item.selected;

        //修改數據
        setCart([...cart]);
      }
    },
    [cart]
  );

  //計算商品總數
  const getTotalCount = useCallback(() => {
    return cart
      .filter((item) => item.selected)
      .reduce((pv, cv, i) => {
        return pv + cv.count;
      }, 0);
  }, [cart]);

  //計算商品總價
  const getTotalPrice = useCallback(() => {
    return cart
      .filter((item) => item.selected)
      .reduce((pv, cv, i) => {
        return pv + cv.price * cv.count;
      }, 0);
  }, [cart]);

  return (
    <div className="cart-wrapper">
      <div className="table-top">
        <div className="sell-box">
          <input type="checkbox" />
          <i>全選</i>
        </div>

        {/* 購物車標題 */}
        <span className="itemname-box">商品名稱</span>
        <span>單價</span>
        <span className="itemcount-box">數量</span>
        <span>總額</span>
        <span>操作</span>
      </div>

      {/* 購物車商品內容 */}
      <div className="cart-middle">
        <ul>
          {cart.map((item, i) => (
            <CartItem
              item={item}
              key={item.name}
              index={i}
              addItem={addItem}
              subItem={subItem}
              selectItem={selectItem}
            />
          ))}
        </ul>

        {/* 購物車結算區 */}
        <div className="bottom">
          <div className="left"></div>
          <div className="count-box">
            已選商品 <span className="price">{getTotalCount()}</span> 件
          </div>
          <div className="amount-box">
            總計 <span className="price">{getTotalPrice()}</span>
          </div>
          <div className="pay-box">
            <i>結帳</i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
