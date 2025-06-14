/**
 * Constants and configuration for Taiga MCP Server
 */

export const SERVER_INFO = {
  name: 'Taiga MCP',
  version: '1.2.2',
};

export const RESOURCE_URIS = {
  API_DOCS: 'docs://taiga/api',
  PROJECTS: 'taiga://projects',
};

export const ERROR_MESSAGES = {
  AUTHENTICATION_FAILED: 'Authentication failed',
  PROJECT_NOT_FOUND: 'Project not found',
  ISSUE_NOT_FOUND: 'Issue not found',
  SPRINT_NOT_FOUND: 'Sprint not found',
  INVALID_REFERENCE: 'Invalid reference format',
  MISSING_PROJECT_ID: 'Project identifier is required when using reference number',
  FAILED_TO_LIST_PROJECTS: 'Failed to list projects from Taiga',
  FAILED_TO_CREATE_USER_STORY: 'Failed to create user story in Taiga',
  FAILED_TO_CREATE_TASK: 'Failed to create task in Taiga',
  FAILED_TO_CREATE_ISSUE: 'Failed to create issue in Taiga',
  FAILED_TO_CREATE_SPRINT: 'Failed to create sprint in Taiga',
  FAILED_TO_LIST_USER_STORIES: 'Failed to list user stories from Taiga',
  FAILED_TO_LIST_ISSUES: 'Failed to list issues from Taiga',
  FAILED_TO_LIST_SPRINTS: 'Failed to list sprints from Taiga',
  FAILED_TO_GET_PROJECT: 'Failed to get project details from Taiga',
  FAILED_TO_GET_ISSUE: 'Failed to get issue details from Taiga',
  FAILED_TO_GET_SPRINT: 'Failed to get sprint details from Taiga',
  FAILED_TO_GET_SPRINT_STATS: 'Failed to get sprint statistics from Taiga',
};

export const SUCCESS_MESSAGES = {
  AUTHENTICATED: 'Successfully authenticated',
  USER_STORY_CREATED: 'User story created successfully!',
  TASK_CREATED: 'Task created successfully!',
  ISSUE_CREATED: 'Issue created successfully!',
  SPRINT_CREATED: 'Sprint created successfully!',
};

export const BATCH_OPERATIONS = {
  MAX_BATCH_SIZE: 20,
  ERROR_EMPTY_BATCH: 'Batch array cannot be empty',
  ERROR_BATCH_TOO_LARGE: 'Batch size exceeds maximum limit',
  SUCCESS_BATCH_CREATED_ISSUES: '🚀 批次Issues創建完成',
  SUCCESS_BATCH_CREATED_STORIES: '🚀 批次User Stories創建完成', 
  SUCCESS_BATCH_CREATED_TASKS: '🚀 批次Tasks創建完成',
  BATCH_OPERATION_START: '開始批次操作...',
  BATCH_OPERATION_COMPLETE: '批次操作完成！',
};

export const ADVANCED_QUERY = {
  MAX_RESULTS: 1000,
  DEFAULT_LIMIT: 50,
  MAX_COMPLEXITY: 10,
  TIMEOUT_MS: 30000,
  
  // 查詢錯誤信息
  ERROR_EMPTY_QUERY: 'Query string cannot be empty',
  ERROR_INVALID_SYNTAX: 'Invalid query syntax',
  ERROR_UNSUPPORTED_FIELD: 'Unsupported field for this data type',
  ERROR_INVALID_OPERATOR: 'Invalid operator',
  ERROR_INVALID_VALUE: 'Invalid value for field',
  ERROR_QUERY_TOO_COMPLEX: 'Query complexity exceeds maximum limit',
  ERROR_EXECUTION_TIMEOUT: 'Query execution timeout',
  ERROR_NO_RESULTS: 'No results found for the given query',
  
  // 查詢成功信息
  SUCCESS_QUERY_EXECUTED: '🔍 查詢執行成功',
  SUCCESS_QUERY_VALIDATED: '✅ 查詢語法驗證通過',
  
  // 查詢提示信息
  HINT_USE_QUOTES: 'Use quotes for values containing spaces',
  HINT_CHECK_SPELLING: 'Check field names and operator spelling',
  HINT_USE_LIMIT: 'Consider using LIMIT to reduce result size',
  HINT_USE_HELP: 'Use queryHelp for syntax assistance',
  
  // 支持的數據類型
  SUPPORTED_TYPES: ['issues', 'user_stories', 'tasks'],
  
  // 查詢複雜度權重
  COMPLEXITY_WEIGHTS: {
    FILTER: 1,
    LOGIC_OP: 0.5,
    ORDER_BY: 1,
    LIMIT: 0.2,
    GROUP_BY: 2,
    TEXT_SEARCH: 1.5,
    DATE_RANGE: 1.2
  }
};

export const API_ENDPOINTS = {
  PROJECTS: '/projects',
  USER_STORIES: '/userstories',
  TASKS: '/tasks',
  ISSUES: '/issues',
  MILESTONES: '/milestones',
  USER_STORY_STATUSES: '/userstory-statuses',
  TASK_STATUSES: '/task-statuses',
  ISSUE_STATUSES: '/issue-statuses',
  PRIORITIES: '/priorities',
  SEVERITIES: '/severities',
  ISSUE_TYPES: '/issue-types',
  USERS_ME: '/users/me',
};

export const RESPONSE_TEMPLATES = {
  NO_PROJECTS: 'No projects found.',
  NO_USER_STORIES: 'No user stories found in this project.',
  NO_TASKS: 'No tasks found.',
  NO_ISSUES: 'No issues found in this project.',
  NO_SPRINTS: 'No sprints found in this project.',
  PROJECT_REQUIRED_FOR_REF: 'Project identifier is required when using reference number.',
};

export const STATUS_LABELS = {
  ACTIVE: 'Active',
  CLOSED: 'Closed',
  UNKNOWN: 'Unknown',
  NOT_SET: 'Not set',
  UNASSIGNED: 'Unassigned',
  NO_SPRINT: 'No Sprint',
  NO_DESCRIPTION: 'No description provided',
  NO_TAGS: 'No tags',
};