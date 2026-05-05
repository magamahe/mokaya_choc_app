import React, { useState, useEffect, useRef } from "react";
import { useMokayaTheme } from "../context/ThemeContext";

const AsistenteMokaya = () => {
  const { theme, darkMode } = useMokayaTheme();

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

  // Animación escritura
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
    if (!mensaje.trim() || cargando) return;

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

  return (
    <section
      className="py-12 md:py-20 px-4 md:px-12"
      style={{ backgroundColor: theme.background }}
    >
      <div className="max-w-5xl mx-auto">
        {/* HEADER */}
        <div className="flex items-center space-x-2 mb-4">
          <div
            className="w-8 h-[2px]"
            style={{ backgroundColor: theme.primary }}
          />
          <span
            className="uppercase tracking-[0.3em] text-xs font-bold"
            style={{ color: theme.primary }}
          >
            Experiencia Sensorial
          </span>
        </div>

        <h2
          className="text-4xl md:text-5xl font-bold leading-tight mb-4"
          style={{
            color: theme.text,
            fontFamily: "'Playfair Display', serif",
          }}
        >
          Consultá a nuestro{" "}
          <span style={{ color: theme.primary }}>Sommelier</span>
        </h2>

        <p
          className="text-base md:text-lg leading-relaxed opacity-80 mb-8 max-w-2xl"
          style={{ color: theme.text }}
        >
          Descubrí combinaciones únicas y dejate guiar por una experiencia
          gourmet personalizada.
        </p>

        {/* CHAT */}
        <div
          className="rounded-2xl shadow-lg flex flex-col"
          style={{
            backgroundColor: darkMode ? "#1a1a1a" : "#ffffff",
            border: "1px solid #e5e5e5",
            height: "500px",
          }}
        >
          {/* MENSAJES */}
          <div
            ref={chatRef}
            className="flex-1 overflow-y-auto p-4 flex flex-col gap-3"
          >
            {chat.map((msg, i) => (
              <div
                key={i}
                className="flex items-end gap-2"
                style={{
                  justifyContent:
                    msg.tipo === "user" ? "flex-end" : "flex-start",
                }}
              >
                {/* Avatar BOT */}
                {msg.tipo === "bot" && (
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm"
                    style={{ backgroundColor: theme.primary }}
                  >
                    🍫
                  </div>
                )}

                {/* BURBUJA */}
                <div
                  className="px-4 py-2 rounded-xl max-w-[70%]"
                  style={
                    msg.tipo === "user"
                      ? {
                          backgroundColor: theme.primary,
                          color: "#ffffff", 
                          fontWeight: 500,
                        }
                      : {
                          backgroundColor: darkMode
                            ? "#2a2a2a"
                            : "#f1f1f1",
                          color: darkMode ? "#f5f5f5" : "#2c2c2c",, 
                        }
                  }
                >
                  {msg.texto ? (
                    msg.texto
                  ) : msg.tipo === "bot" ? (
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></span>
                      <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                      <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                    </div>
                  ) : null}
                </div>
              </div>
            ))}
          </div>

          {/* INPUT */}
          <form
            onSubmit={consultarIA}
            className="flex gap-2 p-3 border-t"
            style={{ borderColor: "#e5e5e5" }}
          >
            <input
              value={mensaje}
              onChange={(e) => setMensaje(e.target.value)}
              placeholder="Ej: ¿Qué chocolate combina con un Malbec?"
              className="flex-1 px-4 py-2 rounded-lg outline-none placeholder-gray-400"
              style={{
                border: "1px solid #ddd",
                backgroundColor: "#ffffff",
                color: "#2c2c2c", // 🔥 SIEMPRE visible
              }}
            />

            <button
              type="submit"
              disabled={cargando}
              className="px-4 py-2 rounded-lg font-semibold disabled:opacity-50"
              style={{
                backgroundColor: theme.primary,
                color: "#ffffff",
              }}
            >
              {cargando ? "..." : "Enviar"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AsistenteMokaya;
