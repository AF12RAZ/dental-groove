-- Create app_role enum for role-based access
CREATE TYPE public.app_role AS ENUM ('admin', 'staff', 'dentist', 'patient');

-- Create appointment_status enum
CREATE TYPE public.appointment_status AS ENUM ('pending', 'approved', 'rejected', 'completed', 'cancelled', 'no_show');

-- Create payment_status enum
CREATE TYPE public.payment_status AS ENUM ('pending', 'partial', 'paid', 'refunded');

-- Create profiles table for user information
CREATE TABLE public.profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    date_of_birth DATE,
    gender TEXT,
    address TEXT,
    emergency_contact TEXT,
    emergency_phone TEXT,
    medical_history TEXT,
    allergies TEXT,
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Create user_roles table (separate from profiles for security)
CREATE TABLE public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL DEFAULT 'patient',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
    UNIQUE (user_id, role)
);

-- Create clinic_settings table
CREATE TABLE public.clinic_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    clinic_name TEXT NOT NULL DEFAULT 'Dental Clinic',
    dentist_name TEXT NOT NULL DEFAULT 'Dr. Insha Farheen',
    dentist_qualification TEXT DEFAULT 'BDS',
    address TEXT,
    phone TEXT,
    email TEXT,
    working_hours JSONB DEFAULT '{"monday": {"start": "09:00", "end": "18:00"}, "tuesday": {"start": "09:00", "end": "18:00"}, "wednesday": {"start": "09:00", "end": "18:00"}, "thursday": {"start": "09:00", "end": "18:00"}, "friday": {"start": "09:00", "end": "18:00"}, "saturday": {"start": "09:00", "end": "14:00"}, "sunday": null}',
    break_times JSONB DEFAULT '[{"start": "13:00", "end": "14:00"}]',
    slot_duration INTEGER DEFAULT 30,
    timezone TEXT DEFAULT 'Asia/Kolkata',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Create services table
CREATE TABLE public.services (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    description TEXT,
    duration INTEGER NOT NULL DEFAULT 30,
    price DECIMAL(10,2) NOT NULL DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Create appointments table
CREATE TABLE public.appointments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    patient_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    service_id UUID REFERENCES public.services(id) ON DELETE SET NULL,
    scheduled_date DATE NOT NULL,
    scheduled_time TIME NOT NULL,
    duration INTEGER NOT NULL DEFAULT 30,
    status appointment_status DEFAULT 'pending' NOT NULL,
    notes TEXT,
    chief_complaint TEXT,
    diagnosis TEXT,
    treatment TEXT,
    approved_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    approved_at TIMESTAMP WITH TIME ZONE,
    cancelled_reason TEXT,
    is_deleted BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Create suppliers table
CREATE TABLE public.suppliers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    contact_person TEXT,
    email TEXT,
    phone TEXT,
    address TEXT,
    notes TEXT,
    is_active BOOLEAN DEFAULT true,
    is_deleted BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Create inventory_categories table
CREATE TABLE public.inventory_categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Create inventory table
CREATE TABLE public.inventory (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    category_id UUID REFERENCES public.inventory_categories(id) ON DELETE SET NULL,
    name TEXT NOT NULL,
    description TEXT,
    sku TEXT,
    quantity INTEGER DEFAULT 0,
    min_quantity INTEGER DEFAULT 10,
    unit TEXT DEFAULT 'pcs',
    cost_price DECIMAL(10,2) DEFAULT 0,
    selling_price DECIMAL(10,2) DEFAULT 0,
    supplier_id UUID REFERENCES public.suppliers(id) ON DELETE SET NULL,
    expiry_date DATE,
    is_deleted BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Create purchases table
CREATE TABLE public.purchases (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    supplier_id UUID REFERENCES public.suppliers(id) ON DELETE SET NULL,
    purchase_date DATE NOT NULL DEFAULT CURRENT_DATE,
    total_amount DECIMAL(10,2) NOT NULL DEFAULT 0,
    payment_status payment_status DEFAULT 'pending',
    notes TEXT,
    invoice_number TEXT,
    created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    is_deleted BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Create purchase_items table
CREATE TABLE public.purchase_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    purchase_id UUID REFERENCES public.purchases(id) ON DELETE CASCADE NOT NULL,
    inventory_id UUID REFERENCES public.inventory(id) ON DELETE SET NULL,
    quantity INTEGER NOT NULL DEFAULT 1,
    unit_price DECIMAL(10,2) NOT NULL DEFAULT 0,
    total_price DECIMAL(10,2) NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Create payments table for patient payments
CREATE TABLE public.payments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    appointment_id UUID REFERENCES public.appointments(id) ON DELETE SET NULL,
    patient_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    amount DECIMAL(10,2) NOT NULL DEFAULT 0,
    payment_method TEXT DEFAULT 'cash',
    payment_date DATE NOT NULL DEFAULT CURRENT_DATE,
    notes TEXT,
    received_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    is_deleted BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Create audit_logs table
CREATE TABLE public.audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    action TEXT NOT NULL,
    table_name TEXT NOT NULL,
    record_id UUID,
    old_data JSONB,
    new_data JSONB,
    ip_address TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.clinic_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.suppliers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inventory_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inventory ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.purchases ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.purchase_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- Create security definer function for role checking
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
    SELECT EXISTS (
        SELECT 1
        FROM public.user_roles
        WHERE user_id = _user_id AND role = _role
    )
$$;

-- Create function to check if user is staff (admin, staff, or dentist)
CREATE OR REPLACE FUNCTION public.is_staff(_user_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
    SELECT EXISTS (
        SELECT 1
        FROM public.user_roles
        WHERE user_id = _user_id AND role IN ('admin', 'staff', 'dentist')
    )
$$;

-- Profiles policies
CREATE POLICY "Users can view own profile"
ON public.profiles FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Staff can view all profiles"
ON public.profiles FOR SELECT
USING (public.is_staff(auth.uid()));

CREATE POLICY "Users can update own profile"
ON public.profiles FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own profile"
ON public.profiles FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- User roles policies (only admin can manage roles)
CREATE POLICY "Users can view own roles"
ON public.user_roles FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all roles"
ON public.user_roles FOR SELECT
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage roles"
ON public.user_roles FOR ALL
USING (public.has_role(auth.uid(), 'admin'));

-- Clinic settings policies
CREATE POLICY "Anyone can view clinic settings"
ON public.clinic_settings FOR SELECT
USING (true);

CREATE POLICY "Admins can manage clinic settings"
ON public.clinic_settings FOR ALL
USING (public.has_role(auth.uid(), 'admin'));

-- Services policies
CREATE POLICY "Anyone can view active services"
ON public.services FOR SELECT
USING (is_active = true);

CREATE POLICY "Staff can view all services"
ON public.services FOR SELECT
USING (public.is_staff(auth.uid()));

CREATE POLICY "Admins can manage services"
ON public.services FOR ALL
USING (public.has_role(auth.uid(), 'admin'));

-- Appointments policies
CREATE POLICY "Patients can view own appointments"
ON public.appointments FOR SELECT
USING (patient_id = auth.uid() AND is_deleted = false);

CREATE POLICY "Staff can view all appointments"
ON public.appointments FOR SELECT
USING (public.is_staff(auth.uid()) AND is_deleted = false);

CREATE POLICY "Authenticated users can create appointments"
ON public.appointments FOR INSERT
WITH CHECK (auth.uid() = patient_id);

CREATE POLICY "Patients can update own pending appointments"
ON public.appointments FOR UPDATE
USING (patient_id = auth.uid() AND status = 'pending');

CREATE POLICY "Staff can update all appointments"
ON public.appointments FOR UPDATE
USING (public.is_staff(auth.uid()));

-- Suppliers policies
CREATE POLICY "Staff can view suppliers"
ON public.suppliers FOR SELECT
USING (public.is_staff(auth.uid()) AND is_deleted = false);

CREATE POLICY "Staff can manage suppliers"
ON public.suppliers FOR ALL
USING (public.is_staff(auth.uid()));

-- Inventory categories policies
CREATE POLICY "Staff can view inventory categories"
ON public.inventory_categories FOR SELECT
USING (public.is_staff(auth.uid()));

CREATE POLICY "Staff can manage inventory categories"
ON public.inventory_categories FOR ALL
USING (public.is_staff(auth.uid()));

-- Inventory policies
CREATE POLICY "Staff can view inventory"
ON public.inventory FOR SELECT
USING (public.is_staff(auth.uid()) AND is_deleted = false);

CREATE POLICY "Staff can manage inventory"
ON public.inventory FOR ALL
USING (public.is_staff(auth.uid()));

-- Purchases policies
CREATE POLICY "Staff can view purchases"
ON public.purchases FOR SELECT
USING (public.is_staff(auth.uid()) AND is_deleted = false);

CREATE POLICY "Staff can manage purchases"
ON public.purchases FOR ALL
USING (public.is_staff(auth.uid()));

-- Purchase items policies
CREATE POLICY "Staff can view purchase items"
ON public.purchase_items FOR SELECT
USING (public.is_staff(auth.uid()));

CREATE POLICY "Staff can manage purchase items"
ON public.purchase_items FOR ALL
USING (public.is_staff(auth.uid()));

-- Payments policies
CREATE POLICY "Patients can view own payments"
ON public.payments FOR SELECT
USING (patient_id = auth.uid() AND is_deleted = false);

CREATE POLICY "Staff can view all payments"
ON public.payments FOR SELECT
USING (public.is_staff(auth.uid()) AND is_deleted = false);

CREATE POLICY "Staff can manage payments"
ON public.payments FOR ALL
USING (public.is_staff(auth.uid()));

-- Audit logs policies (only admins can view)
CREATE POLICY "Admins can view audit logs"
ON public.audit_logs FOR SELECT
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "System can insert audit logs"
ON public.audit_logs FOR INSERT
WITH CHECK (true);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_clinic_settings_updated_at BEFORE UPDATE ON public.clinic_settings FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_services_updated_at BEFORE UPDATE ON public.services FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_appointments_updated_at BEFORE UPDATE ON public.appointments FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_suppliers_updated_at BEFORE UPDATE ON public.suppliers FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_inventory_updated_at BEFORE UPDATE ON public.inventory FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_purchases_updated_at BEFORE UPDATE ON public.purchases FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (user_id, full_name, email)
    VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email), NEW.email);
    
    INSERT INTO public.user_roles (user_id, role)
    VALUES (NEW.id, 'patient');
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user signup
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Insert default clinic settings
INSERT INTO public.clinic_settings (clinic_name, dentist_name, dentist_qualification, address, phone, email, working_hours)
VALUES (
    'Golden Groove', 
    'Dr. Insha Farheen', 
    'BDS',
    'Golden heights, phase -2, jana chaitanya colony, road no 21, attapur, hyderabad-500048',
    '7032688395',
    'info@goldengroove.com',
    '{"monday": {"start": "10:00", "end": "21:00"}, "tuesday": {"start": "10:00", "end": "21:00"}, "wednesday": {"start": "10:00", "end": "21:00"}, "thursday": {"start": "10:00", "end": "21:00"}, "friday": {"start": "10:00", "end": "21:00"}, "saturday": {"start": "10:00", "end": "21:00"}, "sunday": null}'
);

-- Insert default services
INSERT INTO public.services (name, description, duration, price) VALUES
('Root canal treatment', 'Endodontic therapy', 60, 0),
('Gums treatment (periodontics)', 'Treatment for gum diseases', 45, 0),
('Braces (orthodontics)', 'Teeth alignment treatment', 45, 0),
('Dentures', 'Artificial teeth replacement', 60, 0),
('Implants', 'Dental implants', 90, 0),
('Teeth Cleaning', 'Professional dental cleaning', 45, 0),
('Extractions (oral surgery)', 'Simple or surgical extractions', 45, 0),
('Teeth whitening', 'Professional teeth whitening', 60, 0),
('Child dental treatment (pedodontics)', 'Pediatric dental care', 45, 0),
('Smile Design', 'Cosmetic smile makeover', 60, 0),
('Crown & Bridges', 'Dental restorations', 60, 0);