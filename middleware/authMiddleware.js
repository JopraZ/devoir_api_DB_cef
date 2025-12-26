// Import de jsonwebtoken pour gérer les tokens JWT
const jwt = require('jsonwebtoken');

// Middleware d’authentification
// Il permet de protéger les routes privées de l’API
module.exports = (req, res, next) => {

    // Récupération du header Authorization
    // Format attendu : "Bearer <token>"
    const authHeader = req.headers.authorization;

    // Si aucun header n’est présent → accès refusé
    if (!authHeader) {
        return res.status(401).json({ message: 'Token manquant' });
    }

    // Extraction du token (partie après "Bearer")
    const token = authHeader.split(' ')[1];

    try {
        // Vérification et décodage du token avec la clé secrète
        const decoded = jwt.verify(token, 'SECRET_KEY');

        // Stockage des infos utilisateur dans la requête
        // (utilisable dans les routes suivantes)
        req.user = decoded;

        // Passage à la suite du traitement
        next();
    } catch (err) {
        // Token invalide ou expiré → accès refusé
        return res.status(401).json({ message: 'Token invalide' });
    }
};
