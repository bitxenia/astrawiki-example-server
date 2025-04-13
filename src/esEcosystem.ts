import { ArticleInfo, ExampleServerImpl } from ".";
import axios, { HttpStatusCode } from "axios";
// import { Ecosystem, OptIn } from "./ecosystem";
// import { Article } from "../articles/article";
// import { Version } from "../articles/version";
import env from "dotenv";

env.config();

const PORT = process.env.PORT ? process.env.PORT : 3001;
const URL =
  process.env.NEXT_PUBLIC_RUN_ENV === "prod"
    ? process.env.NEXT_PUBLIC_EXAMPLE_SERVER_URL
    : `http://localhost:${PORT}`;

type ArticleResponse = {
  versions: string;
};

export class ExampleServerEcosystem implements ExampleServerImpl {
  //   optIn?: OptIn = {
  //     createWithContent: true,
  //     optimizedSearch: true,
  //   };

  async start(): Promise<void> {
    console.log("Initializing");
  }

  async getArticle(
    articleName: string,
    articleVersionID?: string,
  ): Promise<ArticleInfo> {
    return;
    // if (name.length === 0) {
    //   throw Error("No name given");
    // }
    // const { data, status } = await axios.get<ArticleResponse>(
    //   `${URL}/articles/${name}`
    // );
    // if (status === HttpStatusCode.NotFound) {
    //   throw Error("Article not found in ecosystem");
    // } else if (status !== HttpStatusCode.Ok) {
    //   throw Error("Server error");
    // }
    // return new Article(name, JSON.parse(data.versions));
  }

  async newArticle(articleName: string, articleContent: string): Promise<void> {
    // if (name.length === 0) {
    //   throw Error("Name cannot be empty");
    // }
    // console.log(`Name: ${name}`);
    // const { status } = version
    //   ? await axios.post(`${URL}/articles/`, { name, version })
    //   : await axios.post(`${URL}/articles/`, { name });
    // if (status === HttpStatusCode.Conflict) {
    //   throw Error("Article already exists");
    // } else if (status !== HttpStatusCode.Created) {
    //   throw Error(`Server error: ${status}`);
    // }
    // console.log("Article posted succesfully");
  }

  async editArticle(
    articleName: string,
    newArticleContent: string,
  ): Promise<void> {
    // if (name.length === 0) {
    //   throw Error("No name given");
    // }
    // const { status } = await axios.patch(`${URL}/articles/${name}`, version);
    // if (status === HttpStatusCode.BadRequest) {
    //   throw Error("Bad request while editing article");
    // } else if (status === HttpStatusCode.NotFound) {
    //   throw Error("Article to edit not found");
    // }
  }

  async getArticleList(): Promise<string[]> {
    return [];
    // const { data } = await axios.get<string[]>(`${URL}/articles`);
    // return data;
  }

  async searchArticles(
    query: string,
    limit: number = 10,
    offset: number = 0,
  ): Promise<string[]> {
    return [];
    // const { data } = await axios.get<string[]>(`${URL}/articles`, {
    //   params: {
    //     query,
    //     limit,
    //     offset,
    //   },
    // });
    // return data;
  }

  async stop(): Promise<void> {
    // Nothing to stop
  }
}

export default ExampleServerEcosystem;
