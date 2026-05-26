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
    <section className="bg-surface py-32 border-y border-slate-200/60 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="max-w-4xl mx-auto px-8 relative z-10">
        <div className="text-center mb-16">
          <p className="text-secondary font-headline font-bold uppercase tracking-[0.2em] text-sm mb-4">
            {t('faq.subtitle')}
          </p>
          <h2 className="text-primary font-headline font-black text-4xl md:text-5xl tracking-tighter uppercase mb-6">{t('faq.title')}</h2>
          <p className="text-slate-600 text-lg leading-relaxed max-w-2xl mx-auto">
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
    <div className={`faq-card relative rounded-xl border border-slate-200/60 bg-slate-50/80 overflow-hidden transition-all duration-300 ${isOpen ? 'shadow-md border-slate-300 bg-white' : 'hover:bg-white/90'}`}>
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-6 text-left cursor-pointer transition-colors hover:text-secondary group"
        aria-expanded={isOpen}
      >
        <span className="text-sm font-mono text-secondary mr-4">
          [{(index + 1).toString().padStart(2, '0')}]
        </span>
        <span className="text-primary font-headline font-bold uppercase text-xs md:text-sm tracking-wide flex-grow select-none">
          {question}
        </span>
        <span className="ml-4 w-6 h-6 rounded bg-slate-100 flex items-center justify-center text-slate-500 group-hover:text-secondary transition-colors duration-200">
          {isOpen ? (
            <Minus className="w-4 h-4" />
          ) : (
            <Plus className="w-4 h-4" />
          )}
        </span>
      </button>

      <div
        className={`faq-answer-wrapper transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-[300px] border-t border-slate-100 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="p-6 text-slate-600 text-sm leading-relaxed font-sans select-text">
          {answer}
        </div>
      </div>
    </div>
  );
}
