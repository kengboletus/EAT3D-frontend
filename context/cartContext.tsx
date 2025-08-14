/**
 * Cart Context
 *
 * Centralized state for the shopping cart. Exposes imperative helpers
 * to add, remove, update quantities, and clear the cart, plus derived
 * totals for item count and price. Components call these methods; the
 * provider keeps state and recomputes totals efficiently.
 */
import type { UnifiedInventoryItem } from "@/assets/dummies/product";
import React, { createContext, useCallback, useContext, useMemo, useState } from "react";

// Internal shape we store in context: product data + chosen quantity
type CartItem = UnifiedInventoryItem & { numOrdered: number };

type CartContextType = {
  cart: CartItem[];
  addItem: (item: UnifiedInventoryItem) => void;
  removeItem: (vmId: string, name: string) => void;
  updateQty: (vmId: string, name: string, qty: number) => void;
  setItemQty: (vmId: string, name: string, qty: number) => void;
  clear: () => void;
  totalItems: number;
  totalPrice: number;
  // VM-level rules cached so cart logic remains valid across navigation
  setVmLimit: (vmId: string, maxProducts: number) => void;
  getVmLimit: (vmId: string) => number | undefined;
};

const CartContext = createContext<CartContextType | null>(null);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [vmLimits, setVmLimits] = useState<Record<string, number>>({});

  // Adds one unit of the item; if already present, increments quantity
  const addItem = useCallback((item: UnifiedInventoryItem) => {
    setCart((prev) => {
      const idx = prev.findIndex((p) => p.vmId === item.vmId && p.name === item.name);
      if (idx > -1) {
        const next = [...prev];
        next[idx].numOrdered += 1;
        return next;
      }
      return [...prev, { ...item, numOrdered: 1 }];
    });
  }, []);

  // Removes an item entirely from the cart
  const removeItem = useCallback((vmId: string, name: string) => {
    setCart((prev) => prev.filter((p) => !(p.vmId === vmId && p.name === name)));
  }, []);

  // Updates quantity but keeps a minimum of 1 for existing rows
  const updateQty = useCallback((vmId: string, name: string, qty: number) => {
    setCart((prev) =>
      prev.map((p) =>
        p.vmId === vmId && p.name === name ? { ...p, numOrdered: Math.max(1, qty) } : p
      )
    );
  }, []);

  // Sets quantity exactly; if qty <= 0, removes the item
  const setItemQty = useCallback((vmId: string, name: string, qty: number) => {
    setCart((prev) => {
      if (qty <= 0) {
        return prev.filter((p) => !(p.vmId === vmId && p.name === name));
      }
      const idx = prev.findIndex((p) => p.vmId === vmId && p.name === name);
      if (idx === -1) return [...prev, { ...(prev[0] as any), vmId, name, numOrdered: qty } as any];
      const next = [...prev];
      next[idx] = { ...next[idx], numOrdered: qty };
      return next;
    });
  }, []);

  // Clears all items from cart
  const clear = () => setCart([]);

  // Cache VM limits so the cart can enforce caps even after route params are gone
  const setVmLimit = useCallback((vmId: string, maxProducts: number) => {
    if (!vmId || !Number.isFinite(maxProducts)) return;
    setVmLimits((prev) => ({ ...prev, [vmId]: maxProducts }));
  }, []);

  const getVmLimit = useCallback((vmId: string) => vmLimits[vmId], [vmLimits]);

  // Derived totals recomputed when cart changes
  const { totalItems, totalPrice } = useMemo(
    () => ({
      totalItems: cart.reduce((sum, p) => sum + p.numOrdered, 0),
      totalPrice: cart.reduce((sum, p) => sum + p.price * p.numOrdered, 0),
    }),
    [cart]
  );

  const value = { cart, addItem, removeItem, updateQty, setItemQty, clear, totalItems, totalPrice, setVmLimit, getVmLimit };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
};
