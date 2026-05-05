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
                   /*  content: "Eres el Sommelier de Mokaya, una chocolatería de lujo. Tu tono es elegante, experto y apasionado por el cacao. Responde dudas sobre maridajes, tipos de chocolate y la historia de Mokaya de forma breve y sofisticada. Si te preguntan algo que no tenga que ver con chocolate o Mokaya, intenta llevar la conversación de vuelta al chocolate con elegancia." */
                   content: `Eres el Sommelier de Mokaya. Tu objetivo es recomendar SOLO los chocolates que tenemos en stock. 
        
        NUESTROS PRODUCTOS REALES SON:
        - Chocolate Intenso (80% cacao, ideal para vinos tintos fuertes).
        - Delicia de Leche (suave, con almendras tostadas, ideal para café).
        - Blanco Nevado (con frutos del bosque, ideal para espumantes).
        - Trufas de chocolate (variedad de sabores, maridan bien con cócteles dulces).
        - chocolate en rama (puro, para degustar solo o con un buen whisky).
        - Bombones rellenos (variedad de sabores, ideales para acompañar un café de postre o un buen vino dulce).


        Instrucciones:
        1. Sé elegante y breve.
        2. Si el usuario pregunta por un maridaje, busca en la lista anterior cuál queda mejor.
        3. Si no encuentras uno que combine, recomiéndales probar nuestro "Chocolate Intenso" que es el favorito de la casa.
        4. Si el usuario pregunta algo que no tenga que ver con chocolate o maridajes, responde de forma educada pero siempre intenta llevar la conversación de vuelta al chocolate y nuestros productos.
        5. No inventes productos que no estén en la lista, siempre recomienda alguno de los reales.
        6. Si el usuario pregunta por la historia de Mokaya, cuéntales que somos una chocolatería de lujo apasionada por el cacao, con una selección exclusiva de chocolates para los paladares más exigentes. Nuestra misión es ofrecer experiencias sensoriales únicas a través de nuestros productos artesanales.
        7. Invita al usuario a escribirnos por whatsapp para hacer un pedido o resolver dudas, siempre de forma elegante y sutil, seccion que encuentra mas abajo.`

                },
                {
                    role: "user",
                    content: prompt,
                },
            ],
            model: "llama-3.3-70b-versatile",
        });

        res.json({ response: chatCompletion.choices[0].message.content });
    } catch (error) {
        console.error("Error en el servidor de Groq:", error);
        console.error("ERROR DETALLADO DE GROQ:", error.message); 
        res.status(500).json({ error: "El Sommelier está tomando un descanso. Intenta más tarde." });
    }
});

module.exports = router;