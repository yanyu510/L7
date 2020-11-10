// @ts-ignore
import { PointLayer } from '@antv/l7-glayers';
import { Map } from '@antv/l7-maps';
import { Scene, ILayer } from '@antv/l7-mini';
import * as React from 'react';

export default class ScaleComponent extends React.Component {
  private scene: Scene;

  public componentWillUnmount() {
    // this.scene.destroy();
  }

  public async componentDidMount() {
    const scene = new Scene({
      id: 'map',
      render: 'canvas',
      map: new Map({
        hash: true,
        center: [121.435159, 31.256971],
        zoom: 14.89,
        minZoom: 10,
      }),
    });
    const data = await (
      await fetch(
        'https://gw.alipayobjects.com/os/basement_prod/893d1d5f-11d9-45f3-8322-ee9140d288ae.json',
      )
    ).json();
    // const layer  = new FillLayer().source(data).size(10).color('red');
    const layer = new PointLayer();
    layer
      .source(data, {
        parser: {
          type: 'json',
          x: 'longitude',
          y: 'latitude',
        },
      })
      .color('red')
      .size('unit_price', [10, 25])
      .active(true)
      .color('name', ['#5B8FF9', '#5CCEA1', '#5D7092', '#F6BD16', '#E86452'])
      .style({
        opacity: 1,
        strokeWidth: 2,
        stroke: '#f00',
      });
    scene.addLayer(layer);
    console.log(layer);
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
