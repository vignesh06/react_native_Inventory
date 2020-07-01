import axios from 'axios';
import { UrlConstant, localstorageConstants } from '../Constants/Constants';
const HTTPService = async (url, method, data) => {
  let response=await axios({
      method,
      url,
      data,
      headers: { 'Content-Type': 'application/json','Accept': "application/json"}
    }).then(function(response) {
    return response.data;
    })
    .catch(function(apiError) {
      alert(apiError);
    });
    return response;
};

export default HTTPService