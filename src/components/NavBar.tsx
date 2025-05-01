
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, User, FileText, DollarSign, Menu, X } from "lucide-react";
import Logo from './Logo';

const NavBar: React.FC = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  
  // Track scroll position for navbar effects
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const navItems = [
    {
      name: 'Home',
      path: '/',
      icon: Home
    },
    {
      name: 'Profile',
      path: '/profile',
      icon: User
    },
    {
      name: 'Roaster',
      path: '/roaster',
      icon: FileText,
      animationClass: 'nav-roaster-icon'
    },
    {
      name: 'Pricing',
      path: '/pricing',
      icon: DollarSign
    }
  ];
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  return (
    <nav className={`fixed top-0 left-0 right-0 bg-white border-b z-50 transition-all duration-300 ${
      scrollPosition > 10 ? 'shadow-md' : 'shadow-sm'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Logo variant="default" showText={true} />
            </Link>
          </div>
          
          {/* Desktop navigation */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-2">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`relative px-3 py-2 rounded-md text-sm font-medium flex items-center transition-all duration-300 hover:text-primary group ${
                    isActive(item.path) 
                      ? 'text-primary' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <item.icon 
                    size={18} 
                    className={`mr-2 group-hover:scale-110 transition-transform duration-200 ${item.animationClass || ''} ${
                      isActive(item.path) && item.animationClass ? 'active' : ''
                    }`} 
                  />
                  <span>{item.name}</span>
                  <span 
                    className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-amber-500 to-red-600 transition-all duration-300 ${
                      isActive(item.path) 
                        ? 'w-full' 
                        : 'w-0 group-hover:w-full'
                    }`}
                  ></span>
                </Link>
              ))}
            </div>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-primary hover:bg-gray-100 focus:outline-none transition-colors duration-200"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X size={24} className="animate-fade-in" />
              ) : (
                <Menu size={24} className="animate-fade-in" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t animate-fade-in">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center px-3 py-2 rounded-md text-base font-medium ${
                  isActive(item.path)
                    ? 'bg-gradient-to-r from-amber-500/10 to-red-600/10 text-primary'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                <item.icon size={20} className={`mr-3 ${item.animationClass || ''}`} />
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
