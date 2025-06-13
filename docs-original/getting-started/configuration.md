# ⚙️ 配置指南

详细的环境配置和高级设置选项。

## 🌐 环境变量

### 必需配置
| 变量名 | 描述 | 示例 |
|--------|------|------|
| `TAIGA_API_URL` | Taiga API 端点 | `https://api.taiga.io/api/v1` |
| `TAIGA_USERNAME` | Taiga 用户名 | `myusername` |
| `TAIGA_PASSWORD` | Taiga 密码 | `mypassword` |

### 可选配置
| 变量名 | 描述 | 默认值 |
|--------|------|--------|
| `DEBUG` | 调试模式 | `false` |
| `LOG_LEVEL` | 日志级别 | `info` |
| `TIMEOUT` | 请求超时(ms) | `30000` |

## 🏢 企业配置

### 自建 Taiga 实例
```json
{
  "env": {
    "TAIGA_API_URL": "https://your-taiga-domain.com/api/v1",
    "TAIGA_USERNAME": "your_username",
    "TAIGA_PASSWORD": "your_password"
  }
}
```

### API Token 认证
```json
{
  "env": {
    "TAIGA_API_URL": "https://api.taiga.io/api/v1",
    "TAIGA_TOKEN": "your_api_token"
  }
}
```

## 🔐 安全配置

### 环境文件保护
```bash
# 确保 .env 文件权限
chmod 600 .env

# 添加到 .gitignore
echo ".env" >> .gitignore
```

### 双因素认证
对于启用2FA的账户，建议使用应用专用密码。

## 📊 性能调优

### 连接池配置
```env
MAX_CONNECTIONS=10
POOL_TIMEOUT=5000
RETRY_ATTEMPTS=3
```

### 缓存设置
```env
ENABLE_CACHE=true
CACHE_TTL=300
CACHE_SIZE=100
```

## 🚨 监控配置

### 日志配置
```env
LOG_LEVEL=info
LOG_FILE=/var/log/taiga-mcp.log
LOG_ROTATION=daily
```

### 健康检查
```env
HEALTH_CHECK_INTERVAL=60000
HEALTH_CHECK_TIMEOUT=5000
```

---

**下一步**: [第一步使用](first-steps.md)