import React, { useState, useRef, useEffect } from 'react';

const AsistenteMokaya = () => {
    const [mensaje, setMensaje] = useState("");
    const [respuesta, setRespuesta] = useState("");
    const [cargando, setCargando] = useState(false);
    const respuestaRef = useRef(null);

    // Hacer scroll automático cuando aparece la respuesta
    useEffect(() => {
        if (respuesta && respuestaRef.current) {
            respuestaRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [respuesta]);

    const consultarIA = async (e) => {
        e.preventDefault();
        if (!mensaje.trim()) return;

        setCargando(true);
        setRespuesta(""); // Limpiar respuesta anterior

        try {
            // Usamos ruta relativa porque el front y back están en el mismo Render
            const res = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ prompt: mensaje })
            });

            const data = await res.json();
            
            if (data.response) {
                setRespuesta(data.response);
            } else {
                setRespuesta("El sommelier está ocupado en la cava. Por favor, intenta de nuevo en unos instantes.");
            }
        } catch (error) {
            console.error("Error al consultar el sommelier:", error);
            setRespuesta("Lo siento, hubo un problema al conectar con nuestro experto. Verifica tu conexión.");
        } finally {
            setCargando(false);
        }
    };

    // Estilos en objetos para que no necesites archivos CSS extra
    const styles = {
        container: {
            maxWidth: '700px',
            margin: '40px auto',
            padding: '30px',
            backgroundColor: '#fdf8f3', // Crema suave
            borderRadius: '15px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
            border: '1px solid #e2d1c3',
            fontFamily: '"Playfair Display", serif'
        },
        header: {
            textAlign: 'center',
            color: '#4a2c2a', // Chocolate oscuro
            marginBottom: '20px'
        },
        description: {
            textAlign: 'center',
            color: '#7b5e57',
            fontSize: '1.1rem',
            marginBottom: '25px'
        },
        form: {
            display: 'flex',
            flexDirection: 'column',
            gap: '15px'
        },
        textarea: {
            width: '100%',
            minHeight: '100px',
            padding: '15px',
            borderRadius: '10px',
            border: '1.5px solid #d3b8ae',
            fontSize: '1rem',
            outline: 'none',
            transition: 'border-color 0.3s',
            resize: 'vertical'
        },
        button: {
            backgroundColor: '#4a2c2a',
            color: '#fff',
            padding: '12px 25px',
            border: 'none',
            borderRadius: '8px',
            fontSize: '1rem',
            fontWeight: 'bold',
            cursor: cargando ? 'not-allowed' : 'pointer',
            transition: 'background-color 0.3s',
            opacity: cargando ? 0.7 : 1
        },
        responseBox: {
            marginTop: '30px',
            padding: '20px',
            backgroundColor: '#fff',
            borderRadius: '10px',
            borderLeft: '6px solid #8d5524',
            boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
            animation: 'fadeIn 0.5s ease-in'
        },
        expertTitle: {
            display: 'block',
            color: '#8d5524',
            fontWeight: 'bold',
            marginBottom: '10px',
            fontSize: '0.9rem',
            textTransform: 'uppercase',
            letterSpacing: '1px'
        },
        responseText: {
            color: '#3e2723',
            lineHeight: '1.6',
            fontSize: '1.05rem',
            margin: 0
        },
        loader: {
            textAlign: 'center',
            color: '#8d5524',
            fontStyle: 'italic',
            marginTop: '15px'
        }
    };

    return (
        <section style={styles.container}>
            <div style={styles.header}>
                <h2 style={{ fontSize: '2rem', margin: '0 0 10px 0' }}>Experiencia Sensorial</h2>
                <div style={{ width: '50px', height: '2px', backgroundColor: '#8d5524', margin: '0 auto' }}></div>
            </div>
            
            <p style={styles.description}>
                Consulta a nuestro <strong>Sommelier de Mokaya</strong> sobre maridajes, notas de cata o la historia detrás de nuestros granos de cacao.
            </p>

            <form onSubmit={consultarIA} style={styles.form}>
                <textarea
                    value={mensaje}
                    onChange={(e) => setMensaje(e.target.value)}
                    placeholder="Ej: ¿Qué chocolate me recomiendas para acompañar un vino Malbec?"
                    style={styles.textarea}
                    onFocus={(e) => e.target.style.borderColor = '#4a2c2a'}
                    onBlur={(e) => e.target.style.borderColor = '#d3b8ae'}
                />
                <button 
                    type="submit" 
                    disabled={cargando} 
                    style={styles.button}
                    onMouseOver={(e) => !cargando && (e.target.style.backgroundColor = '#5d3a37')}
                    onMouseOut={(e) => !cargando && (e.target.style.backgroundColor = '#4a2c2a')}
                >
                    {cargando ? "Consultando a la cava..." : "Consultar al Experto"}
                </button>
            </form>

            {cargando && <p style={styles.loader}>Buscando la nota perfecta...</p>}

            {respuesta && (
                <div style={styles.responseBox} ref={respuestaRef}>
                    <span style={styles.expertTitle}>Sommelier Mokaya dice:</span>
                    <p style={styles.responseText}>{respuesta}</p>
                </div>
            )}
        </section>
    );
};

export default AsistenteMokaya;