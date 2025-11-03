// See https://aka.ms/new-console-template for more information
using System;
using System.Collections.Generic;
using System.Diagnostics;

class Program
{
    static List<String> tasks = new List<String>();
    static List<bool> completed = new List<bool>();

    static void Main(String[] args)
    {
        bool running = true;

        while (running)
        {
            Console.Clear();
            Console.WriteLine("===To do List Manager===");
            Console.WriteLine("1. View tasks");
            Console.WriteLine("2. Add tasks");
            Console.WriteLine("3. Mark Task as complete");
            Console.WriteLine("4. Delete Task");
            Console.WriteLine("5. Exit");
            Console.WriteLine("\nSelect an Option");

            String? choice = Console.ReadLine();

            switch (choice)
            {
                case "1":
                    ViewTasks();
                    break;
                case "2":
                    AddTask();
                    break;
                case "3":
                    CompleteTask();
                    break;
                case "4":
                    DeleteTask();
                    break;
                case "5":
                    running = false;
                    break;
                default:
                    Console.WriteLine("Invalid option. Press any key to continue...");
                    Console.ReadKey();
                    break;
            }
        }
    }

    static void ViewTasks()
    {
        Console.Clear();
        Console.WriteLine("===Your Tasks===\n");

        if (tasks.Count == 0) 
        {
            Console.WriteLine("No tasks yet!");
        }
        else
        {
            for (int i = 0; i < tasks.Count; i++) 
            {
        string status = completed[i] ? "[X]" : "[ ]";
        Console.WriteLine($"{i + 1}. {status} {tasks[i]}");
    }
}

Console.WriteLine("\nPress any key to return to menu");
Console.ReadKey();
}

static void AddTask()
    {
        Console.Clear();
        Console.Write("Enter a new task: ");
        string? task = Console.ReadLine();

        if (!string.IsNullOrWhiteSpace(task))
        {
            tasks.Add(task);
            completed.Add(false);
            Console.WriteLine("Task added successfully!");
        }
        else
        {
            Console.WriteLine("Task cannot be empty!");
        }

        Console.WriteLine("Press any key to continue...");
        Console.ReadKey();
    }

static void CompleteTask()
    {
        Console.Clear();
        ViewTasks();

        if (tasks.Count > 0)
        {
            Console.Write("\nEnter the task number to mark as complete: ");
            if (int.TryParse(Console.ReadLine(), out int index) && index > 0 && index <= tasks.Count)
            {
                completed[index - 1] = true;
                Console.WriteLine("Task marked as complete!");
            }
            else
            {
                Console.WriteLine("Invalid number!");
            }
        }

        Console.WriteLine("Press any key to continue...");
        Console.ReadKey();
    }
static void DeleteTask()
    {
        Console.Clear();
        ViewTasks();

        if (tasks.Count > 0)
        {
            Console.Write("\nEnter the task number to delete: ");
            if (int.TryParse(Console.ReadLine(), out int index) && index > 0 && index <= tasks.Count)
            {
                tasks.RemoveAt(index - 1);
                completed.RemoveAt(index - 1);
                Console.WriteLine("Task deleted successfully!");
            }
            else
            {
                Console.WriteLine("Invalid number!");
            }
        }

        Console.WriteLine("Press any key to continue...");
        Console.ReadKey();
    }
}
