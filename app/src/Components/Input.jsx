export const Input = ({ type, placeholder, name, onChange, required }) => {
    return (
        <input className='border-2 border-yellow-400 rounded-lg w-full p-2.5 text-center' type={type} placeholder={placeholder} onChange={ onChange } name={name} required={required}/>
    )
}
