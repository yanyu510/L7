// @ts-ignore
import { Scene, PolygonLayer } from '@antv/l7-mini';
import { Map } from '@antv/l7-maps';
// import { FillLayer } from '@antv/l7-glayers'
import * as React from 'react';

export default class ScaleComponent extends React.Component {
  private scene: Scene;

  public componentWillUnmount() {
    this.scene.destroy();
  }

  public async componentDidMount() {
    const scene = new Scene({
      id: 'map',
      map: new Map({
        hash: true,
        center: [110.19382669582967, 30.258134],
        pitch: 0,
        zoom: 2,
      }),
    });
    const data = {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'Point',
            coordinates: [107.57812499999999, 36.31512514748051],
          },
        },
        {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'Point',
            coordinates: [111.09374999999999, 28.76765910569123],
          },
        },
      ],
    };
    // const layer  = new FillLayer().source(data).size(10).color('red');
    // scene.addLayer(layer);
    // console.log(layer);
  }

  public render() {
    return (
      <div
        id="map"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
      />
    );
  }
}
