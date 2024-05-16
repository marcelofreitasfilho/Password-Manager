import { Dispatch, useState, ChangeEvent } from 'react';

// --------------Tipos-----------------------------------------------------------
export type Servico = {
  servico: string;
  login: string;
  senha: string;
  url: string;
}; // tipagem do servico

type PropForm = {
  setForm: Dispatch<boolean>; // pega ação (no caso do botão) e verifica o booleano
  handleRegistro: (servico: Servico) => void; // parametro tipado e retorno "vazio"
};

function Formulario({ setForm, handleRegistro }: PropForm) {
  // ---------------Estados -----------------------------------------------------
  const [servico, setServico] = useState('');

  const [login, setLogin] = useState('');

  const [senha, setSenha] = useState('');
  const [validSenha, setValSenha] = useState(false);
  const [hidePW, setPW] = useState(false);

  const [url, setUrl] = useState('');

  // -------------------Funcoes-----------------------------------------
  const handleChangeSenha = (e: ChangeEvent<HTMLInputElement>) => { // pega o input digitado em senha (senha digitada) e joga para setSenha
    const senhaDigitada = e.target.value;
    setSenha(senhaDigitada);

    const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,16}$/; // const para verificação
    const validacao = regex.test(senhaDigitada);
    setValSenha(validacao); // seta o valor da validação (true/false) para setValSenha
  };

  const validaSenha = (validacao: boolean) => {
    return validacao ? 'valid-password-check' : 'invalid-password-check'; // validação da senha com a class da mensagem
  };

  // ------------------------------- form --------------------------------------------
  return (
    <form action="">

      { /* ----------------Servico-----------------  */ }
      <label htmlFor="nomeDoServico">Nome do Serviço</label>
      <input
        type="text"
        name=""
        id="nomeDoServico"
        value={ servico }
        onChange={ (e) => setServico(e.target.value) }
      />

      { /* ----------------login-----------------  */ }
      <label htmlFor="login">Login</label>
      <input
        type="text"
        name=""
        id="login"
        value={ login }
        onChange={ (e) => setLogin(e.target.value) }
      />

      { /* ----------------Senha-----------------  */ }
      <label htmlFor="senha">Senha</label>
      <input
        type="password"
        name=""
        id="senha"
        onChange={ handleChangeSenha }
        value={ senha }
      />
      <h6 className={ validaSenha(senha.length >= 8) }>
        Possuir 8 ou mais caracteres
      </h6>

      <h6 className={ validaSenha(senha.length <= 16) }>
        Possuir até 16 caracteres
      </h6>

      <h6 className={ validaSenha(/\d/.test(senha) && /[a-zA-Z]/.test(senha)) }>
        Possuir letras e números
      </h6>

      <h6 className={ validaSenha(/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/.test(senha)) }>
        Possuir algum caractere especial
      </h6>

      { /* ----------------URL-----------------  */ }
      <label htmlFor="url">URL</label>
      <input
        type="text"
        name=""
        id="url"
        onChange={ (e) => setUrl(e.target.value) }
      />

      { /* ----------------botoes-----------------  */ }
      <button
        type="submit"
        disabled={ !validSenha || !servico || !login } // verifica se todos campos são validos
        onClick={ () => handleRegistro({ servico, login, senha, url }) } // chama a funcao com parametros que vao ser renderizados no app
      >
        Cadastrar
      </button>

      <button onClick={ () => setForm(false) }>Cancelar</button>
      {/* botao que faz o form desmontar (seta form p false) */}
    </form>
  );
}

export default Formulario;
