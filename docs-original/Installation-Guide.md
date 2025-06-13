# 🛠️ 安装指南

快速安装和配置 Taiga MCP Server。

## 📋 系统要求

### 必需环境
- **Node.js** v14+ - [下载地址](https://nodejs.org)
- **Taiga 账户** - 拥有 API 访问权限

### 支持平台
- ✅ Windows 10/11
- ✅ macOS 10.14+
- ✅ Linux (Ubuntu 18.04+)

## 🚀 安装方法

### 方法 1: NPX (推荐)
无需安装，自动使用最新版本：

```bash
# 官方 NPM Registry
npx taiga-mcp-server

# GitHub Package Registry (备选)
npx @greddy7574/taiga-mcp-server
```

**优势**:
- 🔄 自动获取最新版本
- 💾 无需本地存储空间
- ⚡ 即用即走

### 方法 2: 全局安装

```bash
# 从 NPM Registry 安装
npm install -g taiga-mcp-server
taiga-mcp

# 从 GitHub Packages 安装
npm config set @greddy7574:registry https://npm.pkg.github.com
npm install -g @greddy7574/taiga-mcp-server
```

**优势**:
- 🚀 更快的启动速度
- 📱 可离线使用
- 🔧 自定义配置

### 方法 3: 本地开发安装

```bash
# 克隆仓库
git clone https://github.com/greddy7574/taigaMcpServer.git
cd taigaMcpServer

# 安装依赖
npm install

# 运行测试
npm test

# 启动服务器
npm start
```

## ⚙️ 环境配置

### 创建 .env 文件

在项目根目录创建 `.env` 文件：

```env
# Taiga API 配置
TAIGA_API_URL=https://api.taiga.io/api/v1
TAIGA_USERNAME=your_username
TAIGA_PASSWORD=your_password

# 可选配置
DEBUG=false
LOG_LEVEL=info
```

### 环境变量说明

| 变量名 | 必需 | 描述 | 示例 |
|--------|------|------|------|
| `TAIGA_API_URL` | ✅ | Taiga API 端点 | `https://api.taiga.io/api/v1` |
| `TAIGA_USERNAME` | ✅ | Taiga 用户名 | `myusername` |
| `TAIGA_PASSWORD` | ✅ | Taiga 密码 | `mypassword` |
| `DEBUG` | ❌ | 调试模式 | `true/false` |
| `LOG_LEVEL` | ❌ | 日志级别 | `error/warn/info/debug` |

## 🔗 Claude Desktop 集成

### 配置 Claude Desktop

1. **找到配置文件**:
   - **Windows**: `%APPDATA%\Claude\config.json`
   - **macOS**: `~/Library/Application Support/Claude/config.json`
   - **Linux**: `~/.config/Claude/config.json`

2. **添加 MCP 服务器配置**:

```json
{
  "mcpServers": {
    "taiga-mcp": {
      "command": "npx",
      "args": ["taiga-mcp-server"],
      "env": {
        "TAIGA_API_URL": "https://api.taiga.io/api/v1",
        "TAIGA_USERNAME": "your_username",
        "TAIGA_PASSWORD": "your_password"
      }
    }
  }
}
```

3. **重启 Claude Desktop**

### 验证安装

在 Claude Desktop 中输入：
```
请列出我的 Taiga 项目
```

如果看到项目列表，说明配置成功！

## 🏢 自建 Taiga 实例

对于自托管的 Taiga 实例：

```json
{
  "mcpServers": {
    "taiga-mcp": {
      "command": "npx",
      "args": ["taiga-mcp-server"],
      "env": {
        "TAIGA_API_URL": "https://your-taiga-domain.com/api/v1",
        "TAIGA_USERNAME": "your_username",
        "TAIGA_PASSWORD": "your_password"
      }
    }
  }
}
```

## 🔐 认证配置

### API Token 方式 (推荐)
如果您有 Taiga API Token：

```json
{
  "env": {
    "TAIGA_API_URL": "https://api.taiga.io/api/v1",
    "TAIGA_TOKEN": "your_api_token"
  }
}
```

### 双因素认证
如果启用了 2FA，建议使用应用专用密码。

## ✅ 安装验证

### 基础验证
```bash
# 检查版本
npx taiga-mcp-server --version

# 运行健康检查
npx taiga-mcp-server --health
```

### 功能验证
```bash
# 运行测试套件
npm test

# 运行快速测试
npm run test:quick
```

## 🔧 故障排除

### 常见问题

#### 1. "命令未找到"
**问题**: `npx: command not found`  
**解决**: 安装或更新 Node.js

#### 2. "认证失败"
**问题**: `Authentication failed`  
**解决**: 
- 检查用户名和密码
- 验证 API URL 正确性
- 确认账户有 API 访问权限

#### 3. "连接超时"
**问题**: `Connection timeout`  
**解决**:
- 检查网络连接
- 验证防火墙设置
- 尝试使用 VPN

#### 4. "权限错误"
**问题**: `Permission denied`  
**解决**:
```bash
# 清理 npm 缓存
npm cache clean --force

# 重新安装
npm install -g taiga-mcp-server
```

### 调试模式

启用详细日志：

```bash
DEBUG=true npx taiga-mcp-server
```

### 获取帮助

如果遇到问题：

1. 查看 [[FAQ]] 页面
2. 搜索 [GitHub Issues](https://github.com/greddy7574/taigaMcpServer/issues)
3. 创建新的 Issue 报告问题

## 🎯 下一步

安装完成后，建议：

1. 📖 阅读 [[First Steps|第一步使用]]
2. 🔍 浏览 [[API Reference|API 参考]]
3. ⚙️ 查看 [[Configuration|高级配置]]

---

**💡 提示**: 定期运行 `npx taiga-mcp-server` 以确保使用最新版本！