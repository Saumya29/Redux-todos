const initialState = {
  todos: [],
  id: -1
}

function rootReducer(state=initialState, action) {
  switch(action.type) {
    case "ADD_TODO":
      let newState = {...state}
      newState.id++;
      return {
        ...newState,
        todos: [...newState.todos, { task: action.task, id: newState.id }]
      };
    case "REMOVE_TODO":
      let todos = state.todos.filter(val => val.id !== +action.id);
      return {...state, todos}
    default:
    return state
    }
}

const store = Redux.createStore(rootReducer);

$(document).ready(function() {
  $("ul").on("click", "button", function(event) { //using event delegation
    store.dispatch({
      type: "REMOVE_TODO",
      id: $(event.target).attr("id")
    })
    $(event.target).parent().remove();
  });

  $("form").on("submit", function(event) {
    event.preventDefault();
    let newTask = $("#task").val();
    store.dispatch({
      type: "ADD_TODO",
      task: newTask
    });
    let currentState = store.getState();
    let $newLi = $("<li>",{
      text: newTask
    });
    let $newButton = $("<button>", {
      text: "X",
      id: currentState.id
    });
    $($newLi).append($newButton);
    $("#todos").append($newLi);
    $("form").trigger("reset");
  });
});
