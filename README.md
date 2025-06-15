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

### 🚀 Batch Operations
- **Batch Create Issues**: Create multiple issues in one operation (up to 20)
- **Batch Create User Stories**: Bulk create user stories with story points
- **Batch Create Tasks**: Mass create tasks for specific user stories
- **Smart Error Handling**: Individual failures don't affect other items
- **Detailed Reporting**: Success/failure status for each item

### 🔍 Advanced Query Syntax
- **SQL-like Query Language**: Use `field:operator:value` syntax for precise searches
- **Logical Operators**: Combine conditions with AND, OR, NOT
- **Text Matching**: Fuzzy search, wildcards, and substring matching
- **Date Ranges**: Flexible time-based queries (today, last_week, >7d)
- **Sorting & Limiting**: ORDER BY and LIMIT clauses for result control

### 💬 Team Collaboration System
- **Comment Management**: Add, view, edit, and delete comments on any work item
- **Discussion Threads**: Complete comment history with user information
- **Team Communication**: Enhanced collaboration through structured discussions
- **Real-time Updates**: Immediate comment synchronization across team

### 📎 File Attachment Management
- **File Upload**: Attach documents, images, and resources to work items
- **Multi-format Support**: Support for all major file types
- **Download Management**: Efficient file download with path management
- **Storage Organization**: Clean attachment management with descriptions

### 🏛️ Epic Management (Enterprise)
- **Large-scale Organization**: Create and manage Epic-level project components
- **Hierarchical Structure**: Link User Stories to Epics for complete project visibility
- **Progress Tracking**: Epic-level progress statistics and completion tracking
- **Enterprise Planning**: Support for roadmap planning and feature releases

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

### Advanced Query Examples
```
🗣️ "Find all high priority bugs assigned to john: status:open AND priority:high AND assignee:john AND type:bug"
📊 Returns: Filtered list of critical bugs needing attention

🗣️ "Show user stories with 5+ points created this week: points:>=5 AND created:this_week ORDER BY points DESC"
📈 Returns: High-value stories with detailed point breakdown

🗣️ "Search for API-related tasks: subject:contains:\"API\" OR description:contains:\"API\" LIMIT 10"
🔍 Returns: All tasks mentioning API with relevance ranking
```

### Comment System Examples
```
🗣️ "Add comment to issue #123: 'This needs more testing before deployment'"
💬 Returns: Comment added successfully with timestamp and user info

🗣️ "Show me all comments for user story #456"
📝 Returns: Complete comment history with user names and dates

🗣️ "Edit comment #789 to say 'Updated implementation approach'"
✏️ Returns: Comment updated successfully with new content

🗣️ "Delete comment #321"
🗑️ Returns: Comment removed from the discussion thread
```

### File Attachment Examples
```
🗣️ "Upload design.pdf to user story #456 with description 'UI mockup v2'"
📎 Returns: File uploaded successfully with size and metadata

🗣️ "List all attachments for issue #789"
📂 Returns: Complete attachment list with filenames, sizes, and upload dates

🗣️ "Download attachment #123 to /Downloads/documents/"
⬇️ Returns: File downloaded successfully to specified location

🗣️ "Delete attachment #456"
🗑️ Returns: Attachment removed from the project
```

### Epic Management Examples
```
🗣️ "Create epic 'API v2.0 Migration' in project MyApp with description 'Complete API redesign'"
🏛️ Returns: Epic created with ID, color, and project association

🗣️ "List all epics in project MyApp"
📋 Returns: Epic list with progress stats and linked user stories count

🗣️ "Get details for epic #789"
📊 Returns: Epic overview with progress, status, and linked user stories

🗣️ "Link user story #456 to epic #789"
🔗 Returns: Story successfully linked to epic for better organization

🗣️ "Update epic #789 status to 'In Progress' and add tag 'backend'"
✏️ Returns: Epic updated with new status and organizational tags
```

## 🔧 Available Tools (33 Total)

### 🔐 Authentication (1 tool)
| Tool | Description |
|------|-------------|
| `authenticate` | Authenticate with Taiga API |

### 📁 Project Management (2 tools)
| Tool | Description |
|------|-------------|
| `listProjects` | Get all accessible projects |
| `getProject` | View detailed project information |

### 🏃 Sprint Management (4 tools)
| Tool | Description |
|------|-------------|
| `listMilestones` | List all sprints in a project |
| `getMilestoneStats` | Get sprint progress and statistics |
| `createMilestone` | Create new sprints with dates |
| `getIssuesByMilestone` | View all issues in a sprint |

### 🐛 Issue Management (3 tools)
| Tool | Description |
|------|-------------|
| `listIssues` | List issues with sprint info |
| `getIssue` | Get detailed issue information |
| `createIssue` | Create issues with priorities/types |

### 📝 User Story Management (2 tools)
| Tool | Description |
|------|-------------|
| `listUserStories` | View user stories in a project |
| `createUserStory` | Create new user stories |

### ✅ Task Management (1 tool)
| Tool | Description |
|------|-------------|
| `createTask` | Create tasks linked to user stories |

### 🚀 Batch Operations (3 tools)
| Tool | Description |
|------|-------------|
| `batchCreateIssues` | Batch create multiple issues (up to 20) |
| `batchCreateUserStories` | Batch create multiple user stories |
| `batchCreateTasks` | Batch create multiple tasks for a user story |

### 🔍 Advanced Search (3 tools)
| Tool | Description |
|------|-------------|
| `advancedSearch` | Execute advanced SQL-like queries |
| `queryHelp` | Get query syntax help and examples |
| `validateQuery` | Validate query syntax before execution |

### 💬 Comment System (4 tools)
| Tool | Description |
|------|-------------|
| `addComment` | Add comments to issues, stories, or tasks |
| `listComments` | View comment history for items |
| `editComment` | Edit existing comments |
| `deleteComment` | Delete comments |

### 📎 File Attachments (4 tools)
| Tool | Description |
|------|-------------|
| `uploadAttachment` | Upload files to issues, stories, or tasks |
| `listAttachments` | View attachment list for items |
| `downloadAttachment` | Download attachments by ID |
| `deleteAttachment` | Delete attachments |

### 🏛️ Epic Management (6 tools)
| Tool | Description |
|------|-------------|
| `createEpic` | Create large-scale Epic features |
| `listEpics` | List all Epics in a project |
| `getEpic` | Get Epic details and progress stats |
| `updateEpic` | Update Epic information and status |
| `linkStoryToEpic` | Link User Stories to Epics |
| `unlinkStoryFromEpic` | Remove Story-Epic associations |

## 🚀 Why Choose Taiga MCP Server?

- **🔥 Zero Setup**: Works immediately with npx
- **🧠 AI-Native**: Built specifically for conversational project management
- **🔗 Complete Integration**: Full Taiga API coverage with 33 tools
- **📊 Rich Data**: Detailed progress tracking and statistics
- **🎯 Sprint-Focused**: Advanced sprint-issue relationship tracking  
- **🛡️ Secure**: Environment-based credential management
- **🚀 Batch Operations**: Efficient bulk operations for large projects
- **💬 Team Collaboration**: Complete comment system for enhanced communication
- **📎 File Management**: Full attachment lifecycle with multi-format support
- **🏛️ Enterprise-Ready**: Epic management for large-scale project organization
- **🔍 Advanced Search**: SQL-like query syntax for complex data filtering

## 🙏 Acknowledgments

### Attribution and Legal Notice
This project was **inspired by** [mcpTAIGA](https://github.com/adriapedralbes/mcpTAIGA) by [adriapedralbes](https://github.com/adriapedralbes). This version represents a substantial rewrite and reimplementation with entirely new architecture, features, and functionality while using the same ISC license terms.

### AI-Assisted Development
🤖 **Developed with Claude Code**: This entire project was collaboratively developed with [Claude Code](https://claude.ai/code), demonstrating the power of AI-assisted software development. The architecture, implementation, testing, and documentation were all created through human-AI collaboration.

### Key Enhancements
From the original basic concept, this version expanded to include:

- **Complete Architectural Redesign**: Professional modular tool system (v1.5.0+)
- **33 MCP Tools**: From basic functionality to enterprise-grade project management
- **Advanced Sprint Management**: Complete milestone tracking with detailed statistics
- **Enhanced Issue Management**: Full issue lifecycle with sprint associations  
- **Batch Operations**: Efficient bulk creation for large-scale projects (v1.6.0)
- **Advanced Query System**: SQL-like syntax for complex data filtering (v1.6.1)
- **Team Collaboration**: Complete comment system for enhanced communication (v1.7.0)
- **File Management**: Full attachment lifecycle with multi-format support (v1.7.1)
- **Epic Management**: Enterprise-grade large-scale project organization (v1.8.0)
- **Professional Code Quality**: Error handling, formatting, comprehensive testing
- **Comprehensive Documentation**: Professional guides and examples in 3 languages
- **Automated CI/CD**: Dual registry publishing with complete automation

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
- **Architecture**: Entirely new modular design with 33 MCP tools across 11 categories
- **Current Version**: v1.8.0 - Enterprise Integration Edition with Epic Management

---

**Enhanced with ❤️ for agile teams using Taiga project management**
