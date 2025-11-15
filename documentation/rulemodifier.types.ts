// 🧾 TypeScript Interface: RuleModifier
enum RuleModifierType {
  Override = "override",
  Extend = "extend",
  Disable = "disable",
  Patch = "patch",
  Conditional = "conditionalize"
}

interface RuleModifier {
  id: string;
  name: string;
  description?: string;

  targetRuleId: string; // e.g., "rule_draw_card", or "house_rule_free_parking"
  modifierType: RuleModifierType;

  triggerOverride?: string;
  contextOverride?: Partial<RuleContext>;
  effectOverride?: Partial<RuleEffect>;
  priorityOverride?: number;
  durationOverride?: RuleDuration;

  addExceptions?: string[];
  addDependencies?: string[];

  conditionalFlag?: string; // e.g., "house_rules_enabled.free_parking_jackpot"

  source?: string; // "House Rule", "Fan Variant", etc.
  version?: RuleVersion;
  examples?: RuleExample[];
}