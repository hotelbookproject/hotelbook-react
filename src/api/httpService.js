import { create } from "apisauce";
import settings from "../config/settings";
import jwtDecode from "jwt-decode";
const tokenKey="token"

const apiClient = create({
  baseURL: settings.apiUrl,
});

apiClient.addAsyncRequestTransform(async (request) => {
    try {
        const authtoken = localStorage.getItem(tokenKey);
        if(jwtDecode(authtoken)){
            request.headers["x-auth-token"] = authtoken;
        }
      } catch (ex) {
          return null
      }
});

// const get = apiClient.get;
// apiClient.get = async (url, params, axiosConfig) => {
//   const response = await get(url, params, axiosConfig);

//   if (response.ok) {
//     cache.store(url, response.data);
//     return response;
//   }

//   const data = await cache.get(url);
//   return data ? { ok: true, data } : response;
// };
 
export default apiClient;
