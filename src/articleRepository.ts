import env from "dotenv";
import axios, { HttpStatusCode } from "axios";
import { Article } from "./article";
import { Version } from "@bitxenia/wiki-version-manager";

type ArticleResponse = {
  versions: string;
};

export class ArticleRepository {
  url: string;

  constructor(url: string) {
    env.config();

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
}
