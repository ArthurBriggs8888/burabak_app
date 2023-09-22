import {useState} from 'react'
import axios from 'axios';
import constants from '../global/env';

const useCheckUser = () => {
    const [checkResponse, setResponse] = useState(null);

    const checkUser = (email, phone, language) => {
        axios.post(`${constants.base_url}/users/v1/check`, { phone: phone }, {
            headers: {
                'Accept-Language': language
            }
        }).then((result) => {
            console.log(result.data);
            setResponse(result.data)
        }).catch((error) => {
            setResponse(null)
        })
    }

    return [checkResponse, checkUser]
}

export default useCheckUser