export function reactizy(...args: any[]): void;
export const autobind: typeof src_autobind;
export const domainize: (domain: any, apiPool: any) => {};
export const fusion: typeof src_fusion;
export const withReactizy: typeof highOrderComponent;
export const reduxer: typeof src_reduxer;
export const Store: {
    (props: any): JSX.Element;
    propTypes: {
        hocs: any;
        children: any;
    };
};
export const createStore: (...args: any[]) => import("redux").Store<any, any> & {
    dispatch: any;
};
export const hocBuilder: (givenObject?: {}) => {
    (...args: any[]): (NoFusionComponent: any, ...componentOrFusion: any[]) => any;
    reduxers: any[];
};
export const hocCreator: (methodName: any, method: any) => (Component: any) => (props: any) => JSX.Element;
import src_autobind from "./autobind";
import src_fusion from "./fusion";
import highOrderComponent from "./highOrderComponent";
import src_reduxer from "./reduxer";
