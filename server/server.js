import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import cookieParser from 'cookie-parser';
import { Pool } from 'pg';
import path from 'path';
import multer from 'multer';
import fs from 'fs'; // <-- ajout important pour supprimer les anciennes images

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use('/uploads_images', express.static('uploads_images'));

const db = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'etudiants',
    password: '123456',
    port: 5432,
});

// Config multer pour upload image
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads_images/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // nom unique
  }
});

const upload = multer({ storage: storage });

// Page principale
app.get('/', async (req, res) => {
    try {
      const result = await db.query('SELECT * FROM etudiant ORDER BY id ASC');
      res.json(result.rows);
    } catch (error) {
      console.error(error);
      res.status(500).json({ erreur: 'Erreur serveur' });
    }
});

// Ajout étudiant
app.post('/add', upload.single('image'), (req, res) => {
  const sql = 'INSERT INTO etudiant(nom, prenom, email, telephone, image_url) VALUES ($1, $2, $3, $4, $5)';
  const values = [
    req.body.nom,
    req.body.prenom,
    req.body.email,
    req.body.telephone,
    req.file ? req.file.filename : null
  ];
  db.query(sql, values, (err, result) => {
    if (err) {
      console.error(err);
      return res.json({ Error: "Inserting data Error in server" });
    }
    return res.json({ Status: "Success" });
  });
});

// Récupération d'un étudiant
app.get('/etudiant/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query('SELECT * FROM etudiant WHERE id = $1', [id]);
    if (result.rows.length === 0) return res.status(404).json({ message: 'Étudiant non trouvé' });
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// 🔥 Mise à jour étudiant + image
app.put('/etudiant/:id', upload.single('image'), async (req, res) => {
  const { id } = req.params;
  const { nom, prenom, email, telephone, oldImage } = req.body;

  try {
    let newImage = oldImage; 

    if (req.file) {
      newImage = req.file.filename;

      // Supprimer l'ancienne image du serveur
      if (oldImage) {
        const oldImagePath = path.join('uploads_images', oldImage);
        fs.unlink(oldImagePath, (err) => {
          if (err) {
            console.error('Erreur lors de la suppression de l\'ancienne image :', err);
          } else {
            console.log('Ancienne image supprimée:', oldImagePath);
          }
        });
      }
    }

    // Mise à jour des infos + nouvelle image
    await db.query(
      'UPDATE etudiant SET nom=$1, prenom=$2, email=$3, telephone=$4, image_url=$5 WHERE id=$6',
      [nom, prenom, email, telephone, newImage, id]
    );

    res.json({ message: "Étudiant mis à jour" });
  } catch (error) {
    console.error(error);
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
