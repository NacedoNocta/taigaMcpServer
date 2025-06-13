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
}
