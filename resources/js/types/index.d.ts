import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    url: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}

export interface Users{
    id: number;
    name: string;
    email?: string;
    position?: string;
    departement?: string;
    address?: string;
    access?: string;
    password?: string;
    business_unit?: string;
    work_location?: string;
    phone?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
}
export interface ReceivedBy{
    id: number;
    name: string;
    email?: string;
    position?: string;
    departement?: string;
    address?: string;
    access?: string;
    password?: string;
    business_unit?: string;
    work_location?: string;
    phone?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
}

export interface Category {
    id: number;
    name: string;
    slug: string;
    description?: string;
}

export interface Asset {
    id: number;
    assets_code : string;
    name: string;
    brand: string;
    model: string;
    serial_number: string;
    processor: string;
    storage: string;
    ram: string;
    ukuran_layar: string;
    os: string;
    office: string;
    software: string;
    accessories: string;
    warranty: string;
    received_date: string;
    purchase_date: string;
    warranty_expiration: string;
    purchase_price: number;
    current_value: number;
    supplier: string;
    status: string;
    location: string;
    notes: string;
    image?: string;
    category_id: number;
    category: Category;
    user_id: number;
    user: User;
    created_at: string;
    updated_at: string;
}

export interface Assignments {
    id: number;
    asset_id: number;
    user_id: number;
    assignment_date : string;
    return_date: string;
    condition_note: string;
    received_by: number;
    status: string;
    document_url?: string;
    asset: string;
    assets_code: string;
    user: string;
    receivedBy: string;
    created_at: string;
    updated_at: string;
}

export interface print {
    id: number;
    asset_id: number;
    user_id: number;
    assignment_date : string;
    return_date: string;
    condition_note: string;
    received_by: Users;
    status: string;
    document_url?: string;
    asset: Asset;
    user: Users;
    receivedBy: Users;
    created_at: string;
    updated_at: string;
}
