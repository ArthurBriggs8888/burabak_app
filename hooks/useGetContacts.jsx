import {useState} from 'react'
import axios from 'axios';
import constants from '../global/env';

const useGetContacts = () => {
    const [contacts, setContacts] = useState([]);

    const getContacts = (language) => {
        axios.get(`${constants.base_url}/contacts/v1/active`, {
            headers: {
                'Accept-Language': language
            }
        }).then((result) => {
            setContacts(result.data.contacts)
        }).catch((error) => {
            setContacts([])
        })
    }

    return [contacts, getContacts]
}

export default useGetContacts