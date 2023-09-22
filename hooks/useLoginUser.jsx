import {useState} from 'react'
import axios from 'axios';
import constants from '../global/env';

const useLoginUser = () => {
    const [loginResponse, setResponse] = useState(null);

    const loginUser = (data, language) => {
        axios.post(`${constants.base_url}/users/v1/login`, data, {
            headers: {
                'Accept-Language': language
            }
        }).then((result) => {
            setResponse(result.data)
        }).catch((error) => {
            setResponse(null)
        })
    }

    return [loginResponse, loginUser]
}

export default useLoginUser