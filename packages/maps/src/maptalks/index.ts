import { Map } from 'maptalks';
import { IMaptalksInstance } from '../../typings/index';
import BaseMapWrapper from '../BaseMapWrapper';
import './logo.css';
import MaptalksService from './map';
export default class MaptalksWrapper extends BaseMapWrapper<
  Map & IMaptalksInstance
> {
  protected getServiceConstructor() {
    return MaptalksService;
  }
}
