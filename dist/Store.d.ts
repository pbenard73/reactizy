export default Store;
declare function Store(props: any): any;
declare namespace Store {
    namespace propTypes {
        const reduxers: any;
        const apis: any;
        const children: any;
    }
}