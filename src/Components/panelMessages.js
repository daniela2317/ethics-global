export default function PanelMessages({ mensajes }) {
  return (
    <div className="mt-4 space-y-4">
      <h3 className="text-lg font-medium">Mensajes</h3>
      {mensajes.map((mensaje) => (
        <div key={mensaje.id} className="bg-gray-100 p-4 rounded-lg">
          <p className="text-sm text-gray-600">
            {mensaje.fecha} - {mensaje.autor}
          </p>
          <p className="mt-1">{mensaje.contenido}</p>
        </div>
      ))}
    </div>
  )
}

