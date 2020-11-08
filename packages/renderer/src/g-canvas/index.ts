import { Canvas } from '@antv/g-canvas';
import {
  IAttribute,
  IAttributeInitializationOptions,
  IBuffer,
  IBufferInitializationOptions,
  IElements,
  IElementsInitializationOptions,
  IModel,
  IReadPixelsOptions,
  IRenderConfig,
  IRendererService,
  ITexture2D,
  ITexture2DInitializationOptions,
} from '@antv/l7-core';
import { injectable } from 'inversify';
@injectable()
export default class GCanvasRendererService implements IRendererService {
  private g: Canvas;
  private width: number;
  private height: number;
  private canvas: HTMLCanvasElement;
  private $container: HTMLDivElement | null;
  public createAttribute(options: IAttributeInitializationOptions): IAttribute {
    throw new Error('Method not implemented.');
  }
  public createBuffer(options: IBufferInitializationOptions): IBuffer {
    throw new Error('Method not implemented.');
  }
  public createElements(options: IElementsInitializationOptions): IElements {
    throw new Error('Method not implemented.');
  }
  public createTexture2D(options: ITexture2DInitializationOptions): ITexture2D {
    throw new Error('Method not implemented.');
  }
  public useFramebuffer(
    framebuffer: import('../../../core/src').IFramebuffer | null,
    drawCommands: () => void,
  ): void {
    throw new Error('Method not implemented.');
  }
  public getViewportSize(): { width: number; height: number } {
    return {
      width: this.width,
      height: this.height,
    };
  }
  public getContainer = (): HTMLElement | null => {
    return this.$container;
  };

  public getCanvas = (): HTMLCanvasElement | null => {
    throw this.canvas;
  };
  public getGLContext = (): Canvas => {
    return this.g
  }
  public readPixels(options: IReadPixelsOptions): Uint8Array {
    throw new Error('Method not implemented.');
  }
  public setBaseState(): void {
    throw new Error('Method not implemented.');
  }
  public setCustomLayerDefaults(): void {
    throw new Error('Method not implemented.');
  }
  public setDirty(flag: boolean): void {
    throw new Error('Method not implemented.');
  }
  public getDirty(): boolean {
    throw new Error('Method not implemented.');
  }
  public async init(
    container: HTMLDivElement,
    cfg: IRenderConfig,
  ): Promise<void> {
    this.$container = container;
    const w = this.$container?.clientWidth || 400;
    const h = this.$container?.clientHeight || 300;
    this.g = new Canvas({
      container,
      width: w,
      height: h,
    });
  }

  public viewport = ({
    x,
    y,
    width,
    height,
  }: {
    x: number;
    y: number;
    width: number;
    height: number;
  }) => {
    // use WebGL context directly
    // @see https://github.com/regl-project/regl/blob/gh-pages/API.md#unsafe-escape-hatch

    const w = this.$container?.clientWidth || 400;
    const h = this.$container?.clientHeight || 300;
    this.width = w;
    this.height = h;
    this.g.changeSize(w, h);
  };

  public createModel(): IModel {
    throw new Error('not implement');
  }

  public clear() {
    return;
  }
  public destroy() {
    return;
  }

  public createFramebuffer = (options: any) => {
    throw new Error('not implement');
  };
}
