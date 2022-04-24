import { CommentService } from '../services/comment.service';
import { CommentsComponent } from './comments.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentComponent } from './comment/comment.component';
import { CommentFormComponent } from './comment-form/comment-form.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [CommentsComponent, CommentComponent, CommentFormComponent],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [CommentsComponent],
  providers: [CommentService],
})
export class CommentsModule {}
