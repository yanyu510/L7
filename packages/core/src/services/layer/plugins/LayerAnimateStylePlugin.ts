import { injectable } from 'inversify';
import { IModel } from '../../renderer/IModel';
import { ILayer, ILayerPlugin } from '../ILayerService';

@injectable()
export class LayerAnimateStylePlugin implements ILayerPlugin {
  public apply(layer: ILayer) {
    // layer.hooks.beforeRender.tap('LayerAnimateStylePlugin', () => {

    // })
    layer.hooks.beforeRender.tap('LayerAnimateStylePlugin', () => {
      // 重新计算坐标系参数
      layer.models.forEach((model: IModel) => {
        model.addUniforms({
          ...layer.layerModel.getAnimateUniforms(),
        });
      });
    });
  }
}
