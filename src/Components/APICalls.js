const url = 'https://api.ethicsglobal.com'; 

export async function landingConfig() {
    const response = await fetch(`${url}/landing/get/demov2.ethicsglobal.com/`)
    if (!response.ok) {
        throw new Error('Error al obtener la configuración inicial')
    }
    return response.json()
}

export async function fetchComplaint(folio) {
  const response = await fetch(`${url}/denuncias/${folio}`)
  if (!response.ok) {
    throw new Error('Error al obtener la denuncia')
  }
  return response.json()
}

export async function sendMessage({ folio, mensaje }) {
  const response = await fetch(`${url}/denuncias/${folio}/mensajes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ mensaje }),
  })
  if (!response.ok) {
    throw new Error('Error al enviar el mensaje')
  }
  return response.json()
}