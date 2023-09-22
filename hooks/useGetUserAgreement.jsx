import {useState} from 'react'
import axios from 'axios';
import constants from '../global/env';

const useGetUserAgreement = () => {
    const [agreement, setAgreement] = useState(``);

    const getUserAgreement = (language) => {
        axios.get(`${constants.base_url}/infos/v1/agreement`, {
            headers: {
                'Accept-Language': language
            }
        }).then((result) => {
            setAgreement(`${result.data.info.description}`)
        }).catch((error) => {
            setAgreement([])
        })
    }

    return [agreement, getUserAgreement]
}

export default useGetUserAgreement