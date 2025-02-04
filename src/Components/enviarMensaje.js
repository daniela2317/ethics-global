import { useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { sendMessage } from './APICalls';

export default function EnviarMensaje({ colors }) {
  const [folio, setFolio] = useState("")
  const [mensaje, setMensaje] = useState("")
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: ({ folio, mensaje }) => sendMessage(folio, mensaje),
    onSuccess: () => {
      queryClient.invalidateQueries(["mensajes", folio])
      setMensaje("")
    },
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    mutation.mutate({ folio, mensaje })
  }

  return (
    <div className="content-block">
      <h2 className="block-title" style={{ color: colors.primary_text_color }}>
        Enviar nuevo mensaje
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
        <textarea
          value={mensaje}
          onChange={(e) => setMensaje(e.target.value)}
          placeholder="Escriba su mensaje"
          className="input"
          style={{ marginBottom: "1rem", width: "100%", padding: "0.5rem", minHeight: "100px" }}
        />
        <button
          type="submit"
          className="button"
          style={{
            backgroundColor: colors.grievance_btn_color,
            color: colors.primary_text_color,
          }}
        >
          Enviar mensaje
        </button>
      </form>
      {mutation.isLoading && <p>Enviando mensaje...</p>}
      {mutation.isError && <p style={{ color: "red" }}>Error: {mutation.error.message}</p>}
      {mutation.isSuccess && <p style={{ color: "green" }}>Mensaje enviado con éxito</p>}
    </div>
  )
}

