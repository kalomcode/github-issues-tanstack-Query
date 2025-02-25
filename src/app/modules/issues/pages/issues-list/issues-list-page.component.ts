import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IssuesService } from '../../services/issues.service';
import { JsonPipe } from '@angular/common';
import { LabelsSelectorComponent } from '../../components/labels-selector/labels-selector.component';
import { IssueItemComponent } from '../../components/issue-item/issue-item.component';

@Component({
  selector: 'app-issues-list-page',
  standalone: true,
  imports: [RouterLink, JsonPipe, LabelsSelectorComponent, IssueItemComponent],
  templateUrl: './issues-list-page.component.html',
})
export default class IssuesListPageComponent {
  issuesSvc = inject(IssuesService);

  get labelsQuery() {
    return this.issuesSvc.labelsQuery;
  }

  get issuesQuery() {
    return this.issuesSvc.issuesQuery;
  }
}
