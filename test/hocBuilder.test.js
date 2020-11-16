import React from 'react'
import hocBuilder from './../src/hocBuilder'

test('HocBuilder should return a function', () => {
    const poolEmpty = {}
    const poolFilled = {
        test: Component => Component
    }

    const Hoc = hocBuilder()
    expect(typeof Hoc).toBe('function')

    const HocEmpty = hocBuilder(poolEmpty)
    expect(typeof Hoc).toBe('function')

    const HocFilled = hocBuilder(poolFilled, {
        method: type => alert(type),
    }, {
        setThunk: (param) => {
            return (dispatch, getState, param) => {

            }
        }
    })
    expect(typeof Hoc).toBe('function')

    const MyComponent = props => (
        <div></div>
    )

    const Compo = Hoc()(MyComponent)
    expect(typeof Compo).toBe('object')
    
    const CompoBis = Hoc(['param'])(MyComponent)
    expect(typeof CompoBis).toBe('object')
    
    const CompoTer = Hoc(['param'],['setThunk'])(MyComponent)
    expect(typeof CompoTer).toBe('object')

    const Empty = HocEmpty()(MyComponent)
    expect(typeof Empty).toBe('object')

    const Filled = HocFilled(['another', 'method', 'test'])(MyComponent)
    expect(typeof Filled).toBe('object')

    const FilledBis = HocFilled(['test'], ['param'], ['action'])(MyComponent)
    expect(typeof FilledBis).toBe('object')

    const FilledTer = HocFilled([['param'], ['action']])(MyComponent)
    expect(typeof FilledTer).toBe('object')

    const FilledQuatro = HocFilled(['test'], ['param'], ['action'])(MyComponent)
    expect(typeof FilledQuatro).toBe('object')

    const FilledCinquo = HocFilled(['test'])(MyComponent)
    expect(typeof FilledCinquo).toBe('object')
});

