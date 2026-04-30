"use client"

import React, { useMemo } from 'react';
import ReactECharts from 'echarts-for-react';

const rawData = [
  {
    "country": "BR",
    "industry": "Software Development",
    "count": 76
  },
  {
    "country": "BR",
    "industry": "Medical Equipment Manufacturing",
    "count": 2
  },
  {
    "country": "BR",
    "industry": "Manufacturing",
    "count": 5
  },
  {
    "country": "BR",
    "industry": "Food and Beverage Services and IT Services and IT Consulting",
    "count": 1
  },
  {
    "country": "BR",
    "industry": "IT Services and IT Consulting and IT System Data Services",
    "count": 1
  },
  {
    "country": "BR",
    "industry": "Manufacturing, Food and Beverage Services, and IT Services and IT Consulting",
    "count": 1
  },
  {
    "country": "BR",
    "industry": "Food and Beverage Services",
    "count": 4
  },
  {
    "country": "BR",
    "industry": "Retail e E-Commerce",
    "count": 17
  },
  {
    "country": "BR",
    "industry": "Gambling Facilities and Casinos",
    "count": 1
  },
  {
    "country": "BR",
    "industry": "Servicios IT / Consultor\u00eda",
    "count": 161
  },
  {
    "country": "BR",
    "industry": "Servicios Financieros (Fintech/Banca)",
    "count": 81
  },
  {
    "country": "BR",
    "industry": "Business Consulting and Services",
    "count": 7
  },
  {
    "country": "BR",
    "industry": "Software Development and Rail Transportation",
    "count": 1
  },
  {
    "country": "BR",
    "industry": "Servicios Financieros (Fintech/Banca)",
    "count": 34
  },
  {
    "country": "BR",
    "industry": "Tecnolog\u00eda e Internet",
    "count": 21
  },
  {
    "country": "BR",
    "industry": "Internet Publishing",
    "count": 4
  },
  {
    "country": "BR",
    "industry": "Technology, Information and Media",
    "count": 7
  },
  {
    "country": "BR",
    "industry": "Primary and Secondary Education",
    "count": 1
  },
  {
    "country": "BR",
    "industry": "Consumer Services",
    "count": 5
  },
  {
    "country": "BR",
    "industry": "Education Administration Programs",
    "count": 11
  },
  {
    "country": "BR",
    "industry": "Computer and Network Security",
    "count": 10
  },
  {
    "country": "BR",
    "industry": "Plastics Manufacturing",
    "count": 1
  },
  {
    "country": "BR",
    "industry": "Transportation, Logistics, Supply Chain and Storage",
    "count": 3
  },
  {
    "country": "BR",
    "industry": "Advertising Services",
    "count": 3
  },
  {
    "country": "BR",
    "industry": "Retail Apparel and Fashion",
    "count": 2
  },
  {
    "country": "BR",
    "industry": "Food and Beverage Manufacturing",
    "count": 2
  },
  {
    "country": "BR",
    "industry": "Information Services",
    "count": 4
  },
  {
    "country": "BR",
    "industry": "Security and Investigations",
    "count": 3
  },
  {
    "country": "BR",
    "industry": "Telecommunications",
    "count": 2
  },
  {
    "country": "BR",
    "industry": "Human Resources Services",
    "count": 7
  },
  {
    "country": "BR",
    "industry": "Medical and Diagnostic Laboratories",
    "count": 1
  },
  {
    "country": "BR",
    "industry": "Wholesale Food and Beverage",
    "count": 1
  },
  {
    "country": "BR",
    "industry": "Wholesale",
    "count": 1
  },
  {
    "country": "BR",
    "industry": "Software Development and IT Services and IT Consulting",
    "count": 2
  },
  {
    "country": "BR",
    "industry": "Banking and Investment Banking",
    "count": 1
  },
  {
    "country": "BR",
    "industry": "Financial Services, Banking, and Investment Banking",
    "count": 1
  },
  {
    "country": "BR",
    "industry": "E-learning",
    "count": 1
  },
  {
    "country": "BR",
    "industry": "Computer Games",
    "count": 2
  },
  {
    "country": "BR",
    "industry": "Retail e E-Commerce",
    "count": 11
  },
  {
    "country": "BR",
    "industry": "Retail Pharmacies",
    "count": 2
  },
  {
    "country": "BR",
    "industry": "Spectator Sports",
    "count": 1
  },
  {
    "country": "BR",
    "industry": "Information Technology & Services",
    "count": 7
  },
  {
    "country": "BR",
    "industry": "Software Development and Oil, Gas, and Mining",
    "count": 1
  },
  {
    "country": "BR",
    "industry": "Airlines and Aviation",
    "count": 2
  },
  {
    "country": "BR",
    "industry": "Personal Care Product Manufacturing",
    "count": 4
  },
  {
    "country": "BR",
    "industry": "Retail, Retail Apparel and Fashion, and IT Services and IT Consulting",
    "count": 2
  },
  {
    "country": "BR",
    "industry": "Retail and IT Services and IT Consulting",
    "count": 2
  },
  {
    "country": "BR",
    "industry": "Apparel & Fashion",
    "count": 1
  },
  {
    "country": "BR",
    "industry": "Wholesale Import and Export",
    "count": 1
  },
  {
    "country": "BR",
    "industry": "Vehicle Repair and Maintenance",
    "count": 1
  },
  {
    "country": "BR",
    "industry": "Civil Engineering",
    "count": 1
  },
  {
    "country": "BR",
    "industry": "IT Services and IT Consulting and Insurance",
    "count": 1
  },
  {
    "country": "BR",
    "industry": "Human Resources",
    "count": 1
  },
  {
    "country": "BR",
    "industry": "Insurance",
    "count": 6
  },
  {
    "country": "BR",
    "industry": "Public Relations and Communications Services",
    "count": 1
  },
  {
    "country": "BR",
    "industry": "Engineering Services",
    "count": 1
  },
  {
    "country": "BR",
    "industry": "Hospitality, Food and Beverage Services, and Retail",
    "count": 1
  },
  {
    "country": "BR",
    "industry": "International Trade and Development",
    "count": 1
  },
  {
    "country": "BR",
    "industry": "Construction",
    "count": 1
  },
  {
    "country": "BR",
    "industry": "Holding Companies",
    "count": 1
  },
  {
    "country": "BR",
    "industry": "Real Estate, Financial Services, and Capital Markets",
    "count": 1
  },
  {
    "country": "BR",
    "industry": "Rail Transportation",
    "count": 1
  },
  {
    "country": "BR",
    "industry": "IT System Training and Support",
    "count": 1
  },
  {
    "country": "BR",
    "industry": "Entertainment Providers",
    "count": 4
  },
  {
    "country": "BR",
    "industry": "IT System Testing and Evaluation",
    "count": 1
  },
  {
    "country": "BR",
    "industry": "IT Services and IT Consulting and Software Development",
    "count": 2
  },
  {
    "country": "BR",
    "industry": "Technology, Information and Internet, IT Services and IT Consulting, and IT System Data Services",
    "count": 1
  },
  {
    "country": "BR",
    "industry": "Software Development and Investment Banking",
    "count": 1
  },
  {
    "country": "BR",
    "industry": "Staffing and Recruiting",
    "count": 1
  },
  {
    "country": "BR",
    "industry": "Financial Services and IT Services and IT Consulting",
    "count": 1
  },
  {
    "country": "BR",
    "industry": "Machinery Manufacturing",
    "count": 1
  },
  {
    "country": "BR",
    "industry": "Retail Gasoline",
    "count": 2
  },
  {
    "country": "BR",
    "industry": "Mobile Gaming Apps",
    "count": 1
  },
  {
    "country": "BR",
    "industry": "Higher Education",
    "count": 2
  },
  {
    "country": "BR",
    "industry": "Health and Human Services",
    "count": 1
  },
  {
    "country": "BR",
    "industry": "Mining, Industrial Machinery Manufacturing, and Automation Machinery Manufacturing",
    "count": 1
  },
  {
    "country": "BR",
    "industry": "Business Consulting and Services, IT Services and IT Consulting, and Professional Training and Coaching",
    "count": 3
  },
  {
    "country": "BR",
    "industry": "Appliances, Electrical, and Electronics Manufacturing",
    "count": 2
  },
  {
    "country": "BR",
    "industry": "Construction, Software Development, and IT Services and IT Consulting",
    "count": 1
  },
  {
    "country": "BR",
    "industry": "Medical Equipment Manufacturing, Pharmaceutical Manufacturing, and Research Services",
    "count": 1
  },
  {
    "country": "BR",
    "industry": "Software Development, Financial Services, and Computer and Network Security",
    "count": 1
  },
  {
    "country": "BR",
    "industry": "Software Development, IT Services and IT Consulting, and Business Consulting and Services",
    "count": 5
  },
  {
    "country": "BR",
    "industry": "Automation Machinery Manufacturing, Industrial Machinery Manufacturing, and Machinery Manufacturing",
    "count": 2
  },
  {
    "country": "BR",
    "industry": "Technology, Information and Internet, Software Development, and E-Learning Providers",
    "count": 3
  },
  {
    "country": "BR",
    "industry": "Hospitals and Health Care",
    "count": 3
  },
  {
    "country": "BR",
    "industry": "Musicians",
    "count": 1
  },
  {
    "country": "BR",
    "industry": "Financial Services, Banking, and Investment Management",
    "count": 1
  },
  {
    "country": "BR",
    "industry": "Computer Games and Entertainment Providers",
    "count": 1
  },
  {
    "country": "BR",
    "industry": "Internet Marketplace Platforms and Technology, Information and Internet",
    "count": 13
  },
  {
    "country": "BR",
    "industry": "Professional Services",
    "count": 1
  },
  {
    "country": "BR",
    "industry": "Machinery Manufacturing and Farming",
    "count": 1
  },
  {
    "country": "BR",
    "industry": "Oil and Gas",
    "count": 1
  },
  {
    "country": "BR",
    "industry": "Renewable Energy Power Generation",
    "count": 1
  },
  {
    "country": "BR",
    "industry": "Biotechnology Research",
    "count": 2
  },
  {
    "country": "BR",
    "industry": "Wireless Services, Telecommunications, and Communications Equipment Manufacturing",
    "count": 1
  },
  {
    "country": "BR",
    "industry": "Education Administration Programs, E-Learning Providers, and IT Services and IT Consulting",
    "count": 1
  },
  {
    "country": "BR",
    "industry": "Education",
    "count": 1
  },
  {
    "country": "BR",
    "industry": "Marketing Services",
    "count": 1
  },
  {
    "country": "BR",
    "industry": "Pharmaceutical Manufacturing",
    "count": 1
  },
  {
    "country": "BR",
    "industry": "Servicios Financieros (Fintech/Banca)",
    "count": 5
  },
  {
    "country": "BR",
    "industry": "Food and Beverage Manufacturing, Food and Beverage Services, and Manufacturing",
    "count": 1
  },
  {
    "country": "BR",
    "industry": "Computer and Network Security, Software Development, and Telecommunications",
    "count": 1
  },
  {
    "country": "BR",
    "industry": "Solar Electric Power Generation",
    "count": 2
  },
  {
    "country": "BR",
    "industry": "Computers and Electronics Manufacturing",
    "count": 1
  },
  {
    "country": "BR",
    "industry": "Utilities and Technology, Information and Internet",
    "count": 1
  },
  {
    "country": "BR",
    "industry": "Software Development and Real Estate",
    "count": 1
  },
  {
    "country": "BR",
    "industry": "Legal Services",
    "count": 1
  },
  {
    "country": "BR",
    "industry": "Financial Services, Information Services, and IT Services and IT Consulting",
    "count": 1
  },
  {
    "country": "BR",
    "industry": "Non-profit Organizations",
    "count": 1
  },
  {
    "country": "BR",
    "industry": "Wellness and Fitness Services",
    "count": 2
  },
  {
    "country": "BR",
    "industry": "Truck Transportation",
    "count": 1
  },
  {
    "country": "CL",
    "industry": "Software Development",
    "count": 10
  },
  {
    "country": "CL",
    "industry": "Servicios IT / Consultor\u00eda",
    "count": 10
  },
  {
    "country": "CL",
    "industry": "Retail e E-Commerce",
    "count": 1
  },
  {
    "country": "CL",
    "industry": "Manufacturing",
    "count": 1
  },
  {
    "country": "CL",
    "industry": "Technology, Information and Media",
    "count": 4
  },
  {
    "country": "CL",
    "industry": "Retail Pharmacies",
    "count": 1
  },
  {
    "country": "CL",
    "industry": "Servicios Financieros (Fintech/Banca)",
    "count": 15
  },
  {
    "country": "CL",
    "industry": "Transportation, Logistics, Supply Chain and Storage",
    "count": 1
  },
  {
    "country": "CL",
    "industry": "Business Consulting and Services",
    "count": 2
  },
  {
    "country": "CL",
    "industry": "Internet Publishing",
    "count": 1
  },
  {
    "country": "CL",
    "industry": "Servicios Financieros (Fintech/Banca)",
    "count": 20
  },
  {
    "country": "CL",
    "industry": "Business Consulting and Services, IT Services and IT Consulting, and Professional Training and Coaching",
    "count": 2
  },
  {
    "country": "CL",
    "industry": "Oil and Gas",
    "count": 3
  },
  {
    "country": "CL",
    "industry": "Technology, Information and Internet and Information Technology & Services",
    "count": 12
  },
  {
    "country": "CL",
    "industry": "Human Resources Services",
    "count": 11
  },
  {
    "country": "CL",
    "industry": "Health and Human Services and Retail",
    "count": 1
  },
  {
    "country": "CL",
    "industry": "Consumer Services",
    "count": 8
  },
  {
    "country": "CL",
    "industry": "Insurance",
    "count": 3
  },
  {
    "country": "CL",
    "industry": "Information Technology & Services",
    "count": 2
  },
  {
    "country": "CL",
    "industry": "Telecommunications",
    "count": 6
  },
  {
    "country": "CL",
    "industry": "IT Services and IT Consulting and Business Consulting and Services",
    "count": 1
  },
  {
    "country": "CL",
    "industry": "Financial Services and Insurance",
    "count": 2
  },
  {
    "country": "CL",
    "industry": "Banking, Investment Banking, and Financial Services",
    "count": 1
  },
  {
    "country": "CL",
    "industry": "Services for Renewable Energy",
    "count": 3
  },
  {
    "country": "CL",
    "industry": "Tecnolog\u00eda e Internet",
    "count": 1
  },
  {
    "country": "CL",
    "industry": "Retail e E-Commerce",
    "count": 14
  },
  {
    "country": "CL",
    "industry": "Wholesale Drugs and Sundries",
    "count": 1
  },
  {
    "country": "CL",
    "industry": "Information Services",
    "count": 1
  },
  {
    "country": "CL",
    "industry": "Insurance and Financial Services",
    "count": 2
  },
  {
    "country": "CL",
    "industry": "Sporting Goods Manufacturing",
    "count": 1
  },
  {
    "country": "CL",
    "industry": "Motor Vehicle Manufacturing",
    "count": 3
  },
  {
    "country": "CL",
    "industry": "IT Services and IT Consulting, Financial Services, and Retail",
    "count": 1
  },
  {
    "country": "CL",
    "industry": "Solar Electric Power Generation",
    "count": 1
  },
  {
    "country": "CL",
    "industry": "Consumer Goods",
    "count": 1
  },
  {
    "country": "CL",
    "industry": "Retail Groceries",
    "count": 1
  },
  {
    "country": "CL",
    "industry": "Biotechnology",
    "count": 1
  },
  {
    "country": "CL",
    "industry": "Beverage Manufacturing",
    "count": 1
  },
  {
    "country": "CL",
    "industry": "Medical Equipment Manufacturing, Hospitals and Health Care, and Biotechnology Research",
    "count": 1
  },
  {
    "country": "CL",
    "industry": "Automation Machinery Manufacturing, Industrial Machinery Manufacturing, and Machinery Manufacturing",
    "count": 1
  },
  {
    "country": "CL",
    "industry": "Appliances, Electrical, and Electronics Manufacturing",
    "count": 1
  },
  {
    "country": "CL",
    "industry": "Food and Beverage Retail",
    "count": 1
  },
  {
    "country": "CL",
    "industry": "Human Resources Services and Technology, Information and Media",
    "count": 8
  },
  {
    "country": "CL",
    "industry": "Technology, Information and Media and Human Resources Services",
    "count": 1
  },
  {
    "country": "CL",
    "industry": "Biotechnology Research, Pharmaceutical Manufacturing, and Veterinary Services",
    "count": 1
  },
  {
    "country": "CL",
    "industry": "Pharmaceutical Manufacturing",
    "count": 2
  },
  {
    "country": "CL",
    "industry": "Restaurants",
    "count": 1
  },
  {
    "country": "CL",
    "industry": "Automation Machinery Manufacturing",
    "count": 1
  },
  {
    "country": "CL",
    "industry": "Software Development, IT Services and IT Consulting, and Events Services",
    "count": 2
  },
  {
    "country": "CL",
    "industry": "IT Services and IT Consulting, Telecommunications, and Digital Accessibility Services",
    "count": 1
  },
  {
    "country": "CL",
    "industry": "Textile Manufacturing",
    "count": 6
  },
  {
    "country": "CL",
    "industry": "Retail Motor Vehicles",
    "count": 1
  },
  {
    "country": "CL",
    "industry": "Biotechnology Research and Software Development",
    "count": 1
  },
  {
    "country": "CL",
    "industry": "Retail Apparel and Fashion",
    "count": 1
  },
  {
    "country": "CL",
    "industry": "Legal Services",
    "count": 1
  },
  {
    "country": "CL",
    "industry": "Financial Services, Information Services, and IT Services and IT Consulting",
    "count": 1
  },
  {
    "country": "CO",
    "industry": "Retail e E-Commerce",
    "count": 1
  },
  {
    "country": "CO",
    "industry": "Software Development",
    "count": 15
  },
  {
    "country": "CO",
    "industry": "Technology, Information and Media and Real Estate",
    "count": 1
  },
  {
    "country": "CO",
    "industry": "Pharmaceutical Manufacturing",
    "count": 6
  },
  {
    "country": "CO",
    "industry": "Pharmaceutical Manufacturing and Wholesale Drugs and Sundries",
    "count": 1
  },
  {
    "country": "CO",
    "industry": "IT System Data Services",
    "count": 1
  },
  {
    "country": "CO",
    "industry": "Transportation, Logistics, Supply Chain and Storage",
    "count": 2
  },
  {
    "country": "CO",
    "industry": "Business Consulting and Services",
    "count": 5
  },
  {
    "country": "CO",
    "industry": "Software Development and IT Services and IT Consulting",
    "count": 1
  },
  {
    "country": "CO",
    "industry": "Internet Publishing",
    "count": 3
  },
  {
    "country": "CO",
    "industry": "Servicios Financieros (Fintech/Banca)",
    "count": 7
  },
  {
    "country": "CO",
    "industry": "Business Consulting and Services, IT Services and IT Consulting, and Professional Training and Coaching",
    "count": 1
  },
  {
    "country": "CO",
    "industry": "Servicios IT / Consultor\u00eda",
    "count": 55
  },
  {
    "country": "CO",
    "industry": "Retail e E-Commerce",
    "count": 3
  },
  {
    "country": "CO",
    "industry": "Technology, Information and Internet and Information Technology & Services",
    "count": 1
  },
  {
    "country": "CO",
    "industry": "Servicios Financieros (Fintech/Banca)",
    "count": 21
  },
  {
    "country": "CO",
    "industry": "Wireless Services",
    "count": 1
  },
  {
    "country": "CO",
    "industry": "IT System Custom Software Development",
    "count": 1
  },
  {
    "country": "CO",
    "industry": "Hospitals and Health Care",
    "count": 3
  },
  {
    "country": "CO",
    "industry": "Climate Data and Analytics and Construction",
    "count": 1
  },
  {
    "country": "CO",
    "industry": "Tecnolog\u00eda e Internet",
    "count": 11
  },
  {
    "country": "CO",
    "industry": "Information Technology & Services",
    "count": 1
  },
  {
    "country": "CO",
    "industry": "Appliances, Electrical, and Electronics Manufacturing, Computers and Electronics Manufacturing, and Wholesale",
    "count": 1
  },
  {
    "country": "CO",
    "industry": "Staffing and Recruiting",
    "count": 1
  },
  {
    "country": "CO",
    "industry": "Professional Services",
    "count": 2
  },
  {
    "country": "CO",
    "industry": "Manufacturing, Retail, and Sporting Goods Manufacturing",
    "count": 1
  },
  {
    "country": "CO",
    "industry": "Wholesale",
    "count": 1
  },
  {
    "country": "CO",
    "industry": "Manufacturing and Personal Care Product Manufacturing",
    "count": 1
  },
  {
    "country": "CO",
    "industry": "Information Services, Outsourcing and Offshoring Consulting, and IT System Custom Software Development",
    "count": 1
  },
  {
    "country": "CO",
    "industry": "Outsourcing and Offshoring Consulting",
    "count": 1
  },
  {
    "country": "CO",
    "industry": "Gambling Facilities and Casinos",
    "count": 1
  },
  {
    "country": "CO",
    "industry": "Mining",
    "count": 1
  },
  {
    "country": "CO",
    "industry": "Primary Metal Manufacturing",
    "count": 1
  },
  {
    "country": "CO",
    "industry": "Medical Equipment Manufacturing, Biotechnology Research, and Hospitals and Health Care",
    "count": 1
  },
  {
    "country": "CO",
    "industry": "Advertising Services",
    "count": 5
  },
  {
    "country": "CO",
    "industry": "Outsourcing/Offshoring",
    "count": 1
  },
  {
    "country": "CO",
    "industry": "Outsourcing/Offshoring, Engineering Services, and IT Services and IT Consulting",
    "count": 1
  },
  {
    "country": "CO",
    "industry": "Manufacturing",
    "count": 1
  },
  {
    "country": "CO",
    "industry": "Medical Equipment Manufacturing",
    "count": 1
  },
  {
    "country": "CO",
    "industry": "Financial Services and Hospitals and Health Care",
    "count": 1
  },
  {
    "country": "CO",
    "industry": "Motor Vehicle Manufacturing",
    "count": 1
  },
  {
    "country": "CO",
    "industry": "Software Development, IT Services and IT Consulting, and Events Services",
    "count": 2
  },
  {
    "country": "CO",
    "industry": "Technology, Information and Media and Funds and Trusts",
    "count": 1
  },
  {
    "country": "CO",
    "industry": "Technology, Information and Media",
    "count": 2
  },
  {
    "country": "CO",
    "industry": "Financial Services and Technology, Information and Media",
    "count": 1
  },
  {
    "country": "CO",
    "industry": "Telecommunications",
    "count": 2
  },
  {
    "country": "CO",
    "industry": "Servicios Financieros (Fintech/Banca)",
    "count": 10
  },
  {
    "country": "CO",
    "industry": "Entertainment Providers",
    "count": 1
  },
  {
    "country": "CO",
    "industry": "Market Research",
    "count": 4
  },
  {
    "country": "CO",
    "industry": "Oil and Gas",
    "count": 1
  },
  {
    "country": "CO",
    "industry": "Software Development, Technology, Information and Media, and Personal Care Product Manufacturing",
    "count": 1
  },
  {
    "country": "CO",
    "industry": "Financial Services, Capital Markets, and Securities and Commodity Exchanges",
    "count": 1
  },
  {
    "country": "CO",
    "industry": "Construction Hardware Manufacturing",
    "count": 1
  },
  {
    "country": "CO",
    "industry": "Marketing Services",
    "count": 1
  },
  {
    "country": "CO",
    "industry": "Professional Services, IT Services and IT Consulting, and Design Services",
    "count": 1
  },
  {
    "country": "CO",
    "industry": "Legal Services",
    "count": 1
  },
  {
    "country": "CO",
    "industry": "Translation and Localization",
    "count": 1
  },
  {
    "country": "CO",
    "industry": "Financial Services, Information Services, and IT Services and IT Consulting",
    "count": 3
  },
  {
    "country": "CO",
    "industry": "Embedded Software Products",
    "count": 1
  },
  {
    "country": "MX",
    "industry": "Software Development",
    "count": 44
  },
  {
    "country": "MX",
    "industry": "Servicios IT / Consultor\u00eda",
    "count": 85
  },
  {
    "country": "MX",
    "industry": "Motor Vehicle Manufacturing",
    "count": 2
  },
  {
    "country": "MX",
    "industry": "Manufacturing",
    "count": 5
  },
  {
    "country": "MX",
    "industry": "Retail e E-Commerce",
    "count": 2
  },
  {
    "country": "MX",
    "industry": "Servicios Financieros (Fintech/Banca)",
    "count": 50
  },
  {
    "country": "MX",
    "industry": "Transportation, Logistics, Supply Chain and Storage",
    "count": 4
  },
  {
    "country": "MX",
    "industry": "Renewable Energy Semiconductor Manufacturing",
    "count": 3
  },
  {
    "country": "MX",
    "industry": "Professional Services",
    "count": 3
  },
  {
    "country": "MX",
    "industry": "Internet Publishing",
    "count": 1
  },
  {
    "country": "MX",
    "industry": "Business Consulting and Services, IT Services and IT Consulting, and Professional Training and Coaching",
    "count": 1
  },
  {
    "country": "MX",
    "industry": "Automation Machinery Manufacturing",
    "count": 10
  },
  {
    "country": "MX",
    "industry": "Medical Equipment Manufacturing",
    "count": 4
  },
  {
    "country": "MX",
    "industry": "Consumer Goods",
    "count": 1
  },
  {
    "country": "MX",
    "industry": "Technology, Information and Internet and IT Services and IT Consulting",
    "count": 1
  },
  {
    "country": "MX",
    "industry": "Technology, Information and Media, Information Services, and Software Development",
    "count": 1
  },
  {
    "country": "MX",
    "industry": "Environmental Services",
    "count": 4
  },
  {
    "country": "MX",
    "industry": "Software Development, Financial Services, and Computer and Network Security",
    "count": 1
  },
  {
    "country": "MX",
    "industry": "Chemical Manufacturing, Pharmaceutical Manufacturing, and Biotechnology Research",
    "count": 1
  },
  {
    "country": "MX",
    "industry": "Semiconductor Manufacturing, Appliances, Electrical, and Electronics Manufacturing, and Computer Hardware Manufacturing",
    "count": 1
  },
  {
    "country": "MX",
    "industry": "Industrial Machinery Manufacturing",
    "count": 4
  },
  {
    "country": "MX",
    "industry": "Machinery Manufacturing",
    "count": 1
  },
  {
    "country": "MX",
    "industry": "Business Consulting and Services",
    "count": 11
  },
  {
    "country": "MX",
    "industry": "Business Consulting and Services, Financial Services, and Insurance",
    "count": 1
  },
  {
    "country": "MX",
    "industry": "Appliances, Electrical, and Electronics Manufacturing",
    "count": 6
  },
  {
    "country": "MX",
    "industry": "Pharmaceutical Manufacturing",
    "count": 10
  },
  {
    "country": "MX",
    "industry": "Manufacturing and Personal Care Product Manufacturing",
    "count": 2
  },
  {
    "country": "MX",
    "industry": "Motor Vehicle Parts Manufacturing",
    "count": 3
  },
  {
    "country": "MX",
    "industry": "Farming",
    "count": 1
  },
  {
    "country": "MX",
    "industry": "Gambling Facilities and Casinos",
    "count": 2
  },
  {
    "country": "MX",
    "industry": "Insurance",
    "count": 1
  },
  {
    "country": "MX",
    "industry": "Tecnolog\u00eda e Internet",
    "count": 21
  },
  {
    "country": "MX",
    "industry": "Banking, Financial Services, and Investment Banking",
    "count": 2
  },
  {
    "country": "MX",
    "industry": "Financial Services and Banking",
    "count": 3
  },
  {
    "country": "MX",
    "industry": "Automotive",
    "count": 3
  },
  {
    "country": "MX",
    "industry": "Mechanical Or Industrial Engineering",
    "count": 2
  },
  {
    "country": "MX",
    "industry": "Wholesale Building Materials",
    "count": 3
  },
  {
    "country": "MX",
    "industry": "Retail e E-Commerce",
    "count": 10
  },
  {
    "country": "MX",
    "industry": "Chemical Manufacturing",
    "count": 3
  },
  {
    "country": "MX",
    "industry": "Animation and Post-production",
    "count": 1
  },
  {
    "country": "MX",
    "industry": "Tobacco Manufacturing",
    "count": 1
  },
  {
    "country": "MX",
    "industry": "Recreational Facilities",
    "count": 1
  },
  {
    "country": "MX",
    "industry": "Staffing and Recruiting",
    "count": 2
  },
  {
    "country": "MX",
    "industry": "Investment Banking",
    "count": 1
  },
  {
    "country": "MX",
    "industry": "Telecommunications",
    "count": 1
  },
  {
    "country": "MX",
    "industry": "Food and Beverage Services, Retail Health and Personal Care Products, and Personal Care Product Manufacturing",
    "count": 1
  },
  {
    "country": "MX",
    "industry": "Oil and Gas",
    "count": 2
  },
  {
    "country": "MX",
    "industry": "Servicios Financieros (Fintech/Banca)",
    "count": 3
  },
  {
    "country": "MX",
    "industry": "Technology, Information and Internet and Information Technology & Services",
    "count": 1
  },
  {
    "country": "MX",
    "industry": "Wellness and Fitness Services",
    "count": 2
  },
  {
    "country": "MX",
    "industry": "Professional Training and Coaching",
    "count": 1
  },
  {
    "country": "MX",
    "industry": "Food and Beverage Manufacturing",
    "count": 3
  },
  {
    "country": "MX",
    "industry": "Airlines and Aviation",
    "count": 6
  },
  {
    "country": "MX",
    "industry": "Technology, Information and Media",
    "count": 2
  },
  {
    "country": "MX",
    "industry": "Wholesale",
    "count": 2
  },
  {
    "country": "MX",
    "industry": "Wholesale and Telecommunications",
    "count": 1
  },
  {
    "country": "MX",
    "industry": "Semiconductor Manufacturing, Computers and Electronics Manufacturing, and Software Development",
    "count": 1
  },
  {
    "country": "MX",
    "industry": "Business Consulting and Services and Retail",
    "count": 1
  },
  {
    "country": "MX",
    "industry": "Musicians",
    "count": 1
  },
  {
    "country": "MX",
    "industry": "Entertainment Providers",
    "count": 6
  },
  {
    "country": "MX",
    "industry": "Research Services",
    "count": 1
  },
  {
    "country": "MX",
    "industry": "Hospitality",
    "count": 1
  },
  {
    "country": "MX",
    "industry": "Spectator Sports",
    "count": 2
  },
  {
    "country": "MX",
    "industry": "Information Services",
    "count": 2
  },
  {
    "country": "MX",
    "industry": "Pharmaceutical Manufacturing, Retail Pharmacies, and Biotechnology Research",
    "count": 1
  },
  {
    "country": "MX",
    "industry": "IT Services and IT Consulting, Technology, Information and Internet, and Computer and Network Security",
    "count": 2
  },
  {
    "country": "MX",
    "industry": "Banking and Financial Services",
    "count": 1
  },
  {
    "country": "MX",
    "industry": "Pharmaceutical Manufacturing and Medical Equipment Manufacturing",
    "count": 1
  },
  {
    "country": "MX",
    "industry": "Food and Beverage Services",
    "count": 2
  },
  {
    "country": "MX",
    "industry": "IT Services and IT Consulting, Higher Education, and Software Development",
    "count": 1
  },
  {
    "country": "MX",
    "industry": "Non-profit Organizations",
    "count": 1
  },
  {
    "country": "MX",
    "industry": "Software Development, IT Services and IT Consulting, and Financial Services",
    "count": 3
  },
  {
    "country": "MX",
    "industry": "Software Development, IT Services and IT Consulting, and Events Services",
    "count": 2
  },
  {
    "country": "MX",
    "industry": "Financial Services and Software Development",
    "count": 2
  },
  {
    "country": "MX",
    "industry": "Computer Networking Products, Software Development, and IT Services and IT Consulting",
    "count": 1
  },
  {
    "country": "MX",
    "industry": "Information Services and Technology, Information and Internet",
    "count": 1
  },
  {
    "country": "MX",
    "industry": "Manufacturing and Wholesale",
    "count": 1
  },
  {
    "country": "MX",
    "industry": "Manufacturing, IT Services and IT Consulting, and Wireless Services",
    "count": 1
  },
  {
    "country": "MX",
    "industry": "Ground Passenger Transportation",
    "count": 1
  },
  {
    "country": "MX",
    "industry": "Financial Services, Software Development, and IT Services and IT Consulting",
    "count": 1
  },
  {
    "country": "MX",
    "industry": "Retail Apparel and Fashion, Design Services, and Retail",
    "count": 1
  },
  {
    "country": "MX",
    "industry": "Computers and Electronics Manufacturing",
    "count": 1
  },
  {
    "country": "MX",
    "industry": "Insurance and Business Consulting and Services",
    "count": 1
  },
  {
    "country": "MX",
    "industry": "Servicios Financieros (Fintech/Banca)",
    "count": 10
  },
  {
    "country": "MX",
    "industry": "Information Services and IT Services and IT Consulting",
    "count": 2
  },
  {
    "country": "MX",
    "industry": "Technology, Information and Media and Financial Services",
    "count": 1
  },
  {
    "country": "MX",
    "industry": "Advertising Services",
    "count": 1
  },
  {
    "country": "MX",
    "industry": "Construction, Software Development, and IT Services and IT Consulting",
    "count": 2
  },
  {
    "country": "MX",
    "industry": "Paint, Coating, and Adhesive Manufacturing",
    "count": 1
  },
  {
    "country": "MX",
    "industry": "Business Consulting and Services, Insurance and Employee Benefit Funds, and Insurance Agencies and Brokerages",
    "count": 1
  },
  {
    "country": "MX",
    "industry": "Education Management",
    "count": 1
  },
  {
    "country": "MX",
    "industry": "IT Services and IT Consulting and Software Development",
    "count": 1
  },
  {
    "country": "MX",
    "industry": "IT System Custom Software Development",
    "count": 1
  },
  {
    "country": "MX",
    "industry": "Pharmaceutical Manufacturing and Biotechnology Research",
    "count": 1
  },
  {
    "country": "MX",
    "industry": "Professional Services, IT Services and IT Consulting, and Design Services",
    "count": 1
  },
  {
    "country": "MX",
    "industry": "Financial Services, Information Services, and IT Services and IT Consulting",
    "count": 1
  },
  {
    "country": "MX",
    "industry": "Professional Services, Manufacturing, and Technology, Information and Media",
    "count": 1
  },
  {
    "country": "MX",
    "industry": "Hospitals and Health Care",
    "count": 1
  },
  {
    "country": "MX",
    "industry": "Market Research",
    "count": 1
  },
  {
    "country": "MX",
    "industry": "Human Resources Services",
    "count": 1
  },
  {
    "country": "MX",
    "industry": "Real Estate",
    "count": 1
  },
  {
    "country": "MX",
    "industry": "Utilities Administration, Marketing Services, and Engineering Services",
    "count": 2
  },
  {
    "country": "PE",
    "industry": "Servicios IT / Consultor\u00eda",
    "count": 10
  },
  {
    "country": "PE",
    "industry": "Retail Apparel and Fashion and Internet Marketplace Platforms",
    "count": 1
  },
  {
    "country": "PE",
    "industry": "Transportation, Logistics, Supply Chain and Storage",
    "count": 1
  },
  {
    "country": "PE",
    "industry": "Business Consulting and Services",
    "count": 2
  },
  {
    "country": "PE",
    "industry": "Retail e E-Commerce",
    "count": 10
  },
  {
    "country": "PE",
    "industry": "Automation Machinery Manufacturing",
    "count": 1
  },
  {
    "country": "PE",
    "industry": "Investment Management, Banking, and Investment Banking",
    "count": 1
  },
  {
    "country": "PE",
    "industry": "Cosmetics",
    "count": 1
  },
  {
    "country": "PE",
    "industry": "Insurance",
    "count": 4
  },
  {
    "country": "PE",
    "industry": "Automation Machinery Manufacturing, Industrial Machinery Manufacturing, and Machinery Manufacturing",
    "count": 2
  },
  {
    "country": "PE",
    "industry": "Pharmaceutical Manufacturing",
    "count": 2
  },
  {
    "country": "PE",
    "industry": "Construction",
    "count": 1
  },
  {
    "country": "PE",
    "industry": "Technology, Information and Internet and Information Technology & Services",
    "count": 1
  },
  {
    "country": "PE",
    "industry": "Food and Beverage Manufacturing",
    "count": 1
  },
  {
    "country": "PE",
    "industry": "Servicios Financieros (Fintech/Banca)",
    "count": 3
  },
  {
    "country": "PE",
    "industry": "Telecommunications",
    "count": 2
  },
  {
    "country": "PE",
    "industry": "Financial Services and Banking",
    "count": 1
  },
  {
    "country": "PE",
    "industry": "Servicios Financieros (Fintech/Banca)",
    "count": 10
  },
  {
    "country": "PE",
    "industry": "Financial Services, Investment Banking, and Technology, Information and Media",
    "count": 1
  },
  {
    "country": "PE",
    "industry": "Motor Vehicle Manufacturing",
    "count": 2
  },
  {
    "country": "PE",
    "industry": "Wholesale Appliances, Electrical, and Electronics",
    "count": 1
  },
  {
    "country": "PE",
    "industry": "Outsourcing and Offshoring Consulting, IT System Data Services, and Data Infrastructure and Analytics",
    "count": 1
  },
  {
    "country": "PE",
    "industry": "Machinery Manufacturing",
    "count": 1
  },
  {
    "country": "PE",
    "industry": "Technology, Information and Internet, IT Services and IT Consulting, and Financial Services",
    "count": 2
  },
  {
    "country": "PE",
    "industry": "Software Development and IT Services and IT Consulting",
    "count": 1
  },
  {
    "country": "PE",
    "industry": "Human Resources Services",
    "count": 4
  },
  {
    "country": "PE",
    "industry": "Construction, Software Development, and IT Services and IT Consulting",
    "count": 2
  },
  {
    "country": "PE",
    "industry": "IT Services and IT Consulting and Software Development",
    "count": 1
  },
  {
    "country": "PE",
    "industry": "Travel Arrangements",
    "count": 1
  },
  {
    "country": "PE",
    "industry": "Professional Services, IT Services and IT Consulting, and Design Services",
    "count": 1
  },
  {
    "country": "PE",
    "industry": "Legal Services",
    "count": 1
  },
  {
    "country": "US",
    "industry": "Software Development and IT Services and IT Consulting",
    "count": 10
  },
  {
    "country": "US",
    "industry": "Aviation and Aerospace Component Manufacturing",
    "count": 2
  },
  {
    "country": "US",
    "industry": "Retail e E-Commerce",
    "count": 11
  },
  {
    "country": "US",
    "industry": "Insurance",
    "count": 24
  },
  {
    "country": "US",
    "industry": "Servicios Financieros (Fintech/Banca)",
    "count": 130
  },
  {
    "country": "US",
    "industry": "Architectural and Structural Metal Manufacturing",
    "count": 1
  },
  {
    "country": "US",
    "industry": "Software Development",
    "count": 210
  },
  {
    "country": "US",
    "industry": "Servicios IT / Consultor\u00eda",
    "count": 101
  },
  {
    "country": "US",
    "industry": "Tecnolog\u00eda e Internet",
    "count": 115
  },
  {
    "country": "US",
    "industry": "Banking and Financial Services",
    "count": 1
  },
  {
    "country": "US",
    "industry": "Non-profit Organizations and Primary and Secondary Education",
    "count": 13
  },
  {
    "country": "US",
    "industry": "Chemical Manufacturing",
    "count": 4
  },
  {
    "country": "US",
    "industry": "Automation Machinery Manufacturing and Industrial Machinery Manufacturing",
    "count": 1
  },
  {
    "country": "US",
    "industry": "Personal Care Product Manufacturing",
    "count": 6
  },
  {
    "country": "US",
    "industry": "Travel Arrangements",
    "count": 3
  },
  {
    "country": "US",
    "industry": "Pharmaceutical Manufacturing",
    "count": 10
  },
  {
    "country": "US",
    "industry": "Farming",
    "count": 1
  },
  {
    "country": "US",
    "industry": "Manufacturing",
    "count": 19
  },
  {
    "country": "US",
    "industry": "Computers and Electronics Manufacturing, Appliances, Electrical, and Electronics Manufacturing, and Telecommunications",
    "count": 1
  },
  {
    "country": "US",
    "industry": "Advertising Services",
    "count": 11
  },
  {
    "country": "US",
    "industry": "Software Development, IT Services and IT Consulting, and Research Services",
    "count": 1
  },
  {
    "country": "US",
    "industry": "Machinery Manufacturing",
    "count": 7
  },
  {
    "country": "US",
    "industry": "Hospitality",
    "count": 4
  },
  {
    "country": "US",
    "industry": "Biotechnology Research",
    "count": 6
  },
  {
    "country": "US",
    "industry": "E-Learning Providers",
    "count": 4
  },
  {
    "country": "US",
    "industry": "Technology, Information and Media",
    "count": 8
  },
  {
    "country": "US",
    "industry": "Business Consulting and Services and IT Services and IT Consulting",
    "count": 1
  },
  {
    "country": "US",
    "industry": "Information Services and Transportation, Logistics, Supply Chain and Storage",
    "count": 1
  },
  {
    "country": "US",
    "industry": "Robotics Engineering and Robot Manufacturing",
    "count": 1
  },
  {
    "country": "US",
    "industry": "Motor Vehicle Manufacturing",
    "count": 4
  },
  {
    "country": "US",
    "industry": "Chemical Manufacturing and Pharmaceutical Manufacturing",
    "count": 1
  },
  {
    "country": "US",
    "industry": "Hospitals and Health Care",
    "count": 26
  },
  {
    "country": "US",
    "industry": "Wholesale Building Materials",
    "count": 7
  },
  {
    "country": "US",
    "industry": "Musicians",
    "count": 1
  },
  {
    "country": "US",
    "industry": "Retail Apparel and Fashion and Transportation, Logistics, Supply Chain and Storage",
    "count": 1
  },
  {
    "country": "US",
    "industry": "Computer Hardware Manufacturing",
    "count": 5
  },
  {
    "country": "US",
    "industry": "Retail and Retail Luxury Goods and Jewelry",
    "count": 1
  },
  {
    "country": "US",
    "industry": "Information Services",
    "count": 4
  },
  {
    "country": "US",
    "industry": "Medical Equipment Manufacturing",
    "count": 8
  },
  {
    "country": "US",
    "industry": "Staffing and Recruiting",
    "count": 24
  },
  {
    "country": "US",
    "industry": "Financial Services and Technology, Information and Media",
    "count": 2
  },
  {
    "country": "US",
    "industry": "Retail Apparel and Fashion, Internet Marketplace Platforms, and Transportation, Logistics, Supply Chain and Storage",
    "count": 1
  },
  {
    "country": "US",
    "industry": "IT Services and IT Consulting, Business Consulting and Services, and Software Development",
    "count": 1
  },
  {
    "country": "US",
    "industry": "Book Publishing",
    "count": 1
  },
  {
    "country": "US",
    "industry": "Spectator Sports, Entertainment Providers, and Technology, Information and Media",
    "count": 1
  },
  {
    "country": "US",
    "industry": "Semiconductor Manufacturing",
    "count": 4
  },
  {
    "country": "US",
    "industry": "Financial Services and Investment Management",
    "count": 2
  },
  {
    "country": "US",
    "industry": "Automation Machinery Manufacturing and Transportation, Logistics, Supply Chain and Storage",
    "count": 1
  },
  {
    "country": "US",
    "industry": "Financial Services, Technology, Information and Media, and Software Development",
    "count": 1
  },
  {
    "country": "US",
    "industry": "Servicios Financieros (Fintech/Banca)",
    "count": 7
  },
  {
    "country": "US",
    "industry": "Public Safety",
    "count": 2
  },
  {
    "country": "US",
    "industry": "IT Services and IT Consulting, Software Development, and Research Services",
    "count": 1
  },
  {
    "country": "US",
    "industry": "Musicians and Software Development",
    "count": 1
  },
  {
    "country": "US",
    "industry": "Software Development and Insurance",
    "count": 1
  },
  {
    "country": "US",
    "industry": "Software Development and Entertainment Providers",
    "count": 1
  },
  {
    "country": "US",
    "industry": "Business Content",
    "count": 1
  },
  {
    "country": "US",
    "industry": "Wellness and Fitness Services",
    "count": 10
  },
  {
    "country": "US",
    "industry": "Computer and Network Security",
    "count": 16
  },
  {
    "country": "US",
    "industry": "Hospitals and Health Care and Software Development",
    "count": 2
  },
  {
    "country": "US",
    "industry": "Medical Equipment Manufacturing, Pharmaceutical Manufacturing, and Biotechnology Research",
    "count": 1
  },
  {
    "country": "US",
    "industry": "Computer Games",
    "count": 5
  },
  {
    "country": "US",
    "industry": "Computers and Electronics Manufacturing",
    "count": 5
  },
  {
    "country": "US",
    "industry": "Advertising Services, IT Services and IT Consulting, and Software Development",
    "count": 2
  },
  {
    "country": "US",
    "industry": "Wireless Services",
    "count": 1
  },
  {
    "country": "US",
    "industry": "Entertainment Providers",
    "count": 62
  },
  {
    "country": "US",
    "industry": "Internet Publishing",
    "count": 2
  },
  {
    "country": "US",
    "industry": "Venture Capital and Private Equity Principals",
    "count": 3
  },
  {
    "country": "US",
    "industry": "Pharmaceutical Manufacturing and Veterinary Services",
    "count": 1
  },
  {
    "country": "US",
    "industry": "Robotics Engineering",
    "count": 1
  },
  {
    "country": "US",
    "industry": "Transportation, Logistics, Supply Chain and Storage",
    "count": 4
  },
  {
    "country": "US",
    "industry": "Wholesale",
    "count": 2
  },
  {
    "country": "US",
    "industry": "Construction, Software Development, and IT Services and IT Consulting",
    "count": 17
  },
  {
    "country": "US",
    "industry": "Motor Vehicle Manufacturing and Motor Vehicle Parts Manufacturing",
    "count": 1
  },
  {
    "country": "US",
    "industry": "Non-profit Organizations",
    "count": 3
  },
  {
    "country": "US",
    "industry": "Rail Transportation",
    "count": 1
  },
  {
    "country": "US",
    "industry": "IT Services and IT Consulting, Design Services, and Information Services",
    "count": 1
  },
  {
    "country": "US",
    "industry": "Wireless Services, Telecommunications, and Communications Equipment Manufacturing",
    "count": 6
  },
  {
    "country": "US",
    "industry": "Software Development and Financial Services",
    "count": 1
  },
  {
    "country": "US",
    "industry": "Transportation, Logistics, Supply Chain and Storage and Truck Transportation",
    "count": 2
  },
  {
    "country": "US",
    "industry": "E-Learning Providers and Software Development",
    "count": 1
  },
  {
    "country": "US",
    "industry": "Telecommunications",
    "count": 8
  },
  {
    "country": "US",
    "industry": "Staffing and Recruiting and Software Development",
    "count": 2
  },
  {
    "country": "US",
    "industry": "Retail Apparel and Fashion and Retail",
    "count": 1
  },
  {
    "country": "US",
    "industry": "IT System Custom Software Development",
    "count": 2
  },
  {
    "country": "US",
    "industry": "Food and Beverage Manufacturing",
    "count": 2
  },
  {
    "country": "US",
    "industry": "Technology, Information and Internet and Software Development",
    "count": 1
  },
  {
    "country": "US",
    "industry": "Information Technology & Services and Software Development",
    "count": 1
  },
  {
    "country": "US",
    "industry": "Retail e E-Commerce",
    "count": 15
  },
  {
    "country": "US",
    "industry": "Human Resources Services",
    "count": 3
  },
  {
    "country": "US",
    "industry": "Professional Training and Coaching",
    "count": 6
  },
  {
    "country": "US",
    "industry": "Biotechnology Research and Medical Equipment Manufacturing",
    "count": 1
  },
  {
    "country": "US",
    "industry": "Internet News",
    "count": 1
  },
  {
    "country": "US",
    "industry": "Financial Services, Investment Banking, and Venture Capital and Private Equity Principals",
    "count": 1
  },
  {
    "country": "US",
    "industry": "Computer and Network Security and IT System Custom Software Development",
    "count": 1
  },
  {
    "country": "US",
    "industry": "Software Development, Advertising Services, and IT Services and IT Consulting",
    "count": 1
  },
  {
    "country": "US",
    "industry": "Computers and Electronics Manufacturing, Sporting Goods Manufacturing, and Computer Hardware Manufacturing",
    "count": 1
  },
  {
    "country": "US",
    "industry": "Financial Services, Banking, and Investment Banking",
    "count": 1
  },
  {
    "country": "US",
    "industry": "Legal Services",
    "count": 2
  },
  {
    "country": "US",
    "industry": "Information Technology & Services",
    "count": 7
  },
  {
    "country": "US",
    "industry": "Truck Transportation",
    "count": 1
  },
  {
    "country": "US",
    "industry": "Financial Services and IT Services and IT Consulting",
    "count": 4
  },
  {
    "country": "US",
    "industry": "Engineering Services",
    "count": 1
  },
  {
    "country": "US",
    "industry": "IT Services and IT Consulting and Software Development",
    "count": 3
  },
  {
    "country": "US",
    "industry": "Retail, Online and Mail Order Retail, and Marketing Services",
    "count": 1
  },
  {
    "country": "US",
    "industry": "Technology, Information and Internet and Financial Services",
    "count": 1
  },
  {
    "country": "US",
    "industry": "Restaurants",
    "count": 7
  },
  {
    "country": "US",
    "industry": "Mental Health Care",
    "count": 5
  },
  {
    "country": "US",
    "industry": "Medical Equipment Manufacturing, Manufacturing, and Fabricated Metal Products",
    "count": 4
  },
  {
    "country": "US",
    "industry": "Consumer Services",
    "count": 5
  },
  {
    "country": "US",
    "industry": "Hospitals and Health Care, Wellness and Fitness Services, and Technology, Information and Internet",
    "count": 1
  },
  {
    "country": "US",
    "industry": "IT Services and IT Consulting, Technology, Information and Internet, and Computer and Network Security",
    "count": 1
  },
  {
    "country": "US",
    "industry": "Information Services and Technology, Information and Media",
    "count": 1
  },
  {
    "country": "US",
    "industry": "Human Resources Services, Financial Services, and Software Development",
    "count": 1
  },
  {
    "country": "US",
    "industry": "IT Services and IT Consulting and Business Consulting and Services",
    "count": 1
  },
  {
    "country": "US",
    "industry": "Retail Apparel and Fashion",
    "count": 15
  },
  {
    "country": "US",
    "industry": "Government Administration",
    "count": 2
  },
  {
    "country": "US",
    "industry": "Law Practice",
    "count": 1
  },
  {
    "country": "US",
    "industry": "Marketing Services, Retail, and Retail Luxury Goods and Jewelry",
    "count": 1
  },
  {
    "country": "US",
    "industry": "Public Health",
    "count": 2
  },
  {
    "country": "US",
    "industry": "Medical and Diagnostic Laboratories",
    "count": 1
  },
  {
    "country": "US",
    "industry": "Airlines and Aviation",
    "count": 3
  },
  {
    "country": "US",
    "industry": "Retail, Manufacturing, and Appliances, Electrical, and Electronics Manufacturing",
    "count": 1
  },
  {
    "country": "US",
    "industry": "Food & Beverages",
    "count": 2
  },
  {
    "country": "US",
    "industry": "Food and Beverage Services",
    "count": 2
  },
  {
    "country": "US",
    "industry": "Higher Education",
    "count": 1
  },
  {
    "country": "US",
    "industry": "Transportation/Trucking/Railroad",
    "count": 2
  },
  {
    "country": "US",
    "industry": "Research",
    "count": 1
  },
  {
    "country": "US",
    "industry": "Consumer Electronics",
    "count": 3
  },
  {
    "country": "US",
    "industry": "Financial Services, Banking, and Technology, Information and Media",
    "count": 1
  },
  {
    "country": "US",
    "industry": "Real Estate, Financial Services, and IT Services and IT Consulting",
    "count": 1
  },
  {
    "country": "US",
    "industry": "Gambling Facilities and Casinos and Spectator Sports",
    "count": 5
  },
  {
    "country": "US",
    "industry": "Banking, Capital Markets, and Financial Services",
    "count": 1
  },
  {
    "country": "US",
    "industry": "Software Development, Data Infrastructure and Analytics, and Financial Services",
    "count": 1
  },
  {
    "country": "US",
    "industry": "Food and Beverage Services and IT Services and IT Consulting",
    "count": 1
  },
  {
    "country": "US",
    "industry": "Book and Periodical Publishing",
    "count": 2
  },
  {
    "country": "US",
    "industry": "Manufacturing and Retail Health and Personal Care Products",
    "count": 1
  },
  {
    "country": "US",
    "industry": "Wholesale Footwear and Retail Apparel and Fashion",
    "count": 1
  },
  {
    "country": "US",
    "industry": "Insurance and Employee Benefit Funds",
    "count": 1
  },
  {
    "country": "US",
    "industry": "Consumer Goods",
    "count": 3
  },
  {
    "country": "US",
    "industry": "Paper and Forest Product Manufacturing",
    "count": 1
  },
  {
    "country": "US",
    "industry": "Engineering Services and Telecommunications",
    "count": 1
  },
  {
    "country": "US",
    "industry": "Personal Care Product Manufacturing and Retail Health and Personal Care Products",
    "count": 1
  },
  {
    "country": "US",
    "industry": "Information Services and Technology, Information and Internet",
    "count": 5
  },
  {
    "country": "US",
    "industry": "Sporting Goods Manufacturing",
    "count": 1
  },
  {
    "country": "US",
    "industry": "Automotive",
    "count": 1
  },
  {
    "country": "US",
    "industry": "IT Services and IT Consulting, Hospitals and Health Care, and Software Development",
    "count": 1
  },
  {
    "country": "US",
    "industry": "Financial Services and Technology, Information and Internet",
    "count": 2
  },
  {
    "country": "US",
    "industry": "Security and Investigations",
    "count": 2
  },
  {
    "country": "US",
    "industry": "Hospitality and Real Estate",
    "count": 1
  },
  {
    "country": "US",
    "industry": "Education, Hospitals and Health Care, and Higher Education",
    "count": 1
  },
  {
    "country": "US",
    "industry": "Utilities",
    "count": 2
  },
  {
    "country": "US",
    "industry": "Consumer Services and Wellness and Fitness Services",
    "count": 1
  },
  {
    "country": "US",
    "industry": "Design Services, Technology, Information and Internet, and Advertising Services",
    "count": 1
  },
  {
    "country": "US",
    "industry": "Business Consulting and Services, Investment Banking, and Venture Capital and Private Equity Principals",
    "count": 1
  },
  {
    "country": "US",
    "industry": "Biotechnology Research, Research Services, and Medical Equipment Manufacturing",
    "count": 1
  },
  {
    "country": "US",
    "industry": "Software Development and Computer and Network Security",
    "count": 2
  },
  {
    "country": "US",
    "industry": "Business Consulting and Services, Hospitals and Health Care, and Insurance",
    "count": 1
  },
  {
    "country": "US",
    "industry": "Financial Services, Banking, and IT Services and IT Consulting",
    "count": 1
  },
  {
    "country": "US",
    "industry": "Financial Services and Insurance",
    "count": 1
  },
  {
    "country": "US",
    "industry": "Industrial Machinery Manufacturing",
    "count": 5
  },
  {
    "country": "US",
    "industry": "Retail Health and Personal Care Products",
    "count": 2
  },
  {
    "country": "US",
    "industry": "Oil and Gas",
    "count": 2
  },
  {
    "country": "US",
    "industry": "Entertainment Providers, Hospitality, and Warehousing and Storage",
    "count": 1
  },
  {
    "country": "US",
    "industry": "Social Networking Platforms, Software Development, and Technology, Information and Media",
    "count": 1
  },
  {
    "country": "US",
    "industry": "Advertising Services and Marketing Services",
    "count": 1
  },
  {
    "country": "US",
    "industry": "Food and Beverage Retail",
    "count": 1
  },
  {
    "country": "US",
    "industry": "Business Consulting and Services, IT Services and IT Consulting, and Professional Training and Coaching",
    "count": 5
  },
  {
    "country": "US",
    "industry": "Real Estate, Financial Services, and Capital Markets",
    "count": 1
  },
  {
    "country": "US",
    "industry": "Investment Banking",
    "count": 1
  },
  {
    "country": "US",
    "industry": "Health, Wellness & Fitness",
    "count": 2
  },
  {
    "country": "US",
    "industry": "Food and Beverage Services, Food and Beverage Manufacturing, and Food and Beverage Retail",
    "count": 1
  },
  {
    "country": "US",
    "industry": "Computers and Electronics Manufacturing and Retail",
    "count": 5
  },
  {
    "country": "US",
    "industry": "Food and Beverage Services, Food and Beverage Manufacturing, and Beverage Manufacturing",
    "count": 2
  },
  {
    "country": "US",
    "industry": "Computer Networking Products, Software Development, and Writing and Editing",
    "count": 1
  },
  {
    "country": "US",
    "industry": "Financial Services, Investment Banking, and Investment Management",
    "count": 8
  },
  {
    "country": "US",
    "industry": "Alternative Medicine, Hospitals and Health Care, and Mental Health Care",
    "count": 1
  },
  {
    "country": "US",
    "industry": "Oil and Gas, Utilities, and Renewable Energy Semiconductor Manufacturing",
    "count": 2
  },
  {
    "country": "US",
    "industry": "Marketing Services",
    "count": 7
  },
  {
    "country": "US",
    "industry": "Machinery Manufacturing, Industrial Machinery Manufacturing, and Manufacturing",
    "count": 1
  },
  {
    "country": "US",
    "industry": "Software Development and IT System Custom Software Development",
    "count": 4
  },
  {
    "country": "US",
    "industry": "Hospitals and Health Care and Public Health",
    "count": 1
  },
  {
    "country": "US",
    "industry": "IT System Testing and Evaluation, IT Services and IT Consulting, and Technology, Information and Media",
    "count": 1
  },
  {
    "country": "US",
    "industry": "Business Consulting and Services and Financial Services",
    "count": 1
  },
  {
    "country": "US",
    "industry": "Loan Brokers",
    "count": 1
  },
  {
    "country": "US",
    "industry": "Furniture and Home Furnishings Manufacturing",
    "count": 3
  },
  {
    "country": "US",
    "industry": "Food & Beverages, Baked Goods Manufacturing, and Restaurants",
    "count": 1
  },
  {
    "country": "US",
    "industry": "Defense and Space Manufacturing",
    "count": 2
  },
  {
    "country": "US",
    "industry": "Spectator Sports",
    "count": 2
  },
  {
    "country": "US",
    "industry": "Telecommunications and Semiconductor Manufacturing",
    "count": 1
  },
  {
    "country": "US",
    "industry": "Real Estate, Marketing Services, and Advertising Services",
    "count": 1
  },
  {
    "country": "US",
    "industry": "Retail, Retail Apparel and Fashion, and Retail Luxury Goods and Jewelry",
    "count": 2
  },
  {
    "country": "US",
    "industry": "Non-profit Organizations and Medical Practices",
    "count": 1
  },
  {
    "country": "US",
    "industry": "Financial Services and Social Networking Platforms",
    "count": 1
  },
  {
    "country": "US",
    "industry": "Servicios Financieros (Fintech/Banca)",
    "count": 4
  },
  {
    "country": "US",
    "industry": "Financial Services and Banking",
    "count": 1
  },
  {
    "country": "US",
    "industry": "Computer and Network Security and Software Development",
    "count": 3
  },
  {
    "country": "US",
    "industry": "Civic and Social Organizations and Non-profit Organizations",
    "count": 2
  },
  {
    "country": "US",
    "industry": "Automation Machinery Manufacturing and Appliances, Electrical, and Electronics Manufacturing",
    "count": 1
  },
  {
    "country": "US",
    "industry": "Real Estate",
    "count": 5
  },
  {
    "country": "US",
    "industry": "Investment Management",
    "count": 2
  },
  {
    "country": "US",
    "industry": "Computer Hardware Manufacturing, Appliances, Electrical, and Electronics Manufacturing, and Semiconductor Manufacturing",
    "count": 1
  },
  {
    "country": "US",
    "industry": "Manufacturing, Wood Product Manufacturing, and Plastics Manufacturing",
    "count": 1
  },
  {
    "country": "US",
    "industry": "Design Services and Software Development",
    "count": 1
  },
  {
    "country": "US",
    "industry": "Information Technology & Services and Financial Services",
    "count": 1
  },
  {
    "country": "US",
    "industry": "Financial Services, Banking, and Insurance",
    "count": 1
  },
  {
    "country": "US",
    "industry": "Medical Practices, Medical Equipment Manufacturing, and Manufacturing",
    "count": 1
  },
  {
    "country": "US",
    "industry": "Automation Machinery Manufacturing and Food and Beverage Manufacturing",
    "count": 1
  },
  {
    "country": "US",
    "industry": "Embedded Software Products",
    "count": 1
  },
  {
    "country": "US",
    "industry": "Construction",
    "count": 2
  },
  {
    "country": "US",
    "industry": "Financial Services, Software Development, and Technology, Information and Media",
    "count": 1
  },
  {
    "country": "US",
    "industry": "Appliances, Electrical, and Electronics Manufacturing",
    "count": 4
  },
  {
    "country": "US",
    "industry": "Primary and Secondary Education",
    "count": 1
  },
  {
    "country": "US",
    "industry": "Technology, Information and Internet, Software Development, and IT Services and IT Consulting",
    "count": 2
  },
  {
    "country": "US",
    "industry": "Business Consulting and Services",
    "count": 3
  },
  {
    "country": "US",
    "industry": "Software Development, Technology, Information and Internet, and Financial Services",
    "count": 5
  },
  {
    "country": "US",
    "industry": "Higher Education, Software Development, and Technology, Information and Media",
    "count": 1
  },
  {
    "country": "US",
    "industry": "Machinery Manufacturing and Farming",
    "count": 1
  },
  {
    "country": "US",
    "industry": "Insurance and Financial Services",
    "count": 1
  },
  {
    "country": "US",
    "industry": "Internet Publishing and Marketing Services",
    "count": 2
  },
  {
    "country": "US",
    "industry": "Legal Services and Software Development",
    "count": 1
  },
  {
    "country": "US",
    "industry": "Technology, Information and Media, Information Services, and Business Consulting and Services",
    "count": 1
  },
  {
    "country": "US",
    "industry": "Manufacturing, Industrial Machinery Manufacturing, and Oil and Gas",
    "count": 1
  },
  {
    "country": "US",
    "industry": "Social Networking Platforms",
    "count": 8
  },
  {
    "country": "US",
    "industry": "Software Development and Pharmaceutical Manufacturing",
    "count": 1
  },
  {
    "country": "US",
    "industry": "Business Consulting and Services and Banking",
    "count": 1
  },
  {
    "country": "US",
    "industry": "Software Development, IT Services and IT Consulting, and Technology, Information and Internet",
    "count": 4
  },
  {
    "country": "US",
    "industry": "Computers and Electronics Manufacturing, Advertising Services, and Entertainment Providers",
    "count": 1
  },
  {
    "country": "US",
    "industry": "Computer Hardware",
    "count": 1
  },
  {
    "country": "US",
    "industry": "Semiconductors",
    "count": 1
  },
  {
    "country": "US",
    "industry": "Professional Services",
    "count": 1
  },
  {
    "country": "US",
    "industry": "Biotechnology",
    "count": 1
  },
  {
    "country": "US",
    "industry": "Chemical Manufacturing and Manufacturing",
    "count": 1
  },
  {
    "country": "US",
    "industry": "Advertising Services, Marketing Services, and Technology, Information and Media",
    "count": 1
  },
  {
    "country": "US",
    "industry": "Gambling Facilities and Casinos, Entertainment Providers, and Software Development",
    "count": 1
  },
  {
    "country": "US",
    "industry": "IT System Data Services",
    "count": 1
  },
  {
    "country": "US",
    "industry": "Business Consulting and Services, Financial Services, and Banking",
    "count": 1
  },
  {
    "country": "US",
    "industry": "Mental Health Care and Software Development",
    "count": 1
  },
  {
    "country": "US",
    "industry": "Computer and Network Security, IT Services and IT Consulting, and Data Infrastructure and Analytics",
    "count": 1
  },
  {
    "country": "US",
    "industry": "Hospitality, Food and Beverage Services, and Retail",
    "count": 1
  },
  {
    "country": "US",
    "industry": "Retail Office Equipment",
    "count": 1
  },
  {
    "country": "US",
    "industry": "Financial Services and Venture Capital and Private Equity Principals",
    "count": 1
  },
  {
    "country": "US",
    "industry": "Software Development, Financial Services, and Technology, Information and Internet",
    "count": 3
  },
  {
    "country": "US",
    "industry": "Medical Equipment Manufacturing and Retail Health and Personal Care Products",
    "count": 1
  },
  {
    "country": "US",
    "industry": "Computer and Network Security and Technology, Information and Media",
    "count": 2
  },
  {
    "country": "US",
    "industry": "Wholesale Building Materials and Retail",
    "count": 1
  },
  {
    "country": "US",
    "industry": "Broadcast Media Production and Distribution",
    "count": 2
  },
  {
    "country": "US",
    "industry": "Packaging and Containers Manufacturing",
    "count": 1
  },
  {
    "country": "US",
    "industry": "Motor Vehicle Manufacturing, Renewable Energy Semiconductor Manufacturing, and Utilities",
    "count": 1
  },
  {
    "country": "US",
    "industry": "Hospitals and Health Care, Pharmaceutical Manufacturing, and Biotechnology Research",
    "count": 1
  },
  {
    "country": "US",
    "industry": "Newspaper Publishing",
    "count": 1
  },
  {
    "country": "US",
    "industry": "Software Development, Motor Vehicle Manufacturing, and Advertising Services",
    "count": 1
  },
  {
    "country": "US",
    "industry": "Manufacturing and Wholesale",
    "count": 1
  },
  {
    "country": "US",
    "industry": "Retail Apparel and Fashion, Retail Luxury Goods and Jewelry, and Retail",
    "count": 1
  },
  {
    "country": "US",
    "industry": "Technology, Information and Internet and Entertainment Providers",
    "count": 2
  },
  {
    "country": "US",
    "industry": "Computer Networking Products",
    "count": 2
  },
  {
    "country": "US",
    "industry": "Wellness and Fitness Services, Hospitals and Health Care, and Insurance",
    "count": 1
  },
  {
    "country": "US",
    "industry": "Restaurants, Hospitality, and Entertainment Providers",
    "count": 1
  },
  {
    "country": "US",
    "industry": "Construction and Wholesale Building Materials",
    "count": 1
  },
  {
    "country": "US",
    "industry": "Retail Apparel and Fashion, Manufacturing, and Retail",
    "count": 2
  },
  {
    "country": "US",
    "industry": "Industrial Machinery Manufacturing and Manufacturing",
    "count": 1
  },
  {
    "country": "US",
    "industry": "Software Development, IT Services and IT Consulting, and Pharmaceutical Manufacturing",
    "count": 2
  },
  {
    "country": "US",
    "industry": "Entertainment",
    "count": 1
  },
  {
    "country": "US",
    "industry": "Education Administration Programs",
    "count": 1
  },
  {
    "country": "US",
    "industry": "Motor Vehicle Parts Manufacturing",
    "count": 1
  },
  {
    "country": "US",
    "industry": "Transportation Equipment Manufacturing",
    "count": 1
  },
  {
    "country": "US",
    "industry": "Advertising Services and Broadcast Media Production and Distribution",
    "count": 1
  },
  {
    "country": "US",
    "industry": "Technology, Information and Internet, Broadcast Media Production and Distribution, and Wellness and Fitness Services",
    "count": 1
  },
  {
    "country": "US",
    "industry": "Technology, Information and Internet, IT Services and IT Consulting, and Software Development",
    "count": 2
  },
  {
    "country": "US",
    "industry": "Financial Services, Investment Management, and Banking",
    "count": 2
  },
  {
    "country": "US",
    "industry": "Computer Hardware Manufacturing, Computers and Electronics Manufacturing, and Semiconductor Manufacturing",
    "count": 2
  },
  {
    "country": "US",
    "industry": "Research Services",
    "count": 1
  },
  {
    "country": "US",
    "industry": "Software Development, Technology, Information and Internet, and Advertising Services",
    "count": 1
  }
];

export function MarketIndustryChart({
  viewMode = 'absolute',
  selectedCountry = 'all'
}: {
  viewMode?: 'absolute' | 'percentage',
  selectedCountry?: string
}) {
  const isPercentage = viewMode === 'percentage';

  const countryCodeMap: Record<string, string> = {
    'United States': 'US',
    'Brasil': 'BR',
    'México': 'MX',
    'Colombia': 'CO',
    'Chile': 'CL',
    'Perú': 'PE',
  };

  const filteredData = useMemo(() => {
    let data = rawData;
    const code = countryCodeMap[selectedCountry] || selectedCountry;
    
    if (selectedCountry !== 'all') {
      data = rawData.filter(d => d.country === code);
    }

    const agg: Record<string, number> = {};
    data.forEach(d => {
      agg[d.industry] = (agg[d.industry] || 0) + d.count;
    });

    const top10 = Object.keys(agg).map(k => ({ label: k, count: agg[k] })).sort((a, b) => b.count - a.count).slice(0, 10);
    return top10.reverse(); // For Echarts bottom-to-top rendering
  }, [selectedCountry]);

  const totalFiltered = useMemo(() => {
    return filteredData.reduce((acc, d) => acc + d.count, 0); // Not true total of the country, just total of top 10 for percentage relative to top 10
  }, [filteredData]);

  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
      formatter: (params: any) => {
        const p = params[0];
        const pct = totalFiltered > 0 ? ((p.data.raw / totalFiltered) * 100).toFixed(1) : 0;
        return `<strong>${p.axisValue}</strong><br/>
          ${p.data.raw.toLocaleString('en-US')} vacantes de PM<br/>
          <span style="color:#94a3b8">${pct}% del Top 10</span>`;
      }
    },
    grid: {
      left: '3%',
      right: '10%',
      bottom: '15%',
      top: '5%',
      containLabel: true
    },
    xAxis: {
      type: 'value',
      name: isPercentage ? 'Porcentaje (%)' : 'Cantidad de vacantes',
      nameLocation: 'middle',
      nameGap: 30,
      nameTextStyle: { fontSize: 11, color: '#94a3b8' },
      axisLabel: {
        formatter: isPercentage ? '{value}%' : '{value}',
        fontSize: 11,
        color: '#64748b',
      },
      splitLine: { lineStyle: { type: 'dashed', color: 'rgba(0,0,0,0.08)' } }
    },
    yAxis: {
      type: 'category',
      data: filteredData.map(d => d.label),
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { fontSize: 11, color: '#374151', width: 140, overflow: 'break' }
    },
    series: [
      {
        name: 'Vacantes de PM',
        type: 'bar',
        barMaxWidth: 24,
        data: filteredData.map(d => ({
          value: isPercentage && totalFiltered > 0 ? parseFloat(((d.count / totalFiltered) * 100).toFixed(1)) : d.count,
          raw: d.count,
          itemStyle: { 
            color: {
              type: 'linear', x: 0, y: 0, x2: 1, y2: 0,
              colorStops: [{ offset: 0, color: '#38bdf8' }, { offset: 1, color: '#0ea5e9' }]
            },
            borderRadius: [0, 4, 4, 0] 
          }
        })),
        label: {
          show: true,
          position: 'right',
          formatter: (p: any) => isPercentage ? `${p.value}%` : p.data.raw.toLocaleString('en-US'),
          color: '#374151',
          fontSize: 11,
          fontWeight: 600,
        }
      }
    ]
  };

  return (
    <div className="flex flex-col h-full w-full">
      <div className="h-[280px] w-full -mt-4">
        <ReactECharts
          option={option}
          style={{ height: '100%', width: '100%' }}
          opts={{ renderer: 'svg' }}
        />
      </div>
    </div>
  );
}
