export interface CommentInterface {
  id: string;
  body: string;
  username: string;
  userId: string;
  parentId: string | null;
  createdAt: string;
}

export enum ActiveCommentTypeEnum {
  REPLYING,
  EDITING,
}

export interface ActiveComment {
  id: string;
  type: ActiveCommentTypeEnum;
}
