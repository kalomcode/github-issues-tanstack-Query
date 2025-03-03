import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';
import { GitHubLabel } from '../../interfaces';
import { CommonModule } from '@angular/common';
import { IssuesService } from '../../services/issues.service';

@Component({
  selector: 'issues-labels-selector',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './labels-selector.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LabelsSelectorComponent {
  labels = input.required<GitHubLabel[]>();
  issuesSvc = inject(IssuesService);

  isSelected(labelName: string) {
    return this.issuesSvc.selectedLabels().has(labelName);
  }

  onToggleLabel(labelName: string) {
    this.issuesSvc.toggleLabel(labelName);
  }
}
