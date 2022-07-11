import React, { useState, useContext, createContext, useEffect } from "react";

const ShopContext = createContext();

export const StateContext = ({ children }) => {
  const ISSERVER = typeof window === "undefined";

  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [qty, setQty] = useState(1);
  const [productMedia, setProductMedia] = useState({
    isOpen: false,
    url: "",
  });
  const [openProfileDiv, setOpenProfileDiv] = useState(false);
  useEffect(() => {
    let check = localStorage.getItem("cart");
    if (check) {
      setCartItems(JSON.parse(localStorage.getItem("cart")));
    } else setCartItems([]);
  }, []);
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
      localStorage.setItem(
        "cart",
        JSON.stringify(
          cartItems.map((e) =>
            e.slug === product.slug
              ? { ...exist, quantity: quantity + e.quantity }
              : e
          )
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, quantity: quantity }]);
      localStorage.setItem(
        "cart",
        JSON.stringify([...cartItems, { ...product, quantity: quantity }])
      );
    }
  };
  // * Remove product
  const onRemove = (product) => {
    const exist = cartItems.find((e) => product.slug === e.slug);
    if (exist.quantity === 1) {
      setCartItems(cartItems.filter((e) => e.slug !== product.slug));
      localStorage.setItem(
        "cart",
        JSON.stringify(cartItems.filter((e) => e.slug !== product.slug))
      );
    } else {
      setCartItems(
        cartItems.map((e) =>
          e.slug === product.slug ? { ...e, quantity: e.quantity - 1 } : e
        )
      );
      localStorage.setItem(
        "cart",
        cartItems.map((e) =>
          e.slug === product.slug ? { ...e, quantity: e.quantity - 1 } : e
        )
      );
    }
  };
  // * Get total quantity
  const getTotalQuantity = () => {
    let total = 0;
    if (cartItems.length > 0) {
      cartItems.map((e) => (total += e.quantity));
    }
    return total;
  };
  const getTotalPrice = () => {
    let total = 0;
    if (cartItems.length > 0) {
      cartItems.map((e) => (total += e.price * e.quantity));
    }
    return total;
  };

  const toggleProfileDiv = () => {
    setOpenProfileDiv(!openProfileDiv);
  };
  let subtotal = getTotalPrice();
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
        getTotalQuantity,
        subtotal,
        productMedia,
        setProductMedia,
        openProfileDiv,
        toggleProfileDiv,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useStateContext = () => useContext(ShopContext);
