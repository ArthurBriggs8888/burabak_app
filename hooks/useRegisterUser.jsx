import {useState} from 'react'
import axios from 'axios';
import constants from '../global/env';

const useRegisterUser = () => {
    const [response, setResponse] = useState(null);

    const registerUser = (data, language) => {
        axios.post(`${constants.base_url}/users/v1/register`, data, {
            headers: {
                'Accept-Language': language
            }
        }).then((result) => {
            console.log(result.data)
            setResponse(result.data)
        }).catch((error) => {
            setResponse(null)
        })
    }

    return [response, registerUser]
}

export default useRegisterUser