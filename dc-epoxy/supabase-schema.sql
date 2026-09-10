-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Settings table (single row)
CREATE TABLE IF NOT EXISTS settings (
  id integer PRIMARY KEY DEFAULT 1,
  hero_heading text DEFAULT 'Transform Your Floor. Elevate Your Space.',
  hero_description text DEFAULT 'DC-EPOXY delivers precision-applied epoxy and resin floor systems for garages, showrooms, villas and industrial spaces across the UAE.',
  hero_image_url text DEFAULT '/images/dc-epoxy-hero.jpg',
  contact_email text DEFAULT 'info@dc-epoxy.com',
  instagram_url text DEFAULT 'https://www.instagram.com/dc_epoxy_/',
  seo_title text DEFAULT 'Epoxy Flooring Dubai & UAE | DC-EPOXY',
  seo_description text DEFAULT 'Premium epoxy flooring in Dubai, Abu Dhabi, Ajman and across the UAE. DC-EPOXY creates garage, metallic, flake, commercial and industrial floor systems.',
  updated_at timestamptz DEFAULT now()
);

-- Insert default settings row
INSERT INTO settings (id) VALUES (1) ON CONFLICT (id) DO NOTHING;

-- Services
CREATE TABLE IF NOT EXISTS services (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  title text NOT NULL,
  description text,
  image_url text,
  sort_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Projects / Gallery
CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  title text NOT NULL,
  location text,
  description text,
  image_url text,
  featured boolean DEFAULT false,
  sort_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Testimonials
CREATE TABLE IF NOT EXISTS testimonials (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  quote text NOT NULL,
  author_name text NOT NULL,
  author_location text,
  sort_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Process Steps
CREATE TABLE IF NOT EXISTS process_steps (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  step_number integer NOT NULL,
  title text NOT NULL,
  description text,
  sort_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Enquiries
CREATE TABLE IF NOT EXISTS enquiries (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  location text,
  area text,
  service_type text,
  message text,
  read boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Row Level Security (RLS)
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE process_steps ENABLE ROW LEVEL SECURITY;
ALTER TABLE enquiries ENABLE ROW LEVEL SECURITY;

-- Public read access for content tables
CREATE POLICY "Public read settings" ON settings FOR SELECT USING (true);
CREATE POLICY "Public read services" ON services FOR SELECT USING (true);
CREATE POLICY "Public read projects" ON projects FOR SELECT USING (true);
CREATE POLICY "Public read testimonials" ON testimonials FOR SELECT USING (true);
CREATE POLICY "Public read process_steps" ON process_steps FOR SELECT USING (true);

-- Authenticated users can do everything
CREATE POLICY "Auth full access settings" ON settings FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Auth full access services" ON services FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Auth full access projects" ON projects FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Auth full access testimonials" ON testimonials FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Auth full access process_steps" ON process_steps FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Auth full access enquiries" ON enquiries FOR ALL USING (auth.role() = 'authenticated');

-- Allow public insert for enquiries (contact form)
CREATE POLICY "Public insert enquiries" ON enquiries FOR INSERT WITH CHECK (true);

-- Sample seed data
INSERT INTO services (title, description, sort_order) VALUES
('Garage Epoxy', 'Durable, slip-resistant epoxy floor coatings for residential and commercial garages.', 1),
('Metallic Epoxy', 'Stunning 3D metallic effects with deep gloss finish for showrooms and luxury spaces.', 2),
('Flake Flooring', 'Decorative vinyl flake systems offering excellent durability and aesthetic appeal.', 3),
('Commercial Coating', 'Heavy-duty epoxy systems for offices, retail and commercial spaces.', 4),
('Industrial Flooring', 'Chemical-resistant, heavy-load epoxy solutions for warehouses and factories.', 5),
('Healthcare Flooring', 'Seamless, hygienic resin flooring for hospitals, clinics and laboratories.', 6);

INSERT INTO testimonials (quote, author_name, author_location, sort_order) VALUES
('DC-EPOXY transformed our garage completely. Professional team, excellent finish, and done in one day. Could not be happier.', 'Ahmed Al-Rashid', 'Dubai', 1),
('We used DC-EPOXY for our showroom and the metallic epoxy is absolutely stunning. Every visitor comments on the floor.', 'Sarah Mitchell', 'Abu Dhabi', 2),
('Very professional from start to finish. The site assessment was thorough and they explained every step. Highly recommend.', 'Ravi Kumar', 'Sharjah', 3);

INSERT INTO process_steps (step_number, title, description, sort_order) VALUES
(1, 'Initial Enquiry & Site Assessment', 'We visit your site, assess the existing floor condition, take measurements and discuss your requirements and expectations.', 1),
(2, 'Surface Preparation', 'Diamond grinding, crack repair and moisture testing ensure the substrate is perfect before any product is applied.', 2),
(3, 'Epoxy Application', 'Our certified applicators apply each coat with precision, following manufacturer specifications for mix ratios and cure times.', 3),
(4, 'Curing & Quality Check', 'We allow full cure time then conduct a detailed quality inspection before handover. Your floor is ready to perform.', 4);
