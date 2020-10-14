// @ts-ignore
import { IMapService } from '@antv/l7-core';
import { DOM, LngLat, Point } from '@antv/l7-utils';
import { Event } from './event';
export default class MapTouchEvent extends Event {
  /**
   * The event type.
   */
  public type: 'touchstart' | 'touchend' | 'touchcancel';

  /**
   * The `Map` object that fired the event.
   */
  public target: IMapService;

  /**
   * The DOM event which caused the map event.
   */
  public originalEvent: TouchEvent;

  /**
   * The geographic location on the map of the center of the touch event points.
   */
  public lngLat: LngLat;

  /**
   * The pixel coordinates of the center of the touch event points, relative to the map and measured from the top left
   * corner.
   */
  public point: Point;

  /**
   * The array of pixel coordinates corresponding to a
   * [touch event's `touches`](https://developer.mozilla.org/en-US/docs/Web/API/TouchEvent/touches) property.
   */
  public points: Point[];

  /**
   * The geographical locations on the map corresponding to a
   * [touch event's `touches`](https://developer.mozilla.org/en-US/docs/Web/API/TouchEvent/touches) property.
   */
  public lngLats: LngLat[];

  /**
   * `true` if `preventDefault` has been called.
   * @private
   */

  public defaultPrevented: boolean;

  /**
   * @private
   */
  constructor(type: string, map: IMapService, originalEvent: TouchEvent) {
    const touches =
      type === 'touchend'
        ? originalEvent.changedTouches
        : originalEvent.touches;
    const points = DOM.touchPos(map.getMapCanvasContainer(), touches);
    const lngLats = points.map((t: Point) => map.pixelToLngLat(t));
    const point = points.reduce(
      (prev: Point, curr: Point, i: number, arr: Point[]) => {
        return prev.add(curr.div(arr.length));
      },
      new Point(0, 0),
    );
    const lngLat = map.pixelToLngLat(point);
    super(type, { points, point, lngLats, lngLat, originalEvent });
    this.defaultPrevented = false;
  }

  /**
   * Prevents subsequent default processing of the event by the map.
   *
   * Calling this method will prevent the following default map behaviors:
   *
   *   * On `touchstart` events, the behavior of {@link DragPanHandler}
   *   * On `touchstart` events, the behavior of {@link TouchZoomRotateHandler}
   *
   */
  private preventDefault() {
    this.defaultPrevented = true;
  }
}
