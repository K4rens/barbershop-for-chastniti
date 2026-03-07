import "./ServiceList.css";

const SERVICES = [
  { id: 1, name: "Стрижка машинкой", price: 800 },
  { id: 2, name: "Стрижка ножницами", price: 1000 },
  { id: 3, name: "Стрижка + борода", price: 1400 },
  { id: 4, name: "Оформление бороды", price: 600 },
  { id: 5, name: "Бритьё опасной бритвой", price: 900 },
  { id: 6, name: "Камуфляж седины", price: 1200 },
  { id: 7, name: "Детская стрижка", price: 700 },
];

interface ServiceListProps {
  selected: number | null;
  onSelect: (id: number) => void;
}

export default function ServiceList({ selected, onSelect }: ServiceListProps) {
  return (
    <ul className="service-list">
      {SERVICES.map((s) => (
        <li
          key={s.id}
          className={`service-item ${selected === s.id ? "service-item--selected" : ""}`}
          onClick={() => onSelect(s.id)}
        >
          <span className="service-name">{s.name}</span>
          <span className="service-price">{s.price} ₽</span>
        </li>
      ))}
    </ul>
  );
}
