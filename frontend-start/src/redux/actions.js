import axios from "axios";

const configuracoes = {
  baseURL: "http://localhost:5000/api"
};

const json = localStorage.getItem("usuario");
if (json) {
  const usuario = JSON.parse(json);
  configuracoes.headers = {
    "x-access-token": usuario.token
  };
}

const api = axios.create(configuracoes);

export function logaUsuario(dados) {
  return dispatch => {
    const json = {
      email: dados.email,
      password: dados.senha
    };
    api
      .post("/login", json)
      .then(response => {
        api.defaults.headers.common["x-access-token"] = response.data.token;
        dispatch({ type: "LOGA_USUARIO", dados: response.data });
      })
      .catch(error => {
        console.error(error);
        // if (error.response) {
        //   alert(error.response.data.erro)
        // }
        alert("Email ou usuário invalido!");
      });
  };
}

export function deslogaUsuario() {
  return {
    type: "DESLOGA_USUARIO"
  };
}

export function cadastraPostit(dados) {
  return dispatch => {
    const json = {
      title: dados.titulo,
      description: dados.texto
    };
    api.post("/postits", json).then(response => {
      dados.id = response.data.id;
      dispatch({ type: "CADASTRA_POSTIT", dados });
    });
  };
}

export function alteraPostit(dados) {
  return dispatch => {
    const url = `/postits/${dados.id}`;
    const json = {
      title: dados.titulo,
      description: dados.texto
    };
    api.put(url, json).then(() => {
      dispatch({ type: "ALTERA_POSTIT", dados });
    });
  };
}

export function removePostit(id) {
  return dispatch => {
    const url = `/postits/${id}`;
    api.delete(url).then(() => {
      dispatch({ type: "REMOVE_POSTIT", id });
    });
  };
}

export function listaPostits() {
  return dispatch => {
    api.get("/postits").then(response => {
      const dados = response.data.map(item => ({
        //quer modificar a lista que foi recebida
        id: item.id,
        titulo: item.title,
        texto: item.description
      }));
      dispatch({ type: "LISTA_POSTITS", dados });
    });
  };
}

export function alteraFiltro(texto) {
  return {
    type: "ALTERA_FILTRO",
    texto
  };
}
