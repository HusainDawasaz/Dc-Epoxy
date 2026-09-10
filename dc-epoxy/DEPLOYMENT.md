# Deploying Your DC-EPOXY Website

Welcome! This guide will walk you through putting your new website live on the internet. We've broken it down into 5 simple steps. You don't need any coding experience to follow along!

## Step 1: Set up your Database (Supabase)
Supabase is where all your website's data (like contact forms and testimonials) will be stored.

1. Go to [supabase.com](https://supabase.com) and create a free account.
2. Click **New Project**, give it a name (like "DC-Epoxy"), and create a secure password.
3. Once your project is ready, look at the left sidebar and click on **SQL Editor**.
4. Copy all the text from the `supabase-schema.sql` file you received.
5. Paste it into the SQL Editor in Supabase and click the **Run** button. This creates all your database tables automatically!
6. Next, click the **Settings** (gear icon) in the bottom left, then click **API**.
7. Under "Project URL", copy the URL. Under "Project API keys", copy both the `anon` key and the `service_role` key. Save these somewhere safe, we'll need them in Step 3!
8. Finally, go to **Authentication** (lock icon) > **Users** > **Add User**. Create an admin user with your email and a password. You'll use this to log in to your website's admin panel.

## Step 2: Upload Your Code (GitHub)
GitHub is where we securely store your website's files.

1. Go to [github.com](https://github.com) and create a free account.
2. Click the `+` icon in the top right and select **New repository**.
3. Name it `dc-epoxy`. You can make it Private if you'd like. Click **Create repository**.
4. Click "uploading an existing file" on the next screen.
5. Drag and drop all the files and folders from your project into the browser.
6. Click **Commit changes** at the bottom.

## Step 3: Put Your Website Online (Vercel)
Vercel is the magical service that takes your code and turns it into a live website.

1. Go to [vercel.com](https://vercel.com) and sign up using your new GitHub account.
2. Click **Add New** > **Project**.
3. Find your `dc-epoxy` repository and click **Import**.
4. Now, before clicking Deploy, open the **Environment Variables** section. This connects your code to your database and email! Add these variables one by one:
   - Name: `VITE_SUPABASE_URL` | Value: (Paste your Supabase URL from Step 1)
   - Name: `VITE_SUPABASE_ANON_KEY` | Value: (Paste your Supabase anon key)
   - Name: `SUPABASE_SERVICE_KEY` | Value: (Paste your Supabase service_role key)
   - Name: `ADMIN_EMAIL` | Value: (Type your email address where you want to receive contact forms)
   - *Note: We will add `RESEND_API_KEY` in the next step!*
5. Click **Deploy**. Vercel will build your site. It usually takes less than a minute!

## Step 4: Set up Contact Form Emails (Resend)
Resend makes sure emails from your website's contact form actually reach your inbox.

1. Go to [resend.com](https://resend.com) and create a free account.
2. Go to **API Keys** and create a new key. Copy it.
3. Go back to your Vercel project, click **Settings** at the top, then **Environment Variables** on the left.
4. Add one more variable:
   - Name: `RESEND_API_KEY` | Value: (Paste the Resend key you just copied)
5. To send emails from your own domain (like noreply@dc-epoxy.com), you need to verify it in Resend. Go to **Domains** in Resend, click Add Domain, and type `dc-epoxy.com`. It will give you some "DNS records" to add in Step 5.

## Step 5: Connect Your Domain (GoDaddy)
This connects your live website to your custom address (`www.dc-epoxy.com`).

1. Log in to your GoDaddy account and find your domain (`dc-epoxy.com`).
2. Click on **DNS Management** (or "Manage DNS").
3. Delete any existing "A records" that might be pointing to a temporary page.
4. Add these two new records exactly as shown:
   - Type: **A** | Name: **@** | Value: **76.76.21.21**
   - Type: **CNAME** | Name: **www** | Value: **cname.vercel-dns.com**
5. *(Optional)* Add the DNS records that Resend gave you in Step 4 so your emails work smoothly!
6. Go back to Vercel, click **Settings**, then **Domains**. Type in `dc-epoxy.com` and add it.

**Congratulations!** 
It might take 24-48 hours for the internet to "update" (this is called DNS propagation), but soon your website will be live at `www.dc-epoxy.com`!
