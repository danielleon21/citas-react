import { useState, useEffect } from 'react'

// Components 
import Alerta from './Alerta'

const Formulario = ({ pacientes, setPacientes, paciente, setPaciente }) => {
    const [mascota, setMascota] = useState("")
    const [propietario, setPropietario] = useState("")
    const [email, setEmail] = useState("")
    const [alta, setAlta] = useState("")
    const [sintomas, setSintomas] = useState("")

    const [error, setError] = useState(false)

    /* A hook that is called when the component is mounted. It is checking if the paciente object has
    any keys. If it does, it is destructuring the object and setting the state of the component. */
    useEffect(() => {
        if (Object.keys(paciente).length > 0) {
            const { mascota, propietario, email, alta, sintomas } = paciente
            setMascota(mascota)
            setPropietario(propietario)
            setEmail(email)
            setAlta(alta)
            setSintomas(sintomas)
        }
    }, [paciente])


    /**
     * It generates a random string of characters and numbers, and then adds the current date and time
     * to the end of it.
     * @returns A function that returns a string.
     */
    const generarId = () => {
        const random = Math.random().toString(36).substring(2)
        const fecha = Date.now().toString(36)

        return random + fecha
    }


    const handleSubmit = e => {
        e.preventDefault()
        if ([mascota, propietario, email, alta, sintomas].includes('')) {
            setError(true)
            return
        }
        setError(false)

        //Objeto paciente 
        const objetoPaciente = {
            mascota,
            propietario,
            email,
            alta,
            sintomas,
        }

        if (paciente.id) {
            // Editando el registro
            objetoPaciente.id = paciente.id

            const pacientesActualizados = pacientes.map(pacienteState => pacienteState.id === paciente.id ? objetoPaciente : pacienteState)
            setPacientes(pacientesActualizados)
            setPaciente({})
        } else {
            objetoPaciente.id = generarId()
            setPacientes([...pacientes, objetoPaciente])
        }

        setMascota('')
        setPropietario('')
        setEmail('')
        setAlta('')
        setSintomas('')
    }


    return (
        <div className="md:w-1/2 lg:w-2/5">
            <h2 className="font-black text-3xl text-center">Seguimiento Pacientes</h2>
            <p className="text-lg mt-5 text-center mb-10">
                Añade Pacientes y {" "}
                <span className="text-indigo-600 font-bold">Administralos</span>
            </p>
            <form
                className="bg-white shadow-md rounded-lg py-10 px-5 mb-10 mx-3"
                onSubmit={handleSubmit}
            >
                {error && (
                    <Alerta>Todos los campos son obligatorios</Alerta>
                )}
                <div className="mb-5">
                    <label
                        htmlFor="mascota"
                        className="block text-gray-700 uppercase font-bold">
                        Nombre Mascota
                    </label>
                    <input
                        type="text"
                        placeholder="Nombre de la mascota"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        id="mascota"
                        onChange={e => setMascota(e.target.value)}
                        value={mascota}
                    />
                </div>
                <div className="mb-5">
                    <label
                        htmlFor="propietario"
                        className="block text-gray-700 uppercase font-bold">
                        Nombre Propietario
                    </label>
                    <input
                        type="text"
                        placeholder="Nombre del Propietario"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        id="propietario"
                        onChange={e => setPropietario(e.target.value)}
                        value={propietario}

                    />
                </div>
                <div className="mb-5">
                    <label
                        htmlFor="email"
                        className="block text-gray-700 uppercase font-bold">
                        Email
                    </label>
                    <input
                        type="email"
                        placeholder="Email contacto propietario"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        id="email"
                        onChange={e => setEmail(e.target.value)}
                        value={email}
                    />
                </div>
                <div className="mb-5">
                    <label
                        htmlFor="alta"
                        className="block text-gray-700 uppercase font-bold">
                        Fecha Alta
                    </label>
                    <input
                        type="date"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        id="alta"
                        onChange={e => setAlta(e.target.value)}
                        value={alta}
                    />
                </div>
                <div className="mb-5">
                    <label
                        htmlFor="sintomas"
                        className="block text-gray-700 uppercase font-bold">
                        Síntomas
                    </label>
                    <textarea
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        placeholder="Describe los síntomas"
                        id="sintomas"
                        onChange={e => setSintomas(e.target.value)}
                        value={sintomas}
                    />
                </div>
                <input
                    type="submit"
                    className="bg-indigo-600 hover:bg-indigo-700 w-full p-3 text-white uppercase font-bold cursor-pointer transition-all"
                    value={paciente.id ? 'Editar Paciente' : 'Agregar Paciente'}
                />
            </form>
        </div>
    );
}

export default Formulario;