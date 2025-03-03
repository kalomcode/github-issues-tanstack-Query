import { sleep } from '@helpers/sleep';
import { GitHubIssue } from '../interfaces';
import { environment } from 'src/environments/environment.development';

const GITHUB_TOKEN = environment.gitHubToken;
const BASE_URL = environment.baseUrl;

export const getIssueByNumber = async (
  issueNumber: string
): Promise<GitHubIssue> => {
  // await sleep(1500);

  try {
    const resp = await fetch(`${BASE_URL}/issues/${issueNumber}`, {
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
      },
    });

    if (!resp.ok) throw "Can't load issue";

    const issue: GitHubIssue = await resp.json();

    return issue;
  } catch (error) {
    throw `Can't load issue ${issueNumber}`;
  }
};
