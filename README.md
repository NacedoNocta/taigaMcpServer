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
npx taiga-mcp-server
```

### Option 2: Global Installation
```bash
npm install -g taiga-mcp-server
taiga-mcp
```

## ⚙️ Configuration

### Claude Desktop Integration

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

## 🚀 Why Choose Taiga MCP Server?

- **🔥 Zero Setup**: Works immediately with npx
- **🧠 AI-Native**: Built specifically for conversational project management
- **🔗 Complete Integration**: Full Taiga API coverage
- **📊 Rich Data**: Detailed progress tracking and statistics
- **🎯 Sprint-Focused**: Advanced sprint-issue relationship tracking
- **🛡️ Secure**: Environment-based credential management

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