import { environment } from 'src/environments/environment.development';
import { getIssueByNumber } from '.';

const GITHUB_TOKEN = environment.gitHubToken;
const issueNumber = '123';
const BASE_URL = environment.baseUrl;

const mockIssue = {
  id: 123,
  number: '123',
  body: '# Hola Mundo',
};

describe('GetIssueByNumberAction', () => {
  it('should fetch issue successfully', async () => {
    const requestURL = `${BASE_URL}/issues/${issueNumber}`;
    const issueResponse = new Response(JSON.stringify(mockIssue), {
      status: 200,
      statusText: 'OK',
    });

    spyOn(window, 'fetch').and.resolveTo(issueResponse);

    const issue = await getIssueByNumber(issueNumber);

    expect(window.fetch).toHaveBeenCalledWith(requestURL, {
      headers: { Authorization: `Bearer ${GITHUB_TOKEN}` },
    });
  });

  it('should not fetch issue successfully', async () => {
    const requestURL = `${BASE_URL}/issues/${issueNumber}`;
    const issueResponse = new Response(null, {
      status: 404,
      statusText: 'Not Found',
    });

    spyOn(window, 'fetch').and.resolveTo(issueResponse);

    try {
      await getIssueByNumber(issueNumber);
      expect(true).toBe(false);
    } catch (error) {
      expect(error).toBe(`Can't load issue ${issueNumber}`);
    }
  });
});
