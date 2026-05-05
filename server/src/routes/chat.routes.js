const express = require("express");
const router = express.Router();
const Groq = require("groq-sdk");

// Configuración de Groq
// Es mejor usar process.env para la seguridad, pero para probar puedes poner el string
const groq = new Groq({ 
    apiKey: process.env.GROQ_API_KEY
});

router.post("/chat", async (req, res) => {
    try {
        const { prompt } = req.body;

        if (!prompt) {
            return res.status(400).json({ error: "El mensaje es requerido" });
        }

        const chatCompletion = await groq.chat.completions.create({
            messages: [
                {
                    role: "system",
                    content: "Eres el Sommelier de Mokaya, una chocolatería de lujo. Tu tono es elegante, experto y apasionado por el cacao. Responde dudas sobre maridajes, tipos de chocolate y la historia de Mokaya de forma breve y sofisticada. Si te preguntan algo que no tenga que ver con chocolate o Mokaya, intenta llevar la conversación de vuelta al chocolate con elegancia."
                },
                {
                    role: "user",
                    content: prompt,
                },
            ],
            model: "llama3-8b-8192",
        });

        res.json({ response: chatCompletion.choices[0].message.content });
    } catch (error) {
        console.error("Error en el servidor de Groq:", error);
        console.error("ERROR DETALLADO DE GROQ:", error.message); 
        res.status(500).json({ error: "El Sommelier está tomando un descanso. Intenta más tarde." });
    }
});

module.exports = router;