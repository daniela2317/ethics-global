import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { fetchComplaint } from './APICalls';

export default function ConsultaDenuncia({ colors }) {
  const [folio, setFolio] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    data: denuncia,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["denuncia", folio],
    queryFn: () => fetchComplaint(folio),
    enabled: false,
    retry: 1, // Solo intentará una vez más si falla
    onError: (error) => {
      console.error("Error en la consulta:", error)
    },
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!folio.trim()) {
      alert("Por favor ingrese un folio válido")
      return
    }
    setIsSubmitted(true)
    await refetch()
  }

  return (
    <div className="content-block">
      <h2 className="block-title" style={{ color: colors.primary_text_color }}>
        Consultar estado de denuncia
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            value={folio}
            onChange={(e) => {
              setFolio(e.target.value)
              setIsSubmitted(false) // Resetear el estado cuando cambia el input
            }}
            placeholder="Ingrese el folio"
            className="input"
            style={{
              marginBottom: "1rem",
              width: "100%",
              padding: "0.5rem",
              border: "1px solid #ccc",
            }}
          />
          <button
            type="submit"
            className="button"
            style={{
              backgroundColor: colors.track_btn_color,
              color: colors.primary_text_color,
            }}
            disabled={isLoading}
          >
            {isLoading ? "Consultando..." : "Consultar"}
          </button>
        </div>

        {isLoading && (
          <div className="text-center p-4">
            <p>Cargando información...</p>
          </div>
        )}

        {error && isSubmitted && (
          <div className="p-4 bg-red-50 text-red-700 rounded-md">
            <p>Error: {error.message}</p>
            <p className="text-sm mt-2">
              Por favor verifique el folio e intente nuevamente. Si el problema persiste, contacte al administrador.
            </p>
          </div>
        )}

        {denuncia && (
          <div className="mt-4 p-4 bg-green-50 rounded-md">
            <h3 style={{ color: colors.primary_text_color }} className="font-bold">
              Estado de la denuncia:
            </h3>
            <p style={{ color: colors.secondary_text_color }}>{denuncia.estado}</p>
            {denuncia.detalles && (
              <div className="mt-2">
                <p className="text-sm text-gray-600">{denuncia.detalles}</p>
              </div>
            )}
          </div>
        )}
      </form>
    </div>
  )
}

