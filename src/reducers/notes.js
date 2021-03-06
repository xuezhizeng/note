const notes = (state={}, action) =>{
	switch(action.type){

		case 'GET_SUCCESS':
			// console.log('action')
			// console.log(action.json)
			let notes = action.json
			let activeNotes=notes;
			let typeArr = [];
			let tagArr = [];
			let activeTypes=[];
			let activeTags=[];
			notes = notes.sort(function (a,b) {
				return parseInt(b.id) - parseInt(a.id);
			})
			notes.forEach((value,index)=>{
				value.type = value.type.toLowerCase()
				value.tags = value.tags.toLowerCase()
				if (value.hot) {
					notes.splice(index,1)
					notes.unshift(value)
				}
			})
			activeNotes.forEach(function (value) {
				if (typeArr.indexOf(value.type.toLowerCase())<0) {
					typeArr.push(value.type.toLowerCase())
				}
				// console.log(value.tags)
				let tags = value.tags.toLowerCase().split(' ')
				tags.forEach(function (tag) {
					if (tagArr.indexOf(tag)<0) {
						tagArr.push(tag)
					}
				})
			})
			

			return Object.assign({}, state, {
		        notes : notes,
		        activeNotes : activeNotes,
		        types : typeArr,
		        activeTypes : activeTypes,
		        tags : tagArr,
		        activeTags :activeTags
		    } )
		case 'SET_VISIBILITY':
			return Object.assign({}, state, {
				activeNotes : action.activeNotes,
				activeTypes : action.activeTypes,
				activeTags : action.activeTags
			} )
		default:
		 	return state;
	}
}

export default notes;