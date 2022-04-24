import { CommentInterface } from '../types/types';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  constructor(private httpClient: HttpClient) {}

  getComments(): Observable<CommentInterface[]> {
    return this.httpClient.get<CommentInterface[]>(
      'http://localhost:3000/comments'
    );
  }

  createComment(
    text: string,
    parentId: null | string
  ): Observable<CommentInterface> {
    return this.httpClient.post<CommentInterface>(
      'http://localhost:3000/comments',
      {
        body: text,
        parentId,
        // Should not be set here with actual server implementation
        createdAt: new Date().toISOString(),
        userId: '1',
        username: 'John',
      }
    );
  }

  updateComment(commentId: string, text: string): Observable<CommentInterface> {
    return this.httpClient.patch<CommentInterface>(
      `http://localhost:3000/comments/${commentId}`,
      { body: text }
    );
  }

  deleteComment(commentId: string): Observable<CommentInterface> {
    return this.httpClient.delete<CommentInterface>(
      `http://localhost:3000/comments/${commentId}`
    );
  }
}
