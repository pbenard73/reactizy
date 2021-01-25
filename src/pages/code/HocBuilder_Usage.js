export default `/*
   uses: an array of hocs shortname to link
   state: an array of redux state to link
   actions: array of redux action or thunks, if true provided, all methods will be linked

   Note that this declarations are for better readability, they can be mixed, but be aware of unicity.
*/

export default Hoc(...uses, ...state, ...actions)(Component)

// The hoc fusion can be disabled in setting the argument as false, preceding the Component
export default Hoc(...uses, ...state, ...actions)(false, Component)

export default Hoc()(Component, Splitted, OtherSplitted)
`
