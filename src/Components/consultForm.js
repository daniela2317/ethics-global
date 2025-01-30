import { useForm } from "react-hook-form";

export default function ConsultForm({ onConsulta }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = (data) => {
    onConsulta(data.folio)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="folio" className="block text-sm font-medium text-gray-700">
          Folio de la denuncia
        </label>
        <input
          type="text"
          id="folio"
          {...register("folio", { required: "Este campo es requerido" })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-ford-blue focus:ring-ford-blue sm:text-sm"
        />
        {errors.folio && <span className="text-red-500 text-sm">{errors.folio.message}</span>}
      </div>
      <button
        type="submit"
        className="inline-flex justify-center rounded-md border border-transparent bg-ford-blue py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-ford-blue-dark focus:outline-none focus:ring-2 focus:ring-ford-blue focus:ring-offset-2"
      >
        Consultar
      </button>
    </form>
  )
}

