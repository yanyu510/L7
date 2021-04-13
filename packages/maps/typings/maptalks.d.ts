declare module 'maptalks' {

       namespace Map{
        interface Options {
            center: Array<number> | undefined;
            zoom: number | undefined;
            spatialReference?:Object;
            baseLayer?: Layer;
            layers?:Array<Layer>;
        }
       }

       namespace Layer {
        interface Options {
            attribution: string;
            minZoom: number;
            maxZoom: number;
            visible: boolean;
            opacity: number;
            // context.globalCompositeOperation, 'source-over' in default
            globalCompositeOperation: string;
            renderer: string;
            debugOutline: string;
            cssFilter: null;
            forceRenderOnMoving : boolean;
            forceRenderOnZooming : boolean;
            forceRenderOnRotating : boolean;
            hitDetect: boolean;
        }
       }
       
        export class Control {

        }
    

    export class Map {
        constructor(container: string | HTMLElement, opts?: Map.Options)

        static addOnLoadHook(fn: Function): Map

        static fromJSON(container: string | HTMLElement, mapJSON: object, options: object): Map

        isLoaded(): boolean

        getContainer(): HTMLElement

        on(eventsOn: string, handler: Function, context?: object):this

        off(eventsOn: string, handler: Function, context?: object):any

        getZoom(): number

        setZoom(zoom: number, options?: object):this

        getMaxZoom(): number

        setMaxZoom(maxZoom: number):this

        getMinZoom(): number

        setMinZoom(minZoom: number): this

        getCenter(): Coordinate

        setCenter(center: Coordinate): this

        getPitch(): number

        setPitch(pitch: number): this

        getBearing(): number

        setBearing(bearing: number): this

        getExtent(): Extent

        getSize(): Size

        zoomIn(): this

        zoomOut(): this

        panTo(coordinate:Coordinate, options?: object): this

        panBy(point: Point, options?: object): this

        fitExtent(extent: Extent, zoomOffset: number): this

        config(conf: object): this

        setCenterAndZoom(center: Coordinate, zoom: number): this

        pointToCoordinate(point: Point, zoom: number,out?: Coordinate): Coordinate
        coordinateToPoint(coordinate: Coordinate, zoom?: number, out?: Point): Point


        viewPointToCoord(viewPoint: Point, out?: Coordinate): Coordinate
        coordToViewPoint(coordinate: Coordinate, out?: Point): Point

        getMainPanel(): HTMLElement

        remove(): this

        toDataURL(options?: object): string
    }

   

    export class Extent {
        constructor(p1: number, p2: number, p3: number, p4: number)

        toJSON(): object

        toArray(): Array<Array<number>>

        getWidth(): number

        getHeight(): number

        getSize(): Size
    }

    export class Size {
        constructor(width: number, height: number)
        width: number;
        height: number;
    }

    export class Position {
        constructor(x: number, y: number)
        constructor(points: Array<number>)
        constructor(point: object)

        set(x: number, y: number): this

        toArray(): Array<number>

        toJSON(): object

    }

    export class Coordinate extends Position {}

    export class Point extends Position {}

    export class Layer {
        constructor(id: string, options: Layer.Options)
    }

    namespace TileLayer {
        interface Options extends Layer.Options {
            urlTemplate: string;
            subdomains: any[];
            spatialReference : object;

        }
    }
    export class TileLayer extends Layer{
        constructor(id: string, options: TileLayer.Options)
    } 
}