import fusion from './fusion'
import autobind from './autobind'

export default function(...args) {
    fusion.call(this, ...args)
    autobind.call(this)
}
