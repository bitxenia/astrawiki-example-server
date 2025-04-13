import ExampleServerEcosystem from "./esEcosystem";

export async function createExampleServerImplNode(): Promise<ExampleServerImpl> {
  const node = new ExampleServerEcosystem();
  await node.start();
  return node;
}

export interface ExampleServerImpl {
  /**
   * Starts the Node
   */

  start(): Promise<void>;

  /**
   * Gets an existing article
   */
  getArticle(
    articleName: string,
    articleVersionID?: string,
  ): Promise<ArticleInfo>;

  /**
   * Creates a new article
   */
  newArticle(articleName: string, articleContent: string): Promise<void>;

  /**
   * Edits an existing article
   */
  editArticle(articleName: string, newArticleContent: string): Promise<void>;

  /**
   * Gets the list of articles in the wiki
   */
  getArticleList(): Promise<string[]>;

  /**
   * Stops the Node
   */
  stop(): Promise<void>;
}

export type ArticleInfo = {
  name: string;
  content: string;
  versionsInfo: VersionInfo[];
};

export type VersionInfo = {
  id: string;
  date: string;
  parent: string | null;
  mainBranch: boolean;
};
