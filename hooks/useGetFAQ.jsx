import {useState} from 'react'
import axios from 'axios';
import constants from '../global/env';

const useGetFAQ = () => {
    const [FAQ, setFAQ] = useState(``);

    const getFAQ = (language) => {
        axios.get(`${constants.base_url}/infos/v1/faq`, {
            headers: {
                'Accept-Language': language
            }
        }).then((result) => {
            setFAQ(`${result.data.info.description}`)
        }).catch((error) => {
            setFAQ([])
        })
    }

    return [FAQ, getFAQ]
}

export default useGetFAQ