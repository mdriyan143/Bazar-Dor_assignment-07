# বাজার দর | BazarDor

**বাজার দর (BazarDor)** is a responsive Bangla market-price website that helps users explore everyday products, compare prices, and view market-wise price information in one place.


## 🚀 Live Demo : **[BazarDor](https://bazar-dor-mdriyan143.vercel.app/)**

 📂 GitHub Repository : **[GitHub Repository](https://github.com/mdriyan143/Bazar-Dor_assignment-07)**


## ✨ Key Features

1. **Product listings** — Browse everyday market products with prices, units, and price-change indicators.
2. **Price trends** — Quickly explore products whose prices have increased or decreased.
3. **Product details** — View price summaries and market-wise prices for individual products.
4. **Category browsing and sorting** — Browse products by category and sort prices from low to high or high to low.
5. **Authentication** — Sign up and sign in using email/password, Google, or GitHub with Better Auth.
6. **Profile management** — View your profile and update your name.
7. **Responsive design** — Use the website on mobile, tablet, and desktop.
8. **Loading and error states** — Includes loading skeletons and friendly not-found pages.

## 🛠️ Technologies Used

- **Next.js 16** — App Router and application routing
- **React 19** — UI components
- **TypeScript** — Type-safe development
- **Tailwind CSS 4** — Styling and responsive layouts
- **DaisyUI 5** — UI styling utilities and theme support
- **Better Auth** — Email/password and social authentication
- **MongoDB** — Authentication data storage
- **React Hot Toast** — Success and error notifications
- **React Icons** — Icons
- **BazarDor API** — Product and category data

## 🚀 Getting Started

### Requirements

- Node.js (compatible with your installed Next.js version)
- npm
- A MongoDB database for authentication

### 1. Clone the repository

```bash
git clone <your-github-repository-url>
cd Bazar-Dor_assignment-07-main
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env.local` file in the project root:

```env
MONGODB_URI=your_mongodb_connection_string
MONGODB_DB=bazar-dor
BETTER_AUTH_URL=http://localhost:3000
BETTER_AUTH_SECRET=your_long_random_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
API_BASE_URL=https://api.api-store.workers.dev/api/bazardor
API_BASE_URL_FALLBACK=https://api.abcz.workers.dev/api/bazardor
```

Replace the example values with your own credentials. Configure Google and GitHub OAuth callback URLs in their provider dashboards to match your Better Auth setup. Never commit `.env.local` or real secrets to GitHub.

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Build for production

```bash
npm run build
npm start
```

## 📡 Product API

The application uses the BazarDor API for product and category information.

- Primary API: `https://openapi.programming-hero.com/api/bazardor`
- Fallback API: `https://api.abcz.workers.dev/api/bazardor`

Available endpoints include:

- `GET /products` — list products
- `GET /products?category=chal` — filter products by category
- `GET /products/1` — retrieve a product
- `GET /categories` — list categories
- `GET /categories/chal` — retrieve a category

## 📁 Main Routes

| Route | Description |
|---|---|
| `/` | Homepage and product listings |
| `/category/[slug]` | Products in a category with price sorting |
| `/product/[slug]` | Product details and market prices |
| `/signin` | Sign-in page |
| `/signup` | Registration page |
| `/profile` | User profile |
| `/profile/update` | Update profile information |

## 📱 Responsive Experience

The interface is designed to adapt to mobile, tablet, and desktop screens.

## 🔐 Environment and Security Notes

- Keep `.env.local` private and do not push secrets to your repository.
- Use a strong, unique `BETTER_AUTH_SECRET`.
- Set the correct production `BETTER_AUTH_URL` and OAuth callback URLs before deployment.

## 👤 Project

**Project name:** বাজার দর | BazarDor  
**Description:** প্রয়োজনীয় পণ্যের দৈনিক বাজার দর এক নজরে।

---

*Market prices are indicative and may change depending on market conditions.*
