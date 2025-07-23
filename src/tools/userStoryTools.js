/**
 * User Story related MCP tools
 */

import { z } from 'zod';
import { TaigaService } from '../taigaService.js';
import { RESPONSE_TEMPLATES, SUCCESS_MESSAGES, ERROR_MESSAGES, STATUS_LABELS } from '../constants.js';
import { 
  resolveProjectId,
  findIdByName,
  formatUserStoryList,
  getSafeValue,
  createErrorResponse,
  createSuccessResponse,
  formatDateTime,
  resolveUserStory
} from '../utils.js';

const taigaService = new TaigaService();

/**
 * Tool to list user stories in a project
 */
export const listUserStoriesTool = {
  name: 'listUserStories',
  schema: {
    projectIdentifier: z.string().describe('Project ID or slug'),
  },
  handler: async ({ projectIdentifier }) => {
    try {
      const projectId = await resolveProjectId(projectIdentifier);
      const userStories = await taigaService.listUserStories(projectId);

      if (userStories.length === 0) {
        return createErrorResponse(RESPONSE_TEMPLATES.NO_USER_STORIES);
      }

      const userStoriesText = `User Stories in Project:\n\n${formatUserStoryList(userStories)}`;
      return createSuccessResponse(userStoriesText);
    } catch (error) {
      return createErrorResponse(`Failed to list user stories: ${error.message}`);
    }
  }
};

/**
 * Tool to create a new user story
 */
export const createUserStoryTool = {
  name: 'createUserStory',
  schema: {
    projectIdentifier: z.string().describe('Project ID or slug'),
    subject: z.string().describe('User story title/subject'),
    description: z.string().optional().describe('User story description'),
    status: z.string().optional().describe('Status name (e.g., "New", "In progress")'),
    tags: z.array(z.string()).optional().describe('Array of tags'),
  },
  handler: async ({ projectIdentifier, subject, description, status, tags }) => {
    try {
      const projectId = await resolveProjectId(projectIdentifier);

      // Get status ID if a status name was provided
      let statusId = undefined;
      if (status) {
        const statuses = await taigaService.getUserStoryStatuses(projectId);
        statusId = findIdByName(statuses, status);
      }

      // Create the user story
      const userStoryData = {
        project: projectId,
        subject,
        description,
        status: statusId,
        tags,
      };

      const createdStory = await taigaService.createUserStory(userStoryData);

      const creationDetails = `${SUCCESS_MESSAGES.USER_STORY_CREATED}

Subject: ${createdStory.subject}
Reference: #${createdStory.ref}
Status: ${getSafeValue(createdStory.status_extra_info?.name, 'Default status')}
Project: ${getSafeValue(createdStory.project_extra_info?.name)}`;

      return createSuccessResponse(creationDetails);
    } catch (error) {
      return createErrorResponse(`Failed to create user story: ${error.message}`);
    }
  }
};

/**
 * Tool to get single user story details
 */
export const getUserStoryTool = {
  name: 'getUserStory',
  schema: {
    userStoryIdentifier: z.string().describe('User story ID or reference number (e.g., "123", "#45", or "45" - auto-detects format)'),
    projectIdentifier: z.string().optional().describe('Project ID or slug (required if using reference number)'),
  },
  handler: async ({ userStoryIdentifier, projectIdentifier }) => {
    try {
      const userStory = await resolveUserStory(userStoryIdentifier, projectIdentifier);

      const userStoryDetails = `User Story Details: #${userStory.ref} - ${userStory.subject}

📋 Basic Information:
- Project: ${getSafeValue(userStory.project_extra_info?.name)}
- Status: ${getSafeValue(userStory.status_extra_info?.name)}
- Points: ${getSafeValue(userStory.total_points, 'Not set')}
- Owner: ${getSafeValue(userStory.owner_extra_info?.full_name)}

🎯 Assignment:
- Assigned to: ${getSafeValue(userStory.assigned_to_extra_info?.full_name, STATUS_LABELS.UNASSIGNED)}
- Milestone: ${getSafeValue(userStory.milestone_extra_info?.name, 'No milestone')}

📅 Timeline:
- Created: ${formatDateTime(userStory.created_date)}
- Modified: ${formatDateTime(userStory.modified_date)}

📝 Description:
${getSafeValue(userStory.description, 'No description provided')}

🏷️ Tags: ${getSafeValue(userStory.tags?.join(', '), 'No tags')}`;

      return createSuccessResponse(userStoryDetails);
    } catch (error) {
      return createErrorResponse(`Failed to get user story: ${error.message}`);
    }
  }
};

/**
 * Tool to update a user story
 */
export const updateUserStoryTool = {
  name: 'updateUserStory',
  schema: {
    userStoryIdentifier: z.string().describe('User story ID or reference number (e.g., "123", "#45", or "45" - auto-detects format)'),
    projectIdentifier: z.string().optional().describe('Project ID or slug (required if using reference number)'),
    subject: z.string().optional().describe('New user story title/subject'),
    description: z.string().optional().describe('New user story description'),
    status: z.string().optional().describe('Status name (e.g., "New", "In progress")'),
    tags: z.array(z.string()).optional().describe('Array of tags'),
    points: z.number().optional().describe('Story points'),
    assignedTo: z.string().optional().describe('Username or user ID to assign to'),
  },
  handler: async ({ userStoryIdentifier, projectIdentifier, subject, description, status, tags, points, assignedTo }) => {
    try {
      // Get current user story
      const currentStory = await resolveUserStory(userStoryIdentifier, projectIdentifier);
      const projectId = currentStory.project;

      // Build update data object
      const updateData = {};
      
      if (subject !== undefined) updateData.subject = subject;
      if (description !== undefined) updateData.description = description;
      if (tags !== undefined) updateData.tags = tags;
      if (points !== undefined) updateData.points = points;

      // Get status ID if a status name was provided
      if (status) {
        const statuses = await taigaService.getUserStoryStatuses(projectId);
        const statusId = findIdByName(statuses, status);
        if (!statusId) {
          const availableStatuses = statuses.map(s => `- ${s.name} (ID: ${s.id})`).join('\n');
          return createErrorResponse(
            `Invalid status name: "${status}". Available statuses:\n${availableStatuses}`
          );
        }
        updateData.status = statusId;
      }

      // Get assignee ID if provided
      if (assignedTo) {
        // For simplicity, we'll assume it's a user ID. In a real implementation,
        // you might want to add a helper function to resolve usernames to IDs
        updateData.assigned_to = assignedTo;
      }

      const updatedStory = await taigaService.updateUserStory(currentStory.id, updateData);

      const updateDetails = `${SUCCESS_MESSAGES.USER_STORY_UPDATED}

User Story: #${updatedStory.ref} - ${updatedStory.subject}
Project: ${getSafeValue(updatedStory.project_extra_info?.name)}
Status: ${getSafeValue(updatedStory.status_extra_info?.name)}
Points: ${getSafeValue(updatedStory.total_points, 'Not set')}
Assigned to: ${getSafeValue(updatedStory.assigned_to_extra_info?.full_name, STATUS_LABELS.UNASSIGNED)}`;

      return createSuccessResponse(updateDetails);
    } catch (error) {
      return createErrorResponse(`Failed to update user story: ${error.message}`);
    }
  }
};

/**
 * Tool to delete a user story
 */
export const deleteUserStoryTool = {
  name: 'deleteUserStory',
  schema: {
    userStoryIdentifier: z.string().describe('User story ID or reference number (e.g., "123", "#45", or "45" - auto-detects format)'),
    projectIdentifier: z.string().optional().describe('Project ID or slug (required if using reference number)'),
  },
  handler: async ({ userStoryIdentifier, projectIdentifier }) => {
    try {
      // Get user story details before deletion for confirmation message
      const userStory = await resolveUserStory(userStoryIdentifier, projectIdentifier);
      
      await taigaService.deleteUserStory(userStory.id);

      const deletionDetails = `${SUCCESS_MESSAGES.USER_STORY_DELETED}

Deleted User Story: #${userStory.ref} - ${userStory.subject}
Project: ${getSafeValue(userStory.project_extra_info?.name)}`;

      return createSuccessResponse(deletionDetails);
    } catch (error) {
      return createErrorResponse(`Failed to delete user story: ${error.message}`);
    }
  }
};