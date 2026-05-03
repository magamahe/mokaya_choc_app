// Para desarrollo con el back y el front juntos (con proxy en package.json)
import axios from 'axios';

const clienteAxios = axios.create({
  baseURL: '/api'
});

export default clienteAxios;

/* //////////////////////////////////////////////////// */
// Solo para produccion cdo es por separado el back y el front

/* import axios from 'axios';

const clienteAxios = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL
});

export default clienteAxios; */
