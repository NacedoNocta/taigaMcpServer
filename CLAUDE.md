# CLAUDE.md

This file provides comprehensive guidance to Claude Code (claude.ai/code) when working with the Taiga MCP Server codebase.

## 🚀 项目概述

**Taiga MCP Server** 是一个高度模块化的Model Context Protocol服务器，提供与Taiga项目管理系统的完整自然语言接口。项目采用现代Node.js ES模块架构，通过stdio传输与MCP客户端通信，支持企业级项目管理功能。

### 核心特性
- **完整的Sprint管理** - 创建、追踪、统计分析
- **问题生命周期管理** - Issue与Sprint关联追踪
- **模块化架构** - 13个MCP工具，6个功能分类
- **专业测试框架** - 单元测试、集成测试、MCP协议测试
- **AI协作开发** - 展示人机协作软件开发潜力

## 📋 常用命令

### 开发和运行
```bash
npm start                    # 启动MCP服务器（stdio模式）
npm test                     # 运行默认测试套件（单元+快速测试）
npm run test:unit           # 运行单元测试（无外部依赖）
npm run test:quick          # 运行快速功能测试
npm run test:basic          # 运行MCP协议测试（复杂）
npm run test:integration    # 运行Taiga API集成测试（需凭据）
npm run test:full          # 运行所有测试套件
```

### 包管理与发布
```bash
# 手动发布（不推荐）
npm publish                 # 发布到npm（需要版本更新）

# 自动化发布（推荐）
npm version patch           # 创建新版本并触发自动发布
git push origin main --tags # 推送标签，触发CI/CD自动发布

# 使用已发布的包
npx taiga-mcp-server                     # NPM Registry
npx @greddy7574/taiga-mcp-server        # GitHub Package Registry
```

## ⚙️ 环境配置

### 必需的.env文件
```env
TAIGA_API_URL=https://api.taiga.io/api/v1
TAIGA_USERNAME=your_username  
TAIGA_PASSWORD=your_password
```

### Claude Desktop配置
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

## 🏗️ 架构结构

### 模块化设计 (v1.5.0+)
```
src/
├── index.js              # MCP服务器主入口（130行）
├── constants.js          # 统一常量管理（76行）
├── utils.js             # 工具函数库（120行）
├── taigaAuth.js         # 认证管理
├── taigaService.js      # API服务层（420行）
└── tools/               # MCP工具模块
    ├── index.js         # 工具注册中心
    ├── authTools.js     # 认证工具
    ├── projectTools.js  # 项目管理工具
    ├── sprintTools.js   # Sprint管理工具
    ├── issueTools.js    # 问题管理工具
    ├── userStoryTools.js # 用户故事工具
    └── taskTools.js     # 任务管理工具
```

### MCP工具分类（13个工具）

#### 🔐 认证工具 (1个)
- `authenticate` - Taiga用户认证

#### 📁 项目管理 (2个)
- `listProjects` - 列出用户项目
- `getProject` - 获取项目详情（支持ID和slug）

#### 🏃 Sprint管理 (4个)
- `listMilestones` - 列出项目Sprint（里程碑）
- `getMilestoneStats` - Sprint统计信息（进度、完成率）
- `createMilestone` - 创建新Sprint
- `getIssuesByMilestone` - 获取Sprint中的所有问题

#### 🐛 问题管理 (2个)
- `listIssues` - 列出项目问题（含Sprint信息）
- `getIssue` - 问题详情（包括Sprint分配）
- `createIssue` - 创建问题（支持状态、优先级等）

#### 📝 用户故事管理 (2个)
- `listUserStories` - 列出项目用户故事
- `createUserStory` - 创建用户故事

#### ✅ 任务管理 (1个)
- `createTask` - 创建任务（关联用户故事）

### 测试架构
```
test/
├── README.md           # 测试文档
├── unitTest.js        # 单元测试（11个测试，100%通过）
├── quickTest.js       # 快速功能测试（4个测试）
├── mcpTest.js         # MCP协议测试（8个测试，复杂）
├── integration.js     # Taiga API集成测试（需凭据）
└── runTests.js        # 综合测试运行器
```

## 🔧 开发注意事项

### 核心设计原则
1. **模块化优先** - 每个功能独立模块，便于维护
2. **错误处理统一** - 所有API调用使用统一错误处理模式
3. **响应格式标准** - 使用`createSuccessResponse`和`createErrorResponse`
4. **项目标识符灵活** - 支持数字ID和字符串slug

### ES模块规范
- 所有导入必须包含`.js`扩展名
- 使用`export`/`import`语法
- 支持动态导入

### 数据处理模式
```javascript
// 项目解析示例
const project = await resolveProject(projectIdentifier);

// 响应格式化示例  
return createSuccessResponse(`✅ ${SUCCESS_MESSAGES.ISSUE_CREATED}`);

// 错误处理示例
return createErrorResponse(ERROR_MESSAGES.PROJECT_NOT_FOUND);
```

### 常用工具函数
- `resolveProject()` - 智能项目解析（ID/slug/名称）
- `formatDate()` - 统一日期格式化
- `calculateCompletionPercentage()` - 完成度计算
- `createSuccessResponse()` / `createErrorResponse()` - 响应格式化

## 📊 代码质量指标

### 模块化程度
- **主文件缩减**: 800+ 行 → 130 行 (83%减少)
- **功能分离**: 6个独立工具模块
- **测试覆盖**: 4个测试层级
- **文档化**: 完整API和架构文档

### 开发工作流
1. **快速验证**: `npm test` (单元+快速测试)
2. **功能开发**: 修改对应工具模块
3. **完整测试**: `npm run test:full`
4. **自动发布**: `npm version patch && git push origin main --tags`

### CI/CD自动化流程 🚀
项目配置了完整的GitHub Actions自动化发布流程：

**触发条件**: 推送 `v*` 标签
```bash
npm version patch              # 自动创建新版本标签
git push origin main --tags    # 推送触发CI/CD
```

**自动化流程**:
1. **🧪 测试阶段** - 运行单元测试和快速测试
2. **📦 并行发布**:
   - NPM Registry: `taiga-mcp-server`
   - GitHub Packages: `@greddy7574/taiga-mcp-server`
3. **🎉 Release创建** - 自动生成changelog和发布说明

**配置要求**:
- GitHub Repository Secret: `NPM_TOKEN` (npm自动化token)
- 权限: `contents: write`, `packages: write`

**完整流程耗时**: ~45秒 (测试→发布→Release)

## 🎯 常见开发任务

### 添加新工具
1. 在`src/tools/`创建工具文件
2. 在`src/tools/index.js`注册工具
3. 在`src/constants.js`添加相关常量
4. 添加对应测试用例

### 修改API响应
1. 检查`src/taigaService.js`中的API调用
2. 使用`src/utils.js`中的格式化函数
3. 确保错误处理一致性

### 调试问题
1. 运行`npm run test:unit`验证核心逻辑
2. 运行`npm run test:quick`验证MCP功能
3. 检查`.env`文件配置
4. 查看`test/README.md`了解测试策略

## 🚀 项目发展历程

### 版本历史
- **v1.0.0**: 基础MCP功能
- **v1.3.0**: 添加constants和utils模块
- **v1.4.0**: 增强常量管理，统一命名
- **v1.5.0**: 完全模块化架构
- **v1.5.1**: 清理和测试框架
- **v1.5.2**: 清理git历史，完整npm发布
- **v1.5.3**: CI/CD基础框架
- **v1.5.4**: 修复CI/CD流程
- **v1.5.5**: 双重发布支持(NPM+GPR)
- **v1.5.6**: 完全自动化Release创建

### AI协作开发特色
这个项目展示了人机协作开发的强大潜力：
- **架构设计**: AI辅助的模块化设计
- **代码重构**: 从单文件到模块化的完整重构
- **测试框架**: 多层次测试策略设计
- **文档完善**: 专业级文档和指南

项目是"inspired by"开源项目的成功案例，展现了如何在保持法律合规的同时进行大幅创新和改进。

## 📚 扩展文档

**完整的技术文档和用户指南请访问项目 Wiki:**
👉 **https://github.com/greddy7574/taigaMcpServer/wiki**

### Wiki 亮点功能
- 🔍 **全文搜索** - 快速查找特定内容
- 📱 **移动优化** - 更好的移动设备体验  
- 🔗 **智能导航** - 页面间快速跳转
- 📖 **在线编辑** - 协作编辑文档
- 📊 **富媒体支持** - 图表、表格、代码高亮

### 推荐阅读顺序
1. [Installation Guide](https://github.com/greddy7574/taigaMcpServer/wiki/Installation-Guide) - 新用户必读
2. [API Reference](https://github.com/greddy7574/taigaMcpServer/wiki/API-Reference) - 完整API文档
3. [CICD Automation](https://github.com/greddy7574/taigaMcpServer/wiki/CICD-Automation) - 自动化发布流程