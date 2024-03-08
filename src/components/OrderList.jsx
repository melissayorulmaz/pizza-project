import React, { useState } from "react";
import { Link } from "react-router-dom";

const OrderList = () => {
  return (
    <div>
      <h2>Order List Page</h2>
      <Link to="/order-confirm">Sipariş Ver</Link>
      <BoyutSecCard />
      <HamurSecCard />
      <EkMalzemeler />
      <SiparisNotu />
    </div>
  );
};

function BoyutSecCard() {
  const [selectedSize, setSelectedSize] = useState(null);

  const handleSizeChange = (event) => {
    setSelectedSize(event.target.value);
  };

  return (
    <div className="boyut-sec-card">
      <h2>Boyut Seç</h2>
      <div className="size-options">
        <label>
          <input
            type="radio"
            value="Küçük"
            checked={selectedSize === "Küçük"}
            onChange={handleSizeChange}
          />
          Küçük
        </label>
        <label>
          <input
            type="radio"
            value="Orta"
            checked={selectedSize === "Orta"}
            onChange={handleSizeChange}
          />
          Orta
        </label>
        <label>
          <input
            type="radio"
            value="Büyük"
            checked={selectedSize === "Büyük"}
            onChange={handleSizeChange}
          />
          Büyük
        </label>
      </div>
      {selectedSize && (
        <div className="selected-size">
          <p>Seçilen Boyut: {selectedSize}</p>
        </div>
      )}
    </div>
  );
}

function HamurSecCard() {
  const [selectedDough, setSelectedDough] = useState("");

  const handleDoughChange = (event) => {
    setSelectedDough(event.target.value);
  };

  return (
    <div className="hamur-sec-card">
      <h2>Hamur Seç</h2>
      <div className="dough-options">
        <select value={selectedDough} onChange={handleDoughChange}>
          <option value="">- Seçiniz -</option>
          <option value="Ince">İnce</option>
          <option value="Standart">Standart</option>
          <option value="Kalın">Kalın</option>
        </select>
      </div>
      {selectedDough && (
        <div className="selected-dough">
          <p>Seçilen Hamur: {selectedDough}</p>
        </div>
      )}
    </div>
  );
}

function EkMalzemeler() {
  const [selectedToppings, setSelectedToppings] = useState([]);
  const maxToppings = 10;
  const toppingPrice = 5;

  const toppings = [
    "Mantar",
    "Biber",
    "Zeytin",
    "Salam",
    "Sucuk",
    "Domates",
    "Soğan",
    "Sarımsak",
    "Tavuk Izgara",
    "Pepperoni",
    "Jalapeno",
    "Mısır",
    "Ananas",
    "Kabak",
  ];

  const handleToppingChange = (event) => {
    const topping = event.target.value;
    if (selectedToppings.includes(topping)) {
      setSelectedToppings(selectedToppings.filter((item) => item !== topping));
    } else {
      if (selectedToppings.length < maxToppings) {
        setSelectedToppings([...selectedToppings, topping]);
      } else {
        alert("En fazla 10 malzeme seçebilirsiniz!");
      }
    }
  };

  return (
    <div className="ek-malzemeler">
      <h2>Ek Malzemeler</h2>
      <div className="topping-options">
        {toppings.map((topping, index) => (
          <label key={index}>
            <input
              type="checkbox"
              value={topping}
              checked={selectedToppings.includes(topping)}
              onChange={handleToppingChange}
            />
            {topping}
          </label>
        ))}
      </div>
      <div className="siparis-toplam">
        <h3>Toplam</h3>
        <p>
          Seçimlerin Toplam Fiyatı: {selectedToppings.length * toppingPrice}₺
        </p>
        <p>Toplam: {selectedToppings.length * toppingPrice + 105}₺</p>
      </div>
    </div>
  );
}

function SiparisNotu() {
  const [note, setNote] = useState("");

  const handleNoteChange = (event) => {
    setNote(event.target.value);
  };

  return (
    <div className="siparis-notu">
      <h2>Sipariş Notu</h2>
      <textarea
        rows="4"
        cols="50"
        value={note}
        onChange={handleNoteChange}
        placeholder="Siparişine eklemek istediğin bir not var mı?"
      />
    </div>
  );
}

export default OrderList;
