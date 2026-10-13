export interface SeedUnit {
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  unitNumber: number;
  learningObjectives: string[];
  estimatedMinutes: number;
  icon: string;
  displayOrder: number;
}

export interface SeedTopic {
  unitSlug: string;
  slug: string;
  title: string;
  shortDescription: string;
  content: string;
  keyPoints: string[];
  realWorldExample: string;
  displayOrder: number;
}

export interface SeedLesson {
  topicSlug: string;
  title: string;
  introduction: string;
  content: string;
  practicalExample: string;
  summary: string;
  displayOrder: number;
}

export interface SeedQuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
  displayOrder: number;
}

export interface SeedQuiz {
  unitSlug: string;
  title: string;
  description: string;
  questions: SeedQuizQuestion[];
}

export interface SeedLab {
  unitSlug?: string;
  slug: string;
  title: string;
  description: string;
  labType: string;
  configuration: Record<string, any>;
  displayOrder: number;
}

export const unitsData: SeedUnit[] = [
  {
    unitNumber: 1,
    slug: 'unit-1-intro-to-cloud-computing',
    title: 'Unit 1: Introduction to Cloud Computing',
    shortDescription: 'Core definitions, evolution, NIST characteristics, service and deployment models, and foundational cloud principles.',
    description: 'Explore the fundamental concepts of cloud computing, tracing its historical evolution from mainframe computing and virtualization to modern utility computing. Understand the NIST SP 800-145 essential characteristics, explore IaaS, PaaS, SaaS, and evaluate Public, Private, Hybrid, and Community cloud deployment models.',
    learningObjectives: [
      'Define cloud computing according to NIST SP 800-145 standards',
      'Differentiate between traditional on-premise IT infrastructure and cloud computing',
      'Analyze the three primary service models: IaaS, PaaS, and SaaS',
      'Evaluate cloud deployment models: Public, Private, Hybrid, and Community Cloud',
      'Distinguish cloud computing from Grid computing and Utility computing',
      'Identify key benefits, business drivers, and operational challenges of cloud adoption'
    ],
    estimatedMinutes: 90,
    icon: 'Cloud',
    displayOrder: 1,
  },
  {
    unitNumber: 2,
    slug: 'unit-2-virtualization-in-cloud',
    title: 'Unit 2: Virtualization in Cloud Computing',
    shortDescription: 'Hardware, server, and storage virtualization, hypervisors, containers, Docker, Kubernetes, and VM management.',
    description: 'Master the technological backbone of cloud computing: virtualization. Examine hardware, OS, server, storage, and network virtualization. Compare Type-1 bare-metal and Type-2 hosted hypervisors, explore virtual machines vs OS-level containers (Docker/Kubernetes), and understand live VM migration and load balancing.',
    learningObjectives: [
      'Explain the principles and taxonomy of virtualization in modern computing',
      'Compare Type 1 (bare-metal) and Type 2 (hosted) hypervisors with real-world examples',
      'Differentiate between Virtual Machines (VMs) and Containers (Docker/Kubernetes)',
      'Understand resource virtualization, memory ballooning, and CPU overcommitment',
      'Analyze live VM migration techniques, dirty page tracking, and cold migration',
      'Explain how virtualization underpins multi-tenant cloud elasticity'
    ],
    estimatedMinutes: 110,
    icon: 'Cpu',
    displayOrder: 2,
  },
  {
    unitNumber: 3,
    slug: 'unit-3-cloud-architecture-services-models',
    title: 'Unit 3: Cloud Architecture, Services, and Models',
    shortDescription: 'Cloud architecture frameworks, SOA, multi-tenancy, elasticity vs scalability, FaaS, CaaS, and microservices.',
    description: 'Delve into cloud architectural design. Study layered cloud frameworks, Service Oriented Architecture (SOA), multi-tenant data isolation patterns, and the critical distinction between scalability and elasticity. Explore contemporary service models including FaaS (Serverless), CaaS, and DaaS, and learn microservice application design.',
    learningObjectives: [
      'Deconstruct the logical reference architecture of cloud platforms',
      'Contrast vertical scaling (scale-up) with horizontal elasticity (scale-out)',
      'Analyze multi-tenancy architectures, tenant isolation, and noisy neighbor mitigation',
      'Examine modern compute paradigms: FaaS (Serverless), CaaS, and DaaS',
      'Understand Service Oriented Architecture (SOA) and decoupled microservices design',
      'Apply cloud-native application design principles (12-Factor App, circuit breakers)'
    ],
    estimatedMinutes: 120,
    icon: 'Layers',
    displayOrder: 3,
  },
  {
    unitNumber: 4,
    slug: 'unit-4-cloud-security-and-privacy',
    title: 'Unit 4: Cloud Security and Privacy',
    shortDescription: 'The CIA triad, threat vectors, IAM, encryption at rest and in transit, regulatory compliance, and disaster recovery.',
    description: 'Investigate the critical aspects of securing cloud workloads. Master the CIA Triad in multi-tenant environments, explore top cloud threats (DDoS, data breaches, account hijacking), implement Identity and Access Management (IAM), understand encryption standards (AES-256, TLS 1.3), and evaluate compliance frameworks such as ISO 27001, NIST, GDPR, and HIPAA.',
    learningObjectives: [
      'Apply the CIA Triad (Confidentiality, Integrity, Availability) to cloud systems',
      'Analyze major cloud threats including DDoS, credential harvesting, and misconfigurations',
      'Design Identity and Access Management (IAM) role-based policies following least privilege',
      'Implement data encryption strategies: In-transit, At-rest, and In-use (confidential computing)',
      'Compare industry standards and regulatory compliance: ISO 27001, NIST SP 800-53, GDPR, HIPAA',
      'Formulate Disaster Recovery (DR) strategies using RTO and RPO metrics'
    ],
    estimatedMinutes: 105,
    icon: 'ShieldCheck',
    displayOrder: 4,
  },
  {
    unitNumber: 5,
    slug: 'unit-5-cloud-storage-data-management',
    title: 'Unit 5: Cloud Storage and Data Management',
    shortDescription: 'Block, file, and object storage systems, Amazon S3, Google Cloud Storage, backup, replication, HDFS, and CDNs.',
    description: 'Explore scalable storage architectures powering modern applications. Compare Block, File, and Object storage paradigms with real-world services like Amazon S3 and Google Cloud Storage. Understand distributed data consistency (CAP theorem, PACELC), HDFS big data foundations, multi-region replication, and Content Delivery Networks (CDNs).',
    learningObjectives: [
      'Compare Block storage (EBS/SAN), File storage (EFS/NAS), and Object storage (S3/GCS)',
      'Understand Amazon S3 and Google Cloud Storage architecture: buckets, immutable objects, and tiering',
      'Evaluate data consistency models: Strong consistency vs Eventual consistency and the CAP theorem',
      'Analyze HDFS architecture: NameNode, DataNodes, and block replication factors',
      'Design backup, multi-region snapshotting, and disaster recovery replication pipelines',
      'Explain how Content Delivery Networks (CDNs) cache data at edge Points of Presence (PoPs)'
    ],
    estimatedMinutes: 100,
    icon: 'Database',
    displayOrder: 5,
  },
  {
    unitNumber: 6,
    slug: 'unit-6-cloud-trends-standards-future-scope',
    title: 'Unit 6: Cloud Trends, Standards, and Future Scope',
    shortDescription: 'Industry standards, serverless, edge computing, AI in cloud, green cloud computing, migration 6 Rs, and case studies.',
    description: 'Examine cutting-edge developments shaping the future of cloud computing. Study IEEE and NIST cloud standards, edge and fog computing, serverless architectures, AI/ML cloud workloads, and green computing. Master Gartner 6 Rs migration strategies and analyze comprehensive case studies including Netflix on AWS and Dropbox infrastructure repatriation.',
    learningObjectives: [
      'Review international cloud standards established by IEEE, NIST, and Cloud Security Alliance',
      'Analyze emerging compute models: Edge computing, Fog computing, and Serverless FaaS',
      'Evaluate AI/ML acceleration in cloud environments and managed training/inference pipelines',
      'Assess Green Cloud computing metrics: Power Usage Effectiveness (PUE) and sustainability',
      'Formulate enterprise cloud migration plans using Gartner 6 Rs framework',
      'Evaluate real-world enterprise architectures: Netflix on AWS and Dropbox storage repatriation'
    ],
    estimatedMinutes: 115,
    icon: 'TrendingUp',
    displayOrder: 6,
  },
];

export const topicsData: SeedTopic[] = [
  // --- UNIT 1 TOPICS ---
  {
    unitSlug: 'unit-1-intro-to-cloud-computing',
    slug: 'u1-definition-evolution-characteristics',
    title: 'Cloud Definition, Evolution & NIST Characteristics',
    shortDescription: 'The official NIST SP 800-145 definition, historical lineage from mainframe to cloud, and the 5 essential characteristics.',
    content: `According to the National Institute of Standards and Technology (NIST SP 800-145), Cloud Computing is a model for enabling ubiquitous, convenient, on-demand network access to a shared pool of configurable computing resources (e.g., networks, servers, storage, applications, and services) that can be rapidly provisioned and released with minimal management effort or service provider interaction.

The 5 Essential Characteristics defined by NIST:
1. On-Demand Self-Service: A consumer can unilaterally provision computing capabilities, such as server time and network storage, as needed automatically without requiring human interaction with each service provider.
2. Broad Network Access: Capabilities are available over the network and accessed through standard mechanisms that promote use by heterogeneous thin or thick client platforms (e.g., mobile phones, tablets, laptops, workstations).
3. Resource Pooling: The provider's computing resources are pooled to serve multiple consumers using a multi-tenant model, with different physical and virtual resources dynamically assigned and reassigned according to consumer demand.
4. Rapid Elasticity: Capabilities can be elastically provisioned and released, in some cases automatically, to scale rapidly outward and inward commensurate with demand. To the consumer, the capabilities available for provisioning often appear to be unlimited.
5. Measured Service: Cloud systems automatically control and optimize resource use by leveraging a metering capability at some level of abstraction appropriate to the type of service (e.g., storage, processing, bandwidth, and active user accounts). Resource usage can be monitored, controlled, and reported, providing transparency for both the provider and consumer.`,
    keyPoints: [
      'NIST SP 800-145 is the global benchmark definition for cloud computing.',
      'Five essential characteristics: On-demand self-service, Broad network access, Resource pooling, Rapid elasticity, Measured service.',
      'Cloud evolved from Mainframes -> Time-sharing -> Client-Server -> Cluster -> Grid -> Cloud computing.',
      'Multi-tenancy enables location independence: customers generally do not know exact physical host locations.'
    ],
    realWorldExample: 'A retail website during Black Friday automatically spins up 50 extra web server instances via Auto Scaling (Rapid Elasticity) across pooled hypervisors without human intervention (On-Demand Self-Service), and pays only for the exact compute seconds consumed (Measured Service).',
    displayOrder: 1,
  },
  {
    unitSlug: 'unit-1-intro-to-cloud-computing',
    slug: 'u1-traditional-it-vs-cloud',
    title: 'Traditional On-Premise IT vs Cloud Computing',
    shortDescription: 'CapEx vs OpEx economic models, hardware provisioning cycles, maintenance overhead, and operational agility.',
    content: `Traditional on-premise IT requires organizations to purchase, house, power, cool, and maintain physical server hardware, network switches, storage arrays, and backup generators. This creates significant financial and operational hurdles:

1. Capital Expenditures (CapEx) vs Operational Expenditures (OpEx):
- Traditional IT is CapEx heavy: Millions of dollars are committed upfront on physical equipment that depreciates over 3 to 5 years, often sized for peak anticipated traffic that sits idle 85% of the time.
- Cloud Computing shifts expenditure to OpEx: Zero upfront infrastructure commitment. Organizations pay monthly for active usage, converting fixed costs into variable operational costs.

2. Provisioning Speed & Time-to-Market:
- Traditional IT: Procuring a new rack of servers takes 6 to 12 weeks for purchase orders, shipping, cabling, rack mounting, hypervisor setup, and configuration.
- Cloud Computing: An engineer provisions an enterprise-grade virtual cluster or database instance in under 2 minutes through a web console, CLI, or Terraform script.

3. Resilience & Disaster Recovery:
- Traditional IT: Demands a secondary physical data center in another geographic zone, doubling hardware and real-estate expenditure.
- Cloud Computing: Built-in multi-Availability Zone (AZ) and cross-region replication at a fraction of the cost.`,
    keyPoints: [
      'CapEx represents upfront capital expenditure on physical assets; OpEx represents ongoing pay-as-you-go operational expenses.',
      'Cloud eliminates over-provisioning waste (idle hardware waiting for hypothetical traffic peaks).',
      'Hardware refresh cycles, physical security, environmental cooling, and power redundancy are offloaded to hyperscale providers.',
      'Engineers transition from hardware rack technicians to software-defined cloud architects.'
    ],
    realWorldExample: 'A startup launching a new video streaming app can launch immediately on cloud infrastructure for $50/month instead of borrowing $150,000 for on-premise servers, power supplies, and colocation rack rentals.',
    displayOrder: 2,
  },
  {
    unitSlug: 'unit-1-intro-to-cloud-computing',
    slug: 'u1-service-models-iaas-paas-saas',
    title: 'Cloud Service Models: IaaS, PaaS, and SaaS',
    shortDescription: 'The foundational SPI (SaaS, PaaS, IaaS) service hierarchy, shared responsibility matrix, and workload trade-offs.',
    content: `Cloud computing capabilities are offered through three standard service delivery models, often represented as the Cloud Computing Stack:

1. Infrastructure as a Service (IaaS):
- Provides raw virtualized or bare-metal computing resources: virtual machines, raw block storage, virtual private networks, and firewalls.
- Provider Manages: Physical data center, virtualization hypervisor, physical servers, networking hardware.
- User Manages: Operating system installation/patching, runtime environments, middleware, database engines, application code, and data.
- Examples: Amazon EC2, Google Compute Engine, Microsoft Azure Virtual Machines.

2. Platform as a Service (PaaS):
- Provides a pre-configured execution environment where developers deploy code without managing OS kernels, security patches, or web server daemons.
- Provider Manages: Physical hardware, hypervisor, OS, runtime (Node.js, Python, Java), web server, database management, and auto-scaling.
- User Manages: Application source code and database schema/data.
- Examples: AWS Elastic Beanstalk, Heroku, Google App Engine, Vercel.

3. Software as a Service (SaaS):
- Complete, turnkey end-user software applications hosted and operated centrally over the internet.
- Provider Manages: The entire stack from hardware, network, OS, application codebase, security updates, to data backups.
- User Manages: User accounts, access permissions, and application configuration settings.
- Examples: Google Workspace (Gmail/Docs), Microsoft 365, Salesforce, Zoom.`,
    keyPoints: [
      'The Shared Responsibility Model shifts management burden up the stack from IaaS -> PaaS -> SaaS.',
      'IaaS offers maximum control and customizability, but requires high administrative maintenance.',
      'PaaS maximizes developer productivity by abstracting infrastructure mechanics.',
      'SaaS delivers immediate business utility through browser or API interfaces.'
    ],
    realWorldExample: 'A company runs their core backend microservices on AWS EC2 (IaaS), hosts their Node.js frontend on Vercel (PaaS), and uses Google Workspace (SaaS) for corporate email and collaboration.',
    displayOrder: 3,
  },
  {
    unitSlug: 'unit-1-intro-to-cloud-computing',
    slug: 'u1-deployment-models',
    title: 'Cloud Deployment Models: Public, Private, Hybrid & Community',
    shortDescription: 'Deployment architectures, tenancy models, security perimeters, and regulatory compliance considerations.',
    content: `Deployment models define the ownership, accessibility, infrastructure location, and tenant isolation of the cloud environment:

1. Public Cloud:
- Owned and operated by third-party cloud service providers (e.g., AWS, Azure, Google Cloud). Resources are delivered over the public internet and shared among multiple tenants (multi-tenancy) while logically isolated.
- Benefits: High scalability, zero hardware maintenance, lowest cost, global reach.
- Trade-offs: Less control over underlying hardware, potential compliance challenges for sensitive data.

2. Private Cloud:
- Dedicated exclusively to a single organization. It can be physically hosted at the organization's on-premise data center or hosted by a third-party provider.
- Benefits: Total control over physical security, custom compliance configurations, deterministic latency, strict data sovereignty.
- Trade-offs: High CapEx and OpEx, requires internal specialist engineering staff.

3. Hybrid Cloud:
- Combines public and private clouds, bound together by standardized technology that enables data and application portability (e.g., AWS Direct Connect, Azure ExpressRoute).
- Ideal for "Cloud Bursting": Running steady-state sensitive workloads in a private cloud while dynamically bursting non-sensitive spike traffic to the public cloud.

4. Community Cloud:
- Shared infrastructure collaboratively used by several organizations with shared concerns (e.g., mission, security requirements, compliance policies, or jurisdiction).
- Examples: Government agency clouds (AWS GovCloud), healthcare research consortiums, banking sector clearing networks.`,
    keyPoints: [
      'Public clouds offer maximum elasticity and cost efficiency via multi-tenant hyperscale.',
      'Private clouds guarantee single-tenant isolation for stringent regulatory mandates.',
      'Hybrid clouds optimize cost and compliance by orchestrating workloads between private and public tiers.',
      'Community clouds pool costs and standards among organizations with identical compliance needs.'
    ],
    realWorldExample: 'A commercial bank keeps core transaction ledger records and customer financial histories inside a private cloud for strict regulatory compliance, but runs public-facing marketing websites and mobile app frontends on AWS public cloud.',
    displayOrder: 4,
  },

  // --- UNIT 2 TOPICS ---
  {
    unitSlug: 'unit-2-virtualization-in-cloud',
    slug: 'u2-virtualization-types-hypervisors',
    title: 'Virtualization Taxonomy & Hypervisors (Type 1 vs Type 2)',
    shortDescription: 'Hardware, server, storage, and network virtualization, bare-metal vs hosted hypervisor architectures.',
    content: `Virtualization is the foundational technology that enables cloud computing by creating simulated (virtual) computing environments decoupled from underlying physical hardware.

Taxonomy of Virtualization:
1. Server/Compute Virtualization: Divides one physical server into multiple isolated virtual machines (VMs), maximizing CPU and RAM utilization.
2. Storage Virtualization: Pools physical storage from multiple network storage devices into a single logical storage repository (e.g., Storage Area Networks - SAN).
3. Network Virtualization: Decouples network services from physical switches and routers (Software-Defined Networking - SDN and Virtual Private Clouds - VPC).
4. OS/Desktop Virtualization: Runs multiple operating systems on one host or streams virtual desktop sessions to thin clients (VDI).

Hypervisors (Virtual Machine Monitors - VMM):
The hypervisor is the software or firmware layer responsible for creating, scheduling, and isolating virtual machines:

Type 1 Hypervisor (Bare-Metal):
- Runs directly on host hardware without an underlying host operating system.
- Has direct access to CPU, memory, and I/O registers, delivering near-native bare-metal performance and enterprise-grade security.
- Examples: VMware ESXi, KVM (Kernel-based Virtual Machine), Citrix Hypervisor, Microsoft Hyper-V (core).
- Typical use: Enterprise data centers and public cloud infrastructure (AWS Nitro, GCP Compute Engine).

Type 2 Hypervisor (Hosted):
- Runs as an application inside a conventional host operating system (e.g., Windows, Linux, macOS).
- Hardware calls pass through the host OS kernel, introducing an extra translation layer and latency.
- Examples: Oracle VirtualBox, VMware Workstation, Parallels Desktop.
- Typical use: Developer workstations, testing, and educational labs.`,
    keyPoints: [
      'Virtualization turns dedicated hardware into flexible, software-programmable pools.',
      'Type 1 (Bare-Metal) hypervisors run directly on hardware: high performance, mission-critical production cloud default.',
      'Type 2 (Hosted) hypervisors run atop a host OS: convenient for local developer experimentation.',
      'Hypervisors arbitrate hardware interrupts and memory mapping via page tables (Intel VT-x / AMD-V extensions).'
    ],
    realWorldExample: 'AWS uses its custom Nitro System (a specialized Type 1 hypervisor architecture running on dedicated PCIe hardware cards) to eliminate virtualization hypervisor overhead, dedicating almost 100% of host CPU and RAM to customer EC2 instances.',
    displayOrder: 1,
  },
  {
    unitSlug: 'unit-2-virtualization-in-cloud',
    slug: 'u2-vms-vs-containers',
    title: 'Virtual Machines vs Containers (Docker & Kubernetes)',
    shortDescription: 'Hardware-level vs OS-level virtualization, guest OS overhead, container runtimes, and Kubernetes orchestration.',
    content: `While both Virtual Machines (VMs) and Containers provide isolated runtime environments, they operate at fundamentally different architectural layers:

1. Virtual Machines (Hardware-level Virtualization):
- Each VM includes the application, necessary binaries and libraries, and a complete, independent Guest Operating System.
- The hypervisor virtualizes physical CPU, RAM, disk controllers, and network interfaces.
- Strengths: Total kernel isolation, ability to run heterogeneous operating systems on one host (e.g., Windows VM on Linux hardware), military-grade security boundary.
- Drawbacks: High resource footprint (several GBs of disk and RAM per guest OS), slow boot time (30 seconds to several minutes).

2. Containers (Operating System-level Virtualization):
- Containers share the host operating system kernel and isolate user-space processes using Linux kernel namespaces (for PID, network, mount points) and cgroups (control groups for CPU/memory rationing).
- Standardized by container engines like Docker.
- Strengths: Extremely lightweight (few megabytes), instant boot time (sub-second), consistent environment from developer laptop to cloud production.
- Drawbacks: Containers must share the host OS kernel type (cannot run Windows kernel container natively on a Linux host kernel without a VM layer).

3. Container Orchestration (Kubernetes):
- In production, applications run across hundreds or thousands of container instances. Kubernetes (K8s) automates deployment, scaling, health-checking, service discovery, rolling updates, and self-healing across server clusters.`,
    keyPoints: [
      'VMs virtualize hardware and run independent guest OS kernels; containers virtualize the OS and share the host kernel.',
      'Containers achieve 10x higher deployment density and sub-second boot times compared to VMs.',
      'Docker packages applications and dependencies into immutable container images.',
      'Kubernetes automates container scheduling, auto-scaling, fault recovery, and load distribution across nodes.'
    ],
    realWorldExample: 'A single physical server with 64 GB RAM can host approximately 15 full Windows/Linux Virtual Machines, but can comfortably run over 250 microservice Docker containers using shared Linux kernel resources.',
    displayOrder: 2,
  },
  {
    unitSlug: 'unit-2-virtualization-in-cloud',
    slug: 'u2-resource-provisioning-vm-migration',
    title: 'Resource Provisioning, Ballooning & Live VM Migration',
    shortDescription: 'Dynamic resource allocation, memory overcommitment, dirty page pre-copy algorithm, and zero-downtime maintenance.',
    content: `Virtualization allows hypervisors to dynamically provision, overcommit, and relocate computing resources without service interruption:

1. Resource Overcommitment & Memory Ballooning:
- Hypervisors allow administrators to allocate more virtual CPU (vCPU) and virtual RAM to VMs than the physical hardware possesses, capitalizing on the statistical reality that VMs rarely peak simultaneously.
- Memory Ballooning: When the physical host runs low on memory, a balloon driver inside a low-priority VM inflates, forcing that VM's OS to page out inactive memory to disk and returning physical RAM pages to the hypervisor pool.

2. Live VM Migration:
- Live migration moves an active, running virtual machine from one physical host server to another across the local network with zero perceptible downtime to end users.
- Use Cases: Hardware maintenance, firmware upgrades, dynamic host load balancing, energy conservation (consolidating VMs at night to power down idle physical racks).

3. The Pre-Copy Migration Algorithm:
- Phase 1 (Preparation): Target host prepares VM configuration and allocates memory.
- Phase 2 (Iterative Pre-Copy): The hypervisor copies all physical memory pages from Source to Destination while the VM continues running. Pages modified during the copy ("dirty pages") are flagged and copied in subsequent iterative passes.
- Phase 3 (Stop-and-Copy): When the remaining dirty page rate is tiny, the VM is paused for 10-50 milliseconds. The CPU registers and final dirty pages are synchronized to the target host.
- Phase 4 (Resume): The VM resumes execution on the destination host, and network switches update their ARP tables to route traffic to the new host.`,
    keyPoints: [
      'Resource overcommitment maximizes physical server ROI by banking on statistical traffic multiplexing.',
      'Memory ballooning dynamically balances host memory without rebooting virtual machines.',
      'Live VM migration enables zero-downtime hardware maintenance and dynamic workload leveling.',
      'The pre-copy technique tracks and syncs dirty memory pages iteratively before a brief sub-50ms handoff.'
    ],
    realWorldExample: 'When an AWS physical data center rack requires urgent firmware security patching, AWS hypervisors live-migrate customer EC2 instances to adjacent physical hosts without interrupting live database connections or web traffic.',
    displayOrder: 3,
  },

  // --- UNIT 3 TOPICS ---
  {
    unitSlug: 'unit-3-cloud-architecture-services-models',
    slug: 'u3-cloud-architecture-framework',
    title: 'Cloud Architecture Framework & Service Oriented Architecture',
    shortDescription: 'Logical cloud reference models, loose coupling, Service Oriented Architecture (SOA), and orchestration engines.',
    content: `Cloud Architecture refers to the components and sub-components required for cloud computing, typically categorized into front-end platforms, back-end platforms, cloud-based delivery, and network interconnects.

1. Logical Cloud Layers:
- Front-End Layer: Client devices, web browsers, mobile apps, and developer CLI tools used to interact with cloud services.
- Back-End Infrastructure: Hyperscale data center physical hardware, virtualization layer, storage clusters, and network fabrics.
- Cloud Management / Orchestrator: The "brain" of the cloud. Coordinates resource provisioning, monitors health, executes auto-scaling rules, and enforces security policies (e.g., OpenStack Nova/Neutron, Kubernetes control plane).
- Storage and Database Tier: Distributed, durable storage systems providing block, object, and structured data querying.

2. Service Oriented Architecture (SOA) in Cloud:
- SOA is an architectural style where software components provide services to other components via a communication protocol over a network.
- Principles: Loose coupling (services can change internally without breaking dependent systems), standardized interfaces (REST, gRPC), service reusability, and autonomous discoverability.
- Cloud platforms expose every internal capability (compute provisioning, billing, DNS, message queues) as an independent RESTful or gRPC service.`,
    keyPoints: [
      'Cloud architecture splits into front-end clients, management orchestration, and back-end physical/virtual pools.',
      'The cloud orchestrator manages VM lifecycle, auto-scaling policies, and dynamic resource scheduling.',
      'SOA emphasizes loose coupling, self-contained business capabilities, and open API protocols.',
      'API-driven control planes enable complete infrastructure-as-code automation.'
    ],
    realWorldExample: 'When you execute `aws ec2 run-instances`, your command calls the EC2 API Gateway, which delegates to the orchestration controller to find available host hypervisors, attach EBS storage, assign a VPC IP, and boot your machine in 15 seconds.',
    displayOrder: 1,
  },
  {
    unitSlug: 'unit-3-cloud-architecture-services-models',
    slug: 'u3-multitenancy-elasticity-scalability',
    title: 'Multi-Tenancy, Elasticity vs Scalability',
    shortDescription: 'Tenant isolation patterns, the noisy neighbor dilemma, vertical scale-up vs horizontal scale-out elasticity.',
    content: `1. Multi-Tenancy Architecture:
Multi-tenancy is an architectural principle where a single instance of software and supporting infrastructure serves multiple distinct customer organizations (tenants):
- Data Isolation Patterns:
  a) Database per Tenant: Maximum isolation, higher cost, easy compliance.
  b) Schema per Tenant: Shared database engine, isolated schema per customer.
  c) Shared Database, Shared Schema: Lowest cost, records separated by a \`tenant_id\` column. Demands robust application-layer security.
- The "Noisy Neighbor" Problem: Occurs when one tenant consumes disproportionate CPU, I/O, or bandwidth, degrading performance for co-located tenants. Cloud providers combat this using strict resource quotas, rate limiters, and cgroup throttling.

2. Elasticity vs Scalability:
Although frequently conflated, they denote distinct capabilities:
- Scalability: The *capacity* of a system to handle increasing load by adding resources (can be manual or scheduled).
  - Vertical Scaling (Scale Up): Adding more CPU, RAM, or faster SSDs to a single server. Limitation: Hard hardware ceiling and single point of failure.
  - Horizontal Scaling (Scale Out): Adding more server nodes in parallel behind a load balancer. Virtually limitless scale.
- Elasticity: The *degree* to which a system adapts to workload fluctuations automatically in real time by provisioning and de-provisioning resources so that active capacity closely matches current demand.
- Scalability is about maximum handling capacity; Elasticity is about dynamic speed and cost optimization of adapting to change.`,
    keyPoints: [
      'Multi-tenancy shares underlying infrastructure while maintaining logical data and runtime isolation.',
      'Noisy neighbor issues are prevented using CPU/memory quotas, cgroups, and rate-limiting throttling.',
      'Vertical scaling (Scale Up) increases single server specs; Horizontal scaling (Scale Out) adds parallel nodes.',
      'Elasticity is automatic, real-time matching of resource capacity to fluctuating real-time load.'
    ],
    realWorldExample: 'An e-commerce ticket booking system scales horizontally from 4 servers to 80 servers during a flash sale in 8 minutes, and automatically contracts back to 4 servers when the rush ends (Elasticity), preventing $10,000s in idle server bills.',
    displayOrder: 2,
  },
  {
    unitSlug: 'unit-3-cloud-architecture-services-models',
    slug: 'u3-faas-caas-microservices',
    title: 'Modern Compute Paradigms: FaaS, CaaS & Microservices',
    shortDescription: 'Serverless Function as a Service (AWS Lambda), Container as a Service (ECS/GKE), and cloud-native microservices.',
    content: `Modern cloud architectures have evolved beyond traditional virtual machines into fine-grained serverless and containerized abstractions:

1. Function as a Service (FaaS / Serverless):
- Developers upload individual stateless event-driven code functions (e.g., in Node.js, Python, Go) without provisioning or managing servers.
- Functions execute in response to events (HTTP requests, file uploads, database triggers, message queues).
- Scale to Zero: If no requests arrive, zero instances run, and cost is exactly $0.
- Pay-per-Execution: Billed in 1-millisecond increments based on memory allocated and execution duration.
- Trade-offs: "Cold start" latency when spinning up a new container sandbox, strict execution time limits (e.g., 15 minutes in AWS Lambda).
- Examples: AWS Lambda, Google Cloud Functions, Azure Functions.

2. Container as a Service (CaaS):
- Managed platforms where users deploy, organize, run, and manage containerized applications without building and maintaining underlying Kubernetes control planes.
- Examples: Amazon ECS, Google Kubernetes Engine (GKE), Azure AKS, AWS Fargate (Serverless CaaS).

3. Microservices vs Monoliths:
- Monolith: Single codebase where UI, business logic, and database access are tightly coupled. Difficult to scale independently.
- Microservices: Application partitioned into small, independently deployable services communicating over lightweight APIs.
- Resilience Patterns: Circuit Breaker (prevents cascading failures when a downstream service is down), API Gateway (centralized routing, auth, and throttling), Service Mesh (mTLS and traffic telemetry).`,
    keyPoints: [
      'FaaS abstracts server management completely: write functions, bind triggers, pay only per millisecond.',
      'Cold starts represent the initialization latency when an idle serverless container launches.',
      'CaaS provides managed container orchestration (Kubernetes/ECS) without VM maintenance overhead.',
      'Microservices enable independent deployment cycles, fault isolation, and technology polyglot stacks.'
    ],
    realWorldExample: 'An image processing pipeline where a user uploads a photo to Amazon S3; an S3 event automatically triggers an AWS Lambda function (FaaS) that resizes the thumbnail, saves metadata to MongoDB, and terminates in 240ms for $0.000004.',
    displayOrder: 3,
  },

  // --- UNIT 4 TOPICS ---
  {
    unitSlug: 'unit-4-cloud-security-and-privacy',
    slug: 'u4-cia-triad-cloud-threats',
    title: 'The CIA Triad & Top Cloud Security Threats',
    shortDescription: 'Confidentiality, Integrity, and Availability in multi-tenant clouds; DDoS, data breaches, and credential exploitation.',
    content: `Securing cloud infrastructure requires understanding core information security objectives in the context of shared physical infrastructure:

1. The CIA Triad in Cloud Computing:
- Confidentiality: Ensuring that sensitive customer data is accessible only to authorized entities. Maintained via strong encryption (AES-256), strict IAM roles, and network security perimeters (VPCs, security groups).
- Integrity: Guaranteeing that data and system configurations remain accurate, unaltered, and protected against unauthorized modification. Enforced via cryptographic hash digests (SHA-256), digital signatures, and versioning.
- Availability: Ensuring authorized users have uninterrupted access to critical applications and data whenever needed. Achieved via multi-Availability Zone redundancy, automated failover, load balancing, and DDoS mitigation.

2. Top Cloud Security Threat Vectors:
- Distributed Denial of Service (DDoS): Attackers flood cloud endpoints with volumetric traffic (SYN floods, UDP amplification, HTTP floods) to exhaust network bandwidth or compute capacity. Mitigated by services like AWS Shield and Cloudflare.
- Cloud Misconfigurations: The #1 cause of cloud data breaches (e.g., public AWS S3 buckets containing unencrypted customer records, open 0.0.0.0/0 SSH security groups).
- Credential Harvesting & Account Hijacking: Compromised root account credentials or hardcoded API keys committed to public GitHub repositories.
- Insecure APIs: Unprotected microservice REST endpoints lacking authentication or rate limiting.
- Insider Threats & Shared Hypervisor Exploits (VM Escape): A theoretical attack where malicious code breaks out of a guest VM to control the host hypervisor.`,
    keyPoints: [
      'The CIA Triad (Confidentiality, Integrity, Availability) forms the cornerstone of cloud security architecture.',
      'Misconfiguration of access policies and storage buckets causes the vast majority of real-world cloud breaches.',
      'DDoS attacks target Availability; mitigated via scrubbing centers and edge content delivery networks.',
      'Defense-in-depth requires multiple security layers: perimeter, network, identity, host, and data encryption.'
    ],
    realWorldExample: 'The Capital One data breach (2019) occurred due to a misconfigured open-source Web Application Firewall (WAF) running on AWS EC2 with excessive IAM permissions, allowing an attacker to access Server-Side Request Forgery (SSRF) and extract 100 million credit applications.',
    displayOrder: 1,
  },
  {
    unitSlug: 'unit-4-cloud-security-and-privacy',
    slug: 'u4-iam-and-encryption',
    title: 'Identity & Access Management (IAM) and Encryption Standards',
    shortDescription: 'Role-Based Access Control (RBAC), Principle of Least Privilege, MFA, and Encryption at rest, in transit, and in use.',
    content: `In cloud environments, traditional network perimeters dissolve; Identity becomes the primary security perimeter:

1. Identity and Access Management (IAM):
- Principle of Least Privilege (PoLP): Users and software services are granted only the minimum permissions necessary to perform their required tasks, and nothing more.
- Role-Based Access Control (RBAC): Permissions are assigned to specific roles (e.g., \`DatabaseAdmin\`, \`BillingViewer\`, \`Developer\`) rather than individual people. Users assume roles based on job function.
- Multi-Factor Authentication (MFA): Demands at least two authentication factors (something you know: password; something you have: hardware FIDO2 key or TOTP authenticator; something you are: biometrics).
- Service Roles & Temporary Credentials: Cloud workloads (VMs, containers, functions) assume IAM roles using short-lived temporary security tokens (e.g., AWS STS), eliminating hardcoded API keys.

2. Cloud Encryption Across Three States:
- Encryption in Transit: Protects data traveling across public or private networks against eavesdropping and man-in-the-middle attacks. Implemented using TLS 1.3, HTTPS, and IPsec VPN tunnels.
- Encryption at Rest: Protects stored data on disks, SSDs, and tape backups against physical theft or unauthorized disk reads. Implemented using AES-256 symmetric encryption, managed by Key Management Services (AWS KMS, Google Cloud KMS) using envelope encryption.
- Encryption in Use (Confidential Computing): Protects data while actively processed in CPU registers and RAM using hardware-isolated enclaves (e.g., Intel SGX, AMD SEV), ensuring even the cloud hypervisor cannot inspect active memory.`,
    keyPoints: [
      'Identity is the new perimeter in zero-trust cloud architectures.',
      'The Principle of Least Privilege prevents lateral movement during a security breach.',
      'Never store hardcoded API keys in application source code; use IAM instance profiles and secret managers.',
      'Encryption must protect data in all three states: In Transit (TLS), At Rest (AES-256), and In Use (Confidential Computing).'
    ],
    realWorldExample: 'An Express.js web server running on an EC2 instance automatically requests temporary 1-hour credentials from the EC2 instance metadata service to read an S3 bucket, completely eliminating the need to write API secret keys into configuration files.',
    displayOrder: 2,
  },
  {
    unitSlug: 'unit-4-cloud-security-and-privacy',
    slug: 'u4-compliance-and-disaster-recovery',
    title: 'Regulatory Compliance & Disaster Recovery Strategies',
    shortDescription: 'ISO 27001, NIST, GDPR, HIPAA compliance, RTO, RPO, and multi-region disaster recovery deployment patterns.',
    content: `1. Compliance Frameworks in the Cloud:
Cloud providers undergo rigorous third-party audits to certify physical and operational controls:
- ISO/IEC 27001: The international standard for information security management systems (ISMS).
- NIST SP 800-53: Comprehensive catalog of security and privacy controls for federal information systems.
- GDPR (General Data Protection Regulation): European Union regulation mandating strict data privacy, explicit user consent, right-to-be-forgotten, and data residency within sovereign borders.
- HIPAA (Health Insurance Portability and Accountability Act): US regulation protecting sensitive patient health information (PHI) via mandatory encryption and audit logging.

2. Disaster Recovery (DR) Metrics:
Disaster Recovery plans are engineered around two critical parameters:
- Recovery Point Objective (RPO): The maximum acceptable amount of data loss measured in time (e.g., "We can tolerate losing at most 15 minutes of database transactions"). Determines backup frequency.
- Recovery Time Objective (RTO): The maximum acceptable duration of system downtime before service is restored (e.g., "The platform must be back online within 2 hours of a disaster"). Determines failover architecture.

3. Four Standard Disaster Recovery Strategies:
1. Backup and Restore (Highest RTO/RPO, Lowest Cost): Periodic tape or cloud object backups restored upon failure. Hours to days.
2. Pilot Light: Critical core data is continuously replicated to a secondary region, with minimal database servers running. Compute servers are spun up only during disaster failover. RTO in tens of minutes.
3. Warm Standby: A scaled-down version of the fully functional environment runs continuously in the secondary region. Immediately scaled out upon disaster. RTO in minutes.
4. Multi-Region Active-Active (Lowest RTO/RPO near zero, Highest Cost): Full production capacity runs simultaneously in two or more geographic regions with global load balancing and real-time distributed data synchronization.`,
    keyPoints: [
      'Compliance certifications (ISO 27001, SOC 2, HIPAA) validate that provider infrastructure meets international legal standards.',
      'RPO defines allowable data loss; RTO defines allowable system downtime.',
      'DR approaches trade cost against recovery speed: Backup/Restore < Pilot Light < Warm Standby < Active-Active.',
      'Regular automated DR failover testing (GameDays) is essential to prove recovery runbooks work.'
    ],
    realWorldExample: 'A financial payment processing gateway maintains an Active-Active Multi-Region deployment across US-East and US-West with continuous database replication, ensuring that even if an entire AWS data center region collapses, global payment transactions continue without disruption (RTO < 5 seconds).',
    displayOrder: 3,
  },

  // --- UNIT 5 TOPICS ---
  {
    unitSlug: 'unit-5-cloud-storage-data-management',
    slug: 'u5-block-file-object-storage',
    title: 'Cloud Storage Paradigms: Block, File, and Object Storage',
    shortDescription: 'Deep architectural comparison of SAN/EBS block storage, NAS/EFS file systems, and RESTful S3 object stores.',
    content: `Cloud storage systems are architected across three primary data storage paradigms, each optimized for specific access patterns and performance profiles:

1. Block Storage:
- Data is split into fixed-size raw blocks (e.g., 4KB or 512KB sectors) with unique 64-bit addresses, without any metadata or operating system filesystem concept.
- Connected directly to virtual machines over high-speed protocols (e.g., NVMe-oF, iSCSI, Fibre Channel) appearing as an unformatted raw hard drive.
- Characteristics: Ultra-low latency, high IOPS (Input/Output Operations Per Second), random read/write access.
- Best for: Transactional databases (PostgreSQL, MongoDB, Oracle), virtual machine boot volumes.
- Cloud Examples: Amazon EBS (Elastic Block Store), Google Persistent Disk, Azure Managed Disks.

2. File Storage:
- Data is organized in a hierarchical folder tree structure with nested directories, filenames, permissions, and POSIX filesystem compliance.
- Accessed concurrently over network file protocols like NFS (Network File System) or SMB/CIFS.
- Characteristics: Multi-instance read/write sharing, moderate latency, familiar directory interface.
- Best for: Shared application directories, content management systems (WordPress uploads), legacy software migrations, home directories.
- Cloud Examples: Amazon EFS (Elastic File System), Azure Files, Google Cloud Filestore.

3. Object Storage:
- Data is stored as discrete immutable objects containing the file payload, an assigned unique key identifier, and rich, customizable metadata.
- Organized in flat logical namespaces called "Buckets" without traditional nested folders.
- Accessed exclusively via HTTP/HTTPS REST APIs (GET, PUT, DELETE) rather than operating system disk mounting.
- Characteristics: Infinite horizontal scalability, high durability (99.999999999% - 11 9s), low cost, higher latency for initial byte.
- Best for: Static web hosting, media streaming files, big data analytics lakes, backups, machine learning training datasets.
- Cloud Examples: Amazon S3, Google Cloud Storage, Azure Blob Storage.`,
    keyPoints: [
      'Block Storage operates at the raw sector level: ultra-fast, ideal for databases and VM OS boot disks.',
      'File Storage provides shared hierarchical POSIX directory access across multiple VM instances concurrently.',
      'Object Storage provides flat, REST-accessible storage with rich metadata and virtually infinite scalability.',
      'Durability vs Latency: Object storage achieves 11 nines of durability at the cost of higher per-request latency.'
    ],
    realWorldExample: 'A modern social media application uses Amazon EBS Block Storage to run its high-throughput PostgreSQL database, uses Amazon EFS File Storage for shared configuration files across web workers, and stores all user photos and video uploads in Amazon S3 Object Storage.',
    displayOrder: 1,
  },
  {
    unitSlug: 'unit-5-cloud-storage-data-management',
    slug: 'u5-amazon-s3-gcs-storage-lifecycle',
    title: 'Amazon S3 & GCS Architecture, Lifecycle & Replication',
    shortDescription: 'Bucket architecture, 11 9s durability, storage classes, automated tiering, and Cross-Region Replication (CRR).',
    content: `Amazon S3 (Simple Storage Service) and Google Cloud Storage (GCS) are the global standards for cloud object storage, architected for high durability and automated lifecycle management:

1. Architecture and Durability:
- Built to provide 99.999999999% (11 nines) of annual durability. If you store 10,000,000 objects in S3, on average you would lose one object every 10,000 years.
- Achieved by synchronously replicating every written object across a minimum of three distinct physical Availability Zones (data centers separated by kilometers) with automatic parity verification and self-healing algorithms.

2. Storage Classes and Cost Optimization:
To optimize spending, providers offer tiered storage classes based on access frequency:
- S3 Standard: High-frequency access, lowest latency, highest storage cost per GB.
- S3 Infrequent Access (Standard-IA): For data accessed less often but requiring millisecond retrieval when requested. Cheaper storage cost, small per-GB retrieval fee.
- S3 Glacier Flexible Retrieval: For archival data and backups. Significantly lower storage cost, retrieval takes 1-5 minutes (Expedited) or 3-5 hours (Standard).
- S3 Glacier Deep Archive: Lowest cost storage ($0.00099 per GB/month). Retrieval takes 12 to 48 hours. Used for multi-year regulatory records.
- S3 Intelligent-Tiering: Automatically moves objects between frequent, infrequent, and archive access tiers based on real-time access patterns without operational overhead.

3. Cross-Region Replication (CRR):
- Automatically and asynchronously replicates newly created objects from a source bucket in one geographic region (e.g., US-East) to a target bucket in another region (e.g., AP-South, Mumbai).
- Essential for minimizing latency for global users and complying with disaster recovery business continuity plans.`,
    keyPoints: [
      'S3 delivers 11 9s durability by mirroring objects across at least 3 physically separate Availability Zones.',
      'Lifecycle policies automatically transition aging data to cheaper archive tiers (Standard -> IA -> Glacier).',
      'S3 Intelligent-Tiering eliminates manual analysis by monitoring access frequency and shifting objects automatically.',
      'Cross-Region Replication (CRR) protects against regional catastrophic failures and complies with data sovereignty.'
    ],
    realWorldExample: 'A healthcare analytics firm stores raw MRI scans in S3 Standard for 30 days during active diagnosis, transitions them automatically via Lifecycle rules to S3 Infrequent Access for 90 days, and archives them into Glacier Deep Archive for 7 years to meet HIPAA medical retention mandates.',
    displayOrder: 2,
  },
  {
    unitSlug: 'unit-5-cloud-storage-data-management',
    slug: 'u5-consistency-models-hdfs-cdn',
    title: 'Data Consistency (CAP Theorem), HDFS & CDNs',
    shortDescription: 'CAP theorem, Strong vs Eventual consistency, Hadoop HDFS architecture, and Edge Content Delivery Networks.',
    content: `1. The CAP Theorem & Consistency Models:
Formulated by Eric Brewer, the CAP theorem states that any distributed data store can simultaneously provide at most two of the following three guarantees in the presence of a network partition:
- Consistency (C): Every read receives the most recent write or an error.
- Availability (A): Every non-failing node returns a non-error response for every request (without guaranteeing it is the latest write).
- Partition Tolerance (P): The system continues to operate despite arbitrary message loss or network communication failure between nodes.
Since network partitions are inevitable in real-world networks (P is mandatory), distributed systems must trade off between:
- CP Systems (e.g., MongoDB, HBase): Prioritize consistency; will reject writes or reads during partitions to prevent split-brain.
- AP Systems (e.g., Cassandra, DynamoDB): Prioritize availability; continue accepting writes, resulting in Eventual Consistency (data synchronizes across replicas over time).

2. Hadoop Distributed File System (HDFS):
The foundation of Big Data distributed processing:
- Architecture: Master/Worker topology.
  - NameNode (Master): Maintains the filesystem namespace, directory tree, and tracks which DataNodes hold which blocks.
  - DataNodes (Workers): Store actual raw data blocks (default block size: 128 MB) on local disks and periodically report block health to the NameNode via heartbeats.
- Block Replication: Default replication factor is 3 (one block on local rack, one on different node in local rack, one on a node in an external remote rack).

3. Content Delivery Networks (CDNs):
- A globally distributed network of proxy caching servers situated at Points of Presence (PoPs) close to end-users (Edge locations).
- When a user requests content (images, video segments, CSS/JS), the request is routed to the nearest CDN Edge node. If cached, content is returned in sub-10ms without hitting the origin cloud server.
- Examples: Cloudflare, Amazon CloudFront, Fastly.`,
    keyPoints: [
      'CAP Theorem dictates that when network partitions occur, distributed databases must choose between Consistency (CP) or Availability (AP).',
      'Eventual Consistency guarantees all replicas converge to the same value given sufficient time without new writes.',
      'HDFS splits massive files into 128MB chunks and distributes them across DataNodes with 3x rack-aware replication.',
      'CDNs terminate TLS and cache content at edge PoPs, drastically reducing origin load and global page latency.'
    ],
    realWorldExample: 'When an Indian user streams an episode on Netflix, the video data is served directly from an Amazon CloudFront or Open Connect CDN edge cache node inside their local ISP network in Mumbai or Delhi, bypassing transatlantic origin server roundtrips.',
    displayOrder: 3,
  },

  // --- UNIT 6 TOPICS ---
  {
    unitSlug: 'unit-6-cloud-trends-standards-future-scope',
    slug: 'u6-cloud-standards-and-governance',
    title: 'Cloud Computing Standards (IEEE & NIST) & Governance',
    shortDescription: 'IEEE 2301 and 2302 interoperability standards, NIST reference architecture, and avoiding vendor lock-in.',
    content: `As organizations adopt multi-cloud and hybrid environments, standardization and governance become critical to ensure interoperability and avoid proprietary vendor lock-in:

1. International Cloud Standards Organizations:
- National Institute of Standards and Technology (NIST):
  - NIST SP 800-145: Canonical cloud definitions and characteristics.
  - NIST SP 500-292: Cloud Computing Reference Architecture, defining the five major actors: Cloud Consumer, Cloud Provider, Cloud Broker, Cloud Auditor, and Cloud Carrier.
- Institute of Electrical and Electronics Engineers (IEEE):
  - IEEE 2301: Guide for Cloud Profiles, standardizing interfaces across cloud management systems to enable workload portability.
  - IEEE 2302: Standard for Intercloud Interoperability and Federation (SIIF), defining protocols for federated identity, resource exchange, and seamless data transfer between competing cloud platforms.
- Cloud Security Alliance (CSA):
  - CSA Cloud Controls Matrix (CCM): Cybersecurity control framework mapping to ISO, NIST, and PCI-DSS.

2. Cloud Governance & Well-Architected Framework:
- Cost Management & FinOps: Automated budget alarms, anomaly detection, rightsizing compute resources, and leveraging Spot/Reserved pricing.
- Tagging Strategies: Mandatory tagging (e.g., \`Environment=Production\`, \`Owner=Finance\`, \`CostCenter=402\`) to track resource allocation.
- Avoiding Vendor Lock-In: Utilizing open-source container standards (Docker OCI), container orchestrators (Kubernetes), and declarative Infrastructure as Code (Terraform) rather than proprietary provider-specific templates.`,
    keyPoints: [
      'NIST SP 500-292 establishes the five core cloud actors: Consumer, Provider, Broker, Auditor, and Carrier.',
      'IEEE 2301 and 2302 define frameworks for cross-cloud interoperability and intercloud federation.',
      'Cloud governance ensures compliance, security baselines, and financial cost controls across enterprise accounts.',
      'Containerization and open Infrastructure as Code (Terraform) insulate organizations against vendor lock-in.'
    ],
    realWorldExample: 'An enterprise banking group establishes automated policy guards using Open Policy Agent (OPA) that automatically reject any cloud infrastructure deployment that lacks required encryption tags or attempts to expose database ports to the public internet.',
    displayOrder: 1,
  },
  {
    unitSlug: 'unit-6-cloud-trends-standards-future-scope',
    slug: 'u6-emerging-trends-edge-serverless-ai',
    title: 'Emerging Cloud Paradigms: Edge, AI & Green Cloud Computing',
    shortDescription: 'Edge/Fog computing architectures, distributed AI/ML acceleration, and Green Cloud sustainability metrics (PUE).',
    content: `The boundary of cloud computing is rapidly expanding outward toward edge devices and incorporating specialized AI acceleration:

1. Edge Computing & Fog Computing:
- Traditional cloud computing centralizes processing in hyperscale data centers thousands of kilometers away.
- Edge Computing shifts processing, storage, and analytics directly to the network edge, physically adjacent to data creators (smartphones, autonomous vehicles, industrial IoT sensors, hospital monitors).
- Fog Computing acts as an intermediate architectural layer between Edge devices and centralized hyperscale clouds, aggregating and filtering data.
- Advantages: Sub-millisecond latency, massive bandwidth reduction (filtering noise locally instead of streaming gigabytes of raw sensor data), and local operational autonomy during internet outages.

2. AI & High-Performance Computing (HPC) in Cloud:
- Modern Large Language Models (LLMs) and computer vision models demand thousands of specialized GPUs/TPUs (Nvidia H100, Google TPU v5) interconnected via ultra-fast InfiniBand networks.
- Hyperscale clouds offer managed AI services: Model training clusters, serverless inference endpoints, and foundation model APIs (e.g., AWS Bedrock, Google Vertex AI, Azure OpenAI Service).

3. Green Cloud Computing:
- Data centers consume approximately 1-2% of global electricity. Green cloud computing focuses on minimizing environmental footprint through hardware efficiency, liquid cooling, and renewable energy.
- Power Usage Effectiveness (PUE): The standard industry efficiency metric:
  PUE = (Total Facility Energy Consumption) / (IT Equipment Energy Consumption).
  An ideal PUE is 1.0 (every watt goes directly to running servers). Traditional enterprise data centers average 1.6 - 2.0; hyperscale cloud providers achieve 1.10 - 1.20 using advanced adiabatic cooling and AI-optimized airflow.`,
    keyPoints: [
      'Edge computing processes telemetry data locally for ultra-low latency and network bandwidth optimization.',
      'Fog computing provides an intermediate processing and routing tier between local edge nodes and central clouds.',
      'Hyperscale cloud providers operate the world\'s largest AI supercomputing clusters with specialized accelerators.',
      'Power Usage Effectiveness (PUE) measures data center energy efficiency, targeting close to 1.0.'
    ],
    realWorldExample: 'An autonomous self-driving car processes sensor telemetry and obstacle avoidance cameras locally at the vehicle edge in under 2 milliseconds, while sending summarized road hazard data back to the central cloud for long-term fleet training.',
    displayOrder: 2,
  },
  {
    unitSlug: 'unit-6-cloud-trends-standards-future-scope',
    slug: 'u6-cloud-migration-and-case-studies',
    title: 'Cloud Migration Strategies (Gartner 6 Rs) & Enterprise Case Studies',
    shortDescription: 'Gartner 6 Rs migration framework, Netflix full-cloud migration, and Dropbox storage repatriation analysis.',
    content: `Migrating legacy enterprise systems to the cloud requires structured strategic evaluation:

1. Gartner 6 Rs Migration Framework:
1. Rehost ("Lift and Shift"): Moving applications from on-premise servers directly to cloud virtual machines without modifying code or architecture. Fastest migration, lowest immediate risk, but fails to exploit cloud-native elasticity.
2. Replatform ("Lift, Tinker, and Shift"): Making minor cloud optimizations without changing core code (e.g., migrating a self-managed Oracle database to Amazon RDS managed database).
3. Repurchase ("Drop and Shop"): Replacing a legacy custom application entirely with a modern SaaS solution (e.g., replacing on-premise CRM with Salesforce).
4. Refactor / Re-architect: Redesigning and rewriting the application using cloud-native microservices, serverless, and container technologies. Highest effort and cost, but unlocks maximum elasticity, scalability, and performance.
5. Retire: Decommissioning redundant, obsolete applications that are no longer needed.
6. Retain ("Do Nothing"): Keeping certain legacy or tightly coupled systems on-premise due to regulatory barriers or high migration complexity.

2. Enterprise Case Study: Netflix Migration to AWS:
- In 2008, Netflix suffered a major database corruption in their private data center, halting DVD shipments for three days. They made the strategic decision to migrate 100% of IT and streaming infrastructure to AWS.
- Key Architecture: Completely refactored from monolith to microservices; invented Chaos Engineering (Chaos Monkey) to randomly terminate production servers to prove resilience; built Spinnaker and Eureka for global service orchestration.

3. Enterprise Case Study: Dropbox Infrastructure Repatriation:
- Dropbox initially ran their file storage on Amazon S3. As their scale crossed 500 Petabytes, S3 storage costs became enormous.
- The Repatriation Strategy: Dropbox built "Magic Pocket," their own custom, high-density, multi-datacenter private storage architecture, migrating over 90% of user data off AWS S3 back to company-owned hardware, saving an estimated $75 million over two years.
- Lesson: Public cloud is optimal for rapid scaling, experimentation, and variable traffic, but at extreme multi-petabyte scale with steady-state workloads, specialized private infrastructure can yield massive cost savings.`,
    keyPoints: [
      'Gartner\'s 6 Rs framework guides cloud migration: Rehost, Replatform, Repurchase, Refactor, Retire, Retain.',
      'Rehost is the fastest migration path; Refactor delivers the highest cloud-native elasticity and resilience.',
      'Netflix proved that 100% public cloud migration combined with Chaos Engineering delivers global 99.99% uptime.',
      'Dropbox\'s repatriation demonstrated that extreme, predictable scale can make private custom infrastructure cost-effective.'
    ],
    realWorldExample: 'A university migrates its legacy student portal by Rehosting onto AWS EC2 over the summer, Replaces its legacy HR software by Repurchasing Workday SaaS, and Retains its campus identity badge card system on-premise.',
    displayOrder: 3,
  },
];

export const lessonsData: SeedLesson[] = [
  // Lesson for Topic 1 (Definition & NIST)
  {
    topicSlug: 'u1-definition-evolution-characteristics',
    title: 'Deconstructing the 5 NIST Characteristics with Code & Scenarios',
    introduction: 'In this lesson, we break down each of the five NIST essential cloud characteristics with practical scenarios and configuration code.',
    content: `When students read about NIST characteristics, they often struggle to visualize how they translate into production systems. Let us trace a complete scenario:

Scenario: Launching an e-commerce microservice:
1. On-Demand Self-Service:
The engineer does not file a ticket with IT administrators. Instead, they run:
\`\`\`bash
aws ec2 run-instances --image-id ami-0c55b159cbfafe1f0 --instance-type t3.micro --count 2
\`\`\`
The cloud control plane validates the API token, provisions the hardware, and returns running instance IDs in 18 seconds.

2. Broad Network Access:
The application exposes a standard REST API over HTTPS on port 443. It can be consumed identically by an iOS mobile app, an Android tablet, a React web frontend, or an automated cURL script.

3. Resource Pooling:
Behind the scenes, your virtual machine runs on physical hypervisor host server #104 in US-East-1. Adjacent VMs on the same physical motherboard belong to completely different companies. Hardware isolation (Intel VT-x / AMD-V) prevents either VM from seeing the other's RAM or CPU cache.

4. Rapid Elasticity:
When incoming traffic surges past 80% CPU utilization, an Auto Scaling Group automatically launches 5 additional instances. When traffic subsides at 2:00 AM, the extra instances are automatically terminated.

5. Measured Service:
At the end of the billing period, your cloud invoice itemizes:
- Compute: 1,420 instance-hours @ $0.0104/hr = $14.77
- Data Transfer: 84.2 GB egress @ $0.09/GB = $7.58
- Storage: 50 GB EBS gp3 @ $0.08/GB-month = $4.00
Every penny is mathematically traceable to metered consumption.`,
    practicalExample: 'Configuring an AWS Auto Scaling policy in Terraform to enforce Rapid Elasticity based on CloudWatch CPU alarms.',
    summary: 'The 5 NIST characteristics are not abstract buzzwords; they represent precise operational properties enforced by cloud software control planes.',
    displayOrder: 1,
  },
  // Lesson for Topic 3 (IaaS, PaaS, SaaS)
  {
    topicSlug: 'u1-service-models-iaas-paas-saas',
    title: 'The Pizza as a Service Metaphor & Responsibility Breakdown',
    introduction: 'A classic and memorable industry metaphor to master the boundaries between On-Premise, IaaS, PaaS, and SaaS.',
    content: `To understand who manages what, consider the famous "Pizza as a Service" analogy:

1. Traditional On-Premise = Made at Home:
You provide: Dining table, soda, gas oven, fire, pizza dough, sauce, cheese, toppings.
In IT: You manage Networking, Storage, Servers, Virtualization, OS, Middleware, Runtime, Data, and Applications.

2. IaaS = Take and Bake:
The vendor provides: Dough, sauce, toppings, and cheese.
You provide: Oven, gas, soda, dining table.
In IT: The cloud vendor provides Networking, Storage, Servers, and Virtualization. You install and manage the Operating System, configure middleware, runtimes, applications, and manage data.

3. PaaS = Pizza Delivered:
The vendor provides: Dough, toppings, oven, cooking, and delivery.
You provide: Dining table and soda.
In IT: The vendor provides everything up to the execution runtime. You simply bring your application code and database data.

4. SaaS = Dining Out at an Italian Restaurant:
The vendor provides: Everything! You sit down, eat, pay the bill, and leave.
In IT: The vendor provides the entire stack. You simply log in and use the software through your web browser.`,
    practicalExample: 'Comparing the steps to deploy a Node.js Express server: On IaaS (EC2), you SSH into Ubuntu, install Node, install Nginx, configure systemd. On PaaS (Render/Vercel), you simply connect your GitHub repo and click Deploy.',
    summary: 'Choose IaaS when you need custom OS kernels or low-level network control; choose PaaS to ship software quickly; choose SaaS when commercial solutions solve your business need.',
    displayOrder: 1,
  },
  // Lesson for Unit 2 (Hypervisors)
  {
    topicSlug: 'u2-virtualization-types-hypervisors',
    title: 'Inside the Hypervisor: How Hardware Assists Virtualization',
    introduction: 'Examine how CPU virtualization extensions (Intel VT-x, AMD-V) eliminate the traditional virtualization performance penalty.',
    content: `Historically, the x86 architecture was notoriously difficult to virtualize because 17 sensitive CPU instructions (like POPF and CLI) behaved differently when executed in non-privileged rings without trapping to the hypervisor (Popek-Goldberg virtualization requirements failure).

1. Binary Translation vs Hardware Assistance:
- Old Approach (Binary Translation): Early hypervisors (VMware Workstation 1.0) had to parse guest OS binary instructions at runtime and dynamically rewrite sensitive instructions into safe trap-and-emulate instructions. This caused a 15-30% CPU performance penalty.
- Modern Approach (Hardware-Assisted Virtualization): In 2005-2006, Intel introduced VT-x (VMX root and non-root operations) and AMD introduced AMD-V.
  - VMX Root Operation: Used by the Hypervisor to maintain full control.
  - VMX Non-Root Operation: Used by the Guest OS and its applications.
  - When the guest OS attempts a sensitive privileged instruction, the CPU triggers a "VM-Exit" hardware trap, transferring execution directly to the hypervisor.

2. Memory Virtualization (SLAT / EPT):
- CPUs implement Extended Page Tables (EPT) or Second Level Address Translation (SLAT).
- The CPU hardware MMU (Memory Management Unit) automatically translates:
  Guest Virtual Address (GVA) -> Guest Physical Address (GPA) -> Host Physical Address (HPA).
- This eliminates the need for software-managed shadow page tables, boosting virtualized memory speed to within 1-2% of bare-metal hardware.`,
    practicalExample: 'Checking whether your server processor supports hardware virtualization on Linux: `egrep -c "(vmx|svm)" /proc/cpuinfo`. A result > 0 confirms Intel VT-x or AMD-V support.',
    summary: 'Modern cloud virtualization runs at near bare-metal performance because hardware CPU extensions (VT-x, EPT) handle privilege separation in silicon.',
    displayOrder: 1,
  },
  // Lesson for Unit 3 (Elasticity vs Scalability)
  {
    topicSlug: 'u3-multitenancy-elasticity-scalability',
    title: 'Designing for Horizontal Elasticity with Stateless Architectures',
    introduction: 'Learn the architectural patterns required to make an application truly elastic in a cloud environment.',
    content: `The golden rule of horizontal cloud elasticity is: "Servers must be treated as cattle, not pets."

Why Stateful Apps Break Elasticity:
If your web application stores user sessions in local server memory (\`express-session\` in RAM), what happens when the Auto Scaler shuts down server #3?
All users connected to server #3 get logged out abruptly. Furthermore, a load balancer must configure "sticky sessions" (pinning users to specific servers), which destroys equal traffic distribution.

The Stateless Architecture Blueprint:
1. Decouple User Session State:
Store user authentication sessions in an external high-speed in-memory database like Redis or Memcached, or utilize stateless cryptographically signed JWT tokens (JSON Web Tokens).

2. Decouple File Uploads:
Never save user uploaded files to the local VM disk (\`/var/www/uploads\`). If you scale up to 4 servers, a file uploaded to server #1 will not exist on servers #2, #3, or #4. Always upload directly to an Object Storage bucket (Amazon S3 / GCS).

3. Decouple Database Persistence:
Run databases on managed cloud database clusters (RDS, MongoDB Atlas) or separate dedicated database instances.

Once your application tier is 100% stateless, adding 10 servers or destroying 8 servers can be done in seconds without dropping a single active customer session.`,
    practicalExample: 'Refactoring an Express.js app from local memory sessions to Redis-backed session storage (`connect-redis`) to enable seamless multi-node auto-scaling.',
    summary: 'Stateless application tiers are the prerequisite for cloud horizontal elasticity and resilient zero-downtime rolling deployments.',
    displayOrder: 1,
  },
];

export const quizzesData: SeedQuiz[] = [
  {
    unitSlug: 'unit-1-intro-to-cloud-computing',
    title: 'Unit 1 Mastery Quiz: Fundamentals & Cloud Models',
    description: 'Test your understanding of NIST characteristics, traditional IT vs cloud, and IaaS/PaaS/SaaS service architectures.',
    questions: [
      {
        question: 'Which organization authored the industry-standard definition of Cloud Computing in Special Publication 800-145?',
        options: ['ISO (International Organization for Standardization)', 'NIST (National Institute of Standards and Technology)', 'IEEE (Institute of Electrical and Electronics Engineers)', 'W3C (World Wide Web Consortium)'],
        correctAnswer: 1,
        explanation: 'NIST (National Institute of Standards and Technology) defined the five essential characteristics, three service models, and four deployment models in NIST SP 800-145 in 2011.',
        difficulty: 'easy',
        displayOrder: 1,
      },
      {
        question: 'Which of the following is NOT one of the five NIST essential characteristics of cloud computing?',
        options: ['On-Demand Self-Service', 'Broad Network Access', 'Fixed Physical Location', 'Rapid Elasticity'],
        correctAnswer: 2,
        explanation: 'Resource Pooling provides location independence where customers generally have no control or knowledge over the exact physical location of resources. Fixed Physical Location is the opposite of cloud architecture.',
        difficulty: 'easy',
        displayOrder: 2,
      },
      {
        question: 'In the Cloud Shared Responsibility Model, which layer is typically managed by the customer in Platform as a Service (PaaS)?',
        options: ['Physical server hardware', 'Operating system security patches', 'Application code and data', 'Network virtualization switches'],
        correctAnswer: 2,
        explanation: 'In PaaS, the cloud provider manages physical hardware, hypervisors, OS patching, and runtimes. The customer is responsible solely for their application code and data.',
        difficulty: 'medium',
        displayOrder: 3,
      },
      {
        question: 'What financial term describes the pay-as-you-go operational expense model characteristic of cloud computing?',
        options: ['CapEx (Capital Expenditure)', 'OpEx (Operational Expenditure)', 'Depreciation Asset Model', 'Sunk Cost Allocation'],
        correctAnswer: 1,
        explanation: 'Cloud computing converts upfront fixed capital costs (CapEx) into variable pay-as-you-go operational expenditures (OpEx).',
        difficulty: 'easy',
        displayOrder: 4,
      },
      {
        question: 'Which cloud deployment model is specifically designed for multiple organizations that share common regulatory, compliance, or mission requirements?',
        options: ['Public Cloud', 'Private Cloud', 'Community Cloud', 'Hybrid Cloud'],
        correctAnswer: 2,
        explanation: 'Community Cloud is provisioned for exclusive use by a specific community of consumers from organizations that have shared concerns such as mission, security requirements, and compliance.',
        difficulty: 'medium',
        displayOrder: 5,
      },
    ],
  },
  {
    unitSlug: 'unit-2-virtualization-in-cloud',
    title: 'Unit 2 Mastery Quiz: Virtualization, Hypervisors & Containers',
    description: 'Assess your knowledge of Type 1 vs Type 2 hypervisors, Docker containerization, and live VM migration.',
    questions: [
      {
        question: 'Which hypervisor type runs directly on the bare-metal physical host hardware without an underlying host operating system?',
        options: ['Type 1 Hypervisor', 'Type 2 Hypervisor', 'Container Runtime Engine', 'Virtual Desktop Infrastructure'],
        correctAnswer: 0,
        explanation: 'Type 1 (Bare-Metal) hypervisors (such as VMware ESXi, KVM, and Citrix Xen) run directly on host physical hardware, providing high efficiency and security for cloud infrastructure.',
        difficulty: 'easy',
        displayOrder: 1,
      },
      {
        question: 'What is the key architectural difference between Virtual Machines and Docker Containers?',
        options: ['Containers run on bare metal; VMs run in web browsers', 'VMs virtualize the hardware and include full guest operating systems; Containers share the host OS kernel', 'VMs cannot run Linux; Containers can only run Linux', 'VMs use Dockerfiles; Containers use ISO image discs'],
        correctAnswer: 1,
        explanation: 'VMs abstract physical hardware and each require a complete guest OS. Containers abstract the operating system and share the host OS kernel, making them lightweight and fast.',
        difficulty: 'medium',
        displayOrder: 2,
      },
      {
        question: 'During Live VM Migration using the pre-copy algorithm, how does the hypervisor handle memory changes while the VM continues running?',
        options: ['It powers off the VM immediately', 'It flags modified pages as "dirty pages" and copies them iteratively in subsequent passes', 'It deletes all temporary cache memory', 'It asks the user to re-upload their database'],
        correctAnswer: 1,
        explanation: 'The iterative pre-copy technique tracks memory pages that are modified while the transfer is occurring (dirty pages) and resends them in successive rounds before a brief millisecond freeze.',
        difficulty: 'hard',
        displayOrder: 3,
      },
      {
        question: 'Which mechanism enables a hypervisor to reclaim unused memory from a virtual machine by inflating an internal driver?',
        options: ['CPU Throttling', 'Memory Ballooning', 'Disk Stripping', 'Cold Migration'],
        correctAnswer: 1,
        explanation: 'Memory ballooning uses a guest balloon driver that expands to force the guest OS to page out inactive memory to disk, freeing physical RAM for the hypervisor pool.',
        difficulty: 'medium',
        displayOrder: 4,
      },
    ],
  },
  {
    unitSlug: 'unit-3-cloud-architecture-services-models',
    title: 'Unit 3 Mastery Quiz: Architecture, Elasticity & Microservices',
    description: 'Test your understanding of multi-tenancy, horizontal vs vertical scaling, FaaS, and cloud-native patterns.',
    questions: [
      {
        question: 'What is the primary difference between Scalability and Elasticity in cloud computing?',
        options: ['Scalability handles load by upgrading hardware; Elasticity only applies to storage', 'Scalability is the capability to handle increased workload; Elasticity is the dynamic automatic adaptation of resources to match real-time demand', 'They are exact synonyms with no distinction', 'Scalability is only in public cloud; Elasticity is only in private cloud'],
        correctAnswer: 1,
        explanation: 'Scalability is the infrastructure capacity to handle growing workloads; Elasticity is the autonomous real-time expansion and contraction of resources matching current demand.',
        difficulty: 'medium',
        displayOrder: 1,
      },
      {
        question: 'What term describes a tenant consuming disproportionate shared CPU or I/O resources and degrading performance for other tenants on the same physical host?',
        options: ['Privilege Escalation', 'Noisy Neighbor Problem', 'Cold Start Latency', 'Split Brain Syndrome'],
        correctAnswer: 1,
        explanation: 'The "Noisy Neighbor" problem occurs in multi-tenant environments when one co-located workload monopolizes shared hardware bandwidth.',
        difficulty: 'easy',
        displayOrder: 2,
      },
      {
        question: 'In Function as a Service (FaaS) / Serverless architectures, what occurs during a "Cold Start"?',
        options: ['The data center cooling system drops below freezing', 'The provider initializes a new container sandbox runtime before executing the function for the first time', 'The function execution exceeds its 15-minute time limit', 'The database drops all existing connections'],
        correctAnswer: 1,
        explanation: 'A Cold Start is the delay incurred when an idle serverless function receives a request, requiring the cloud provider to provision a new micro-container environment and load the runtime before executing.',
        difficulty: 'medium',
        displayOrder: 3,
      },
      {
        question: 'Which cloud-native design pattern automatically halts requests to a failing downstream microservice to prevent cascading system collapse?',
        options: ['Circuit Breaker Pattern', 'Singleton Pattern', 'Factory Pattern', 'Observer Pattern'],
        correctAnswer: 0,
        explanation: 'The Circuit Breaker pattern detects failures and trips the circuit, immediately returning fallback responses and preventing cascading failure across dependent microservices.',
        difficulty: 'medium',
        displayOrder: 4,
      },
    ],
  },
  {
    unitSlug: 'unit-4-cloud-security-and-privacy',
    title: 'Unit 4 Mastery Quiz: Security, IAM, Encryption & DR',
    description: 'Validate your grasp of the CIA triad, IAM principles, encryption in all three states, and disaster recovery metrics.',
    questions: [
      {
        question: 'Which security principle mandates that users and services should only be granted the minimum permissions strictly necessary to perform their job?',
        options: ['Principle of Defense in Depth', 'Principle of Least Privilege (PoLP)', 'Principle of High Availability', 'Principle of Multi-Tenancy'],
        correctAnswer: 1,
        explanation: 'The Principle of Least Privilege states that any entity should only possess the minimum credentials and access rights necessary to complete its required tasks.',
        difficulty: 'easy',
        displayOrder: 1,
      },
      {
        question: 'What does the Recovery Point Objective (RPO) measure in a Disaster Recovery plan?',
        options: ['The maximum acceptable amount of data loss measured in time', 'The total duration of system downtime before service is restored', 'The financial cost of purchasing replacement servers', 'The distance in kilometers between two redundant data centers'],
        correctAnswer: 0,
        explanation: 'RPO (Recovery Point Objective) defines the acceptable amount of data loss measured backward in time from the moment of disaster. RTO (Recovery Time Objective) defines downtime duration.',
        difficulty: 'medium',
        displayOrder: 2,
      },
      {
        question: 'Which emerging encryption paradigm protects sensitive data while it is actively being processed inside CPU registers and RAM?',
        options: ['Encryption in Transit (TLS 1.3)', 'Encryption at Rest (AES-256)', 'Confidential Computing / Encryption in Use', 'Asymmetric RSA Public Key Exchange'],
        correctAnswer: 2,
        explanation: 'Confidential Computing uses hardware-isolated enclaves (e.g., Intel SGX, AMD SEV) to encrypt data in use while inside processor registers and system memory.',
        difficulty: 'hard',
        displayOrder: 3,
      },
      {
        question: 'What is statistically recognized as the leading root cause of enterprise data breaches in public cloud environments?',
        options: ['Zero-day hypervisor hardware flaws', 'Cloud misconfigurations (e.g., open S3 buckets, excessive IAM permissions)', 'Physical break-ins at hyperscale server farms', 'Fiber-optic undersea cable cuts'],
        correctAnswer: 1,
        explanation: 'According to major security reports (Gartner, CSA), cloud misconfigurations and identity/permission errors by customer administrators cause over 90% of cloud security incidents.',
        difficulty: 'easy',
        displayOrder: 4,
      },
    ],
  },
  {
    unitSlug: 'unit-5-cloud-storage-data-management',
    title: 'Unit 5 Mastery Quiz: Storage Types, S3, CAP Theorem & CDNs',
    description: 'Assess your understanding of Block vs File vs Object storage, CAP theorem trade-offs, and HDFS replication.',
    questions: [
      {
        question: 'Which storage type organizes data into flat logical namespaces with unique keys and rich metadata, accessed exclusively via HTTP REST APIs?',
        options: ['Block Storage (SAN / EBS)', 'File Storage (NFS / EFS)', 'Object Storage (S3 / GCS)', 'Tape Archive Drive'],
        correctAnswer: 2,
        explanation: 'Object Storage treats data as discrete objects stored in a flat namespace (bucket) accessed via HTTP/S REST operations (PUT, GET, DELETE).',
        difficulty: 'easy',
        displayOrder: 1,
      },
      {
        question: 'According to Brewer\'s CAP Theorem, what two properties must a distributed database choose between when a network partition (P) occurs?',
        options: ['Compute vs Bandwidth', 'Consistency (C) vs Availability (A)', 'Cost vs Speed', 'Durability vs Privacy'],
        correctAnswer: 1,
        explanation: 'Because network partitions (P) are inevitable in real-world distributed networks, a system must decide whether to return errors/block writes (Consistency) or serve stale/unverified data (Availability).',
        difficulty: 'medium',
        displayOrder: 2,
      },
      {
        question: 'What is the default block size and default block replication factor in standard Apache Hadoop HDFS?',
        options: ['4 KB block size, 1x replication', '64 MB block size, 2x replication', '128 MB block size, 3x replication', '1 GB block size, 5x replication'],
        correctAnswer: 2,
        explanation: 'Modern Hadoop HDFS defaults to a 128 MB block size (optimized for large sequential streaming reads) with a default 3x rack-aware replication factor.',
        difficulty: 'medium',
        displayOrder: 3,
      },
      {
        question: 'What is the primary function of a Content Delivery Network (CDN)?',
        options: ['Compressing relational database tables', 'Caching web content at geographically distributed Edge Points of Presence (PoPs) to minimize latency', 'Encrypting hard disk sectors with AES-256', 'Managing virtual machine CPU scheduling'],
        correctAnswer: 1,
        explanation: 'CDNs cache static and dynamic web content at edge locations worldwide, reducing latency and offloading traffic from origin servers.',
        difficulty: 'easy',
        displayOrder: 4,
      },
    ],
  },
  {
    unitSlug: 'unit-6-cloud-trends-standards-future-scope',
    title: 'Unit 6 Mastery Quiz: Standards, Migration & Future Cloud',
    description: 'Test your understanding of Gartner 6 Rs, Edge computing, PUE sustainability, and enterprise cloud migrations.',
    questions: [
      {
        question: 'Under Gartner\'s 6 Rs of cloud migration, what does "Rehosting" (Lift and Shift) entail?',
        options: ['Completely rewriting the application using microservices and serverless functions', 'Moving an application from on-premise servers directly to cloud VMs without architectural or code modifications', 'Replacing the internal software with a third-party SaaS tool', 'Decommissioning and deleting the application permanently'],
        correctAnswer: 1,
        explanation: 'Rehosting ("Lift and Shift") moves workloads directly to cloud virtual machines with minimal or no code changes, providing the fastest migration path.',
        difficulty: 'easy',
        displayOrder: 1,
      },
      {
        question: 'What does a Power Usage Effectiveness (PUE) score of 1.15 in a hyperscale cloud data center indicate?',
        options: ['15% of energy is lost; the facility is highly energy efficient', 'The data center is failing international standards', 'The servers are operating 15% above safe temperature limits', '115% of power comes from solar panels'],
        correctAnswer: 0,
        explanation: 'PUE = Total Facility Energy / IT Equipment Energy. An ideal score is 1.0 (100% of power runs IT equipment). A score of 1.15 means only 15% is spent on overhead cooling and lighting, representing world-class efficiency.',
        difficulty: 'medium',
        displayOrder: 2,
      },
      {
        question: 'Why did Dropbox famously execute their storage repatriation project ("Magic Pocket") in 2016?',
        options: ['Amazon AWS shut down operations in North America', 'At their multi-hundred petabyte scale, custom in-house hardware delivered significant cost savings over public cloud storage', 'AWS S3 lost several customer files', 'A regulatory law banned cloud storage for files'],
        correctAnswer: 1,
        explanation: 'Dropbox repatriated over 500 PB of file storage to their own custom-built high-density infrastructure, saving an estimated $75 million because their storage scale was massive and predictable.',
        difficulty: 'hard',
        displayOrder: 3,
      },
      {
        question: 'Which paradigm processes telemetry data physically close to IoT sensors and mobile devices to achieve sub-millisecond response times?',
        options: ['Centralized Mainframe Computing', 'Edge Computing', 'Deep Cold Archival Storage', 'Batch MapReduce Processing'],
        correctAnswer: 1,
        explanation: 'Edge Computing moves data processing to the edge of the network, close to data producers and consumers, minimizing network latency and bandwidth overhead.',
        difficulty: 'easy',
        displayOrder: 4,
      },
    ],
  },
];

export const labConfigurationsData: SeedLab[] = [
  {
    slug: 'lab-service-models',
    title: 'Lab A: Cloud Service Model Explorer (IaaS vs PaaS vs SaaS)',
    description: 'Interactive comparison of the shared responsibility matrix across IaaS, PaaS, and SaaS layers with practical use case analysis.',
    labType: 'service_models',
    displayOrder: 1,
    configuration: {
      models: [
        {
          id: 'iaas',
          name: 'IaaS (Infrastructure as a Service)',
          tagline: 'Maximum Control & Flexibility',
          providerManages: ['Physical Data Centers', 'Power & Cooling', 'Physical Host Servers', 'Networking Hardware', 'Hypervisor / Virtualization'],
          userManages: ['Operating System & Patches', 'Runtime Environments', 'Middleware & Daemons', 'Database Configuration', 'Application Code', 'Data & Access Control'],
          typicalUseCases: ['Custom kernel configurations', 'Migrating legacy client-server systems', 'High-performance computing (HPC) simulations'],
          examples: ['Amazon EC2', 'Google Compute Engine', 'Azure VMs', 'DigitalOcean Droplets'],
          pros: ['Total administrative freedom', 'Choice of OS and drivers', 'Direct control over firewall and network topology'],
          cons: ['Highest maintenance burden', 'Responsible for OS security patches', 'Manual scaling configuration required']
        },
        {
          id: 'paas',
          name: 'PaaS (Platform as a Service)',
          tagline: 'Developer Velocity & Auto-scaling',
          providerManages: ['Physical Data Centers', 'Physical Hardware & Network', 'Hypervisor', 'Operating System & Security Patches', 'Execution Runtime (Node/Python)', 'Web Server Daemon & Scaling'],
          userManages: ['Application Source Code', 'Database Schema & Records', 'Environment Variables & Secrets'],
          typicalUseCases: ['Web applications and REST APIs', 'Microservices pipelines', 'Rapid prototyping without DevOps overhead'],
          examples: ['AWS Elastic Beanstalk', 'Vercel', 'Heroku', 'Google App Engine'],
          pros: ['Zero OS patching overhead', 'Instant deployment from Git', 'Built-in automated scaling and SSL'],
          cons: ['Vendor framework constraints', 'Less control over low-level networking', 'Potential cost premium at massive scale']
        },
        {
          id: 'saas',
          name: 'SaaS (Software as a Service)',
          tagline: 'Turnkey Business Software',
          providerManages: ['Everything from Physical Data Center to Application Code, Data Backups, and Security Updates'],
          userManages: ['User Accounts & Passwords', 'Organizational Role Permissions', 'Application-level Preferences'],
          typicalUseCases: ['Corporate email and collaboration', 'CRM and customer support', 'Video conferencing'],
          examples: ['Google Workspace (Gmail, Docs)', 'Microsoft 365', 'Salesforce', 'Slack'],
          pros: ['Instant business readiness', 'Accessible from any browser', 'No software installation or updates'],
          cons: ['Zero customization of underlying software', 'Data residency dependent on vendor', 'Recurring subscription cost']
        }
      ]
    }
  },
  {
    slug: 'lab-deployment-models',
    title: 'Lab B: Cloud Deployment Model Explorer',
    description: 'Compare Public, Private, Hybrid, and Community Cloud deployment models on cost, control, security, and scalability trade-offs.',
    labType: 'deployment_models',
    displayOrder: 2,
    configuration: {
      models: [
        {
          id: 'public',
          name: 'Public Cloud',
          ownership: 'Third-party hyperscale provider (AWS, Azure, GCP)',
          access: 'Public Internet / VPN / Direct Connect',
          multiTenancy: 'Multi-Tenant with logical software isolation',
          costProfile: 'Pure OpEx, zero upfront CapEx, pay-per-use',
          bestFor: 'Startups, e-commerce, web apps, analytics with unpredictable traffic',
          tradeoffs: 'Lowest cost, infinite elasticity, but less hardware-level visibility'
        },
        {
          id: 'private',
          name: 'Private Cloud',
          ownership: 'Single organization (internally managed or hosted)',
          access: 'Corporate Intranet / Private Leased Lines',
          multiTenancy: 'Single-Tenant dedicated hardware',
          costProfile: 'High upfront CapEx for hardware + ongoing operational staffing',
          bestFor: 'Defense, sovereign government databases, strict compliance, ultra-low latency workloads',
          tradeoffs: 'Maximum security control and deterministic performance, but high capital cost and limited elasticity'
        },
        {
          id: 'hybrid',
          name: 'Hybrid Cloud',
          ownership: 'Shared between organization and public cloud provider',
          access: 'Encrypted VPN tunnels and dedicated physical links (Direct Connect)',
          multiTenancy: 'Single-tenant private tier + multi-tenant public tier',
          costProfile: 'Balanced CapEx for steady core + OpEx for bursting',
          bestFor: 'Financial institutions, enterprise transitions, cloud bursting during seasonal peaks',
          tradeoffs: 'Greatest architectural flexibility, but highest orchestration and networking complexity'
        },
        {
          id: 'community',
          name: 'Community Cloud',
          ownership: 'Shared coalition of organizations or third-party consortium',
          access: 'Restricted members of the participating community',
          multiTenancy: 'Community Multi-Tenant (shared between trusted peers)',
          costProfile: 'Pooled CapEx/OpEx among member organizations',
          bestFor: 'Healthcare research consortiums, government agencies (GovCloud), educational federations',
          tradeoffs: 'Shared cost and customized compliance, but requires joint governance consensus'
        }
      ]
    }
  },
  {
    slug: 'lab-virtualization-simulator',
    title: 'Lab C: Virtualization Resource Allocation Simulator',
    description: 'Configure physical host resources, allocate vCPUs and RAM to virtual machines, and simulate overcommitment thresholds.',
    labType: 'virtualization_simulator',
    displayOrder: 3,
    configuration: {
      defaultHostSpecs: {
        physicalCores: 16,
        physicalRamGb: 64,
        hostOverheadRamGb: 4,
        maxCpuOvercommitRatio: 4.0,
        maxRamOvercommitRatio: 1.25
      }
    }
  },
  {
    slug: 'lab-load-balancing',
    title: 'Lab D: Load Balancing & Traffic Distribution Simulator',
    description: 'Simulate incoming HTTP traffic distribution across multiple server nodes using Round Robin, Least Connections, and IP Hash algorithms.',
    labType: 'load_balancer',
    displayOrder: 4,
    configuration: {
      algorithms: ['round-robin', 'least-connections', 'ip-hash'],
      defaultServers: 3,
      maxServers: 6,
      minServers: 1
    }
  },
  {
    slug: 'lab-architecture-builder',
    title: 'Lab E: Interactive Cloud Architecture Builder',
    description: 'Design multi-tier cloud architectures by connecting Clients, API Gateways, Microservices, Databases, Object Storage, and CDNs.',
    labType: 'architecture_builder',
    displayOrder: 5,
    configuration: {
      availableComponents: [
        { type: 'client', name: 'Web & Mobile Clients', icon: 'Smartphone', category: 'frontend' },
        { type: 'cdn', name: 'CDN Edge PoPs', icon: 'Globe', category: 'network' },
        { type: 'api_gateway', name: 'API Gateway', icon: 'Waypoints', category: 'network' },
        { type: 'app_service', name: 'Compute / App Server', icon: 'Server', category: 'compute' },
        { type: 'serverless', name: 'Serverless Functions', icon: 'Zap', category: 'compute' },
        { type: 'database', name: 'Managed Database', icon: 'Database', category: 'storage' },
        { type: 'object_storage', name: 'Object Storage Bucket', icon: 'HardDrive', category: 'storage' },
        { type: 'cache', name: 'In-Memory Cache (Redis)', icon: 'Cpu', category: 'storage' }
      ]
    }
  },
  {
    slug: 'lab-cloud-security',
    title: 'Lab F: Cloud Security, CIA Triad & Threat Response Lab',
    description: 'Examine real-world cloud security scenarios involving DDoS, S3 bucket misconfigurations, IAM privilege creep, and encryption.',
    labType: 'security_scenarios',
    displayOrder: 6,
    configuration: {
      scenariosCount: 5
    }
  },
  {
    slug: 'lab-storage-explorer',
    title: 'Lab G: Cloud Storage Explorer (Block vs File vs Object)',
    description: 'Interactive benchmarks comparing read/write latencies, metadata capabilities, and cost efficiency across storage types.',
    labType: 'storage_explorer',
    displayOrder: 7,
    configuration: {
      storageTypes: ['block', 'file', 'object']
    }
  },
  {
    slug: 'lab-backup-replication',
    title: 'Lab H: Backup, Replication & Disaster Recovery Simulator',
    description: 'Trigger simulated cross-region replication, snapshot creation, and disaster recovery failover events with RTO/RPO calculation.',
    labType: 'backup_replication',
    displayOrder: 8,
    configuration: {
      regions: ['us-east-1', 'eu-west-1', 'ap-south-1']
    }
  },
  {
    slug: 'lab-future-cloud',
    title: 'Lab I: Future Cloud Explorer (Edge, Serverless & Green Cloud)',
    description: 'Calculate serverless cold-start economics, simulate edge vs origin latency, and evaluate Data Center PUE carbon impact.',
    labType: 'future_cloud',
    displayOrder: 9,
    configuration: {
      subLabs: ['serverless_calc', 'edge_latency', 'pue_sustainability', 'migration_matrix']
    }
  }
];

export const cloudProvidersData = [
  {
    name: 'Amazon Web Services (AWS)',
    description: 'The world\'s earliest and largest hyperscale cloud computing platform, launched in 2006 by Amazon with comprehensive global infrastructure.',
    officialWebsite: 'https://aws.amazon.com',
    displayOrder: 1,
    serviceCategories: [
      {
        category: 'Compute',
        services: [
          { name: 'Amazon EC2', description: 'Elastic Compute Cloud: Resizable virtual servers (IaaS)', useCase: 'General compute, custom server configurations' },
          { name: 'AWS Lambda', description: 'Serverless Function as a Service (FaaS)', useCase: 'Event-driven microservices, image resizing, automated tasks' },
          { name: 'Amazon ECS / EKS', description: 'Elastic Container Service & Managed Kubernetes (CaaS)', useCase: 'Containerized enterprise microservice fleets' }
        ]
      },
      {
        category: 'Storage',
        services: [
          { name: 'Amazon S3', description: 'Simple Storage Service: Scalable object storage (11 9s durability)', useCase: 'Static assets, video streaming media, data lakes' },
          { name: 'Amazon EBS', description: 'Elastic Block Store: High-performance raw block storage for EC2', useCase: 'Database file storage, OS boot volumes' },
          { name: 'Amazon EFS', description: 'Elastic File System: Scalable shared NFS file storage', useCase: 'Multi-instance shared application directories' }
        ]
      },
      {
        category: 'Database',
        services: [
          { name: 'Amazon RDS / Aurora', description: 'Managed relational databases (PostgreSQL, MySQL)', useCase: 'Transactional SQL relational workloads' },
          { name: 'Amazon DynamoDB', description: 'Fully managed multi-region NoSQL key-value store', useCase: 'Single-digit millisecond latency mobile & gaming backends' }
        ]
      }
    ]
  },
  {
    name: 'Microsoft Azure',
    description: 'Microsoft\'s enterprise-centric cloud computing platform, launched in 2010 with deep integration into Active Directory, Windows Server, and Office 365.',
    officialWebsite: 'https://azure.microsoft.com',
    displayOrder: 2,
    serviceCategories: [
      {
        category: 'Compute',
        services: [
          { name: 'Azure Virtual Machines', description: 'On-demand scalable Linux and Windows VMs (IaaS)', useCase: 'Enterprise application hosting, legacy migrations' },
          { name: 'Azure Functions', description: 'Event-driven serverless compute platform (FaaS)', useCase: 'Background processing, automated scheduled scripts' },
          { name: 'Azure Kubernetes Service (AKS)', description: 'Fully managed enterprise Kubernetes orchestration', useCase: 'Cloud-native multi-tier containerized deployments' }
        ]
      },
      {
        category: 'Storage',
        services: [
          { name: 'Azure Blob Storage', description: 'Massively scalable object storage for unstructured data', useCase: 'Streaming media, big data backups, analytics' },
          { name: 'Azure Managed Disks', description: 'Persistent block-level storage volumes for Azure VMs', useCase: 'Virtual machine OS and database disks' },
          { name: 'Azure Files', description: 'Fully managed cloud file shares via SMB and NFS protocols', useCase: 'Enterprise file sharing, legacy application migration' }
        ]
      },
      {
        category: 'Database',
        services: [
          { name: 'Azure SQL Database', description: 'Fully managed relational cloud database with SQL Server engine', useCase: 'Enterprise relational business applications' },
          { name: 'Azure Cosmos DB', description: 'Globally distributed, multi-model NoSQL database service', useCase: 'Ultra-fast global applications with multi-master writes' }
        ]
      }
    ]
  },
  {
    name: 'Google Cloud Platform (GCP)',
    description: 'Google\'s high-performance cloud platform, renowned for cutting-edge data analytics, artificial intelligence/ML, and internal planetary fiber network.',
    officialWebsite: 'https://cloud.google.com',
    displayOrder: 3,
    serviceCategories: [
      {
        category: 'Compute',
        services: [
          { name: 'Google Compute Engine (GCE)', description: 'High-performance virtual machines on Google\'s infrastructure', useCase: 'Scalable compute, custom Linux/Windows workloads' },
          { name: 'Google Cloud Functions', description: 'Lightweight, event-driven serverless execution (FaaS)', useCase: 'Microservice webhooks, asynchronous events' },
          { name: 'Google Kubernetes Engine (GKE)', description: 'The original industry-leading managed Kubernetes platform', useCase: 'Container cluster automation, advanced networking' }
        ]
      },
      {
        category: 'Storage',
        services: [
          { name: 'Google Cloud Storage (GCS)', description: 'Worldwide object storage with automatic multi-tiering', useCase: 'Big data analytics, video archives, web static files' },
          { name: 'Persistent Disk', description: 'Reliable, high-performance block storage attached to GCE', useCase: 'Database data directories, boot drives' },
          { name: 'Filestore', description: 'Fully managed NAS storage for Compute Engine and GKE', useCase: 'High-throughput shared POSIX file processing' }
        ]
      },
      {
        category: 'Database & Big Data',
        services: [
          { name: 'Cloud Spanner', description: 'Enterprise-grade, globally distributed ACID SQL database', useCase: 'Global financial transactions with zero downtime' },
          { name: 'BigQuery', description: 'Serverless, petabyte-scale cloud data warehouse', useCase: 'Real-time SQL analytics on billions of rows in seconds' }
        ]
      }
    ]
  }
];

export const caseStudiesData = [
  {
    title: 'Netflix: 100% Cloud Migration & The Creation of Chaos Engineering',
    organization: 'Netflix Inc.',
    cloudConcepts: ['Public Cloud (AWS)', 'Microservices', 'Chaos Engineering', 'Auto-Scaling', 'Global CDN'],
    description: `In August 2008, Netflix experienced a catastrophic database corruption in their private data center that halted DVD shipments to customers for three business days. Company leadership recognized that running data centers was not a core competitive advantage and made the bold decision to migrate 100% of customer-facing streaming and data infrastructure to Amazon Web Services (AWS).

Between 2008 and 2016, Netflix dismantled its monolithic architecture and rebuilt the entire platform as hundreds of decoupled microservices on AWS EC2, S3, and DynamoDB. To ensure that individual server or data center failures never broke streaming playback, Netflix engineers invented Chaos Monkey (and the broader Simian Army), a program that intentionally and randomly terminates production virtual machines during business hours. This forced developers to architect services so that failures are automatically tolerated without user impact.`,
    lessonsLearned: [
      'Monolithic architectures in private data centers create single points of catastrophic failure.',
      'Chaos Engineering proves system resiliency by proactively breaking components in production.',
      'Offloading physical hardware operations allowed Netflix engineers to focus 100% on recommendation algorithms and user experience.',
      'Decoupled microservices combined with aggressive horizontal auto-scaling can smoothly absorb tens of millions of concurrent streams.'
    ],
    sourceUrl: 'https://netflixtechblog.com',
    displayOrder: 1,
  },
  {
    title: 'Dropbox: The $75 Million Cloud Repatriation ("Magic Pocket")',
    organization: 'Dropbox Inc.',
    cloudConcepts: ['Hybrid Cloud', 'Infrastructure Repatriation', 'Object Storage at Exabyte Scale', 'CapEx vs OpEx Optimization'],
    description: `Dropbox was originally founded in 2007 on top of Amazon S3 object storage. S3 allowed Dropbox to scale rapidly from zero to hundreds of millions of users without purchasing a single hard drive. However, by 2014, Dropbox was storing over 500 Petabytes of user files. At that massive, steady-state scale, the ongoing operational costs (OpEx) of commercial cloud storage exceeded the cost of building custom private storage facilities.

Dropbox engineered "Magic Pocket," a custom hardware and software distributed storage architecture utilizing high-density custom server racks and shingled magnetic recording (SMR) drives. In 2016, Dropbox migrated over 90% of user file data off AWS S3 into their own custom data centers. While Dropbox repatriated file storage, they intentionally retained AWS for international edge acceleration and European data residency compliance. The repatriation saved Dropbox over $75 million in operating costs across two years preceding their IPO.`,
    lessonsLearned: [
      'Public cloud is unbeatable for early agility, rapid hypergrowth, and unpredictable traffic.',
      'At extreme petabyte/exabyte scale with highly predictable steady-state workloads, custom private infrastructure can yield massive cost savings.',
      'Repatriation is not an all-or-nothing choice; Dropbox successfully operates a tailored Hybrid Cloud architecture.',
      'Building custom hardware requires immense capital and a dedicated world-class infrastructure engineering team.'
    ],
    sourceUrl: 'https://dropbox.tech',
    displayOrder: 2,
  },
  {
    title: 'Spotify: Migrating Core Data Pipelines from On-Premise Hadoop to Google Cloud',
    organization: 'Spotify',
    cloudConcepts: ['Data Lake Migration', 'Serverless Analytics (BigQuery)', 'Managed Kubernetes (GKE)', 'PaaS vs IaaS'],
    description: `Spotify initially operated their music recommendation engine on large, self-managed Apache Hadoop clusters running in on-premise data centers. As Spotify reached 100 million active users, managing thousands of physical Hadoop server nodes consumed thousands of engineering hours just on disk replacement, operating system upgrades, and hardware provisioning.

In 2016, Spotify partnered with Google Cloud Platform to migrate their massive data processing infrastructure. They replaced self-managed Hadoop clusters with Google Cloud Dataproc and Google BigQuery. Complex analytical queries that previously took 8 hours on on-premise clusters finished in under 2 minutes on BigQuery, accelerating Spotify's "Discover Weekly" recommendation release cycles.`,
    lessonsLearned: [
      'Managed cloud data services (PaaS/Serverless) liberate data scientists from hardware maintenance chores.',
      'BigQuery\'s serverless SQL analytics reduced multi-hour queries to sub-minute executions.',
      'Cloud elasticity allows sudden surges in recommendation retraining without purchasing reserve physical servers.'
    ],
    sourceUrl: 'https://engineering.atspotify.com',
    displayOrder: 3,
  }
];

export const glossaryTermsData = [
  {
    term: 'NIST SP 800-145',
    definition: 'The canonical National Institute of Standards and Technology publication that formally defines cloud computing and its 5 essential characteristics, 3 service models, and 4 deployment models.',
    displayOrder: 1,
  },
  {
    term: 'IaaS (Infrastructure as a Service)',
    definition: 'A cloud service model providing raw virtualized computing resources (virtual machines, storage, networking) where the customer manages the operating system, runtime, and applications.',
    displayOrder: 2,
  },
  {
    term: 'PaaS (Platform as a Service)',
    definition: 'A cloud service delivery model providing a managed hardware and software execution environment where developers deploy application code without managing underlying servers or operating systems.',
    displayOrder: 3,
  },
  {
    term: 'SaaS (Software as a Service)',
    definition: 'A software distribution model where a third-party provider hosts applications and makes them available to end-users over the internet via web browsers or APIs.',
    displayOrder: 4,
  },
  {
    term: 'Type 1 Hypervisor (Bare-Metal)',
    definition: 'A virtualization supervisor that runs directly on host computer hardware without an underlying host operating system (e.g., VMware ESXi, KVM).',
    displayOrder: 5,
  },
  {
    term: 'Type 2 Hypervisor (Hosted)',
    definition: 'A virtualization software supervisor that runs as an application atop an existing host operating system (e.g., Oracle VirtualBox, VMware Workstation).',
    displayOrder: 6,
  },
  {
    term: 'Containerization',
    definition: 'An operating system-level virtualization method where software is packaged with its libraries and dependencies in isolated user-space processes sharing the host OS kernel.',
    displayOrder: 7,
  },
  {
    term: 'Live VM Migration',
    definition: 'The process of moving an active, running virtual machine between physical host servers with near-zero downtime, typically using iterative pre-copy memory page algorithms.',
    displayOrder: 8,
  },
  {
    term: 'Multi-Tenancy',
    definition: 'An architecture in which a single software application instance and shared physical infrastructure serves multiple distinct customer organizations (tenants) with logical data isolation.',
    displayOrder: 9,
  },
  {
    term: 'Rapid Elasticity',
    definition: 'The ability of a cloud system to dynamically provision and release compute, storage, and memory resources automatically in real time to match fluctuating workload demand.',
    displayOrder: 10,
  },
  {
    term: 'Horizontal Scaling (Scale Out)',
    definition: 'Adding additional server nodes in parallel behind a load balancer to increase system capacity, as opposed to vertical scaling (upgrading a single server specs).',
    displayOrder: 11,
  },
  {
    term: 'FaaS (Function as a Service)',
    definition: 'A serverless execution category where developers upload individual event-triggered functions that scale to zero and are billed strictly per millisecond of execution.',
    displayOrder: 12,
  },
  {
    term: 'CIA Triad',
    definition: 'The fundamental security model comprising Confidentiality (data privacy), Integrity (data accuracy and protection against tampering), and Availability (uninterrupted access).',
    displayOrder: 13,
  },
  {
    term: 'IAM (Identity and Access Management)',
    definition: 'A security framework of policies and technologies ensuring that the right entities have verified access to specific technology resources under the Principle of Least Privilege.',
    displayOrder: 14,
  },
  {
    term: 'RTO (Recovery Time Objective)',
    definition: 'The maximum tolerable duration of system downtime after a disaster before service operations must be restored.',
    displayOrder: 15,
  },
  {
    term: 'RPO (Recovery Point Objective)',
    definition: 'The maximum acceptable amount of data loss measured in time backward from a failure event.',
    displayOrder: 16,
  },
  {
    term: 'Object Storage',
    definition: 'A scalable storage architecture that manages data as discrete objects containing data payloads, unique key IDs, and custom metadata, organized in flat namespaces (buckets) accessed via HTTP REST APIs.',
    displayOrder: 17,
  },
  {
    term: 'Block Storage',
    definition: 'Raw, unformatted persistent storage split into fixed-size addressable blocks, accessed over high-speed protocols (iSCSI, NVMe-oF) by operating systems for database files and boot drives.',
    displayOrder: 18,
  },
  {
    term: 'CAP Theorem',
    definition: 'Brewer\'s theorem stating that a distributed data store can simultaneously guarantee at most two out of three properties: Consistency, Availability, and Partition Tolerance.',
    displayOrder: 19,
  },
  {
    term: 'CDN (Content Delivery Network)',
    definition: 'A geographically distributed network of proxy caching servers (Edge locations) that deliver web content to users with low latency and high bandwidth.',
    displayOrder: 20,
  },
  {
    term: 'Edge Computing',
    definition: 'A distributed computing paradigm that brings data computation and storage closer to the physical location where data is produced and consumed (e.g., IoT sensors, autonomous vehicles).',
    displayOrder: 21,
  },
  {
    term: 'PUE (Power Usage Effectiveness)',
    definition: 'A metric determining data center energy efficiency, calculated as Total Facility Energy divided by IT Equipment Energy. Ideal score is 1.0.',
    displayOrder: 22,
  },
  {
    term: 'Gartner 6 Rs',
    definition: 'The standard framework for enterprise cloud migration strategies: Rehost, Replatform, Repurchase, Refactor, Retire, and Retain.',
    displayOrder: 23,
  },
  {
    term: 'Noisy Neighbor',
    definition: 'A phenomenon in multi-tenant environments where one tenant consumes a disproportionate share of co-located hardware resources, negatively impacting performance for other tenants.',
    displayOrder: 24,
  },
  {
    term: 'Memory Ballooning',
    definition: 'A hypervisor memory reclamation technique where a guest OS balloon driver expands to force the guest OS to page memory out, returning physical RAM to the host pool.',
    displayOrder: 25,
  }
];

export const learningResourcesData = [
  {
    title: 'NIST Special Publication 800-145: The NIST Definition of Cloud Computing',
    description: 'The global benchmark standard authored by Peter Mell and Timothy Grance establishing core cloud definitions, characteristics, and models.',
    resourceType: 'Standard' as const,
    url: 'https://csrc.nist.gov/publications/detail/sp/800-145/final',
    provider: 'National Institute of Standards and Technology (NIST)',
    displayOrder: 1,
  },
  {
    title: 'NIST Special Publication 500-292: Cloud Computing Reference Architecture',
    description: 'Comprehensive guide establishing the five core cloud actors: Cloud Consumer, Provider, Broker, Auditor, and Carrier.',
    resourceType: 'Standard' as const,
    url: 'https://csrc.nist.gov/publications/detail/sp/500-292/final',
    provider: 'NIST',
    displayOrder: 2,
  },
  {
    title: 'AWS Well-Architected Framework Documentation',
    description: 'Official architectural guidance covering the six pillars: Operational Excellence, Security, Reliability, Performance Efficiency, Cost Optimization, and Sustainability.',
    resourceType: 'Documentation' as const,
    url: 'https://aws.amazon.com/architecture/well-architected/',
    provider: 'Amazon Web Services',
    displayOrder: 3,
  },
  {
    title: 'Google Cloud Architecture Framework',
    description: 'Best practice guides and reference designs for building secure, scalable, and resilient systems on Google Cloud Platform.',
    resourceType: 'Documentation' as const,
    url: 'https://cloud.google.com/architecture/framework',
    provider: 'Google Cloud',
    displayOrder: 4,
  },
  {
    title: 'Cloud Security Alliance (CSA) Security Guidance v4.0',
    description: 'Best practices for cybersecurity and governance in cloud environments from the premier global cloud security organization.',
    resourceType: 'Whitepaper' as const,
    url: 'https://cloudsecurityalliance.org/artifacts/security-guidance-v4/',
    provider: 'Cloud Security Alliance',
    displayOrder: 5,
  },
  {
    title: 'Cloud Computing: Principles and Paradigms (Rajkumar Buyya et al.)',
    description: 'Premier academic textbook covering distributed systems, virtualization, resource scheduling, and cloud economics for BCA/MCA curricula.',
    resourceType: 'Textbook' as const,
    url: 'https://www.wiley.com/en-us/Cloud+Computing%3A+Principles+and+Paradigms-p-9780470887998',
    provider: 'Wiley Publishing',
    displayOrder: 6,
  }
];
