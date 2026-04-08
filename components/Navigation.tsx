'use client';

import { Camera, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    const updateBodyOverflow = () => {
      if (isOpen) {
        document.body.classList.add('overflow-hidden');
      } else {
        document.body.classList.remove('overflow-hidden');
      }
    };

    updateBodyOverflow();

    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [isOpen]);

  return (
    <nav
      id="navbar"
      className={`fixed top-0 left-0 right-0 transition-all duration-300 z-50 ${
        isScrolled
          ? 'bg-bg/95 backdrop-blur-md border-b border-border'
          : 'bg-bg/0 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <Camera className="h-8 w-8 text-accent" />
            <span className="font-display text-xl font-semibold text-fg">
              Fadhlan Khalid Photography
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection('hero')}
              className="nav-link text-sm font-medium hover:text-fg py-2"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection('packages')}
              className="nav-link text-sm font-medium hover:text-fg py-2"
            >
              Packages
            </button>
            <button
              onClick={() => scrollToSection('add-ons')}
              className="nav-link text-sm font-medium hover:text-fg py-2"
            >
              Add-ons
            </button>
            <button
              onClick={() => scrollToSection('portfolio')}
              className="nav-link text-sm font-medium hover:text-fg py-2"
            >
              Portfolio
            </button>
            <button
              onClick={() => scrollToSection('service-area')}
              className="nav-link text-sm font-medium hover:text-fg py-2"
            >
              Service Area
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="nav-link text-sm font-medium hover:text-fg py-2"
            >
              Contact
            </button>
            <button
              onClick={() => {
                window.open('https://wa.me/60127704714?text=Saya%20nak%20tanya%20pakej', '_blank');
              }}
              className="btn-primary inline-flex items-center gap-2"
            >
              Book Now
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
          >
            {isOpen ? <X className="h-6 w-6 text-fg" /> : <Menu className="h-6 w-6 text-fg" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        id="mobileMenu"
        className={`md:hidden fixed inset-0 bg-bg z-50 transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-6">
          <div className="flex justify-end mb-4">
            <button
              onClick={() => setIsOpen(false)}
              className="p-2"
              aria-label="Close menu"
            >
              <X className="h-6 w-6 text-fg" />
            </button>
          </div>
          <div className="flex flex-col items-center gap-8 mt-4">
            <button
              onClick={() => scrollToSection('hero')}
              className="font-display text-xl text-fg"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection('packages')}
              className="font-display text-xl text-fg"
            >
              Packages
            </button>
            <button
              onClick={() => scrollToSection('add-ons')}
              className="font-display text-xl text-fg"
            >
              Add-ons
            </button>
            <button
              onClick={() => scrollToSection('portfolio')}
              className="font-display text-xl text-fg"
            >
              Portfolio
            </button>
            <button
              onClick={() => scrollToSection('service-area')}
              className="font-display text-xl text-fg"
            >
              Service Area
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="font-display text-xl text-fg"
            >
              Contact
            </button>
            <button
              onClick={() => {
                setIsOpen(false);
                window.open('https://wa.me/60127704714?text=Saya%20nak%20tanya%20pakej', '_blank');
              }}
              className="btn-primary mt-4"
            >
              Book Now
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}