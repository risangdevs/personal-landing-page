export const research = [
  {
    id: "diffuser",
    title: "Air diffuser performance",
    category: "AIR DISTRIBUTION",
    description: "How air delivery shapes occupied-zone comfort.",
    parameters: [
      "Throw",
      "Spread",
      "Terminal velocity",
      "Neck velocity",
      "Sound pressure level",
      "Thermal comfort",
      "CFD",
    ],
    method:
      "Compare diffuser geometry and supply conditions while holding room assumptions explicit. Evaluate velocity decay, occupied-zone air speed, and acoustic implications.",
    question:
      "How do outlet velocity and diffuser geometry affect throw and occupied-zone comfort?",
  },
  {
    id: "energy",
    title: "Energy & thermal comfort",
    category: "HVAC SYSTEMS",
    description: "Understanding the balance between comfort and energy use.",
    parameters: [
      "Supply temperature",
      "Cooling load",
      "Airflow rate",
      "Occupancy",
      "Humidity",
    ],
    method:
      "Define occupancy and thermal loads, compare operating conditions, and track energy demand alongside comfort indicators. Avoid drawing conclusions from energy alone.",
    question:
      "How does changing a supply condition affect both comfort and cooling demand?",
  },
  {
    id: "ventilation",
    title: "Ventilation & cleanrooms",
    category: "INDOOR ENVIRONMENT",
    description: "Following air paths through controlled spaces.",
    parameters: [
      "Pressure differential",
      "Air changes",
      "Contaminant transport",
      "Filtration",
      "Airflow pattern",
    ],
    method:
      "Map flow paths and pressure relationships. Select measurement points that can reveal short-circuiting and stagnant zones; document boundary conditions.",
    question:
      "Does the intended airflow path actually reach the spaces that need it?",
  },
  {
    id: "datacenter",
    title: "Data center cooling",
    category: "THERMAL MANAGEMENT",
    description: "Matching air distribution to concentrated heat loads.",
    parameters: [
      "Rack inlet temperature",
      "Recirculation",
      "Containment",
      "Airflow balance",
      "Cooling demand",
    ],
    method:
      "Compare rack loads and supply patterns; inspect recirculation paths and inlet conditions before increasing cooling capacity.",
    question:
      "Where does recirculation make nominal cooling capacity less effective?",
  },
];
