import {useState} from 'react'
import axios from 'axios';
import constants from '../global/env';

const useGetPrivacy = () => {
    const [privacy, setPrivacy] = useState(``);

    const getPrivacy = (language) => {
        axios.get(`${constants.base_url}/infos/v1/privacy`, {
            headers: {
                'Accept-Language': language
            }
        }).then((result) => {
            setPrivacy(`${result.data.info.description}`)
        }).catch((error) => {
            setPrivacy([])
        })
    }

    return [privacy, getPrivacy]
}

export default useGetPrivacy