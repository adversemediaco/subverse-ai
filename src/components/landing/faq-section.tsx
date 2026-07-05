"use client";

import * as React from "react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Accordion } from "@/components/ui/accordion";
import { FAQ_ITEMS } from "@/lib/constants";

/**
 * FAQ Section with smooth accordion animations.
 */

export function FAQSection() {
  const accordionItems = FAQ_ITEMS.map((item, index) => ({
    id: `faq-${index}`,
    question: item.question,
    answer: item.answer,
  }));

  return (
    <section id="faq" className="relative section-padding">
      <div className="container-wide max-w-3xl mx-auto">
        <SectionHeading
          badge="FAQ"
          title="Frequently Asked Questions"
          titleGradient="Questions"
          subtitle="Everything you need to know about SubVerse AI. Can't find what you're looking for? Contact our team."
        />

        <div className="mt-12">
          <Accordion items={accordionItems} />
        </div>
      </div>
    </section>
  );
}

export default FAQSection;
