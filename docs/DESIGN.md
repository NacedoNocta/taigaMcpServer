# 🏗️ Taiga MCP Server - 设计文档

## 📋 项目概览

### 项目定位
Taiga MCP Server 是一个企业级Model Context Protocol服务器，专为Taiga项目管理系统设计，提供完整的自然语言接口。项目展示了AI辅助开发的强大潜力，从基础概念发展为功能完备的项目管理解决方案。

### 核心价值主张
- **零学习曲线**: 通过自然语言操作复杂的项目管理任务
- **完整工作流**: 覆盖项目、Sprint、Issue、Story的完整生命周期
- **企业就绪**: 模块化架构，专业测试，生产级质量
- **AI协作典范**: 展示人机协作开发的最佳实践

## 🎯 设计目标

### 主要目标
1. **功能完整性**: 覆盖Taiga核心项目管理功能
2. **易用性**: 自然语言接口，降低使用门槛
3. **可扩展性**: 模块化设计，便于功能扩展
4. **可靠性**: 全面测试覆盖，错误处理完善
5. **可维护性**: 清晰架构，规范代码

### 技术目标
- MCP协议完全兼容
- Node.js ES模块架构
- 无状态设计，易于部署
- 内存高效，响应快速

## 🏛️ 系统架构

### 整体架构设计

```
┌─────────────────────────────────────────────────────────────┐
│                    Claude Desktop / MCP Client              │
└─────────────────┬───────────────────────────────────────────┘
                  │ MCP Protocol (stdio)
┌─────────────────▼───────────────────────────────────────────┐
│                 Taiga MCP Server                            │
│  ┌─────────────────────────────────────────────────────────┐│
│  │              MCP Layer (index.js)                      ││
│  │  • Tool Registration   • Resource Management           ││
│  │  • Error Handling     • Response Formatting           ││
│  └─────────────────┬───────────────────────────────────────┘│
│  ┌─────────────────▼───────────────────────────────────────┐│
│  │            Tools Layer (tools/)                        ││
│  │  • authTools      • projectTools   • sprintTools      ││
│  │  • issueTools     • storyTools     • taskTools        ││
│  └─────────────────┬───────────────────────────────────────┘│
│  ┌─────────────────▼───────────────────────────────────────┐│
│  │         Service Layer (taigaService.js)                ││
│  │  • API Abstraction    • Data Transformation           ││
│  │  • Error Handling     • Response Formatting           ││
│  └─────────────────┬───────────────────────────────────────┘│
│  ┌─────────────────▼───────────────────────────────────────┐│
│  │      Utilities & Constants (utils.js, constants.js)   ││
│  │  • Helper Functions   • API Endpoints                 ││
│  │  • Message Templates  • Status Definitions            ││
│  └─────────────────┬───────────────────────────────────────┘│
└──────────────────┬─┘───────────────────────────────────────────┘
                   │ HTTP/HTTPS
┌──────────────────▼─────────────────────────────────────────────┐
│                    Taiga API                                   │
│  • Authentication    • Projects    • Sprints    • Issues      │
└────────────────────────────────────────────────────────────────┘
```

### 模块化设计原则

#### 1. 分层架构
- **MCP层**: 协议处理和工具注册
- **工具层**: 功能模块化，独立可测试
- **服务层**: API抽象和数据处理
- **工具层**: 通用功能和常量

#### 2. 单一职责
每个模块都有明确的单一职责：
- `authTools.js`: 仅处理认证
- `projectTools.js`: 仅处理项目管理
- `sprintTools.js`: 仅处理Sprint管理
- 等等...

#### 3. 依赖注入
工具模块不直接依赖服务实现，通过参数传递：
```javascript
export function registerProjectTools(server) {
  // 清晰的依赖关系
}
```

## 🔧 核心组件设计

### 1. MCP工具系统

#### 工具分类策略
```
认证工具 (1个)     - 用户身份验证
  └── authenticate

项目管理 (2个)     - 项目生命周期
  ├── listProjects
  └── getProject

Sprint管理 (4个)   - 敏捷开发核心
  ├── listMilestones
  ├── getMilestoneStats  
  ├── createMilestone
  └── getIssuesByMilestone

问题管理 (3个)     - 缺陷追踪
  ├── listIssues
  ├── getIssue
  └── createIssue

用户故事 (2个)     - 需求管理
  ├── listUserStories
  └── createUserStory

任务管理 (1个)     - 工作分解
  └── createTask
```

#### 工具注册模式
```javascript
// 统一注册模式
export function registerAllTools(server) {
  registerAuthTools(server);
  registerProjectTools(server);
  registerSprintTools(server);
  registerIssueTools(server);
  registerUserStoryTools(server);
  registerTaskTools(server);
}
```

### 2. API服务层设计

#### 职责划分
- **认证管理**: Token获取、刷新、验证
- **数据转换**: Taiga API响应 → MCP格式
- **错误处理**: API错误 → 用户友好消息
- **缓存策略**: 项目信息缓存优化

#### 错误处理策略
```javascript
// 统一错误处理模式
try {
  const response = await axios.get(url, config);
  return response.data;
} catch (error) {
  if (error.response?.status === 401) {
    return createErrorResponse(ERROR_MESSAGES.AUTHENTICATION_FAILED);
  }
  return createErrorResponse(ERROR_MESSAGES.NETWORK_ERROR);
}
```

### 3. 数据流设计

#### 请求流程
```
User Input → Claude Desktop → MCP Protocol → Tool Handler → 
Service Layer → Taiga API → Response Processing → MCP Response
```

#### 响应格式标准化
```javascript
// 成功响应
{
  content: [{
    type: 'text',
    text: '✅ 操作成功完成'
  }]
}

// 错误响应  
{
  content: [{
    type: 'text', 
    text: '❌ 错误: 具体错误信息'
  }],
  isError: true
}
```

## 🧪 测试架构设计

### 测试策略金字塔

```
                 ┌─────────────────┐
                 │  集成测试 (E2E)   │  ← 真实API测试
                 │  integration.js │
                 └─────────────────┘
              ┌─────────────────────────┐
              │    MCP协议测试           │  ← 协议兼容性
              │    mcpTest.js          │
              └─────────────────────────┘
         ┌─────────────────────────────────────┐
         │          快速功能测试                │  ← 核心功能验证
         │          quickTest.js              │
         └─────────────────────────────────────┘
    ┌─────────────────────────────────────────────────┐
    │               单元测试                           │  ← 基础逻辑测试
    │               unitTest.js                       │
    └─────────────────────────────────────────────────┘
```

### 测试分层设计

#### 1. 单元测试 (基础层)
- **范围**: 工具函数、常量、响应格式
- **特点**: 无外部依赖，快速执行
- **目标**: 100%通过率

#### 2. 快速功能测试 (功能层)
- **范围**: MCP服务器创建、工具注册
- **特点**: 无网络调用，模拟验证
- **目标**: 核心功能正常

#### 3. MCP协议测试 (协议层)  
- **范围**: 完整MCP客户端-服务器通信
- **特点**: 子进程通信，复杂环境
- **目标**: 协议兼容性

#### 4. 集成测试 (端到端层)
- **范围**: 真实Taiga API交互
- **特点**: 需要凭据，网络依赖
- **目标**: 端到端工作流验证

## 🚀 部署架构设计

### 部署方式

#### 1. NPM包分发 (主要方式)
```bash
npx taiga-mcp-server  # 零配置启动
```

#### 2. Claude Desktop集成
```json
{
  "mcpServers": {
    "taiga-mcp": {
      "command": "npx",
      "args": ["taiga-mcp-server"]
    }
  }
}
```

#### 3. Docker容器化 (未来)
```dockerfile
FROM node:20-alpine
COPY . /app
WORKDIR /app
RUN npm install --production
CMD ["npm", "start"]
```

### 配置管理

#### 环境变量策略
```env
# 必需配置
TAIGA_API_URL=https://api.taiga.io/api/v1
TAIGA_USERNAME=user@example.com
TAIGA_PASSWORD=secure_password

# 可选配置
MCP_LOG_LEVEL=info
MCP_TIMEOUT=30000
```

## 📊 性能设计

### 性能目标
- **启动时间**: < 2秒
- **响应时间**: < 500ms (大部分操作)
- **内存使用**: < 50MB
- **并发支持**: 单用户高频操作

### 优化策略

#### 1. 懒加载
```javascript
// 按需加载工具模块
const { registerProjectTools } = await import('./tools/projectTools.js');
```

#### 2. 缓存策略
```javascript
// 项目信息缓存
const projectCache = new Map();
```

#### 3. 响应优化
```javascript
// 快速失败原则
if (!authToken) {
  return createErrorResponse(ERROR_MESSAGES.AUTHENTICATION_FAILED);
}
```

## 🔮 扩展性设计

### 水平扩展

#### 1. 新工具添加
```javascript
// 标准工具模板
export function registerNewTools(server) {
  server.tool('newTool', schema, handler);
}
```

#### 2. 新API集成
```javascript
// 服务层扩展
class NewService {
  async callAPI() {
    // 统一API调用模式
  }
}
```

### 垂直扩展

#### 1. 功能增强
- 批量操作支持
- 高级查询语法
- 自定义字段支持

#### 2. 性能优化
- 连接池管理
- 请求去重
- 智能缓存

## 🔒 安全设计

### 认证安全
- **Token管理**: 内存存储，定期刷新
- **凭据保护**: 环境变量隔离
- **传输安全**: HTTPS强制

### 数据安全
- **输入验证**: Zod schema验证
- **输出过滤**: 敏感信息清理
- **错误信息**: 避免信息泄露

## 📈 监控和维护

### 日志策略
```javascript
// 结构化日志
console.log(JSON.stringify({
  level: 'info',
  tool: 'listProjects',
  duration: 234,
  timestamp: new Date().toISOString()
}));
```

### 错误追踪
- 操作审计日志
- 性能指标收集
- 错误率监控

## 🎨 用户体验设计

### 自然语言接口
- **直观命令**: "列出所有项目"
- **智能解析**: 自动识别项目标识符
- **友好反馈**: 表情符号和格式化输出

### 错误处理UX
- **明确错误**: 具体说明问题原因
- **解决建议**: 提供修复步骤
- **上下文保持**: 维护用户操作状态

## 🚀 发展路线图

### 短期目标 (v1.6 - v1.8)
- [ ] Docker容器化部署
- [ ] 批量操作支持
- [ ] 性能监控仪表板
- [ ] 自动化测试CI/CD

### 中期目标 (v2.0 - v2.2)
- [ ] 多租户支持
- [ ] 高级查询语法
- [ ] 实时通知推送
- [ ] 数据分析功能

### 长期目标 (v3.0+)
- [ ] 多项目管理平台支持
- [ ] AI辅助项目分析
- [ ] 可视化工作流设计器
- [ ] 企业级权限管理

---

这份设计文档展示了Taiga MCP Server从概念到实现的完整思考过程，体现了AI辅助开发在系统设计、架构规划、和工程实践方面的强大能力。项目不仅是技术实现，更是人机协作开发模式的成功范例。