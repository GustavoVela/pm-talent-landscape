"use client";

import React, { useMemo } from 'react';
import ReactECharts from 'echarts-for-react';

const treeData = { "name": "Product\nSkills", "children": [{ "name": "Core PM\n(2673)", "children": [{ "name": "Roadmapping & Planning (1991)", "value": 1991, "raw_name": "Roadmapping & Planning", "raw_count": 1991 }, { "name": "Product Strategy (1945)", "value": 1945, "raw_name": "Product Strategy", "raw_count": 1945 }, { "name": "Product Discovery (1618)", "value": 1618, "raw_name": "Product Discovery", "raw_count": 1618 }, { "name": "Backlog Management (1604)", "value": 1604, "raw_name": "Backlog Management", "raw_count": 1604 }, { "name": "Requirements & Specifications (1196)", "value": 1196, "raw_name": "Requirements & Specifications", "raw_count": 1196 }, { "name": "Agile Methodologies (1028)", "value": 1028, "raw_name": "Agile Methodologies", "raw_count": 1028 }, { "name": "Portfolio & Lifecycle Management (402)", "value": 402, "raw_name": "Portfolio & Lifecycle Management", "raw_count": 402 }, { "name": "Stakeholder Management (254)", "value": 254, "raw_name": "Stakeholder Management", "raw_count": 254 }, { "name": "Experimentation & A/B Testing (238)", "value": 238, "raw_name": "Experimentation & A/B Testing", "raw_count": 238 }, { "name": "Delivery & Execution (194)", "value": 194, "raw_name": "Delivery & Execution", "raw_count": 194 }, { "name": "User Research & Insights (182)", "value": 182, "raw_name": "User Research & Insights", "raw_count": 182 }, { "name": "Metrics & OKRs (177)", "value": 177, "raw_name": "Metrics & OKRs", "raw_count": 177 }, { "name": "Go-to-Market (GTM) (132)", "value": 132, "raw_name": "Go-to-Market (GTM)", "raw_count": 132 }, { "name": "Market & Competitive Intelligence (129)", "value": 129, "raw_name": "Market & Competitive Intelligence", "raw_count": 129 }, { "name": "0-to-1 & MVP (113)", "value": 113, "raw_name": "0-to-1 & MVP", "raw_count": 113 }, { "name": "Frameworks & Prioritization (111)", "value": 111, "raw_name": "Frameworks & Prioritization", "raw_count": 111 }, { "name": "Cross-Functional Leadership (49)", "value": 49, "raw_name": "Cross-Functional Leadership", "raw_count": 49 }, { "name": "Product Marketing & Positioning (48)", "value": 48, "raw_name": "Product Marketing & Positioning", "raw_count": 48 }, { "name": "Customer Journey & Personas (39)", "value": 39, "raw_name": "Customer Journey & Personas", "raw_count": 39 }, { "name": "Workflows & Processes (36)", "value": 36, "raw_name": "Workflows & Processes", "raw_count": 36 }, { "name": "Product Design & UX (25)", "value": 25, "raw_name": "Product Design & UX", "raw_count": 25 }, { "name": "Analytics & Data-Driven PM (23)", "value": 23, "raw_name": "Analytics & Data-Driven PM", "raw_count": 23 }], "jobs_count": 2673 }, { "name": "Technical\n(940)", "children": [{ "name": "APIs & Integrations (441)", "value": 441, "raw_name": "APIs & Integrations", "raw_count": 441 }, { "name": "Databases & Storage (222)", "value": 222, "raw_name": "Databases & Storage", "raw_count": 222 }, { "name": "Software Architecture & System Design (197)", "value": 197, "raw_name": "Software Architecture & System Design", "raw_count": 197 }, { "name": "Cloud Computing & Infrastructure (183)", "value": 183, "raw_name": "Cloud Computing & Infrastructure", "raw_count": 183 }, { "name": "Data Engineering & Streaming (182)", "value": 182, "raw_name": "Data Engineering & Streaming", "raw_count": 182 }, { "name": "Programming Languages & Frameworks (171)", "value": 171, "raw_name": "Programming Languages & Frameworks", "raw_count": 171 }, { "name": "DevOps, CI/CD & SRE (132)", "value": 132, "raw_name": "DevOps, CI/CD & SRE", "raw_count": 132 }, { "name": "Enterprise Systems & ERPs (126)", "value": 126, "raw_name": "Enterprise Systems & ERPs", "raw_count": 126 }, { "name": "Agile, Development & Testing (110)", "value": 110, "raw_name": "Agile, Development & Testing", "raw_count": 110 }, { "name": "AI & Machine Learning (Cross-Functional) (78)", "value": 78, "raw_name": "AI & Machine Learning (Cross-Functional)", "raw_count": 78 }, { "name": "Industry & Domain Tech (73)", "value": 73, "raw_name": "Industry & Domain Tech", "raw_count": 73 }, { "name": "Cybersecurity & Identity Management (65)", "value": 65, "raw_name": "Cybersecurity & Identity Management", "raw_count": 65 }, { "name": "Payments & Financial Tech (15)", "value": 15, "raw_name": "Payments & Financial Tech", "raw_count": 15 }, { "name": "AdTech & Marketing Analytics (10)", "value": 10, "raw_name": "AdTech & Marketing Analytics", "raw_count": 10 }], "jobs_count": 940 }, { "name": "Business\n(1877)", "children": [{ "name": "Budgeting, Forecasting & P&L (863)", "value": 863, "raw_name": "Budgeting, Forecasting & P&L", "raw_count": 863 }, { "name": "Go-to-Market (GTM) (843)", "value": 843, "raw_name": "Go-to-Market (GTM)", "raw_count": 843 }, { "name": "Business Strategy (522)", "value": 522, "raw_name": "Business Strategy", "raw_count": 522 }, { "name": "Sales Enablement & B2B (293)", "value": 293, "raw_name": "Sales Enablement & B2B", "raw_count": 293 }, { "name": "Market Analysis & Intelligence (262)", "value": 262, "raw_name": "Market Analysis & Intelligence", "raw_count": 262 }, { "name": "Financial Modeling & Economics (237)", "value": 237, "raw_name": "Financial Modeling & Economics", "raw_count": 237 }, { "name": "Industry / Domain Expertise (209)", "value": 209, "raw_name": "Industry / Domain Expertise", "raw_count": 209 }, { "name": "Risk, Compliance & Governance (179)", "value": 179, "raw_name": "Risk, Compliance & Governance", "raw_count": 179 }, { "name": "Business Planning & Cases (177)", "value": 177, "raw_name": "Business Planning & Cases", "raw_count": 177 }, { "name": "Stakeholder & Vendor Management (168)", "value": 168, "raw_name": "Stakeholder & Vendor Management", "raw_count": 168 }, { "name": "Marketing & Conversion (127)", "value": 127, "raw_name": "Marketing & Conversion", "raw_count": 127 }, { "name": "Competitive Analysis (122)", "value": 122, "raw_name": "Competitive Analysis", "raw_count": 122 }, { "name": "Process Optimization (81)", "value": 81, "raw_name": "Process Optimization", "raw_count": 81 }, { "name": "Operations & Logistics (60)", "value": 60, "raw_name": "Operations & Logistics", "raw_count": 60 }, { "name": "User & Customer Insights (10)", "value": 10, "raw_name": "User & Customer Insights", "raw_count": 10 }], "jobs_count": 1877 }, { "name": "Data\n(1418)", "children": [{ "name": "Data Analysis & Analytics (800)", "value": 800, "raw_name": "Data Analysis & Analytics", "raw_count": 800 }, { "name": "Data Visualization & BI (477)", "value": 477, "raw_name": "Data Visualization & BI", "raw_count": 477 }, { "name": "Programming & Data Languages (304)", "value": 304, "raw_name": "Programming & Data Languages", "raw_count": 304 }, { "name": "Metrics & KPIs (290)", "value": 290, "raw_name": "Metrics & KPIs", "raw_count": 290 }, { "name": "Data Engineering & Architecture (161)", "value": 161, "raw_name": "Data Engineering & Architecture", "raw_count": 161 }, { "name": "Product & Behavioral Analytics (153)", "value": 153, "raw_name": "Product & Behavioral Analytics", "raw_count": 153 }, { "name": "Data Governance & Quality (81)", "value": 81, "raw_name": "Data Governance & Quality", "raw_count": 81 }, { "name": "Data Science & Predictive (80)", "value": 80, "raw_name": "Data Science & Predictive", "raw_count": 80 }, { "name": "Experimentation & A/B Testing (77)", "value": 77, "raw_name": "Experimentation & A/B Testing", "raw_count": 77 }, { "name": "Data-Driven Mindset (69)", "value": 69, "raw_name": "Data-Driven Mindset", "raw_count": 69 }, { "name": "Data Operations & Workflows (57)", "value": 57, "raw_name": "Data Operations & Workflows", "raw_count": 57 }, { "name": "Conversion & Marketing Metrics (40)", "value": 40, "raw_name": "Conversion & Marketing Metrics", "raw_count": 40 }, { "name": "SQL & Databases (37)", "value": 37, "raw_name": "SQL & Databases", "raw_count": 37 }, { "name": "Performance & Reliability (31)", "value": 31, "raw_name": "Performance & Reliability", "raw_count": 31 }, { "name": "Domain Specific Data (17)", "value": 17, "raw_name": "Domain Specific Data", "raw_count": 17 }, { "name": "Data Strategy & Products (9)", "value": 9, "raw_name": "Data Strategy & Products", "raw_count": 9 }, { "name": "Domain Specific Data (Pending) (7)", "value": 7, "raw_name": "Domain Specific Data (Pending)", "raw_count": 7 }, { "name": "Data Mining (4)", "value": 4, "raw_name": "Data Mining", "raw_count": 4 }], "jobs_count": 1418 }, { "name": "AI\n(809)", "children": [{ "name": "Artificial Intelligence (General) (209)", "value": 209, "raw_name": "Artificial Intelligence (General)", "raw_count": 209 }, { "name": "Core Machine Learning (208)", "value": 208, "raw_name": "Core Machine Learning", "raw_count": 208 }, { "name": "Large Language Models (LLMs) & Foundation Models (151)", "value": 151, "raw_name": "Large Language Models (LLMs) & Foundation Models", "raw_count": 151 }, { "name": "Agentic AI (134)", "value": 134, "raw_name": "Agentic AI", "raw_count": 134 }, { "name": "Generative AI (GenAI) (131)", "value": 131, "raw_name": "Generative AI (GenAI)", "raw_count": 131 }, { "name": "Prompt Engineering (123)", "value": 123, "raw_name": "Prompt Engineering", "raw_count": 123 }, { "name": "AI Tooling (78)", "value": 78, "raw_name": "AI Tooling", "raw_count": 78 }, { "name": "AI/ML Concepts (77)", "value": 77, "raw_name": "AI/ML Concepts", "raw_count": 77 }, { "name": "AI Orchestration (66)", "value": 66, "raw_name": "AI Orchestration", "raw_count": 66 }, { "name": "AI Automation & RPA (58)", "value": 58, "raw_name": "AI Automation & RPA", "raw_count": 58 }, { "name": "AI Coding & Design Assistants (51)", "value": 51, "raw_name": "AI Coding & Design Assistants", "raw_count": 51 }, { "name": "Conversational AI & NLP (49)", "value": 49, "raw_name": "Conversational AI & NLP", "raw_count": 49 }, { "name": "AI Models (Tools) (49)", "value": 49, "raw_name": "AI Models (Tools)", "raw_count": 49 }, { "name": "Responsible AI & Ethics (46)", "value": 46, "raw_name": "Responsible AI & Ethics", "raw_count": 46 }, { "name": "AI-Powered Solutions (30)", "value": 30, "raw_name": "AI-Powered Solutions", "raw_count": 30 }, { "name": "AI-Augmented Workflows (29)", "value": 29, "raw_name": "AI-Augmented Workflows", "raw_count": 29 }, { "name": "Predictive Analytics (26)", "value": 26, "raw_name": "Predictive Analytics", "raw_count": 26 }, { "name": "AI Prototyping & Interaction Design (25)", "value": 25, "raw_name": "AI Prototyping & Interaction Design", "raw_count": 25 }, { "name": "RAG & Vector Search (25)", "value": 25, "raw_name": "RAG & Vector Search", "raw_count": 25 }, { "name": "AI-Native Development (24)", "value": 24, "raw_name": "AI-Native Development", "raw_count": 24 }, { "name": "Recommendation Systems & Personalization (21)", "value": 21, "raw_name": "Recommendation Systems & Personalization", "raw_count": 21 }, { "name": "AI Strategy & Adoption (21)", "value": 21, "raw_name": "AI Strategy & Adoption", "raw_count": 21 }, { "name": "Risk & Bias Mitigation (20)", "value": 20, "raw_name": "Risk & Bias Mitigation", "raw_count": 20 }, { "name": "AI-Driven Product Features (20)", "value": 20, "raw_name": "AI-Driven Product Features", "raw_count": 20 }, { "name": "Computer Vision (18)", "value": 18, "raw_name": "Computer Vision", "raw_count": 18 }, { "name": "AI Infrastructure & Platforms (18)", "value": 18, "raw_name": "AI Infrastructure & Platforms", "raw_count": 18 }, { "name": "AI Evaluation & Quality (16)", "value": 16, "raw_name": "AI Evaluation & Quality", "raw_count": 16 }, { "name": "Model Training & Fine-Tuning (15)", "value": 15, "raw_name": "Model Training & Fine-Tuning", "raw_count": 15 }, { "name": "AI Use Cases & Content Intelligence (15)", "value": 15, "raw_name": "AI Use Cases & Content Intelligence", "raw_count": 15 }, { "name": "Assistive AI & Decisioning (12)", "value": 12, "raw_name": "Assistive AI & Decisioning", "raw_count": 12 }, { "name": "AI Governance & Security (9)", "value": 9, "raw_name": "AI Governance & Security", "raw_count": 9 }, { "name": "Model & Data Lifecycle (8)", "value": 8, "raw_name": "Model & Data Lifecycle", "raw_count": 8 }, { "name": "Human-in-the-Loop & RLHF (8)", "value": 8, "raw_name": "Human-in-the-Loop & RLHF", "raw_count": 8 }, { "name": "AI Integration & APIs (8)", "value": 8, "raw_name": "AI Integration & APIs", "raw_count": 8 }, { "name": "AI Inference & Edge Computing (8)", "value": 8, "raw_name": "AI Inference & Edge Computing", "raw_count": 8 }, { "name": "AI Product Management (5)", "value": 5, "raw_name": "AI Product Management", "raw_count": 5 }, { "name": "MLOps & Deployment (5)", "value": 5, "raw_name": "MLOps & Deployment", "raw_count": 5 }, { "name": "AI Observability (4)", "value": 4, "raw_name": "AI Observability", "raw_count": 4 }, { "name": "AI-Enabled Business Initiatives (4)", "value": 4, "raw_name": "AI-Enabled Business Initiatives", "raw_count": 4 }, { "name": "AI Research (2)", "value": 2, "raw_name": "AI Research", "raw_count": 2 }], "jobs_count": 809 }, { "name": "UX/UI\n(988)", "children": [{ "name": "User Research (UXR) (461)", "value": 461, "raw_name": "User Research (UXR)", "raw_count": 461 }, { "name": "User Experience (UX) (428)", "value": 428, "raw_name": "User Experience (UX)", "raw_count": 428 }, { "name": "Prototyping & Wireframing (233)", "value": 233, "raw_name": "Prototyping & Wireframing", "raw_count": 233 }, { "name": "UX/UI Tools (218)", "value": 218, "raw_name": "UX/UI Tools", "raw_count": 218 }, { "name": "Journey Mapping & User Flows (203)", "value": 203, "raw_name": "Journey Mapping & User Flows", "raw_count": 203 }, { "name": "Usability & Accessibility (133)", "value": 133, "raw_name": "Usability & Accessibility", "raw_count": 133 }, { "name": "Qualitative Feedback & Interviews (126)", "value": 126, "raw_name": "Qualitative Feedback & Interviews", "raw_count": 126 }, { "name": "User Interface (UI) & Interaction (109)", "value": 109, "raw_name": "User Interface (UI) & Interaction", "raw_count": 109 }, { "name": "Design Strategy & Reviews (75)", "value": 75, "raw_name": "Design Strategy & Reviews", "raw_count": 75 }, { "name": "Design Systems & Architecture (73)", "value": 73, "raw_name": "Design Systems & Architecture", "raw_count": 73 }, { "name": "Design Thinking & Ideation (51)", "value": 51, "raw_name": "Design Thinking & Ideation", "raw_count": 51 }, { "name": "User-Centered Design (UCD) (46)", "value": 46, "raw_name": "User-Centered Design (UCD)", "raw_count": 46 }, { "name": "Product Discovery & Validation (23)", "value": 23, "raw_name": "Product Discovery & Validation", "raw_count": 23 }, { "name": "Customer Centricity & Empathy (23)", "value": 23, "raw_name": "Customer Centricity & Empathy", "raw_count": 23 }, { "name": "Conversion & Optimization (UX/CRO) (22)", "value": 22, "raw_name": "Conversion & Optimization (UX/CRO)", "raw_count": 22 }, { "name": "Market & Consumer Insights (19)", "value": 19, "raw_name": "Market & Consumer Insights", "raw_count": 19 }, { "name": "Personas & Profiles (11)", "value": 11, "raw_name": "Personas & Profiles", "raw_count": 11 }, { "name": "Jobs-to-be-Done (JTBD) (6)", "value": 6, "raw_name": "Jobs-to-be-Done (JTBD)", "raw_count": 6 }, { "name": "Customer Segmentation (3)", "value": 3, "raw_name": "Customer Segmentation", "raw_count": 3 }, { "name": "Data Visualization (2)", "value": 2, "raw_name": "Data Visualization", "raw_count": 2 }, { "name": "Conversational UX (2)", "value": 2, "raw_name": "Conversational UX", "raw_count": 2 }, { "name": "Mobile App Design (1)", "value": 1, "raw_name": "Mobile App Design", "raw_count": 1 }], "jobs_count": 988 }] };

export function CompetencySunburstChart() {
  const [activeData, setActiveData] = React.useState(treeData.children);
  const sunburstPalette = [
    { type: "linear", x: 0, y: 0, x2: 1, y2: 1, colorStops: [{ offset: 0, color: "#60a5fa" }, { offset: 1, color: "#2563eb" }] },
    { type: "linear", x: 0, y: 0, x2: 1, y2: 1, colorStops: [{ offset: 0, color: "#34d399" }, { offset: 1, color: "#059669" }] },
    { type: "linear", x: 0, y: 0, x2: 1, y2: 1, colorStops: [{ offset: 0, color: "#fbbf24" }, { offset: 1, color: "#d97706" }] },
    { type: "linear", x: 0, y: 0, x2: 1, y2: 1, colorStops: [{ offset: 0, color: "#f87171" }, { offset: 1, color: "#dc2626" }] },
    { type: "linear", x: 0, y: 0, x2: 1, y2: 1, colorStops: [{ offset: 0, color: "#a78bfa" }, { offset: 1, color: "#7c3aed" }] },
    { type: "linear", x: 0, y: 0, x2: 1, y2: 1, colorStops: [{ offset: 0, color: "#22d3ee" }, { offset: 1, color: "#0891b2" }] }
  ];
  const sunburstCategories = treeData.children.map(c => c.name);

  const colorMap = useMemo(() => {
    const map: Record<string, any> = {};
    treeData.children.forEach((child, index) => {
      map[child.name] = sunburstPalette[index % sunburstPalette.length];
    });
    return map;
  }, []);

  const dummyPieData = sunburstCategories.map(name => ({
    name: name,
    value: 0,
    itemStyle: { color: colorMap[name] }
  }));

  const coloredActiveData = useMemo(() => {
    return activeData.map(item => ({
      ...item,
      itemStyle: { color: colorMap[item.name] }
    }));
  }, [activeData, colorMap]);

  const option = {
    color: activeData.map(d => colorMap[d.name]),
    tooltip: {
      trigger: 'item',
      formatter: function (params: any) {
        return `<b>${params.name}</b><br/>Repeticiones: ${params.value}`;
      }
    },
    legend: {
      data: sunburstCategories,
      bottom: 0,
      selectedMode: 'multiple'
    },
    series: [
      {
        type: 'pie',
        data: dummyPieData,
        radius: [0, 0],
        label: { show: false },
        labelLine: { show: false }
      },
      {
        id: 'mainSunburst',
        type: 'sunburst',
        data: coloredActiveData,
        radius: [0, '85%'],
        center: ['50%', '45%'],
        sort: undefined,
        emphasis: {
          focus: 'ancestor'
        },
        levels: [
          { // Root center
            itemStyle: { color: '#ffffff' },
            label: { color: '#0f172a', align: 'center', verticalAlign: 'middle', fontWeight: 'bold' }
          },
          { // Nivel 1: Areas (Data, Core PM, etc)
            r0: '15%',
            r: '40%',
            itemStyle: { borderWidth: 2 },
            label: { rotate: 'tangential', fontWeight: 700, fontSize: 13 }
          },
          { // Nivel 2: Skills
            r0: '40%',
            r: '85%',
            itemStyle: { borderWidth: 1 },
            label: { rotate: 'radial', align: 'right', fontSize: 10, minAngle: 4 }
          },
          { // Nivel 3: Otros Skills (Resto)
            r0: '85%',
            r: '90%',
            itemStyle: { borderWidth: 1 },
            label: { align: 'right', fontSize: 9 }
          }
        ]
      }
    ]
  };

  const onEvents = {
    legendselectchanged: (params: any) => {
      const selected = params.selected;
      const newData = treeData.children.filter((item: any) => selected[item.name] !== false);
      setActiveData(newData);
    }
  };

  return (
    <div className="flex flex-col h-[700px] w-full">
      <ReactECharts
        option={option}
        style={{ height: '100%', width: '100%' }}
        opts={{ renderer: 'svg' }}
        onEvents={onEvents}
      />
    </div>
  );
}
