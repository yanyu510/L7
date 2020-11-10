import { Canvas } from '@antv/g-canvas';
import { IEncodeFeature } from '@antv/l7-core';
import BaseLayer from '../core/BaseLayer';
interface IPointLayerStyleOptions {
  opacity: number;
  strokeWidth: number;
  stroke: string;
  strokeOpacity: number;
}
export default class PointLayer extends BaseLayer<IPointLayerStyleOptions> {
  public buildModels() {
    const gRender = this.rendererService.getGLContext() as Canvas;
    const encodeData = this.getEncodedData();
    const {
      opacity,
      strokeWidth = 1,
      stroke = '#fff',
    } = this.getLayerConfig() as IPointLayerStyleOptions;

    const shapes = encodeData.forEach((feature: IEncodeFeature) => {
      const { coordinates, size, color } = feature;
      gRender.addShape('circle', {
        attrs: {
          x: coordinates[0],
          y: coordinates[1],
          r: size,
          fill: color,
          lineWidth: strokeWidth,
          stroke,
        },
      });
    });

    // this.layerModel = new PointModels[modelType](this);
    // this.models = this.layerModel.initModels();
  }
  public rebuildModels() {
    // this.models = this.layerModel.buildModels();
  }
}
