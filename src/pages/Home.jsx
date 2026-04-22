import { Link } from "react-router-dom";

function Home() {
  return (
    <div>

      {/* HERO */}
      <section style={styles.hero}>
        <h1 style={styles.title}>
          Creamos webs que venden 🚀
        </h1>

        <p style={styles.subtitle}>
          Ecommerce, automatización y marketing digital para escalar tu negocio
        </p>

        <div style={styles.buttons}>
          <Link to="/shop">
            <button style={styles.primaryBtn}>Ver tienda</button>
          </Link>

          <Link to="/login">
            <button style={styles.secondaryBtn}>Acceder</button>
          </Link>
        </div>
      </section>

      {/* SERVICIOS */}
      <section style={styles.section}>
        <h2>Servicios</h2>

        <div style={styles.grid}>
          <div style={styles.card}>
            <h3>Desarrollo Web</h3>
            <p>Landing pages y ecommerce optimizados para vender</p>
          </div>

          <div style={styles.card}>
            <h3>Publicidad</h3>
            <p>Campañas que convierten en clientes reales</p>
          </div>

          <div style={styles.card}>
            <h3>Automatización</h3>
            <p>Sistemas que trabajan por vos 24/7</p>
          </div>
        </div>
      </section>

      {/* BENEFICIOS */}
      <section style={styles.sectionAlt}>
        <h2>¿Por qué elegirnos?</h2>

        <ul>
          <li>✔ Diseño moderno y responsive</li>
          <li>✔ Sistemas listos para escalar</li>
          <li>✔ Integración con pagos y automatización</li>
        </ul>
      </section>

      {/* CTA FINAL */}
      <section style={styles.cta}>
        <h2>¿Listo para vender más?</h2>

        <Link to="/shop">
          <button style={styles.primaryBtn}>
            Empezar ahora
          </button>
        </Link>
      </section>

    </div>
  );
}

export default Home;

// 🎨 estilos simples (después lo pasamos a Tailwind)
const styles = {
  hero: {
    padding: "80px 20px",
    textAlign: "center",
    background: "#111",
    color: "#fff"
  },
  title: {
    fontSize: "40px",
    marginBottom: "20px"
  },
  subtitle: {
    fontSize: "18px",
    marginBottom: "30px"
  },
  buttons: {
    display: "flex",
    justifyContent: "center",
    gap: "15px"
  },
  primaryBtn: {
    padding: "10px 20px",
    background: "#00ff88",
    border: "none",
    cursor: "pointer"
  },
  secondaryBtn: {
    padding: "10px 20px",
    background: "#fff",
    border: "none",
    cursor: "pointer"
  },
  section: {
    padding: "60px 20px",
    textAlign: "center"
  },
  sectionAlt: {
    padding: "60px 20px",
    background: "#f5f5f5",
    textAlign: "center"
  },
  grid: {
    display: "flex",
    gap: "20px",
    justifyContent: "center",
    flexWrap: "wrap"
  },
  card: {
    border: "1px solid #ccc",
    padding: "20px",
    width: "250px"
  },
  cta: {
    padding: "60px 20px",
    textAlign: "center",
    background: "#111",
    color: "#fff"
  }
};