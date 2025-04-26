import React from "react";
import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import axios from "axios";

function EditEtudiants() {
  const [image, setImage] = useState(null);
  const [oldImage, setOldImage] = useState('');

    const { id } = useParams();
    const [etudiant, setEtudiants] = useState({
        nom: '',
        prenom: '',
        date_naissance: '',
        email: '',
        telephone: ''
    });

    useEffect(() => {
      axios.get(`http://localhost:8081/etudiant/${id}`)
      .then(res => {
          setEtudiants(res.data);
          setOldImage(res.data.image_url);
      })
      .catch(err => console.error(err));
    }, [id]);
  

    const handleChange = (e) => {
        setEtudiants({...etudiant, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      const formData = new FormData();
      formData.append('nom', etudiant.nom);
      formData.append('prenom', etudiant.prenom);
      formData.append('email', etudiant.email);
      formData.append('telephone', etudiant.telephone);
      formData.append('oldImage', oldImage); // on envoie aussi le nom de l'ancienne image
      if (image) {
          formData.append('image', image); // seulement si l'utilisateur a choisi une nouvelle image
      }
  
      axios.put(`http://localhost:8081/etudiant/${id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          }
      })
      .then(() => {
          alert("Étudiant modifié !");
          window.location.href = "/";
      })
      .catch(err => console.error(err));
  };
  

    return (
  <div className="container mt-4">
    <h2 className="mb-4">Modifier {etudiant.nom}</h2>
    <form onSubmit={handleSubmit} className="row g-3">

      <div className="col-md-6">
        <label className="form-label">Nom</label>
        <div className="input-group">
          <span className="input-group-text"><i className="bi bi-person"></i></span>
          <input
            name="nom"
            value={etudiant.nom}
            onChange={handleChange}
            placeholder="Nom"
            className="form-control"
          />
        </div>
      </div>

      <div className="col-md-6">
        <label className="form-label">Prénom</label>
        <div className="input-group">
          <span className="input-group-text"><i className="bi bi-person-vcard"></i></span>
          <input
            name="prenom"
            value={etudiant.prenom}
            onChange={handleChange}
            placeholder="Prénom"
            className="form-control"
          />
        </div>
      </div>


      <div className="col-md-6">
        <label className="form-label">Email</label>
        <div className="input-group">
          <span className="input-group-text"><i className="bi bi-envelope"></i></span>
          <input
            name="email"
            value={etudiant.email}
            onChange={handleChange}
            placeholder="Email"
            className="form-control"
          />
        </div>
      </div>

      <div className="col-md-6">
        <label className="form-label">Téléphone</label>
        <div className="input-group">
          <span className="input-group-text"><i className="bi bi-telephone"></i></span>
          <input
            name="telephone"
            value={etudiant.telephone}
            onChange={handleChange}
            placeholder="Téléphone"
            className="form-control"
          />
        </div>
      </div>

      <div className="col-md-6">
        <label className="form-label">Photo</label>
        <input
          type="file"
          name="image"
          onChange={e => setImage(e.target.files[0])}
          className="form-control"
        />
      </div>


      <div className="col-12">
        <button type="submit" className="btn btn-success">
          <i className="bi bi-check-circle me-1"></i>
          Enregistrer
        </button>
      </div>

    </form>
  </div>

    );
}

export default EditEtudiants