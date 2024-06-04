const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs'); // N'oubliez pas d'importer le module fs

const app = express();

// Configuration de multer pour le stockage des fichiers téléchargés
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Vérifie si le dossier d'upload existe, sinon, le crée
        const uploadDir = './uploads';
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir);
        }
        cb(null, uploadDir); // Dossier de destination pour les fichiers téléchargés
    },
    filename: function (req, file, cb) {
        cb(null, 'planning.pdf'); // Nom du fichier téléchargé
    }
});

const upload = multer({ storage: storage });

// Middleware pour servir les fichiers statiques depuis le dossier 'uploads'
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Route pour servir le fichier uploads.html
app.get('/uploads.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'uploads.html'));
});

// Route pour gérer le téléchargement du planning
app.post('/upload', upload.single('planning'), (req, res) => {
    res.send('Fichier PDF du planning téléchargé avec succès');
});

// Démarrage du serveur sur le port 3000
const PORT = process.env.PORT || 3000; // Utilisez le port fourni par l'environnement ou le port 3000 par défaut
app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});
