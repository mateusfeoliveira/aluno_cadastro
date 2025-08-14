import axios from 'axios';

//  BaseURL: Endereço base do backend (porta 3000, rota /api).
export default axios.create({
  baseURL: 'http://localhost:3000/api' 
});