# Homework/Lab 4-6

This repository will be for works from 4 to 6 from my university React course.

## What needed to be done for homework #4:

_Create a Todo List app that uses a custom hook to handle all data fetching and state management for the todo items, utilizing a fake REST API that supports CRUD operations. The custom hook should abstract away the logic for fetching the todo list, adding new todos, updating existing ones, and deletim them, providing a clean interface to any component that needs todo data and functionality. + The Component Tree & Data Flow diagram._

### Component Tree & Data Flow diagram

#### Diagram

```mermaid
graph TD;
    %% Component Definitions
    App["App (Root)<br/><i>Renders layout, ThemeToggle</i>"]
    ThemeToggle["ThemeToggle<br/><i>useTheme() hook</i>"]
    TodoListWrapper["TodoListWrapper<br/><b>State:</b> filter<br/><i>useTodos() hook</i>"]
    Footer["Footer<br/><i>Static content</i>"]
    
    TodoHeader["TodoHeader<br/><i>Displays title</i>"]
    AddTodoForm["AddTodoForm<br/><b>Props:</b> onAdd"]
    TodoFilters["TodoFilters<br/><b>Props:</b> activeFilter, onSetFilter, onClearCompleted"]
    TodoList["TodoList<br/><b>Props:</b> todos[], onToggle, onDelete"]
    TodoStats["TodoStats<br/><b>Props:</b> count"]
    
    TodoItem["TodoItem<br/><b>Props:</b> todo, onToggle, onDelete"]
    TodoEmpty["TodoEmpty<br/><i>Shown when filtered list is empty</i>"]

    %% Component Hierarchy
    subgraph "Application Structure"
        App --> ThemeToggle
        App --> TodoListWrapper
        App --> Footer
    end

    subgraph "Todo Feature"
        TodoListWrapper --> TodoHeader
        TodoListWrapper --> AddTodoForm
        TodoListWrapper --> TodoFilters
        TodoListWrapper --> TodoList
        TodoListWrapper --> TodoStats
    end

    subgraph "List Rendering"
        TodoList --> TodoItem
        TodoList -- "filteredTodos.length === 0" --> TodoEmpty
    end

    %% Data & Callback Flow (Dashed Lines)
    style TodoListWrapper fill:#e6f3ff,stroke:#b3d9ff,stroke-width:2px
    
    AddTodoForm -.->|"onAdd(text)"| TodoListWrapper
    TodoFilters -.->|"onSetFilter(filterType)"| TodoListWrapper
    TodoFilters -.->|"onClearCompleted()"| TodoListWrapper
    TodoItem -.->|"onToggle(id)"| TodoList
    TodoItem -.->|"onDelete(id)"| TodoList
    TodoList -.->|"onToggle(id)<br/>onDelete(id)"| TodoListWrapper

    classDef stateful fill:#fff2cc,stroke:#ffd966
    class TodoListWrapper stateful
```

#### Diagram Explained
- **App**: The composition root. It renders the main layout, including the ThemeToggle, TodoListWrapper, and Footer. It holds no application state.
- **ThemeToggle**: Uses a useTheme hook to toggle the dark class on the <html> element and persists the choice in localStorage.
- **TodoListWrapper**:
  - This is the primary "smart" component.
  - It calls the useTodos() custom hook to get the todos array, loading/error states, and action functions (addTodo, toggleTodo, deleteTodo).
  - It manages the local filter state ('all', 'active', 'done').
  - **Data Down**: It passes addTodo to AddTodoForm.
  - **Data Down**: It passes the filteredTodos array, toggleTodo, and deleteTodo to the TodoList component.
  - **Data Down**: It passes filter state and control functions (activeFilter, onSetFilter, onClearCompleted) to TodoFilters.
- **AddTodoForm**:
  - A "dumb" component that receives onAdd as a prop.
  - **Callback Up**: On form submission, it invokes onAdd(newTodoText), sending the new task's content up to be handled by the useTodos hook.
- **TodoFilters**:
  - Receives the current filter and functions to change it.
  - **Callback Up**: Invokes onSetFilter(filterType) when a filter button is clicked.
  - **Callback Up**: Invokes onClearCompleted() when the "Clear" button is clicked.
- **TodoList**:
  - Receives the filteredTodos array.
  - If the array is empty, it conditionally renders the TodoEmpty component.
  - Otherwise, it maps over the array and renders a TodoItem for each todo, passing down the todo object and the onToggle and onDelete callbacks.
- **TodoItem**:
  - Displays a single todo.
  - **Callback Up**: Invokes onToggle(todo.id) when its checkbox is clicked.
  - **Callback Up**: Invokes onDelete(todo.id) when its delete button is clicked