export interface Post {
  title: string;
  descr: string;
  cover: string;
  create: string;
  update?: string;
  slug: string,
  content: string;
  createFormatted?: string;
  updateFormatted?: string;
};

export interface PostPreview {
  slug: string,
  title: string;
  descr: string;
  cover: string;
  create: string;
  createFormatted: string;
  // content?: string;
}