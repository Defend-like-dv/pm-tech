export const techStacks = [
  {
    id: "react",
    name: "React.js",
    category: "frontend",
    what: "A client-side JavaScript library used to build interactive user interfaces running in the browser.",
    why: "Updates elements on the screen dynamically using a Virtual DOM without reloading the entire page.",
    limit: "Large JavaScript bundle sizes slow down the initial load time, causing blank page lag on slow networks.",
    paragraphs: [
      "React was created by Facebook to solve a major problem in web development: complex state management. In traditional web pages, updating the UI required direct manipulation of the DOM (Document Object Model), which is computationally expensive and prone to bugs when multiple elements change simultaneously.",
      "React solves this by introducing the concept of the Virtual DOM—a lightweight, in-memory copy of the real DOM. When data changes in a React application, React calculates the difference (a process called 'diffing' or 'reconciliation') and updates only those specific elements on the screen. This makes user interactions feel incredibly fluid and instant.",
      "However, the main trade-off of React is its client-side footprint. Because React relies on the browser to execute JavaScript and construct the HTML on the fly, users must download a bundle of JavaScript files before they can see anything. On slow networks or low-powered devices, this can lead to a noticeable 'blank screen' delay, which can negatively impact SEO and bounce rates."
    ]
  },
  {
    id: "html-css",
    name: "HTML & CSS",
    category: "frontend",
    what: "The structural skeleton (HTML) and style layout sheet (CSS) of web pages.",
    why: "Standardized blocks that browsers know how to draw; defines responsive layouts (Grid, Flexbox).",
    limit: "Static by nature. Building dynamic interfaces requires JavaScript to manage screen states.",
    paragraphs: [
      "HTML (HyperText Markup Language) and CSS (Cascading Style Sheets) are the foundational building blocks of the Web. HTML provides the semantic structure—defining headers, paragraphs, lists, and images—while CSS provides the style, managing layout, colors, typography, and responsiveness.",
      "Modern CSS includes powerful layout engines like Flexbox and Grid. Flexbox is designed for one-dimensional layouts (a row of buttons or a column of cards), whereas Grid is designed for two-dimensional layouts (entire page structures with rows and columns). These layout models allow developers to build fluid designs that automatically adapt to mobile, tablet, and desktop screens.",
      "The primary limitation is that HTML and CSS are completely static. They cannot handle user authentication, state changes, or database operations. To make a page interactive—like adding an item to a shopping cart or showing a live search result—JavaScript must be introduced to manipulate the page structure dynamically."
    ]
  },
  {
    id: "rendering",
    name: "CSR vs SSR Rendering",
    category: "frontend",
    what: "Client-Side Rendering (browser runs JS to compile HTML) vs Server-Side Rendering (server compiles fully populated HTML first).",
    why: "CSR creates fluid screen transitions without full page refreshes. SSR delivers instant initial load times and strong SEO indexing.",
    limit: "CSR causes slow initial blank screens while loading bundles. SSR increases server CPU costs under high traffic spikes.",
    paragraphs: [
      "When building web applications, a critical architectural decision is where to compile the HTML that the user sees: on the user's device (Client-Side Rendering or CSR) or on the backend server (Server-Side Rendering or SSR).",
      "In CSR, the server sends a minimal HTML shell and a large JavaScript bundle. The browser downloads the JS, runs it, fetches data via APIs, and draws the UI. Once loaded, page transitions are instantaneous because the browser only swaps small pieces of code. However, the initial load is slow, and search engine crawlers sometimes struggle to index the blank initial HTML, hurting SEO.",
      "In SSR, the server receives the request, queries the database, compiles the complete HTML page with all text and images, and sends it to the browser. The user sees the page instantly, making it excellent for SEO and public content. The trade-off is that every navigation requires a round-trip to the server, and high traffic can strain the server's CPU as it builds pages for millions of users."
    ]
  },
  {
    id: "nodejs",
    name: "Node.js",
    category: "backend",
    what: "A runtime environment that allows developers to run JavaScript on the backend server.",
    why: "Enables unified team codebases (JS on front & back) and handles thousands of concurrent simple requests.",
    limit: "Single-threaded model. CPU-heavy math tasks (video compression, reports) block the server thread for all users.",
    paragraphs: [
      "Traditionally, JavaScript could only run inside the browser. In 2009, Node.js was created by wrapping Google Chrome's V8 JavaScript engine in a server-side environment. This allowed developers to use JavaScript to write backend servers, interact with databases, and handle network requests, giving rise to unified JavaScript stacks like MERN (MongoDB, Express, React, Node).",
      "Node.js utilizes an event-driven, non-blocking I/O model. Instead of spawning a new operating system thread for every incoming request (which uses a lot of memory), Node.js runs on a single main thread. When a database or file operation is requested, Node.js pushes it to the background and immediately moves to the next request. When the database finishes, Node.js handles the response. This makes Node.js extremely fast and lightweight for database-heavy web apps.",
      "The Achilles' heel of Node.js is CPU-bound computations. Because it runs on a single thread, any heavy mathematical calculation, image processing, or data compression blocks the thread. While the server is processing that calculation, no other requests can be handled, causing the server to freeze for all users. For CPU-heavy applications, multi-threaded runtimes (like Go, Java, or C#) are generally preferred."
    ]
  },
  {
    id: "django",
    name: "Python Django",
    category: "backend",
    what: "A high-level Python framework designed for rapid development with a built-in ORM database mapper.",
    why: "Highly secure and comes with 'batteries included' (built-in user auth, admin panel, tables).",
    limit: "Heavy memory footprint. Running Django servers is more expensive and has slower execution than compiled code.",
    paragraphs: [
      "Django is a mature, high-level Python web framework designed for rapid prototyping and clean design. Its core philosophy is 'batteries included,' meaning it provides almost everything a developer needs out of the box: an Object-Relational Mapper (ORM), user authentication, form validation, security protections (against CSRF and XSS), and an auto-generated admin dashboard.",
      "The Django ORM is particularly powerful because it allows developers to write database queries using Python code instead of raw SQL. Django automatically translates the Python commands into PostgreSQL, MySQL, or SQLite commands, making database management highly approachable and reducing database-specific bugs.",
      "The trade-off for Django's ease of use is performance and memory consumption. Python is an interpreted language, making Django slower and more resource-intensive compared to compiled languages like Go or Rust. Additionally, Django's rigid structure can make it difficult to customize low-level behavior, making it less ideal for microservice architectures."
    ]
  },
  {
    id: "postgres",
    name: "PostgreSQL",
    category: "database",
    what: "A relational SQL database storing data in linked, highly structured tables.",
    why: "Guarantees transactional security (ACID). Perfect for billing ledger records.",
    limit: "Very difficult to scale writes horizontally across multiple servers because transactions require row locking.",
    paragraphs: [
      "PostgreSQL is an open-source, relational SQL database. It organizes data into tables with predefined columns, data types, and relationships (using foreign keys). PostgreSQL is widely recognized for its robustness, compliance, and support for complex query analysis.",
      "Relational databases are built around ACID guarantees (Atomicity, Consistency, Isolation, Durability). This ensures that database transactions are processed reliably. For example, if a user transfers money, the system guarantees that either both accounts are updated or neither is, preventing data corruption. This makes SQL databases the industry standard for financial ledgers, checkouts, and identity management.",
      "The primary bottleneck of PostgreSQL is horizontal scaling for writes. Because it guarantees strict consistency across tables, it is very difficult to split write operations across multiple servers. Scaling usually requires buying a larger server with more CPU and RAM (vertical scaling), which can become very expensive. Additionally, changes to the database structure (schemas) require run-time migrations, which can cause service downtime if not executed carefully."
    ]
  },
  {
    id: "mongo",
    name: "MongoDB",
    category: "database",
    what: "A non-relational NoSQL database storing data in flexible, schema-less JSON-like documents.",
    why: "Allows developers to add data fields instantly without running database migrations.",
    limit: "Joining data across collections is extremely slow. If your feature has complex relations, it will lag.",
    paragraphs: [
      "MongoDB is a popular non-relational (NoSQL) document database. Instead of rows and columns, it stores data in flexible BSON (Binary JSON) documents. Each document can have a different structure, allowing developer teams to store complex, nested data hierarchies in a single record.",
      "The core benefit of MongoDB is development speed and flexibility. If you want to add a new property to a user profile (e.g. adding a list of user preferences), you simply write the new key-value pair to the database. There is no schema to define and no database migration script to run, making it ideal for rapid prototyping, content management, and logging systems.",
      "The major trade-off is relational performance. Because MongoDB is designed to store self-contained documents, it lacks native support for complex relations. Joining data across different collections (equivalent to a SQL JOIN) is slow and resource-intensive. If your application has highly connected data—like a social network with complex friendships or a financial ledger with double-entry accounting—using MongoDB will lead to performance issues and potential data inconsistency."
    ]
  },
  {
    id: "redis",
    name: "Redis Cache",
    category: "database",
    what: "An in-memory key-value database commonly placed in front of primary databases.",
    why: "All data sits in server RAM, cutting database read/write speeds to under 1 millisecond.",
    limit: "Limited by RAM size capacity, which is expensive. Volatile - all cache is lost if the server restarts.",
    paragraphs: [
      "In modern web applications, the main database (like PostgreSQL) is often the primary speed bottleneck. Querying a hard drive to retrieve data takes milliseconds. Redis solves this by acting as an in-memory caching layer. It sits between the application server and the primary database, storing frequently accessed data directly in the server's RAM.",
      "Since RAM is orders of magnitude faster than solid-state drives, Redis can read and write data in under a millisecond. When a user requests a profile page, the server checks Redis first (a 'cache hit'). If the data is there, it is returned instantly. If not (a 'cache miss'), the server queries PostgreSQL, saves the result in Redis for next time, and returns it to the user.",
      "The limitations of Redis are cost and volatility. RAM is far more expensive than disk storage, so you cannot store terabytes of data in Redis economically. Furthermore, because RAM requires power to maintain data, if the Redis server crashes or restarts, all stored cache is lost. For this reason, Redis is used for ephemeral data (session IDs, API rate limits, temporary caches) rather than permanent records."
    ]
  },
  {
    id: "rest",
    name: "REST APIs",
    category: "communication",
    what: "An API architectural style using standard URLs to transfer JSON data over HTTP requests.",
    why: "Decouples frontend from backend, allowing both teams to work and scale separately.",
    limit: "Over-fetching data. Requesting a user profile returns all columns, even if you only need the username.",
    paragraphs: [
      "REST (Representational State Transfer) is the dominant architectural standard for building web APIs. It relies on standard HTTP methods—GET to retrieve data, POST to create it, PUT to update it, and DELETE to remove it—using clear, noun-based URLs like `/api/users/123`.",
      "REST decouples the client (frontend website or mobile app) from the server (backend database). The backend simply exposes endpoints that return raw JSON data. This allows developers to build a single backend service that can power a web app, an iOS app, and an Android app simultaneously, speeding up development and simplifying testing.",
      "The major limitation of REST is over-fetching or under-fetching data. If a mobile page only needs to display a user's name, but calling `/api/users/123` returns all 50 columns of user profile data (including bio, settings, history), that is over-fetching. It wastes network bandwidth and memory. Conversely, if displaying a page requires calling three separate endpoints, that is under-fetching, leading to multiple round-trips and loading delays."
    ]
  },
  {
    id: "graphql",
    name: "GraphQL",
    category: "communication",
    what: "A query language for APIs that lets the browser request only the specific fields it needs.",
    why: "Saves mobile network data, preventing over-fetching. Frontends query complex objects in one request.",
    limit: "Complex caching setup on the backend. Malicious clients can write deeply nested queries that crash servers.",
    paragraphs: [
      "GraphQL was developed by Facebook in 2012 to address the mobile bandwidth limitations of REST APIs. Instead of exposing dozens of endpoints with fixed JSON structures, a GraphQL API exposes a single endpoint (usually `/graphql`). The client sends a query specifying exactly what data it wants, and the server returns a JSON response matching that exact structure.",
      "For example, a client can request a user's name, profile picture, and the titles of their last three posts in a single HTTP request. This eliminates over-fetching (no unwanted fields are sent) and under-fetching (no need to make multiple API calls), dramatically improving performance on slow mobile networks.",
      "However, GraphQL shifts significant complexity to the backend. In REST, API requests are easily cached at the CDN level because URLs are static. In GraphQL, because query payloads change, caching is much harder to implement. Additionally, because clients can write queries of arbitrary complexity, malicious users can submit deeply nested queries that exhaust server memory, requiring developers to write complex query-depth analyzers to protect the backend."
    ]
  },
  {
    id: "webhooks",
    name: "Webhooks",
    category: "communication",
    what: "Server-to-server push notifications triggered by real-time database events.",
    why: "Sends active alerts (e.g. Stripe notifies your app when a credit card payment succeeds) without polling.",
    limit: "Delivery failures. If your receiver server goes offline, webhook alerts can be lost unless retry loops are set.",
    paragraphs: [
      "In web systems, communication often needs to happen between two separate companies' servers. For example, when a user pays you via Stripe, your backend needs to know immediately to activate their subscription. Webhooks solve this using an event-driven 'push' model, where Stripe's server makes an HTTP POST request to a pre-defined URL on your server.",
      "This is far more efficient than 'polling' (where your server would constantly ask Stripe every 5 seconds if a payment occurred). With webhooks, your server stays quiet until an event actually happens, saving server resources and ensuring instant updates.",
      "The difficulty with webhooks is reliability. If your server goes down for maintenance just as Stripe sends a webhook, that payment alert is lost. To handle this, webhook providers must implement retry queues (retrying every hour for 24 hours), and your server must verify the digital signature of incoming webhooks to prevent malicious third parties from forging requests."
    ]
  }
];
