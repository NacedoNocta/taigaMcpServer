/**
 * MCP Tools Registry
 * Centralizes all tool definitions for easy management
 */

// Import all tool modules
import { authenticateTool } from './authTools.js';
import { listProjectsTool, getProjectTool } from './projectTools.js';
import { listUserStoriesTool, createUserStoryTool } from './userStoryTools.js';
import { createTaskTool } from './taskTools.js';
import { listIssuesTool, getIssueTool, createIssueTool } from './issueTools.js';
import { listSprintsTool, getSprintStatsTool, createSprintTool, getIssuesBySprintTool } from './sprintTools.js';

/**
 * Registry of all available MCP tools
 * Organized by category for easy maintenance
 */
export const toolRegistry = {
  // Authentication tools
  auth: [
    authenticateTool
  ],
  
  // Project management tools
  projects: [
    listProjectsTool,
    getProjectTool
  ],
  
  // User story tools
  userStories: [
    listUserStoriesTool,
    createUserStoryTool
  ],
  
  // Task tools
  tasks: [
    createTaskTool
  ],
  
  // Issue tools
  issues: [
    listIssuesTool,
    getIssueTool,
    createIssueTool
  ],
  
  // Sprint (milestone) tools
  sprints: [
    listSprintsTool,
    getSprintStatsTool,
    createSprintTool,
    getIssuesBySprintTool
  ]
};

/**
 * Get all tools as a flat array
 * @returns {Array} - Array of all tool definitions
 */
export function getAllTools() {
  const allTools = [];
  
  for (const category in toolRegistry) {
    allTools.push(...toolRegistry[category]);
  }
  
  return allTools;
}

/**
 * Get tools by category
 * @param {string} category - Category name
 * @returns {Array} - Array of tools in the category
 */
export function getToolsByCategory(category) {
  return toolRegistry[category] || [];
}

/**
 * Register a tool with the MCP server
 * @param {Object} server - MCP server instance
 * @param {Object} tool - Tool definition
 */
export function registerTool(server, tool) {
  server.tool(tool.name, tool.schema, tool.handler);
}

/**
 * Register all tools with the MCP server
 * @param {Object} server - MCP server instance
 */
export function registerAllTools(server) {
  const tools = getAllTools();
  
  tools.forEach(tool => {
    registerTool(server, tool);
  });
  
  console.error(`Registered ${tools.length} MCP tools across ${Object.keys(toolRegistry).length} categories`);
}