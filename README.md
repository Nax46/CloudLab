# ☁️ CloudLab — Interactive Cloud Computing Learning & Simulation Platform

> **Academic Alignment:** BCA Honors Semester V — *Fundamental of Cloud Computing (FCC)*  
> **Platform Type:** Interactive Educational Information & Simulation System  
> **Access Model:** 100% Public Read-Only Access — **Zero Login / No Authentication Required**

---

## 📌 1. Project Overview

**CloudLab** is a full-stack, syllabus-aligned, interactive educational web platform built from scratch to teach foundational and advanced cloud computing principles for the BCA Honors Semester V curriculum (*Fundamental of Cloud Computing - FCC*).

Unlike static documentation sites or heavyweight learning management systems (LMS), CloudLab combines:
- **Comprehensive Database-Driven Curriculum:** 6 complete academic units covering NIST definitions, virtualization, cloud architecture, security, storage architectures, and emerging technologies.
- **9 Hands-on Interactive Simulators:** Real computational simulators (hypervisor resource allocation, load balancing, architecture topologies, storage replication, serverless cold starts, and data center PUE).
- **Unit Mastery Quizzes:** Self-paced knowledge checks with instant feedback, explanations, and score tracking stored anonymously in client-side storage.
- **Provider Comparisons & Real Case Studies:** In-depth architectural breakdowns of AWS, Azure, Google Cloud, and production architectures from Netflix, Dropbox, and Spotify.
- **Live Database + Offline Resilience:** Real-time data streaming from **MongoDB Atlas** with an instant, high-fidelity **Local Demo Mode** fallback whenever a cloud database is unreachable.

---

## 🏗️ 2. System Architecture & Tech Stack

```
┌────────────────────────────────────────────────────────────────────────┐
│                        CLIENT BROWSER (PORT 5173)                      │
│                                                                        │
│   React 18 + TypeScript + Vite + Tailwind CSS + Lucide Icons + Recharts│
│                                                                        │
│   ┌────────────────────────────────────────────────────────────────┐   │
│   │                    CENTRAL DATA ACCESS LAYER                   │   │
│   │                                                                │   │
│   │  apiClient.ts ───► Live Express REST API (GET /api/*)          │   │
│   │        │                                                       │   │
│   │        └─────────► Auto-Fallback / Local Demo Mode (mockData)  │   │
│   └────────────────────────────────────────────────────────────────┘   │
└───────────────────────────────────▲────────────────────────────────────┘
                                    │ HTTP / JSON (Read-Only)
                                    │ CORS + Helmet + Rate Limit
┌───────────────────────────────────▼────────────────────────────────────┐
│                  BACKEND REST API SERVER (PORT 5000)                   │
│                                                                        │
│   Node.js + Express.js + TypeScript                                    │
│   - Security Middleware: readOnly.ts (HTTP 403 on POST/PUT/DELETE)     │
│   - Mongoose ODM Models: Unit, Topic, Lesson, Quiz, LabConfig, etc.    │
│   - REST Endpoints: /api/units, /api/topics, /api/labs, /api/search... │
└───────────────────────────────────▲────────────────────────────────────┘
                                    │ TLS / SCRAM-SHA-256
                                    │ Private backend connection
┌───────────────────────────────────▼────────────────────────────────────┐
│                       MONGODB ATLAS (CLOUD CLUSTER)                    │
│                                                                        │
│   M0 Free-Tier Cluster (Replica Set)                                  │
│   - Idempotent Seed Script (server/src/scripts/seed.ts)                │
│   - 10 Collections with Normalized Indices & Unique Slugs              │
└────────────────────────────────────────────────────────────────────────┘
```

### Technology Matrix

| Layer | Technologies | Key Responsibilities |
| :--- | :--- | :--- |
| **Frontend** | React 18, TypeScript, Vite, Tailwind CSS, Lucide React, Recharts | Responsive dark-mode UI, 9 simulators, breadcrumbs, search modal, client-side progress |
| **Backend** | Node.js, Express.js, TypeScript | REST API endpoints, CORS security, rate limiting, centralized error handling |
| **Database** | MongoDB Atlas, Mongoose ODM | Normalized document models, unique slug indexes, idempotent seed pipeline |
| **Security** | Helmet, Express Rate Limit, Read-Only Enforcer | Strict public read-only protection, block mutations, secret encapsulation |
| **Testing** | Vitest, Testing Library React, JSDOM | Unit tests for data access layer, interactive lab math, and auth-free UI verification |

---

## 🔒 3. Public Read-Only Security Architecture

1. **Zero Authentication Policy:**
   - No login, registration, password reset, or user account forms exist in the codebase.
   - The platform is immediately accessible to any student, teacher, or evaluator without barriers.
2. **Read-Only API Protection (`readOnly.ts`):**
   - The Express server strictly enforces `GET` and `HEAD` access on public API routes. Any attempt to send `POST`, `PUT`, `PATCH`, or `DELETE` requests results in a clean `403 Forbidden` response.
3. **Database Credential Isolation:**
   - The browser **never** connects directly to MongoDB Atlas.
   - `MONGODB_URI` resides solely in backend environment variables (`server/.env`).

---

## 📚 4. Syllabus Coverage (All 6 Units)

CloudLab implements the full BCA Honors Semester V FCC syllabus:

- **Unit 1: Introduction to Cloud Computing**
  - Definition, historical evolution, and 5 essential NIST characteristics.
  - Traditional On-Premises IT vs Cloud Computing comparison matrix.
  - Service models (IaaS, PaaS, SaaS) and Deployment models (Public, Private, Hybrid, Community).
  - Cloud vs Grid vs Utility Computing.
- **Unit 2: Virtualization in Cloud Computing**
  - Hardware, OS, Server, Storage, and Network virtualization.
  - Type 1 (Bare-Metal) vs Type 2 (Hosted) Hypervisors.
  - Virtual Machines vs Linux Containers (Docker & Kubernetes overview).
  - Resource provisioning, VM migration techniques, and Load Balancing algorithms.
- **Unit 3: Cloud Architecture, Services, and Models**
  - Service-Oriented Architecture (SOA), Multi-Tenancy models, and Resource Pooling.
  - Elasticity vs Scalability; On-Demand self-service mechanics.
  - Advanced models: Function-as-a-Service (FaaS), Container-as-a-Service (CaaS), Desktop-as-a-Service (DaaS).
  - Microservices vs Monolith architectures; 12-Factor cloud application design.
- **Unit 4: Cloud Security and Privacy**
  - CIA Triad (Confidentiality, Integrity, Availability) in shared cloud environments.
  - Threat taxonomy: Data breaches, Account hijacking, and Distributed Denial of Service (DDoS).
  - Identity & Access Management (IAM), Least Privilege, and Multi-Factor Authentication.
  - Encryption in Transit (TLS 1.3) and At Rest (AES-256).
  - Compliance frameworks: ISO/IEC 27001, NIST SP 800-53, GDPR, HIPAA.
  - Disaster Recovery (RTO & RPO metrics) and Business Continuity Planning.
- **Unit 5: Cloud Storage and Data Management**
  - Block Storage (AWS EBS) vs File Storage (AWS EFS) vs Object Storage (AWS S3, Google Cloud Storage).
  - Storage replication models (LRS, ZRS, GRS) and CAP theorem (Consistency, Availability, Partition Tolerance).
  - Big Data storage fundamentals: Hadoop Distributed File System (HDFS) architecture.
  - Content Delivery Networks (CDN) and edge edge caching mechanisms.
- **Unit 6: Cloud Trends, Standards, and Future Scope**
  - Standardization bodies: IEEE Cloud Computing Standard & NIST.
  - Serverless architecture paradigms, Edge computing, and Mobile Cloud Computing (MCC).
  - Artificial Intelligence & Machine Learning in cloud infrastructure.
  - Green Cloud Computing: Power Usage Effectiveness (PUE) and renewable-powered hyperscalers.
  - Cloud migration frameworks: Gartner’s 6 Rs (Rehost, Replatform, Repurchase, Refactor, Retain, Retire).
  - Industry 4.0 IoT integration and Quantum Cloud Computing (IBM Quantum, Amazon Braket).

---

## 🧪 5. Interactive Labs Directory

CloudLab includes 9 fully functioning interactive laboratories with live calculations:

| Lab | Identifier | Description | Key Interactive Controls |
| :--- | :--- | :--- | :--- |
| **Lab A** | `service-models` | Cloud Service Models Explorer | Toggle between IaaS, PaaS, SaaS with interactive shared responsibility stack |
| **Lab B** | `deployment-models` | Deployment Models Explorer | Compare Public, Private, Hybrid, Community cloud isolation, SLA, and costs |
| **Lab C** | `virtualization` | Virtualization Resource Simulator | Configure VM count, vCPU, RAM, workload. Computes physical host overcommit warnings |
| **Lab D** | `load-balancing` | Load Balancing Simulator | Dispatch HTTP traffic via Round-Robin across servers; toggle server health & test failover |
| **Lab E** | `architecture-builder`| Cloud Architecture Designer | Add Clients, API Gateways, Microservices, Databases, CDNs, Object Storage to interactive canvas |
| **Lab F** | `security-lab` | Cloud Security & CIA Triad Lab | Interactive breach & mitigation scenarios (DDoS, SQLi, ransomware, credential leakage) |
| **Lab G** | `storage-explorer` | Cloud Storage Architecture Explorer| Compare Block, File, and Object storage throughput, IOPS, and API payloads |
| **Lab H** | `backup-replication`| Backup & Replication Simulator | Trigger snapshot creation, cross-region replication, and failover disaster recovery tests |
| **Lab I** | `future-cloud` | Emerging Cloud Technologies Lab | Cold-start latency benchmark, Edge vs Cloud round-trip calculator, Green Cloud PUE calculator |

---

## 🚀 6. Local Setup and Installation

### Prerequisites
- **Node.js** v18.0.0 or higher
- **npm** v9.0.0 or higher
- *(Optional)* Free **MongoDB Atlas** account (or local MongoDB Community Server on port 27017)

### Step 1: Clone or Navigate to the Workspace
```bash
cd Mayuri-Fcc
```

### Step 2: Install Dependencies
Install dependencies for both frontend and backend:
```bash
# Install frontend dependencies
npm install

# Install backend dependencies
npm run server:install
```

### Step 3: Configure Environment Variables

**Frontend Configuration:**
Create `.env` in the root directory:
```bash
cp .env.example .env
```
Default content of `.env`:
```env
VITE_API_URL=http://localhost:5000/api
VITE_USE_LOCAL_DEMO=false
```

**Backend Configuration:**
Create `server/.env` in the `server` directory:
```bash
cp server/.env.example server/.env
```
Content of `server/.env`:
```env
# MongoDB Atlas Connection String
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/cloudlab?retryWrites=true&w=majority

PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```
> *Tip: If you do not have a MongoDB connection string yet, the frontend will automatically run in **Local Demo Mode** without crashing or erroring.*

---

## 🗄️ 7. Database Seeding (MongoDB Atlas)

When you are ready to populate your MongoDB Atlas cluster with the full curriculum:

```bash
# Execute the idempotent seed script
npm run server:seed
```

**What the seed script does:**
1. Connects securely to `MONGODB_URI`.
2. Upserts all **6 Units** with full objectives, syllabus mapping, and estimated reading times.
3. Inserts all **Topics** and **Lessons** with practical real-world examples.
4. Populates all **Quizzes** and **Questions** with explanations and difficulty ratings.
5. Populates all **9 Lab Configurations**, **Cloud Providers**, **Case Studies**, **Glossary Terms**, and **Learning Resources**.
6. **Idempotency Guarantee:** Can be run multiple times safely without creating duplicate records.

---

## 💻 8. Running the Application Locally

### Method A: Running Backend and Frontend Concurrently

In **Terminal 1** (Backend Express Server):
```bash
npm run server:dev
```
*Backend starts on `http://localhost:5000` with endpoints available at `/api/`.*

In **Terminal 2** (Frontend Vite Server):
```bash
npm run dev
```
*Frontend opens at `http://localhost:5173`.*

Open your browser to `http://localhost:5173` to interact with CloudLab.

---

## 🧪 9. Running Tests

Execute the comprehensive unit test suite:
```bash
npm test
```

### Test Coverage Highlights
- `src/test/services.test.ts`: Verifies data access layer querying units, topics, labs, quizzes, providers, case studies, glossary, and search.
- `src/test/labs.test.ts`: Verifies mathematical models for virtualization overcommit calculations, round-robin load balancer distribution, and data center PUE efficiency ratios.
- `src/test/components.test.tsx`: Validates UI layout, breadcrumb chains, mode indicators, and strictly asserts that **zero authentication or login controls** are rendered.

### Production Build Verification
To compile both frontend and backend for production deployment:
```bash
npm run build:all
```

---

## 🌐 10. Free Deployment Guide

### A. Frontend Deployment (Vercel)
1. Push the code to a GitHub repository.
2. Log in to [Vercel](https://vercel.com/) and click **Add New Project**.
3. Select your repository.
4. Configure Build Settings:
   - **Framework Preset:** Vite
   - **Root Directory:** `./`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
5. Add Environment Variable:
   - `VITE_API_URL`: `https://your-backend-domain.onrender.com/api`
6. Click **Deploy**. SPA routing is pre-configured via [vercel.json](file:///n:/Mayuri-Fcc/vercel.json).

### B. Backend Deployment (Render Free Web Service)
1. In [Render](https://render.com/), create a new **Web Service**.
2. Connect your repository.
3. Configure Settings:
   - **Root Directory:** `server`
   - **Environment:** `Node`
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `npm start`
4. Add Environment Variables:
   - `MONGODB_URI`: Your MongoDB Atlas connection URI.
   - `NODE_ENV`: `production`
   - `FRONTEND_URL`: Your Vercel frontend URL (e.g., `https://cloudlab.vercel.app`).
5. Click **Create Web Service**.

---

## 🎓 11. Step-by-Step College Demonstration Script

Use this 5-stage walkthrough to showcase CloudLab to professors, external examiners, and students:

### Stage 1: Introduction & Architecture (1.5 Minutes)
1. Open the homepage at `/`.
2. Point out the CloudLab header with the **BCA FCC** academic badge.
3. Highlight that **no login or registration is required** — any student can open the platform and start learning immediately.
4. Point out the top **Status Indicator Banner**: explain that it transparently indicates whether the platform is querying live **MongoDB Atlas** or operating in **Local Demo Mode**.

### Stage 2: Database-Driven Syllabus Navigation (2.5 Minutes)
1. Navigate to `/units`. Show all 6 FCC syllabus units loaded dynamically.
2. Click on **Unit 2: Virtualization in Cloud Computing** (`/units/unit-2-virtualization-in-cloud-computing`).
3. Show the learning objectives, estimated time, and topics breakdown.
4. Click into topic **Type 1 vs Type 2 Hypervisors** (`/topics/u2-hypervisors-type1-type2`).
5. Demonstrate the structured definition, detailed explanation, key points bullet points, and real-world VMware ESXi vs VirtualBox comparison table.

### Stage 3: Interactive Simulations (3 Minutes)
1. Open `/labs` and select **Virtualization Resource Simulator** (`/labs/virtualization`).
2. Move the sliders to allocate 4 VMs with 16 vCPUs and 32GB RAM on a 16-core host. Show the live utilization graphs.
3. Add a 5th VM to exceed 16 vCPUs: show the immediate **Overcommitment Alert** and explain how hypervisors handle CPU contention.
4. Switch to **Load Balancing Simulator** (`/labs/load-balancing`). Send 100 requests and show the even round-robin distribution.
5. Click **Take Offline** on Server 2: send another 100 requests to demonstrate automated health checks and failover to healthy nodes.
6. Switch to **Cloud Architecture Builder** (`/labs/architecture`). Add Client -> API Gateway -> Microservices -> Database, and demonstrate how connection arrows and latency topologies dynamically render.

### Stage 4: Unit Mastery Quizzes & Anonymized Progress (2 Minutes)
1. Navigate to `/quiz`. Select the **Unit 1 Fundamentals Quiz**.
2. Answer questions: highlight the instant feedback explaining *why* an answer is correct or incorrect.
3. Complete the quiz and view the celebratory confetti and score breakdown.
4. Navigate to `/dashboard`: show that completed topics, labs explored, and quiz scores are recorded locally without collecting any personal data.

### Stage 5: Provider Comparisons & Terminology (1 Minute)
1. Open `/providers`: review the side-by-side comparison of **AWS vs Microsoft Azure vs Google Cloud**.
2. Open `/case-studies`: review how Netflix uses AWS for global streaming and how Dropbox migrated to a hybrid custom storage infrastructure.
3. Press `Ctrl + K` to trigger the **Global Search Modal**: type `NIST` or `hypervisor` to show instant real-time indexing across all units, topics, and glossary terms.

---

## 📄 12. Verification & Deliverables Summary

- [x] Full source code for Frontend (React, TypeScript, Vite, Tailwind CSS).
- [x] Full source code for Backend (Node.js, Express, TypeScript).
- [x] 10 Normalized Mongoose Schemas & Models.
- [x] Idempotent seed script (`server/src/scripts/seed.ts`) with all 6 FCC syllabus units.
- [x] 9 interactive computational laboratories.
- [x] Unit mastery quiz runner with immediate feedback.
- [x] Responsive layout with dark modern aesthetics.
- [x] Read-only security middleware blocking public write operations.
- [x] Auto-detecting Local Demo fallback mode with status banner.
- [x] 21 automated unit tests across data access, simulators, and UI.
- [x] Zero authentication / zero signup friction.
