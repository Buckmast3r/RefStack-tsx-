'use client';
import { useState } from 'react';

interface AccordionItem {
  title: string;
  content: string;
}

interface AccordionProps {
  items: AccordionItem[];
}

export default function Accordion({ items }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-2">
      {items.map((item, index) => (
        <div key={index} className="border rounded-md">
          <button
            onClick={() => toggleItem(index)}
            className="w-full px-4 py-2 text-left bg-gray-100 hover:bg-gray-200 focus:outline-none"
          >
            {item.title}
          </button>
          {openIndex === index && (
            <div className="px-4 py-2 bg-white">
              {item.content}
            </div>
          )}
        </div>
      ))}
    </div>
  );
} 