# St. Denis Wine, Books, and Wonders - Website

A beautiful, mobile-first website for St. Denis, a boutique wine bar and bookstore in downtown Columbus, Indiana.

## Tech Stack

- **Vite** - Fast build tool
- **React** - UI framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Supabase** - Database for mailing list
- **Zod** - Form validation
- **React Hook Form** - Form management

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- A Supabase account

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd st-denis-website
```

2. Install dependencies:
```bash
npm install
```

3. Set up Supabase:
   - Create a new project at [supabase.com](https://supabase.com)
   - Go to Project Settings > API
   - Copy your project URL and anon key

4. Create a `.env` file in the root directory:
```bash
cp .env.example .env
```

5. Add your Supabase credentials to `.env`:
```
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Database Setup

Create the `mailing_list` table in your Supabase project:

```sql
CREATE TABLE mailing_list (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  verified BOOLEAN DEFAULT false,
  subscribed BOOLEAN DEFAULT true
);

-- Add index for email lookups
CREATE INDEX idx_mailing_list_email ON mailing_list(email);

-- Enable Row Level Security (RLS)
ALTER TABLE mailing_list ENABLE ROW LEVEL SECURITY;

-- Create policy to allow inserts (for the form)
CREATE POLICY "Allow public to insert emails" ON mailing_list
  FOR INSERT
  WITH CHECK (true);

-- Create policy to allow reads (if you need to check for duplicates)
CREATE POLICY "Allow public to read emails" ON mailing_list
  FOR SELECT
  USING (true);
```

### Development

Run the development server:
```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Building for Production

Build the project:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## Deployment to Vercel

### Option 1: Via Vercel CLI

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy:
```bash
vercel
```

3. Add environment variables in Vercel dashboard:
   - Go to your project settings
   - Navigate to Environment Variables
   - Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`

### Option 2: Via GitHub Integration

1. Push your code to GitHub:
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin <your-github-repo-url>
git push -u origin main
```

2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Add environment variables:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
6. Click "Deploy"

### Environment Variables for Production

Make sure to add these in your Vercel project settings:
- `VITE_SUPABASE_URL` - Your Supabase project URL
- `VITE_SUPABASE_ANON_KEY` - Your Supabase anon/public key

## Features

- ✅ Mobile-first responsive design
- ✅ Beautiful marbled backgrounds
- ✅ Email validation with Zod
- ✅ Supabase integration for mailing list
- ✅ Success/error modals
- ✅ Social media links (Instagram, Facebook, Email)
- ✅ Contact information section
- ✅ Founder story section
- ✅ Fast loading with Vite

## Customization

### Updating Social Media Links

Edit the links in `src/App.tsx`:

```tsx
<a href="https://instagram.com/your-handle" ...>
<a href="https://facebook.com/your-page" ...>
```

### Changing Colors

Colors are defined in `tailwind.config.js`:

```js
colors: {
  'st-denis-burgundy': '#2B1621',
  'st-denis-cream': '#F5F1E8',
  'st-denis-teal': '#5CB9AD',
  'st-denis-gold': '#D4A574',
}
```

### Updating Content

All content is in `src/App.tsx`. Simply edit the text within the JSX.

## Project Structure

```
st-denis-website/
├── public/
│   └── images/          # All image assets
├── src/
│   ├── components/
│   │   ├── MailingListForm.tsx
│   │   └── Modal.tsx
│   ├── lib/
│   │   └── supabase.ts  # Supabase client
│   ├── App.tsx          # Main component
│   ├── main.tsx         # Entry point
│   └── index.css        # Global styles
├── .env.example         # Example environment variables
├── tailwind.config.js   # Tailwind configuration
└── package.json
```

## Support

For questions or issues, contact: baschwartzkopf@sbcglobal.net

## License

© 2025 St. Denis Wine, Books, and Wonders. All rights reserved.
