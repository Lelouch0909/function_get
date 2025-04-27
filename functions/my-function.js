const { Client, Databases } = require("node-appwrite");

module.exports = async function (req, res) {
    // 1. Initialiser le client Appwrite
    const client = new Client()
        .setEndpoint(process.env.APPWRITE_ENDPOINT)
        .setProject(process.env.APPWRITE_PROJECT_ID)
        .setKey(process.env.APPWRITE_API_KEY);

    const databases = new Databases(client);

    // 2. Récupérer l'ID de l'événement depuis les variables
    const eventId = req.query.eventId || req.variables.EVENT_ID;

    if (!eventId) {
        return res.json({ error: "ID d'événement manquant" }, 400);
    }

    try {
        // 3. Générer le lien partageable avec le sous-domaine Appwrite
        const shareableLink = `${process.env.APPWRITE_ENDPOINT}/functions/${process.env.APPWRITE_FUNCTION_ID}/exec?eventId=${eventId}`;

        // 4. Renvoyer le lien
        res.json({
            success: true,
            eventId: eventId,
            shareableLink: shareableLink,
        });
    } catch (error) {
        res.json({ error: "Erreur lors de la génération du lien" }, 500);
    }
};