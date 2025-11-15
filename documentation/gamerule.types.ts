
/**
 * 🎯 TypeScript Interface: GameRule
 * 
 * 🧠 Usage Notes:
	•	The GameRule interface can be extended or narrowed based on your engine’s needs.
	•	The enums (RuleDuration, RuleType, etc.) help ensure consistency and enforce valid values during rule creation or editing.
	•	You can further modularize RuleAction into subtypes if you want stricter behavior modeling.
*/

// Enums for structured rule metadata
enum RuleDuration {
  Instant = "instant",
  Temporary = "temporary",
  Persistent = "persistent"
}

enum RuleType {
  Static = "static",
  Procedural = "procedural",
  Conditional = "conditional",
  Override = "override",
  ConditionalOverride = "conditional_override"
}

enum RuleComplexity {
  Simple = "simple",
  Medium = "medium",
  Complex = "complex"
}

interface RuleContext {
  phase?: string;
  location?: string;
  playersInvolved?: string[];
}

interface RuleAction {
  type: string; // e.g., "transfer", "compare", "remove"
  from?: string;
  to?: string;
  target?: string;
  attributes?: string[];
}

interface RuleEffect {
  description: string;
  actions?: RuleAction[];
}

interface PlayerAgency {
  choicesAvailable: boolean;
  responseOptions?: string[];
}

interface RuleVersion {
  introducedIn: string;
  lastUpdated?: string;
  notes?: string;
}

interface RuleMeta {
  tags?: string[];
  localization?: { [languageCode: string]: string };
  complexity?: RuleComplexity;
  ruleType?: RuleType;
  conflictResolution?: string;
}

interface RuleExample {
  situation: string;
  expectedOutcome: string;
}

interface GameRule {
  id: string;
  name: string;
  trigger: string;
  context?: RuleContext;
  effect: RuleEffect;
  componentsAffected?: string[];
  source: string;

  // Optional or advanced rule mechanics
  priority?: number;
  duration?: RuleDuration;
  exceptions?: string[];
  dependencies?: string[];
  playerAgency?: PlayerAgency;
  reversibility?: boolean;
  version?: RuleVersion;
  meta?: RuleMeta;
  examples?: RuleExample[];
}