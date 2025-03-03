import { TestBed } from '@angular/core/testing';
import { IssuesService } from './issues.service';
import {
  provideTanStackQuery,
  QueryClient,
} from '@tanstack/angular-query-experimental';
import { State } from '../interfaces';

describe('IssuesService', () => {
  let service: IssuesService;
  const queryClient = new QueryClient();

  beforeEach(() => {
    TestBed.configureTestingModule({
      teardown: {
        destroyAfterEach: false,
      },
      providers: [provideTanStackQuery(new QueryClient())],
    });
    service = TestBed.inject(IssuesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load labelsQuery', async () => {
    const { data } = await service.labelsQuery.refetch();

    expect(data?.length).toBe(30);

    const [label] = data!;

    expect(typeof label.id).toBe('number');
    expect(typeof label.node_id).toBe('string');
    expect(typeof label.url).toBe('string');
    expect(typeof label.name).toBe('string');
    expect(typeof label.color).toBe('string');
    expect(typeof label.default).toBe('boolean');
    expect(typeof label.description).toBe('string');
  });

  it('should set selected state OPEN', async () => {
    service.showIssuesByState(State.Open);
    expect(service.selectedState()).toBe(State.Open);

    const { data: dataOpen } = await service.issuesQuery.refetch();
    console.log(dataOpen);

    dataOpen?.forEach((issue) => {
      expect(issue.state).toBe(State.Open);
    });
  });

  it('should set selected state CLOSED', async () => {
    service.showIssuesByState(State.Closed);
    expect(service.selectedState()).toBe(State.Closed);

    const { data: dataClosed } = await service.issuesQuery.refetch();
    console.log(dataClosed);

    dataClosed?.forEach((issue) => {
      expect(issue.state).toBe(State.Closed);
    });
  });
});
