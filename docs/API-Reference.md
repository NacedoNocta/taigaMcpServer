# 📚 API 参考

完整的 Taiga MCP Server API 文档，包含 13 个 MCP 工具的详细说明。

## 📋 工具概览

| 分类 | 工具数量 | 主要功能 |
|------|----------|----------|
| 🔐 认证 | 1 | 用户身份验证 |
| 📁 项目管理 | 2 | 项目列表和详情 |
| 🏃 Sprint 管理 | 4 | Sprint 生命周期管理 |
| 🐛 Issue 管理 | 3 | Issue 追踪和管理 |
| 📝 用户故事 | 2 | 用户故事管理 |
| ✅ 任务管理 | 1 | 任务创建和分配 |

## 🔐 认证工具

### `authenticate`
用户身份验证工具，建立与 Taiga API 的连接。

**参数:**
```json
{
  "username": "your_username",
  "password": "your_password"
}
```

**响应示例:**
```
✅ 认证成功！已连接到Taiga API
用户: john@example.com
服务器: https://api.taiga.io/api/v1
```

**使用场景:**
- 首次连接 Taiga
- Token 过期重新认证
- 切换用户账户

---

## 📁 项目管理工具

### `listProjects`
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

**使用场景:**
- 查看可用项目
- 获取项目 ID 和 Slug
- 项目权限验证

### `getProject`
获取指定项目的详细信息。

**参数:**
```json
{
  "projectIdentifier": "123456"  // 可以是 ID、slug 或项目名称
}
```

**响应示例:**
```
📁 项目详情: MyApp Mobile

🆔 ID: 123456
🏷️ Slug: myapp-mobile
📝 描述: 移动应用开发项目
👥 成员: 8人
📊 状态: 进行中
📅 创建时间: 2024-01-15
🔗 URL: https://tree.taiga.io/project/myapp-mobile/
```

**使用场景:**
- 查看项目详细信息
- 验证项目访问权限
- 获取项目元数据

---

## 🏃 Sprint 管理工具

### `listMilestones`
列出项目中的所有 Sprint（里程碑）。

**参数:**
```json
{
  "projectIdentifier": "myapp-mobile"
}
```

**响应示例:**
```
🏃 MyApp Mobile 的Sprint列表:

📅 Sprint 1: 基础功能开发
   🆔 ID: 1001
   📊 状态: 已完成
   📅 时间: 2024-01-15 → 2024-01-29

📅 Sprint 2: 用户界面优化  
   🆔 ID: 1002
   📊 状态: 进行中
   📅 时间: 2024-01-30 → 2024-02-13

📅 Sprint 3: 测试和发布
   🆔 ID: 1003
   📊 状态: 未开始
   📅 时间: 2024-02-14 → 2024-02-28
```

### `getMilestoneStats`
获取指定 Sprint 的详细统计信息。

**参数:**
```json
{
  "projectIdentifier": "myapp-mobile",
  "milestoneId": 1002
}
```

**响应示例:**
```
📊 Sprint 2 统计详情:

📅 Sprint: 用户界面优化 (ID: 1002)
📊 状态: 进行中
📅 时间: 2024-01-30 → 2024-02-13

📈 进度统计:
├── 总用户故事: 12个
├── 已完成: 8个 (67%)
├── 进行中: 3个 (25%)
└── 未开始: 1个 (8%)

🎯 完成度: 67%
📍 剩余天数: 5天
⚡ 速度: 0.8个故事/天
```

### `createMilestone`
创建新的 Sprint（里程碑）。

**参数:**
```json
{
  "projectIdentifier": "myapp-mobile",
  "name": "Sprint 4: 性能优化",
  "estimatedStart": "2024-03-01",
  "estimatedFinish": "2024-03-15"
}
```

**响应示例:**
```
✅ Sprint创建成功！

📅 Sprint 4: 性能优化
🆔 ID: 1004
📊 状态: 未开始
📅 计划时间: 2024-03-01 → 2024-03-15
📁 项目: MyApp Mobile
🔗 链接: https://tree.taiga.io/project/myapp-mobile/taskboard/sprint-4-1004
```

### `getIssuesByMilestone`
获取指定 Sprint 中的所有问题。

**参数:**
```json
{
  "projectIdentifier": "myapp-mobile",
  "milestoneId": 1002
}
```

**响应示例:**
```
🐛 Sprint 2 中的问题列表:

🔴 #456: 登录页面加载缓慢
   👤 分配给: Alice Johnson
   📊 状态: 进行中
   🏷️ 标签: bug, performance

🟡 #457: 按钮样式不一致
   👤 分配给: Bob Smith  
   📊 状态: 新建
   🏷️ 标签: ui, enhancement

✅ #458: 修复密码重置功能
   👤 分配给: Charlie Brown
   📊 状态: 已完成
   🏷️ 标签: bug, critical
```

---

## 🐛 Issue 管理工具

### `listIssues`
列出项目中的所有问题，包含 Sprint 分配信息。

**参数:**
```json
{
  "projectIdentifier": "myapp-mobile"
}
```

**响应示例:**
```
🐛 MyApp Mobile 的问题列表:

🔴 #456: 登录页面加载缓慢
   👤 分配给: Alice Johnson
   📊 状态: 进行中
   🏃 Sprint: Sprint 2 (ID: 1002)
   📅 创建时间: 2024-01-25

🟡 #457: 按钮样式不一致
   👤 分配给: Bob Smith
   📊 状态: 新建
   🏃 Sprint: Sprint 2 (ID: 1002)
   📅 创建时间: 2024-01-28
```

### `getIssue`
获取指定问题的详细信息。

**参数:**
```json
{
  "projectIdentifier": "myapp-mobile",
  "issueId": 456
}
```

**响应示例:**
```
🐛 问题详情 #456:

📝 标题: 登录页面加载缓慢
📊 状态: 进行中
👤 分配给: Alice Johnson
🏃 Sprint: Sprint 2 (ID: 1002)
🏷️ 标签: bug, performance
⭐ 优先级: 高
📅 创建时间: 2024-01-25
📅 修改时间: 2024-02-01

📋 描述:
登录页面在慢速网络下加载时间超过10秒，影响用户体验。
需要优化API调用和图片加载策略。
```

### `createIssue`
创建新的问题。

**参数:**
```json
{
  "projectIdentifier": "myapp-mobile",
  "subject": "优化搜索功能性能",
  "description": "当前搜索功能在大数据量下响应缓慢，需要优化算法和数据库查询。",
  "status": "New",
  "priority": "High",
  "tags": ["enhancement", "performance"]
}
```

**响应示例:**
```
✅ 问题创建成功！

🐛 问题 #459: 优化搜索功能性能
📊 状态: 新建
⭐ 优先级: 高
🏷️ 标签: enhancement, performance
📅 创建时间: 2024-02-05
📁 项目: MyApp Mobile
🔗 链接: https://tree.taiga.io/project/myapp-mobile/issue/459
```

---

## 📝 用户故事管理工具

### `listUserStories`
列出项目中的所有用户故事。

**参数:**
```json
{
  "projectIdentifier": "myapp-mobile"
}
```

**响应示例:**
```
📝 MyApp Mobile 的用户故事:

✅ #101: 用户注册功能
   📊 状态: 已完成
   🏃 Sprint: Sprint 1
   ⭐ 点数: 5

🔄 #102: 社交媒体登录
   📊 状态: 进行中  
   🏃 Sprint: Sprint 2
   ⭐ 点数: 3

📋 #103: 个人资料编辑
   📊 状态: 待办
   🏃 Sprint: Sprint 3
   ⭐ 点数: 8
```

### `createUserStory`
创建新的用户故事。

**参数:**
```json
{
  "projectIdentifier": "myapp-mobile",
  "subject": "推送通知设置",
  "description": "作为用户，我希望能够自定义推送通知设置，以便控制接收的通知类型。",
  "points": 5
}
```

**响应示例:**
```
✅ 用户故事创建成功！

📝 用户故事 #104: 推送通知设置
⭐ 故事点数: 5
📊 状态: 新建
📅 创建时间: 2024-02-05
📁 项目: MyApp Mobile

📋 描述:
作为用户，我希望能够自定义推送通知设置，以便控制接收的通知类型。

🔗 链接: https://tree.taiga.io/project/myapp-mobile/us/104
```

---

## ✅ 任务管理工具

### `createTask`
创建与用户故事关联的任务。

**参数:**
```json
{
  "projectIdentifier": "myapp-mobile",
  "userStoryId": 104,
  "subject": "设计通知设置界面",
  "description": "创建通知设置页面的UI设计稿，包含各种通知类型的开关控件。"
}
```

**响应示例:**
```
✅ 任务创建成功！

✅ 任务: 设计通知设置界面
📝 关联用户故事: #104 推送通知设置
📊 状态: 新建
📅 创建时间: 2024-02-05
📁 项目: MyApp Mobile

📋 描述:
创建通知设置页面的UI设计稿，包含各种通知类型的开关控件。

🔗 链接: https://tree.taiga.io/project/myapp-mobile/task/1205
```

---

## 🎯 使用最佳实践

### 工具调用顺序

1. **项目探索**: `listProjects` → `getProject`
2. **Sprint 管理**: `listMilestones` → `getMilestoneStats`
3. **问题追踪**: `listIssues` → `getIssue` → `createIssue`
4. **故事规划**: `listUserStories` → `createUserStory` → `createTask`

### 项目标识符使用

所有需要 `projectIdentifier` 参数的工具都支持三种格式：
- **数字 ID**: `123456`
- **Slug**: `"myapp-mobile"`
- **项目名称**: `"MyApp Mobile"`

### 错误处理

所有工具都提供统一的错误响应格式：
```
❌ 错误: 项目未找到
请检查项目标识符是否正确，或确认您有访问权限。
```

### 性能建议

- 使用项目 Slug 而非名称查询（更快）
- 批量操作时建议分批处理
- 定期使用 `authenticate` 刷新认证状态

---

**💡 提示**: 所有工具都支持自然语言调用，Claude 会自动解析您的意图并调用相应的 API！