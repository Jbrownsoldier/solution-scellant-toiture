import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  {
    question: 'What is GoNano technology?',
    answer:
      'GoNano is a patented nanotechnological sealant that uses nanoscopic silica particles to penetrate and bond within asphalt shingle layers. Once applied, it forms a permanent hydrophobic shield that restores the structural integrity of your roof, repels water, and prevents granule loss — all without removing a single shingle.',
  },
  {
    question: 'How much does it cost compared to full roof replacement?',
    answer:
      'A GoNano treatment typically costs up to 75 % less than a complete roof replacement. While a traditional re-roofing project can run between $10,000 and $20,000 or more, our molecular sealant treatment delivers equivalent protection at a fraction of that price.',
  },
  {
    question: 'How long does the GoNano treatment last?',
    answer:
      'The GoNano sealant is backed by a 15-year guarantee. The nanoscopic silica particles bond permanently within the shingle structure, meaning the protection does not wash away, peel, or degrade over time like surface coatings.',
  },
  {
    question: 'Is the treatment eco-friendly?',
    answer:
      'Absolutely. One of the biggest advantages of our approach is zero construction waste. Traditional roof replacement sends tonnes of old shingles to landfills. With GoNano, we restore your existing roof in place — no debris, no tear-off, and no environmental impact.',
  },
  {
    question: 'How long does the application take?',
    answer:
      'A typical GoNano treatment is completed in under 60 minutes. There is no heavy equipment, no scaffolding, and no disruption to your daily routine. You can stay home comfortably during the entire process.',
  },
  {
    question: 'What types of roofs can you treat?',
    answer:
      'Our GoNano sealant is designed specifically for asphalt shingle roofs, which are the most common roofing material in Québec. During our free inspection, we assess your roof\'s condition to confirm it\'s a good candidate for the treatment.',
  },
  {
    question: 'Do you offer a warranty?',
    answer:
      'Yes. Every GoNano treatment comes with a full 15-year warranty on the molecular sealant bond. We also provide a detailed inspection report and certificate of treatment for your records.',
  },
  {
    question: 'What areas in Montréal do you serve?',
    answer:
      'We serve the entire Greater Montréal area, including Laval, Longueuil, the South Shore, the North Shore, the West Island, and surrounding suburbs. Not sure if we cover your neighbourhood? Give us a call and we\'ll confirm.',
  },
  {
    question: 'Can I get a free estimate?',
    answer:
      'Yes. Use our contact form or call us directly at (514) 613-6904 to schedule a free, no-obligation roof inspection and estimate. We respond to most requests within 2 hours.',
  },
  {
    question: 'Is the sealant safe for my family and pets?',
    answer:
      'Yes. The GoNano sealant is non-toxic and VOC-free once cured. It is completely safe for your family, pets, and the surrounding environment. The application process produces no fumes, dust, or airborne particles.',
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className="bg-primary py-24 border-y border-white/5 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="max-w-4xl mx-auto px-8 relative z-10">
        <div className="text-center mb-16">
          <p className="text-secondary font-headline font-bold uppercase tracking-[0.2em] text-sm mb-4">
            Knowledge Base
          </p>
          <h2 className="text-white font-headline font-black text-4xl md:text-5xl tracking-tighter uppercase mb-6">Frequently Asked Questions</h2>
          <p className="text-slate-400 text-lg leading-relaxed max-w-2xl mx-auto">
            Everything you need to know about our GoNano roof treatment. Need more info?{' '}
            <a href="#contact-form" className="text-secondary font-bold hover:underline underline-offset-4 tracking-wide">
              Contact us.
            </a>
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
    <div className={`group border border-white/10 rounded-xl overflow-hidden transition-all duration-300 ${isOpen ? 'bg-surface shadow-[0_0_30px_rgba(0,0,0,0.5)] border-secondary/30' : 'bg-surface/50 hover:bg-surface'}`}>
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-6 p-6 text-left focus:outline-none"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-6">
          <span className="font-headline font-black text-secondary/50 text-xl tracking-tighter">
            {(index + 1).toString().padStart(2, '0')}
          </span>
          <span
            className={`text-base md:text-lg font-headline font-bold tracking-tight transition-colors duration-200 ${
              isOpen ? 'text-white' : 'text-slate-300 group-hover:text-white'
            }`}
          >
            {question}
          </span>
        </div>
        <span
          className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-300 ${
            isOpen
              ? 'bg-secondary border-secondary text-primary rotate-180'
              : 'bg-transparent border-white/20 text-slate-400 group-hover:border-secondary group-hover:text-secondary'
          }`}
        >
          {isOpen ? (
            <Minus className="w-4 h-4" strokeWidth={3} />
          ) : (
            <Plus className="w-4 h-4" strokeWidth={3} />
          )}
        </span>
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <p className="px-6 pb-6 pt-2 ml-10 text-slate-400 leading-relaxed text-sm md:text-base border-t border-white/5">
          {answer}
        </p>
      </div>
    </div>
  );
}
