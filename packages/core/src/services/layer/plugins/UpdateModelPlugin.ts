import { injectable } from 'inversify';
import { ILayer, ILayerPlugin } from '../ILayerService';
import { IStyleAttributeService } from '../IStyleAttributeService';
/**
 * Model 更新
 */
@injectable()
export class UpdateModelPlugin implements ILayerPlugin {
  public apply(layer: ILayer) {
    layer.hooks.beforeRender.tap('UpdateModelPlugin', () => {
      // 处理文本更新
      if (layer.layerModel) {
        layer.layerModel.needUpdate();
      }
    });
  }
}
