<script>
    export let todo;
    export let removeTodo;
</script>

<main class="todo">
    <div class="todo-item">
        <span class:completed={todo.completed}>
            <input
                placeholder="Deleted todo"
                bind:value={todo.text}
                type="text"
                disabled={todo.completed}
            />
        </span>

        <button
            aria-label="Remove todo"
            on:click={() => removeTodo(todo.id)}
            class="remove"
        />
    </div>
</main>
