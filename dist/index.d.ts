export function reactizy(...args: any[]): void;
export const autobind: typeof src_autobind;
export const domainize: (domain: any, apiPool: any) => {};
export const fusion: typeof src_fusion;
export const withReactizy: typeof highOrderComponent;
export const reduxer: typeof src_reduxer;
export const Store: {
    (props: any): any;
    propTypes: {
        reduxers: any;
        apis: any;
        children: any;
    };
};
export const createStore: (...args: any[]) => any;
export const hocBuilder: (pool: any) => (...args: any[]) => (Component: any, ...fusion: any[]) => any;
import src_autobind from "./autobind";
import src_fusion from "./fusion";
import highOrderComponent from "./highOrderComponent";
import src_reduxer from "./reduxer";
