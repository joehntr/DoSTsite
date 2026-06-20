/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight } from 'lucide-react';
import { SHOP_ITEMS } from '../data';
import { ShopItem } from '../types';

interface ShopComingSoonProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CartItem extends ShopItem {
  quantity: number;
}

export default function ShopComingSoon({ isOpen, onClose }: ShopComingSoonProps) {
  const [cart, setCart] = useState<CartItem[]>([]);

  const handleAddToCart = (item: ShopItem) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const handleIncrement = (id: string) => {
    setCart(prev => prev.map(i => i.id === id ? { ...i, quantity: i.quantity + 1 } : i));
  };

  const handleDecrement = (id: string) => {
    setCart(prev => prev.map(i => {
      if (i.id === id) {
        const nextQty = i.quantity - 1;
        return nextQty <= 0 ? null : { ...i, quantity: nextQty };
      }
      return i;
    }).filter(Boolean) as CartItem[]);
  };

  const handleRemove = (id: string) => {
    setCart(prev => prev.filter(i => i.id !== id));
  };

  const calculateTotal = () => {
    const sum = cart.reduce((acc, item) => {
      const numericPrice = parseFloat(item.price.replace('$', ''));
      return acc + (numericPrice * item.quantity);
    }, 0);
    return `$${sum.toFixed(2)}`;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden" role="dialog" aria-modal="true">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-stone-900 transition-opacity"
          />

          {/* Drawer container */}
          <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="w-screen max-w-md bg-stone-50 border-l-4 border-black flex flex-col"
            >
              {/* Header */}
              <div className="p-6 border-b-4 border-black flex items-center justify-between bg-white">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="text-black" size={20} />
                  <h3 className="font-display font-black text-lg tracking-tight uppercase text-zinc-950">
                    D.ST SOUVENIR SHOP
                  </h3>
                </div>
                <button
                  onClick={onClose}
                  className="p-1 hover:bg-black hover:text-white rounded transition-colors duration-150"
                  id="close_shop_btn"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Body split - Cart and Goods Catalog */}
              <div className="flex-1 overflow-y-auto p-6 space-y-8">
                {/* 1. Sandbox Info Box */}
                <div className="bg-[#e0f2fe] border-2 border-dashed border-[#0284c7]/40 p-4 rounded text-xs leading-relaxed text-indigo-950">
                  <span className="font-mono font-extrabold uppercase text-[#0284c7] block mb-1">
                    [MOCK TRANSACTIONS sandbox]
                  </span>
                  This store has been built in mock mode using client storage. You can test adding items to your cart, increasing quantities, and testing the layouts freely!
                </div>

                {/* 2. Custom Catalog Shelf */}
                <div className="space-y-4">
                  <div className="font-mono text-[10px] font-black text-rose-600 uppercase tracking-widest border-b border-black/10 pb-1">
                    [A.01] CURATED ANOMALOUS MERCHANDISE
                  </div>
                  <div className="grid grid-cols-1 gap-6">
                    {SHOP_ITEMS.map(item => (
                      <div
                        key={item.id}
                        className="bg-white rounded p-3 flex gap-3.5 items-center"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover border border-black/10 rounded overflow-hidden"
                          referrerPolicy="no-referrer"
                        />
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <h4 className="font-sans font-bold text-xs text-stone-900 leading-tight max-w-[130px]">
                              {item.name}
                            </h4>
                            <span className="font-mono text-xs font-black text-stone-900">{item.price}</span>
                          </div>
                          <p className="text-[10px] text-stone-500 font-sans mt-1 leading-normal max-w-[180px]">
                            {item.description}
                          </p>
                          <button
                            onClick={() => handleAddToCart(item)}
                            className="mt-2 px-2 py-1 bg-black text-white hover:bg-rose-500 transition-colors text-[9px] font-mono font-bold uppercase rounded flex items-center gap-1 cursor-pointer"
                            id={`add_to_cart_btn_${item.id}`}
                          >
                            <Plus size={10} /> ADD TO BASKET
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 3. Realtime Local Cart Display */}
                <div className="space-y-4 pt-6 border-t border-black/10">
                  <div className="font-mono text-[10px] font-black text-[#bf5b00] uppercase tracking-widest border-b border-black/10 pb-1 flex justify-between items-center">
                    <span>[B.01] ACTIVE SHOPPING BASKET</span>
                    <span>({cart.reduce((s, i) => s + i.quantity, 0)} Items)</span>
                  </div>

                  {cart.length === 0 ? (
                    <div className="text-center py-6 text-stone-400 font-mono text-xs select-none">
                      Basket is currently empty.
                      <br />
                      Try adding some high-grade anomalies above!
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {cart.map(item => (
                        <div key={item.id} className="flex items-center justify-between bg-stone-100 p-2.5 rounded border border-black/5 text-xs text-stone-800">
                          <div className="font-sans font-bold text-stone-900 max-w-[150px] truncate">
                            {item.name}
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="flex items-center border border-stone-300 rounded bg-white">
                              <button
                                onClick={() => handleDecrement(item.id)}
                                className="p-1 hover:bg-stone-50"
                                id={`dec_cart_qty_${item.id}`}
                              >
                                <Minus size={10} />
                              </button>
                              <span className="px-2 font-mono text-[11px] font-black">{item.quantity}</span>
                              <button
                                onClick={() => handleIncrement(item.id)}
                                className="p-1 hover:bg-stone-50"
                                id={`inc_cart_qty_${item.id}`}
                              >
                                <Plus size={10} />
                              </button>
                            </div>
                            <button
                              onClick={() => handleRemove(item.id)}
                              className="text-stone-400 hover:text-rose-600 p-1"
                              id={`remove_cart_item_${item.id}`}
                            >
                              <Trash2 size={12} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Checkout / total block */}
              {cart.length > 0 && (
                <div className="p-6 border-t-4 border-black bg-white space-y-4 select-none">
                  <div className="flex justify-between items-center font-display font-black text-base text-stone-900">
                    <span>ESTIMATED TOTAL:</span>
                    <span className="text-rose-600 font-mono text-lg">{calculateTotal()}</span>
                  </div>
                  <button
                    onClick={() => {
                      alert('Secure Checkout initiated! The transaction is simulated successfully. Thank you for scanning the shop pipeline.');
                      setCart([]);
                      onClose();
                    }}
                    className="w-full bg-black text-white hover:bg-[#22c55e] transition-colors p-3 font-display font-black text-xs tracking-wider uppercase text-center flex items-center justify-center gap-2 cursor-pointer"
                    id="checkout_shop_btn"
                  >
                    <span>SECURE SEC-CLEARANCE CHECKOUT</span>
                    <ArrowRight size={14} />
                  </button>
                  <p className="text-[8px] font-mono text-stone-400 text-center uppercase">
                    Processed safely under Act #881-A. Shipments encrypted worldwide.
                  </p>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
