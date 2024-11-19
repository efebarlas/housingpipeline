export interface HousingStage {
  name: string;
  description: string;
}

export const housingStages: HousingStage[] = [
  {
    name: "Planning",
    description: "Initial project planning and feasibility studies"
  },
  {
    name: "Permitting",
    description: "Obtaining necessary permits from Seattle authorities"
  },
  {
    name: "Design",
    description: "Architectural and engineering design phase"
  },
  {
    name: "Construction",
    description: "Building the housing project"
  },
  {
    name: "Inspection",
    description: "City inspections and approvals"
  },
  {
    name: "Occupancy",
    description: "Final approvals and move-in ready"
  }
];
