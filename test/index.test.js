import { hocCreator, reactizy, autobind, domainize, fusion, withReactizy, reduxer, Store, createStore, hocBuilder } from './../src/index'


test('Index: Each component should be exportable', () => {
    expect(typeof reactizy).toBe('function')
    expect(typeof autobind).toBe('function')
    expect(typeof domainize).toBe('function')
    expect(typeof fusion).toBe('function')
    expect(typeof withReactizy).toBe('function')
    expect(typeof reduxer).toBe('function')
    expect(typeof Store).toBe('function')
    expect(typeof createStore).toBe('function')
    expect(typeof hocBuilder).toBe('function')
    expect(typeof hocCreator).toBe('function')
});

