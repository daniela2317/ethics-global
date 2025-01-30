import { useState } from "react"
import { useQuery, useMutation } from "@tanstack/react-query"
import { fetchComplaint, sendMessage } from './APICalls';
import ConsultForm from './consultForm';
import PanelMessages from './panelMessages';
import SendMessageForm from './sendMessageForm';

export default function ComplaintTracker() {
  const [folio, setFolio] = useState('');

  const {
    data: denuncia,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["denuncia", folio],
    queryFn: () => fetchComplaint(folio),
    enabled: !!folio,
  })

  const mutation = useMutation({
    mutationFn: sendMessage,
    onSuccess: () => {
      // Aquí puedes agregar lógica para manejar el éxito de la mutación
      console.log("Mensaje enviado con éxito")
    },
  })

  const handleConsulta = (nuevoFolio) => {
    setFolio(nuevoFolio)
  }

  const handleEnviarMensaje = (mensaje) => {
    mutation.mutate({ folio, mensaje })
  }

  if (isLoading) return <div className="text-white">Cargando...</div>
  if (error) return <div className="text-red-500">Error al cargar la denuncia: {error.message}</div>

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <ConsultForm onConsulta={handleConsulta} />
      {denuncia && (
        <>
          <div className="mt-4">
            <h2 className="text-2xl font-bold mb-2">Estado de la denuncia: {denuncia.estado}</h2>
            <PanelMessages mensajes={denuncia.mensajes} />
            <SendMessageForm onEnviarMensaje={handleEnviarMensaje} />
          </div>
        </>
      )}
    </div>
  )
}

