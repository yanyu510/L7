import BaseLayer from './core/BaseLayer';
import {
  container,
  DataMappingPlugin,
  DataSourcePlugin,
  FeatureScalePlugin,
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

import FillLayer from './point/fill';

// import ConfigSchemaValidationPlugin from './plugins/ConfigSchemaValidationPlugin';

/**
 * 校验传入参数配置项的正确性
 * @see /dev-docs/ConfigSchemaValidation.md
 */
// container
//   .bind<ILayerPlugin>(TYPES.ILayerPlugin)
//   .to(ConfigSchemaValidationPlugin)
//   .inRequestScope();
/**
 * 获取 Source
 */
container
  .bind<ILayerPlugin>(TYPES.ILayerPlugin)
  .to(DataSourcePlugin)
  .inRequestScope();
/**
 * 根据 StyleAttribute 创建 VertexAttribute
 */
container
  .bind<ILayerPlugin>(TYPES.ILayerPlugin)
  .to(RegisterStyleAttributePlugin)
  .inRequestScope();
/**
 * 根据 Source 创建 Scale
 */
container
  .bind<ILayerPlugin>(TYPES.ILayerPlugin)
  .to(FeatureScalePlugin)
  .inRequestScope();
/**
 * 使用 Scale 进行数据映射
 */
container
  .bind<ILayerPlugin>(TYPES.ILayerPlugin)
  .to(DataMappingPlugin)
  .inRequestScope();

/**
 * 更新地图样式配置项 如active, show, hide
 */
container
  .bind<ILayerPlugin>(TYPES.ILayerPlugin)
  .to(LayerStylePlugin)
  .inRequestScope();

/**
 * 负责属性更新
 */
container
  .bind<ILayerPlugin>(TYPES.ILayerPlugin)
  .to(UpdateStyleAttributePlugin)
  .inRequestScope();

/**
 * 负责Model更新
 */
container
  .bind<ILayerPlugin>(TYPES.ILayerPlugin)
  .to(UpdateModelPlugin)
  .inRequestScope();

/**
 * 传入相机坐标系参数
 */
container
  .bind<ILayerPlugin>(TYPES.ILayerPlugin)
  .to(ShaderUniformPlugin)
  .inRequestScope();

/**
 * 传入动画参数
 */
container
  .bind<ILayerPlugin>(TYPES.ILayerPlugin)
  .to(LayerAnimateStylePlugin)
  .inRequestScope();
container
  .bind<ILayerPlugin>(TYPES.ILayerPlugin)
  .to(LayerModelPlugin)
  .inRequestScope();

export { BaseLayer, FillLayer };
