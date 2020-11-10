import {
  container,
  DataSourcePlugin,
  FeatureScalePlugin,
  GDataMappingPlugin,
  ILayerPlugin,
  LayerAnimateStylePlugin,
  LayerModelPlugin,
  LayerStylePlugin,
  RegisterStyleAttributePlugin,
  ShaderUniformPlugin,
  TYPES,
  UpdateModelPlugin,
  UpdateStyleAttributePlugin,
} from '@antv/l7-core';
import BaseLayer from './core/BaseLayer';
import PointLayer from './point/fill';

// import ConfigSchemaValidationPlugin from './plugins/ConfigSchemaValidationPlugin';

/**
 * 校验传入参数配置项的正确性
 * @see /dev-docs/ConfigSchemaValidation.md
 */
// container
//   .bind<ILayerPlugin>(TYPES.IGLayerPlugin)
//   .to(ConfigSchemaValidationPlugin)
//   .inRequestScope();
/**
 * 获取 Source
 */
container
  .bind<ILayerPlugin>(TYPES.IGLayerPlugin)
  .to(DataSourcePlugin)
  .inRequestScope();
/**
 * 根据 StyleAttribute 创建 VertexAttribute
 */
container
  .bind<ILayerPlugin>(TYPES.IGLayerPlugin)
  .to(RegisterStyleAttributePlugin)
  .inRequestScope();
/**
 * 根据 Source 创建 Scale
 */
container
  .bind<ILayerPlugin>(TYPES.IGLayerPlugin)
  .to(FeatureScalePlugin)
  .inRequestScope();
/**
 * 使用 Scale 进行数据映射
 */
container
  .bind<ILayerPlugin>(TYPES.IGLayerPlugin)
  .to(GDataMappingPlugin)
  .inRequestScope();

/**
 * 更新地图样式配置项 如active, show, hide
 */
container
  .bind<ILayerPlugin>(TYPES.IGLayerPlugin)
  .to(LayerStylePlugin)
  .inRequestScope();

/**
 * 负责属性更新
 */
container
  .bind<ILayerPlugin>(TYPES.IGLayerPlugin)
  .to(UpdateStyleAttributePlugin)
  .inRequestScope();

/**
 * 负责Model更新
 */
container
  .bind<ILayerPlugin>(TYPES.IGLayerPlugin)
  .to(UpdateModelPlugin)
  .inRequestScope();

/**
 * 传入相机坐标系参数
 */
container
  .bind<ILayerPlugin>(TYPES.IGLayerPlugin)
  .to(ShaderUniformPlugin)
  .inRequestScope();

/**
 * 传入动画参数
 */
container
  .bind<ILayerPlugin>(TYPES.IGLayerPlugin)
  .to(LayerAnimateStylePlugin)
  .inRequestScope();

container
  .bind<ILayerPlugin>(TYPES.IGLayerPlugin)
  .to(LayerModelPlugin)
  .inRequestScope();

export { BaseLayer, PointLayer };
