import { Point } from '@antv/l7-utils';
import { ILngLat, IMapService } from '../map/IMapService';
export enum InteractionEvent {
  Hover = 'hover',
  Click = 'click',
  Select = 'select',
  Active = 'active',
  Drag = 'drag',
}
export interface IInteractionTarget {
  x: number;
  y: number;
  lngLat: ILngLat;
  type: string;
  featureId?: number;
}

export interface IInteractionService {
  init(): void;
  destroy(): void;
  addInteraction(
    handlerName: string,
    handler: IHandler,
    allowed?: string[],
  ): void;
  on(
    eventName: InteractionEvent,
    callback: (params: IInteractionTarget) => void,
  ): void;
  triggerHover({ x, y, type }: Partial<IInteractionTarget>): void;
  triggerSelect(id: number): void;
  triggerActive(id: number): void;
}

export interface IHandlerResult {
  panDelta?: Point;
  zoomDelta?: number;
  bearingDelta?: number;
  pitchDelta?: number;
  around?: Point | null;
  pinchAround?: Point | null;
  cameraAnimation?: (map: IMapService) => any;
  originalEvent?: any;
  // Makes the manager trigger a frame; allowing the handler to return multiple results over time (see scrollzoom).
  needsRenderFrame?: boolean;
  noInertia?: boolean;
}

export interface IHandler {
  // Handlers can optionally implement these methods.
  // They are called with dom events whenever those dom evens are received.
  touchstart?: (
    e: TouchEvent,
    points: Point[],
    mapTouches: Touch[],
  ) => IHandlerResult | void;
  touchmove?: (
    e: TouchEvent,
    points: Point[],
    mapTouches: Touch[],
  ) => IHandlerResult | void;
  touchend?: (
    e: TouchEvent,
    points: Point[],
    mapTouches: Touch[],
  ) => IHandlerResult | void;
  touchcancel?: (
    e: TouchEvent,
    points: Point[],
    mapTouches: Touch[],
  ) => IHandlerResult | void;
  mousedown?: (e: MouseEvent, point: Point) => IHandlerResult | void;
  mousemove?: (e: MouseEvent, point: Point) => IHandlerResult | void;
  mouseup?: (e: MouseEvent, point: Point) => IHandlerResult | void;
  dblclick?: (e: MouseEvent, point: Point) => IHandlerResult | void;
  wheel?: (e: WheelEvent, point: Point) => IHandlerResult | void;
  keydown?: (e: KeyboardEvent) => IHandlerResult | void;
  keyup?: (e: KeyboardEvent) => IHandlerResult | void;

  // `renderFrame` is the only non-dom event. It is called during render
  // frames and can be used to smooth camera changes (see scroll handler).
  renderFrame?: () => IHandlerResult | void;
  enable(options?: any): void;
  disable(): void;
  isEnabled(): boolean;
  isActive(): boolean;

  // `reset` can be called by the manager at any time and must reset everything to it's original state
  reset(): void;
}
