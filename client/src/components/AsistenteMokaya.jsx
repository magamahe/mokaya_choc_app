import React, { useState, useEffect, useRef } from "react";

const AsistenteMokaya = () => {
  const [mensaje, setMensaje] = useState("");
  const [chat, setChat] = useState([]);
  const [cargando, setCargando] = useState(false);
  const chatRef = useRef(null);

  // Scroll automático
  useEffect(() => {
    chatRef.current?.scrollTo({
      top: chatRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [chat]);

  // Animación escritura tipo ChatGPT
  const escribirRespuesta = (textoCompleto) => {
    let i = 0;
    const intervalo = setInterval(() => {
      setChat((prev) => {
        const copia = [...prev];
        copia[copia.length - 1].texto = textoCompleto.slice(0, i);
        return copia;
      });
      i++;
      if (i > textoCompleto.length) clearInterval(intervalo);
    }, 20);
  };

  const consultarIA = async (e) => {
    e.preventDefault();
    if (!mensaje.trim()) return;

    const userMsg = { tipo: "user", texto: mensaje };
    const botMsg = { tipo: "bot", texto: "" };

    setChat((prev) => [...prev, userMsg, botMsg]);
    setMensaje("");
    setCargando(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: mensaje }),
      });

      const data = await res.json();
      const texto =
        data.response ||
        "El sommelier está en la cava 🍷. Intentá nuevamente.";

      escribirRespuesta(texto);
    } catch (error) {
      escribirRespuesta("Hubo un problema al conectar con el sommelier.");
    } finally {
      setCargando(false);
    }
  };

  const styles = {
    container: {
      maxWidth: "750px",
      margin: "60px auto",
      padding: "30px",
      background: "linear-gradient(145deg, #fdf8f3, #f7efe9)",
      borderRadius: "20px",
      boxShadow: "0 20px 50px rgba(0,0,0,0.08)",
      display: "flex",
      flexDirection: "column",
      height: "80vh",
    },
    chatBox: {
      flex: 1,
      overflowY: "auto",
      padding: "10px",
      display: "flex",
      flexDirection: "column",
      gap: "10px",
    },
    bubbleUser: {
      alignSelf: "flex-end",
      background: "#4a2c2a",
      color: "#fff",
      padding: "10px 15px",
      borderRadius: "15px 15px 5px 15px",
      maxWidth: "70%",
    },
    bubbleBot: {
      alignSelf: "flex-start",
      background: "#fff",
      color: "#4e342e",
      padding: "10px 15px",
      borderRadius: "15px 15px 15px 5px",
      maxWidth: "70%",
      border: "1px solid #eee",
    },
    form: {
      display: "flex",
      gap: "10px",
      marginTop: "10px",
    },
    input: {
      flex: 1,
      padding: "12px",
      borderRadius: "10px",
      border: "1px solid #ddd",
      outline: "none",
    },
    button: {
      background: "#4a2c2a",
      color: "#fff",
      border: "none",
      padding: "12px 18px",
      borderRadius: "10px",
      cursor: "pointer",
    },
  };

  return (
    <section style={styles.container}>
      <div ref={chatRef} style={styles.chatBox}>
        {chat.map((msg, i) => (
          <div
            key={i}
            style={msg.tipo === "user" ? styles.bubbleUser : styles.bubbleBot}
          >
            {msg.texto || (cargando && msg.tipo === "bot" && "...")}
          </div>
        ))}
      </div>

      <form onSubmit={consultarIA} style={styles.form}>
        <input
          value={mensaje}
          onChange={(e) => setMensaje(e.target.value)}
          placeholder="Preguntá sobre chocolates, maridajes..."
          style={styles.input}
        />
        <button type="submit" style={styles.button}>
          Enviar
        </button>
      </form>
    </section>
  );
};

export default AsistenteMokaya;