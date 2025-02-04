export default function PanelMensajes({ mensajes }) {
  return (
    <div>
      <h3>Mensajes</h3>
      {mensajes.map((mensaje) => (
        <div key={mensaje.id}>
          <p>
            {mensaje.fecha} - {mensaje.autor}
          </p>
          <p>{mensaje.contenido}</p>
        </div>
      ))}
    </div>
  )
}

