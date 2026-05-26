import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { useTranslation } from '../context/LanguageContext';

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { t } = useTranslation();

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  const faqs = [
    { question: t('faq.q1'), answer: t('faq.a1') },
    { question: t('faq.q2'), answer: t('faq.a2') },
    { question: t('faq.q3'), answer: t('faq.a3') },
    { question: t('faq.q4'), answer: t('faq.a4') },
    { question: t('faq.q5'), answer: t('faq.a5') },
    { question: t('faq.q6'), answer: t('faq.a6') },
    { question: t('faq.q7'), answer: t('faq.a7') },
    { question: t('faq.q8'), answer: t('faq.a8') },
    { question: t('faq.q9'), answer: t('faq.a9') },
    { question: t('faq.q10'), answer: t('faq.a10') },
  ];

  return (
    <section className="bg-primary py-24 border-y border-white/5 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="max-w-4xl mx-auto px-8 relative z-10">
        <div className="text-center mb-16">
          <p className="text-secondary font-headline font-bold uppercase tracking-[0.2em] text-sm mb-4">
            {t('faq.subtitle')}
          </p>
          <h2 className="text-white font-headline font-black text-4xl md:text-5xl tracking-tighter uppercase mb-6">{t('faq.title')}</h2>
          <p className="text-slate-400 text-lg leading-relaxed max-w-2xl mx-auto">
            {t('faq.desc')}
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onToggle={() => toggle(index)}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}

function FAQItem({ question, answer, isOpen, onToggle, index }: FAQItemProps) {
  return (
    <div className={`faq-card relative rounded-xl border border-white/5 bg-[#0D1827] overflow-hidden transition-all duration-300 ${isOpen ? 'shadow-[0_4px_24px_rgba(0,0,0,0.3)] border-white/10' : ''}`}>
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-6 text-left cursor-pointer transition-colors hover:text-secondary group"
        aria-expanded={isOpen}
      >
        <span className="text-sm font-mono text-secondary mr-4">
          [{(index + 1).toString().padStart(2, '0')}]
        </span>
        <span className="text-white font-headline font-bold uppercase text-xs md:text-sm tracking-wide flex-grow select-none">
          {question}
        </span>
        <span className="ml-4 w-6 h-6 rounded bg-white/5 flex items-center justify-center text-slate-400 group-hover:text-secondary transition-colors duration-200">
          {isOpen ? (
            <Minus className="w-4 h-4" />
          ) : (
            <Plus className="w-4 h-4" />
          )}
        </span>
      </button>

      <div
        className={`faq-answer-wrapper transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-[300px] border-t border-white/5 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="p-6 text-slate-400 text-sm leading-relaxed font-sans select-text">
          {answer}
        </div>
      </div>
    </div>
  );
}
