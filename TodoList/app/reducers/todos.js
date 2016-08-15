const initialState = {
  todo: 'something' ,
  id: 0,
  completed: false,
}
export default function todo( state = initialState, action = {}) {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        id: action.id,
        todo: action.text,
        completed: false,
      }
    case 'TOGGLE_TODO':
      if (state.id !== action.id){
        return state
      }
      return Object.assign({},state, {
        completed: !state.completed
      })        
    default: 
      return state
  }   
}



// export default function todos( state = initialState, action = {}) {
//   switch (action.type) {
//     case 'ADD_TODO':
//       return [
//         ...state,
//         todo(undefined, action)
//       ]
//     case 'TOGGLE_TODO':
//       return state.map(t => 
//         todolist(t, action)
//       )
//     default: 
//       return state
//   }   
// }