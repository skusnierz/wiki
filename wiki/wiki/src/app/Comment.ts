export interface Comment {
    content: string;
    studentID: string;
}

export interface CommentCategory {
    category: string;
    comments: Comment[];
}
