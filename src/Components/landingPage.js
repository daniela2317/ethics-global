import { useQuery } from "@tanstack/react-query"
import { landingConfig } from './APICalls';
import logo from '../Styles/ethics_global.svg';
import logoFord from '../Styles/ford-logo-flat.svg';
import '../Styles/LandingPage.css';
import ConsultaDenuncia from './consultaDenuncia';
import VisualizarMensajes from "./visualizarMensajes";
import EnviarMensaje from "./enviarMensaje";

export default function LandingPage() {
  const {
    data: config,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["landingConfig"],
    queryFn: landingConfig,
  })

  if (isLoading) return <div style={{ textAlign: "center", padding: "1rem", color: "white" }}>Cargando...</div>
  if (error)
    return (
      <div style={{ textAlign: "center", padding: "1rem", color: "red" }}>
        Error al cargar la configuración: {error.message}
      </div>
    )

  const { landing } = config;

  return (
    <div className="landing-page" style={{ backgroundColor: landing.colors.primary_color }}>
      <header className="p-4 flex justify-between items-center header">
        <img src={logo} className="logo" alt="logo Global Ethics" />
        <img src={logoFord} className="logo" alt="Logo Ford" />
      </header>

      <main className="main-content">
        <h1 className="title" style={{ color: landing.colors.primary_text_color }}>
          {landing.campaing_name}
        </h1>

        <p className="welcome-message" style={{ color: landing.colors.secondary_text_color }}>
          {landing.content.welcome_msg}
        </p>

        <div className="content-grid">
          <ConsultaDenuncia colors={landing.colors} />
          <VisualizarMensajes colors={landing.colors} />
          <EnviarMensaje colors={landing.colors} />
        </div>
      </main>

      <footer className="footer" style={{ backgroundColor: landing.colors.secondary_color }}>
        <h3 className="footer-title" style={{ color: landing.colors.primary_text_color }}>
          Canales de contacto:
        </h3>
        <ul className="contact-list" style={{ color: landing.colors.secondary_text_color }}>
          {landing.channels.email.is_active && <li>Email: {landing.channels.email.email}</li>}
          {landing.channels.whatsapp.is_active && <li>WhatsApp: {landing.channels.whatsapp.phone_number}</li>}
          {landing.channels.phones.is_active &&
            landing.channels.phones.list_phones.map((phone, index) => <li key={index}>Teléfono: {phone}</li>)}
        </ul>
      </footer>
    </div>
  )
}