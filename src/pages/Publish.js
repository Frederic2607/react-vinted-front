import { useState } from "react";
import { useHistory, Redirect } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

const Publish = (props) => {
  const { token } = props;

  const history = useHistory();

  const [files, setFiles] = useState({});
  const [preview, setPreview] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [condition, setCondition] = useState("");
  const [city, setCity] = useState("");
  const [price, setPrice] = useState("");

  const userToken = Cookies.get("token");

  const handleFiles = (event) => {
    setFiles(event.target.files[0]);
  };

  const handleTitle = (event) => {
    setTitle(event.target.value);
  };

  const handleDescription = (event) => {
    setDescription(event.target.value);
  };

  const handleBrand = (event) => {
    setBrand(event.target.value);
  };

  const handleSize = (event) => {
    setSize(event.target.value);
  };

  const handleColor = (event) => {
    setColor(event.target.value);
  };

  const handleCondition = (event) => {
    setCondition(event.target.value);
  };

  const handleCity = (event) => {
    setCity(event.target.value);
  };

  const handlePrice = (event) => {
    setPrice(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("picture", files);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("brand", brand);
    formData.append("size", size);
    formData.append("color", color);
    formData.append("condition", condition);
    formData.append("city", city);
    formData.append("price", price);

    try {
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/offer/publish",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + userToken,
          },
        }
      );
      if (response.data._id) {
        history.push(`/offer/${response.data._id}`);
      } else {
        alert("Une erreur est survenue, veuillez ressayer");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return token ? (
    <div>
      <h2>Vends ton article</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="file"
            accept=".png, .jpeg, .jpg, .gif"
            onChange={handleFiles}
          />
        </div>
        <div>
          <div>
            <h4>Titre</h4>
            <input
              type="text"
              placeholder="Chemise Sézane verte"
              value={title}
              onChange={handleTitle}
            />
          </div>
          <div>
            <h4>Décris ton article</h4>
            <textarea
              rows="5"
              placeholder="ex: très peu porté"
              value={description}
              onChange={handleDescription}
            ></textarea>
          </div>
        </div>
        <div>
          <div>
            <h4>Marque</h4>
            <input
              type="text"
              placeholder="ex: Zara"
              value={brand}
              onChange={handleBrand}
            />
          </div>
          <div>
            <h4>Taille</h4>
            <input
              type="text"
              placeholder="ex: L / 40 / 12"
              value={size}
              onChange={handleSize}
            />
          </div>
          <div>
            <h4>Couleur</h4>
            <input
              type="text"
              placeholder="Fushia"
              value={color}
              onChange={handleColor}
            />
          </div>
          <div>
            <h4>Etat</h4>
            <input
              type="text"
              placeholder="Neuf avec étiquette"
              value={condition}
              onChange={handleCondition}
            />
          </div>
          <div>
            <h4>Lieu</h4>
            <input
              type="text"
              placeholder="ex: Paris"
              value={city}
              onChange={handleCity}
            />
          </div>
        </div>
        <div>
          <div>
            <h4>Prix</h4>
            <div>
              <input
                type="text"
                placeholder="0,00 €"
                value={price}
                onChange={handlePrice}
              />
              <div>
                <input type="checkbox" />
                <span>Je suis intéressé(e) par les échanges</span>
              </div>
            </div>
          </div>
        </div>
        <div>
          <button type="submit">Ajouter</button>
        </div>
      </form>
    </div>
  ) : (
    <Redirect to="/login" />
  );
};

export default Publish;
