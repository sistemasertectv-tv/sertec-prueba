import React from 'react';

export interface NavItem {
  label: string;
  path: string;
}

export interface ServiceItem {
  title: string;
  description: string;
  details?: string; // Extended description for the modal
  icon: React.ComponentType<any>;
  colorTheme?: string; // Identifier for the color theme (e.g., 'blue', 'red', 'orange')
}

export interface Project {
  id: number;
  src: string;
  alt: string;
  type?: 'image' | 'video';
}

export interface ProjectTestimonial {
  name: string;
  role?: string;
  content: string;
  rating: number;
}

export interface BlogPost {
  id: number;
  title: string;
  date: string;
  readTime: string;
  image?: string;
  excerpt: string;
  content?: string;
}

export interface Founder {
  name: string;
  role: string;
  image: string;
}