import type { ReactNode } from "react";
import "./AccordionPanel.css";

interface AccordionPanelProps {
  number: number;
  title: string;
  isOpen: boolean;
  disabled?: boolean;
  onToggle: () => void;
  children: ReactNode;
}

export default function AccordionPanel({
  number, title, isOpen, disabled = false, onToggle, children,
}: AccordionPanelProps) {
  return (
    <div className={`accordion ${isOpen ? "accordion--open" : ""} ${disabled ? "accordion--disabled" : ""}`}>
      <button className="accordion__header" onClick={() => !disabled && onToggle()}>
        <span className="accordion__number">{number}</span>
        <span className="accordion__title">{title}</span>
        <span className={`accordion__icon ${isOpen ? "accordion__icon--open" : ""}`}>&#x276F;</span>
      </button>
      <div className="accordion__body">
        <div className="accordion__content">
          <div className="accordion__content-inner">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}