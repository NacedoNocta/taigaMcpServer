/**
 * Utility functions for Taiga MCP Server
 */

import { TaigaService } from './taigaService.js';
import { STATUS_LABELS } from './constants.js';

const taigaService = new TaigaService();

/**
 * Resolve project identifier to project ID
 * @param {string} projectIdentifier - Project ID or slug
 * @returns {Promise<string>} - Project ID
 */
export async function resolveProjectId(projectIdentifier) {
  if (!isNaN(projectIdentifier)) {
    return projectIdentifier;
  }
  
  const project = await taigaService.getProjectBySlug(projectIdentifier);
  return project.id;
}

/**
 * Resolve issue identifier to issue object
 * @param {string} issueIdentifier - Issue ID or reference (#123)
 * @param {string} [projectIdentifier] - Project ID or slug (required for reference)
 * @returns {Promise<Object>} - Issue object
 */
export async function resolveIssue(issueIdentifier, projectIdentifier) {
  console.log('🔍 resolveIssue called with:', { issueIdentifier, projectIdentifier });
  
  if (issueIdentifier.startsWith('#')) {
    console.log('📋 Using reference number format');
    if (!projectIdentifier) {
      throw new Error('Project identifier is required when using issue reference number');
    }
    
    const projectId = await resolveProjectId(projectIdentifier);
    console.log('✅ Project resolved:', projectId);
    
    const ref = issueIdentifier.substring(1);
    console.log('🔢 Getting issue by ref:', ref);
    
    return await taigaService.getIssueByRef(ref, projectId);
  }
  
  console.log('🆔 Using direct ID format');
  return await taigaService.getIssue(issueIdentifier);
}

/**
 * Find status ID by name
 * @param {Array} statuses - Array of status objects
 * @param {string} statusName - Status name to find
 * @returns {number|undefined} - Status ID or undefined if not found
 */
export function findStatusIdByName(statuses, statusName) {
  if (!statusName) return undefined;
  
  const status = statuses.find(s => 
    s.name.toLowerCase() === statusName.toLowerCase()
  );
  return status?.id;
}

/**
 * Find ID by name in a collection
 * @param {Array} collection - Array of objects with name property
 * @param {string} name - Name to find
 * @returns {number|undefined} - ID or undefined if not found
 */
export function findIdByName(collection, name) {
  if (!name) return undefined;
  
  const item = collection.find(item => 
    item.name.toLowerCase() === name.toLowerCase()
  );
  return item?.id;
}

/**
 * Format date for display
 * @param {string} dateString - ISO date string
 * @returns {string} - Formatted date or 'Not set'
 */
export function formatDate(dateString) {
  if (!dateString) return 'Not set';
  return new Date(dateString).toLocaleDateString();
}

/**
 * Format datetime for display
 * @param {string} dateString - ISO date string
 * @returns {string} - Formatted datetime
 */
export function formatDateTime(dateString) {
  if (!dateString) return 'Not set';
  return new Date(dateString).toLocaleString();
}

/**
 * Calculate completion percentage
 * @param {number} completed - Completed items
 * @param {number} total - Total items
 * @returns {number} - Percentage (0-100)
 */
export function calculateCompletionPercentage(completed, total) {
  if (!total || total === 0) return 0;
  return Math.round((completed / total) * 100);
}

/**
 * Create MCP error response
 * @param {string} message - Error message
 * @returns {Object} - MCP error response
 */
export function createErrorResponse(message) {
  return {
    content: [
      {
        type: 'text',
        text: `❌ Error: ${message}`,
      },
    ],
    isError: true,
  };
}

/**
 * Create MCP success response
 * @param {string} text - Response text
 * @returns {Object} - MCP success response
 */
export function createSuccessResponse(text) {
  return {
    content: [
      {
        type: 'text',
        text,
      },
    ],
  };
}

/**
 * Get status label (Active/Closed)
 * @param {boolean} closed - Whether item is closed
 * @returns {string} - Status label
 */
export function getStatusLabel(closed) {
  return closed ? STATUS_LABELS.CLOSED : STATUS_LABELS.ACTIVE;
}

/**
 * Get safe value or default
 * @param {any} value - Value to check
 * @param {string} defaultValue - Default value if null/undefined
 * @returns {string} - Safe value
 */
export function getSafeValue(value, defaultValue = STATUS_LABELS.UNKNOWN) {
  return value || defaultValue;
}

/**
 * Format project list for display
 * @param {Array} projects - Array of project objects
 * @returns {string} - Formatted project list
 */
export function formatProjectList(projects) {
  return projects.map(p => `- ${p.name} (ID: ${p.id}, Slug: ${p.slug})`).join('\n');
}

/**
 * Format user story list for display
 * @param {Array} userStories - Array of user story objects
 * @returns {string} - Formatted user story list
 */
export function formatUserStoryList(userStories) {
  return userStories.map(us => 
    `- #${us.ref}: ${us.subject} (Status: ${getSafeValue(us.status_extra_info?.name)})`
  ).join('\n');
}

/**
 * Format issue list for display
 * @param {Array} issues - Array of issue objects
 * @returns {string} - Formatted issue list
 */
export function formatIssueList(issues) {
  return issues.map(issue => `- #${issue.ref}: ${issue.subject}
  Status: ${getSafeValue(issue.status_extra_info?.name)}
  Priority: ${getSafeValue(issue.priority_extra_info?.name)}
  Sprint: ${getSafeValue(issue.milestone_extra_info?.name, STATUS_LABELS.NO_SPRINT)}
  Assigned: ${getSafeValue(issue.assigned_to_extra_info?.full_name, STATUS_LABELS.UNASSIGNED)}`).join('\n\n');
}

/**
 * Format sprint list for display
 * @param {Array} sprints - Array of sprint objects
 * @returns {string} - Formatted sprint list
 */
export function formatSprintList(sprints) {
  return sprints.map(sprint => {
    const startDate = formatDate(sprint.estimated_start);
    const endDate = formatDate(sprint.estimated_finish);
    const status = getStatusLabel(sprint.closed);
    return `- ${sprint.name} (ID: ${sprint.id})
  Status: ${status}
  Duration: ${startDate} ~ ${endDate}`;
  }).join('\n\n');
}

/**
 * Format sprint issues for display
 * @param {Array} issues - Array of issue objects
 * @returns {string} - Formatted issue list for sprint
 */
export function formatSprintIssues(issues) {
  return issues.map(issue => `🔸 #${issue.ref}: ${issue.subject}
   Status: ${getSafeValue(issue.status_extra_info?.name)}
   Priority: ${getSafeValue(issue.priority_extra_info?.name)}
   Assigned: ${getSafeValue(issue.assigned_to_extra_info?.full_name, STATUS_LABELS.UNASSIGNED)}`).join('\n\n');
}