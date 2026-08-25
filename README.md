<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Smart Aviation · README</title>
    <style>
        /* Modern, clean styling for the README page */
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Segoe UI', Roboto, -apple-system, BlinkMacSystemFont, sans-serif;
            background: #f4f7fc;
            color: #1a2639;
            line-height: 1.7;
            padding: 2rem 1rem;
        }

        .container {
            max-width: 1000px;
            margin: 0 auto;
            background: white;
            border-radius: 24px;
            padding: 3rem 2.5rem;
            box-shadow: 0 20px 60px rgba(0, 20, 40, 0.08);
            border: 1px solid rgba(0, 0, 0, 0.02);
        }

        /* Header */
        .header {
            display: flex;
            align-items: center;
            gap: 1rem;
            border-bottom: 3px solid #eef3f8;
            padding-bottom: 1.5rem;
            margin-bottom: 2rem;
            flex-wrap: wrap;
        }

        .header h1 {
            font-size: 2.4rem;
            font-weight: 700;
            background: linear-gradient(145deg, #0b3b5c, #1a6b8a);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }

        .badge-group {
            display: flex;
            flex-wrap: wrap;
            gap: 0.6rem;
            margin-left: auto;
        }

        .badge {
            background: #e9edf2;
            padding: 0.2rem 0.9rem;
            border-radius: 40px;
            font-size: 0.8rem;
            font-weight: 600;
            color: #1f3a4b;
            letter-spacing: 0.3px;
            border: 1px solid #d0d9e3;
        }

        .badge.green {
            background: #dff0e0;
            border-color: #a3c9a5;
            color: #1e5631;
        }

        .badge.blue {
            background: #dceaf5;
            border-color: #a6c4e0;
            color: #17456b;
        }

        /* Typography */
        h2 {
            font-size: 1.8rem;
            font-weight: 600;
            margin-top: 2.5rem;
            margin-bottom: 0.8rem;
            color: #0b2d44;
            border-left: 5px solid #2b8cbe;
            padding-left: 1rem;
        }

        h3 {
            font-size: 1.3rem;
            font-weight: 600;
            margin-top: 1.8rem;
            margin-bottom: 0.5rem;
            color: #1e4a66;
        }

        p {
            margin-bottom: 1rem;
            color: #2d4055;
        }

        ul, ol {
            margin: 0.8rem 0 1.5rem 1.8rem;
            color: #2d4055;
        }

        li {
            margin-bottom: 0.4rem;
        }

        code {
            background: #eef3f9;
            padding: 0.2rem 0.6rem;
            border-radius: 8px;
            font-family: 'Fira Code', 'Cascadia Code', monospace;
            font-size: 0.9rem;
            color: #0f3d5a;
            border: 1px solid #dce3ec;
        }

        pre {
            background: #17212b;
            color: #e4edf5;
            padding: 1.2rem 1.5rem;
            border-radius: 16px;
            overflow-x: auto;
            font-family: 'Fira Code', monospace;
            font-size: 0.9rem;
            margin: 1rem 0 1.8rem 0;
            border: 1px solid #2a3a4a;
        }

        pre code {
            background: transparent;
            border: none;
            color: inherit;
            padding: 0;
            font-size: 0.9rem;
        }

        .feature-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
            gap: 1.2rem;
            margin: 1.5rem 0 2rem 0;
        }

        .feature-card {
            background: #f7faff;
            border-radius: 16px;
            padding: 1.2rem 1.2rem 1rem 1.2rem;
            border: 1px solid #e5edf5;
            transition: all 0.1s ease;
        }

        .feature-card strong {
            display: block;
            font-size: 1.05rem;
            color: #0f3d5a;
            margin-bottom: 0.2rem;
        }

        .feature-card span {
            font-size: 0.95rem;
            color: #3e5a72;
        }

        .hr-light {
            border: none;
            height: 2px;
            background: linear-gradient(to right, #dce6f0, transparent);
            margin: 2rem 0;
        }

        .footer-note {
            margin-top: 3rem;
            padding-top: 1.5rem;
            border-top: 1px solid #e0e9f2;
            text-align: center;
            color: #587489;
            font-size: 0.95rem;
        }

        .footer-note a {
            color: #1a6b8a;
            text-decoration: none;
            font-weight: 500;
        }

        .footer-note a:hover {
            text-decoration: underline;
        }

        @media (max-width: 700px) {
            .container {
                padding: 1.8rem 1.2rem;
            }
            .header {
                flex-direction: column;
                align-items: flex-start;
            }
            .badge-group {
                margin-left: 0;
            }
            .header h1 {
                font-size: 2rem;
            }
        }
    </style>
</head>
<body>
    <div class="container">

        <!-- HEADER -->
        <div class="header">
            <h1>✈️ Smart Aviation</h1>
            <div class="badge-group">
                <span class="badge green">v1.0 · Live</span>
                <span class="badge blue">Flight Status Board</span>
                <span class="badge">Linked List Core</span>
            </div>
        </div>

        <!-- OVERVIEW -->
        <h2>📖 Overview</h2>
        <p>
            <strong>Smart Aviation</strong> is an interactive, real-time flight status board built for travelers and aviation enthusiasts.
            It allows users to search, sort, and monitor flight statuses instantly. The application leverages a custom
            <strong>Linked List</strong> data structure to manage flight data dynamically, ensuring fast, state-driven updates without
            unnecessary page reloads.
        </p>
        <p>
            Whether you are tracking a connecting flight or just curious about departures, Smart Aviation gives you a clean,
            responsive dashboard to stay informed.
        </p>

        <!-- CORE FEATURES -->
        <h2>⚡ Key Features</h2>
        <div class="feature-grid">
            <div class="feature-card">
                <strong>🔍 Search &amp; Filter</strong>
                <span>By origin, destination, and date to narrow down flights instantly.</span>
            </div>
            <div class="feature-card">
                <strong>🔄 Refresh Status</strong>
                <span>Manual refresh to fetch the latest statuses (On Time, Delayed, Boarding, Cancelled).</span>
            </div>
            <div class="feature-card">
                <strong>📊 Multi-Column Sort</strong>
                <span>Sort by departure, arrival, delay, or price with a single click.</span>
            </div>
            <div class="feature-card">
                <strong>📋 Linked List Core</strong>
                <span>Flight nodes are stored in a linked list for efficient traversals and real-time updates.</span>
            </div>
            <div class="feature-card">
                <strong>🎨 Responsive UI</strong>
                <span>Optimized for desktop, tablet, and mobile viewing.</span>
            </div>
            <div class="feature-card">
                <strong>⚡ Status Badges</strong>
                <span>Color-coded indicators for quick visual scanning.</span>
            </div>
        </div>

        <!-- REFRESH STATUS DEEP DIVE -->
        <h2>🔄 Refresh Status — How It Works</h2>
        <p>
            The <strong>Refresh Status</strong> feature is the beating heart of the live board. Instead of reloading the entire page,
            it performs a targeted update of the flight states. Here is the technical breakdown:
        </p>
        <ul>
            <li><strong>Linked List Traversal:</strong> The board holds flight records in a linked list. When you click refresh,
                the system traverses this list from the head node to the tail, fetching the most current status for each flight
                from the underlying data source (or simulating a real-time API call).</li>
            <li><strong>Selective Re-rendering:</strong> Only the status badges and affected fields (e.g., delay timers) are
                updated in the DOM. This makes the refresh instantaneous and bandwidth-friendly.</li>
            <li><strong>User Control:</strong> While an auto-refresh might be scheduled (e.g., every 30 seconds), the manual
                refresh button gives travelers immediate control — perfect for last-minute decisions before heading to the gate.</li>
            <li><strong>State Persistence:</strong> The refresh respects your current search filters and sort order, so you
                don't lose your place while getting the latest information.</li>
        </ul>
        <p>
            In essence, this feature bridges the gap between static data and real-time operations, making the board genuinely
            useful for dynamic travel environments.
        </p>

        <!-- DATA STRUCTURE HIGHLIGHT -->
        <h2>🧩 Under the Hood: Linked List</h2>
        <p>
            The project uses a custom <strong>Singly Linked List</strong> to manage flight objects. Each node contains:
        </p>
        <ul>
            <li><code>flightNumber</code> · <code>airline</code> · <code>origin</code> · <code>destination</code></li>
            <li><code>departureTime</code> · <code>arrivalTime</code> · <code>status</code> · <code>price</code></li>
            <li><code>next</code> pointer referencing the subsequent node.</li>
        </ul>
        <p>
            This structure allows for <strong>O(n)</strong> traversals during search and refresh operations, which is ideal
            for moderate-sized flight datasets (dozens to hundreds of flights). The board controller interacts with the list
            via dedicated methods:
        </p>
        <pre><code>// Example: Refresh all statuses
function refreshAllStatuses(head) {
    let current = head;
    while (current !== null) {
        current.status = fetchLatestStatus(current.flightNumber);
        current = current.next;
    }
    renderBoard(head);
}</code></pre>

        <!-- TECHNOLOGIES -->
        <h2>🛠️ Technologies Used</h2>
        <ul>
            <li><strong>HTML5</strong> – Semantic markup and layout.</li>
            <li><strong>CSS3</strong> – Custom styling with Flexbox/Grid, responsive design.</li>
            <li><strong>Vanilla JavaScript (ES6+)</strong> – Core logic, linked list implementation, DOM manipulation, and event handling.</li>
            <li><strong>Font Awesome</strong> (optional) – For intuitive iconography.</li>
        </ul>
        <p><em>No external frameworks or libraries are required — keeping it lightweight and dependency-free.</em></p>

        <!-- SETUP & INSTALLATION -->
        <h2>📦 Setup &amp; Installation</h2>
        <p>Getting the project running locally is straightforward:</p>
        <ol>
            <li><strong>Clone the repository:</strong>
                <pre><code>git clone https://github.com/tanishzope/MiniprojectNew.git</code></pre>
            </li>
            <li><strong>Navigate to the project folder:</strong>
                <pre><code>cd MiniprojectNew</code></pre>
            </li>
            <li><strong>Open the application:</strong><br>
                Simply double-click the <code>index.html</code> file in your file explorer, or use a local development server
                (e.g., <strong>Live Server</strong> in VS Code) for the best experience.
            </li>
            <li><strong>Start tracking flights:</strong> Use the search bar to filter flights and click <strong>Refresh Status</strong>
                to see live updates.</li>
        </ol>

        <!-- USAGE GUIDE -->
        <h2>🧭 Usage Guide</h2>
        <ol>
            <li><strong>Search:</strong> Enter an origin, destination, and travel date. Click the search button to populate the board.</li>
            <li><strong>Sort:</strong> Click on the table headers (Departure, Arrival, Delay, Price) to reorder the list.</li>
            <li><strong>Refresh:</strong> Hit the <strong>🔄 Refresh Status</strong> button to pull the latest statuses for all
                displayed flights. Watch the badges update in real time.</li>
            <li><strong>Read Statuses:</strong>
                <ul>
                    <li>🟢 <strong>On Time</strong> – Flight is scheduled as planned.</li>
                    <li>🟡 <strong>Delayed</strong> – Departure/Arrival pushed back.</li>
                    <li>🔵 <strong>Boarding</strong> – Passengers are boarding.</li>
                    <li>🔴 <strong>Cancelled</strong> – Flight has been scrubbed.</li>
                </ul>
            </li>
        </ol>

        <!-- FUTURE ENHANCEMENTS -->
        <h2>🚀 Future Enhancements</h2>
        <ul>
            <li><strong>Real API Integration:</strong> Connect to live aviation APIs (e.g., AviationStack, OpenSky) for genuine real-time data.</li>
            <li><strong>Auto-Refresh Toggle:</strong> Let users set custom auto-refresh intervals (15s, 30s, 1min).</li>
            <li><strong>Flight Alerts:</strong> Push notifications or sound alerts when a tracked flight changes status.</li>
            <li><strong>Dark Mode:</strong> A toggleable dark theme for low-light environments.</li>
            <li><strong>Pagination:</strong> Enhanced performance for large flight datasets.</li>
        </ul>

        <!-- AUTHOR & CREDITS -->
        <hr class="hr-light">
        <h2>👨‍💻 Author</h2>
        <p>
            <strong>Tanish Zope</strong> · <a href="https://github.com/tanishzope" target="_blank">GitHub</a><br>
            This project was developed as a mini-project to demonstrate practical data structure (Linked List) usage
            in a real-world user interface context.
        </p>

        <!-- FOOTER -->
        <div class="footer-note">
            Smart Aviation &mdash; Built with ❤️ for travelers &amp; developers alike.<br>
            View the live demo at <a href="https://tanishzope.github.io/MiniprojectNew/" target="_blank">tanishzope.github.io/MiniprojectNew</a>
        </div>

    </div>
</body>
</html>
