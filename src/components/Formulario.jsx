import {useState, useEffect} from 'react'
import Error from './Error'

const Formulario = ({pacientes, setPacientes, paciente, setPaciente}) => {

  const [mascota, setMascota] = useState('')
  const [propietario, setPropietario] = useState('')
  const [email, setEmail] = useState('')
  const [alta, setAlta] = useState('')
  const [sintomas, setSintomas] = useState('')

  const [error, setError] = useState(false);

  useEffect(() => {
    if (Object.keys(paciente).length > 0) {
      setMascota(paciente.mascota);
      setPropietario(paciente.propietario);
      setEmail(paciente.email);
      setAlta(paciente.alta),
      setSintomas(paciente.sintomas);
    }
  }, [paciente]);

  const generarId = () => {
    const random = Math.random().toString(36).substring(2);
    const fecha = Date.now().toString(36);
    return random + fecha;
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Validación del Formulario
    if ([mascota, propietario, email, alta, sintomas].includes('')) {
      setError(true)
      return
    }

    setError(false)

    // Objeto de paciente
    const objetoPaciente = {
      mascota,
      propietario,
      email,
      alta,
      sintomas
    }

    if (paciente.id) {
      // Editar paciente
      objetoPaciente.id = paciente.id
      const pacientesActualizados = pacientes.map(pacienteState => pacienteState.id === paciente.id ? objetoPaciente : pacienteState)
      setPacientes(pacientesActualizados)
      setPaciente({})
    } else {
      // Agregar nuevo paciente
      objetoPaciente.id = generarId()
      setPacientes([...pacientes, objetoPaciente])
    }

    

    // Reiniciar el formulario
    setMascota('')
    setPropietario('')
    setEmail('')
    setAlta('')
    setSintomas('')
  }

  return (
    <div className="md:w-1/2 lg:w-2/5 mx-5">
      <h2 className="font-black text-3xl text-center">Seguimiento Pacientes</h2>

      <p className="text-lg mt-5 text-center mb-10">
        Añade Pacientes y {""}
        <span className="text-indigo-600 font-bold">Administralos</span>
      </p>

      <form 
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg py-10 px-5 mb-10"
      >
        {error && 
          <Error>
            <p>Todos los campos son obligatorios</p>
          </Error>}
        <div className="mb-5">
          <label
            className="block text-gray-700 uppercase font-bold"
            htmlFor="mascota"
          >Nombre Mascota</label>
          <input
            id="mascota"
            type="text"
            placeholder="Nombre de la mascota"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={mascota}
            onChange={(e) => setMascota(e.target.value)}
          />
        </div>

        <div className="mb-5">
          <label
            className="block text-gray-700 uppercase font-bold"
            htmlFor="propietario"
          >Nombre Propietario</label>
          <input
            id="propietario"
            type="text"
            placeholder="Nombre del propietario"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={propietario}
            onChange={(e) => setPropietario(e.target.value)}
          />
        </div>

        <div className="mb-5">
          <label
            className="block text-gray-700 uppercase font-bold"
            htmlFor="email"
          >Email</label>
          <input
            id="email"
            type="email"
            placeholder="Email de contacto del propietario"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-5">
          <label
            className="block text-gray-700 uppercase font-bold"
            htmlFor="alta"
          >Alta</label>
          <input
            id="alta"
            type="date"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={alta}
            onChange={(e) => setAlta(e.target.value)}
          />
        </div>

        <div className="mb-5">
          <label
            className="block text-gray-700 uppercase font-bold"
            htmlFor="sintomas"
          >Síntomas</label>
          <textarea 
            id="sintomas"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            placeholder="Describe los síntomas"
            value={sintomas}
            onChange={(e) => setSintomas(e.target.value)}
          />
        </div>

        <input 
          type="submit"
          className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors"
          value={ paciente.id ? "Editar" : "Agregar Paciente"}
        />
      </form>
    </div>
  )
}

export default Formulario
