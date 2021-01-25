export default `/* src/hocs/Hoc.js*/
import { domainize } from 'reactizy'
import mainApi from './api/main'
import extApi from './api/ext'

export default hocBuilder({
    apis: [mainApi, domainize('https://myDomain.com', extApi)],
)
`
