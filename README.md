
# fastify-tencent


### 描述

对接腾讯云服务


### 安装

```shell
npm i --save @kne/fastify-tencent
```


### 概述

### 项目概述

fastify-tencent 是一个 Fastify 插件，用于对接腾讯云服务。目前，它提供了与腾讯云对象存储服务（COS）交互的 API。

### 功能特点

- 简化与腾讯云 COS 的交互
- 提供文件上传、下载、流式处理和链接生成功能
- 与 Fastify 框架无缝集成
- 使用 Promise 和异步/等待模式

### 安装

```bash
npm install @kne/fastify-tencent
```

### 依赖

- cos-nodejs-sdk-v5: 腾讯云 COS SDK
- lodash: 实用工具库

### 对等依赖

- @kne/fastify-namespace: Fastify 命名空间插件
- @kne/fastify-sequelize: Fastify Sequelize 插件
- fastify-plugin: Fastify 插件工具

### 使用方法

在 Fastify 应用程序中注册插件：

```javascript
const fastify = require('fastify')();
const fastifyTencent = require('@kne/fastify-tencent');

fastify.register(fastifyTencent, {
  oss: {
    accessKeyId: 'your-secret-id',
    accessKeySecret: 'your-secret-key',
    region: 'your-region',
    bucket: 'your-bucket',
    baseDir: 'your-base-dir',
    secure: true
  }
});

// 使用插件提供的 API
fastify.get('/example', async (request, reply) => {
  const fileUrl = await fastify.tencent.oss.getFileLink({
    filename: 'example.jpg',
    expires: 3600
  });
  
  return { fileUrl };
});
```

### 配置选项

腾讯云 COS 配置选项：

- `accessKeyId`: 腾讯云 SecretId
- `accessKeySecret`: 腾讯云 SecretKey
- `region`: 腾讯云 COS 区域
- `bucket`: 腾讯云 COS 存储桶名称
- `baseDir`: 文件存储的基础目录
- `secure`: 是否使用 HTTPS（布尔值）


### 示例

#### 示例代码



### API

### API 文档

本文档描述了 fastify-tencent 插件提供的 API。

### 对象存储服务 (OSS)

fastify-tencent 插件提供了与腾讯云对象存储服务（COS）交互的 API。所有 API 都可以通过 `fastify.tencent.oss` 命名空间访问。

#### 方法概览

| 方法名 | 描述 |
|-------|------|
| createClient | 创建一个 COS 客户端 |
| uploadFile | 上传文件 |
| uploadFileStream | 上传文件流 |
| downloadFile | 下载文件 |
| getFileStream | 获取文件流 |
| getFileLink | 获取文件链接（带签名的URL） |

#### 方法详情

##### createClient

创建一个腾讯云 COS 客户端。

**参数：**

| 参数名 | 类型 | 必填 | 描述 |
|-------|------|------|------|
| options | Object | 是 | 客户端配置选项 |
| options.accessKeyId | String | 是 | 腾讯云 SecretId |
| options.accessKeySecret | String | 是 | 腾讯云 SecretKey |
| options.region | String | 是 | 腾讯云 COS 区域 |
| options.bucket | String | 是 | 腾讯云 COS 存储桶名称 |
| options.baseDir | String | 否 | 文件存储的基础目录 |
| options.secure | Boolean | 否 | 是否使用 HTTPS |

**返回值：**

返回一个腾讯云 COS 客户端实例。

**示例：**

```javascript
const client = fastify.tencent.oss.createClient({
  accessKeyId: 'your-secret-id',
  accessKeySecret: 'your-secret-key',
  region: 'ap-guangzhou',
  bucket: 'your-bucket',
  baseDir: 'uploads',
  secure: true
});
```

##### uploadFile

上传文件到腾讯云 COS。

**参数：**

| 参数名 | 类型 | 必填 | 描述 |
|-------|------|------|------|
| options | Object | 是 | 上传选项 |
| options.filename | String | 是 | 文件名 |
| options.filepath | String | 是 | 本地文件路径 |
| options.mime | String | 否 | 文件的 MIME 类型 |
| options.client | Object | 否 | COS 客户端实例，如果未提供，将使用默认客户端 |

**返回值：**

返回一个 Promise，解析为上传结果。

**示例：**

```javascript
const result = await fastify.tencent.oss.uploadFile({
  filename: 'example.jpg',
  filepath: '/path/to/local/file.jpg',
  mime: 'image/jpeg'
});
```

##### uploadFileStream

上传文件流到腾讯云 COS。

**参数：**

| 参数名 | 类型 | 必填 | 描述 |
|-------|------|------|------|
| options | Object | 是 | 上传选项 |
| options.filename | String | 是 | 文件名 |
| options.stream | Stream | 是 | 可读流 |
| options.mime | String | 否 | 文件的 MIME 类型 |
| options.client | Object | 否 | COS 客户端实例，如果未提供，将使用默认客户端 |

**返回值：**

返回一个 Promise，解析为上传结果。

**示例：**

```javascript
const fs = require('fs');
const stream = fs.createReadStream('/path/to/local/file.jpg');

const result = await fastify.tencent.oss.uploadFileStream({
  filename: 'example.jpg',
  stream: stream,
  mime: 'image/jpeg'
});
```

##### downloadFile

从腾讯云 COS 下载文件。

**参数：**

| 参数名 | 类型 | 必填 | 描述 |
|-------|------|------|------|
| options | Object | 是 | 下载选项 |
| options.filename | String | 是 | 文件名 |
| options.client | Object | 否 | COS 客户端实例，如果未提供，将使用默认客户端 |

**返回值：**

返回一个 Promise，解析为文件内容的 Buffer。

**示例：**

```javascript
const fileContent = await fastify.tencent.oss.downloadFile({
  filename: 'example.jpg'
});

// 将文件内容写入本地文件
const fs = require('fs');
fs.writeFileSync('/path/to/local/file.jpg', fileContent);
```

##### getFileStream

获取腾讯云 COS 文件的可读流。

**参数：**

| 参数名 | 类型 | 必填 | 描述 |
|-------|------|------|------|
| options | Object | 是 | 选项 |
| options.filename | String | 是 | 文件名 |
| options.client | Object | 否 | COS 客户端实例，如果未提供，将使用默认客户端 |

**返回值：**

返回一个可读流。

**示例：**

```javascript
const stream = fastify.tencent.oss.getFileStream({
  filename: 'example.jpg'
});

// 将流传输到响应
stream.pipe(reply.raw);
```

##### getFileLink

获取腾讯云 COS 文件的带签名的 URL。

**参数：**

| 参数名 | 类型 | 必填 | 描述 |
|-------|------|------|------|
| options | Object | 是 | 选项 |
| options.filename | String | 是 | 文件名 |
| options.expires | Number | 否 | URL 的过期时间（秒），默认为 3600 |
| options.client | Object | 否 | COS 客户端实例，如果未提供，将使用默认客户端 |

**返回值：**

返回一个 Promise，解析为带签名的 URL 字符串。

**示例：**

```javascript
const url = await fastify.tencent.oss.getFileLink({
  filename: 'example.jpg',
  expires: 7200 // 2小时
});

console.log(url); // https://your-bucket.cos.ap-guangzhou.myqcloud.com/your-base-dir/example.jpg?sign=...
```

### 错误处理

所有返回 Promise 的方法都可能抛出错误。建议使用 try/catch 块或 Promise 的 catch 方法来处理可能的错误。

```javascript
try {
  const url = await fastify.tencent.oss.getFileLink({
    filename: 'example.jpg'
  });
  console.log(url);
} catch (error) {
  console.error('获取文件链接失败:', error);
}
```

或者：

```javascript
fastify.tencent.oss.getFileLink({
  filename: 'example.jpg'
})
  .then(url => {
    console.log(url);
  })
  .catch(error => {
    console.error('获取文件链接失败:', error);
  });
```

