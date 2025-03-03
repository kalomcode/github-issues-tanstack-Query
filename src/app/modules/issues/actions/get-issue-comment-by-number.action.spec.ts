import { environment } from 'src/environments/environment.development';
import { getIssueCommentsByNumber } from '.';

const GITHUB_TOKEN = environment.gitHubToken;
const BASE_URL = environment.baseUrl;
const issueNumber = '123';
const mockComment: any[] = [
  { id: 1, body: 'First comment', user: { login: 'user1' } },
  { id: 2, body: 'Second comment', user: { login: 'user2' } },
];

describe('GetIssueCommentByNumberAction', () => {
  it('should fetch issue comment successfully', async () => {
    const requestURL = `${BASE_URL}/issues/${issueNumber}/comments`;
    const issueResponse = new Response(JSON.stringify(mockComment), {
      status: 200,
      statusText: 'OK',
    });

    spyOn(window, 'fetch').and.resolveTo(issueResponse);

    const issueComments = await getIssueCommentsByNumber(issueNumber);

    expect(window.fetch).toHaveBeenCalledWith(requestURL, {
      headers: { Authorization: `Bearer ${GITHUB_TOKEN}` },
    });
  });
  it('should throw an error if the response is not ok', async () => {
    const requestURL = `${BASE_URL}/issues/${issueNumber}/comments`;
    const issueCommentsResponse = new Response(null, {
      status: 404,
      statusText: 'Not Found',
    });

    spyOn(window, 'fetch').and.resolveTo(issueCommentsResponse);

    try {
      await getIssueCommentsByNumber(issueNumber);
      expect(true).toBe(false);
    } catch (error) {
      expect(error).toBe("Can't load issueCommnets");
    }
  });
});
