/**
 * 評論系統MCP工具
 * Comment System MCP Tools for Taiga
 */

import { z } from 'zod';
import { TaigaService } from '../taigaService.js';
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '../constants.js';
import { 
  resolveProjectId,
  createErrorResponse,
  createSuccessResponse,
  formatDateTime,
  getSafeValue
} from '../utils.js';

const taigaService = new TaigaService();

/**
 * 添加評論工具
 */
export const addCommentTool = {
  name: 'addComment',
  schema: {
    itemType: z.enum(['issue', 'user_story', 'task']).describe('Type of item to comment on'),
    itemId: z.number().describe('ID of the issue, user story, or task'),
    comment: z.string().min(1).describe('Comment content to add')
  },
  handler: async ({ itemType, itemId, comment }) => {
    try {
      // 檢查認證狀態
      if (!taigaService.isAuthenticated()) {
        return createErrorResponse(ERROR_MESSAGES.AUTHENTICATION_FAILED);
      }

      // 構建簡單的評論數據 - addComment 只需要 comment 字段
      const commentData = {
        comment: comment
      };

      // 發送評論到Taiga (通過歷史API)
      const response = await taigaService.addComment(itemType, itemId, commentData);
      
      // 格式化響應
      const result = formatCommentResponse(response, 'added');
      return createSuccessResponse(`✅ ${SUCCESS_MESSAGES.COMMENT_ADDED}\n\n${result}`);
      
    } catch (error) {
      return createErrorResponse(`${ERROR_MESSAGES.FAILED_TO_ADD_COMMENT}: ${error.message}`);
    }
  }
};

/**
 * 查看評論列表工具
 */
export const listCommentsTool = {
  name: 'listComments',
  schema: {
    itemType: z.enum(['issue', 'user_story', 'task']).describe('Type of item to get comments for'),
    itemId: z.number().describe('ID of the issue, user story, or task')
  },
  handler: async ({ itemType, itemId }) => {
    try {
      // 獲取項目歷史記錄（包含評論）
      const history = await taigaService.getItemHistory(itemType, itemId);
      
      // 過濾出評論相關的歷史記錄
      const comments = filterCommentsFromHistory(history);
      
      if (!comments || comments.length === 0) {
        return createSuccessResponse(`📝 **${itemType} #${itemId} 評論列表**\n\n❌ 目前沒有評論`);
      }
      
      // 格式化評論列表
      const formattedComments = formatCommentsList(comments, itemType, itemId);
      return createSuccessResponse(formattedComments);
      
    } catch (error) {
      return createErrorResponse(`${ERROR_MESSAGES.FAILED_TO_LIST_COMMENTS}: ${error.message}`);
    }
  }
};

/**
 * 編輯評論工具
 */
export const editCommentTool = {
  name: 'editComment',
  schema: {
    commentId: z.number().describe('ID of the comment to edit'),
    newComment: z.string().min(1).describe('New comment content')
  },
  handler: async ({ commentId, newComment }) => {
    try {
      // 編輯評論
      const response = await taigaService.editComment(commentId, newComment);
      
      // 格式化響應
      const result = formatCommentResponse(response, 'edited');
      return createSuccessResponse(`✅ ${SUCCESS_MESSAGES.COMMENT_EDITED}\n\n${result}`);
      
    } catch (error) {
      if (error.response?.status === 404) {
        return createErrorResponse(ERROR_MESSAGES.COMMENT_NOT_FOUND);
      }
      return createErrorResponse(`${ERROR_MESSAGES.FAILED_TO_EDIT_COMMENT}: ${error.message}`);
    }
  }
};

/**
 * 刪除評論工具
 */
export const deleteCommentTool = {
  name: 'deleteComment',
  schema: {
    commentId: z.number().describe('ID of the comment to delete')
  },
  handler: async ({ commentId }) => {
    try {
      // 刪除評論
      await taigaService.deleteComment(commentId);
      
      return createSuccessResponse(`✅ ${SUCCESS_MESSAGES.COMMENT_DELETED}\n\n🗑️ 評論 #${commentId} 已成功刪除`);
      
    } catch (error) {
      if (error.response?.status === 404) {
        return createErrorResponse(ERROR_MESSAGES.COMMENT_NOT_FOUND);
      }
      return createErrorResponse(`${ERROR_MESSAGES.FAILED_TO_DELETE_COMMENT}: ${error.message}`);
    }
  }
};


/**
 * 從歷史記錄中過濾出評論
 */
function filterCommentsFromHistory(history) {
  if (!Array.isArray(history)) return [];
  
  return history.filter(entry => 
    // Taiga API returns type as number 1 for changes, not string 'change'
    entry.type === 1 && 
    entry.comment && 
    entry.comment.trim().length > 0
  );
}

/**
 * 格式化評論列表
 */
function formatCommentsList(comments, itemType, itemId) {
  let output = `📝 **${itemType.replace('_', ' ')} #${itemId} 評論列表**\n\n`;
  output += `🔢 共 ${comments.length} 個評論\n\n`;
  
  comments.forEach((comment, index) => {
    const user = getSafeValue(comment, 'user.full_name', comment.user?.username || '未知用戶');
    const createdDate = formatDateTime(comment.created_at);
    const commentText = getSafeValue(comment, 'comment', '無內容');
    
    output += `**${index + 1}. ${user}** 📅 ${createdDate}\n`;
    output += `💬 ${commentText}\n`;
    if (comment.id) {
      output += `🆔 評論ID: ${comment.id}\n`;
    }
    output += '\n';
  });
  
  return output;
}

/**
 * 格式化單個評論響應
 */
function formatCommentResponse(response, action) {
  const user = getSafeValue(response, 'user.full_name', response.user?.username || '未知用戶');
  const createdDate = formatDateTime(response.created_at);
  const commentText = getSafeValue(response, 'comment', '無內容');
  
  let output = `📝 **評論已${action === 'added' ? '添加' : '編輯'}**\n\n`;
  output += `👤 用戶: ${user}\n`;
  output += `📅 時間: ${createdDate}\n`;
  output += `💬 內容: ${commentText}\n`;
  if (response.id) {
    output += `🆔 評論ID: ${response.id}`;
  }
  
  return output;
}

/**
 * 註冊評論系統工具
 */
export function registerCommentTools(server) {
  server.tool(addCommentTool.name, addCommentTool.schema, addCommentTool.handler);
  server.tool(listCommentsTool.name, listCommentsTool.schema, listCommentsTool.handler);
  server.tool(editCommentTool.name, editCommentTool.schema, editCommentTool.handler);
  server.tool(deleteCommentTool.name, deleteCommentTool.schema, deleteCommentTool.handler);
}