import { useForm } from "react-hook-form"

export default function SendMessageForm({ onEnviarMensaje }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm()

  const onSubmit = (data) => {
    onEnviarMensaje(data.mensaje)
    reset()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-4">
      <div>
        <label htmlFor="mensaje" className="block text-sm font-medium text-gray-700">
          Nuevo mensaje
        </label>
        <textarea
          id="mensaje"
          rows={4}
          {...register("mensaje", { required: "Este campo es requerido" })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-ford-blue focus:ring-ford-blue sm:text-sm"
        ></textarea>
        {errors.mensaje && <span className="text-red-500 text-sm">{errors.mensaje.message}</span>}
      </div>
      <button
        type="submit"
        className="inline-flex justify-center rounded-md border border-transparent bg-ford-blue py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-ford-blue-dark focus:outline-none focus:ring-2 focus:ring-ford-blue focus:ring-offset-2"
      >
        Enviar mensaje
      </button>
    </form>
  )
}

