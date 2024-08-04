import fs from "fs/promises";
import { marked } from "marked";

type Post = {
  postName: string;
  categories: string[];
  contents: string,
};

type postMetaTag = {
  categories: string[],
}

const postsRootDir = "posts";

export async function getPosts(): Promise<Post[]> {
  const postDirs = await fs.readdir(postsRootDir);
  return Promise.all(postDirs.map(async (postDir) => {
    const fileName = postDir;
    const tag: postMetaTag = JSON.parse((await fs.readFile(`${postsRootDir}/${postDir}/${fileName}.json`)).toString());
    const contents = await marked((await fs.readFile(`${postsRootDir}/${postDir}/${fileName}.md`)).toString());
    const post: Post = {
      postName: postDir,
      categories: tag.categories,
      contents:  contents,
    };
    return post;
  }));
}

console.log(await getPosts());