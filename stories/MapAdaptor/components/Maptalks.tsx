// @ts-ignore
import { PolygonLayer, Scene } from '@antv/l7';
import { Mapbox, MapTalks } from '@antv/l7-maps';
import * as maptalks from 'maptalks';
import * as React from 'react';

export default class MapTalksComponent extends React.Component {
  private scene: Scene;

  public componentWillUnmount() {
    this.scene.destroy();
  }

  public async componentDidMount() {
    const response = await fetch(
      'https://gw.alipayobjects.com/os/basement_prod/d2e0e930-fd44-4fca-8872-c1037b0fee7b.json',
    );

    let mapInstance = new maptalks.Map("map", {
      center: [-0.113049, 51.498568],
      zoom: 14,
      pitch: 45,
      // allow map to drag pitching, true by default
      dragPitch: true,
      // allow map to drag rotating, true by default
      dragRotate: true,
      // enable map to drag pitching and rotating at the same time, false by default
      dragRotatePitch: true,
      // attribution: true,
      zoomControl: true, //  add zoom control
      scaleControl: true, //  add scale control
      overviewControl: true, //  add overview control
      centerCross: true,
      
      attribution: {
          content: "&copy BoudlessGeo",
      },
      baseLayer:
          new maptalks.TileLayer("base", {
             
              crossOrigin: "anonymous",
              urlTemplate: "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png",
              subdomains: ["a", "b", "c", "d"],
              attribution:
                  '&copy; <a href="http:// osm.org">OpenStreetMap</a> contributors, &copy; <a href="https:// carto.com/">CARTO</a>',
          })
    
      
  
    
  });



    const scene = new Scene({
      id: 'map',
      map: new MapTalks({
        mapInstance: mapInstance
        // center: [110.19382669582967, 30.258134],
        // pitch: 0,
        // zoom: 3,
       
        // baseLayer: {
        //   spatialReference:{
        //     projection : 'baidu'
        //   },
        //   urlTemplate: 'http://online{s}.map.bdimg.com/onlinelabel/?qt=tile&x={x}&y={y}&z={z}&styles=pl&udt=20160804&scaler=1&p=1',
        //   // subdomains: ['a','b','c','d']
        //   subdomains:[0,1,2,3,4,5,6,7,8,9]
        // }
      }),
    });
    this.scene = scene;
    const layer = new PolygonLayer({});

    layer
      .source(await response.json())
      .size('name', [0, 10000, 50000, 30000, 100000])
      .color('name', () => {
        return 'yellow';
      })
      .shape('fill')
      .style({
        opacity: 0.8,
      });
    scene.addLayer(layer);
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
