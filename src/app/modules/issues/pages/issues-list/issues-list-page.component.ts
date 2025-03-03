import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IssuesService } from '../../services/issues.service';
import { JsonPipe } from '@angular/common';
import { LabelsSelectorComponent } from '../../components/labels-selector/labels-selector.component';
import { IssueItemComponent } from '../../components/issue-item/issue-item.component';
import { State } from '../../interfaces';

@Component({
  selector: 'app-issues-list-page',
  standalone: true,
  imports: [RouterLink, JsonPipe, LabelsSelectorComponent, IssueItemComponent],
  templateUrl: './issues-list-page.component.html',
})
export default class IssuesListPageComponent {
  issuesSvc = inject(IssuesService);
  currentState = computed(() => this.issuesSvc.selectedState());
  readonly STATE = State;

  get labelsQuery() {
    return this.issuesSvc.labelsQuery;
  }

  get issuesQuery() {
    return this.issuesSvc.issuesQuery;
  }

  onChangeState(newState: State) {
    const state =
      {
        [State.All]: State.All,
        [State.Open]: State.Open,
        [State.Closed]: State.Closed,
      }[newState] ?? State.All;
    this.issuesSvc.showIssuesByState(newState);
  }
}
