import React, { useState, useContext, createContext } from "react";

const ShopContext = createContext();

export const StateContext = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [qty, setQty] = useState(1);

  // * Increase product quantity
  const qtyPlus = () => {
    setQty((prevQty) => prevQty + 1);
  };
  // * Decrease product quantity
  const qtyMinus = () => {
    setQty((prevQty) => {
      if (prevQty > 1) {
        return prevQty - 1;
      } else return 1;
    });
  };
  // * Add product to cart
  const onAdd = (product, quantity) => {
    const exist = cartItems.find((e) => product.slug === e.slug);

    if (exist) {
      setCartItems(
        cartItems.map((e) =>
          e.slug === product.slug
            ? { ...exist, quantity: quantity + e.quantity }
            : e
        )
      );
    } else setCartItems([...cartItems, { ...product, quantity: quantity }]);
    console.log(cartItems);
  };

  const onRemove = (product) => {
    const exist = cartItems.find((e) => product.slug === e.slug);
    if (exist.quantity === 1) {
      setCartItems(cartItems.filter((e) => e.slug !== product.slug));
    } else
      setCartItems(
        cartItems.map((e) =>
          e.slug === product.slug ? { ...e, quantity: e.quantity - 1 } : e
        )
      );
  };
  return (
    <ShopContext.Provider
      value={{
        qty,
        qtyPlus,
        qtyMinus,
        showCart,
        setShowCart,
        cartItems,
        onAdd,
        onRemove,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useStateContext = () => useContext(ShopContext);
