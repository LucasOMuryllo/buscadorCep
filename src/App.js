import { useState } from 'react';
import { FiSearch } from 'react-icons/fi'
import './styles.css';
import api from './services/api';

function App() {

  const [input, setInput] = useState('')
  const [cep, setCep] = useState({})
  const [error, setError] = useState('')

  async function handleSearch() {
    if (input === '') {
      setError('Preencha algum CEP Válido')
    }

    try {
      const response = await api.get(`${input}/json`)
      setCep(response.data)
      setInput('')
      setError('')
    } catch (e) {
      setError('Ops, ocorreu um erro ao buscar o CEP')
      setInput('')
    }
  }

  function handleInputChange(event) {
    const { value } = event.target
    setInput(value.slice(0, 10))
    setError('')
  }
  return (
    <div className="container">
      <h1 className="title">Buscador CEP</h1>
      <div className="containerInput">
        <input
          type="number" pattern="[0-9]"
          placeholder="Digite seu CEP"
          value={input}
          onChange={handleInputChange}
          maxLength={10}
        />

        <button className="buttonSearch" onClick={handleSearch}>
          <FiSearch size={25} color='#fff' />
        </button>
      </div>

      {error && <p className='error'>{error}</p>}

      {Object.keys(cep).length > 0 && (
        <main className='main'>
          <h2>CEP: {cep.cep}</h2>
          <span>{cep.logradouro}</span>
          <span>Bairro: {cep.bairro}</span>
          <span>Complemento: {cep.complemento}</span>
          <span>{cep.localidade} - {cep.uf}</span>
        </main>

      )}
    </div>
  );
}

export default App;
