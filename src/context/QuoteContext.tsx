import { createContext, useContext, useState, ReactNode } from 'react';

interface QuoteContextType {
  isOpen: boolean;
  openQuoteModal: () => void;
  closeQuoteModal: () => void;
}

const QuoteContext = createContext<QuoteContextType | undefined>(undefined);

export const QuoteProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openQuoteModal = () => setIsOpen(true);
  const closeQuoteModal = () => setIsOpen(false);

  return (
    <QuoteContext.Provider value={{ isOpen, openQuoteModal, closeQuoteModal }}>
      {children}
    </QuoteContext.Provider>
  );
};

export const useQuoteModal = () => {
  const context = useContext(QuoteContext);
  if (context === undefined) {
    throw new Error('useQuoteModal must be used within a QuoteProvider');
  }
  return context;
};
