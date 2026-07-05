"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

/**
 * Accordion component with smooth expand/collapse animation.
 * Used for FAQ sections and collapsible content.
 */

interface AccordionItem {
  id: string;
  question: string;
  answer: string;
}

interface AccordionProps {
  items: AccordionItem[];
  allowMultiple?: boolean;
  className?: string;
}

export function Accordion({ items, allowMultiple = false, className }: AccordionProps) {
  const [openItems, setOpenItems] = React.useState<Set<string>>(new Set());

  const toggle = (id: string) => {
    setOpenItems((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        if (!allowMultiple) next.clear();
        next.add(id);
      }
      return next;
    });
  };

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      {items.map((item, index) => (
        <AccordionItemComponent
          key={item.id}
          item={item}
          isOpen={openItems.has(item.id)}
          onToggle={() => toggle(item.id)}
          index={index}
        />
      ))}
    </div>
  );
}

interface AccordionItemComponentProps {
  item: AccordionItem;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}

function AccordionItemComponent({ item, isOpen, onToggle, index }: AccordionItemComponentProps) {
  return (
    <motion.div
      className={cn(
        "rounded-2xl overflow-hidden border transition-all duration-300",
        isOpen
          ? "bg-[rgba(255,255,255,0.04)] border-[rgba(255,255,255,0.12)] shadow-glass"
          : "bg-[rgba(255,255,255,0.02)] border-[rgba(255,255,255,0.06)] hover:border-[rgba(255,255,255,0.1)]"
      )}
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      {/* Question / Trigger */}
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 p-5 sm:p-6 text-left cursor-pointer group"
        aria-expanded={isOpen}
      >
        <span className="text-base sm:text-lg font-medium text-text-primary group-hover:text-white transition-colors">
          {item.question}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          className="shrink-0"
        >
          <ChevronDown className="w-5 h-5 text-text-muted group-hover:text-text-secondary transition-colors" />
        </motion.span>
      </button>

      {/* Answer / Content */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-0">
              <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
                {item.answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default Accordion;
