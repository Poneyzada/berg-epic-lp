import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { SeminarForm } from './SeminarForm';

interface SeminarModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SeminarModal = ({ isOpen, onClose }: SeminarModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl"
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="relative w-full max-w-2xl bg-zinc-900 border border-white/10 rounded-3xl overflow-hidden shadow-[0_0_100px_rgba(255,255,255,0.05)]"
          >
            <button
              onClick={onClose}
              className="absolute top-6 right-6 z-50 p-2 bg-white/5 hover:bg-white/10 rounded-full text-white/40 hover:text-white transition-all"
            >
              <X size={20} />
            </button>

            <div className="max-h-[90vh] overflow-y-auto custom-scrollbar">
              <SeminarForm />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
