export interface Product {
  id: string;
  name: {
    en: string;
    zh: string;
  };
  description: {
    en: string;
    zh: string;
  };
  category: string;
  model: string;
  image: string;
  images: string[];
  specifications: {
    name: {
      en: string;
      zh: string;
    };
    value: string;
  }[];
  features: {
    en: string[];
    zh: string[];
  };
  applications: {
    en: string[];
    zh: string[];
  };
  pdfUrl?: string;
  hot: boolean;
}

export interface Category {
  id: string;
  name: {
    en: string;
    zh: string;
  };
  icon: string;
  image: string;
}

export interface Case {
  id: string;
  title: {
    en: string;
    zh: string;
  };
  description: {
    en: string;
    zh: string;
  };
  image: string;
  location: string;
  year: string;
}

export interface CompanyInfo {
  name: {
    en: string;
    zh: string;
  };
  address: {
    en: string;
    zh: string;
  };
  email: string;
  phone: string;
  whatsapp: string;
  logo: string;
}
