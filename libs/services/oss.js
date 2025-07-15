
const fp = require('fastify-plugin');
const COS = require('cos-nodejs-sdk-v5');

module.exports = fp(async (fastify, options) => {
  const { services } = fastify.tencent;
  const createClient = () => {
    return new COS({
      SecretId: options.oss.accessKeyId,
      SecretKey: options.oss.accessKeySecret,
      Region: options.oss.region,
      Protocol: options.oss.secure ? 'https:' : 'http:'
    });
  };

  const uploadFile = async ({ file, filename }) => {
    const client = createClient();
    await new Promise((resolve, reject) => {
      client.putObject({
        Bucket: options.oss.bucket,
        Region: options.oss.region,
        Key: `${options.oss.baseDir}/${filename}`,
        Body: file
      }, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  };

  const uploadFileStream = async ({ stream, filename }) => {
    const client = createClient();
    await new Promise((resolve, reject) => {
      client.putObject({
        Bucket: options.oss.bucket,
        Region: options.oss.region,
        Key: `${options.oss.baseDir}/${filename}`,
        Body: stream
      }, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  };

  const downloadFile = async ({ filename }) => {
    const client = createClient();
    const result = await new Promise((resolve, reject) => {
      client.getObject({
        Bucket: options.oss.bucket,
        Region: options.oss.region,
        Key: `${options.oss.baseDir}/${filename}`
      }, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
    return result.Body;
  };

  const getFileStream = async ({ filename }) => {
    const client = createClient();
    return new Promise((resolve, reject) => {
      // 腾讯云 COS SDK 可以通过设置 Output 参数来实现流式下载
      // 创建一个可读流
      const stream = require('stream');
      const readableStream = new stream.PassThrough();
      
      client.getObject({
        Bucket: options.oss.bucket,
        Region: options.oss.region,
        Key: `${options.oss.baseDir}/${filename}`,
        Output: readableStream
      }, (err, data) => {
        if (err) {
          reject(err);
        } else {
          // 不需要在这里 resolve，因为数据会被写入到 readableStream
        }
      });
      
      resolve(readableStream);
    });
  };

  const getFileLink = ({ filename, expires }) => {
    const client = createClient();
    return new Promise((resolve, reject) => {
      client.getObjectUrl({
        Bucket: options.oss.bucket,
        Region: options.oss.region,
        Key: `${options.oss.baseDir}/${filename}`,
        Sign: true,
        Expires: expires || 3600
      }, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data.Url);
        }
      });
    });
  };

  services.oss = {
    createClient, uploadFile, uploadFileStream, getFileLink, downloadFile, getFileStream
  };
});
