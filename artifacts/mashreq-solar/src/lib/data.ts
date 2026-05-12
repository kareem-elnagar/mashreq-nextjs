export interface Project {
  slug: string;
  title: string;
  client?: string;
  location: string;
  year: string;
  size: string;
  image: string;
  gallery: string[];
  stats: Array<{ label: string; value: string }>;
  situation: string;
  decision: string;
  system: string;
  outcome: string;
  status: string;
}

export interface SystemType {
  slug: string;
  title: string;
  description: string;
  whenToUse: string;
  whenNotToUse: string;
  risks: string;
  limitations: string;
  image: string;
}

export const projects: Project[] = [
  {
    slug: "el-fahl-farm-ismailia",
    title: "El Fahl Farm Solar Pumping System",
    client: "El Hajj Ziad El Fahl",
    location: "Ismailia, Egypt",
    year: "2024",
    size: "27.6 kW",
    image: "/img/projects/fahl/1.jpg",
    gallery: [
      "/img/projects/fahl/1.jpg",
      "/img/projects/fahl/2.jpg",
      "/img/projects/fahl/3.jpg",
      "/img/projects/fahl/4.jpg",
    ],
    stats: [
      { label: "Capacity", value: "27.6 kW" },
      { label: "System Type", value: "Solar Pump" },
      { label: "Grid Backup", value: "Included" },
    ],
    situation: "The farm relied heavily on conventional grid electricity for irrigation, with continuously rising operating costs and dependence on grid stability.",
    decision: "A solar pumping system was designed to use solar energy as the primary operating source while retaining grid electricity as a flexible backup when needed — giving operational continuity without full diesel or grid lock-in.",
    system: "27.6 kW solar pumping system with smart controller enabling seamless switchover to grid electricity when solar output is insufficient.",
    outcome: "Operating costs were significantly reduced. The irrigation system now runs more stably with solar as the default source, and the farm is no longer exposed to grid price fluctuations for its daily operations.",
    status: "Operational — daily solar-primary irrigation"
  },
  {
    slug: "yathreb-farm-beheira",
    title: "Yathreb Farm On-Grid Solar",
    location: "Beheira, Egypt",
    year: "2023",
    size: "144 kW",
    image: "/img/projects/yathreb/1.jpg",
    gallery: Array.from({ length: 20 }, (_, i) => `/img/projects/yathreb/${i + 1}.jpg`),
    stats: [
      { label: "Total Capacity", value: "144 kW" },
      { label: "Annual Output", value: "259,000 kWh" },
      { label: "Annual Savings", value: "EGP 600,000" },
    ],
    situation: "Yathreb Farm in Beheira operated irrigation systems and poultry farm units on full conventional grid electricity, with continuously high and growing energy consumption.",
    decision: "Two on-grid solar systems totaling 144 kW were designed to cover daily operational loads — reducing grid dependence and locking in long-term operating cost stability.",
    system: "Two on-grid photovoltaic systems with a combined 144 kW capacity, directly integrated with existing electrical infrastructure to offset grid consumption across irrigation and poultry operations.",
    outcome: "Annual energy production of approximately 259,000 kWh, generating savings of EGP 600,000 per year. Electricity costs dropped noticeably and operations became more cost-stable.",
    status: "Producing 259,000 kWh/year — active"
  },
  {
    slug: "west-minya-solar-irrigation",
    title: "West Minya Solar Irrigation Station",
    client: "Eng. Mohamed Essam",
    location: "West Minya, Egypt",
    year: "2020",
    size: "150 kW",
    image: "/img/projects/west-minya/1.jpg",
    gallery: [
      "/img/projects/west-minya/1.jpg",
      "/img/projects/west-minya/2.jpg",
      "/img/projects/west-minya/3.jpg",
      "/img/projects/west-minya/4.jpg",
    ],
    stats: [
      { label: "Capacity", value: "150 kW" },
      { label: "Farm Area", value: "240 Feddans" },
      { label: "Payback", value: "~30 Months" },
    ],
    situation: "A 240-feddan palm and fig farm in West Minya was running irrigation entirely on diesel, with high and volatile monthly fuel costs that threatened operational stability.",
    decision: "A 150 kW solar system was designed to make solar the primary power source for a 150 HP pump, with diesel kept as emergency backup only — eliminating fuel cost exposure without risking crop loss.",
    system: "150 kW photovoltaic array powering a 150 HP irrigation pump. Diesel generator retained as emergency backup with automatic switchover controller.",
    outcome: "Full system investment recovered within approximately 30 months of operation. Diesel dependence dropped significantly and daily operating costs stabilized at a lower level.",
    status: "ROI achieved — running since 2020"
  },
  {
    slug: "hybrid-solar-50-feddan-farm",
    title: "Hybrid Solar — 50 Feddan Farm",
    location: "Minya, Egypt",
    year: "2023",
    size: "80 kW",
    image: "/img/project-hybrid-farm.png",
    gallery: ["/img/project-hybrid-farm.png"],
    stats: [
      { label: "Capacity", value: "80 kW" },
      { label: "Farm Area", value: "50 Feddans" },
      { label: "Diesel Reduction", value: "70%+" },
    ],
    situation: "The farm depended entirely on diesel for irrigation. Fuel costs were fluctuating wildly, and supply was inconsistent during peak summer months, risking crop loss.",
    decision: "A hybrid system was chosen to prioritize solar energy during the day while maintaining the diesel generator as a backup for peak load or night cycles. This balance ensured irrigation never stops.",
    system: "80kW Photovoltaic array with a smart controller that manages the switch between solar and generator power based on real-time load requirements.",
    outcome: "Daily irrigation cycles are now covered 80% by solar. Diesel consumption has dropped by over 70%, and the system has operated stably through two full summer peak seasons.",
    status: "Stable operation for 2+ irrigation seasons"
  },
  {
    slug: "off-grid-pumping-desert-reclamation",
    title: "Off-Grid Water Pumping — Desert Reclamation",
    location: "Wadi El Natrun",
    year: "2022",
    size: "120 kW",
    image: "/img/project-offgrid-pumping.png",
    gallery: ["/img/project-offgrid-pumping.png"],
    stats: [
      { label: "Capacity", value: "120 kW" },
      { label: "Area Reclaimed", value: "120 Feddans" },
      { label: "Uptime", value: "36+ Months" },
    ],
    situation: "Remote desert location with no grid access. Drilling was completed, but bringing in diesel fuel for continuous pumping was economically unfeasible due to transport costs.",
    decision: "Fully off-grid solar pumping system. We optimized the pump size to match the peak solar window, ensuring maximum water discharge during daylight hours.",
    system: "120kW Submersible pump powered by a tracking solar array to extend the pumping window from early morning to late afternoon.",
    outcome: "Successfully reclaimed 120 feddans of desert land. The system has run for 3 years with zero downtime during the growing season.",
    status: "Running for 36+ months continuously"
  }
];

export const systems: SystemType[] = [
  {
    slug: "off-grid-pumping",
    title: "Off-Grid Solar Pumping",
    description: "Designed for remote areas where grid access is impossible and diesel transport is costly.",
    whenToUse: "Ideal for daily irrigation where water storage exists. Best for locations with high solar irradiance.",
    whenNotToUse: "Not suitable for critical loads that require 24/7 power without backup.",
    risks: "Full dependence on solar availability. Cloudy days will reduce pump output immediately.",
    limitations: "Operating window is strictly tied to the sun.",
    image: "/img/system-offgrid.png"
  },
  {
    slug: "on-grid-solar",
    title: "On-Grid Solar Systems",
    description: "Direct grid integration to reduce electricity bills in urban and industrial locations.",
    whenToUse: "Where stable grid access exists and net-metering is available. Highest ROI for commercial loads.",
    whenNotToUse: "Not for backup power (anti-islanding safety).",
    risks: "No power during grid outages. Fully dependent on grid stability.",
    limitations: "Export limits may apply based on local regulations.",
    image: "/img/system-ongrid.png"
  },
  {
    slug: "hybrid-diesel-solar",
    title: "Hybrid Diesel-Solar Systems",
    description: "Combining solar with existing generators for fuel efficiency without risking the load.",
    whenToUse: "Farms or industrial sites with critical loads that cannot stop if solar output drops.",
    whenNotToUse: "If the generator is end-of-life or poorly maintained.",
    risks: "Requires complex synchronization controllers.",
    limitations: "Higher initial complexity and maintenance.",
    image: "/img/system-hybrid.png"
  }
];
