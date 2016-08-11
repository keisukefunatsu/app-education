const initialState = {
  todo: 'something'
}
export default function todolist( state = initialState, action = {}) {
  switch (action.type) {
    case 'Do':
      return { todo: 'you are number one'};
    case 'Undo':
      return { todo: 'you are not number one'};  
    default: 
      return state;  
  }   
}