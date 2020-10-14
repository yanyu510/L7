// @ts-ignore
import { IMapService } from '@antv/l7-core';
import { DOM, Point } from '@antv/l7-utils';
import { Event } from './events/event';

/**
 * The `BoxZoomHandler` allows the user to zoom the map to fit within a bounding box.
 * The bounding box is defined by clicking and holding `shift` while dragging the cursor.
 */
class BoxZoomHandler {
  private map: IMapService;
  private el: HTMLElement;
  private container: HTMLElement;
  private enabled: boolean;
  private active: boolean;
  private startPos: Point;
  private lastPos: Point;
  private box: HTMLElement | null;
  private clickTolerance: number;

  /**
   * @private
   */
  constructor(
    map: IMapService,
    options: {
      clickTolerance: number;
    },
  ) {
    this.map = map;
    this.el = map.getMapCanvasContainer() as HTMLElement;
    this.container = map.getMapContainer() as HTMLElement;
    this.clickTolerance = options.clickTolerance || 1;
  }

  /**
   * Returns a Boolean indicating whether the "box zoom" interaction is enabled.
   *
   * @returns {boolean} `true` if the "box zoom" interaction is enabled.
   */
  public isEnabled() {
    return !!this.enabled;
  }

  /**
   * Returns a Boolean indicating whether the "box zoom" interaction is active, i.e. currently being used.
   *
   * @returns {boolean} `true` if the "box zoom" interaction is active.
   */
  public isActive() {
    return !!this.active;
  }

  /**
   * Enables the "box zoom" interaction.
   *
   * @example
   *   map.boxZoom.enable();
   */
  public enable() {
    if (this.isEnabled()) {
      return;
    }
    this.enabled = true;
  }

  /**
   * Disables the "box zoom" interaction.
   *
   * @example
   *   map.boxZoom.disable();
   */
  public disable() {
    if (!this.isEnabled()) {
      return;
    }
    this.enabled = false;
  }

  public mousedown(e: MouseEvent, point: Point) {
    if (!this.isEnabled()) {
      return;
    }
    if (!(e.shiftKey && e.button === 0)) {
      return;
    }

    DOM.disableDrag();
    this.startPos = this.lastPos = point;
    this.active = true;
  }

  public mousemoveWindow(e: MouseEvent, point: Point) {
    if (!this.active) {
      return;
    }

    const pos = point;

    if (
      this.lastPos.equals(pos) ||
      (!this.box && pos.dist(this.startPos) < this.clickTolerance)
    ) {
      return;
    }

    const p0 = this.startPos;
    this.lastPos = pos;

    if (!this.box) {
      this.box = DOM.create('div', 'l7-boxzoom', this.container);
      this.container.classList.add('l7-crosshair');
      this.fireEvent('boxzoomstart', e);
    }
    const minX = Math.min(p0.x, pos.x);
    const maxX = Math.max(p0.x, pos.x);
    const minY = Math.min(p0.y, pos.y);
    const maxY = Math.max(p0.y, pos.y);

    DOM.setTransform(this.box, `translate(${minX}px,${minY}px)`);
    if (this.box) {
      this.box.style.width = `${maxX - minX}px`;
      this.box.style.height = `${maxY - minY}px`;
    }
  }

  public mouseupWindow(e: MouseEvent, point: Point) {
    if (!this.active) {
      return;
    }

    if (e.button !== 0) {
      return;
    }

    const p0 = this.startPos;
    const p1 = point;

    this.reset();

    DOM.suppressClick();

    if (p0.x === p1.x && p0.y === p1.y) {
      this.fireEvent('boxzoomcancel', e);
    } else {
      // this.map.emit(
      //   'boxzoomend',
      //   new Event('boxzoomend', { originalEvent: e }),
      // );
      return {
        // TODO
        // cameraAnimation: (map: IMapService) =>
        //   map.fitScreenCoordinates(p0, p1, this.map.getRotation(), {
        //     linear: true,
        //   }),
      };
    }
  }

  public keydown(e: KeyboardEvent) {
    if (!this.active) {
      return;
    }

    if (e.keyCode === 27) {
      this.reset();
      this.fireEvent('boxzoomcancel', e);
    }
  }

  public reset() {
    this.active = false;

    this.container.classList.remove('l7-crosshair');

    if (this.box) {
      DOM.remove(this.box);
      this.box = null;
    }

    DOM.enableDrag();

    delete this.startPos;
    delete this.lastPos;
  }

  public fireEvent(type: string, e: any) {
    // return this.map.emit(type, new Event(type, { originalEvent: e }));
  }
}

export default BoxZoomHandler;
