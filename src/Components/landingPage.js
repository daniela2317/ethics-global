import { useQuery } from "@tanstack/react-query"
import { landingConfig } from './APICalls';

export default function LandingPage() {
  const {
    data: config,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["landingConfig"],
    queryFn: landingConfig,
  })

  if (isLoading) return <div className="text-white">Cargando...</div>
  if (error) return <div className="text-red-500">Error al cargar la configuración: {error.message}</div>

  const { landing } = config;

  return (
    <div style={{ backgroundColor: landing.colors.primary_color }}>
      <header className="p-4 flex justify-between items-center">
        <img src={landing.company_logo || "/placeholder.svg"} alt="Logo de la empresa" width={150} height={50} />
        <img src={landing.campaign_logo || "/placeholder.svg"} alt="Logo de la campaña" width={150} height={50} />
      </header>

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-4" style={{ color: landing.colors.primary_text_color }}>
          {landing.campaing_name}
        </h1>

        <p className="mb-8" style={{ color: landing.colors.secondary_text_color }}>
          {landing.content.welcome_msg}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-bold mb-4" style={{ color: landing.colors.primary_text_color }}>
              {landing.content.form_title}
            </h2>
            <p style={{ color: landing.colors.secondary_text_color }}>{landing.content.form_msg}</p>
            <button
              className="mt-4 px-6 py-2 rounded"
              style={{
                backgroundColor: landing.colors.grievance_btn_color,
                color: landing.colors.primary_text_color,
              }}
            >
              {landing.content.grievance_btn}
            </button>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4" style={{ color: landing.colors.primary_text_color }}>
              {landing.content.tracking_grievance_title}
            </h2>
            <p style={{ color: landing.colors.secondary_text_color }}>{landing.content.tracking_grievance_msg}</p>
            <button
              className="mt-4 px-6 py-2 rounded"
              style={{
                backgroundColor: landing.colors.track_btn_color,
                color: landing.colors.primary_text_color,
              }}
            >
              {landing.content.track_btn}
            </button>
          </div>
        </div>
      </main>

      <footer className="mt-8 p-4" style={{ backgroundColor: landing.colors.secondary_color }}>
        <h3 className="text-xl font-bold mb-2" style={{ color: landing.colors.primary_text_color }}>
          Canales de contacto:
        </h3>
        <ul style={{ color: landing.colors.secondary_text_color }}>
          {landing.channels.email.is_active && <li>Email: {landing.channels.email.email}</li>}
          {landing.channels.whatsapp.is_active && <li>WhatsApp: {landing.channels.whatsapp.phone_number}</li>}
          {landing.channels.phones.is_active &&
            landing.channels.phones.list_phones.map((phone, index) => <li key={index}>Teléfono: {phone}</li>)}
        </ul>
      </footer>
    </div>
  )
}

