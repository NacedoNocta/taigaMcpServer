# 📚 Taiga MCP Server - API文档

## 📋 概述

Taiga MCP Server 提供13个MCP工具，涵盖完整的项目管理工作流。所有工具都遵循统一的调用模式和响应格式。

## 🔐 认证工具

### authenticate
用户身份验证工具。

**参数:**
```javascript
{
  username: string,  // Taiga用户名或邮箱
  password: string   // Taiga密码
}
```

**响应示例:**
```
✅ 认证成功！已连接到Taiga API
用户: john@example.com
服务器: https://api.taiga.io/api/v1
```

**使用场景:**
- 首次连接Taiga
- Token过期重新认证
- 切换用户账户

---

## 📁 项目管理工具

### listProjects
列出用户可访问的所有项目。

**参数:** 无

**响应示例:**
```
📋 您的Taiga项目:

- MyApp Mobile (ID: 123456, Slug: myapp-mobile)
  📝 移动应用开发项目
  
- Website Redesign (ID: 789012, Slug: website-redesign)  
  🎨 网站重新设计项目
```

### getProject
获取指定项目的详细信息。

**参数:**
```javascript
{
  projectIdentifier: string  // 项目ID或slug
}
```

**响应示例:**
```
📁 项目详情: MyApp Mobile

🆔 项目ID: 123456
🔗 Slug: myapp-mobile
📝 描述: 移动应用开发项目
👥 成员数: 8
📊 状态: 活跃
🏷️ 标签: mobile, ios, android
🔒 可见性: 私有
📅 创建时间: 2024-01-15
```

---

## 🏃 Sprint管理工具

### listMilestones
列出项目中的所有Sprint（里程碑）。

**参数:**
```javascript
{
  projectIdentifier: string  // 项目ID或slug
}
```

**响应示例:**
```
🏃 MyApp Mobile 的Sprint列表:

📋 Sprint 1: 基础功能开发
   📅 2024-01-01 → 2024-01-31
   📊 进度: 85% (17/20 用户故事完成)
   🔄 状态: 活跃

📋 Sprint 2: UI/UX优化  
   📅 2024-02-01 → 2024-02-28
   📊 进度: 45% (9/20 用户故事完成)
   🔄 状态: 活跃
```

### getMilestoneStats
获取指定Sprint的详细统计信息。

**参数:**
```javascript
{
  projectIdentifier: string,  // 项目ID或slug
  milestoneId: number        // Sprint ID
}
```

**响应示例:**
```
📊 Sprint统计: Sprint 1 - 基础功能开发

⏰ 时间信息:
   📅 开始日期: 2024-01-01
   📅 结束日期: 2024-01-31
   📅 当前状态: 进行中

📈 完成情况:
   ✅ 已完成用户故事: 17/20 (85%)
   🔄 进行中: 2个
   ⏸️  待开始: 1个

🐛 问题追踪:
   🔴 严重问题: 0个
   🟡 普通问题: 3个
   🟢 已解决: 12个

👥 团队参与:
   🧑‍💻 活跃成员: 6人
   📝 最后更新: 2小时前
```

### createMilestone
创建新的Sprint。

**参数:**
```javascript
{
  projectIdentifier: string,  // 项目ID或slug
  name: string,              // Sprint名称
  estimatedStart: string,    // 开始日期 (YYYY-MM-DD)
  estimatedFinish: string    // 结束日期 (YYYY-MM-DD)
}
```

**响应示例:**
```
✅ Sprint创建成功!

📋 Sprint名称: Sprint 3 - 发布准备
📁 项目: MyApp Mobile
📅 开始日期: 2024-03-01
📅 结束日期: 2024-03-31
🆔 Sprint ID: 987654
🔗 可通过ID或名称引用此Sprint
```

### getIssuesByMilestone
获取指定Sprint中的所有问题。

**参数:**
```javascript
{
  projectIdentifier: string,  // 项目ID或slug
  milestoneId: number        // Sprint ID
}
```

**响应示例:**
```
🐛 Sprint 1 中的问题列表:

🔴 #123 登录页面崩溃
   📊 状态: 进行中
   👤 负责人: john@example.com
   🏷️ 类型: Bug
   ⚡ 优先级: 高

🟡 #124 性能优化
   📊 状态: 待处理  
   👤 负责人: 未分配
   🏷️ 类型: Enhancement
   ⚡ 优先级: 中

🟢 #125 文档更新
   📊 状态: 已完成
   👤 负责人: alice@example.com
   🏷️ 类型: Task
   ⚡ 优先级: 低
```

---

## 🐛 问题管理工具

### listIssues
列出项目中的所有问题。

**参数:**
```javascript
{
  projectIdentifier: string  // 项目ID或slug
}
```

**响应示例:**
```
🐛 MyApp Mobile 的问题列表:

🔴 #123 登录页面崩溃
   📊 状态: 进行中
   🏃 Sprint: Sprint 1
   👤 负责人: john@example.com
   📅 创建: 2024-01-15

🟡 #124 性能优化需求
   📊 状态: 待处理
   🏃 Sprint: 无Sprint
   👤 负责人: 未分配
   📅 创建: 2024-01-16

🟢 #125 文档更新完成
   📊 状态: 已完成
   🏃 Sprint: Sprint 1  
   👤 负责人: alice@example.com
   📅 创建: 2024-01-10
```

### getIssue
获取指定问题的详细信息。

**参数:**
```javascript
{
  projectIdentifier: string,  // 项目ID或slug
  issueRef: string           // 问题引用 (#123 或 123)
}
```

**响应示例:**
```
🐛 问题详情: #123 登录页面崩溃

📋 基本信息:
   🆔 问题ID: 123
   📁 项目: MyApp Mobile
   🏃 所属Sprint: Sprint 1 - 基础功能开发
   
📊 状态信息:
   🔄 当前状态: 进行中
   🏷️ 问题类型: Bug
   ⚡ 优先级: 高
   🎯 严重性: 严重

👥 责任信息:
   👤 负责人: john@example.com
   👨‍💻 创建者: alice@example.com
   📅 创建时间: 2024-01-15 10:30

📝 详细描述:
   用户在登录页面输入凭据后，应用程序崩溃。
   重现步骤：
   1. 打开应用
   2. 点击登录按钮
   3. 输入用户名和密码
   4. 点击提交
   
🏷️ 标签: crash, login, critical
```

### createIssue
创建新的问题。

**参数:**
```javascript
{
  projectIdentifier: string,  // 项目ID或slug
  subject: string,           // 问题标题
  description?: string,      // 问题描述（可选）
  type?: string,            // 问题类型（可选）
  priority?: string,        // 优先级（可选）
  severity?: string         // 严重性（可选）
}
```

**响应示例:**
```
✅ 问题创建成功!

🐛 问题: #126 数据库连接超时
📁 项目: MyApp Mobile
🆔 问题ID: 126
🏷️ 类型: Bug
⚡ 优先级: 中
🎯 严重性: 普通
👤 创建者: current_user@example.com
📅 创建时间: 2024-01-20 14:25

💡 可通过 #126 引用此问题
```

---

## 📝 用户故事管理工具

### listUserStories
列出项目中的用户故事。

**参数:**
```javascript
{
  projectIdentifier: string  // 项目ID或slug
}
```

**响应示例:**
```
📝 MyApp Mobile 的用户故事:

✅ #US-001 用户登录功能
   📊 状态: 已完成
   👤 负责人: john@example.com
   🏃 Sprint: Sprint 1
   📅 创建: 2024-01-01

🔄 #US-002 用户注册流程  
   📊 状态: 进行中
   👤 负责人: alice@example.com
   🏃 Sprint: Sprint 1
   📅 创建: 2024-01-05

⏸️ #US-003 密码重置功能
   📊 状态: 待开始
   👤 负责人: 未分配
   🏃 Sprint: 无Sprint
   📅 创建: 2024-01-10
```

### createUserStory
创建新的用户故事。

**参数:**
```javascript
{
  projectIdentifier: string,  // 项目ID或slug
  subject: string,           // 故事标题
  description?: string       // 故事描述（可选）
}
```

**响应示例:**
```
✅ 用户故事创建成功!

📝 用户故事: 社交媒体分享功能
📁 项目: MyApp Mobile
🆔 故事ID: 456
📋 引用: #US-004
👤 创建者: current_user@example.com
📅 创建时间: 2024-01-20 15:10

📝 描述: 作为用户，我希望能够将应用内容分享到社交媒体平台，以便与朋友分享我的体验。

💡 可通过 #US-004 引用此用户故事
```

---

## ✅ 任务管理工具

### createTask
创建关联到用户故事的任务。

**参数:**
```javascript
{
  projectIdentifier: string,     // 项目ID或slug
  userStoryIdentifier: string,   // 用户故事引用
  subject: string,              // 任务标题
  description?: string          // 任务描述（可选）
}
```

**响应示例:**
```
✅ 任务创建成功!

📋 任务: 设计登录界面UI
📁 项目: MyApp Mobile
📝 关联用户故事: #US-001 用户登录功能
🆔 任务ID: 789
👤 创建者: current_user@example.com
📅 创建时间: 2024-01-20 16:00

📝 描述: 设计用户友好的登录界面，包括用户名/密码输入框和登录按钮

🔄 当前状态: 待处理
⚡ 优先级: 普通
```

---

## 🔧 通用响应格式

### 成功响应
所有成功操作都返回格式化的文本内容，包含：
- ✅ 成功标识
- 📊 相关数据信息
- 💡 操作提示（如适用）

### 错误响应
所有错误都返回结构化错误信息：
```javascript
{
  content: [{
    type: 'text',
    text: '❌ 错误: 具体错误描述'
  }],
  isError: true
}
```

### 常见错误类型
- **认证失败**: `❌ 错误: 认证失败，请检查用户名和密码`
- **项目未找到**: `❌ 错误: 未找到指定项目`
- **权限不足**: `❌ 错误: 您没有访问此资源的权限`
- **网络错误**: `❌ 错误: 网络连接失败，请稍后重试`

---

## 🎯 使用最佳实践

### 项目标识符
所有工具都支持灵活的项目标识方式：
- **数字ID**: `123456`
- **项目slug**: `myapp-mobile`
- **项目名称**: `MyApp Mobile`（模糊匹配）

### 日期格式
所有日期参数都使用ISO格式：
- **日期**: `2024-01-15` (YYYY-MM-DD)
- **时间**: `2024-01-15T10:30:00Z` (ISO 8601)

### 引用格式
- **问题引用**: `#123` 或 `123`
- **用户故事引用**: `#US-001` 或 `US-001`
- **Sprint引用**: Sprint ID数字

### 批量操作建议
对于批量操作，建议：
1. 先用`listProjects`获取项目列表
2. 使用项目slug进行后续操作（更稳定）
3. 定期检查操作结果，处理可能的错误

---

这份API文档提供了完整的工具使用指南，帮助开发者和用户充分利用Taiga MCP Server的强大功能。