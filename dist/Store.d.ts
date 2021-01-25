export default Store;
declare function Store(props: any): JSX.Element;
declare namespace Store {
    export namespace propTypes {
        export const hocs: any;
        export const children: any;
    }
}
