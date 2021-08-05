import "./Publish.css";

import { useState } from "react";
import { useHistory, Redirect } from "react-router-dom";
import axios from "axios";

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
        "https://fred-backend-vinted.herokuapp.com/offer/publish",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
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
    <div className="publish-page">
      <div className="publish-container">
        <h2>Vends ton article</h2>
        <form onSubmit={handleSubmit}>
          <div className="publish-file-select">
            <div className="publish-preview-file">
              <input
                type="file"
                accept=".png, .jpeg, .jpg, .gif"
                onChange={handleFiles}
                className="publish-file-input"
              />
            </div>
          </div>
          <div className="publish-informations">
            <div className="publish-title">
              <h4>Titre</h4>
              <input
                type="text"
                placeholder="ex: Chemise Sézane verte"
                value={title}
                onChange={handleTitle}
              />
            </div>
            <div className="publish-text">
              <h4>Décris ton article</h4>
              <textarea
                name="description"
                rows="5"
                placeholder="ex: Très peu porté"
                value={description}
                onChange={handleDescription}
              ></textarea>
            </div>
          </div>
          <div className="publish-description">
            <div className="publish-description-input">
              <h4>Marque</h4>
              <input
                type="text"
                placeholder="ex: Zara"
                value={brand}
                onChange={handleBrand}
              />
            </div>
            <div className="publish-description-input">
              <h4>Taille</h4>
              <input
                type="text"
                placeholder="ex: L / 40 / 12"
                value={size}
                onChange={handleSize}
              />
            </div>
            <div className="publish-description-input">
              <h4>Couleur</h4>
              <input
                type="text"
                placeholder="ex: Fushia"
                value={color}
                onChange={handleColor}
              />
            </div>
            <div className="publish-description-input">
              <h4>Etat</h4>
              <input
                type="text"
                placeholder="ex: Neuf avec étiquette"
                value={condition}
                onChange={handleCondition}
              />
            </div>
            <div className="publish-description-input">
              <h4>Lieu</h4>
              <input
                type="text"
                placeholder="ex: Paris"
                value={city}
                onChange={handleCity}
              />
            </div>
          </div>
          <div className="publish-price">
            <div className="publish-price-container">
              <h4>Prix</h4>
              <div className="publish-price-subcontainer">
                <input
                  type="text"
                  placeholder="0,00 €"
                  value={price}
                  onChange={handlePrice}
                />
                <div className="publish-price-checkbox">
                  <label className="label-checkbox" for="exchange"></label>
                  <input
                    type="checkbox"
                    name="exchange"
                    id="exchange"
                    value="exchange"
                  />
                  <span>Je suis intéressé(e) par les échanges</span>
                </div>
              </div>
            </div>
          </div>
          <div className="add-btn-div">
            <button type="submit" className="add-btn">
              Ajouter
            </button>
          </div>
        </form>
      </div>
    </div>
  ) : (
    <Redirect to="/login" />
  );
};

export default Publish;
