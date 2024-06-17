import * as Minio from 'minio';

const minioClient = new Minio.Client({
  endPoint: process.env.REACT_APP_MIO_END_POINT,
  port: Number(process.env.REACT_APP_MIO_PORT),
  useSSL: false,
  accessKey: process.env.REACT_APP_MIO_ACCESS_KEY,
  secretKey: process.env.REACT_APP_MIO_SECRET_KEY,
});

export default minioClient;
