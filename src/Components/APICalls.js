const urlAPI = 'https://api.ethicsglobal.com';
const tenant = 'demo.v2.ethicsglobal.com';

export async function landingConfig() {
  const response = await fetch(`${urlAPI}/landing/get/demov2.ethicsglobal.com/`)
  if (!response.ok) {
    throw new Error("Error al obtener la configuración de la landing page")
  }
  return response.json()
}

export async function fetchComplaint(folio) {
  try {
    const folioNumber = Number.parseInt(folio, 10)

    if (isNaN(folioNumber)) {
      throw new Error("El folio debe ser un número válido")
    }

    const url = `${urlAPI}/${tenant}/api/report/${folioNumber}/status`;
    console.log("Fetching from URL:", url)

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("No se encontraron mensajes para el folio proporcionado")
      }
      throw new Error(`Error ${response.status}: ${response.statusText}`)
    }

    const data = await response.json()
    console.log("Received data:", data)
    return data.messages || []
  } catch (error) {
    console.error("Error fetching messages:", error)
    throw error
  }
}

export async function fetchMessages(folio) {
  try {
    const response = await fetch(`${urlAPI}/${tenant}/api/report/${folio}/messages`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("No se encontraron mensajes para el folio proporcionado")
      }
      throw new Error(`Error ${response.status}: ${response.statusText}`)
    }

    return response.json()
  } catch (error) {
    console.error("Error fetching mensajes:", error)
    throw error
  }
}

export async function sendMessage(folio, mensaje) {
  try {
    const response = await fetch(`${urlAPI}/${tenant}/api/report/${folio}/messages/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ mensaje }),
    })

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`)
    }

    return response.json()
  } catch (error) {
    console.error("Error sending message:", error)
    throw error
  }
}
