import { useState } from "react";
import AccordionPanel from "./components/AccordionPanel";
import BarberList from "./components/BarberList";
import BookingCalendar from "./components/BookingCalendar";
import ServiceList from "./components/ServiceList";
import "./App.css";

type PanelId = 1 | 2 | 3 | null;

export default function App() {
  const [openPanel, setOpenPanel] = useState<PanelId>(null);

  const [selectedBarber, setSelectedBarber] = useState<number | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedService, setSelectedService] = useState<number | null>(null);

  const toggle = (id: PanelId) =>
    setOpenPanel((prev) => (prev === id ? null : id));

  const canBook = selectedBarber && selectedDate && selectedTime && selectedService;

  const handleBook = () => {
    if (!canBook) return;
    alert(
      `Запись оформлена!\nБарбер #${selectedBarber}\nДата: ${selectedDate!.toLocaleDateString("ru-RU")} в ${selectedTime}\nУслуга #${selectedService}`
    );
  };

  return (
    <div className="page">
     
      <main className="page-main">
        <div className="panels">
          <AccordionPanel
            number={1}
            title="Выберите барбера"
            isOpen={openPanel === 1}
            onToggle={() => toggle(1)}
          >
            <BarberList selected={selectedBarber} onSelect={setSelectedBarber} />
          </AccordionPanel>

          <AccordionPanel
            number={2}
            title="Выберите дату"
            isOpen={openPanel === 2}
            disabled={!selectedBarber}
            onToggle={() => toggle(2)}
          >
            <BookingCalendar
              selectedDate={selectedDate}
              selectedTime={selectedTime}
              onSelectDate={(d) => { setSelectedDate(d); setSelectedTime(null); }}
              onSelectTime={setSelectedTime}
            />
          </AccordionPanel>

          <AccordionPanel
            number={3}
            title="Выберите услугу"
            isOpen={openPanel === 3}
            disabled={!selectedDate || !selectedTime}
            onToggle={() => toggle(3)}
          >
            <ServiceList selected={selectedService} onSelect={setSelectedService} />
          </AccordionPanel>
        </div>
      </main>

      <button
        className={`book-btn ${canBook ? "book-btn--active" : ""}`}
        onClick={handleBook}
        disabled={!canBook}
      >
        Записаться
      </button>
    </div>
  );
}