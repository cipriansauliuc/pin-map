import { Component, ElementRef, HostListener, Input, NgZone, OnInit } from '@angular/core';
import { Application, IApplicationOptions } from 'pixi.js';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  public app: Application;
  @Input() public devicePixelRatio = window.devicePixelRatio || 1;
  @Input() public applicationOptions: IApplicationOptions = {};

  constructor(private elementRef: ElementRef, private ngZone: NgZone) { }

  ngOnInit(): void {
    this.init();
  }

  init(): void {
    this.ngZone.runOutsideAngular(() => {
      this.app = new Application({});
    });
    this.elementRef.nativeElement.appendChild(this.app.view);
  }

  @HostListener('window:resize')
  public resize() {
    const width = this.elementRef.nativeElement.offsetWidth;
    const height = this.elementRef.nativeElement.offsetHeight;
    const viewportScale = 1 / this.devicePixelRatio;
    this.app.renderer.resize(width * this.devicePixelRatio, height * this.devicePixelRatio);
    this.app.view.style.transform = `scale(${viewportScale})`;
    this.app.view.style.transformOrigin = `top left`;
  }

  destroy() {
    this.app.destroy();
  }

  ngOnDestroy(): void {
    this.destroy();
  }

}
