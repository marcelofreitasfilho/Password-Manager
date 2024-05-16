import { useState } from 'react';
import Titulo from './components/Titulo';
import Formulario from './components/Form';
import './App.css';

type Servico = {
  servico: string;
  login: string;
  senha: string;
  url: string;
}; // tipagem dos servicos

function App() {
  // ----------------- estados ---------------------------------------
  const [form, setForm] = useState(false); /* estado para renderização condicional */
  const [servicos, setServicos] = useState<Array<Servico>>([]); // estado para renderização dos serviços em array

  // -------------------- funcoes ----------------------------
  const handleRegistro = (servico: Servico) => {
    setServicos([...servicos, servico]);
    setForm(false);
  };

  const tiraServ = (servico: Servico) => {
    const myServ = servicos
      .filter((ServRemov) => servico.servico !== ServRemov.servico); // funcao que percorre o array de servicos
    setServicos(myServ);
  };

  return (
    <div>
      Hello World
      <Titulo />
      {form
        ? <Formulario
            setForm={ setForm } /* seta from p false e vem direto do form */
            handleRegistro={ (servico) => handleRegistro(servico) }
        />
        : <button onClick={ () => setForm(true) }>Cadastrar nova senha</button>}
      { /* seta from p true e vem do app */ }
      <ul>
        {servicos.length <= 0 && <li>nenhuma senha cadastrada</li>}
        {servicos.length > 0 && servicos.map((serv) => {
          return (
            <li key={ serv.servico }>
              <button
                onClick={ () => tiraServ(serv) }
                data-testid="remove-btn"
              >
                Remover serviço
              </button>
              <a href={ serv.url }>{ serv.servico }</a>
              <p>{ serv.login }</p>
              <p>{ serv.senha}</p>
            </li>
          );
        })}
        { /* se servicoss tiver algum servico cadastrado, itera e renderiza, se não tiver renderiza msg  */ }
      </ul>
    </div>
  );
}

export default App;
