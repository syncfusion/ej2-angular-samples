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