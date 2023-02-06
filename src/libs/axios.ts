import axios from 'axios'

const apiZipCode = axios.create({
  baseURL: 'https://viacep.com.br/ws',
})

const apiStates = axios.create({
  baseURL: 'https://servicodados.ibge.gov.br/api/v1/localidades/',
})

export { apiZipCode, apiStates }
