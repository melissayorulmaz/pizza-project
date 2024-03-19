import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../OrderList.css";
import "../MainPage.css";
import logo from "./logo.svg";
import axios from "axios";
import { useHistory } from "react-router-dom";

const OrderList = () => {
  const [name, setName] = useState("");
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedDough, setSelectedDough] = useState("");
  const [selectedToppings, setSelectedToppings] = useState([]);
  const [note, setNote] = useState("");
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  useEffect(() => {
    setIsSubmitDisabled(
      //devre dışı bırakma koşullarını sağladım
      !selectedSize ||
        !selectedDough ||
        name.length < 3 ||
        selectedToppings.length < 4 ||
        selectedToppings.length > 10
    );
  }, [selectedSize, selectedDough, name, selectedToppings]);

  const history = useHistory(); //reactrouter history özelliğini kullanarak objeyi almamızı sağladı

  const handleSubmit = (event) => {
    event.preventDefault();

    // Sipariş verilerini oluşturdum
    const form = {
      name: name,
      size: selectedSize,
      dough: selectedDough,
      toppings: selectedToppings,
      note: note,
    };

    axios
      .post("https://reqres.in/api/pizza", form)
      .then((response) => {
        console.log("API Response:", response.data);

        history.push("/order-confirm");
      })
      .catch((error) => {
        console.error("API Request Error:", error);
      });
  };
  //yapılan seçimlere göre boyutu güncelliyor
  const handleSizeChange = (event) => {
    setSelectedSize(event.target.value);
  };

  const handleDoughChange = (event) => {
    setSelectedDough(event.target.value);
  };

  const handleToppingChange = (event) => {
    const topping = event.target.value;
    if (selectedToppings.includes(topping)) {
      setSelectedToppings(selectedToppings.filter((item) => item !== topping));
    } else {
      setSelectedToppings([...selectedToppings, topping]);
    }
  };

  const handleNoteChange = (event) => {
    setNote(event.target.value);
  };

  return (
    <div>
      <div className="order-container">
        <header className="kutu">
          <img className="logo" src={logo} alt="logo" />
          <nav className="secenekler">
            <a href="./."> Anasayfa </a>
            <a href="./order-list"> Seçenekler </a>
            <a href="./order-confirm"> Sipariş Oluştur </a>
          </nav>
        </header>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="İsim (Minimum 3 karakter)"
            minLength="3"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="isim"
          />
          <h2 className="pizzaadi">Mediterranean Delight</h2>
          <h2 className="pizzafiyati">105.00₺ </h2>
          <p className="opc">
            Mediterranean Delight, Akdeniz mutfağının eşsiz lezzetlerini bir
            araya getiren bir pizza çeşididir. Bu nefis pizza, ince ve çıtır
            kenarlığıyla dikkat çekerken, zengin malzeme çeşitliliğiyle
            damakları şenlendirir. Taze cherry domatesler, dilimlenmiş
            zeytinler, lezzetli rendelenmiş mozzarella peyniri ve fesleğen
            yaprakları, pizza tabanının üzerini süslerken, hafif baharatlarla
            tatlandırılmış zeytinyağı ile tamamlanır. Her ısırıkta Akdeniz'in
            sıcak esintisini hissedebileceğiniz bu pizza, sağlıklı ve lezzetli
            bir seçenektir. Mediterranean Delight, tüm pizza severler için bir
            ziyafet sunar ve damaklarda unutulmaz bir lezzet bırakır.
          </p>

          <div className="card-container">
            <BoyutSecCard
              selectedSize={selectedSize}
              handleSizeChange={handleSizeChange}
            />
            <HamurSecCard
              selectedDough={selectedDough}
              handleDoughChange={handleDoughChange}
            />
          </div>
          <EkMalzemeler
            selectedToppings={selectedToppings}
            handleToppingChange={handleToppingChange}
          />
          <SiparisNotu note={note} handleNoteChange={handleNoteChange} />
          <SiparisToplami selectedToppings={selectedToppings} />
          <button
            type="submit"
            disabled={isSubmitDisabled}
            className="submit-button"
          >
            SİPARİŞ VER
          </button>
        </form>
      </div>
    </div>
  );
};

const BoyutSecCard = ({ selectedSize, handleSizeChange }) => {
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
};

const HamurSecCard = ({ selectedDough, handleDoughChange }) => {
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
};

const EkMalzemeler = ({ selectedToppings, handleToppingChange }) => {
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

  const group1 = toppings.slice(0, 5);
  const group2 = toppings.slice(5, 10);
  const group3 = toppings.slice(10);

  return (
    <div className="ek-malzemeler">
      <h2>Ek Malzemeler</h2>
      <h3>En az 4, en fazla 10 malzeme seçebilirsiniz. Her biri 5₺.</h3>
      <div className="malzeme-grup">
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
    </div>
  );
};

const SiparisNotu = ({ note, handleNoteChange }) => {
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
};

const SiparisToplami = ({ selectedToppings }) => {
  const toppingPrice = 5;
  const totalToppingPrice = selectedToppings.length * toppingPrice;
  const totalPrice = totalToppingPrice + 105;

  return (
    <div className="siparis-toplami">
      <h2>Sipariş Toplamı</h2>
      <p>
        Seçimlerin Toplam Fiyatı: <span>{totalToppingPrice}₺</span>
      </p>
      <p>
        <span className="total-price">Toplam: {totalPrice}₺</span>
      </p>
    </div>
  );
};
export default OrderList;
