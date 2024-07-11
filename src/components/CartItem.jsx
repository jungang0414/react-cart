const CartItem = ({ index, item, addItem, subItem, selectItem }) => {
  return (
    <>
      <li className="item">
        <div className="sell-box">
          <input
            type="checkbox"
            checked={item.selected}
            onChange={() => selectItem(index)}
          />
        </div>
        <div className="itemname-box">
          <img src="https://via.placeholder.com/150" alt="商品圖片" />
          <span>{item.name}</span>
        </div>
        <div className="price-box">
          NT$<span className="price">{item.price}</span>
        </div>
        <div className="count-box">
          <button onClick={() => subItem(index)}>-</button>
          <input
            type="number"
            value={item.count}
            onChange={(newValue) => {
              console.log(newValue);
            }}
          />
          <button onClick={() => addItem(index)}>+</button>
        </div>
        <div className="amount-box">
          <span className="price">{(item.price * item.count).toFixed(2)}</span>
        </div>
        <div className="action-box">
          <a href="#">移除商品</a>
        </div>
      </li>
    </>
  );
};

export default CartItem;
