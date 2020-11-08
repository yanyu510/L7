import { injectable } from 'inversify';
import { TYPES } from '../../../types';
import { IMapService } from '../../map/IMapService';
import { ILayer, ILayerPlugin } from '../ILayerService';

@injectable()
export class DataSourcePlugin implements ILayerPlugin {
  protected mapService: IMapService;
  public apply(layer: ILayer) {
    this.mapService = layer.getContainer().get<IMapService>(TYPES.IMapService);
    layer.hooks.init.tap('DataSourcePlugin', () => {
      const { data, options } = layer.sourceOption;
      layer.initSource(data, options);
      this.updateClusterData(layer);
    });

    // 检测数据不否需要更新
    layer.hooks.beforeRenderData.tap('DataSourcePlugin', () => {
      const neeUpdate1 = this.updateClusterData(layer);
      const neeUpdate2 = layer.dataState.dataSourceNeedUpdate;
      layer.dataState.dataSourceNeedUpdate = false;
      return neeUpdate1 || neeUpdate2;
    });
  }

  private updateClusterData(layer: ILayer): boolean {
    const source = layer.getSource();
    const cluster = source.cluster;
    const { zoom = 0, maxZoom = 16 } = source.clusterOptions;
    const newZoom = this.mapService.getZoom() - 1;
    if (cluster && Math.abs(zoom - newZoom) > 1 && maxZoom > zoom) {
      source.updateClusterData(Math.floor(newZoom));
      return true;
    }
    return false;
  }
}
