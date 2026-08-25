<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>Smart Aviation – DSA README</title>
    <!-- Font Awesome for icons -->
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
    />
    <style>
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }

      body {
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        background: #f4f7fc;
        display: flex;
        justify-content: center;
        padding: 2rem 1rem;
        min-height: 100vh;
        align-items: center;
      }

      .readme-card {
        max-width: 1000px;
        width: 100%;
        background: #ffffff;
        border-radius: 24px;
        box-shadow: 0 20px 40px rgba(0, 20, 40, 0.12);
        overflow: hidden;
        padding: 2rem 2.5rem;
        transition: 0.2s;
      }

      /* Header */
      .header {
        border-bottom: 2px solid #eef2f7;
        padding-bottom: 1.5rem;
        margin-bottom: 2rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-wrap: wrap;
        gap: 1rem;
      }

      .header-left {
        display: flex;
        align-items: center;
        gap: 0.75rem;
      }

      .header-left i {
        font-size: 2.4rem;
        color: #0a2b5c;
      }

      .header-left h1 {
        font-size: 1.9rem;
        font-weight: 700;
        color: #0a2b5c;
        letter-spacing: -0.3px;
      }

      .header-badge {
        background: #eaf2ff;
        color: #0a2b5c;
        font-weight: 600;
        font-size: 0.8rem;
        padding: 0.4rem 1rem;
        border-radius: 40px;
        border: 1px solid #c5d8f0;
        display: inline-flex;
        align-items: center;
        gap: 0.4rem;
      }

      .header-badge i {
        font-size: 0.8rem;
      }

      /* Subtitle */
      .subtitle {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        flex-wrap: wrap;
        margin-bottom: 2rem;
        background: #f8faff;
        padding: 0.9rem 1.5rem;
        border-radius: 60px;
        border: 1px solid #e2ebf5;
      }

      .subtitle i {
        color: #1f5f9e;
        font-size: 1.1rem;
      }

      .subtitle span {
        color: #1f3a5f;
        font-weight: 500;
        font-size: 0.95rem;
      }

      .subtitle .tag {
        background: #0a2b5c;
        color: white;
        padding: 0.2rem 1rem;
        border-radius: 40px;
        font-size: 0.75rem;
        font-weight: 600;
        letter-spacing: 0.3px;
        margin-left: auto;
      }

      /* Grid */
      .dsa-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
        gap: 1.5rem;
        margin: 2rem 0 2.5rem;
      }

      .dsa-card {
        background: #f9fcff;
        border-radius: 20px;
        padding: 1.6rem 1.2rem 1.4rem;
        border: 1px solid #e6edf6;
        transition: 0.2s ease;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
      }

      .dsa-card:hover {
        transform: translateY(-4px);
        box-shadow: 0 12px 24px rgba(10, 43, 92, 0.06);
        border-color: #b8cfe8;
      }

      .dsa-card .icon {
        font-size: 2rem;
        color: #0a2b5c;
        margin-bottom: 0.6rem;
        background: #e6effa;
        padding: 0.4rem 0.6rem;
        border-radius: 14px;
        line-height: 1;
      }

      .dsa-card h3 {
        font-size: 1.2rem;
        font-weight: 700;
        color: #0a1e3a;
        margin-bottom: 0.2rem;
      }

      .dsa-card .badge-dsa {
        font-size: 0.65rem;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.4px;
        color: #1f5f9e;
        background: #e1edfb;
        padding: 0.15rem 0.7rem;
        border-radius: 30px;
        margin-bottom: 0.6rem;
        display: inline-block;
      }

      .dsa-card p {
        font-size: 0.9rem;
        color: #2f405c;
        line-height: 1.4;
        margin-top: 0.15rem;
      }

      /* Footer */
      .footer-note {
        border-top: 1px solid #eef2f7;
        padding-top: 1.8rem;
        margin-top: 1.2rem;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        align-items: center;
        gap: 1rem;
      }

      .footer-note .project-info {
        display: flex;
        align-items: center;
        gap: 1.2rem;
        color: #1d3e66;
        font-weight: 500;
        font-size: 0.95rem;
      }

      .footer-note .project-info i {
        color: #0a2b5c;
        width: 1.4rem;
      }

      .footer-note .badge-end {
        background: #0a2b5c;
        color: white;
        padding: 0.35rem 1.2rem;
        border-radius: 40px;
        font-size: 0.75rem;
        font-weight: 600;
        letter-spacing: 0.2px;
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
      }

      /* Responsive */
      @media (max-width: 600px) {
        .readme-card {
          padding: 1.5rem;
        }
        .header-left h1 {
          font-size: 1.5rem;
        }
        .subtitle {
          flex-direction: column;
          align-items: flex-start;
          border-radius: 20px;
        }
        .subtitle .tag {
          margin-left: 0;
        }
        .footer-note {
          flex-direction: column;
          align-items: flex-start;
        }
      }
    </style>
  </head>
  <body>
    <div class="readme-card">

      <!-- HEADER -->
      <div class="header">
        <div class="header-left">
          <i class="fas fa-plane-departure"></i>
          <h1>Smart Aviation</h1>
        </div>
        <div class="header-badge">
          <i class="fas fa-code"></i> DSA · Mini Project
        </div>
      </div>

      <!-- SUBTITLE / CONTEXT -->
      <div class="subtitle">
        <i class="fas fa-cubes"></i>
        <span><strong>Data Structures &amp; Algorithms</strong> — complete implementation used across the flight management system</span>
        <span class="tag"><i class="fas fa-check-circle"></i> Engineering</span>
      </div>

      <!-- DSA GRID -->
      <div class="dsa-grid">

        <!-- 1. Array -->
        <div class="dsa-card">
          <div class="icon"><i class="fas fa-table"></i></div>
          <h3>Array</h3>
          <span class="badge-dsa">linear</span>
          <p>Dynamic flight &amp; passenger storage</p>
        </div>

        <!-- 2. Searching -->
        <div class="dsa-card">
          <div class="icon"><i class="fas fa-search"></i></div>
          <h3>Searching</h3>
          <span class="badge-dsa">O(log n)</span>
          <p>Fast flight search by number</p>
        </div>

        <!-- 3. Sorting -->
        <div class="dsa-card">
          <div class="icon"><i class="fas fa-sort-amount-down"></i></div>
          <h3>Sorting</h3>
          <span class="badge-dsa">comparison</span>
          <p>Sort by departure, arrival, delay, price</p>
        </div>

        <!-- 4. Queue -->
        <div class="dsa-card">
          <div class="icon"><i class="fas fa-users"></i></div>
          <h3>Queue</h3>
          <span class="badge-dsa">FIFO</span>
          <p>Check-in / boarding order (FIFO)</p>
        </div>

        <!-- 5. Priority Queue -->
        <div class="dsa-card">
          <div class="icon"><i class="fas fa-star"></i></div>
          <h3>Priority Queue</h3>
          <span class="badge-dsa">heap</span>
          <p>Priority check-in for urgent needs</p>
        </div>

        <!-- 6. Linked List -->
        <div class="dsa-card">
          <div class="icon"><i class="fas fa-link"></i></div>
          <h3>Linked List</h3>
          <span class="badge-dsa">dynamic</span>
          <p>Dynamic flight status management</p>
        </div>

      </div>

      <!-- FOOTER -->
      <div class="footer-note">
        <div class="project-info">
          <i class="fas fa-microchip"></i>
          <span>Smart Aviation · Complete DSA Solution</span>
        </div>
        <div class="badge-end">
          <i class="fas fa-graduation-cap"></i> Data Structures Mini Project
        </div>
      </div>

    </div>
  </body>
</html>
