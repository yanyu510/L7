import { injectable } from 'inversify';
import { ILayer, ILayerPlugin } from '../ILayerService';
/**
 * 更新图层样式，初始图层相关配置
 */
@injectable()
export class LayerStylePlugin implements ILayerPlugin {
  public apply(layer: ILayer) {
    layer.hooks.afterInit.tap('LayerStylePlugin', () => {
      // 更新图层默认状态
      layer.updateLayerConfig({});
      const { autoFit, fitBoundsOptions } = layer.getLayerConfig();
      if (autoFit) {
        setTimeout(() => {
          layer.fitBounds(fitBoundsOptions);
        }, 100);
      }
    });
  }
}
