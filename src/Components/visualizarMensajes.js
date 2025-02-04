import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { fetchMessages } from './APICalls';

export default function VisualizarMensajes({ colors }) {
  const [folio, setFolio] = useState("")
  const [submittedFolio, setSubmittedFolio] = useState(null) 

  const {
    data: mensajes,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["mensajes", submittedFolio],
    queryFn: () => fetchMessages(submittedFolio),
    enabled: !!submittedFolio, 
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!folio.trim()) {
      alert("Por favor, ingrese un folio válido.")
      return
    }

    setSubmittedFolio(folio) 
    refetch()
  }

  return (
    <div className="content-block">
      <h2 className="block-title" style={{ color: colors.primary_text_color }}>
        Visualizar mensajes
      </h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={folio}
          onChange={(e) => setFolio(e.target.value)}
          placeholder="Ingrese el folio"
          className="input"
          style={{ marginBottom: "1rem", width: "100%", padding: "0.5rem" }}
        />
        <button
          type="submit"
          className="button"
          style={{
            backgroundColor: colors.track_btn_color,
            color: colors.primary_text_color,
          }}
        >
          Ver mensajes
        </button>
      </form>

      {isLoading && <p>Cargando mensajes...</p>}
      {error && <p style={{ color: "red" }}>Error: {error.message}</p>}
      
      {mensajes?.length > 0 ? (
        <div style={{ marginTop: "1rem", maxHeight: "200px", overflowY: "auto" }}>
          {mensajes.map((mensaje, index) => (
            <div
              key={index}
              style={{
                marginBottom: "0.5rem",
                padding: "0.5rem",
                backgroundColor: "rgba(255,255,255,0.1)",
              }}
            >
              <p style={{ color: colors.primary_text_color }}>{mensaje.contenido}</p>
              <small style={{ color: colors.secondary_text_color }}>
                {new Date(mensaje.fecha).toLocaleString()}
              </small>
            </div>
          ))}
        </div>
      ) : (
        !isLoading && submittedFolio && <p>No hay mensajes para este folio.</p>
      )}
    </div>
  )
}