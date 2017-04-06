import {Component, ElementRef, Host, Renderer2} from '@angular/core';
import {GridsterComponent} from './gridster.component';

@Component({
  selector: 'gridster-preview',
  template: ''
})
export class GridsterPreviewComponent {
  el: any;
  gridster: GridsterComponent;

  constructor(el: ElementRef, @Host() gridster: GridsterComponent, public renderer: Renderer2) {
    this.el = el.nativeElement;
    this.gridster = gridster;
    this.gridster.previewStyle = this.previewStyle.bind(this);
  }

  previewStyle() {
    if (!this.gridster.movingItem) {
      this.renderer.setStyle(this.el, 'display', 'none');
    } else {
      let margin = 0;
      const curRowHeight = this.gridster.state.curRowHeight;
      const curColWidth = this.gridster.state.curColWidth;
      if (this.gridster.options.outerMargin) {
        margin = this.gridster.state.options.margin;
      }
      this.renderer.setStyle(this.el, 'display', 'block');
      this.renderer.setStyle(this.el, 'height', (this.gridster.movingItem.rows * curRowHeight - margin) + 'px');
      this.renderer.setStyle(this.el, 'width', (this.gridster.movingItem.cols * curColWidth - margin) + 'px');
      this.renderer.setStyle(this.el, 'top', (this.gridster.movingItem.y * curRowHeight + margin) + 'px');
      this.renderer.setStyle(this.el, 'left', (this.gridster.movingItem.x * curColWidth + margin) + 'px');
      this.renderer.setStyle(this.el, 'marginBottom', margin + 'px');
    }
  }
}
