import {
  ActiveCommentTypeEnum,
  ActiveComment,
  CommentInterface,
} from './../../types/types';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
})
export class CommentComponent implements OnInit {
  @Input() comment!: CommentInterface;
  @Input() currentUserId!: string;
  @Input() replies: CommentInterface[] = [];
  @Input() activeComment: ActiveComment | null = null;
  @Input() parentId: string | null = null;

  canReply: boolean = false;
  canEdit: boolean = false;
  canDelete: boolean = false;
  replyId: string | null = null;

  public activeCommentType = ActiveCommentTypeEnum;

  @Output() setActiveComment = new EventEmitter<ActiveComment | null>();
  @Output() addComment = new EventEmitter<{
    text: string;
    parentId: string | null;
  }>();
  @Output() updateComment = new EventEmitter<{
    text: string;
    commentId: string;
  }>();
  @Output() deleteComment = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {
    const allowed_edit_delete_timing = 30000;
    const timePassed =
      new Date().getMilliseconds() -
        new Date(this.comment.createdAt).getMilliseconds() >
      allowed_edit_delete_timing;
    this.canReply = Boolean(this.currentUserId);
    this.canEdit = this.currentUserId === this.comment.userId && !timePassed;
    this.canDelete =
      this.currentUserId === this.comment.userId &&
      !timePassed &&
      this.replies.length === 0;
    this.replyId = this.parentId ? this.parentId : this.comment.id;
  }

  isReplying(): boolean {
    if (!this.activeComment) {
      return false;
    }
    return (
      this.activeComment.id === this.comment.id &&
      this.activeComment.type === this.activeCommentType.REPLYING
    );
  }

  isEditing(): boolean {
    if (!this.activeComment) {
      return false;
    }
    return (
      this.activeComment.id === this.comment.id &&
      this.activeComment.type === this.activeCommentType.EDITING
    );
  }
}
