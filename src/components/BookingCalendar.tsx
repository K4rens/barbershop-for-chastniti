import { useState } from "react";
import type { CSSProperties } from "react";

const DAYS = ["Пн","Вт","Ср","Чт","Пт","Сб","Вс"];
const MONTHS = ["Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"];
const SLOTS = Array.from({ length: 9 }, (_, i) => `${10 + i}:00`);

interface Props {
  selectedDate: Date | null;
  selectedTime: string | null;
  onSelectDate: (d: Date) => void;
  onSelectTime: (t: string) => void;
}

const navBtn: CSSProperties = {
  background: "none",
  border: "1.5px solid #000",
  borderRadius: 6,
  width: 24,
  height: 24,
  cursor: "pointer",
  fontSize: 10,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#000",
  flexShrink: 0,
  outline: "none",
};

export default function BookingCalendar({ selectedDate, selectedTime, onSelectDate, onSelectTime }: Props) {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());

  const firstDay = (new Date(year, month, 1).getDay() + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: (number | null)[] = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];
  while (cells.length % 7 !== 0) cells.push(null);

  const prev = () => { if (month === 0) { setMonth(11); setYear(y => y - 1); } else setMonth(m => m - 1); };
  const next = () => { if (month === 11) { setMonth(0); setYear(y => y + 1); } else setMonth(m => m + 1); };

  const isPast = (d: number) => new Date(year, month, d) < new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const isSelected = (d: number) => selectedDate?.getFullYear() === year && selectedDate?.getMonth() === month && selectedDate?.getDate() === d;
  const isToday = (d: number) => today.getFullYear() === year && today.getMonth() === month && today.getDate() === d;

  return (
    <div style={{ padding: "14px 18px", fontFamily: "Manrope, sans-serif" }}>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
        <button onClick={prev} style={navBtn}>&#x276E;</button>
        <span style={{ fontSize: 13, fontWeight: 500, letterSpacing: "0.04em" }}>{MONTHS[month]} {year}</span>
        <button onClick={next} style={navBtn}>&#x276F;</button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 2 }}>
        {DAYS.map(d => (
          <div key={d} style={{
            textAlign: "center",
            padding: "4px 0",
            fontSize: 9,
            fontWeight: 500,
            letterSpacing: "0.06em",
            color: "#bbb",
            textTransform: "uppercase",
          }}>
            {d}
          </div>
        ))}

        {cells.map((day, i) => {
          const past = day ? isPast(day) : false;
          const sel = day ? isSelected(day) : false;
          const tod = day ? isToday(day) : false;
          return (
            <div
              key={i}
              onClick={() => day && !past && onSelectDate(new Date(year, month, day))}
              style={{
                height: 34,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 12,
                fontWeight: 400,
                borderRadius: 6,
                cursor: day && !past ? "pointer" : "default",
                color: !day ? "transparent" : past ? "#ccc" : sel ? "#fff" : "#000",
                background: sel ? "#000" : "transparent",
                border: tod && !sel ? "1.5px solid #000" : "1.5px solid transparent",
                transition: "all 0.15s ease",
                userSelect: "none",
              }}
              onMouseEnter={e => {
                if (day && !past && !sel) (e.currentTarget as HTMLElement).style.border = "1.5px solid #000";
              }}
              onMouseLeave={e => {
                if (day && !past && !sel && !tod) (e.currentTarget as HTMLElement).style.border = "1.5px solid transparent";
              }}
            >
              {day ?? ""}
            </div>
          );
        })}
      </div>

      {selectedDate && (
        <div style={{ marginTop: 12, borderTop: "1.5px solid #000", paddingTop: 12 }}>
          <div style={{
            fontSize: 9,
            fontWeight: 500,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "#bbb",
            marginBottom: 8,
          }}>
            Выберите время
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 5 }}>
            {SLOTS.map(slot => {
              const active = selectedTime === slot;
              return (
                <button
                  key={slot}
                  onClick={() => onSelectTime(slot)}
                  style={{
                    padding: "6px 0",
                    border: "1.5px solid #000",
                    borderRadius: 6,
                    background: active ? "#000" : "#fff",
                    color: active ? "#fff" : "#000",
                    fontSize: 11,
                    fontWeight: 500,
                    fontFamily: "Manrope, sans-serif",
                    cursor: "pointer",
                    transition: "all 0.15s ease",
                    letterSpacing: "0.02em",
                    outline: "none",
                  }}
                  onMouseEnter={e => {
                    if (!active) {
                      (e.currentTarget as HTMLElement).style.background = "#000";
                      (e.currentTarget as HTMLElement).style.color = "#fff";
                    }
                  }}
                  onMouseLeave={e => {
                    if (!active) {
                      (e.currentTarget as HTMLElement).style.background = "#fff";
                      (e.currentTarget as HTMLElement).style.color = "#000";
                    }
                  }}
                >
                  {slot}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}