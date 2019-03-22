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
    }
}

const store = Redux.createStore(rootReducer);

$(document).ready(function() {
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
    $("#todos").append($newLi);
    $("form").trigger("reset");
  });
});
