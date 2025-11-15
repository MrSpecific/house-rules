// 🧾 GameRule Example: Monopoly Free Parking Jackpot

const freeParkingJackpotRule: GameRule = {
  id: "house_rule_free_parking_jackpot",
  name: "Free Parking Jackpot",
  trigger: "When a player lands on the Free Parking space",
  context: {
    phase: "Movement",
    location: "Free Parking",
    playersInvolved: ["currentPlayer"]
  },
  effect: {
    description: "That player collects all money from fines, taxes, and fees placed in the center pot",
    actions: [
      { type: "transfer", from: "center_pot", to: "currentPlayer" },
      { type: "reset", target: "center_pot" }
    ]
  },
  componentsAffected: ["center_pot", "player_cash"],
  source: "House Rule",
  priority: 10,
  duration: RuleDuration.Instant,
  exceptions: [],
  dependencies: ["center_pot_initialized"],
  playerAgency: {
    choicesAvailable: false
  },
  reversibility: false,
  version: {
    introducedIn: "House Variant v1.0",
    notes: "Popular house rule used in casual Monopoly games"
  },
  meta: {
    tags: ["house rule", "monopoly", "money", "free parking"],
    ruleType: RuleType.Override,
    complexity: RuleComplexity.Simple,
    conflictResolution: "Overrides the official rule where Free Parking has no effect"
  },
  examples: [
    {
      situation: "Player lands on Free Parking with $350 in the center pot",
      expectedOutcome: "Player collects $350; the center pot resets to $0"
    }
  ]
};