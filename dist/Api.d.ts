declare var _default: Api;
export default _default;
declare class Api {
    url(route: any, options?: {}): any;
    call(route: any, options?: {}, body?: {}, givenExtraOptions?: {}): Promise<any>;
}
