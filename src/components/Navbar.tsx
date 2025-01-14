import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
// import Link from 'next/link';

interface NavbarProps {
  onSearch: (query: string) => void;
  onHomeClick: () => void;
}

export default function Navbar({ onSearch, onHomeClick }: NavbarProps) {  // Fixed by adding onHomeClick here
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      onSearch(searchQuery);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch();
  };

  return (
    <motion.nav 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-0 w-full bg-black/90 backdrop-blur-sm z-50 px-4 py-4"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <motion.button
          onClick={() => {
            setSearchQuery('');
            onHomeClick();
          }}
          className="text-2xl font-bold text-red-600 cursor-pointer"
          whileHover={{ scale: 1.05 }}
        >
          MovieFlix
        </motion.button>
        
        <div className="flex-1 max-w-xl mx-4 flex justify-end">
          <motion.div 
            className="relative"
            animate={{ width: isSearchExpanded ? '100%' : '40px' }}
            transition={{ duration: 0.3 }}
          >
            <form onSubmit={handleSubmit} className="relative">
              <AnimatePresence>
                {isSearchExpanded && (
                  <motion.input
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: '100%' }}
                    exit={{ opacity: 0, width: 0 }}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search movies..."
                    className="w-full bg-gray-900 text-white rounded-full py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-red-600"
                    autoFocus
                  />
                )}
              </AnimatePresence>
              <motion.button
                type="button"
                onClick={() => {
                  if (!isSearchExpanded) {
                    setIsSearchExpanded(true);
                  } else if (searchQuery.trim()) {
                    handleSearch();
                  }
                }}
                className={`absolute left-0 top-0 p-2 rounded-full 
                  ${isSearchExpanded ? 'bg-transparent' : 'bg-gray-900 hover:bg-gray-800'}`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <MagnifyingGlassIcon className="w-5 h-5 text-gray-400" />
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </motion.nav>
  );
}