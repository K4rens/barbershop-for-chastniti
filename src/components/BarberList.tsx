import "./BarberList.css";

const BARBERS = [
  { id: 1, name: "Артём Волков", specialty: "Классические стрижки, Борода" },
  { id: 2, name: "Максим Орлов", specialty: "Fade, Тейп-ап" },
  { id: 3, name: "Денис Соколов", specialty: "Помпадур, Ретро-стили" },
  { id: 4, name: "Иван Морозов", specialty: "Детские стрижки, Простые формы" },
];

interface BarberListProps {
  selected: number | null;
  onSelect: (id: number) => void;
}

export default function BarberList({ selected, onSelect }: BarberListProps) {
  return (
    <ul className="barber-list">
      {BARBERS.map((b) => (
        <li
          key={b.id}
          className={`barber-item ${selected === b.id ? "barber-item--selected" : ""}`}
          onClick={() => onSelect(b.id)}
        >
          <div className="barber-avatar">
            {b.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </div>
          <div className="barber-info">
            <span className="barber-name">{b.name}</span>
            <span className="barber-specialty">{b.specialty}</span>
          </div>
          {selected === b.id && <span className="barber-check">✓</span>}
        </li>
      ))}
    </ul>
  );
}
