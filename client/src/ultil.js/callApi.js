import axios from 'axios';
import { URL } from '../constants/ApiUrl';

const callApi = async (endpoint, method = "get", data) => {
    return (
        await axios({
            method: method,
            url: `${URL}/${endpoint}`,
            data: data
        }).catch((err) => {
            console.log(err)
        })
    )


}

export default callApi