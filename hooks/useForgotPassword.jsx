import {useState} from 'react'
import axios from 'axios';
import constants from '../global/env';

const useForgotPassword = () => {
    const [forgotResponse, setResponse] = useState(null);

    const forgotPassword = (data, language) => {
        axios.post(`${constants.base_url}/users/v1/restore/password`, data, {
            headers: {
                'Accept-Language': language
            }
        }).then((result) => {
            setResponse(result.data)
        }).catch((error) => {
            setResponse(null)
        })
    }

    return [forgotResponse, forgotPassword]
}

export default useForgotPassword