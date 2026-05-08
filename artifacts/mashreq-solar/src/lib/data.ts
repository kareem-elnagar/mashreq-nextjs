export interface Project {
  slug: string;
  title: string;
  location: string;
  year: string;
  size: string;
  image: string;
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
    slug: "hybrid-solar-50-feddan-farm",
    title: "Hybrid Solar System — 50 Feddan Farm",
    location: "Minya, Egypt",
    year: "2023",
    size: "50 Feddan",
    image: "https://images.unsplash.com/photo-1509391366360-fe5bb58583bb?auto=format&fit=crop&q=80&w=1200",
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
    size: "120 Feddan",
    image: "https://images.unsplash.com/photo-1466611653911-954ffaa13b6f?auto=format&fit=crop&q=80&w=1200",
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
    image: "https://images.unsplash.com/photo-1548337138-e87d889cc369?auto=format&fit=crop&q=80&w=1200"
  },
  {
    slug: "on-grid-solar",
    title: "On-Grid Solar Systems",
    description: "Direct grid integration to reduce electricity bills in urban and industrial locations.",
    whenToUse: "Where stable grid access exists and net-metering is available. Highest ROI for commercial loads.",
    whenNotToUse: "Not for backup power (anti-islanding safety).",
    risks: "No power during grid outages. Fully dependent on grid stability.",
    limitations: "Export limits may apply based on local regulations.",
    image: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&q=80&w=1200"
  },
  {
    slug: "hybrid-diesel-solar",
    title: "Hybrid Diesel-Solar Systems",
    description: "Combining solar with existing generators for fuel efficiency without risking the load.",
    whenToUse: "Farms or industrial sites with critical loads that cannot stop if solar output drops.",
    whenNotToUse: "If the generator is end-of-life or poorly maintained.",
    risks: "Requires complex synchronization controllers.",
    limitations: "Higher initial complexity and maintenance.",
    image: "https://images.unsplash.com/photo-1594398044700-143603d223f2?auto=format&fit=crop&q=80&w=1200"
  }
];
