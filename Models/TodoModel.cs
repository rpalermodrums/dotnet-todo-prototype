using Microsoft.EntityFrameworkCore;
public class Todo
{
    public int Id { get; set; }
    public string Title { get; set; }
    public bool Completed { get; set; }
    
    public Todo()
    {
        Title = "To-Do";
        Completed = false;
    }
}


public class TodoContext : DbContext
{
    public TodoContext(DbContextOptions<TodoContext> options) : base(options)
    {
        Todos = Set<Todo>();
    }

    public DbSet<Todo> Todos { get; set; }

}
