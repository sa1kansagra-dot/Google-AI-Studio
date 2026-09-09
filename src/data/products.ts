import { Product } from '../types';

export const ASSET_IMAGES = {
  logo: "https://lh3.googleusercontent.com/aida-public/AB6AXuDbuHCwHfKAEQ2NuB9SLUaTazax2ecTjp_ZjwNEH3yT8DNyS-R93YNw43eBGfGA9el1hVw8D5LiYmNmP24s8LozRHdFzoWIn4b5SxJOvx0DwAznX3GK4YYwG1Jll-mFSnwxDFgFO5F4avF27vxYc_Yjk4HJCzzne8zBoYaaX-Bq6o_SkLiH7TIBvtmMFRKXFlmEmMXNqdmykxAh33Fg69lXboGdV0Xq40o8yl5HPBSleWC8RV53mS7x7Ur8wQA2wflAwEY",
  bottomLogo: "https://lh3.googleusercontent.com/aida-public/AB6AXuBZerb7FU3NaZd_NxxFcUaCSQ91WkdBJMmoAsHk45hQ6Etg20IcV2N88iaRpCkd_0McWtZE3LCtWdV2b2NUiMuSYGGz4COvy2FUqgpK1lXHfkE13zQlmDkdsFUjoN65LDfzPhl_QsjDkolM0_u8ZEboX3P5NYMFqlpO0m5fKCog49G8BPaHbFB3xCNFrOg1wU17njjsdT5L_aDkH6xHxmKm2f9Rf3VnqzcbbLqzSFDq2FPFQ6O7HVRyFixmh5QgMHi7Ow8",
  titanRig: "https://lh3.googleusercontent.com/aida-public/AB6AXuDdfn3tsalDRwANb5IUWVAJYNE-5QgggWh66Re_ofAEHwDfwbacBDcJkkEvgpo1CIHXy7wMJCVy-Ake_fBHMJRS_Jf9dfLxWREBHlPZDqUJzug7xDhk9hidLChyJnNbDJnh5stG-RTrlLKMbNmEUkg_qo1_WrI_Y5xUDtRNM7VnAxjp4iTmh2tSP_OgiaKKFQ-FUOR59osuGgXXrL96VW-VRGBRvm9qnpkigBRc7MEXtow2excubcXhTA",
  laptopBase: "https://lh3.googleusercontent.com/aida-public/AB6AXuAUubfdaO7Ug0nf8iqN0i7hIatx52iAaDa8wW851frpm2HQZPbK1Pg3cLjZmtq-fVcM03MMFuFF0k9cSDy7QDroU3wa4kDBnSjS8YW3VcBO3A2ziA1SAk4lAR6ULo7WR8BXQBTg2oBNYzUbBDgq4OGh7YGe8scix55d8rLYL1xUDFPv9qu6EEO8S4Jeo-Nu2qPpdzIThi3WsSbT0vzOo3He93afFY_-IAc_iK6qj0bn0ebCernFrxoq2A",
  cpuBase: "https://lh3.googleusercontent.com/aida-public/AB6AXuBZMH4cQ3JG6ZZW2jtR8hrRHKJKftfmP256eYhyekmkN_WvK4fVFMbgq9NXZDECEDKRzt2BSEFGava58E9P64ezk2jWyxV1VLmgpFYuj0reaMSaI1f58uJzz-MndVHqrF275btsqQxc1sCCQJSvDHTSOlVE9nLMVP4Nr-Ok1xZ6hXsjEUenmz0q3XeK4zSRdMqQenzqHdKI_28-HV7pk-od3xNG6nVWGCA8HlYP_9lAO7yG1Q8oqSmVaA",
  storageBase: "https://lh3.googleusercontent.com/aida-public/AB6AXuB9Cz43dMOWFvHH1ORa23gcxAmI2xvSH2FERxPsBpK697Czvq1J7_6fTX3SK7sfRDwwP1-6LMVtv1v7ntltxgqCZN1wN6IL21FlxthYweNaU3SWhA00_LzvVrbMqN3K6l_WTLNVxO4Y0pObsrRsM10tG3kgTyYFWt1pikrA26hIx3rUED0dQEawAkqcGA4UDDnDxDBwr_aCEz7LHlRsTrA9gfKARW0Yf8eaGQlZKEw5DzAqBbQN6MI_XA"
};

export const LAPTOP_PRODUCTS: Product[] = [
  {
    id: "laptop-rog-strix-18",
    category: "laptop",
    title: "ASUS ROG Strix Scar 18 (2025) 18\" 2.5K 240Hz Nebula HDR, Intel Core i9-14900HX, GeForce RTX 4090 16GB, 32GB DDR5, 2TB RAID SSD",
    subtitle: "Flagship 18-inch desktop replacement with Conductonaut Extreme Liquid Metal cooling",
    image: ASSET_IMAGES.laptopBase,
    price: 3299.99,
    originalPrice: 3699.00,
    badge: "#1 Best Seller",
    badgeColor: "deal",
    rating: 4.8,
    reviewsCount: 842,
    boughtPastMonth: "500+ bought in past month",
    shipping: "PCWARE FastPass",
    shippingSpeed: "FREE Delivery Tomorrow",
    inStock: true,
    tdpWattage: 230,
    specChips: ["18\" Nebula HDR", "RTX 4090 175W", "i9-14900HX", "2TB NVMe"],
    specs: [
      { label: "Processor", value: "Intel Core i9-14900HX (24 cores, up to 5.8 GHz)" },
      { label: "Graphics", value: "NVIDIA GeForce RTX 4090 16GB GDDR6 (175W Max TGP)" },
      { label: "Display", value: "18.0\" QHD+ (2560 x 1600) 240Hz 3ms Mini LED Nebula HDR" },
      { label: "Memory", value: "32GB DDR5-5600MHz Dual-Channel (expandable to 64GB)" },
      { label: "Storage", value: "2TB PCIe 4.0 NVMe M.2 SSD in RAID 0" },
      { label: "Cooling", value: "Tri-Fan Technology with full-surround heatsink" }
    ],
    description: "Rule Windows 11 gaming with the 2025 ROG Strix SCAR 18. Equipped with an Intel Core i9-14900HX processor and NVIDIA GeForce RTX 4090 Laptop GPU with 175W max TGP, prepare for uncompromising gaming fidelity."
  },
  {
    id: "laptop-legion-pro-7i",
    category: "laptop",
    title: "Lenovo Legion Pro 7i Gen 9 16\" WQXGA 240Hz, Intel Core i9-14900HX, RTX 4080 12GB, 32GB RAM, 1TB Gen4 SSD, Coldfront Vapor Chamber",
    subtitle: "AI-tuned precision gaming workstation with Legion Coldfront vapor chamber architecture",
    image: ASSET_IMAGES.laptopBase,
    price: 2349.00,
    originalPrice: 2699.00,
    badge: "PCWARE Choice",
    badgeColor: "primary",
    rating: 4.9,
    reviewsCount: 1219,
    boughtPastMonth: "1K+ bought in past month",
    shipping: "PCWARE FastPass",
    shippingSpeed: "FREE Delivery Tomorrow",
    inStock: true,
    tdpWattage: 200,
    specChips: ["16\" PureSight OLED", "RTX 4080 175W", "Vapor Chamber", "LA-2 AI Chip"],
    specs: [
      { label: "Processor", value: "Intel Core i9-14900HX (24 Cores, 32 Threads)" },
      { label: "Graphics", value: "NVIDIA GeForce RTX 4080 12GB GDDR6 (175W TGP)" },
      { label: "Display", value: "16\" WQXGA (2560x1600) IPS 500nits Anti-glare, 100% DCI-P3" },
      { label: "Memory", value: "32GB (2x 16GB) SO-DIMM DDR5-5600" },
      { label: "Storage", value: "1TB SSD M.2 2280 PCIe 4.0x4 NVMe" },
      { label: "Battery", value: "99.9Whr with Super Rapid Charge Pro" }
    ],
    description: "The world's most powerful AI-tuned gaming laptop. Powered by 14th Gen Intel Core processors and 40 Series NVIDIA GeForce RTX graphics, the Legion Pro 7i dominates high-refresh competitive esports."
  },
  {
    id: "laptop-razer-blade-16",
    category: "laptop",
    title: "Razer Blade 16 Dual-Mode Mini-LED (4K 120Hz / FHD 240Hz), Intel Core i9-14900HX, RTX 4070, CNC Aluminum Unibody, 32GB RAM",
    subtitle: "The world's first dual-mode Mini-LED display with studio color accuracy and ultra-thin profile",
    image: ASSET_IMAGES.laptopBase,
    price: 2799.99,
    originalPrice: 3099.99,
    badge: "Save ₹25,500",
    badgeColor: "deal",
    rating: 4.4,
    reviewsCount: 329,
    boughtPastMonth: "200+ bought in past month",
    shipping: "PCWARE FastPass",
    shippingSpeed: "FREE Delivery Thursday",
    inStock: true,
    tdpWattage: 180,
    specChips: ["Dual-Mode Mini-LED", "CNC Unibody", "RTX 4070 140W", "THX Spatial"],
    specs: [
      { label: "Processor", value: "Intel Core i9-14900HX Processor" },
      { label: "Graphics", value: "NVIDIA GeForce RTX 4070 Laptop GPU 8GB GDDR6" },
      { label: "Display", value: "Dual-Mode Mini-LED: UHD+ 120Hz (Creative) / FHD+ 240Hz (FPS)" },
      { label: "Chassis", value: "Precision CNC milled anodized aluminum T6 alloy" },
      { label: "Memory", value: "32GB DDR5 5600MHz" },
      { label: "Storage", value: "1TB PCIe 4.0 NVMe M.2 SSD" }
    ],
    description: "Experience insane visual clarity and depth of color with the Razer Blade 16—featuring the world's first dual-mode Mini-LED display with switchable native 4K 120Hz and FHD+ 240Hz modes."
  },
  {
    id: "laptop-zephyrus-g16",
    category: "laptop",
    title: "ASUS ROG Zephyrus G16 OLED Thin & Light, Intel Core Ultra 9 185H, RTX 4070 8GB, 32GB LPDDR5X, 1TB SSD, Slash Lighting",
    subtitle: "Next-gen AI neural engine architecture in an ultra-sleek 1.49cm aluminum chassis",
    image: ASSET_IMAGES.laptopBase,
    price: 1999.99,
    originalPrice: undefined,
    badge: "OLED 240Hz",
    badgeColor: "dark",
    rating: 4.7,
    reviewsCount: 498,
    boughtPastMonth: "800+ bought in past month",
    shipping: "PCWARE FastPass",
    shippingSpeed: "FREE Delivery Tomorrow",
    inStock: true,
    tdpWattage: 150,
    specChips: ["2.5K OLED 240Hz", "Intel Core Ultra 9", "0.2ms Response", "Slash Lighting"],
    specs: [
      { label: "Processor", value: "Intel Core Ultra 9 185H with integrated Intel AI Boost NPU" },
      { label: "Graphics", value: "NVIDIA GeForce RTX 4070 8GB GDDR6 (105W with Dynamic Boost)" },
      { label: "Display", value: "16\" 2.5K (2560 x 1600) OLED 16:10 240Hz 0.2ms 500nits VESA True Black" },
      { label: "Weight", value: "Ultra-portable 1.85 kg (4.08 lbs) / 1.49 cm thin" },
      { label: "Audio", value: "6-speaker system with dual-force woofers" }
    ],
    description: "Power, precision, and elegance define the 2024 Zephyrus G16. Thinner and sleeker than ever before, the Zephyrus G16 still has the same sense of style and individuality that has always set it apart."
  },
  {
    id: "laptop-helios-16",
    category: "laptop",
    title: "Acer Predator Helios 16 240Hz Gaming Laptop, AMD Ryzen 9 7945HX, RTX 4070 140W TGP, 16GB DDR5, 1TB PCIe NVMe SSD",
    subtitle: "High-airflow dual 5th Gen AeroBlade 3D fans with full copper thermal heatpipes",
    image: ASSET_IMAGES.laptopBase,
    price: 1499.00,
    originalPrice: 1799.00,
    badge: "Value Winner",
    badgeColor: "emerald",
    rating: 4.5,
    reviewsCount: 615,
    boughtPastMonth: "300+ bought in past month",
    shipping: "PCWARE FastPass",
    shippingSpeed: "FREE Delivery Tomorrow",
    inStock: true,
    tdpWattage: 175,
    specChips: ["Ryzen 9 7945HX", "140W RTX 4070", "240Hz WQXGA", "AeroBlade 3D"],
    specs: [
      { label: "Processor", value: "AMD Ryzen 9 7945HX (16 cores, 32 threads, up to 5.4 GHz)" },
      { label: "Graphics", value: "NVIDIA GeForce RTX 4070 8GB with MUX Switch" },
      { label: "Display", value: "16.0\" WQXGA (2560 x 1600) IPS 240Hz 500 nits 100% sRGB" },
      { label: "Memory", value: "16GB DDR5 5200MHz (expandable to 64GB)" },
      { label: "Storage", value: "1TB PCIe Gen 4 SSD" }
    ],
    description: "Equipped with superior cooling technology and a treasure trove of performance: the Predator Helios 16 gives you the processing muscle of AMD Dragon Range silicon coupled with GeForce RTX 40-Series power."
  }
];

export const CPU_PRODUCTS: Product[] = [
  {
    id: "cpu-ryzen-7-7800x3d",
    category: "cpu",
    title: "AMD Ryzen 7 7800X3D 8-Core, 16-Thread Desktop Processor with 3D V-Cache Technology (Up to 5.0 GHz, 104MB Cache, 120W TDP)",
    subtitle: "The world's fastest gaming processor with second-generation AMD 3D V-Cache silicon stacking",
    image: ASSET_IMAGES.cpuBase,
    price: 449.99,
    originalPrice: undefined,
    badge: "#1 in Desktop Processors",
    badgeColor: "deal",
    subBadge: "3D V-CACHE",
    rating: 4.9,
    reviewsCount: 3491,
    boughtPastMonth: "4K+ bought in past month",
    shipping: "PCWARE FastPass",
    shippingSpeed: "FREE Delivery Tomorrow, 8AM - 12PM",
    inStock: true,
    coupon: 20,
    socketOrFormFactor: "AMD Socket AM5",
    tdpWattage: 120,
    specChips: ["5.0 GHz Boost", "DDR5 Ready", "In Stock"],
    specs: [
      { label: "Socket", value: "Socket AM5 (LGA 1718)" },
      { label: "Cores / Threads", value: "8 Cores / 16 Threads" },
      { label: "Base / Boost Clock", value: "4.2 GHz / 5.0 GHz" },
      { label: "L3 Cache", value: "96MB 3D V-Cache + 8MB L3 (104MB total)" },
      { label: "Default TDP", value: "120 Watts" },
      { label: "Memory Support", value: "DDR5-5200 native (EXPO profiles supported)" },
      { label: "PCIe Lanes", value: "PCIe 5.0 x16 directly from CPU" }
    ],
    description: "The undisputed champion of PC gaming frames. AMD 3D V-Cache technology provides 104MB of on-chip L3 cache for latency-free physics, draw calls, and hyper-dense multiplayer simulations."
  },
  {
    id: "cpu-intel-i9-14900k",
    category: "cpu",
    title: "Intel Core i9-14900K (14th Gen) 24-Core Desktop Processor Unlocked with Intel Thermal Velocity Boost up to 6.0 GHz",
    subtitle: "Raptor Lake Refresh flagship with 8 Performance-cores, 16 Efficient-cores, and 6.0 GHz boost",
    image: ASSET_IMAGES.cpuBase,
    price: 539.00,
    originalPrice: 619.99,
    badge: "Save ₹6,800",
    badgeColor: "deal",
    subBadge: "6.0 GHz",
    rating: 4.7,
    reviewsCount: 2118,
    boughtPastMonth: "2K+ bought in past month",
    shipping: "PCWARE FastPass",
    shippingSpeed: "FREE Delivery Tomorrow",
    inStock: true,
    coupon: 15,
    socketOrFormFactor: "Intel LGA1700",
    tdpWattage: 253,
    specChips: ["6.0 GHz Max", "PCIe 5.0", "In Stock"],
    specs: [
      { label: "Socket", value: "LGA1700 (Compatible with 600 and 700 series motherboards)" },
      { label: "Cores / Threads", value: "24 Cores (8P + 16E) / 32 Threads" },
      { label: "Boost Frequency", value: "Up to 6.0 GHz with Intel Thermal Velocity Boost" },
      { label: "Smart Cache", value: "36MB Intel Smart Cache (L3) + 32MB L2" },
      { label: "Processor Base Power", value: "125W (Max Turbo Power 253W)" },
      { label: "Integrated Graphics", value: "Intel UHD Graphics 770" }
    ],
    description: "Break the speed barrier with 6.0 GHz out of the box. Engineered for enthusiast gamers and serious creators looking for extreme multi-threaded rendering and high single-core IPC."
  },
  {
    id: "cpu-ryzen-9-7950x3d",
    category: "cpu",
    title: "AMD Ryzen 9 7950X3D 16-Core, 32-Thread Desktop Processor with 3D V-Cache (5.7 GHz Max Boost, 144MB Cache, Socket AM5)",
    subtitle: "The ultimate dual-CCD processor for high-FPS competitive esports and heavy content creation",
    image: ASSET_IMAGES.cpuBase,
    price: 619.99,
    originalPrice: 699.99,
    badge: "Heavy Creator",
    badgeColor: "dark",
    subBadge: "16 CORES",
    rating: 4.8,
    reviewsCount: 1504,
    boughtPastMonth: "1K+ bought in past month",
    shipping: "PCWARE FastPass",
    shippingSpeed: "FREE Delivery Tomorrow",
    inStock: true,
    socketOrFormFactor: "AMD Socket AM5",
    tdpWattage: 120,
    specChips: ["5.7 GHz Boost", "144MB Cache", "In Stock"],
    specs: [
      { label: "Socket", value: "AMD Socket AM5" },
      { label: "Cores / Threads", value: "16 Cores / 32 Threads" },
      { label: "Clock Speed", value: "4.2 GHz Base / 5.7 GHz Max Boost" },
      { label: "Total Cache", value: "144MB (128MB L3 + 16MB L2)" },
      { label: "TDP", value: "120W (Highly energy efficient)" },
      { label: "Overclocking", value: "Precision Boost Overdrive & Curve Optimizer supported" }
    ],
    description: "Do it all with zero compromises. With 16 cores and 32 threads, the AMD Ryzen 9 7950X3D gives you the highest gaming frame rates alongside blazing workstation rendering performance."
  },
  {
    id: "cpu-intel-i7-14700k",
    category: "cpu",
    title: "Intel Core i7-14700K (14th Gen) 20-Core Unlocked Desktop Processor (Up to 5.6 GHz, PCIe Gen 5.0 & 4.0, 125W Base)",
    subtitle: "Enhanced core count with 4 additional E-cores for the sweet spot in modern PC gaming and streaming",
    image: ASSET_IMAGES.cpuBase,
    price: 389.99,
    originalPrice: 419.00,
    badge: "Best All-Rounder",
    badgeColor: "primary",
    subBadge: "20 CORES",
    rating: 4.8,
    reviewsCount: 1822,
    boughtPastMonth: "3K+ bought in past month",
    shipping: "PCWARE FastPass",
    shippingSpeed: "FREE Delivery Tomorrow",
    inStock: true,
    socketOrFormFactor: "Intel LGA1700",
    tdpWattage: 220,
    specChips: ["5.6 GHz Boost", "DDR5/DDR4", "In Stock"],
    specs: [
      { label: "Socket", value: "Intel LGA1700" },
      { label: "Cores / Threads", value: "20 Cores (8P + 12E) / 28 Threads" },
      { label: "Turbo Frequency", value: "Up to 5.6 GHz Intel Turbo Boost Max 3.0" },
      { label: "Intel Smart Cache", value: "33MB L3 Cache" },
      { label: "Memory Support", value: "DDR5-5600 & DDR4-3200" }
    ],
    description: "The ideal processor for gamers, streamers, and multitaskers. The upgraded 20-core architecture handles background recording, Discord, OBS, and heavy AAA titles without dropping a single frame."
  }
];

export const WORKSPACE_BUNDLE = {
  id: "bundle-creator-workspace",
  title: "Frequently Bought Together CPU + Laptop Workspace Bundles",
  subtitle: "Pair high-power desktop render nodes with portable creator laptops for synchronized workflow pipelines.",
  items: [
    {
      id: "bundle-item-laptop",
      name: "ASUS Zephyrus 16 OLED",
      price: 1999.99,
      image: ASSET_IMAGES.laptopBase
    },
    {
      id: "bundle-item-cpu",
      name: "AMD Ryzen 7 7800X3D CPU",
      price: 449.99,
      image: ASSET_IMAGES.cpuBase
    },
    {
      id: "bundle-item-ssd",
      name: "Samsung 990 PRO 2TB NVMe",
      price: 179.99,
      image: ASSET_IMAGES.storageBase
    }
  ],
  bundlePrice: 2549.97,
  regularPrice: 2629.97,
  savings: 80.00
};

export const FLASH_DEAL_LAPTOP: Product = {
  id: "flash-deal-rog-strix-18",
  category: "laptop",
  title: "ROG Strix 18\" 240Hz Nebula | i9-14900HX | RTX 4080 | 32GB RAM",
  image: ASSET_IMAGES.laptopBase,
  price: 2299.99,
  originalPrice: 2899.00,
  badge: "Limited time deal",
  rating: 4.8,
  reviewsCount: 654,
  boughtPastMonth: "800+ bought in past month",
  shipping: "PCWARE FastPass",
  shippingSpeed: "FREE Delivery Tomorrow",
  inStock: true,
  specChips: ["22% OFF", "₹51,000 OFF", "RTX 4080", "Nebula 240Hz"],
  specs: [
    { label: "Processor", value: "Intel Core i9-14900HX (24 cores, 32 threads)" },
    { label: "Graphics", value: "GeForce RTX 4080 12GB (175W TGP)" },
    { label: "Display", value: "18-inch 2.5K 240Hz Nebula Display" },
    { label: "RAM / SSD", value: "32GB DDR5 / 1TB PCIe 4.0 SSD" }
  ]
};

export const APEX_TITAN_RIG: Product = {
  id: "apex-titan-rtx-4090",
  category: "desktop",
  title: "APEX TITAN RTX 4090 Liquid-Cooled Flagship Workstation Rig",
  image: ASSET_IMAGES.titanRig,
  price: 4899.00,
  originalPrice: 5299.00,
  badge: "Flagship Titan",
  badgeColor: "primary",
  rating: 5.0,
  reviewsCount: 142,
  boughtPastMonth: "80+ bought in past month",
  shipping: "PCWARE White-Glove Hand Delivery",
  shippingSpeed: "FREE Scheduled Delivery",
  inStock: true,
  specChips: ["RTX 4090 24GB", "i9-14900KS 6.2GHz", "64GB DDR5-6400", "Custom Hardline Loop"],
  specs: [
    { label: "GPU", value: "NVIDIA GeForce RTX 4090 24GB (Full Hardline Liquid Loop)" },
    { label: "CPU", value: "Intel Core i9-14900KS Special Edition 6.2 GHz Unlocked" },
    { label: "Cooling", value: "EKWB Quantum Custom Distro Plate with 420mm Radiator" },
    { label: "Motherboard", value: "ASUS ROG Maximus Z790 Dark Hero WiFi 7" },
    { label: "RAM", value: "64GB (2x32GB) G.Skill Trident Z5 RGB DDR5-6400 CL32" },
    { label: "Storage", value: "4TB Crucial T700 PCIe 5.0 NVMe (12,400 MB/s)" },
    { label: "Power Supply", value: "Seasonic PRIME TX-1300W Titanium ATX 3.0" }
  ],
  description: "Hand-assembled in our Austin, Texas cleanroom facility. Each Apex Titan is stress-tested under 72-hour thermal loads and factory-overclocked with verified silicon lottery binning."
};
