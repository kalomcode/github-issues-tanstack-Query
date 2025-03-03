import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';
import { GitHubIssue, State } from '../../interfaces';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IssueService } from '../../services/issue.service';

@Component({
  selector: 'issue-item',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './issue-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IssueItemComponent {
  issue = input.required<GitHubIssue>();
  issueSvc = inject(IssueService);

  get isOpen() {
    return this.issue().state === State.Open;
  }

  prefecthData() {
    // this.issueSvc.prefetchIssue(this.issue().number.toString());
    this.issueSvc.setIssueDate(this.issue());
  }
}
