/**
 * Attachment management tools for Taiga MCP Server
 * Handles file uploads, downloads, listing, and deletion for Issues, User Stories, and Tasks
 */

import { z } from 'zod';
import { TaigaService } from '../taigaService.js';
import { createSuccessResponse, createErrorResponse, resolveProjectId } from '../utils.js';
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '../constants.js';

const taigaService = new TaigaService();

// Shared schema for attachment operations
const attachmentTargetSchema = z.object({
  itemType: z.enum(['issue', 'user_story', 'task'], {
    description: 'Type of item to attach file to'
  }),
  itemId: z.number({
    description: 'ID of the item to attach file to'
  })
});

/**
 * Upload attachment tool
 * Uploads a file attachment to an Issue, User Story, or Task
 */
export const uploadAttachmentTool = {
  name: 'uploadAttachment',
  description: 'Upload a file attachment to an Issue, User Story, or Task',
  inputSchema: z.object({
    itemType: z.enum(['issue', 'user_story', 'task']),
    itemId: z.union([z.number(), z.string()]).transform(val => typeof val === 'string' ? parseInt(val) : val),
    projectIdentifier: z.string().optional().describe('Project ID or slug (required for issues)'),
    filePath: z.string().min(1, 'File path is required'),
    description: z.string().optional().describe('Optional description for the attachment')
  }),
  
  handler: async (args) => {
    try {
      // Debug: log received arguments
      const { itemType, itemId, projectIdentifier, filePath, description } = args;
      
      if (!taigaService.isAuthenticated()) {
        return createErrorResponse(ERROR_MESSAGES.AUTHENTICATION_FAILED);
      }
      
      // Validate required parameters
      if (!filePath) {
        return createErrorResponse(`Missing required parameter: filePath. Received arguments: ${JSON.stringify(args)}`);
      }

      // 對於issues，projectIdentifier是必需的
      if (itemType === 'issue' && !projectIdentifier) {
        return createErrorResponse('Project identifier is required when uploading attachments to issues. Please provide projectIdentifier parameter.');
      }

      // 解析項目ID並驗證item存在
      let actualItemId = itemId;
      if (itemType === 'issue' && projectIdentifier) {
        const projectId = await resolveProjectId(projectIdentifier);
        // 先嘗試作為ref number，再嘗試作為直接ID
        try {
          const actualItem = await taigaService.getIssueByRef(itemId, projectId);
          actualItemId = actualItem.id;
        } catch (refError) {
          try {
            const actualItem = await taigaService.getIssue(itemId);
            if (actualItem.project !== projectId) {
              throw new Error(`Issue #${itemId} does not belong to project ${projectIdentifier}`);
            }
            actualItemId = actualItem.id;
          } catch (idError) {
            throw new Error(`Issue #${itemId} not found in project ${projectIdentifier}`);
          }
        }
      }

      const result = await taigaService.uploadAttachment(itemType, actualItemId, filePath, description);
      
      return createSuccessResponse(
        `${SUCCESS_MESSAGES.ATTACHMENT_UPLOADED}\n\n` +
        `**附件信息**\n` +
        `- 文件名: ${result.name}\n` +
        `- 大小: ${(result.size / 1024).toFixed(2)} KB\n` +
        `- 附件到: ${itemType} #${itemId}\n` +
        `- 上傳時間: ${new Date(result.created_date).toLocaleString()}\n` +
        `${result.description ? `- 描述: ${result.description}\n` : ''}`
      );
    } catch (error) {
      console.error('Error uploading attachment:', error);
      return createErrorResponse(`${ERROR_MESSAGES.FAILED_TO_UPLOAD_ATTACHMENT}: ${error.message}`);
    }
  }
};

/**
 * List attachments tool
 * Lists all attachments for an Issue, User Story, or Task
 */
export const listAttachmentsTool = {
  name: 'listAttachments',
  description: 'List all attachments for an Issue, User Story, or Task',
  inputSchema: attachmentTargetSchema,
  
  handler: async ({ itemType, itemId }) => {
    try {
      if (!taigaService.isAuthenticated()) {
        return createErrorResponse(ERROR_MESSAGES.AUTHENTICATION_FAILED);
      }

      const attachments = await taigaService.listAttachments(itemType, itemId);
      
      if (attachments.length === 0) {
        return createSuccessResponse(
          `**${itemType} #${itemId} 附件列表**\n\n` +
          `暫無附件`
        );
      }

      const attachmentList = attachments.map(att => {
        const sizeKB = (att.size / 1024).toFixed(2);
        const uploadDate = new Date(att.created_date).toLocaleDateString();
        return (
          `**${att.name}**\n` +
          `   - ID: ${att.id}\n` +
          `   - 大小: ${sizeKB} KB\n` +
          `   - 上傳日期: ${uploadDate}\n` +
          `   - 上傳者: ${att.owner_name || '未知'}\n` +
          `${att.description ? `   - 描述: ${att.description}\n` : ''}`
        );
      }).join('\n');

      return createSuccessResponse(
        `**${itemType} #${itemId} 附件列表** (共 ${attachments.length} 個)\n\n` +
        attachmentList
      );
    } catch (error) {
      console.error('Error listing attachments:', error);
      return createErrorResponse(ERROR_MESSAGES.FAILED_TO_LIST_ATTACHMENTS);
    }
  }
};

/**
 * Download attachment tool
 * Downloads an attachment by ID
 */
export const downloadAttachmentTool = {
  name: 'downloadAttachment',
  description: 'Download an attachment by ID',
  inputSchema: z.object({
    attachmentId: z.number({
      description: 'ID of the attachment to download'
    }),
    downloadPath: z.string().optional().describe('Optional local path to save the file')
  }),
  
  handler: async ({ attachmentId, downloadPath }) => {
    try {
      if (!taigaService.isAuthenticated()) {
        return createErrorResponse(ERROR_MESSAGES.AUTHENTICATION_FAILED);
      }

      const result = await taigaService.downloadAttachment(attachmentId, downloadPath);
      
      return createSuccessResponse(
        `${SUCCESS_MESSAGES.ATTACHMENT_DOWNLOADED}\n\n` +
        `**下載信息**\n` +
        `- 文件名: ${result.filename}\n` +
        `- 保存位置: ${result.savedPath}\n` +
        `- 文件大小: ${(result.size / 1024).toFixed(2)} KB`
      );
    } catch (error) {
      console.error('Error downloading attachment:', error);
      if (error.response?.status === 404) {
        return createErrorResponse(ERROR_MESSAGES.ATTACHMENT_NOT_FOUND);
      }
      return createErrorResponse(ERROR_MESSAGES.FAILED_TO_DOWNLOAD_ATTACHMENT);
    }
  }
};

/**
 * Delete attachment tool
 * Deletes an attachment by ID
 */
export const deleteAttachmentTool = {
  name: 'deleteAttachment',
  description: 'Delete an attachment by ID',
  inputSchema: z.object({
    attachmentId: z.number({
      description: 'ID of the attachment to delete'
    })
  }),
  
  handler: async ({ attachmentId }) => {
    try {
      if (!taigaService.isAuthenticated()) {
        return createErrorResponse(ERROR_MESSAGES.AUTHENTICATION_FAILED);
      }

      await taigaService.deleteAttachment(attachmentId);
      
      return createSuccessResponse(
        `${SUCCESS_MESSAGES.ATTACHMENT_DELETED}\n\n` +
        `附件 ID: ${attachmentId} 已成功刪除`
      );
    } catch (error) {
      console.error('Error deleting attachment:', error);
      if (error.response?.status === 404) {
        return createErrorResponse(ERROR_MESSAGES.ATTACHMENT_NOT_FOUND);
      }
      return createErrorResponse(ERROR_MESSAGES.FAILED_TO_DELETE_ATTACHMENT);
    }
  }
};

/**
 * Register all attachment tools with the MCP server
 */
export function registerAttachmentTools(server) {
  server.tool(uploadAttachmentTool.name, uploadAttachmentTool.inputSchema, uploadAttachmentTool.handler);
  server.tool(listAttachmentsTool.name, listAttachmentsTool.inputSchema, listAttachmentsTool.handler);
  server.tool(downloadAttachmentTool.name, downloadAttachmentTool.inputSchema, downloadAttachmentTool.handler);
  server.tool(deleteAttachmentTool.name, deleteAttachmentTool.inputSchema, deleteAttachmentTool.handler);
}