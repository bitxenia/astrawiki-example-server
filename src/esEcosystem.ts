import { ArticleInfo, ExampleServerNode } from ".";
import { VersionID, VersionManager } from "@bitxenia/wiki-version-manager";
import { ArticleRepository } from "./articleRepository";

export class ExampleServerEcosystem implements ExampleServerNode {
  articleRepository: ArticleRepository;
  versionManager: VersionManager;
  lastVersionFetchedByArticle: Map<string, VersionID>;

  async start(url: string): Promise<void> {
    console.log("Initializing");
    this.articleRepository = new ArticleRepository(url);
    this.lastVersionFetchedByArticle = new Map();
  }

  async getArticle(
    articleName: string,
    articleVersionID?: string,
  ): Promise<ArticleInfo> {
    const article = await this.articleRepository.getArticle(articleName);

    this.lastVersionFetchedByArticle.set(
      articleName,
      article.getCurrentVersionID(),
    );

    const articleContent = article.getContent(articleVersionID);
    const articleVersions = article.getVersions();

    return {
      name: articleName,
      content: articleContent,
      versionsInfo: articleVersions,
    };
  }

  async newArticle(articleName: string, articleContent: string): Promise<void> {
    if (articleName.length === 0) {
      throw Error("Name cannot be empty");
    }

    await this.articleRepository.newArticle(articleName, articleContent);
  }

  async editArticle(
    articleName: string,
    newArticleContent: string,
  ): Promise<void> {
    if (articleName.length === 0) {
      throw Error("No name given");
    }

    const lastVersionFetched =
      this.lastVersionFetchedByArticle.get(articleName);

    if (!lastVersionFetched) {
      throw Error(
        `Article ${articleName} was not previously fetched. Fetched articles: ${this.lastVersionFetchedByArticle.keys()}`,
      );
    }

    await this.articleRepository.addVersion(
      articleName,
      newArticleContent,
      lastVersionFetched,
    );
  }

  async getArticleList(): Promise<string[]> {
    return this.articleRepository.getArticleList();
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
}

export default ExampleServerEcosystem;
