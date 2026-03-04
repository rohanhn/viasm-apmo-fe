import axios from 'axios';

const serviceNoiboClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_NOIBO,
});

serviceNoiboClient.interceptors.request.use(
  (config: any) => {
    const customHeaders: any = {};
    return {
      ...config,
      headers: {
        ...customHeaders, // auto attach token
        ...config.headers, // but you can override for some requests
      },
    };
  },
  (error: any) => {
    return Promise.reject(error);
  }
);

export default serviceNoiboClient;
