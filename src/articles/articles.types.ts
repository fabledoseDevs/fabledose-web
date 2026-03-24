export interface ArticleSection {
  title?: string;
  paragraphs?: string | string[];
  list?: string[];
}

export interface ArticleData {
  title: string;
  url: string;
  sections: ArticleSection[];
}
