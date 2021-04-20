/**
 * MaptalksService
 */
import {
  Bounds,
  CoordinateSystem,
  ICoordinateSystemService,
  IGlobalConfigService,
  ILngLat,
  ILogService,
  IMapConfig,
  IMapService,
  IMercator,
  IPoint,
  IStatusOptions,
  IViewport,
  MapServiceEvent,
  MapStyle,
  TYPES,
} from '@antv/l7-core';
import { DOM } from '@antv/l7-utils';
import { mat4, vec2, vec3 } from 'gl-matrix';
import { inject, injectable } from 'inversify';
import * as maptalks from 'maptalks';

import { IMaptalksInstance } from '../../typings/index';
import Viewport from './Viewport';
const EventMap: {
  [key: string]: any;
} = {
  mapmove: 'move',
  camerachange: 'move',
  zoomchange: 'zoom',
  dragging: 'drag',
};
let mapdivCount = 0;
const LNGLAT_OFFSET_ZOOM_THRESHOLD = 12;
/**
 * AMapService
 */
@injectable()
export default class MaptalksService
  implements IMapService<maptalks.Map & IMaptalksInstance> {
  public map: maptalks.Map & IMaptalksInstance;

  @inject(TYPES.MapConfig)
  private readonly config: Partial<IMapConfig>;

  @inject(TYPES.IGlobalConfigService)
  private readonly configService: IGlobalConfigService;

  @inject(TYPES.ILogService)
  private readonly logger: ILogService;
  @inject(TYPES.ICoordinateSystemService)
  private readonly coordinateSystemService: ICoordinateSystemService;

  @inject(TYPES.IEventEmitter)
  private eventEmitter: any;
  private viewport: Viewport;
  private markerContainer: HTMLElement;
  private cameraChangedCallback: (viewport: IViewport) => void;
  private $mapContainer: HTMLElement | null;

  // init
  public addMarkerContainer(): void {
    const container = this.map.getMainPanel()
    this.markerContainer = DOM.create('div', 'l7-marker-container', container);
    this.markerContainer.setAttribute('tabindex', '-1');
  }

  public getMarkerContainer(): HTMLElement {
    return this.markerContainer;
  }

  //  map event
  public on(type: string, handle: (...args: any[]) => void): void {
    if (MapServiceEvent.indexOf(type) !== -1) {
      this.eventEmitter.on(type, handle);
    } else {
      // 统一事件名称
      this.map.on(EventMap[type] || type, handle);
    }
  }
  public off(type: string, handle: (...args: any[]) => void): void {
    this.map.off(EventMap[type] || type, handle);
  }

  public getContainer(): HTMLElement | null {
    return this.map.getMainPanel();
  }

  public getMapCanvasContainer(): HTMLElement {
    return this.map.getMainPanel() as HTMLElement;
  }

  public getSize(): [number, number] {
    const size = this.map.getSize();
    return [size.width, size.height];
  }
  // get mapStatus method

  public getType() {
    return 'mapbox';
  }

  public getZoom(): number {
    return this.map.getZoom()-1;
  }

  public setZoom(zoom: number) {
    return this.map.setZoom(zoom);
  }

  public getCenter(): ILngLat {
    const center = this.map.getCenter().toArray()
    return {lng: center[0], lat: center[1]}
  }

  public setCenter(lnglat: [number, number]): void {
    this.map.setCenter(new maptalks.Coordinate(lnglat));
  }

  public getPitch(): number {
    return this.map.getPitch();
  }

  public getRotation(): number {
    return this.map.getBearing()-90;
  }

  public getBounds(): Bounds {
    const extent = this.map.getExtent();
    return [[extent.xmin, extent.ymin],[extent.xmax, extent.ymax]];
  }

  public getMinZoom(): number {
    return this.map.getMinZoom();
  }

  public getMaxZoom(): number {
    return this.map.getMaxZoom();
  }

  public setRotation(rotation: number): void {
    this.map.setBearing(rotation + 90);
  }

  public zoomIn(option?: any, eventData?: any): void {
    this.map.zoomIn();
  }
  public zoomOut(option?: any, eventData?: any): void {
    this.map.zoomOut();
  }
  public setPitch(pitch: number) {
    return this.map.setPitch(pitch);
  }

  public panTo(p: [number, number]): void {
    this.map.panTo(new maptalks.Coordinate(p));
  }

  public panBy(pixel: [number, number]): void {
    this.map.panBy(new maptalks.Point(pixel));
  }

  public fitBounds(bound: Bounds, zoomOffset: number): void {
    this.map.fitExtent(new maptalks.Extent(bound[0][0],bound[0][1], bound[1][0],bound[1][1]),zoomOffset);
  }

  public setMaxZoom(max: number): void {
    this.map.setMaxZoom(max);
  }

  public setMinZoom(min: number): void {
    this.map.setMinZoom(min);
  }
  public setMapStatus(option: Partial<IStatusOptions>): void {
    if (option.doubleClickZoom === true) {
      this.configMap({'doubleClickZoom': true});
    }
    if (option.doubleClickZoom === false) {
      this.configMap({'doubleClickZoom': false});
    }
    if (option.dragEnable === false) {
      this.configMap({'dragEnable': false});
    }
    if (option.dragEnable === true) {
      this.configMap({'dragEnable': true});
    }
    if (option.rotateEnable === false) {
      this.configMap({'dragRotate': false});
    }
    if (option.rotateEnable === true) {
      this.configMap({'dragRotate': false});
    }
    // if (option.keyboardEnable === false) {
    //   this.configMap({'keyboardEnable ': false});
    // }
    // if (option.keyboardEnable === true) {
    //   this.configMap({'keyboardEnable ': false});
    // }
    if (option.zoomEnable === false) {
      this.configMap({'zoomable': false});
    }
    if (option.zoomEnable === true) {
      this.configMap({'zoomable': false});
    }
  }

  private configMap(option: object):void{

    this.map.config(option)
  }

  public setZoomAndCenter(zoom: number, center: [number, number]): void {
    this.map.setCenterAndZoom(new maptalks.Coordinate(center), zoom);
  }

  public setMapStyle(style: any): void {
    // this.map.setStyle(this.getMapStyle(style));
  }
  // TODO: 计算像素坐标
  public pixelToLngLat(pixel: [number, number]): ILngLat {
    const coordinate = this.map.viewPointToCoord(new maptalks.Point(pixel)).toArray()
    return {lng: coordinate[0], lat: coordinate[1]}
  }

  public lngLatToPixel(lnglat: [number, number]): IPoint {
    return this.map.coordToViewPoint(new maptalks.Coordinate(lnglat)).toJSON() as IPoint
  }

  public containerToLngLat(pixel: [number, number]): ILngLat {
    return this.pixelToLngLat(pixel);
  }

  public lngLatToContainer(lnglat: [number, number]): IPoint {
    return this.lngLatToPixel(lnglat);
  }
  public lngLatToMercator(
    lnglat: [number, number],
    altitude: number,
  ): IMercator {
    const {
      x = 0,
      y = 0,
      z = 0,
    } = window.mapboxgl.MercatorCoordinate.fromLngLat(lnglat, altitude);
    return { x, y, z };
  }
  public getModelMatrix(
    lnglat: [number, number],
    altitude: number,
    rotate: [number, number, number],
    scale: [number, number, number] = [1, 1, 1],
    origin: IMercator = { x: 0, y: 0, z: 0 },
  ): number[] {
    const modelAsMercatorCoordinate = window.mapboxgl.MercatorCoordinate.fromLngLat(
      lnglat,
      altitude,
    );
    // @ts-ignore
    const meters = modelAsMercatorCoordinate.meterInMercatorCoordinateUnits();
    const modelMatrix = mat4.create();

    mat4.translate(
      modelMatrix,
      modelMatrix,
      vec3.fromValues(
        modelAsMercatorCoordinate.x - origin.x,
        modelAsMercatorCoordinate.y - origin.y,
        modelAsMercatorCoordinate.z || 0 - origin.z,
      ),
    );

    mat4.scale(
      modelMatrix,
      modelMatrix,
      vec3.fromValues(meters * scale[0], -meters * scale[1], meters * scale[2]),
    );

    mat4.rotateX(modelMatrix, modelMatrix, rotate[0]);
    mat4.rotateY(modelMatrix, modelMatrix, rotate[1]);
    mat4.rotateZ(modelMatrix, modelMatrix, rotate[2]);

    return (modelMatrix as unknown) as number[];
  }

  public async init(): Promise<void> {
    const {
      id = 'map',
      mapInstance,
      center,
      zoom,
      baseLayer,
      rotation,
      ...rest
    } = this.config;

    this.viewport = new Viewport();

    /**
     * TODO: 使用 mapbox v0.53.x 版本 custom layer，需要共享 gl context
     * @see https://github.com/mapbox/mapbox-gl-js/blob/master/debug/threejs.html#L61-L64
     */

    // 判断全局 mapboxgl 对象的加载
    // if (!mapInstance && !window.maptalks) {
    //   // 用户有时传递进来的实例是继承于 mapbox 实例化的，不一定是 mapboxgl 对象。
    //   this.logger.error(this.configService.getSceneWarninfo('SDK'));
    // }

    if (mapInstance) {
      // @ts-ignore
      this.map = mapInstance;
      this.$mapContainer = this.map.getContainer();
    } else {
      this.$mapContainer = this.creatAmapContainer(id);
      // @ts-ignore
     
      this.map = new maptalks.Map(
        this.$mapContainer,
        {
          center: center,
          zoom: zoom,
          ...rest,
          baseLayer: new maptalks.TileLayer('base', {
            spatialReference: baseLayer.spatialReference,
            // urlTemplate: 'http://map.geoq.cn/arcgis/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}',
            urlTemplate: baseLayer.urlTemplate, // subdomains: ['a','b','c','d']
            subdomains:baseLayer.subdomains
            // attribution: '&copy; <a href="http://osm.org">OpenStreetMap</a> contributors, &copy; <a href="https://carto.com/">CARTO</a>'
          } as maptalks.TileLayerOptions)
        }
      );
    if(rotation) {
      this.setRotation(rotation)
    }
    this.map.on('load', this.handleCameraChanged);
    this.map.on('moving', this.handleCameraChanged);
    this.map.on('zooming', this.handleCameraChanged);
    this.map.on('dragrotating',this.handleCameraChanged);
    this.map.on('viewchange', this.handleCameraChanged);
    // 不同于高德地图，需要手动触发首次渲染
    this.handleCameraChanged();
      }
  }

  public destroy() {
    this.eventEmitter.removeAllListeners();
    if (this.map) {
      this.map.remove();
      this.$mapContainer = null;
    }
  }
  public emit(name: string, ...args: any[]) {
    this.eventEmitter.emit(name, ...args);
  }
  public once(name: string, ...args: any[]) {
    this.eventEmitter.once(name, ...args);
  }

  public getMapContainer() {
    return this.map.getMainPanel()
  }

  public exportMap(type: 'jpg' | 'png'): string {
    return this.map.toDataURL({mimeType: type});
  }
  public onCameraChanged(callback: (viewport: IViewport) => void): void {
    this.cameraChangedCallback = callback;
  }

  private handleCameraChanged = () => {
    // @see https://github.com/mapbox/mapbox-gl-js/issues/2572
    const centerCoords = this.map.getCenter().toArray()

    // resync
    this.viewport.syncWithMapCamera({
      bearing: this.map.getBearing(),
      center: [centerCoords[0], centerCoords[1]],
      viewportHeight: this.map.getSize().height,
      pitch: this.map.getPitch(),
      viewportWidth: this.map.getSize().width,
      zoom: this.getZoom(),
      // mapbox 中固定相机高度为 viewport 高度的 1.5 倍
      cameraHeight: 0,
    });

    const { offsetZoom = LNGLAT_OFFSET_ZOOM_THRESHOLD } = this.config;

    // set coordinate system
    if (this.viewport.getZoom() > offsetZoom) {
      this.coordinateSystemService.setCoordinateSystem(
        CoordinateSystem.LNGLAT_OFFSET,
      );
    } else {
      this.coordinateSystemService.setCoordinateSystem(CoordinateSystem.LNGLAT);
    }

    this.cameraChangedCallback(this.viewport);
  };

  // private creatAmapContainer(id: string | HTMLDivElement) {
  //   let $wrapper = id as HTMLDivElement;
  //   if (typeof id === 'string') {
  //     $wrapper = document.getElementById(id) as HTMLDivElement;
  //   }
  //   return $wrapper;
  // }
  private creatAmapContainer(id: string | HTMLDivElement) {
    let $wrapper = id as HTMLDivElement;
    if (typeof id === 'string') {
      $wrapper = document.getElementById(id) as HTMLDivElement;
    }
    const $amapdiv = document.createElement('div');
    $amapdiv.style.cssText += `
      position: absolute;
      top: 0;
      height: 100%;
      width: 100%;
    `;
    $amapdiv.id = 'l7_mapbox_div' + mapdivCount++;
    $wrapper.appendChild($amapdiv);
    return $amapdiv;
  }
}
