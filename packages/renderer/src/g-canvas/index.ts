import { Canvas } from '@antv/g-canvas';
import { IRenderConfig, IRendererService } from '@antv/l7-core';
import { injectable } from 'inversify';
@injectable()
export default class GCanvasRendererService {
  private g: Canvas;
  private width: number;
  private height: number;
  public async init(container: HTMLElement, cfg: IRenderConfig): Promise<void> {
    this.g = new Canvas({
      container,
      width: 0,
      height: 0,
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
    this.g.changeSize(width, height);
    this.width = width;
    this.height = height;
  };

  public createModel() {}

  public clear() {}
  public destroy() {}
}
