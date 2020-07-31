import { LineLayer, PolygonLayer, Scene } from '@antv/l7';
import { CountryLayer } from '@antv/l7-district';
import { GaodeMap, Mapbox } from '@antv/l7-maps';
import * as React from 'react';

export default class Country extends React.Component {
  // @ts-ignore
  private scene: Scene;

  public componentWillUnmount() {
    this.scene.destroy();
  }

  public async componentDidMount() {
    const scene = new Scene({
      id: 'map',
      map: new Mapbox({
        center: [116.2825, 39.9],
        pitch: 0,
        style: 'blank',
        zoom: 3,
        minZoom: 0,
        maxZoom: 15,
      }),
    });

    scene.on('loaded', async () => {
      const ProvinceData = await (
        await fetch(
          'https://gw.alipayobjects.com/os/bmw-prod/50293776-7fcc-49c8-a840-5f9bd1689b6f.json',
        )
      ).json();
      const Layer = new CountryLayer(scene, {
        visible: true,
        data: [],
        geoDataLevel: 2,
        joinBy: ['NAME_CHN', 'name'],
        showBorder: true,
        provinceStroke: 'red',
        label: {
          enable: false,
          field: 'name',
          size: 10,
          padding: [5, 5],
          textAllowOverlap: true,
        },
        depth: 1,
        fill: {
          scale: 'linear',
          color: {
            field: 'NAME_CHN',
            values: [],
          },
        },
        popup: {
          enable: true,
          Html: (props) => {
            return `<span>${props.NAME_CHN}:</span><span>${props[2017]}</span>`;
          },
        },
      });

      Layer.on('loaded', () => {
        Layer.updateData(ProvinceData);

        Layer.fillLayer.color('2017', (v) => {
          return v > 20000 ? 'red' : 'blue';
        });
        // scene.render();
      });
    });
    this.scene = scene;
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
