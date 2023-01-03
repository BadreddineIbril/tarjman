import axios from 'axios'

const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
    'X-RapidAPI-Host': 'google-translate1.p.rapidapi.com'
  }
};

export const fetchFromApi = async (url)=>{
    const {data} = await axios.get(url, options);

    return data;
}   

