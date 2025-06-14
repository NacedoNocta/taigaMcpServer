# 🚀 Taiga MCP Server

A powerful **Model Context Protocol (MCP)** server that enables natural language interaction with **Taiga project management** systems. Seamlessly manage your projects, sprints, user stories, tasks, and issues through conversational AI.

> 🤖 **AI-Powered Development**: This project was developed collaboratively with **Claude Code** (claude.ai/code), showcasing the potential of AI-assisted software development.

[![npm version](https://badge.fury.io/js/taiga-mcp-server.svg)](https://badge.fury.io/js/taiga-mcp-server)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)
[![GitHub](https://img.shields.io/badge/GitHub-taigaMcpServer-blue?logo=github)](https://github.com/greddy7574/taigaMcpServer)

## ✨ Features

### 📊 Complete Project Management
- **Projects**: List and view project details
- **Sprints**: Create, list, and track sprint progress with detailed statistics
- **User Stories**: Create and manage user stories within projects
- **Tasks**: Create tasks linked to user stories
- **Issues**: Full issue lifecycle management with sprint associations

### 🔗 Advanced Sprint-Issue Tracking
- View issues by sprint with complete relationship mapping
- Get detailed issue information including sprint assignments
- Track sprint progress with completion statistics
- Real-time status updates and progress monitoring

### 🚀 Batch Operations (NEW!)
- **Batch Create Issues**: Create multiple issues in one operation (up to 20)
- **Batch Create User Stories**: Bulk create user stories with story points
- **Batch Create Tasks**: Mass create tasks for specific user stories
- **Smart Error Handling**: Individual failures don't affect other items
- **Detailed Reporting**: Success/failure status for each item

### 💬 Natural Language Interface
- **"List all projects"**
- **"Show me Sprint 5 progress statistics"**
- **"Create a high-priority bug issue in project X"**
- **"Which issues are assigned to Sprint 3?"**
- **"Get details for issue #123"**

## 🛠️ Installation & Setup

### Prerequisites
- **Node.js** (v14 or higher) - [Download here](https://nodejs.org)
- **Taiga account** with API access

### Option 1: NPX (Recommended)
No installation required - runs latest version automatically:

```bash
# NPM Registry (official)
npx taiga-mcp-server

# GitHub Package Registry (alternative)
npx @greddy7574/taiga-mcp-server
```

### Option 2: Global Installation
```bash
# From NPM Registry
npm install -g taiga-mcp-server
taiga-mcp

# From GitHub Packages
npm install -g @greddy7574/taiga-mcp-server
```

### Option 3: Docker Deployment
```bash
# Build the image
docker build -t taiga-mcp-server .

# Run with environment file
docker run --rm -i --env-file .env taiga-mcp-server

# Or with environment variables
docker run --rm -i \
  -e TAIGA_API_URL=https://api.taiga.io/api/v1 \
  -e TAIGA_USERNAME=your_username \
  -e TAIGA_PASSWORD=your_password \
  taiga-mcp-server

# Using docker-compose
docker-compose up --build
```

## ⚙️ Configuration

### Claude Desktop Integration

#### NPX Method (Recommended)
Add to your Claude Desktop `config.json`:

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

#### Docker Method
```json
{
  "mcpServers": {
    "taiga-mcp": {
      "command": "docker",
      "args": [
        "run", 
        "--rm", 
        "-i",
        "-e", "TAIGA_API_URL=https://api.taiga.io/api/v1",
        "-e", "TAIGA_USERNAME=your_username",
        "-e", "TAIGA_PASSWORD=your_password",
        "taiga-mcp-server:latest"
      ]
    }
  }
}
```

#### Docker Compose Method
```json
{
  "mcpServers": {
    "taiga-mcp": {
      "command": "docker-compose",
      "args": [
        "-f", "/path/to/project/docker-compose.yml",
        "run", "--rm", "taiga-mcp-server"
      ],
      "cwd": "/path/to/project"
    }
  }
}
```

### Custom Taiga Instance
For self-hosted Taiga instances:

```json
{
  "env": {
    "TAIGA_API_URL": "https://your-taiga-domain.com/api/v1",
    "TAIGA_USERNAME": "your_username",
    "TAIGA_PASSWORD": "your_password"
  }
}
```

## 🎯 Usage Examples

### Sprint Management
```
🗣️ "Show me all sprints in project MyApp"
📊 Returns: List of sprints with status and dates

🗣️ "Get detailed statistics for Sprint 5"  
📈 Returns: Progress stats, completion rates, user stories count

🗣️ "Create a new sprint called 'Q1 Release' from 2024-01-01 to 2024-03-31"
✅ Returns: Created sprint details
```

### Issue Tracking
```
🗣️ "List all issues in project MyApp"
📋 Returns: Issues with sprint assignments and status

🗣️ "Show me issue #123 details"
🔍 Returns: Complete issue info including sprint, assignee, timeline

🗣️ "What issues are in Sprint 3?"
📋 Returns: All issues assigned to that sprint
```

### Project Management
```
🗣️ "Create a high-priority bug issue: 'Login page not working'"
🐛 Returns: Created issue with details

🗣️ "List all user stories in project MyApp"
📝 Returns: User stories with status and assignments

🗣️ "Create these 5 issues in batch: Bug1, Bug2, Feature1, Task1, Task2"
🚀 Returns: Batch creation results with individual success/failure status
```

### Batch Operations Examples
```
🗣️ "Batch create these issues in MyApp:
- Bug: Login page broken (High priority)
- Feature: Add search functionality (Medium priority) 
- Task: Update documentation (Low priority)"
📊 Returns: Created 3/3 issues successfully with reference numbers

🗣️ "Batch create user stories:
- User registration flow (5 points)
- Password reset feature (3 points)
- Email notifications (2 points)"
📋 Returns: Created 3/3 user stories with story point assignments
```

## 🔧 Available Tools

| Tool | Description |
|------|-------------|
| `listProjects` | Get all accessible projects |
| `getProject` | View detailed project information |
| `listMilestones` | List all sprints in a project |
| `getMilestoneStats` | Get sprint progress and statistics |
| `createMilestone` | Create new sprints with dates |
| `listUserStories` | View user stories in a project |
| `createUserStory` | Create new user stories |
| `listIssues` | List issues with sprint info |
| `getIssue` | Get detailed issue information |
| `getIssuesByMilestone` | View all issues in a sprint |
| `createIssue` | Create issues with priorities/types |
| `createTask` | Create tasks linked to user stories |
| `batchCreateIssues` | **NEW!** Batch create multiple issues (up to 20) |
| `batchCreateUserStories` | **NEW!** Batch create multiple user stories |
| `batchCreateTasks` | **NEW!** Batch create multiple tasks for a user story |

## 🚀 Why Choose Taiga MCP Server?

- **🔥 Zero Setup**: Works immediately with npx
- **🧠 AI-Native**: Built specifically for conversational project management
- **🔗 Complete Integration**: Full Taiga API coverage
- **📊 Rich Data**: Detailed progress tracking and statistics
- **🎯 Sprint-Focused**: Advanced sprint-issue relationship tracking  
- **🛡️ Secure**: Environment-based credential management
- **🚀 Batch Operations**: Efficient bulk operations for large projects

## 🙏 Acknowledgments

### Attribution and Legal Notice
This project was **inspired by** [mcpTAIGA](https://github.com/adriapedralbes/mcpTAIGA) by [adriapedralbes](https://github.com/adriapedralbes). This version represents a substantial rewrite and reimplementation with entirely new architecture, features, and functionality while using the same ISC license terms.

### AI-Assisted Development
🤖 **Developed with Claude Code**: This entire project was collaboratively developed with [Claude Code](https://claude.ai/code), demonstrating the power of AI-assisted software development. The architecture, implementation, testing, and documentation were all created through human-AI collaboration.

### Key Enhancements
From the original basic concept, this version expanded to include:

- **Complete Architectural Redesign**: Professional modular tool system (v1.5.0+)
- **10x+ Code Expansion**: From basic functionality to enterprise-grade project management
- **Advanced Sprint Management**: Complete milestone tracking with detailed statistics
- **Enhanced Issue Management**: Full issue lifecycle with sprint associations  
- **Professional Code Quality**: Error handling, formatting, comprehensive testing
- **Comprehensive Documentation**: Professional guides and examples
- **NPM Distribution**: Easy installation and deployment

**Original concept**: Basic Taiga MCP connectivity  
**This implementation**: Full-featured Taiga project management suite with entirely new architecture

This reimplementation acknowledges the foundational concept while showcasing the collaborative potential of AI-assisted software development.

## 📚 Documentation

**Complete documentation is available on our [GitHub Wiki](https://github.com/greddy7574/taigaMcpServer/wiki) 📖**

### 🌐 Multi-Language Support

Our documentation is available in three languages:

- **🇺🇸 [English](https://github.com/greddy7574/taigaMcpServer/wiki/Home.en)** - Complete English documentation
- **🇨🇳 [简体中文](https://github.com/greddy7574/taigaMcpServer/wiki/Home.zh-CN)** - 完整的简体中文文档
- **🇹🇼 [繁體中文](https://github.com/greddy7574/taigaMcpServer/wiki/Home.zh-TW)** - 完整的繁體中文文件

### 🎯 Quick Navigation

| Section | English                                                                               | 简体中文                                                                              | 繁體中文                                                                            |
|---------|---------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------|---------------------------------------------------------------------------------|
| **Getting Started** | [Installation Guide](https://github.com/greddy7574/taigaMcpServer/wiki/Installation.en) | [安装指南](https://github.com/greddy7574/taigaMcpServer/wiki/Installation.zh-CN)      | [安裝指南](https://github.com/greddy7574/taigaMcpServer/wiki/Installation.zh-TW)    |
| **API Reference** | [API Reference](https://github.com/greddy7574/taigaMcpServer/wiki/API-Reference.en)   | [API 参考](https://github.com/greddy7574/taigaMcpServer/wiki/API-Reference.zh-CN)   | [API 參考](https://github.com/greddy7574/taigaMcpServer/wiki/API-Reference.zh-TW) |
| **Architecture** | [Architecture](https://github.com/greddy7574/taigaMcpServer/wiki/ARCHITECTURE.en)   | [架构概览](https://github.com/greddy7574/taigaMcpServer/wiki/ARCHITECTURE.zh-CN) | [架構概覽](https://github.com/greddy7574/taigaMcpServer/wiki/ARCHITECTURE.zh-TW)    |
| **CI/CD Guide** | [CI/CD Guide](https://github.com/greddy7574/taigaMcpServer/wiki/CICD.en)            | [CI/CD 指南](https://github.com/greddy7574/taigaMcpServer/wiki/CICD.zh-CN)          | [CI/CD 指南](https://github.com/greddy7574/taigaMcpServer/wiki/CICD.zh-TW)        |

### 👩‍💻 Developer Resources

| Topic | English                                                                             | 简体中文                                                                       | 繁體中文                                                                       |
|-------|-------------------------------------------------------------------------------------|----------------------------------------------------------------------------|----------------------------------------------------------------------------|
| **Design Document** | [Design](https://github.com/greddy7574/taigaMcpServer/wiki/DESIGN.en)               | [设计文档](https://github.com/greddy7574/taigaMcpServer/wiki/DESIGN.zh-CN)     | [設計文件](https://github.com/greddy7574/taigaMcpServer/wiki/DESIGN.zh-TW)     |
| **First Steps** | [First Steps](https://github.com/greddy7574/taigaMcpServer/wiki/First-Steps.en)     | [第一步](https://github.com/greddy7574/taigaMcpServer/wiki/First-Steps.zh-CN) | [第一步](https://github.com/greddy7574/taigaMcpServer/wiki/First-Steps.zh-TW) |
| **Configuration** | [Configuration](https://github.com/greddy7574/taigaMcpServer/wiki/Configuration.en) | [配置说明](https://github.com/greddy7574/taigaMcpServer/wiki/Configuration.zh-CN)   | [設定說明](https://github.com/greddy7574/taigaMcpServer/wiki/Configuration.zh-TW)   |

> 💡 **Tip**: The Wiki provides better search, navigation, and mobile experience!

## 🚀 Automated Publishing

This project features a fully automated CI/CD pipeline:

```bash
npm version patch              # Create new version
git push origin main --tags    # Trigger automated publishing
```

**Automated Flow**: Tests → NPM Publish → GitHub Packages → Release Creation  
**Dual Registry Support**: Available on both NPM and GitHub Package Registry  
**Full Documentation**: See [CI/CD Guide](https://github.com/greddy7574/taigaMcpServer/wiki/CICD.en) for complete setup

## 🤝 Contributing

Issues and pull requests are welcome! Please visit our [GitHub repository](https://github.com/greddy7574/taigaMcpServer) to contribute.

## 📄 License

ISC License - This project is licensed under the ISC License, same as the original [mcpTAIGA](https://github.com/adriapedralbes/mcpTAIGA).

### Project Information
- **Original Inspiration**: [adriapedralbes](https://github.com/adriapedralbes) / [mcpTAIGA](https://github.com/adriapedralbes/mcpTAIGA)
- **This Implementation**: Substantial rewrite by greddy7574@gmail.com with AI assistance from Claude Code
- **License**: ISC License
- **Architecture**: Entirely new modular design with 10x+ expanded functionality

---

**Enhanced with ❤️ for agile teams using Taiga project management**
