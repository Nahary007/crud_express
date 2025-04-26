import express, { response } from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import bcrypt, { hash } from 'bcrypt';
import cookieParser from 'cookie-parser';
import { Pool } from 'pg';

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());

const db = new Pool({
    user:'postgres',
    host:'localhost',
    database: 'etudiants',
    password: '123456',
    port: 5432,
});

// db.connect()
// .then(() => console.log('Connecté à PostgreSQL'))
// .catch(err => console.error('Erreur de connexion à PostgreSQL', err));

//page principale
app.get('/', async (req, res) => {
    try {
      const result = await db.query('SELECT * FROM etudiant ORDER BY id ASC');
      res.json(result.rows);
    } catch (error) {
      console.error(error);
      res.status(500).json({ erreur: 'Erreur serveur' });
    }
  });

//recuperation etudiant
app.get('/etudiant/:id', async(req, res) =>{
  const { id } = req.params;

  try {
    const result =await db.query('SELECT * FROM etudiant WHERE id = $1', [id]);
    if (result.rows.length === 0) return res.status(404).json({ message: 'Étudiant non trouvé' });
    res.json(result.rows[0]);
  } catch (error) {
    console.log(err);
    res.status(500).json({ message: 'Erreur serveur'});
  }
});

app.put('/etudiant/:id', async(req, res) => {
  const { id } = req.params;
  const { nom, prenom, date_naissance, email, telephone } = req.body;

  try {
    await db.query(
      'UPDATE etudiant SET nom=$1, prenom=$2, date_naissance=$3, email=$4, telephone=$5 WHERE id=$6',
      [nom, prenom, date_naissance, email, telephone, id]
    );
    res.json({message: "Etudiant mis à jour"});
  } catch (error) {
    console.log(err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// Supprimer un étudiant
app.delete('/etudiant/:id', async (req, res) => {
  const { id } = req.params;
  try {
      const result = await db.query('DELETE FROM etudiant WHERE id = $1', [id]);
      res.json({ message: 'Étudiant supprimé avec succès' });
  } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Erreur serveur' });
  }
});


app.listen(8081, () => {
    console.log("Running...");
});