import { useEffect } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  type: 'success' | 'error';
}

export const Modal = ({ isOpen, onClose, title, message, type }: ModalProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-st-denis-burgundy/70 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-st-denis-cream rounded-lg shadow-2xl max-w-md w-full p-6 md:p-8 lg:p-10">
        <div className="text-center">
          {/* Icon */}
          <div className={`mx-auto w-16 h-16 md:w-20 md:h-20 mb-4 md:mb-6 rounded-full flex items-center justify-center ${
            type === 'success' ? 'bg-st-denis-teal/20' : 'bg-red-100'
          }`}>
            {type === 'success' ? (
              <svg className="w-8 h-8 md:w-10 md:h-10 text-st-denis-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <svg className="w-8 h-8 md:w-10 md:h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            )}
          </div>
          
          {/* Content */}
          <h3 className="text-2xl md:text-3xl lg:text-4xl font-serif font-semibold mb-2 md:mb-3 text-st-denis-burgundy">
            {title}
          </h3>
          <p className="text-base md:text-lg lg:text-xl text-st-denis-burgundy/80 mb-6 md:mb-8">
            {message}
          </p>
          
          {/* Close Button */}
          <button
            onClick={onClose}
            className="w-full bg-st-denis-burgundy text-st-denis-cream py-3 md:py-4 px-6 md:px-8 text-base md:text-lg lg:text-xl rounded-md hover:bg-st-denis-burgundy/90 transition-colors font-medium"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
