import axios from 'axios';

// Tạo một instance axios cơ bản với cấu hình mặc định
const axiosInstance = axios.create({
  baseURL: 'http://localhost:8081/api',
  timeout: 10000,
});

// Hàm để lấy và cập nhật token cho mọi request
function updateAxiosToken() {
  const token = localStorage.getItem('token');
  if (token) {
    axiosInstance.defaults.headers.common['token'] = token;
  } else {
    delete axiosInstance.defaults.headers.common['token'];
  }
}

// Cài đặt interceptor để xử lý response và lỗi
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response &&
      error.response.status === 401 &&
      window.location.pathname !== '/login'
    ) {
      localStorage.removeItem('token');
      window.location.pathname = '/login';
    }
    return Promise.reject(error);
  }
);

// Hàm xuất khẩu, cập nhật token trước khi trả về instance
const axiosCustom = () => {
  updateAxiosToken();
  return axiosInstance;
};

export default axiosCustom;

// const axiosCustom = () => {
//   return axios
//     .create({
//       baseURL: 'http://localhost:8081/api',
//       timeout: 10000,
//       headers: { token: localStorage.getItem('token') },
//     })
//     .interceptors.response.use(
//       (response) => response,
//       (error) => {
//         if (error.response && error.response.status === 401) {
//           localStorage.removeItem('token');
//           window.location.pathname = '/login';
//         }
//         return Promise.reject(error);
//       }
//     );
// };

// export default axiosCustom;
