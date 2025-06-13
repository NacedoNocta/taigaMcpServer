# 🛠️ 安装指南

快速安装和配置 Taiga MCP Server。

## 📋 系统要求

- **Node.js** v14+ - [下载地址](https://nodejs.org)
- **Taiga 账户** - 拥有 API 访问权限

## 🚀 安装方法

### 方法 1: NPX (推荐)
```bash
# 官方 NPM Registry
npx taiga-mcp-server

# GitHub Package Registry
npx @greddy7574/taiga-mcp-server
```

### 方法 2: 全局安装
```bash
npm install -g taiga-mcp-server
taiga-mcp
```

### 方法 3: 本地开发
```bash
git clone https://github.com/greddy7574/taigaMcpServer.git
cd taigaMcpServer
npm install
npm start
```

## ⚙️ 环境配置

创建 `.env` 文件：
```env
TAIGA_API_URL=https://api.taiga.io/api/v1
TAIGA_USERNAME=your_username
TAIGA_PASSWORD=your_password
```

## 🔗 Claude Desktop 集成

配置文件路径：
- **Windows**: `%APPDATA%\Claude\config.json`
- **macOS**: `~/Library/Application Support/Claude/config.json`
- **Linux**: `~/.config/Claude/config.json`

配置内容：
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

## ✅ 验证安装

在 Claude Desktop 中输入：
```
请列出我的 Taiga 项目
```

## 🔧 故障排除

### NPM Token 认证失败
检查用户名和密码是否正确

### 连接超时
验证网络连接和防火墙设置

### 权限错误
```bash
npm cache clean --force
npm install -g taiga-mcp-server
```

---

**下一步**: [配置说明](configuration.md)