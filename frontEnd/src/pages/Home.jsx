import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Home() {
    const [etudiants, setEtudiants] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8081')
        .then(response => {
            setEtudiants(response.data);
        })
        .catch(error => {
            console.error('Erreur lors du chargement des étudiants', error);
        });
    }, []);
    const handleDelete = (id) => {
      if (window.confirm("Êtes-vous sûr de vouloir supprimer cet étudiant ?")) {
        axios.delete(`http://localhost:8081/etudiant/${id}`)
          .then(() => {
            setEtudiants(etudiants.filter(etudiant => etudiant.id !== id));
          })
          .catch(error => {
            console.error("Erreur lors de la suppression", error);
            alert("Erreur lors de la suppression !");
          });
      }
    };
    const [searchTerm, setSearchTerm] = useState('');
    const filteredEtudiants = etudiants.filter(etudiant =>
      etudiant.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      etudiant.prenom.toLowerCase().includes(searchTerm.toLowerCase())
    );    

    return(
      <div className="container mt-4">
      <h1 className="mb-4 text-center">Liste des étudiants</h1>
    
      <div className="input-group mb-3">
        <span className="input-group-text">
          <i className="bi bi-search"></i>
        </span>
        <input
          type="text"
          className="form-control"
          placeholder="Rechercher par nom ou prénom..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Link
          to="/add"
          className="btn btn-sm btn-primary me-2"
          >
          <i className="bi bi-pencil-square me-1"></i>
            Ajouter un étudiant
          </Link>
      </div>
    
      <div className="table-responsive">
        <table className="table table-bordered table-hover">
          <thead className="table-dark">
            <tr>
              <th>Photo</th>
              <th>Nom</th>
              <th>Prénom</th>
              <th>Email</th>
              <th>Téléphone</th>
              <th>Date d'inscription</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredEtudiants.map(etudiant => (
              <tr key={etudiant.id}>
                <td>
                  <img 
                    src={`http://localhost:8081/uploads_images/${etudiant.image_url}`} 
                    alt="Photo Étudiant" 
                    style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '50%' }} 
                  />
                </td>
                <td>{etudiant.nom}</td>
                <td>{etudiant.prenom}</td>
                <td>{etudiant.email}</td>
                <td>{etudiant.telephone}</td>
                <td>{new Date(etudiant.date_inscription).toLocaleString()}</td>
                <td>
                  <button
                    onClick={() => window.location.href = `/edit/${etudiant.id}`}
                    className="btn btn-sm btn-primary me-2"
                  >
                    <i className="bi bi-pencil-square me-1"></i>
                    Éditer
                  </button>
                  <button
                    onClick={() => handleDelete(etudiant.id)}
                    className="btn btn-sm btn-danger"
                  >
                    <i className="bi bi-trash3 me-1"></i>
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    
    )
}

export default Home