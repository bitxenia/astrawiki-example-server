import axios, { HttpStatusCode } from "axios";
import { Article } from "./article";
import { newVersion, Version } from "@bitxenia/wiki-version-manager";

type ArticleResponse = {
  versions: string;
};

export class ArticleRepository {
  url: string;

  constructor(url: string) {
    this.url = url;
  }

  async getArticle(articleName: string): Promise<Article> {
    const { data, status } = await axios.get<ArticleResponse>(
      `${this.url}/articles/${articleName}`,
    );

    if (status === HttpStatusCode.NotFound) {
      return Promise.reject("Article not found");
    } else if (status !== HttpStatusCode.Ok) {
      return Promise.reject("Server error");
    }

    const versions: Version[] = JSON.parse(data.versions);

    return new Article(articleName, versions);
  }

  async newArticle(articleName: string, articleContent: string): Promise<void> {
    const version = newVersion("", articleContent);

    const { status } = await axios.post(`${this.url}/articles`, {
      name: articleName,
      version,
    });

    if (status === HttpStatusCode.Conflict) {
      return Promise.reject("Article already exists");
    } else if (status !== HttpStatusCode.Created) {
      return Promise.reject(`Server error: ${status}`);
    }
  }

  async addVersion(
    articleName: string,
    newArticleContent: string,
    lastVersionFetched?: string,
  ): Promise<void> {
    const article = await this.getArticle(articleName);
    const newVersion = article.newContent(
      newArticleContent,
      lastVersionFetched,
    );

    const { status } = await axios.patch(
      `${this.url}/articles/${articleName}`,
      newVersion,
    );

    if (status === HttpStatusCode.BadRequest) {
      return Promise.reject("Bad request while editing article");
    } else if (status === HttpStatusCode.NotFound) {
      return Promise.reject("Article to edit not found");
    }
  }

  async getArticleList(): Promise<string[]> {
    const { data } = await axios.get<string[]>(`${this.url}/articles`);
    return data;
  }
}
