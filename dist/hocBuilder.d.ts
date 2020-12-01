export default builder;
declare function builder(givenObject?: {}): {
    (...args: any[]): (NoFusionComponent: any, ...componentOrFusion: any[]) => any;
    reduxers: any[];
};
