# 🏗️ Taiga MCP Server - 架构图和流程图

## 📋 架构概览

### 系统整体架构图

```mermaid
graph TB
    subgraph "客户端层"
        CD[Claude Desktop]
        MC[MCP Client]
        CLI[CLI Tools]
    end
    
    subgraph "MCP协议层"
        MCP[MCP Protocol<br/>stdio transport]
    end
    
    subgraph "Taiga MCP Server"
        subgraph "MCP层"
            IDX[index.js<br/>服务器入口]
            REG[工具注册器]
            RES[资源管理器]
        end
        
        subgraph "工具层"
            AUTH[authTools.js<br/>认证工具]
            PROJ[projectTools.js<br/>项目管理]
            SPR[sprintTools.js<br/>Sprint管理]
            ISS[issueTools.js<br/>问题管理]
            US[userStoryTools.js<br/>用户故事]
            TASK[taskTools.js<br/>任务管理]
        end
        
        subgraph "服务层"
            TS[taigaService.js<br/>API服务层]
            TA[taigaAuth.js<br/>认证管理]
        end
        
        subgraph "工具层"
            CONST[constants.js<br/>常量定义]
            UTILS[utils.js<br/>工具函数]
        end
    end
    
    subgraph "外部服务"
        TAPI[Taiga API<br/>api.taiga.io]
    end
    
    CD --> MCP
    MC --> MCP
    CLI --> MCP
    MCP --> IDX
    IDX --> REG
    IDX --> RES
    REG --> AUTH
    REG --> PROJ
    REG --> SPR
    REG --> ISS
    REG --> US
    REG --> TASK
    AUTH --> TS
    PROJ --> TS
    SPR --> TS
    ISS --> TS
    US --> TS
    TASK --> TS
    TS --> TA
    TS --> TAPI
    TS --> CONST
    TS --> UTILS
    
    classDef client fill:#e1f5fe
    classDef mcp fill:#f3e5f5
    classDef server fill:#e8f5e8
    classDef external fill:#fff3e0
    
    class CD,MC,CLI client
    class MCP mcp
    class IDX,REG,RES,AUTH,PROJ,SPR,ISS,US,TASK,TS,TA,CONST,UTILS server
    class TAPI external
```

### 模块依赖关系图

```mermaid
graph LR
    subgraph "核心层"
        IDX[index.js]
        CONST[constants.js]
        UTILS[utils.js]
    end
    
    subgraph "服务层"
        TS[taigaService.js]
        TA[taigaAuth.js]
    end
    
    subgraph "工具层"
        REG[tools/index.js]
        AUTH[tools/authTools.js]
        PROJ[tools/projectTools.js]
        SPR[tools/sprintTools.js]
        ISS[tools/issueTools.js]
        US[tools/userStoryTools.js]
        TASK[tools/taskTools.js]
    end
    
    IDX --> CONST
    IDX --> REG
    IDX --> TS
    IDX --> TA
    
    REG --> AUTH
    REG --> PROJ
    REG --> SPR
    REG --> ISS
    REG --> US
    REG --> TASK
    
    AUTH --> TA
    PROJ --> TS
    SPR --> TS
    ISS --> TS
    US --> TS
    TASK --> TS
    
    TS --> CONST
    TS --> UTILS
    TA --> CONST
    TA --> UTILS
    
    AUTH --> CONST
    PROJ --> CONST
    SPR --> CONST
    ISS --> CONST
    US --> CONST
    TASK --> CONST
    
    AUTH --> UTILS
    PROJ --> UTILS
    SPR --> UTILS
    ISS --> UTILS
    US --> UTILS
    TASK --> UTILS
```

## 🔄 核心流程图

### 1. MCP服务器启动流程

```mermaid
sequenceDiagram
    participant User
    participant Process
    participant Index
    participant Tools
    participant Service
    participant Taiga
    
    User->>Process: npm start / npx taiga-mcp-server
    Process->>Index: 启动服务器
    Index->>Index: 加载环境变量
    Index->>Index: 创建MCP服务器实例
    Index->>Index: 注册资源 (API文档, 项目列表)
    Index->>Tools: registerAllTools()
    Tools->>Tools: 注册13个MCP工具
    Index->>Service: 创建TaigaService实例
    Index->>Taiga: 预认证 (如果有凭据)
    Index->>Index: 启动stdio传输
    Index->>User: ✅ 服务器就绪
```

### 2. 工具调用流程

```mermaid
sequenceDiagram
    participant Client as MCP Client
    participant Server as MCP Server
    participant Tool as Tool Handler
    participant Service as Taiga Service
    participant API as Taiga API
    
    Client->>Server: 调用工具 (tool name + args)
    Server->>Tool: 路由到对应工具处理器
    Tool->>Tool: 验证参数 (Zod schema)
    Tool->>Service: 调用服务层方法
    Service->>Service: 检查认证状态
    alt 需要认证
        Service->>API: 认证请求
        API-->>Service: 返回token
    end
    Service->>API: API请求
    API-->>Service: API响应
    Service->>Service: 数据转换和格式化
    Service-->>Tool: 返回格式化数据
    Tool->>Tool: 创建MCP响应
    Tool-->>Server: 返回MCP响应
    Server-->>Client: 返回最终响应
```

### 3. 认证流程

```mermaid
sequenceDiagram
    participant User
    participant Auth as authTools
    participant Service as taigaAuth
    participant API as Taiga API
    
    User->>Auth: authenticate(username, password)
    Auth->>Service: authenticate()
    Service->>API: POST /auth
    alt 认证成功
        API-->>Service: 返回 auth_token
        Service->>Service: 存储token到内存
        Service-->>Auth: 认证成功
        Auth-->>User: ✅ 认证成功消息
    else 认证失败
        API-->>Service: 401 错误
        Service-->>Auth: 认证失败错误
        Auth-->>User: ❌ 认证失败消息
    end
```

### 4. 项目解析流程

```mermaid
flowchart TD
    Start([输入项目标识符]) --> IsNumber{是否为纯数字?}
    
    IsNumber -->|是| NumericID[作为项目ID查询]
    IsNumber -->|否| SlugCheck{是否包含短横线?}
    
    SlugCheck -->|是| SlugQuery[作为slug查询]
    SlugCheck -->|否| NameSearch[作为项目名称搜索]
    
    NumericID --> APICall[调用Taiga API]
    SlugQuery --> APICall
    NameSearch --> ListAll[获取所有项目列表]
    
    ListAll --> FuzzyMatch[模糊匹配项目名称]
    
    APICall --> Success{查询成功?}
    FuzzyMatch --> MatchFound{找到匹配?}
    
    Success -->|是| Return[返回项目信息]
    Success -->|否| Error[返回项目未找到错误]
    
    MatchFound -->|是| Return
    MatchFound -->|否| Error
    
    Return --> End([结束])
    Error --> End
```

## 🧪 测试架构流程

### 测试执行流程

```mermaid
flowchart TD
    Start([npm test]) --> Unit[单元测试 unitTest.js]
    Unit --> UnitResult{单元测试结果}
    
    UnitResult -->|通过| Quick[快速测试 quickTest.js]
    UnitResult -->|失败| UnitFail[❌ 单元测试失败]
    
    Quick --> QuickResult{快速测试结果}
    
    QuickResult -->|通过| Success[✅ 所有测试通过]
    QuickResult -->|失败| QuickFail[❌ 快速测试失败]
    
    Start --> FullTest{运行完整测试?}
    FullTest -->|是| TestFull[npm run test:full]
    
    TestFull --> Basic[MCP协议测试]
    Basic --> Integration[集成测试]
    Integration --> Report[生成测试报告]
    
    UnitFail --> End([测试结束])
    QuickFail --> End
    Success --> End
    Report --> End
```

### 测试层级关系

```mermaid
graph TB
    subgraph "测试金字塔"
        subgraph "E2E层"
            INT[integration.js<br/>真实API测试]
        end
        
        subgraph "协议层"
            MCP[mcpTest.js<br/>MCP协议测试]
        end
        
        subgraph "功能层"
            QUICK[quickTest.js<br/>快速功能测试]
        end
        
        subgraph "单元层"
            UNIT[unitTest.js<br/>单元测试]
        end
    end
    
    subgraph "测试目标"
        API[API兼容性]
        PROTOCOL[协议兼容性]
        FUNCTION[功能正确性]
        LOGIC[逻辑正确性]
    end
    
    INT --> API
    MCP --> PROTOCOL
    QUICK --> FUNCTION
    UNIT --> LOGIC
    
    classDef e2e fill:#ffebee
    classDef protocol fill:#f3e5f5
    classDef functional fill:#e8f5e8
    classDef unit fill:#e3f2fd
    
    class INT e2e
    class MCP protocol
    class QUICK functional
    class UNIT unit
```

## 🚀 部署架构

### NPM包分发架构

```mermaid
graph TB
    subgraph "开发环境"
        DEV[本地开发]
        TEST[测试验证]
        BUILD[构建打包]
    end
    
    subgraph "发布流程"
        VER[版本更新]
        PUB[npm publish]
        REG[npm registry]
    end
    
    subgraph "用户环境"
        NPX[npx taiga-mcp-server]
        GLOBAL[npm install -g]
        LOCAL[npm install]
    end
    
    subgraph "Claude Desktop"
        CONFIG[config.json配置]
        MCP[MCP集成]
    end
    
    DEV --> TEST
    TEST --> BUILD
    BUILD --> VER
    VER --> PUB
    PUB --> REG
    
    REG --> NPX
    REG --> GLOBAL
    REG --> LOCAL
    
    NPX --> CONFIG
    GLOBAL --> CONFIG
    LOCAL --> CONFIG
    CONFIG --> MCP
```

### Docker容器化架构 (规划中)

```mermaid
graph TB
    subgraph "Docker镜像"
        BASE[node:20-alpine]
        APP[应用代码]
        DEPS[依赖包]
    end
    
    subgraph "容器运行时"
        CONT[容器实例]
        ENV[环境变量]
        STDIO[stdio接口]
    end
    
    subgraph "编排层"
        COMPOSE[docker-compose]
        K8S[Kubernetes]
        SWARM[Docker Swarm]
    end
    
    BASE --> APP
    APP --> DEPS
    DEPS --> CONT
    ENV --> CONT
    CONT --> STDIO
    
    STDIO --> COMPOSE
    STDIO --> K8S
    STDIO --> SWARM
```

## 📊 数据流架构

### 请求-响应数据流

```mermaid
sequenceDiagram
    participant U as User
    participant C as Claude Desktop
    participant M as MCP Server
    participant T as Tool Handler
    participant S as Service Layer
    participant A as Taiga API
    
    U->>C: "列出所有项目"
    C->>M: listProjects MCP调用
    M->>T: 路由到projectTools
    T->>S: taigaService.listProjects()
    S->>A: GET /projects
    A-->>S: JSON项目数据
    S->>S: 格式化为用户友好文本
    S-->>T: 格式化响应
    T-->>M: MCP响应结构
    M-->>C: 标准MCP响应
    C-->>U: 自然语言展示
```

### 错误处理流程

```mermaid
flowchart TD
    Start([API调用]) --> Try{尝试API请求}
    
    Try --> Success[请求成功]
    Try --> Error[请求失败]
    
    Error --> CheckStatus{检查错误状态}
    
    CheckStatus -->|401| AuthError[认证错误]
    CheckStatus -->|404| NotFound[资源未找到]
    CheckStatus -->|403| Permission[权限不足]
    CheckStatus -->|500| Server[服务器错误]
    CheckStatus -->|其他| Network[网络错误]
    
    AuthError --> AuthMsg[❌ 认证失败消息]
    NotFound --> NotFoundMsg[❌ 资源未找到消息]
    Permission --> PermMsg[❌ 权限不足消息]
    Server --> ServerMsg[❌ 服务器错误消息]
    Network --> NetworkMsg[❌ 网络错误消息]
    
    Success --> Format[格式化成功响应]
    
    AuthMsg --> Return[返回错误响应]
    NotFoundMsg --> Return
    PermMsg --> Return
    ServerMsg --> Return
    NetworkMsg --> Return
    Format --> ReturnSuccess[返回成功响应]
    
    Return --> End([结束])
    ReturnSuccess --> End
```

## 🔧 扩展架构

### 工具扩展流程

```mermaid
flowchart TD
    Start([需要新工具]) --> Design[设计工具接口]
    
    Design --> Schema[定义Zod参数schema]
    Schema --> Handler[实现工具处理器]
    Handler --> Service[扩展服务层方法]
    Service --> Constants[添加相关常量]
    Constants --> Register[在tools/index.js注册]
    Register --> Test[编写测试用例]
    Test --> Document[更新API文档]
    Document --> End([完成扩展])
```

### 性能优化架构

```mermaid
graph TB
    subgraph "性能监控"
        METRICS[性能指标收集]
        LOG[结构化日志]
        TRACE[请求追踪]
    end
    
    subgraph "优化策略"
        CACHE[智能缓存]
        POOL[连接池]
        BATCH[批量处理]
        LAZY[懒加载]
    end
    
    subgraph "扩展能力"
        CLUSTER[集群部署]
        LB[负载均衡]
        CDN[内容分发]
    end
    
    METRICS --> CACHE
    LOG --> POOL
    TRACE --> BATCH
    
    CACHE --> CLUSTER
    POOL --> LB
    BATCH --> CDN
    LAZY --> CDN
```

---

这些架构图和流程图提供了Taiga MCP Server的完整技术视图，帮助开发者理解系统设计思路和实现细节，为后续的维护和扩展提供清晰的指导。