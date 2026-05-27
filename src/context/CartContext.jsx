"use client";

import {
  createContext,
  useContext,
  useState,
} from "react";

const CartContext =
  createContext();

export function CartProvider({
  children,
}) {

  const [cartItems, setCartItems] =
    useState([]);

  /* ───────── Add To Cart ───────── */

  const addToCart = ({
    product,
    qty,
    note,
  }) => {

    setCartItems((prev) => {

      const existing =
        prev.find(
          (item) =>
            item.id === product.id
        );

      /* Produk sudah ada */
      if (existing) {

        return prev.map((item) =>
          item.id === product.id
            ? {
                ...item,

                cartQty:
                  Math.min(
                    item.stock,
                    item.cartQty + qty
                  ),

                note,
              }
            : item
        );
      }

      /* Produk baru */
      return [
        ...prev,

        {
          ...product,

          cartQty: qty,

          note,

          checked: true,
        },
      ];
    });
  };

  /* ───────── Toggle Single ───────── */

  const toggleCheck = (id) => {

    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              checked: !item.checked,
            }
          : item
      )
    );
  };

  /* ───────── Toggle All ───────── */

  const toggleAll = () => {

    const allChecked =
      cartItems.length > 0 &&
      cartItems.every(
        (item) => item.checked
      );

    setCartItems((prev) =>
      prev.map((item) => ({
        ...item,
        checked: !allChecked,
      }))
    );
  };

  /* ───────── Delete ───────── */

  const deleteItem = (id) => {

    setCartItems((prev) =>
      prev.filter(
        (item) => item.id !== id
      )
    );
  };

  /* ───────── Update Quantity ───────── */

  const updateCartQty = (
    id,
    type
  ) => {

    setCartItems((prev) =>
      prev.map((item) => {

        if (item.id !== id) {
          return item;
        }

        const nextQty =
          type === "increase"
            ? Math.min(
                item.stock,
                item.cartQty + 1
              )
            : Math.max(
                1,
                item.cartQty - 1
              );

        return {
          ...item,
          cartQty: nextQty,
        };
      })
    );
  };

  /* ───────── Total Price ───────── */

  const totalPrice =
    cartItems

      .filter(
        (item) => item.checked
      )

      .reduce(
        (sum, item) =>
          sum +
          item.price *
            item.cartQty,

        0
      );

  /* ───────── Total Selected Items ───────── */

  const totalItems =
    cartItems

      .filter(
        (item) => item.checked
      )

      .reduce(
        (sum, item) =>
          sum + item.cartQty,

        0
      );

  /* ───────── Clear Cart ───────── */

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{

        /* state */
        cartItems,

        totalPrice,

        totalItems,

        /* actions */
        addToCart,

        toggleCheck,

        toggleAll,

        deleteItem,

        updateCartQty,

        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}