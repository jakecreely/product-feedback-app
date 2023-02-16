export interface GetData {
    currentUser:     User;
    productRequests: ProductRequest[];
}

export interface User {
    image:    string;
    name:     string;
    username: string;
}

export interface ProductRequest {
    id:          number;
    title:       string;
    category:    Category;
    upvotes:     number;
    status:      string;
    description: string;
    comments?:   Comment[];
}

export enum Category {
    Bug = "bug",
    Enhancement = "enhancement",
    Feature = "feature",
    UI = "ui",
    UX = "ux",
}

export interface Comment {
    id:       number;
    content:  string;
    user:     User;
    replies?: Reply[];
}

export interface Reply {
    content:    string;
    replyingTo: string;
    user:       User;
}
