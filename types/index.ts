export enum OpenAIModel {
  DAVINCI_TURBO = "gpt-3.5-turbo"
}

export type WBWPost = {
  title: string;
  url: string;
  date: string;
  type: "post" | "mini";
  content: string;
  length: number;
  tokens: number;
};

export type DocumentChunk = {
  title: string;
  url: string;
  post_date: string | undefined;
  content: string;
};

export type WBWJSON = {
  current_date: string;
  author: string;
  url: string;
  length: number;
  tokens: number;
  posts: WBWPost[];
};
