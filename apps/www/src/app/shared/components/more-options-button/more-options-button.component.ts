import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
export interface MoreOptionsItem {
  label: string;
  icon?: IconDefinition;
  onClick: () => void;
  type?: 'danger' | 'default';
}

@Component({
  selector: 'kr-more-options-button',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './more-options-button.component.html',
  styleUrls: ['./more-options-button.component.scss'],
})
export class MoreOptionsButtonComponent {
  @Input() items: MoreOptionsItem[] = [];

  public readonly faEllipsisVertical = faEllipsisVertical;
  public isOpen = false;

  public toggleMenu(event: Event): void {
    event.stopPropagation();
    this.isOpen = !this.isOpen;
  }

  public onItemClick(item: MoreOptionsItem, event: Event): void {
    event.stopPropagation();
    item.onClick();
    this.isOpen = false;
  }

  public onOutsideClick(): void {
    this.isOpen = false;
  }
}
