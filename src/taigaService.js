import { createAuthenticatedClient } from './taigaAuth.js';
import { API_ENDPOINTS, ERROR_MESSAGES } from './constants.js';

/**
 * Service for interacting with the Taiga API
 */
export class TaigaService {
  /**
   * Get a list of all projects the user has access to
   * @returns {Promise<Array>} - List of projects
   */
  async listProjects() {
    try {
      const client = await createAuthenticatedClient();

      // First get current user information
      const currentUser = await this.getCurrentUser();
      const userId = currentUser.id;

      // Then get projects where user is a member
      const response = await client.get(API_ENDPOINTS.PROJECTS, {
        params: {
          member: userId
        }
      });

      return response.data;
    } catch (error) {
      console.error('Failed to list projects:', error.message);
      throw new Error(ERROR_MESSAGES.FAILED_TO_LIST_PROJECTS);
    }
  }

  /**
   * Get details of a specific project
   * @param {string} projectId - Project ID or slug
   * @returns {Promise<Object>} - Project details
   */
  async getProject(projectId) {
    try {
      const client = await createAuthenticatedClient();
      const response = await client.get(`${API_ENDPOINTS.PROJECTS}/${projectId}`);
      return response.data;
    } catch (error) {
      console.error(`Failed to get project ${projectId}:`, error.message);
      throw new Error(ERROR_MESSAGES.FAILED_TO_GET_PROJECT);
    }
  }

  /**
   * Get a project by its slug
   * @param {string} slug - Project slug
   * @returns {Promise<Object>} - Project details
   */
  async getProjectBySlug(slug) {
    try {
      const client = await createAuthenticatedClient();
      const response = await client.get(`/projects/by_slug?slug=${slug}`);
      return response.data;
    } catch (error) {
      console.error(`Failed to get project by slug ${slug}:`, error.message);
      throw new Error(`Failed to get project details from Taiga`);
    }
  }

  /**
   * List user stories for a project
   * @param {string} projectId - Project ID
   * @returns {Promise<Array>} - List of user stories
   */
  async listUserStories(projectId) {
    try {
      const client = await createAuthenticatedClient();
      const response = await client.get(API_ENDPOINTS.USER_STORIES, {
        params: { project: projectId }
      });
      return response.data;
    } catch (error) {
      console.error(`Failed to list user stories for project ${projectId}:`, error.message);
      throw new Error(ERROR_MESSAGES.FAILED_TO_LIST_USER_STORIES);
    }
  }

  /**
   * Create a new user story in a project
   * @param {Object} userStoryData - User story data
   * @param {string} userStoryData.project - Project ID
   * @param {string} userStoryData.subject - User story subject/title
   * @param {string} [userStoryData.description] - User story description
   * @param {number} [userStoryData.status] - Status ID
   * @param {Array} [userStoryData.tags] - Array of tags
   * @returns {Promise<Object>} - Created user story
   */
  async createUserStory(userStoryData) {
    try {
      const client = await createAuthenticatedClient();
      const response = await client.post(API_ENDPOINTS.USER_STORIES, userStoryData);
      return response.data;
    } catch (error) {
      console.error('Failed to create user story:', error.message);
      throw new Error(ERROR_MESSAGES.FAILED_TO_CREATE_USER_STORY);
    }
  }

  /**
   * Get user story statuses for a project
   * @param {string} projectId - Project ID
   * @returns {Promise<Array>} - List of user story statuses
   */
  async getUserStoryStatuses(projectId) {
    try {
      const client = await createAuthenticatedClient();
      const response = await client.get(API_ENDPOINTS.USER_STORY_STATUSES, {
        params: { project: projectId }
      });
      return response.data;
    } catch (error) {
      console.error(`Failed to get user story statuses for project ${projectId}:`, error.message);
      throw new Error('Failed to get user story statuses from Taiga');
    }
  }

  /**
   * Get the current user's information
   * @returns {Promise<Object>} - User information
   */
  async getCurrentUser() {
    try {
      const client = await createAuthenticatedClient();
      const response = await client.get(API_ENDPOINTS.USERS_ME);
      return response.data;
    } catch (error) {
      console.error('Failed to get current user:', error.message);
      throw new Error('Failed to get user information from Taiga');
    }
  }

  /**
   * Create a new task associated with a user story
   * @param {Object} taskData - Task data
   * @param {string} taskData.project - Project ID
   * @param {string} taskData.subject - Task subject/title
   * @param {string} [taskData.description] - Task description
   * @param {string} [taskData.user_story] - User story ID
   * @param {string} [taskData.status] - Status ID
   * @param {Array} [taskData.tags] - Array of tags
   * @returns {Promise<Object>} - Created task
   */
  async createTask(taskData) {
    try {
      const client = await createAuthenticatedClient();
      const response = await client.post(API_ENDPOINTS.TASKS, taskData);
      return response.data;
    } catch (error) {
      console.error('Failed to create task:', error.message);
      throw new Error(ERROR_MESSAGES.FAILED_TO_CREATE_TASK);
    }
  }

  /**
   * Get task statuses for a project
   * @param {string} projectId - Project ID
   * @returns {Promise<Array>} - List of task statuses
   */
  async getTaskStatuses(projectId) {
    try {
      const client = await createAuthenticatedClient();
      const response = await client.get(API_ENDPOINTS.TASK_STATUSES, {
        params: { project: projectId }
      });
      return response.data;
    } catch (error) {
      console.error(`Failed to get task statuses for project ${projectId}:`, error.message);
      throw new Error('Failed to get task statuses from Taiga');
    }
  }

  /**
   * List issues for a project
   * @param {string} projectId - Project ID
   * @returns {Promise<Array>} - List of issues
   */
  async listIssues(projectId) {
    try {
      const client = await createAuthenticatedClient();
      const response = await client.get(API_ENDPOINTS.ISSUES, {
        params: { project: projectId }
      });
      return response.data;
    } catch (error) {
      console.error(`Failed to list issues for project ${projectId}:`, error.message);
      throw new Error(ERROR_MESSAGES.FAILED_TO_LIST_ISSUES);
    }
  }

  /**
   * Create a new issue in a project
   * @param {Object} issueData - Issue data
   * @param {string} issueData.project - Project ID
   * @param {string} issueData.subject - Issue subject/title
   * @param {string} [issueData.description] - Issue description
   * @param {number} [issueData.status] - Status ID
   * @param {number} [issueData.priority] - Priority ID
   * @param {number} [issueData.severity] - Severity ID
   * @param {number} [issueData.type] - Issue type ID
   * @param {number} [issueData.assigned_to] - Assigned user ID
   * @param {Array} [issueData.tags] - Array of tags
   * @returns {Promise<Object>} - Created issue
   */
  async createIssue(issueData) {
    try {
      const client = await createAuthenticatedClient();
      const response = await client.post(API_ENDPOINTS.ISSUES, issueData);
      return response.data;
    } catch (error) {
      console.error('Failed to create issue:', error.message);
      throw new Error(ERROR_MESSAGES.FAILED_TO_CREATE_ISSUE);
    }
  }

  /**
   * Get issue statuses for a project
   * @param {string} projectId - Project ID
   * @returns {Promise<Array>} - List of issue statuses
   */
  async getIssueStatuses(projectId) {
    try {
      const client = await createAuthenticatedClient();
      const response = await client.get(API_ENDPOINTS.ISSUE_STATUSES, {
        params: { project: projectId }
      });
      return response.data;
    } catch (error) {
      console.error(`Failed to get issue statuses for project ${projectId}:`, error.message);
      throw new Error('Failed to get issue statuses from Taiga');
    }
  }

  /**
   * Get issue priorities for a project
   * @param {string} projectId - Project ID
   * @returns {Promise<Array>} - List of issue priorities
   */
  async getIssuePriorities(projectId) {
    try {
      const client = await createAuthenticatedClient();
      const response = await client.get(API_ENDPOINTS.PRIORITIES, {
        params: { project: projectId }
      });
      return response.data;
    } catch (error) {
      console.error(`Failed to get issue priorities for project ${projectId}:`, error.message);
      throw new Error('Failed to get issue priorities from Taiga');
    }
  }

  /**
   * Get issue severities for a project
   * @param {string} projectId - Project ID
   * @returns {Promise<Array>} - List of issue severities
   */
  async getIssueSeverities(projectId) {
    try {
      const client = await createAuthenticatedClient();
      const response = await client.get(API_ENDPOINTS.SEVERITIES, {
        params: { project: projectId }
      });
      return response.data;
    } catch (error) {
      console.error(`Failed to get issue severities for project ${projectId}:`, error.message);
      throw new Error('Failed to get issue severities from Taiga');
    }
  }

  /**
   * Get issue types for a project
   * @param {string} projectId - Project ID
   * @returns {Promise<Array>} - List of issue types
   */
  async getIssueTypes(projectId) {
    try {
      const client = await createAuthenticatedClient();
      const response = await client.get(API_ENDPOINTS.ISSUE_TYPES, {
        params: { project: projectId }
      });
      return response.data;
    } catch (error) {
      console.error(`Failed to get issue types for project ${projectId}:`, error.message);
      throw new Error('Failed to get issue types from Taiga');
    }
  }

  /**
   * List milestones (sprints) for a project
   * @param {string} projectId - Project ID
   * @returns {Promise<Array>} - List of milestones
   */
  async listMilestones(projectId) {
    try {
      const client = await createAuthenticatedClient();
      const response = await client.get(API_ENDPOINTS.MILESTONES, {
        params: { project: projectId }
      });
      return response.data;
    } catch (error) {
      console.error(`Failed to list milestones for project ${projectId}:`, error.message);
      throw new Error(ERROR_MESSAGES.FAILED_TO_LIST_MILESTONES);
    }
  }

  /**
   * Get details of a specific milestone (sprint)
   * @param {string} milestoneId - Milestone ID
   * @returns {Promise<Object>} - Milestone details
   */
  async getMilestone(milestoneId) {
    try {
      const client = await createAuthenticatedClient();
      const response = await client.get(`${API_ENDPOINTS.MILESTONES}/${milestoneId}`);
      return response.data;
    } catch (error) {
      console.error(`Failed to get milestone ${milestoneId}:`, error.message);
      throw new Error(ERROR_MESSAGES.FAILED_TO_GET_MILESTONE);
    }
  }

  /**
   * Get statistics for a specific milestone (sprint)
   * @param {string} milestoneId - Milestone ID
   * @returns {Promise<Object>} - Milestone statistics
   */
  async getMilestoneStats(milestoneId) {
    try {
      const client = await createAuthenticatedClient();
      const response = await client.get(`${API_ENDPOINTS.MILESTONES}/${milestoneId}/stats`);
      return response.data;
    } catch (error) {
      console.error(`Failed to get milestone stats for ${milestoneId}:`, error.message);
      throw new Error(ERROR_MESSAGES.FAILED_TO_GET_MILESTONE_STATS);
    }
  }

  /**
   * Get details of a specific issue
   * @param {string} issueId - Issue ID
   * @returns {Promise<Object>} - Issue details
   */
  async getIssue(issueId) {
    try {
      const client = await createAuthenticatedClient();
      const response = await client.get(`${API_ENDPOINTS.ISSUES}/${issueId}`);
      return response.data;
    } catch (error) {
      console.error(`Failed to get issue ${issueId}:`, error.message);
      throw new Error(ERROR_MESSAGES.FAILED_TO_GET_ISSUE);
    }
  }

  /**
   * Get issue by reference number
   * @param {string} ref - Issue reference number
   * @param {string} projectId - Project ID
   * @returns {Promise<Object>} - Issue details
   */
  async getIssueByRef(ref, projectId) {
    try {
      const client = await createAuthenticatedClient();
      const response = await client.get(`${API_ENDPOINTS.ISSUES}/by_ref`, {
        params: { ref, project: projectId }
      });
      return response.data;
    } catch (error) {
      console.error(`Failed to get issue by ref ${ref}:`, error.message);
      throw new Error('Failed to get issue by reference from Taiga');
    }
  }

  /**
   * List issues filtered by milestone (sprint)
   * @param {string} projectId - Project ID
   * @param {string} milestoneId - Milestone ID
   * @returns {Promise<Array>} - List of issues in the milestone
   */
  async getIssuesByMilestone(projectId, milestoneId) {
    try {
      const client = await createAuthenticatedClient();
      const response = await client.get(API_ENDPOINTS.ISSUES, {
        params: { 
          project: projectId,
          milestone: milestoneId
        }
      });
      return response.data;
    } catch (error) {
      console.error(`Failed to get issues for milestone ${milestoneId}:`, error.message);
      throw new Error('Failed to get issues by milestone from Taiga');
    }
  }

  /**
   * Create a new milestone (sprint) in a project
   * @param {Object} milestoneData - Milestone data
   * @param {string} milestoneData.project - Project ID
   * @param {string} milestoneData.name - Milestone name
   * @param {string} [milestoneData.estimated_start] - Estimated start date (YYYY-MM-DD)
   * @param {string} [milestoneData.estimated_finish] - Estimated finish date (YYYY-MM-DD)
   * @param {boolean} [milestoneData.disponibility] - Availability percentage
   * @returns {Promise<Object>} - Created milestone
   */
  async createMilestone(milestoneData) {
    try {
      const client = await createAuthenticatedClient();
      const response = await client.post(API_ENDPOINTS.MILESTONES, milestoneData);
      return response.data;
    } catch (error) {
      console.error('Failed to create milestone:', error.message);
      throw new Error('Failed to create milestone in Taiga');
    }
  }

  /**
   * Add comment to an item (issue, user story, or task)
   * @param {string} itemType - Type of item ('issue', 'user_story', 'task')
   * @param {number} itemId - ID of the item
   * @param {Object} commentData - Comment data
   * @returns {Promise<Object>} - Created comment
   */
  async addComment(itemType, itemId, commentData) {
    try {
      const client = await createAuthenticatedClient();
      
      // Taiga使用歷史API來處理評論
      // 通過更新項目並添加評論來創建評論記錄
      const endpoint = this.getItemEndpoint(itemType);
      const updateData = {
        comment: commentData.comment,
        version: await this.getItemVersion(itemType, itemId)
      };
      
      const response = await client.patch(`${endpoint}/${itemId}`, updateData);
      return response.data;
    } catch (error) {
      console.error('Failed to add comment:', error.message);
      throw new Error('Failed to add comment to Taiga');
    }
  }

  /**
   * Get history/comments for an item
   * @param {string} itemType - Type of item ('issue', 'user_story', 'task')  
   * @param {number} itemId - ID of the item
   * @returns {Promise<Array>} - History entries including comments
   */
  async getItemHistory(itemType, itemId) {
    try {
      const client = await createAuthenticatedClient();
      const objectType = this.getHistoryObjectType(itemType);
      const response = await client.get(`${API_ENDPOINTS.HISTORY}/${objectType}/${itemId}`);
      return response.data;
    } catch (error) {
      console.error('Failed to get item history:', error.message);
      throw new Error('Failed to get item history from Taiga');
    }
  }

  /**
   * Edit a comment
   * @param {number} commentId - ID of the comment  
   * @param {string} newComment - New comment content
   * @returns {Promise<Object>} - Updated comment
   */
  async editComment(commentId, newComment) {
    try {
      const client = await createAuthenticatedClient();
      const response = await client.patch(`${API_ENDPOINTS.HISTORY}/edit-comment`, {
        id: commentId,
        comment: newComment
      });
      return response.data;
    } catch (error) {
      console.error('Failed to edit comment:', error.message);
      throw new Error('Failed to edit comment in Taiga');
    }
  }

  /**
   * Delete a comment
   * @param {number} commentId - ID of the comment to delete
   * @returns {Promise<void>}
   */
  async deleteComment(commentId) {
    try {
      const client = await createAuthenticatedClient();
      await client.delete(`${API_ENDPOINTS.HISTORY}/delete-comment`, {
        data: { id: commentId }
      });
    } catch (error) {
      console.error('Failed to delete comment:', error.message);
      throw new Error('Failed to delete comment from Taiga');
    }
  }

  /**
   * Get current user ID
   * @returns {Promise<number>} - Current user ID
   */
  async getCurrentUserId() {
    try {
      const client = await createAuthenticatedClient();
      const response = await client.get(API_ENDPOINTS.USERS_ME);
      return response.data.id;
    } catch (error) {
      console.error('Failed to get current user:', error.message);
      throw new Error('Failed to get current user from Taiga');
    }
  }

  /**
   * Get item endpoint based on type
   * @private
   */
  getItemEndpoint(itemType) {
    const endpoints = {
      'issue': API_ENDPOINTS.ISSUES,
      'user_story': API_ENDPOINTS.USER_STORIES,
      'task': API_ENDPOINTS.TASKS
    };
    return endpoints[itemType] || API_ENDPOINTS.ISSUES;
  }

  /**
   * Get history object type based on item type
   * @private
   */
  getHistoryObjectType(itemType) {
    const types = {
      'issue': 'issue',
      'user_story': 'userstory',
      'task': 'task'
    };
    return types[itemType] || 'issue';
  }

  /**
   * Get current version of an item (needed for comment updates)
   * @private
   */
  async getItemVersion(itemType, itemId) {
    try {
      const client = await createAuthenticatedClient();
      const endpoint = this.getItemEndpoint(itemType);
      const response = await client.get(`${endpoint}/${itemId}`);
      return response.data.version || 1;
    } catch (error) {
      console.error('Failed to get item version:', error.message);
      return 1; // 默認版本
    }
  }

  /**
   * Upload attachment to an item (issue, user story, or task)
   * @param {string} itemType - Type of item ('issue', 'user_story', 'task')
   * @param {number} itemId - ID of the item
   * @param {string} filePath - Path to the file to upload
   * @param {string} [description] - Optional description for the attachment
   * @returns {Promise<Object>} - Created attachment
   */
  async uploadAttachment(itemType, itemId, filePath, description) {
    try {
      const client = await createAuthenticatedClient();
      const fs = await import('fs');
      const path = await import('path');
      const FormData = await import('form-data');
      
      // Get attachment endpoint based on item type
      const endpoint = this.getAttachmentEndpoint(itemType);
      
      // Check if file exists
      if (!fs.existsSync(filePath)) {
        throw new Error('File not found');
      }
      
      // Create form data
      const form = new FormData();
      form.append('object_id', itemId.toString());
      form.append('attached_file', fs.createReadStream(filePath));
      
      if (description) {
        form.append('description', description);
      }
      
      const response = await client.post(endpoint, form, {
        headers: {
          ...form.getHeaders(),
        },
      });
      
      return response.data;
    } catch (error) {
      console.error('Failed to upload attachment:', error.message);
      throw new Error('Failed to upload attachment to Taiga');
    }
  }

  /**
   * List attachments for an item
   * @param {string} itemType - Type of item ('issue', 'user_story', 'task')
   * @param {number} itemId - ID of the item
   * @returns {Promise<Array>} - List of attachments
   */
  async listAttachments(itemType, itemId) {
    try {
      const client = await createAuthenticatedClient();
      const endpoint = this.getAttachmentEndpoint(itemType);
      
      const response = await client.get(endpoint, {
        params: {
          object_id: itemId
        }
      });
      
      return response.data;
    } catch (error) {
      console.error('Failed to list attachments:', error.message);
      throw new Error('Failed to list attachments from Taiga');
    }
  }

  /**
   * Download attachment by ID
   * @param {number} attachmentId - ID of the attachment
   * @param {string} [downloadPath] - Optional path to save the file
   * @returns {Promise<Object>} - Download result with filename and path
   */
  async downloadAttachment(attachmentId, downloadPath) {
    try {
      const client = await createAuthenticatedClient();
      const fs = await import('fs');
      const path = await import('path');
      
      // First get attachment details
      const attachmentResponse = await client.get(`${API_ENDPOINTS.ISSUE_ATTACHMENTS}/${attachmentId}`);
      const attachment = attachmentResponse.data;
      
      // Download the file
      const fileResponse = await client.get(attachment.url, {
        responseType: 'stream'
      });
      
      // Determine save path
      const filename = attachment.name || `attachment_${attachmentId}`;
      const savedPath = downloadPath || path.join(process.cwd(), filename);
      
      // Save file
      const writer = fs.createWriteStream(savedPath);
      fileResponse.data.pipe(writer);
      
      return new Promise((resolve, reject) => {
        writer.on('finish', () => {
          resolve({
            filename,
            savedPath,
            size: attachment.size
          });
        });
        writer.on('error', reject);
      });
    } catch (error) {
      console.error('Failed to download attachment:', error.message);
      throw new Error('Failed to download attachment from Taiga');
    }
  }

  /**
   * Delete attachment by ID
   * @param {number} attachmentId - ID of the attachment to delete
   * @returns {Promise<void>}
   */
  async deleteAttachment(attachmentId) {
    try {
      const client = await createAuthenticatedClient();
      await client.delete(`${API_ENDPOINTS.ISSUE_ATTACHMENTS}/${attachmentId}`);
    } catch (error) {
      console.error('Failed to delete attachment:', error.message);
      throw new Error('Failed to delete attachment from Taiga');
    }
  }

  /**
   * Get attachment endpoint based on item type
   * @private
   */
  getAttachmentEndpoint(itemType) {
    const endpoints = {
      'issue': API_ENDPOINTS.ISSUE_ATTACHMENTS,
      'user_story': API_ENDPOINTS.USERSTORY_ATTACHMENTS,
      'task': API_ENDPOINTS.TASK_ATTACHMENTS
    };
    return endpoints[itemType] || API_ENDPOINTS.ISSUE_ATTACHMENTS;
  }
}
