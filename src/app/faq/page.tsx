'use client';

import { useState } from 'react';
import FaqsTwo from '@/components/faqs-2';
import FaqsThree from '@/components/faqs-3';

export default function FAQPage() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <FaqsThree />
);
}
