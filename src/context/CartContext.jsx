"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";

const CartContext =
  createContext();

export function CartProvider({
  children,
}) {
  const [cartItems, setCartItems] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const loadCart = () => {
      const saved = localStorage.getItem("stokaja_cart");
      if (saved) {
        try {
          setCartItems(JSON.parse(saved));
        } catch (e) {
          console.error("Gagal membaca cart dari localStorage", e);
        }
      }
    };

    loadCart();
    setIsLoaded(true);

    // Sinkronisasi antar tab
    const handleStorageChange = (e) => {
      if (e.key === "stokaja_cart") {
        loadCart();
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // Save to localStorage whenever cartItems changes
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("stokaja_cart", JSON.stringify(cartItems));
    }
  }, [cartItems, isLoaded]);

  /* ───────── Add To Cart ───────── */

  const addToCart = ({ product, qty, note }) => {
    // SECURITY PATCH: Jangan izinkan masuk keranjang jika stok habis
    if (product.stock <= 0) return;

    setCartItems((prev) => {

      const existing =
        prev.find(
          (item) =>
            item.id === product.id
        );

      /* Produk sudah ada */
      if (existing) {

        return prev.map((item) => {
          if (item.id === product.id) {
            const newQty = Math.min(item.stock, item.cartQty + qty);
            const newNote = note ? (item.note ? `${item.note}, ${note}` : note) : item.note;
            return { ...item, cartQty: newQty, note: newNote };
          }
          return item;
        });
      }

      /* Produk baru */
      return [
        ...prev,
        {
          ...product,
          cartQty: Math.min(product.stock, qty),
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
    setCartItems((prev) => prev.filter((item) => !item.checked));
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
