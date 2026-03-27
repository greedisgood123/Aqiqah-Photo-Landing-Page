'use client';

import { Camera, Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <Camera className="h-8 w-8 text-primary-600" />
            <span className="font-bold text-xl">Fadhlan Khalid Photography</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button onClick={() => scrollToSection('hero')} className="text-gray-700 hover:text-primary-600 transition">Home</button>
            <button onClick={() => scrollToSection('packages')} className="text-gray-700 hover:text-primary-600 transition">Packages</button>
            <button onClick={() => scrollToSection('add-ons')} className="text-gray-700 hover:text-primary-600 transition">Add-ons</button>
            <button onClick={() => scrollToSection('portfolio')} className="text-gray-700 hover:text-primary-600 transition">Portfolio</button>
            <button onClick={() => scrollToSection('service-area')} className="text-gray-700 hover:text-primary-600 transition">Service Area</button>
            <a
              href="https://wa.me/60127704714?text=Saya%20nak%20tanya%20pakej"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-full font-medium transition"
            >
              WhatsApp
            </a>
          </div>

          {/* Mobile menu button */}
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2">
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-4 py-4 space-y-3">
            <button onClick={() => scrollToSection('hero')} className="block w-full text-left text-gray-700 hover:text-primary-600 py-2">Home</button>
            <button onClick={() => scrollToSection('packages')} className="block w-full text-left text-gray-700 hover:text-primary-600 py-2">Packages</button>
            <button onClick={() => scrollToSection('add-ons')} className="block w-full text-left text-gray-700 hover:text-primary-600 py-2">Add-ons</button>
            <button onClick={() => scrollToSection('portfolio')} className="block w-full text-left text-gray-700 hover:text-primary-600 py-2">Portfolio</button>
            <button onClick={() => scrollToSection('service-area')} className="block w-full text-left text-gray-700 hover:text-primary-600 py-2">Service Area</button>
            <a
              href="https://wa.me/60127704714?text=Saya%20nak%20tanya%20pakej"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full font-medium text-center transition"
            >
              WhatsApp
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
