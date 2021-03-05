export default (name, reducer) => ({
	name,
	actions: reducer.actions || {},
	state: reducer.state || {},
	thunks: reducer.thunks || {},
	isCombined: true
})
