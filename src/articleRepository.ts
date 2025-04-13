import env from "dotenv";
import axios, { HttpStatusCode } from "axios";
import { Article } from "./article";
import { Version } from "@bitxenia/wiki-version-manager";

type ArticleResponse = {
  versions: string;
};

export class ArticleRepository {
  url: string;

  constructor() {
    env.config();

    const PORT = process.env.EXAMPLE_SERVER_PORT
      ? process.env.EXAMPLE_SERVER_PORT
      : 3001;

    this.url =
      process.env.EXAMPLE_SERVER_RUN_ENV === "prod"
        ? process.env.EXAMPLE_SERVER_URL
        : `http://localhost:${PORT}`;
  }

  async getArticle(articleName: string): Promise<Article> {
    const { data, status } = await axios.get<ArticleResponse>(
      `${this.url}/articles/${articleName}`
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
