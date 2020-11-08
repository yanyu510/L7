import { IEncodeFeature } from '@antv/l7-core';
import BaseLayer from '../core/BaseLayer';
interface IPointLayerStyleOptions {
  opacity: number;
  strokeWidth: number;
  stroke: string;
}
export default class PointLayer extends BaseLayer<IPointLayerStyleOptions> {
  public buildModels() {
    const grender = this.rendererService.getGLContext();
    console.log('build')
    // this.layerModel = new PointModels[modelType](this);
    // this.models = this.layerModel.initModels();
  }
  public rebuildModels() {
    // this.models = this.layerModel.buildModels();
  }
}