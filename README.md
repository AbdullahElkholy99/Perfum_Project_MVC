# Sillage — Luxury Fragrance E-Commerce Platform

Sillage is a full-stack ASP.NET Core MVC e-commerce application built for a luxury fragrance studio. It includes a customer-facing storefront, a complete admin dashboard, order and inventory management, authentication, and seasonal UI overlays.

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Configuration](#configuration)
- [Database](#database)
- [Admin Dashboard](#admin-dashboard)
- [Customer Storefront](#customer-storefront)
- [Authentication](#authentication)
- [Theming](#theming)
- [Screenshots](#screenshots)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

Sillage is designed around the aesthetic of high-end perfumery — refined typography, warm amber tones, and a deliberate attention to detail in every UI component. The platform serves two audiences: customers browsing and purchasing fragrances, and administrators managing the full business operation.

The name "sillage" refers to the trail a fragrance leaves in the air — the invisible mark of presence.

---

## Features

**Customer Storefront**

- Product catalogue with filtering by category, price, and fragrance family
- Product detail pages with fragrance note breakdowns
- Cart drawer with real-time quantity updates
- Three-step checkout with address and payment collection
- Order confirmation and history
- Seasonal greeting overlays (Ramadan Kareem, etc.)

**Admin Dashboard**

- KPI strip: revenue, orders, customers, average order value, conversion rate
- Period toggle (7D / 30D / 90D / 1Y) with AJAX data refresh
- Revenue and units bar chart
- Category mix donut chart
- Recent orders table with status badges
- Top fragrances ranked by revenue
- Monthly goal progress bars
- Top markets by revenue
- Live activity ticker with refresh
- Customer segments and retention rate
- Low stock alerts with one-click reorder
- Notification panel with mark-all-read

**Admin Pages**

- Products (fragrance catalogue) — grid and table toggle, bulk actions, product detail drawer
- Orders — status filters, bulk updates, order timeline drawer
- Customers — search, profile drawer, segment tags
- Collections — create and manage fragrance collections
- Categories — hierarchy tree and inline detail panel
- Admin profile — personal info, avatar, permissions, security, sessions, notifications

**Authentication**

- ASP.NET Core Identity with role-based access (Admin / Customer)
- Login, registration, forgot password, and email verification
- Themed auth pages consistent with the storefront design

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | ASP.NET Core MVC (.NET 8) |
| ORM | Entity Framework Core |
| Database | SQL Server |
| Authentication | ASP.NET Core Identity |
| Frontend | HTML, CSS (custom properties), Vanilla JS |
| Icons | Font Awesome 6 |
| Fonts | Cormorant Garamond, Jost (Google Fonts) |
| Payments | Stripe.js |
| Hosting | IIS / Azure App Service |

---

## Project Structure

```
Sillage/
├── Controllers/
│   ├── AccountController.cs
│   ├── DashboardController.cs
│   ├── HomeController.cs
│   ├── OrdersController.cs
│   └── ProductsController.cs
├── Models/
│   ├── Order.cs
│   ├── OrderItem.cs
│   ├── Product.cs
│   ├── Category.cs
│   └── ApplicationUser.cs
├── ViewModels/
│   ├── Dashboard/
│   │   └── DashboardViewModel.cs
│   └── Account/
│       ├── LoginViewModel.cs
│       └── RegisterViewModel.cs
├── Services/
│   ├── IDashboardService.cs
│   └── DashboardService.cs
├── Views/
│   ├── Shared/
│   │   ├── _Layout.cshtml
│   │   └── _DashboardAdminLayOut.cshtml
│   ├── Dashboard/
│   │   └── Index.cshtml
│   ├── Home/
│   │   └── Index.cshtml
│   └── Account/
│       ├── Login.cshtml
│       ├── Register.cshtml
│       └── ForgotPassword.cshtml
├── wwwroot/
│   ├── css/
│   │   ├── users/
│   │   │   ├── customerpage.css
│   │   │   ├── forgotpassword.css
│   │   │   └── ramadan-overlay.css
│   │   └── dashbord/
│   │       └── dashboardstyle.css
│   ├── js/
│   │   ├── users/
│   │   │   └── customerpage.js
│   │   └── dashboard/
│   │       └── dasboardscript.js
│   └── Images/
│       └── product/
├── Data/
│   └── ApplicationDbContext.cs
└── Program.cs
```

---

## Getting Started

### Prerequisites

- .NET 8 SDK
- SQL Server (LocalDB is sufficient for development)
- Visual Studio 2022 or VS Code

### Installation

1. Clone the repository

```bash
git clone https://github.com/your-username/sillage.git
cd sillage
```

2. Restore NuGet packages

```bash
dotnet restore
```

3. Copy the example environment file and fill in your values

```bash
cp appsettings.example.json appsettings.json
```

4. Apply database migrations

```bash
dotnet ef database update
```

5. Run the application

```bash
dotnet run
```

The application will be available at `https://localhost:5291`.

---

## Configuration

All sensitive configuration lives in `appsettings.json`, which is excluded from version control. Use `appsettings.example.json` as the template.

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=(localdb)\\mssqllocaldb;Database=SillageDb;Trusted_Connection=True;"
  },
  "Stripe": {
    "PublishableKey": "pk_test_...",
    "SecretKey": "sk_test_..."
  },
  "Email": {
    "SmtpHost": "smtp.example.com",
    "SmtpPort": 587,
    "FromAddress": "noreply@sillage.studio",
    "Username": "",
    "Password": ""
  }
}
```

---

## Database

The application uses Entity Framework Core Code First migrations.

**Seeding**

On first run, the application seeds:
- Default admin account (`admin@sillage.studio`)
- Product categories (Floral, Oriental, Woody, Fresh, Gourmand, Aquatic)
- Sample fragrance products

**Key entities**

- `ApplicationUser` — extends IdentityUser with FirstName, LastName, CreatedAt
- `Product` — Name, Description, Price, StockQuantity, CategoryId, ImageUrl, FragranceNotes
- `Category` — Name, ParentCategoryId (supports hierarchy)
- `Order` — UserId, OrderDate, Status, TotalPrice, ShippingAddressId
- `OrderItem` — OrderId, ProductId, Quantity, Price

---

## Admin Dashboard

The dashboard is accessible at `/Dashboard` and requires the `Admin` role.

Data is loaded server-side into the view via `DashboardViewModel`, serialized to `window.DASH_DATA`, and rendered by `dasboardscript.js`. Period changes trigger AJAX calls to:

```
GET /Dashboard/KpiData?period=30d
GET /Dashboard/ChartData?period=30d
GET /Dashboard/TickerData
POST /Dashboard/MarkAllNotificationsRead
POST /Dashboard/ReorderStock
```

---

## Customer Storefront

The storefront is the default route (`/` or `/Home/Index`). It supports:

- Light and dark theme (persisted to localStorage)
- Ramadan Kareem overlay on page load during Ramadan (auto-dismisses after 5 seconds)
- Quick add to cart without leaving the catalogue
- Fragrance note breakdown (top, middle, base notes) in product modals
- Cart drawer with live subtotal
- Guest checkout or authenticated checkout

---

## Authentication

Role-based access is enforced at the controller level using `[Authorize(Roles = "Admin")]` on all dashboard controllers. Customer routes are open or protected with `[Authorize]` where needed.

Password reset flow:
1. User submits email on `/Account/ForgotPassword`
2. A verification code is sent via SMTP
3. User submits the code on `/Account/VerifyCode`
4. User sets a new password on `/Account/ResetPassword`

---

## Theming

The design system uses CSS custom properties defined on `:root[data-theme="light"]` and `:root[data-theme="dark"]`. Theme is toggled by setting the `data-theme` attribute on the `<html>` element.

Core tokens:

```css
--bg, --bg2, --bg3          Background layers
--surface, --surface2       Card and input surfaces
--border                    Subtle borders
--text, --text2, --text3    Text hierarchy
--accent, --accent2         Primary amber brand colour
--gold, --rose, --green     Semantic accent colours
--shadow, --shadow2         Elevation shadows
--glow                      Ambient accent glow
```

Typography uses Cormorant Garamond (display, headings, prices) paired with Jost (UI labels, body text, buttons).

---

## Screenshots

Screenshots are located in `/docs/screenshots/`. To add new ones, place PNG files in that directory and reference them here.

---

## Contributing

1. Fork the repository
2. Create a feature branch from `main`

```bash
git checkout -b feature/your-feature-name
```

3. Commit your changes with a clear message

```bash
git commit -m "Add: brief description of what changed"
```

4. Push to your fork and open a pull request against `main`

Please keep pull requests focused on a single concern. Large refactors should be discussed in an issue first.

---

## License

This project is released under the MIT License. See `LICENSE` for details.
