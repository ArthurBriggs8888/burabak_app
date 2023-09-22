import {useState} from 'react'
import axios from 'axios';
import constants from '../global/env';

const useSendContactRequest = () => {
    const [response, setResponse] = useState(null);

    const sendContactRequest = (name, phone, email, message, language) => {
        axios.post(`${constants.base_url}/supports/v1/register`, { 
            "name": name,
            "phone": phone,
            "email": email,
            "message": message
        }, {
            headers: {
                'Accept-Language': language
            }
        }).then((result) => {
            setResponse(result.data)
        }).catch((error) => {
            setResponse(null)
        })
    }

    return [response, sendContactRequest]
}

export default useSendContactRequest