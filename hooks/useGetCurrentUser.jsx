import {useState} from 'react'
import axios from 'axios';
import constants from '../global/env';

const useGetCurrentUser = () => {
    const [currentUserResponse, setResponse] = useState(null);

    const currentUser = (token, language) => {
        axios.get(`${constants.base_url}/users/v1/current`, {
            headers: {
                'Accept-Language': language,
                'Authorization': token
            }
        }).then((result) => {
            setResponse(result.data)
        }).catch((error) => {
            setResponse(null)
        })
    }

    return [currentUserResponse, currentUser]
}

export default useGetCurrentUser