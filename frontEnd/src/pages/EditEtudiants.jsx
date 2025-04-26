import React from "react";
import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import axios from "axios";

function EditEtudiants() {
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
        })
        .catch(err => console.error(err));
    }, [id]);

    const handleChange = (e) => {
        setEtudiants({...etudiant, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:8081/etudiant/${id}`, etudiant)
        .then(() => {
            alert("Etudiant modifié !");
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
      <label className="form-label">Date de naissance</label>
      <div className="input-group">
        <span className="input-group-text"><i className="bi bi-calendar-event"></i></span>
        <input
          name="date_naissance"
          type="date"
          value={etudiant.date_naissance}
          onChange={handleChange}
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