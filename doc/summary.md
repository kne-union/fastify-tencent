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
