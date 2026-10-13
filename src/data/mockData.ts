import {
  Unit,
  Topic,
  Lesson,
  Quiz,
  LabConfiguration,
  CloudProvider,
  CaseStudy,
  GlossaryTerm,
  LearningResource,
} from '../types/database';

export const mockUnits: Unit[] = [
  {
    id: 'unit-1',
    unit_number: 1,
    slug: 'unit-1-intro-to-cloud-computing',
    title: 'Unit 1: Introduction to Cloud Computing',
    short_description: 'Core definitions, evolution, NIST characteristics, service and deployment models, and foundational cloud principles.',
    description: 'Explore the fundamental concepts of cloud computing, tracing its historical evolution from mainframe computing and virtualization to modern utility computing. Understand the NIST SP 800-145 essential characteristics, explore IaaS, PaaS, SaaS, and evaluate Public, Private, Hybrid, and Community cloud deployment models.',
    learning_objectives: [
      'Define cloud computing according to NIST SP 800-145 standards',
      'Differentiate between traditional on-premise IT infrastructure and cloud computing',
      'Analyze the three primary service models: IaaS, PaaS, and SaaS',
      'Evaluate cloud deployment models: Public, Private, Hybrid, and Community Cloud',
      'Distinguish cloud computing from Grid computing and Utility computing',
      'Identify key benefits, business drivers, and operational challenges of cloud adoption'
    ],
    estimated_minutes: 90,
    icon: 'Cloud',
    published: true,
    display_order: 1,
  },
  {
    id: 'unit-2',
    unit_number: 2,
    slug: 'unit-2-virtualization-in-cloud',
    title: 'Unit 2: Virtualization in Cloud Computing',
    short_description: 'Hardware, server, and storage virtualization, hypervisors, containers, Docker, Kubernetes, and VM management.',
    description: 'Master the technological backbone of cloud computing: virtualization. Examine hardware, OS, server, storage, and network virtualization. Compare Type-1 bare-metal and Type-2 hosted hypervisors, explore virtual machines vs OS-level containers (Docker/Kubernetes), and understand live VM migration and load balancing.',
    learning_objectives: [
      'Explain the principles and taxonomy of virtualization in modern computing',
      'Compare Type 1 (bare-metal) and Type 2 (hosted) hypervisors with real-world examples',
      'Differentiate between Virtual Machines (VMs) and Containers (Docker/Kubernetes)',
      'Understand resource virtualization, memory ballooning, and CPU overcommitment',
      'Analyze live VM migration techniques, dirty page tracking, and cold migration',
      'Explain how virtualization underpins multi-tenant cloud elasticity'
    ],
    estimated_minutes: 110,
    icon: 'Cpu',
    published: true,
    display_order: 2,
  },
  {
    id: 'unit-3',
    unit_number: 3,
    slug: 'unit-3-cloud-architecture-services-models',
    title: 'Unit 3: Cloud Architecture, Services, and Models',
    short_description: 'Cloud architecture frameworks, SOA, multi-tenancy, elasticity vs scalability, FaaS, CaaS, and microservices.',
    description: 'Delve into cloud architectural design. Study layered cloud frameworks, Service Oriented Architecture (SOA), multi-tenant data isolation patterns, and the critical distinction between scalability and elasticity. Explore contemporary service models including FaaS (Serverless), CaaS, and DaaS, and learn microservice application design.',
    learning_objectives: [
      'Deconstruct the logical reference architecture of cloud platforms',
      'Contrast vertical scaling (scale-up) with horizontal elasticity (scale-out)',
      'Analyze multi-tenancy architectures, tenant isolation, and noisy neighbor mitigation',
      'Examine modern compute paradigms: FaaS (Serverless), CaaS, and DaaS',
      'Understand Service Oriented Architecture (SOA) and decoupled microservices design',
      'Apply cloud-native application design principles (12-Factor App, circuit breakers)'
    ],
    estimated_minutes: 120,
    icon: 'Layers',
    published: true,
    display_order: 3,
  },
  {
    id: 'unit-4',
    unit_number: 4,
    slug: 'unit-4-cloud-security-and-privacy',
    title: 'Unit 4: Cloud Security and Privacy',
    short_description: 'The CIA triad, threat vectors, IAM, encryption at rest and in transit, regulatory compliance, and disaster recovery.',
    description: 'Investigate the critical aspects of securing cloud workloads. Master the CIA Triad in multi-tenant environments, explore top cloud threats (DDoS, data breaches, account hijacking), implement Identity and Access Management (IAM), understand encryption standards (AES-256, TLS 1.3), and evaluate compliance frameworks such as ISO 27001, NIST, GDPR, and HIPAA.',
    learning_objectives: [
      'Apply the CIA Triad (Confidentiality, Integrity, Availability) to cloud systems',
      'Analyze major cloud threats including DDoS, credential harvesting, and misconfigurations',
      'Design Identity and Access Management (IAM) role-based policies following least privilege',
      'Implement data encryption strategies: In-transit, At-rest, and In-use (confidential computing)',
      'Compare industry standards and regulatory compliance: ISO 27001, NIST SP 800-53, GDPR, HIPAA',
      'Formulate Disaster Recovery (DR) strategies using RTO and RPO metrics'
    ],
    estimated_minutes: 105,
    icon: 'ShieldCheck',
    published: true,
    display_order: 4,
  },
  {
    id: 'unit-5',
    unit_number: 5,
    slug: 'unit-5-cloud-storage-data-management',
    title: 'Unit 5: Cloud Storage and Data Management',
    short_description: 'Block, file, and object storage systems, Amazon S3, Google Cloud Storage, backup, replication, HDFS, and CDNs.',
    description: 'Explore scalable storage architectures powering modern applications. Compare Block, File, and Object storage paradigms with real-world services like Amazon S3 and Google Cloud Storage. Understand distributed data consistency (CAP theorem, PACELC), HDFS big data foundations, multi-region replication, and Content Delivery Networks (CDNs).',
    learning_objectives: [
      'Compare Block storage (EBS/SAN), File storage (EFS/NAS), and Object storage (S3/GCS)',
      'Understand Amazon S3 and Google Cloud Storage architecture: buckets, immutable objects, and tiering',
      'Evaluate data consistency models: Strong consistency vs Eventual consistency and the CAP theorem',
      'Analyze HDFS architecture: NameNode, DataNodes, and block replication factors',
      'Design backup, multi-region snapshotting, and disaster recovery replication pipelines',
      'Explain how Content Delivery Networks (CDNs) cache data at edge Points of Presence (PoPs)'
    ],
    estimated_minutes: 100,
    icon: 'Database',
    published: true,
    display_order: 5,
  },
  {
    id: 'unit-6',
    unit_number: 6,
    slug: 'unit-6-cloud-trends-standards-future-scope',
    title: 'Unit 6: Cloud Trends, Standards, and Future Scope',
    short_description: 'Industry standards, serverless, edge computing, AI in cloud, green cloud computing, migration 6 Rs, and case studies.',
    description: 'Examine cutting-edge developments shaping the future of cloud computing. Study IEEE and NIST cloud standards, edge and fog computing, serverless architectures, AI/ML cloud workloads, and green computing. Master Gartner 6 Rs migration strategies and analyze comprehensive case studies including Netflix on AWS and Dropbox infrastructure repatriation.',
    learning_objectives: [
      'Review international cloud standards established by IEEE, NIST, and Cloud Security Alliance',
      'Analyze emerging compute models: Edge computing, Fog computing, and Serverless FaaS',
      'Evaluate AI/ML acceleration in cloud environments and managed training/inference pipelines',
      'Assess Green Cloud computing metrics: Power Usage Effectiveness (PUE) and sustainability',
      'Formulate enterprise cloud migration plans using Gartner 6 Rs framework',
      'Evaluate real-world enterprise architectures: Netflix on AWS and Dropbox storage repatriation'
    ],
    estimated_minutes: 115,
    icon: 'TrendingUp',
    published: true,
    display_order: 6,
  },
];

export const mockTopics: Topic[] = [
  {
    id: 't-1',
    unit_id: 'unit-1',
    slug: 'u1-definition-evolution-characteristics',
    title: 'Cloud Definition, Evolution & NIST Characteristics',
    short_description: 'The official NIST SP 800-145 definition, historical lineage from mainframe to cloud, and the 5 essential characteristics.',
    content: `According to the National Institute of Standards and Technology (NIST SP 800-145), Cloud Computing is a model for enabling ubiquitous, convenient, on-demand network access to a shared pool of configurable computing resources (e.g., networks, servers, storage, applications, and services) that can be rapidly provisioned and released with minimal management effort or service provider interaction.

The 5 Essential Characteristics defined by NIST:
1. On-Demand Self-Service: A consumer can unilaterally provision computing capabilities automatically without requiring human interaction.
2. Broad Network Access: Capabilities are accessible over standard network protocols by heterogeneous thin/thick clients.
3. Resource Pooling: Provider computing resources are pooled to serve multiple consumers in a multi-tenant model.
4. Rapid Elasticity: Capabilities can be provisioned and released elastically to scale rapidly outward and inward.
5. Measured Service: Resource usage is automatically metered, monitored, controlled, and reported transparently.`,
    key_points: [
      'NIST SP 800-145 defines the canonical industry benchmark for cloud computing.',
      'Five essential characteristics: On-demand self-service, Broad network access, Resource pooling, Rapid elasticity, Measured service.',
      'Cloud evolved from Mainframes -> Time-sharing -> Client-Server -> Cluster -> Grid -> Cloud computing.',
      'Multi-tenancy enables location independence for end users.'
    ],
    real_world_example: 'An e-commerce portal during flash sales automatically spins up 50 extra web server instances via Auto Scaling across pooled hypervisors without human intervention, paying only for the exact compute seconds consumed.',
    display_order: 1,
    published: true,
  },
  {
    id: 't-2',
    unit_id: 'unit-1',
    slug: 'u1-traditional-it-vs-cloud',
    title: 'Traditional On-Premise IT vs Cloud Computing',
    short_description: 'CapEx vs OpEx economic models, hardware provisioning cycles, maintenance overhead, and operational agility.',
    content: `Traditional on-premise IT requires organizations to purchase, house, power, cool, and maintain physical server hardware.
1. CapEx vs OpEx: Traditional IT is CapEx heavy with millions spent upfront on depreciating hardware. Cloud shifts expenditure to OpEx (pay-as-you-go).
2. Provisioning Speed: Traditional procurement takes 6-12 weeks; cloud provisioning takes under 2 minutes.
3. Disaster Recovery: Traditional requires secondary physical data centers; cloud offers multi-AZ redundancy.`,
    key_points: [
      'CapEx represents upfront capital on physical assets; OpEx represents ongoing operational expenses.',
      'Cloud eliminates over-provisioning waste for idle peak capacity.',
      'Hardware refresh and cooling maintenance are offloaded to hyperscale providers.'
    ],
    real_world_example: 'A video streaming startup launches globally on AWS for $50/month instead of borrowing $150,000 for server racks, power supplies, and colocation leases.',
    display_order: 2,
    published: true,
  },
  {
    id: 't-3',
    unit_id: 'unit-1',
    slug: 'u1-service-models-iaas-paas-saas',
    title: 'Cloud Service Models: IaaS, PaaS, and SaaS',
    short_description: 'The foundational SPI service hierarchy, shared responsibility matrix, and workload trade-offs.',
    content: `1. Infrastructure as a Service (IaaS): Raw virtualized compute, storage, networking (Amazon EC2, GCP Compute Engine). Customer manages OS, runtime, and app.
2. Platform as a Service (PaaS): Managed execution environment where developers deploy code without managing servers (Vercel, Heroku, AWS Elastic Beanstalk).
3. Software as a Service (SaaS): Complete turnkey applications hosted centrally (Google Workspace, Microsoft 365, Salesforce).`,
    key_points: [
      'The Shared Responsibility Model shifts management burden up the stack from IaaS -> PaaS -> SaaS.',
      'IaaS offers maximum configuration freedom with higher operational overhead.',
      'PaaS accelerates software delivery; SaaS delivers instant business functionality.'
    ],
    real_world_example: 'A company runs their core backend microservices on AWS EC2 (IaaS), deploys their web frontend on Vercel (PaaS), and uses Google Workspace (SaaS) for corporate email.',
    display_order: 3,
    published: true,
  },
  {
    id: 't-4',
    unit_id: 'unit-2',
    slug: 'u2-virtualization-types-hypervisors',
    title: 'Virtualization Taxonomy & Hypervisors (Type 1 vs Type 2)',
    short_description: 'Hardware, server, storage, and network virtualization, bare-metal vs hosted hypervisor architectures.',
    content: `Virtualization abstracts physical computing hardware to run multiple isolated virtual environments:
- Type 1 Hypervisor (Bare-Metal): Runs directly on host hardware (VMware ESXi, KVM, Xen, Hyper-V). High performance, production cloud standard.
- Type 2 Hypervisor (Hosted): Runs as an application inside a host operating system (VirtualBox, VMware Workstation). Ideal for local development.`,
    key_points: [
      'Virtualization turns dedicated hardware into flexible, software-programmable pools.',
      'Type 1 (Bare-Metal) hypervisors run directly on silicon: high performance cloud standard.',
      'Type 2 (Hosted) hypervisors run atop a host OS for developer testing.'
    ],
    real_world_example: 'AWS Nitro uses a specialized Type 1 hypervisor architecture running on dedicated PCIe hardware cards to eliminate hypervisor overhead.',
    display_order: 1,
    published: true,
  },
  {
    id: 't-5',
    unit_id: 'unit-2',
    slug: 'u2-vms-vs-containers',
    title: 'Virtual Machines vs Containers (Docker & Kubernetes)',
    short_description: 'Hardware-level vs OS-level virtualization, guest OS overhead, container runtimes, and Kubernetes orchestration.',
    content: `1. Virtual Machines: Abstract physical hardware; each VM bundles a complete Guest OS kernel, resulting in larger disk footprint and slower boot times.
2. Containers: Abstract the operating system; share the host OS kernel using Linux namespaces and cgroups for lightweight sub-second startup.
3. Kubernetes: Automates container scheduling, auto-scaling, fault recovery, and service discovery.`,
    key_points: [
      'VMs virtualize hardware; containers virtualize the operating system.',
      'Containers achieve 10x higher deployment density and sub-second startup times.',
      'Kubernetes automates container cluster orchestration at scale.'
    ],
    real_world_example: 'A 64 GB RAM physical server can host approximately 15 full Linux VMs, but can run over 250 microservice Docker containers using shared Linux kernel resources.',
    display_order: 2,
    published: true,
  },
  {
    id: 't-6',
    unit_id: 'unit-3',
    slug: 'u3-cloud-architecture-framework',
    title: 'Cloud Architecture Framework & Service Oriented Architecture',
    short_description: 'Logical cloud reference models, loose coupling, Service Oriented Architecture (SOA), and orchestration engines.',
    content: `Cloud architecture breaks into front-end clients, backend infrastructure, cloud storage, and management orchestrators.
SOA principles: Loose coupling, standardized REST/gRPC interfaces, service reusability, and autonomous discoverability.`,
    key_points: [
      'Cloud architecture splits into front-end clients, management orchestration, and back-end physical/virtual pools.',
      'The cloud orchestrator coordinates VM lifecycle and resource scheduling.',
      'SOA emphasizes loose coupling and API-driven automation.'
    ],
    real_world_example: 'Executing `aws ec2 run-instances` triggers an orchestration API call to reserve hypervisor slots, attach EBS block storage, and boot in seconds.',
    display_order: 1,
    published: true,
  },
  {
    id: 't-7',
    unit_id: 'unit-4',
    slug: 'u4-cia-triad-cloud-threats',
    title: 'The CIA Triad & Top Cloud Security Threats',
    short_description: 'Confidentiality, Integrity, and Availability in multi-tenant clouds; DDoS, data breaches, and credential exploitation.',
    content: `1. CIA Triad: Confidentiality (encryption, IAM), Integrity (hashes, digital signatures), Availability (multi-AZ redundancy, DDoS mitigation).
2. Major Threats: Misconfigurations (leading cause of breaches), DDoS attacks, compromised credentials, insecure APIs, and insider threats.`,
    key_points: [
      'The CIA Triad forms the cornerstone of cloud security architecture.',
      'Cloud misconfiguration is the #1 root cause of enterprise data breaches.',
      'Defense-in-depth requires layered controls across network, identity, and data.'
    ],
    real_world_example: 'The Capital One breach occurred due to an SSRF vulnerability on an EC2 instance with excessive IAM role permissions.',
    display_order: 1,
    published: true,
  },
  {
    id: 't-8',
    unit_id: 'unit-5',
    slug: 'u5-block-file-object-storage',
    title: 'Cloud Storage Paradigms: Block, File, and Object Storage',
    short_description: 'Deep architectural comparison of SAN/EBS block storage, NAS/EFS file systems, and RESTful S3 object stores.',
    content: `1. Block Storage (EBS, SAN): Raw sector addresses; ultra-low latency, random read/writes; best for transactional databases.
2. File Storage (EFS, NFS): Hierarchical folder tree; POSIX shared access across multiple VMs.
3. Object Storage (S3, GCS): Flat namespace with unique keys and metadata; accessed via REST APIs; 11 nines durability; best for media and backups.`,
    key_points: [
      'Block Storage operates at raw sector level for databases and OS boot drives.',
      'File Storage provides shared POSIX directory access across instances.',
      'Object Storage provides flat REST access with virtually limitless scalability.'
    ],
    real_world_example: 'A web app uses EBS for PostgreSQL data files, EFS for shared configuration files, and S3 for user photo uploads.',
    display_order: 1,
    published: true,
  },
  {
    id: 't-9',
    unit_id: 'unit-6',
    slug: 'u6-cloud-migration-and-case-studies',
    title: 'Cloud Migration Strategies (Gartner 6 Rs) & Enterprise Case Studies',
    short_description: 'Gartner 6 Rs migration framework, Netflix full-cloud migration, and Dropbox storage repatriation analysis.',
    content: `1. Gartner 6 Rs: Rehost (Lift and shift), Replatform, Repurchase, Refactor, Retire, Retain.
2. Netflix: Migrated 100% to AWS after 2008 database outage; pioneered Chaos Engineering.
3. Dropbox: Migrated 500+ PB of files off AWS S3 to custom Magic Pocket infrastructure, saving $75M at extreme scale.`,
    key_points: [
      'Gartner 6 Rs guides migration strategy: Rehost, Replatform, Repurchase, Refactor, Retire, Retain.',
      'Netflix demonstrated global resilience via public cloud and Chaos Monkey.',
      'Dropbox proved that massive, predictable storage scale can justify repatriation.'
    ],
    real_world_example: 'A university Rehosts student registration onto EC2, Repurchases Workday for HR, and Retains door badge access servers on-premise.',
    display_order: 1,
    published: true,
  },
];

export const mockLessons: Lesson[] = [
  {
    id: 'l-1',
    topic_id: 't-1',
    title: 'Deconstructing the 5 NIST Characteristics with Code & Scenarios',
    introduction: 'Trace each of the five NIST essential characteristics with practical cloud CLI commands and architectural setups.',
    content: `1. On-Demand Self-Service: Immediate provisioning via CLI/console without tickets.
2. Broad Network Access: REST APIs accessible across mobile, web, and IoT.
3. Resource Pooling: Multi-tenant hardware sharing with Intel VT-x hardware boundaries.
4. Rapid Elasticity: Dynamic scale-out/scale-in based on CloudWatch CPU metrics.
5. Measured Service: Transparent per-second billing of compute, network, and storage.`,
    practical_example: 'Configuring an AWS Auto Scaling group with CloudWatch CPU threshold alarms.',
    summary: 'The 5 NIST characteristics define the engineering reality of automated cloud platforms.',
    display_order: 1,
    published: true,
  },
  {
    id: 'l-2',
    topic_id: 't-3',
    title: 'The Pizza as a Service Metaphor & Responsibility Breakdown',
    introduction: 'A classic and memorable industry metaphor to master the boundaries between On-Premise, IaaS, PaaS, and SaaS.',
    content: `1. On-Premise: Made at home from scratch (you provide table, oven, gas, dough, sauce).
2. IaaS: Take and bake (vendor provides dough/toppings; you provide oven and dining table).
3. PaaS: Pizza delivered (vendor cooks and delivers; you provide dining table).
4. SaaS: Dining out at a restaurant (vendor handles everything; you simply eat).`,
    practical_example: 'Deploying a Node.js server: On EC2 (IaaS), you configure Linux, systemd, Nginx. On Render/Vercel (PaaS), you click deploy from Git.',
    summary: 'Select the right service model based on required customization vs operational burden.',
    display_order: 1,
    published: true,
  },
];

export const mockQuizzes: Quiz[] = [
  {
    id: 'quiz-1',
    unit_id: 'unit-1',
    title: 'Unit 1 Mastery Quiz: Fundamentals & Cloud Models',
    description: 'Test your understanding of NIST characteristics, traditional IT vs cloud, and IaaS/PaaS/SaaS service architectures.',
    published: true,
    questions: [
      {
        id: 'q-1-1',
        quiz_id: 'quiz-1',
        question: 'Which organization authored the industry-standard definition of Cloud Computing in Special Publication 800-145?',
        options: ['ISO (International Organization for Standardization)', 'NIST (National Institute of Standards and Technology)', 'IEEE (Institute of Electrical and Electronics Engineers)', 'W3C (World Wide Web Consortium)'],
        correct_answer: 1,
        explanation: 'NIST defined the five essential characteristics, three service models, and four deployment models in NIST SP 800-145.',
        difficulty: 'easy',
        display_order: 1,
      },
      {
        id: 'q-1-2',
        quiz_id: 'quiz-1',
        question: 'Which of the following is NOT one of the five NIST essential characteristics of cloud computing?',
        options: ['On-Demand Self-Service', 'Broad Network Access', 'Fixed Physical Location', 'Rapid Elasticity'],
        correct_answer: 2,
        explanation: 'Resource Pooling provides location independence; Fixed Physical Location is contrary to cloud computing principles.',
        difficulty: 'easy',
        display_order: 2,
      },
      {
        id: 'q-1-3',
        quiz_id: 'quiz-1',
        question: 'In the Cloud Shared Responsibility Model, which layer is managed by the customer in Platform as a Service (PaaS)?',
        options: ['Physical server hardware', 'Operating system security patches', 'Application code and data', 'Network virtualization switches'],
        correct_answer: 2,
        explanation: 'In PaaS, the provider manages infrastructure, hypervisor, OS, and runtime. The customer manages application code and data.',
        difficulty: 'medium',
        display_order: 3,
      },
      {
        id: 'q-1-4',
        quiz_id: 'quiz-1',
        question: 'What financial term describes the pay-as-you-go operational expense model characteristic of cloud computing?',
        options: ['CapEx (Capital Expenditure)', 'OpEx (Operational Expenditure)', 'Depreciation Asset Model', 'Sunk Cost Allocation'],
        correct_answer: 1,
        explanation: 'Cloud computing converts upfront capital expenses (CapEx) into variable operational expenses (OpEx).',
        difficulty: 'easy',
        display_order: 4,
      },
    ],
  },
  {
    id: 'quiz-2',
    unit_id: 'unit-2',
    title: 'Unit 2 Mastery Quiz: Virtualization & Containers',
    description: 'Assess your knowledge of Type 1 vs Type 2 hypervisors, Docker containerization, and live VM migration.',
    published: true,
    questions: [
      {
        id: 'q-2-1',
        quiz_id: 'quiz-2',
        question: 'Which hypervisor type runs directly on the bare-metal physical host hardware without an underlying host operating system?',
        options: ['Type 1 Hypervisor', 'Type 2 Hypervisor', 'Container Runtime Engine', 'Virtual Desktop Infrastructure'],
        correct_answer: 0,
        explanation: 'Type 1 (Bare-Metal) hypervisors (VMware ESXi, KVM) run directly on host physical hardware.',
        difficulty: 'easy',
        display_order: 1,
      },
      {
        id: 'q-2-2',
        quiz_id: 'quiz-2',
        question: 'What is the key architectural difference between Virtual Machines and Docker Containers?',
        options: ['Containers run on bare metal; VMs run in web browsers', 'VMs virtualize the hardware and include full guest operating systems; Containers share the host OS kernel', 'VMs cannot run Linux; Containers can only run Linux', 'VMs use Dockerfiles; Containers use ISO image discs'],
        correct_answer: 1,
        explanation: 'VMs abstract physical hardware and each require a full guest OS. Containers abstract the OS and share the host kernel.',
        difficulty: 'medium',
        display_order: 2,
      },
    ],
  },
  {
    id: 'quiz-3',
    unit_id: 'unit-3',
    title: 'Unit 3 Mastery Quiz: Architecture & Elasticity',
    description: 'Test your understanding of multi-tenancy, horizontal vs vertical scaling, FaaS, and cloud-native patterns.',
    published: true,
    questions: [
      {
        id: 'q-3-1',
        quiz_id: 'quiz-3',
        question: 'What is the primary difference between Scalability and Elasticity in cloud computing?',
        options: ['Scalability handles load by upgrading hardware; Elasticity only applies to storage', 'Scalability is the capability to handle increased workload; Elasticity is the dynamic automatic adaptation of resources to match real-time demand', 'They are exact synonyms with no distinction', 'Scalability is only in public cloud; Elasticity is only in private cloud'],
        correct_answer: 1,
        explanation: 'Scalability is the capacity to handle increased load; Elasticity is the automatic real-time adaptation of capacity to current demand.',
        difficulty: 'medium',
        display_order: 1,
      },
      {
        id: 'q-3-2',
        quiz_id: 'quiz-3',
        question: 'In Function as a Service (FaaS) / Serverless architectures, what occurs during a "Cold Start"?',
        options: ['The data center cooling system drops below freezing', 'The provider initializes a new container sandbox runtime before executing the function for the first time', 'The function execution exceeds its 15-minute time limit', 'The database drops all existing connections'],
        correct_answer: 1,
        explanation: 'A Cold Start is the initialization latency when an idle serverless container launches to execute a function invocation.',
        difficulty: 'medium',
        display_order: 2,
      },
    ],
  },
  {
    id: 'quiz-4',
    unit_id: 'unit-4',
    title: 'Unit 4 Mastery Quiz: Cloud Security & Privacy',
    description: 'Validate your grasp of the CIA triad, IAM principles, encryption, and disaster recovery metrics.',
    published: true,
    questions: [
      {
        id: 'q-4-1',
        quiz_id: 'quiz-4',
        question: 'Which security principle mandates that users and services should only be granted the minimum permissions strictly necessary to perform their job?',
        options: ['Principle of Defense in Depth', 'Principle of Least Privilege (PoLP)', 'Principle of High Availability', 'Principle of Multi-Tenancy'],
        correct_answer: 1,
        explanation: 'The Principle of Least Privilege states that any entity should only possess the minimum credentials and access rights necessary.',
        difficulty: 'easy',
        display_order: 1,
      },
      {
        id: 'q-4-2',
        quiz_id: 'quiz-4',
        question: 'What does the Recovery Point Objective (RPO) measure in a Disaster Recovery plan?',
        options: ['The maximum acceptable amount of data loss measured in time', 'The total duration of system downtime before service is restored', 'The financial cost of purchasing replacement servers', 'The distance in kilometers between two redundant data centers'],
        correct_answer: 0,
        explanation: 'RPO defines the acceptable amount of data loss measured in time backward from a failure event.',
        difficulty: 'medium',
        display_order: 2,
      },
    ],
  },
  {
    id: 'quiz-5',
    unit_id: 'unit-5',
    title: 'Unit 5 Mastery Quiz: Storage & Data Management',
    description: 'Assess your understanding of Block vs File vs Object storage, CAP theorem trade-offs, and HDFS replication.',
    published: true,
    questions: [
      {
        id: 'q-5-1',
        quiz_id: 'quiz-5',
        question: 'Which storage type organizes data into flat logical namespaces with unique keys and rich metadata, accessed exclusively via HTTP REST APIs?',
        options: ['Block Storage (SAN / EBS)', 'File Storage (NFS / EFS)', 'Object Storage (S3 / GCS)', 'Tape Archive Drive'],
        correct_answer: 2,
        explanation: 'Object Storage manages data as discrete objects in flat namespaces (buckets) accessed via HTTP REST APIs.',
        difficulty: 'easy',
        display_order: 1,
      },
      {
        id: 'q-5-2',
        quiz_id: 'quiz-5',
        question: 'According to Brewer\'s CAP Theorem, what two properties must a distributed database choose between when a network partition (P) occurs?',
        options: ['Compute vs Bandwidth', 'Consistency (C) vs Availability (A)', 'Cost vs Speed', 'Durability vs Privacy'],
        correct_answer: 1,
        explanation: 'In the presence of an inevitable network partition, a distributed system must trade off Consistency against Availability.',
        difficulty: 'medium',
        display_order: 2,
      },
    ],
  },
  {
    id: 'quiz-6',
    unit_id: 'unit-6',
    title: 'Unit 6 Mastery Quiz: Trends, Standards & Future Scope',
    description: 'Test your understanding of Gartner 6 Rs, Edge computing, PUE sustainability, and enterprise cloud migrations.',
    published: true,
    questions: [
      {
        id: 'q-6-1',
        quiz_id: 'quiz-6',
        question: 'Under Gartner\'s 6 Rs of cloud migration, what does "Rehosting" (Lift and Shift) entail?',
        options: ['Completely rewriting the application using microservices', 'Moving an application from on-premise servers directly to cloud VMs without architectural modifications', 'Replacing the internal software with a third-party SaaS tool', 'Decommissioning and deleting the application permanently'],
        correct_answer: 1,
        explanation: 'Rehosting ("Lift and Shift") moves workloads directly to cloud virtual machines with minimal or no code changes.',
        difficulty: 'easy',
        display_order: 1,
      },
      {
        id: 'q-6-2',
        quiz_id: 'quiz-6',
        question: 'What does a Power Usage Effectiveness (PUE) score of 1.15 in a hyperscale cloud data center indicate?',
        options: ['15% of energy is overhead; the facility is highly energy efficient', 'The data center is failing international standards', 'The servers are operating 15% above safe temperature limits', '115% of power comes from solar panels'],
        correct_answer: 0,
        explanation: 'PUE = Total Facility Energy / IT Equipment Energy. A score of 1.15 indicates high efficiency where only 15% is spent on cooling and power distribution overhead.',
        difficulty: 'medium',
        display_order: 2,
      },
    ],
  },
];

export const mockLabs: LabConfiguration[] = [
  {
    id: 'lab-1',
    unit_id: 'unit-1',
    slug: 'lab-service-models',
    title: 'Lab A: Cloud Service Model Explorer (IaaS vs PaaS vs SaaS)',
    description: 'Interactive comparison of the shared responsibility matrix across IaaS, PaaS, and SaaS layers with practical use case analysis.',
    lab_type: 'service_models',
    display_order: 1,
    published: true,
    configuration: {},
  },
  {
    id: 'lab-2',
    unit_id: 'unit-1',
    slug: 'lab-deployment-models',
    title: 'Lab B: Cloud Deployment Model Explorer',
    description: 'Compare Public, Private, Hybrid, and Community Cloud deployment models on cost, control, security, and scalability trade-offs.',
    lab_type: 'deployment_models',
    display_order: 2,
    published: true,
    configuration: {},
  },
  {
    id: 'lab-3',
    unit_id: 'unit-2',
    slug: 'lab-virtualization-simulator',
    title: 'Lab C: Virtualization Resource Allocation Simulator',
    description: 'Configure physical host resources, allocate vCPUs and RAM to virtual machines, and simulate overcommitment thresholds.',
    lab_type: 'virtualization_simulator',
    display_order: 3,
    published: true,
    configuration: {},
  },
  {
    id: 'lab-4',
    unit_id: 'unit-2',
    slug: 'lab-load-balancing',
    title: 'Lab D: Load Balancing & Traffic Distribution Simulator',
    description: 'Simulate incoming HTTP traffic distribution across multiple server nodes using Round Robin, Least Connections, and IP Hash algorithms.',
    lab_type: 'load_balancer',
    display_order: 4,
    published: true,
    configuration: {},
  },
  {
    id: 'lab-5',
    unit_id: 'unit-3',
    slug: 'lab-architecture-builder',
    title: 'Lab E: Interactive Cloud Architecture Builder',
    description: 'Design multi-tier cloud architectures by connecting Clients, API Gateways, Microservices, Databases, Object Storage, and CDNs.',
    lab_type: 'architecture_builder',
    display_order: 5,
    published: true,
    configuration: {},
  },
  {
    id: 'lab-6',
    unit_id: 'unit-4',
    slug: 'lab-cloud-security',
    title: 'Lab F: Cloud Security, CIA Triad & Threat Response Lab',
    description: 'Examine real-world cloud security scenarios involving DDoS, S3 bucket misconfigurations, IAM privilege creep, and encryption.',
    lab_type: 'security_scenarios',
    display_order: 6,
    published: true,
    configuration: {},
  },
  {
    id: 'lab-7',
    unit_id: 'unit-5',
    slug: 'lab-storage-explorer',
    title: 'Lab G: Cloud Storage Explorer (Block vs File vs Object)',
    description: 'Interactive benchmarks comparing read/write latencies, metadata capabilities, and cost efficiency across storage types.',
    lab_type: 'storage_explorer',
    display_order: 7,
    published: true,
    configuration: {},
  },
  {
    id: 'lab-8',
    unit_id: 'unit-5',
    slug: 'lab-backup-replication',
    title: 'Lab H: Backup, Replication & Disaster Recovery Simulator',
    description: 'Trigger simulated cross-region replication, snapshot creation, and disaster recovery failover events with RTO/RPO calculation.',
    lab_type: 'backup_replication',
    display_order: 8,
    published: true,
    configuration: {},
  },
  {
    id: 'lab-9',
    unit_id: 'unit-6',
    slug: 'lab-future-cloud',
    title: 'Lab I: Future Cloud Explorer (Edge, Serverless & Green Cloud)',
    description: 'Calculate serverless cold-start economics, simulate edge vs origin latency, and evaluate Data Center PUE carbon impact.',
    lab_type: 'future_cloud',
    display_order: 9,
    published: true,
    configuration: {},
  },
];

export const mockProviders: CloudProvider[] = [
  {
    id: 'p-1',
    name: 'Amazon Web Services (AWS)',
    description: 'The world\'s earliest and largest hyperscale cloud computing platform, launched in 2006 by Amazon with comprehensive global infrastructure.',
    official_website: 'https://aws.amazon.com',
    display_order: 1,
    service_categories: [
      {
        category: 'Compute',
        services: [
          { name: 'Amazon EC2', description: 'Elastic Compute Cloud: Resizable virtual servers (IaaS)', use_case: 'General compute, custom server configurations' },
          { name: 'AWS Lambda', description: 'Serverless Function as a Service (FaaS)', use_case: 'Event-driven microservices, image resizing, automated tasks' },
          { name: 'Amazon ECS / EKS', description: 'Elastic Container Service & Managed Kubernetes (CaaS)', use_case: 'Containerized enterprise microservice fleets' }
        ]
      },
      {
        category: 'Storage',
        services: [
          { name: 'Amazon S3', description: 'Simple Storage Service: Scalable object storage (11 9s durability)', use_case: 'Static assets, video streaming media, data lakes' },
          { name: 'Amazon EBS', description: 'Elastic Block Store: High-performance raw block storage for EC2', use_case: 'Database file storage, OS boot volumes' },
          { name: 'Amazon EFS', description: 'Elastic File System: Scalable shared NFS file storage', use_case: 'Multi-instance shared application directories' }
        ]
      },
      {
        category: 'Database',
        services: [
          { name: 'Amazon RDS / Aurora', description: 'Managed relational databases (PostgreSQL, MySQL)', use_case: 'Transactional SQL relational workloads' },
          { name: 'Amazon DynamoDB', description: 'Fully managed multi-region NoSQL key-value store', use_case: 'Single-digit millisecond latency mobile & gaming backends' }
        ]
      }
    ]
  },
  {
    id: 'p-2',
    name: 'Microsoft Azure',
    description: 'Microsoft\'s enterprise-centric cloud computing platform, launched in 2010 with deep integration into Active Directory, Windows Server, and Office 365.',
    official_website: 'https://azure.microsoft.com',
    display_order: 2,
    service_categories: [
      {
        category: 'Compute',
        services: [
          { name: 'Azure Virtual Machines', description: 'On-demand scalable Linux and Windows VMs (IaaS)', use_case: 'Enterprise application hosting, legacy migrations' },
          { name: 'Azure Functions', description: 'Event-driven serverless compute platform (FaaS)', use_case: 'Background processing, automated scheduled scripts' },
          { name: 'Azure Kubernetes Service (AKS)', description: 'Fully managed enterprise Kubernetes orchestration', use_case: 'Cloud-native multi-tier containerized deployments' }
        ]
      },
      {
        category: 'Storage',
        services: [
          { name: 'Azure Blob Storage', description: 'Massively scalable object storage for unstructured data', use_case: 'Streaming media, big data backups, analytics' },
          { name: 'Azure Managed Disks', description: 'Persistent block-level storage volumes for Azure VMs', use_case: 'Virtual machine OS and database disks' },
          { name: 'Azure Files', description: 'Fully managed cloud file shares via SMB and NFS protocols', use_case: 'Enterprise file sharing, legacy application migration' }
        ]
      },
      {
        category: 'Database',
        services: [
          { name: 'Azure SQL Database', description: 'Fully managed relational cloud database with SQL Server engine', use_case: 'Enterprise relational business applications' },
          { name: 'Azure Cosmos DB', description: 'Globally distributed, multi-model NoSQL database service', use_case: 'Ultra-fast global applications with multi-master writes' }
        ]
      }
    ]
  },
  {
    id: 'p-3',
    name: 'Google Cloud Platform (GCP)',
    description: 'Google\'s high-performance cloud platform, renowned for cutting-edge data analytics, artificial intelligence/ML, and internal planetary fiber network.',
    official_website: 'https://cloud.google.com',
    display_order: 3,
    service_categories: [
      {
        category: 'Compute',
        services: [
          { name: 'Google Compute Engine (GCE)', description: 'High-performance virtual machines on Google\'s infrastructure', use_case: 'Scalable compute, custom Linux/Windows workloads' },
          { name: 'Google Cloud Functions', description: 'Lightweight, event-driven serverless execution (FaaS)', use_case: 'Microservice webhooks, asynchronous events' },
          { name: 'Google Kubernetes Engine (GKE)', description: 'The original industry-leading managed Kubernetes platform', use_case: 'Container cluster automation, advanced networking' }
        ]
      },
      {
        category: 'Storage',
        services: [
          { name: 'Google Cloud Storage (GCS)', description: 'Worldwide object storage with automatic multi-tiering', use_case: 'Big data analytics, video archives, web static files' },
          { name: 'Persistent Disk', description: 'Reliable, high-performance block storage attached to GCE', use_case: 'Database data directories, boot drives' },
          { name: 'Filestore', description: 'Fully managed NAS storage for Compute Engine and GKE', use_case: 'High-throughput shared POSIX file processing' }
        ]
      },
      {
        category: 'Database & Big Data',
        services: [
          { name: 'Cloud Spanner', description: 'Enterprise-grade, globally distributed ACID SQL database', use_case: 'Global financial transactions with zero downtime' },
          { name: 'BigQuery', description: 'Serverless, petabyte-scale cloud data warehouse', use_case: 'Real-time SQL analytics on billions of rows in seconds' }
        ]
      }
    ]
  }
];

export const mockCaseStudies: CaseStudy[] = [
  {
    id: 'cs-1',
    title: 'Netflix: 100% Cloud Migration & The Creation of Chaos Engineering',
    organization: 'Netflix Inc.',
    cloud_concepts: ['Public Cloud (AWS)', 'Microservices', 'Chaos Engineering', 'Auto-Scaling', 'Global CDN'],
    description: `In August 2008, Netflix experienced a catastrophic database corruption in their private data center that halted DVD shipments to customers for three business days. Company leadership made the strategic decision to migrate 100% of streaming and data infrastructure to AWS.

Between 2008 and 2016, Netflix dismantled its monolithic architecture and rebuilt the entire platform as hundreds of decoupled microservices on AWS EC2, S3, and DynamoDB. To ensure that individual server or data center failures never broke streaming playback, Netflix engineers invented Chaos Monkey to intentionally terminate production virtual machines during business hours.`,
    lessons_learned: [
      'Monolithic architectures in private data centers create single points of catastrophic failure.',
      'Chaos Engineering proves system resiliency by proactively breaking components in production.',
      'Offloading physical hardware operations allowed Netflix engineers to focus 100% on recommendation algorithms and user experience.',
      'Decoupled microservices combined with aggressive horizontal auto-scaling can smoothly absorb tens of millions of concurrent streams.'
    ],
    source_url: 'https://netflixtechblog.com',
    display_order: 1,
  },
  {
    id: 'cs-2',
    title: 'Dropbox: The $75 Million Cloud Repatriation ("Magic Pocket")',
    organization: 'Dropbox Inc.',
    cloud_concepts: ['Hybrid Cloud', 'Infrastructure Repatriation', 'Object Storage at Exabyte Scale', 'CapEx vs OpEx Optimization'],
    description: `Dropbox was originally founded in 2007 on top of Amazon S3 object storage. S3 allowed Dropbox to scale rapidly without purchasing a single hard drive. However, by 2014, Dropbox was storing over 500 Petabytes of user files. At that massive, steady-state scale, the ongoing operational costs (OpEx) of commercial cloud storage exceeded the cost of building custom private storage facilities.

Dropbox engineered "Magic Pocket," a custom hardware and software distributed storage architecture. In 2016, Dropbox migrated over 90% of user file data off AWS S3 into their own custom data centers, saving over $75 million in operating costs across two years.`,
    lessons_learned: [
      'Public cloud is unbeatable for early agility, rapid hypergrowth, and unpredictable traffic.',
      'At extreme petabyte/exabyte scale with highly predictable steady-state workloads, custom private infrastructure can yield massive cost savings.',
      'Repatriation is not an all-or-nothing choice; Dropbox successfully operates a tailored Hybrid Cloud architecture.',
      'Building custom hardware requires immense capital and a dedicated world-class infrastructure engineering team.'
    ],
    source_url: 'https://dropbox.tech',
    display_order: 2,
  },
  {
    id: 'cs-3',
    title: 'Spotify: Migrating Core Data Pipelines from On-Premise Hadoop to Google Cloud',
    organization: 'Spotify',
    cloud_concepts: ['Data Lake Migration', 'Serverless Analytics (BigQuery)', 'Managed Kubernetes (GKE)', 'PaaS vs IaaS'],
    description: `Spotify initially operated their music recommendation engine on large, self-managed Apache Hadoop clusters in on-premise data centers. As Spotify reached 100 million active users, managing thousands of physical Hadoop server nodes consumed thousands of engineering hours.

In 2016, Spotify partnered with Google Cloud Platform to migrate their massive data processing infrastructure. They replaced self-managed Hadoop clusters with Google Cloud Dataproc and Google BigQuery. Complex analytical queries that previously took 8 hours on on-premise clusters finished in under 2 minutes on BigQuery.`,
    lessons_learned: [
      'Managed cloud data services (PaaS/Serverless) liberate data scientists from hardware maintenance chores.',
      'BigQuery\'s serverless SQL analytics reduced multi-hour queries to sub-minute executions.',
      'Cloud elasticity allows sudden surges in recommendation retraining without purchasing reserve physical servers.'
    ],
    source_url: 'https://engineering.atspotify.com',
    display_order: 3,
  }
];

export const mockGlossary: GlossaryTerm[] = [
  { id: 'g-1', term: 'NIST SP 800-145', definition: 'The canonical National Institute of Standards and Technology publication that formally defines cloud computing and its 5 essential characteristics, 3 service models, and 4 deployment models.', display_order: 1 },
  { id: 'g-2', term: 'IaaS (Infrastructure as a Service)', definition: 'A cloud service model providing raw virtualized computing resources (virtual machines, storage, networking) where the customer manages the operating system, runtime, and applications.', display_order: 2 },
  { id: 'g-3', term: 'PaaS (Platform as a Service)', definition: 'A cloud service delivery model providing a managed hardware and software execution environment where developers deploy application code without managing underlying servers or operating systems.', display_order: 3 },
  { id: 'g-4', term: 'SaaS (Software as a Service)', definition: 'A software distribution model where a third-party provider hosts applications and makes them available to end-users over the internet via web browsers or APIs.', display_order: 4 },
  { id: 'g-5', term: 'Type 1 Hypervisor (Bare-Metal)', definition: 'A virtualization supervisor that runs directly on host computer hardware without an underlying host operating system (e.g., VMware ESXi, KVM).', display_order: 5 },
  { id: 'g-6', term: 'Type 2 Hypervisor (Hosted)', definition: 'A virtualization software supervisor that runs as an application atop an existing host operating system (e.g., Oracle VirtualBox, VMware Workstation).', display_order: 6 },
  { id: 'g-7', term: 'Containerization', definition: 'An operating system-level virtualization method where software is packaged with its libraries and dependencies in isolated user-space processes sharing the host OS kernel.', display_order: 7 },
  { id: 'g-8', term: 'Live VM Migration', definition: 'The process of moving an active, running virtual machine between physical host servers with near-zero downtime, typically using iterative pre-copy memory page algorithms.', display_order: 8 },
  { id: 'g-9', term: 'Multi-Tenancy', definition: 'An architecture in which a single software application instance and shared physical infrastructure serves multiple distinct customer organizations (tenants) with logical data isolation.', display_order: 9 },
  { id: 'g-10', term: 'Rapid Elasticity', definition: 'The ability of a cloud system to dynamically provision and release compute, storage, and memory resources automatically in real time to match fluctuating workload demand.', display_order: 10 },
  { id: 'g-11', term: 'CIA Triad', definition: 'The fundamental security model comprising Confidentiality (data privacy), Integrity (data accuracy and protection against tampering), and Availability (uninterrupted access).', display_order: 11 },
  { id: 'g-12', term: 'Object Storage', definition: 'A scalable storage architecture that manages data as discrete objects containing data payloads, unique key IDs, and custom metadata, organized in flat namespaces (buckets) accessed via HTTP REST APIs.', display_order: 12 },
  { id: 'g-13', term: 'Block Storage', definition: 'Raw, unformatted persistent storage split into fixed-size addressable blocks, accessed over high-speed protocols (iSCSI, NVMe-oF) by operating systems for database files and boot drives.', display_order: 13 },
  { id: 'g-14', term: 'CAP Theorem', definition: 'Brewer\'s theorem stating that a distributed data store can simultaneously guarantee at most two out of three properties: Consistency, Availability, and Partition Tolerance.', display_order: 14 },
  { id: 'g-15', term: 'CDN (Content Delivery Network)', definition: 'A geographically distributed network of proxy caching servers (Edge locations) that deliver web content to users with low latency and high bandwidth.', display_order: 15 },
  { id: 'g-16', term: 'Edge Computing', definition: 'A distributed computing paradigm that brings data computation and storage closer to the physical location where data is produced and consumed.', display_order: 16 },
  { id: 'g-17', term: 'Gartner 6 Rs', definition: 'The standard framework for enterprise cloud migration strategies: Rehost, Replatform, Repurchase, Refactor, Retire, and Retain.', display_order: 17 }
];

export const mockResources: LearningResource[] = [
  {
    id: 'r-1',
    title: 'NIST Special Publication 800-145: The NIST Definition of Cloud Computing',
    description: 'The global benchmark standard authored by Peter Mell and Timothy Grance establishing core cloud definitions, characteristics, and models.',
    resource_type: 'Standard',
    url: 'https://csrc.nist.gov/publications/detail/sp/800-145/final',
    provider: 'National Institute of Standards and Technology (NIST)',
    display_order: 1,
  },
  {
    id: 'r-2',
    title: 'NIST Special Publication 500-292: Cloud Computing Reference Architecture',
    description: 'Comprehensive guide establishing the five core cloud actors: Cloud Consumer, Provider, Broker, Auditor, and Carrier.',
    resource_type: 'Standard',
    url: 'https://csrc.nist.gov/publications/detail/sp/500-292/final',
    provider: 'NIST',
    display_order: 2,
  },
  {
    id: 'r-3',
    title: 'AWS Well-Architected Framework Documentation',
    description: 'Official architectural guidance covering the six pillars: Operational Excellence, Security, Reliability, Performance Efficiency, Cost Optimization, and Sustainability.',
    resource_type: 'Documentation',
    url: 'https://aws.amazon.com/architecture/well-architected/',
    provider: 'Amazon Web Services',
    display_order: 3,
  },
  {
    id: 'r-4',
    title: 'Google Cloud Architecture Framework',
    description: 'Best practice guides and reference designs for building secure, scalable, and resilient systems on Google Cloud Platform.',
    resource_type: 'Documentation',
    url: 'https://cloud.google.com/architecture/framework',
    provider: 'Google Cloud',
    display_order: 4,
  },
  {
    id: 'r-5',
    title: 'Cloud Security Alliance (CSA) Security Guidance v4.0',
    description: 'Best practices for cybersecurity and governance in cloud environments from the premier global cloud security organization.',
    resource_type: 'Whitepaper',
    url: 'https://cloudsecurityalliance.org/artifacts/security-guidance-v4/',
    provider: 'Cloud Security Alliance',
    display_order: 5,
  },
  {
    id: 'r-6',
    title: 'Cloud Computing: Principles and Paradigms (Rajkumar Buyya et al.)',
    description: 'Premier academic textbook covering distributed systems, virtualization, resource scheduling, and cloud economics for BCA/MCA curricula.',
    resource_type: 'Textbook',
    url: 'https://www.wiley.com/en-us/Cloud+Computing%3A+Principles+and+Paradigms-p-9780470887998',
    provider: 'Wiley Publishing',
    display_order: 6,
  }
];
