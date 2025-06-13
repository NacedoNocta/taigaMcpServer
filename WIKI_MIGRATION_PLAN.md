# 📚 GitHub Wiki 迁移计划

## 🎯 迁移目标

将 `docs/` 目录中的完整文档体系迁移到 GitHub Wiki，提供更好的在线浏览体验。

## 📋 Wiki 页面结构

### 1. Home (首页)
**文件**: `Home.md`
**来源**: `docs/README.md` + 项目介绍
**内容**:
```markdown
# 🚀 Taiga MCP Server Wiki

欢迎来到 Taiga MCP Server 的完整文档中心！

## 快速开始
- [安装指南](Installation-Guide)
- [配置说明](Configuration)
- [使用示例](Usage-Examples)

## 核心文档
- [📋 API 参考](API-Reference)
- [🏗️ 架构设计](Architecture-Design)
- [🚀 CI/CD 自动化](CICD-Automation)

## 开发指南
- [开发环境设置](Development-Setup)
- [测试框架](Testing-Framework)
- [贡献指南](Contributing)
```

### 2. API Reference
**文件**: `API-Reference.md`
**来源**: `docs/API.md`
**Wiki 格式**: 保持原有结构，添加目录导航

### 3. Architecture Design  
**文件**: `Architecture-Design.md`
**来源**: `docs/DESIGN.md`
**Wiki 格式**: 分节展示，添加图表支持

### 4. CICD Automation
**文件**: `CICD-Automation.md`
**来源**: `docs/CICD.md`
**Wiki 格式**: 步骤化指南，添加流程图

### 5. Installation Guide
**文件**: `Installation-Guide.md`
**来源**: `README.md` 安装部分
**内容**: 详细的安装和配置步骤

### 6. Development Setup
**文件**: `Development-Setup.md`
**来源**: `CLAUDE.md` 开发部分
**内容**: 完整的开发环境配置

### 7. Testing Framework
**文件**: `Testing-Framework.md`
**来源**: `test/README.md`
**内容**: 测试策略和执行指南

## 🔧 迁移步骤

### 第一阶段：创建基础结构

1. **访问 Wiki**: https://github.com/greddy7574/taigaMcpServer/wiki

2. **创建 Home 页面**:
   - 点击 "Create the first page"
   - 设置页面标题为 "Home"
   - 复制首页内容

3. **创建侧边栏**:
   - 创建 `_Sidebar.md` 页面
   - 添加导航链接

### 第二阶段：迁移核心文档

1. **API Reference**: 完整复制 `docs/API.md`
2. **Architecture Design**: 复制 `docs/DESIGN.md`
3. **CI/CD Automation**: 复制 `docs/CICD.md`

### 第三阶段：创建专门页面

1. **Installation Guide**: 从 README.md 提取
2. **Development Setup**: 从 CLAUDE.md 提取  
3. **Testing Framework**: 从 test/README.md 提取

### 第四阶段：优化和链接

1. **内部链接**: 更新所有内部引用
2. **图片资源**: 上传和链接图片
3. **交叉引用**: 建立页面间链接
4. **搜索优化**: 添加关键词和标签

## 📝 Wiki 侧边栏结构

```markdown
## 🚀 Taiga MCP Server

### 快速开始
- [安装指南](Installation-Guide)
- [配置说明](Configuration)  
- [使用示例](Usage-Examples)

### 📚 核心文档
- [API 参考](API-Reference)
- [架构设计](Architecture-Design)
- [CI/CD 自动化](CICD-Automation)

### 🛠️ 开发指南
- [开发环境](Development-Setup)
- [测试框架](Testing-Framework)
- [贡献指南](Contributing)

### 📊 项目信息
- [版本历史](Version-History)
- [性能指标](Performance-Metrics)
- [FAQ](FAQ)
```

## 🔗 更新现有文档引用

### README.md 更新
```markdown
## 📚 完整文档

访问我们的 [GitHub Wiki](https://github.com/greddy7574/taigaMcpServer/wiki) 获取完整文档：

- 📋 [API 参考](https://github.com/greddy7574/taigaMcpServer/wiki/API-Reference)
- 🏗️ [架构设计](https://github.com/greddy7574/taigaMcpServer/wiki/Architecture-Design)  
- 🚀 [CI/CD 自动化](https://github.com/greddy7574/taigaMcpServer/wiki/CICD-Automation)
```

### CLAUDE.md 更新
```markdown
## 📚 扩展文档

详细文档请参考项目 Wiki：
https://github.com/greddy7574/taigaMcpServer/wiki
```

## ✅ 迁移优势

1. **更好的导航**: Wiki 提供自动侧边栏和搜索
2. **在线编辑**: 可以直接在 GitHub 上编辑
3. **版本控制**: Wiki 有独立的 git 历史
4. **移动友好**: 更好的移动设备浏览体验
5. **搜索功能**: GitHub 原生搜索支持
6. **协作编辑**: 团队成员可以轻松贡献

## 🎯 执行时间估算

- **基础设置**: 30分钟
- **内容迁移**: 2小时  
- **链接优化**: 1小时
- **测试验证**: 30分钟

**总计**: ~4小时完成完整迁移

## 📋 迁移检查清单

- [ ] 启用 GitHub Wiki
- [ ] 创建 Home 页面
- [ ] 设置侧边栏导航
- [ ] 迁移 API Reference  
- [ ] 迁移 Architecture Design
- [ ] 迁移 CI/CD Automation
- [ ] 创建 Installation Guide
- [ ] 创建 Development Setup
- [ ] 创建 Testing Framework
- [ ] 更新 README.md 引用
- [ ] 更新 CLAUDE.md 引用
- [ ] 测试所有链接
- [ ] 验证搜索功能

---

**🚀 完成后，项目将拥有专业级的在线文档体系！**