import { AfterViewInit, Directive, ElementRef, inject, Input } from '@angular/core';
import Sortable from 'sortablejs';

@Directive({
  selector: '[appSortable]',
})
export class SortableDirective implements AfterViewInit {
  @Input() sortableData: string[];

  private el = inject(ElementRef);

  ngAfterViewInit(): void {
    new Sortable(this.el.nativeElement, {
      animation: 250,
      onEnd: (event) => {
        if (this.sortableData) {
          const [movedItem] = this.sortableData.splice(event.oldIndex, 1);
          this.sortableData.splice(event.newIndex, 0, movedItem);
        }
      },
    });
  }
}
