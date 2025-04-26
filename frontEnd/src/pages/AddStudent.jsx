import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios'

function AddStudent() {
    const [values, setValues] = useState({
        nom: '',
        prenom: '',
        date_naissance: '',
        email: '',
        telephone: '',
    });
    const [image, setImage] = useState(null);

    const navigate = useNavigate();

    const handleRequest = (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('nom', values.nom);
        formData.append('prenom', values.prenom);
        formData.append('email', values.email);
        formData.append('telephone', values.telephone);
        formData.append('image', image);

        axios.post('http://localhost:8081/add', formData)
        .then(res => {
            if(res.data.Status === "Success") {
                navigate('/');
            } else {
                alert("Error");
            }
        })
        .catch(err => console.log(err));
    }

    return(
        <div className="container mt-4">
        <h2 className="mb-4">Ajouter un étudiant(e)</h2>
        <form onSubmit={ handleRequest } className="row g-3" encType="multipart/form-data">

          {/* nom */}
          <div className="col-md-6">
            <label className="form-label">Nom</label>
            <input
              name="nom"
              onChange={e=> setValues({...values, nom: e.target.value})}
              placeholder="Nom"
              className="form-control"
            />
          </div>

          {/* prenom */}
          <div className="col-md-6">
            <label className="form-label">Prénom</label>
            <input
              name="prenom"
              onChange={e=> setValues({...values, prenom: e.target.value})}
              placeholder="Prénom"
              className="form-control"
            />
          </div>


          {/* email */}
          <div className="col-md-6">
            <label className="form-label">Email</label>
            <input
              name="email"
              onChange={e=> setValues({...values, email: e.target.value})}
              placeholder="Email"
              className="form-control"
            />
          </div>

          {/* téléphone */}
          <div className="col-md-6">
            <label className="form-label">Téléphone</label>
            <input
              name="telephone"
              onChange={e=> setValues({...values, telephone: e.target.value})}
              placeholder="Téléphone"
              className="form-control"
            />
          </div>

          {/* image */}
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
              Enregistrer
            </button>
          </div>

        </form>
      </div>
    )
}

export default AddStudent;