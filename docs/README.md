# 📚 Taiga MCP Server - 文档中心

欢迎来到Taiga MCP Server的文档中心！这里提供了项目的完整技术文档和指南。

## 📋 文档导航

### 🚀 [CI/CD自动化指南 (CICD.md)](./CICD.md)
**完整的自动化发布流程文档**
- GitHub Actions工作流配置
- 双重发布支持 (NPM + GitHub Packages)
- 自动Release创建和changelog生成
- 配置要求和故障排除
- 性能指标和最佳实践

### 🏗️ [设计文档 (DESIGN.md)](./DESIGN.md)
**完整的系统设计和架构思考**
- 项目定位和价值主张
- 设计目标和技术目标  
- 系统架构和模块化设计
- 核心组件设计详解
- 测试架构和部署策略
- 性能设计和扩展性规划
- 安全设计和监控维护
- 发展路线图

### 📚 [API文档 (API.md)](./API.md)
**13个MCP工具的完整使用指南**
- 🔐 认证工具: `authenticate`
- 📁 项目管理: `listProjects`, `getProject`
- 🏃 Sprint管理: `listMilestones`, `getMilestoneStats`, `createMilestone`, `getIssuesByMilestone`
- 🐛 问题管理: `listIssues`, `getIssue`, `createIssue`
- 📝 用户故事: `listUserStories`, `createUserStory`
- ✅ 任务管理: `createTask`

每个工具都包含：
- 参数说明
- 响应示例
- 使用场景
- 最佳实践

### 🏗️ [架构图 (ARCHITECTURE.md)](./ARCHITECTURE.md)
**可视化的系统架构和流程**
- 系统整体架构图
- 模块依赖关系图
- 核心流程图 (启动、调用、认证、项目解析)
- 测试架构流程
- 部署架构 (NPM、Docker)
- 数据流架构
- 扩展架构

## 🎯 快速开始指南

### 1. 新用户入门
```bash
# 快速体验
npx taiga-mcp-server

# 全局安装
npm install -g taiga-mcp-server
```

### 2. 开发者指南
```bash
# 克隆项目
git clone https://github.com/greddy7574/taigaMcpServer.git
cd taigaMcpServer

# 安装依赖
npm install

# 运行测试
npm test

# 启动开发服务器
npm start
```

### 3. Claude Desktop集成
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

## 🔧 开发资源

### 项目根目录文档
- **[CLAUDE.md](../CLAUDE.md)** - Claude Code开发指南
- **[README.md](../README.md)** - 项目主要说明
- **[LICENSE](../LICENSE)** - 开源许可证

### 测试相关
- **[test/README.md](../test/README.md)** - 测试框架文档
- **测试命令**:
  - `npm test` - 默认测试套件
  - `npm run test:unit` - 单元测试
  - `npm run test:quick` - 快速功能测试
  - `npm run test:basic` - MCP协议测试
  - `npm run test:integration` - 集成测试

### 代码结构
```
src/
├── index.js              # MCP服务器入口
├── constants.js          # 常量定义
├── utils.js             # 工具函数
├── taigaAuth.js         # 认证管理
├── taigaService.js      # API服务层
└── tools/               # MCP工具模块
    ├── index.js         # 工具注册中心
    ├── authTools.js     # 认证工具
    ├── projectTools.js  # 项目管理
    ├── sprintTools.js   # Sprint管理
    ├── issueTools.js    # 问题管理
    ├── userStoryTools.js # 用户故事
    └── taskTools.js     # 任务管理
```

## 🚀 功能特色

### ✨ 核心功能
- **完整Sprint管理** - 创建、追踪、统计分析
- **问题生命周期** - Issue与Sprint关联追踪
- **自然语言接口** - 零学习曲线的操作体验
- **模块化架构** - 13个工具，6个功能分类

### 🧪 质量保证
- **4层测试框架** - 单元、功能、协议、集成测试
- **100%单元测试通过率** - 11个单元测试全部通过
- **专业错误处理** - 统一错误格式和用户友好消息
- **完整文档覆盖** - API、架构、设计全方位文档

### 🎯 AI协作特色
- **人机协作开发** - 展示AI辅助开发最佳实践
- **从概念到实现** - 完整的软件工程生命周期
- **可持续发展** - 清晰的扩展路径和维护策略

## 📊 项目统计

### 代码规模
- **主要源码**: 626行 (不含测试)
- **测试代码**: 800+行
- **文档**: 2000+行
- **模块数**: 13个工具模块

### 功能覆盖
- **Taiga功能**: 覆盖核心项目管理工作流
- **MCP工具**: 13个工具，涵盖6大功能分类
- **API端点**: 支持20+个Taiga API端点
- **响应格式**: 统一的用户友好格式

## 🤝 贡献指南

### 如何贡献
1. Fork项目到您的GitHub账户
2. 创建功能分支: `git checkout -b feature/new-feature`
3. 提交更改: `git commit -am 'Add new feature'`
4. 推送分支: `git push origin feature/new-feature`
5. 创建Pull Request

### 开发规范
- 遵循ES模块规范
- 使用Zod进行参数验证
- 编写对应的测试用例
- 更新相关文档

### 报告问题
请访问 [GitHub Issues](https://github.com/greddy7574/taigaMcpServer/issues) 报告问题或建议新功能。

## 📞 联系方式

- **GitHub**: https://github.com/greddy7574/taigaMcpServer
- **NPM**: https://www.npmjs.com/package/taiga-mcp-server
- **Email**: greddy7574@gmail.com

## 🏆 致谢

### 原始灵感
感谢 [adriapedralbes](https://github.com/adriapedralbes) 的 [mcpTAIGA](https://github.com/adriapedralbes/mcpTAIGA) 项目提供的概念启发。

### AI协作开发
本项目是人机协作开发的成功案例，展示了 [Claude Code](https://claude.ai/code) 在软件工程全生命周期中的强大能力：
- 需求分析和架构设计
- 代码实现和重构优化
- 测试框架设计和实现
- 文档编写和项目管理

---

**📚 探索文档，掌握Taiga MCP Server的强大功能！**