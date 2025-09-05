export let defaultPromptResponseData: { [key: string]: string | string[] } [] = [
    {
        prompt: "How do I set daily goals in my work day?",
        response: "<p>To stay focused and productive, try these steps for setting daily goals:</p> <ol><li><strong>Identify Priorities:</strong> List the most important tasks based on deadlines or significance.</li> <li><strong>Break Down Tasks:</strong> Split larger tasks into smaller, manageable steps.</li> <li><strong>Set SMART Goals:</strong> Make sure goals are Specific, Measurable, Achievable, Relevant, and Time-bound.</li> <li><strong>Time Blocking:</strong> Allocate specific times for each task to stay organized and on track.</li></ol> <p>Would you like more tips on any of these steps?</p>",
        suggestions: [
            "How do I prioritize tasks effectively?",
            "What tools or apps can help me prioritize tasks?"
        ]
    },
    {
        prompt: "Steps to publish a e-book with marketing strategy",
        response: "<p>To publish an e-book, follow the steps below:</p> <ol><li><strong>Write and format your e-book:</strong> Ensure your content is well-organized, edited, and formatted for digital reading.</li> <li><strong>Choose a publishing platform:</strong> Platforms like Amazon Kindle Direct Publishing (KDP) or Smashwords can help you publish and distribute your e-book.</li> <li><strong>Develop a marketing strategy:</strong> Utilize social media, email newsletters, and book promotion sites to create buzz and reach your target audience.</li> <li><strong>Launch and promote:</strong> Schedule a launch date, gather reviews, and continue promoting through various channels to maintain momentum and drive sales.</li></ol> <p>Do you have a specific topic in mind for your e-book?</p>",
        suggestions: [
            "How do I create an eye-catching e-book cover?",
            "What are common mistakes to avoid in e-book covers?"
        ]
    },
    {
        prompt: "How do I prioritize tasks effectively?",
        response: "<p>To stay focused and productive, set daily goals by:</p> <ol><li><strong>Identifying Priorities:</strong> List important tasks based on deadlines or significance.</li> <li><strong>Breaking Down Tasks:</strong> Divide larger tasks into smaller, manageable steps.</li> <li><strong>Setting SMART Goals:</strong> Ensure goals are Specific, Measurable, Achievable, Relevant, and Time-bound. </li> <li><strong>Time Blocking:</strong> Schedule specific times for each task to stay organized.</li></ol> <p> Need more tips on any of these steps? </p>"
    },
    {
        prompt: "What tools or apps can help me prioritize tasks?",
        response: "<p>Here are some tools to help you prioritize tasks effectively:</p> <ol><li><strong>Google Keep:</strong> For simple note-taking and task organization with labels and reminders.</li> <li><strong>Scoro:</strong> A project management tool for streamlining activities and team collaboration.</li> <li><strong>Evernote:</strong> Great for note-taking, to-do lists, and reminders.</li> <li><strong>Todoist:</strong> A powerful task manager for setting priorities and tracking progress.</li></ol> <p>Are you looking for tools to manage a specific type of task or project?</p>"
    },
    {
        prompt: "How do I create an eye-catching e-book cover?",
        response: "<p>Creating an eye-catching e-book cover involves a few key steps:</p> <ol><li><strong>Understand your genre and audience:</strong> Research covers of popular books in your genre to see what appeals to your target readers.</li> <li><strong>Choose the right imagery and colors:</strong> Use high-quality images and a color scheme that reflects the tone and theme of your book.</li> <li><strong>Focus on typography:</strong> Select fonts that are readable and complement the overall design. The title should be prominent and easy to read even in thumbnail size.</li> <li><strong>Use design tools or hire a professional:</strong> Tools like Canva or Adobe Spark can help you create a professional-looking cover. Alternatively, consider hiring a graphic designer for a more polished result.</li></ol> <p>Would you like some tips on where to find good images or fonts for your cover?</p>"
    },
    {
        prompt: "What are common mistakes to avoid in e-book covers?",
        response: "<p>Here are some common mistakes to avoid when designing an e-book cover:</p> <ol><li><strong>Cluttered design:</strong> Overloading the cover with too many elements can make it look messy and unprofessional. Keep it simple and focused.</li> <li><strong>Poor quality images:</strong> Using low-resolution or generic stock images can detract from the overall appeal. Always opt for high-quality, relevant visuals.</li> <li><strong>Unreadable fonts:</strong> Fancy or overly intricate fonts can be hard to read, especially in thumbnail size. Choose clear, legible fonts for the title and author name.</li> <li><strong>Ignoring genre conventions:</strong> Each genre has its own visual cues. Not adhering to these can confuse potential readers about the book’s content.</li> <li><strong>Inconsistent branding:</strong> If you have a series or multiple books, ensure a consistent style across all covers to build a recognizable brand.</li></ol> <p>Would you like any specific advice on designing your cover?</p>"
    }
];

export let defaultSuggestions: string[] = [
    "How do I set daily goals in my work day?",
    "Steps to publish a e-book with marketing strategy"
];

export let streamingData: { [key: string]: string | string[] } [] = [
    {
        prompt: "What are the main features of the AI AssistView component?",
        response: "The AI AssistView component offers several powerful features that enhance user interaction:\n\n- **Customizable Views:** Allows for custom templates to be used for banners, prompts, responses, and suggestions.\n- **Streaming Responses:** Provides real-time feedback as data is processed, enhancing immediacy and user engagement.\n- **Interactive Toolbar:** Easily integrates custom toolbar items, such as buttons and inputs, enhancing functionality.\n- **Seamless Integration:** Connects with AI services to provide advanced processing and intelligent responses.",
        suggestions: [ "How can I customize the appearance of AI AssistView?", "What are the benefits of using Markdown?" ]
    },
    {
        prompt: "How can I customize the appearance of AI AssistView?",
        response: "Customizing AI AssistView enables you to tailor the look and functionality to suit specific needs:\n\n- **Template Customization:** Modify templates for prompts, responses, and more.\n- **CSS Styling:** Apply custom styles to align with your application’s visual theme.\n- **Theme Support:** Utilize built-in themes or create your own for consistent styling.\n- **Banner and Toolbar Configurations:** Adjust content and tools for personalized UI experiences.",
        suggestions: [ "What customization options are available in AI AssistView?", "Prime number checking C# example?" ]
    },
    {
        prompt: "What is Markdown and how is it used?",
        response: "Markdown is a straightforward syntax used primarily for formatting text documents:\n\n- **Headers:** Create headings with `#`, `##`, `###` for different levels.\n- **Emphasis:** Use `*text*` for italic and `**text**` for bold.\n- **Links and Images:** `[Link](URL)`, `![Alt Text](ImageURL)` to include links and images.\n- **Lists and Code Blocks:** Use `-` for lists and triple backticks ``` for code blocks.\n\nMarkdown’s simplicity and readability make it ideal for writing documentation.",
        suggestions: [ "What are the benefits of using Markdown?", "What customization options are available in AI AssistView?" ]
    },
    {
        prompt: "What customization options are available in AI AssistView?",
        response: "AI AssistView provides extensive customization options for tailored user interactions:\n\n- **Templates:** Use `<PromptItemTemplate>`, `<ResponseItemTemplate>`, etc., for customized display.\n- **Custom Toolbar Items:** Add buttons and other controls via `AssistViewToolbar`.\n- **Dynamic Content:** Update content based on user actions or external events.\n- **Styling:** Full CSS support for styling individual components and layouts.",
        suggestions: ["What are the main features of the AI AssistView component?", "Generate Fibonacci sequence C# example?"]
    },
    {
        prompt: "What are the benefits of using Markdown?",
        response: "Markdown provides several benefits, especially in documentation and writing:\n\n- **Ease of Use:** Its syntax is simple and quick to learn, increasing productivity.\n- **Readability:** Plain text format ensures content is easy to read and edit.\n- **Flexibility:** Can be converted to HTML, PDF, and other formats easily.\n- **Collaboration:** Widely supported in various tools for collaborative writing and documentation.",
        suggestions: ["Prime number checking C# example?", "Generate Fibonacci sequence C# example?"]
    },
    {
        prompt: "Prime number checking C# example?",
response: `<pre><code class=\"csharp language-csharp\">using System;

class Program
{
    static bool IsPrime(int n)
    {
        if (n <= 1) return false;
        for (int i = 2; i <= Math.Sqrt(n); i++)
            if (n % i == 0) return false;
        return true;
    }

    static void Main()
    {
        Console.WriteLine(IsPrime(11)); // True
    }
}
</code></pre>`
    },
    {
        prompt: "Generate Fibonacci sequence C# example?",
        response: `<pre><code class=\"csharp language-csharp\">using System;

class Program
{
    static void Fibonacci(int n)
    {
        int a = 0, b = 1, c;
        for (int i = 0; i < n; i++)
        {
            Console.Write(a + \" \");
            c = a + b;
            a = b;
            b = c;
        }
    }

    static void Main()
    {
        Fibonacci(10); // 0 1 1 2 3 5 8 13 21 34
    }
}
</code></pre>`
    }
];

export let streamingSuggestions: string[] = [
    "What are the main features of the AI AssistView component?",
    "What is Markdown and how is it used?"
];

export let assistantSuggestions: string[] = [
    "How is AI used in everyday life?",
    "What are the benefits of using AI?",
    "C# console app to manage library books"
];

export let assistantResponses : { [key: string]: string | string[] } [] = [
    {
    prompt: "How is AI used in everyday life?",
    response: "<p>AI is integrated into many aspects of daily life. Common examples include:</p> <ol><li>Voice assistants like Siri and Alexa.</li><li>Recommendation systems on Netflix and YouTube.</li><li>Spam filters in email.</li><li>Navigation apps like Google MapsSmart home devices and appliances.</li><ol>",
    suggestions: ["C# console app to manage library books", "Prime number checking C# example?", "What are the benefits of using AI?"]
    },
    {
    prompt: "What are the benefits of using AI?",
    response: "<p>Artificial Intelligence (AI) is revolutionizing the way we live, work, and interact with the world. Here are the key benefits of using AI:<br></p><ol><li><strong>Automation of Repetitive Tasks:</strong> AI automates routine tasks, increasing efficiency and allowing humans to focus on creative and strategic work.</li><br><li><strong>Enhanced Decision-Making:</strong> AI analyzes large datasets to uncover patterns and insights, supporting better decisions in fields like finance, healthcare, and logistics.</li><br><li><strong>Personalization and Customer Experience:</strong> AI tailors experiences to individual users, improving satisfaction through personalized recommendations and services.</li><br><li><strong>Healthcare Advancements:</strong> AI improves diagnostics, treatment planning, and patient monitoring, enabling early disease detection and personalized medicine.</li><br><li><strong>Increased Productivity and Cost Savings:</strong> By optimizing processes and reducing errors, AI boosts productivity and lowers operational costs.</li><br><li><strong>Real-Time Data Processing:</strong> AI processes data in real time, enabling instant responses in areas like fraud detection, autonomous vehicles, and emergency services.</li><br><li><strong>Accessibility and Inclusion:</strong> AI-powered tools support people with disabilities through speech-to-text, real-time translation, and assistive technologies.</li><br><li><strong>Innovation and Scientific Discovery:</strong> AI accelerates research in fields like climate science, genomics, and space exploration by handling complex computations.</li><br><li><strong>Improved Safety and Security:</strong> AI enhances security through surveillance, threat detection, and predictive maintenance in industrial environments.</li><br><li><strong>Economic Growth and Job Creation:</strong> AI creates new roles in development, data science, and ethics, while fostering innovation and entrepreneurship.</li><br><li><strong>Environmental Sustainability:</strong> AI supports sustainability by optimizing energy use, improving agriculture, and guiding conservation efforts.</li><br><li><strong>Creative and Artistic Expression:</strong> AI contributes to the arts by generating music, visual art, and literature, opening new creative possibilities.</li></ol><br><p>In conclusion, AI offers transformative benefits across industries and society. When used responsibly, it can enhance human capabilities, solve complex problems, and drive progress in countless areas.</p>",
    suggestions: ["What are the risks or challenges of AI?", "C# console app to manage library books", "Prime number checking C# example?"]
    },
    {
    prompt: "What are the risks or challenges of AI?",
    response: "<p>While AI has many benefits, it also presents challenges such as:</p><ol><li><strong>Bias:</strong> AI can reflect and amplify biases in training data.</li><li><strong>Privacy:</strong> AI systems often rely on large amounts of personal data.</li> <li><strong>Job Displacement:</strong> Automation may replace certain human jobs.</li></ol>",
    suggestions: ["Prime number checking C# example?", "How is AI used in everyday life?", "C# console app to manage library books"]
    },       
    {
        prompt: "C# console app to manage library books",
        response: `<p>Creating a C# console application for Library Management involves building a simple system to manage books, members, and transactions like borrowing and returning books. Here's a basic structure to get you started:</p><strong>Features to Include</strong><ol><li>Add/Remove Books</li><li>Register Members</li><li>Borrow/Return Books</li><li>View Book List</li><li>View Member List</li></ol><strong>Project Structure</strong><br><p>You can organize your code using classes like:</p><ol><li>Book</li><li>Member</li><li>Library</li><li>Program</li></ol>
        <pre><code class=\"csharp language-csharp\">using System;
using System.Collections.Generic;

class Book {
    public int Id { get; set; }
    public string Title { get; set; }
    public bool IsBorrowed { get; set; } = false;
}

class Member {
    public int Id { get; set; }
    public string Name { get; set; }
}

class Library {
    private List<Book> books = new List<Book>();
    private List<Member> members = new List<Member>();

    public void AddBook(string title) {
        int id = books.Count + 1;
        books.Add(new Book { Id = id, Title = title });
        Console.WriteLine($"Book '{title}' added with ID {id}.");
    }

    public void RegisterMember(string name) {
        int id = members.Count + 1;
        members.Add(new Member { Id = id, Name = name });
        Console.WriteLine($"Member '{name}' registered with ID {id}.");
    }

    public void BorrowBook(int bookId) {
        var book = books.Find(b => b.Id == bookId);
        if (book != null && !book.IsBorrowed) {
            book.IsBorrowed = true;
            Console.WriteLine($"Book '{book.Title}' borrowed.");
        } else {
            Console.WriteLine("Book not available.");
        }
    }

    public void ReturnBook(int bookId) {
        var book = books.Find(b => b.Id == bookId);
        if (book != null && book.IsBorrowed) {
            book.IsBorrowed = false;
            Console.WriteLine($"Book '{book.Title}' returned.");
        } else {
            Console.WriteLine("Invalid return.");
        }
    }

    public void ListBooks() {
        foreach (var book in books) {
            Console.WriteLine($"ID: {book.Id}, Title: {book.Title}, Borrowed: {book.IsBorrowed}");
        }
    }

    public void ListMembers() {
        foreach (var member in members) {
            Console.WriteLine($"ID: {member.Id}, Name: {member.Name}");
        }
    }
}

class Program {
    static void Main() {
        Library library = new Library();
        while (true) {
            Console.WriteLine("\nLibrary Menu:\n1. Add Book\n2. Register Member\n3. Borrow Book\n4. Return Book\n5. List Books\n6. List Members\n7. Exit");
            Console.Write("Choose an option: ");
            int choice = int.Parse(Console.ReadLine());

            switch (choice) {
                case 1:
                    Console.Write("Enter book title: ");
                    library.AddBook(Console.ReadLine());
                    break;
                case 2:
                    Console.Write("Enter member name: ");
                    library.RegisterMember(Console.ReadLine());
                    break;
                case 3:
                    Console.Write("Enter book ID to borrow: ");
                    library.BorrowBook(int.Parse(Console.ReadLine()));
                    break;
                case 4:
                    Console.Write("Enter book ID to return: ");
                    library.ReturnBook(int.Parse(Console.ReadLine()));
                    break;
                case 5:
                    library.ListBooks();
                    break;
                case 6:
                    library.ListMembers();
                    break;
                case 7:
                    return;
                default:
                    Console.WriteLine("Invalid option.");
                    break;
            }
        }
    }
}
</code></pre>`
    },
    {
        prompt: "Prime number checking C# example?",
response: `<pre><code class=\"csharp language-csharp\">using System;

class Program
{
    static bool IsPrime(int n)
    {
        if (n <= 1) return false;
        for (int i = 2; i <= Math.Sqrt(n); i++)
            if (n % i == 0) return false;
        return true;
    }

    static void Main()
    {
        Console.WriteLine(IsPrime(11)); // True
    }
}
</code></pre>`
    }
];