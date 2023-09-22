import {useState} from 'react'
import axios from 'axios';
import constants from '../global/env';

const useCheckCode = () => {
    const [checkResponse, setResponse] = useState(null);

    const checkCode = (phone, code, language) => {
        return new Promise((resolve, reject) => {
            axios.post(`${constants.base_url}/users/v1/check/code`, { phone: phone, code: code }, {
                headers: {
                    'Accept-Language': language
                }
            }).then((result) => {
                resolve(result.data)
                setResponse(result.data)
            }).catch((error) => {
                reject(null);
                setResponse(null)
            })
        })
    }

    return [checkResponse, checkCode]
}

export default useCheckCode