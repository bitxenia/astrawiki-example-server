import { ArticleInfo, ExampleServerNode } from ".";
import { VersionManager } from "@bitxenia/wiki-version-manager";
import { ArticleRepository } from "./articleRepository";

export class ExampleServerEcosystem implements ExampleServerNode {
  url: string;
  articleRepository: ArticleRepository;
  versionManager: VersionManager;

  async start(url: string): Promise<void> {
    console.log("Initializing");
    this.articleRepository = new ArticleRepository(url);
  }

  async getArticle(
    articleName: string,
    articleVersionID?: string,
  ): Promise<ArticleInfo> {
    const article = await this.articleRepository.getArticle(articleName);

    const articleContent = article.getContent(articleVersionID);
    const articleVersions = article.getVersions();

    return {
      name: articleName,
      content: articleContent,
      versionsInfo: articleVersions,
    };
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
