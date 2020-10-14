// @ts-ignore
import { IMapService } from '@antv/l7-core';
import Point from './geo/point';

export default class ClickZoomHandler {
  private enabled: boolean;
  private active: boolean;

  constructor() {
    this.reset();
  }

  public reset() {
    this.active = false;
  }

  public dblclick(e: MouseEvent, point: Point) {
    e.preventDefault();
    return {
      cameraAnimation: (map: IMapService) => {
        // map.(
        //   {
        //     duration: 300,
        //     zoom: map.getZoom() + (e.shiftKey ? -1 : 1),
        //     around: map.lngLatToPixel(point),
        //   },
        //   { originalEvent: e },
        // );
      },
    };
  }

  public enable() {
    this.enabled = true;
  }
  public disable() {
    this.enabled = false;
    this.reset();
  }

  public isEnabled() {
    return this.enabled;
  }

  public isActive() {
    return this.active;
  }
}
