export type Recipe = {
    recipeId: string;
    title: string;
    description: string;
    ingredients: string[];
    imageURL: string;
    ownerId: string;
    comments: string[];
  }
  export type Comment = {
    commentId: string;
    text: string;
    authorId: string;
    recipeId: string;
  };
  

  export type UserRole = 'ADMIN' | 'USER';

  export type User = {
    userId: string;
    username: string;
    email: string;
    role: UserRole;
    password: string;
  };

  export type CommentRequestDTO = {
    text: string;
  };

  export type RecipeRequestDTO = {
    title: string;
    description: string;
    ingredients: string[];
    imageURL: string;
    ownerId: string;
  }
  
  export type RegisterFormData = {
    username: string;
    password: string;
    email: string;
    role: UserRole;
  };
  
export type LoginFormData = {
  email: string;
  password: string;
};

  