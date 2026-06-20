/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Instagram, Mail, CheckCircle2, Send, ShieldAlert } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    // Simulate encryption and routing to "Sector 4"
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({ name: '', email: '', message: '' });
    }, 1500);
  };

  return (
    <section id="contact" className="max-w-4xl mx-auto px-4 py-16 overflow-visible">
      {/* Title */}
      <div className="text-center mb-10 select-none">
        <h2 className="font-sans font-black text-xl tracking-[0.18em] uppercase leading-snug text-neutral-900 inline-block">
          CONTACT
        </h2>
      </div>

      {/* Social Icons Links */}
      <div className="flex justify-center items-center gap-8 mb-4 select-none">
        {/* Instagram */}
        <a
          href="https://www.instagram.com/joehntr/"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center justify-center w-14 h-14 bg-white hover:bg-stone-50 rounded-full shadow-[0_4px_8px_rgba(0,0,0,0.15)] hover:shadow-[0_6px_12px_rgba(0,0,0,0.20)] transition-all duration-200 hover:scale-105 hover:translate-y-[-2px] active:translate-y-[1px] active:shadow-[0_2px_4px_rgba(0,0,0,0.12)] cursor-pointer"
          title="Instagram Profile"
          id="instagram_link"
        >
          <Instagram className="text-zinc-900 group-hover:text-rose-600 transition-transform" size={24} />
        </a>

        {/* Email */}
        <a
          href="mailto:departmentofstrangethings@gmail.com"
          className="group flex items-center justify-center w-14 h-14 bg-white hover:bg-stone-50 rounded-full shadow-[0_4px_8px_rgba(0,0,0,0.15)] hover:shadow-[0_6px_12px_rgba(0,0,0,0.20)] transition-all duration-200 hover:scale-105 hover:translate-y-[-2px] active:translate-y-[1px] active:shadow-[0_2px_4px_rgba(0,0,0,0.12)] cursor-pointer"
          title="Send Email"
          id="email_link"
        >
          <Mail className="text-zinc-900 group-hover:text-sky-600 transition-transform" size={24} />
        </a>
      </div>

      {/* Contact form hidden for now */}
    </section>
  );
}
