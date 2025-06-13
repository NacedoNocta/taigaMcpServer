# 🚀 Taiga MCP Server

**完整的 Taiga 项目管理 MCP 服务器，支持 Sprint 管理、Issue 追踪和自动化发布**

[![NPM Version](https://img.shields.io/npm/v/taiga-mcp-server)](https://www.npmjs.com/package/taiga-mcp-server)
[![GitHub Release](https://img.shields.io/github/v/release/greddy7574/taigaMcpServer)](https://github.com/greddy7574/taigaMcpServer/releases)
[![CI/CD Status](https://img.shields.io/github/actions/workflow/status/greddy7574/taigaMcpServer/publish.yml)](https://github.com/greddy7574/taigaMcpServer/actions)

## ⚡ 快速开始

### 立即使用
```bash
# NPM Registry (推荐)
npx taiga-mcp-server

# GitHub Package Registry
npx @greddy7574/taiga-mcp-server
```

### Claude Desktop 集成
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

## 📚 核心文档

### 🎯 用户指南
- **[[Installation Guide|安装指南]]** - 详细的安装和配置步骤
- **[[Configuration|配置说明]]** - 环境变量和 Claude Desktop 设置
- **[[Usage Examples|使用示例]]** - 实际使用场景和命令示例

### 🛠️ 技术文档
- **[[API Reference|API 参考]]** - 13个 MCP 工具的完整文档
- **[[Architecture Design|架构设计]]** - 系统设计和技术决策
- **[[CICD Automation|CI/CD 自动化]]** - 完整的自动化发布流程

### 👩‍💻 开发指南
- **[[Development Setup|开发环境]]** - 本地开发环境配置
- **[[Testing Framework|测试框架]]** - 测试策略和执行指南
- **[[Contributing|贡献指南]]** - 如何参与项目开发

## ✨ 核心特性

### 🏃 Sprint 管理
- 创建和管理 Sprint (里程碑)
- 实时统计和进度追踪
- Sprint 中的 Issue 关联查看

### 🐛 Issue 追踪  
- 完整的 Issue 生命周期管理
- Sprint 分配和状态追踪
- 高级搜索和过滤

### 📝 项目管理
- 多项目支持 (ID/slug/名称灵活识别)
- 用户故事和任务管理
- 团队协作功能

### 🚀 自动化发布
- 双重注册表发布 (NPM + GitHub Packages)
- 完全自动化的 CI/CD 流程
- 自动版本管理和 Release 创建

## 🏗️ 技术架构

### 模块化设计
```
src/
├── index.js          # MCP 服务器主入口
├── constants.js      # 统一常量管理
├── utils.js          # 工具函数库
├── taigaAuth.js      # 认证管理
├── taigaService.js   # API 服务层
└── tools/            # 13个 MCP 工具模块
    ├── authTools.js     # 认证工具
    ├── projectTools.js  # 项目管理
    ├── sprintTools.js   # Sprint 管理
    ├── issueTools.js    # Issue 管理
    ├── userStoryTools.js # 用户故事
    └── taskTools.js     # 任务管理
```

### 测试体系
- **单元测试**: 11个测试 (100% 通过率)
- **快速测试**: MCP 协议集成测试
- **集成测试**: Taiga API 完整测试
- **CI/CD 测试**: 自动化发布流程验证

## 📊 项目统计

| 指标 | 数值 |
|------|------|
| MCP 工具 | 13个 |
| 功能分类 | 6个 |
| 代码行数 | 1800+ |
| 测试覆盖 | 100% |
| 发布速度 | ~45秒 |
| 文档页面 | 8+ |

## 🔗 快速链接

- **[GitHub 仓库](https://github.com/greddy7574/taigaMcpServer)** - 源代码和 Issues
- **[NPM 包](https://www.npmjs.com/package/taiga-mcp-server)** - 官方发布版本
- **[GitHub Packages](https://github.com/greddy7574/taigaMcpServer/packages)** - 替代注册表
- **[Releases](https://github.com/greddy7574/taigaMcpServer/releases)** - 版本历史和更新日志
- **[CI/CD Actions](https://github.com/greddy7574/taigaMcpServer/actions)** - 自动化构建状态

## 🎯 下一步

1. **新用户**: 从 [[Installation Guide]] 开始
2. **开发者**: 查看 [[Development Setup]]  
3. **API 使用**: 参考 [[API Reference]]
4. **高级配置**: 阅读 [[CICD Automation]]

---

**💡 提示**: 使用 Wiki 顶部的搜索功能快速查找特定内容！

**Created with ❤️ by [Greddy](mailto:greddy7574@gmail.com) & [Claude Code](https://claude.ai/code)**