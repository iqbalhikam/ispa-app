import { diseases, rules, Disease } from '../data/knowledgeBase';

export interface UserInput {
  symptom_id: string;
  cf_user: number;
}

export interface DiagnosisResult {
  disease: Disease;
  percentage: number;
}

export function calculateCertainty(userInputs: UserInput[]): DiagnosisResult[] {
  // 1. Filter inputs where user has some confidence
  const activeInputs = userInputs.filter((input) => input.cf_user > 0);

  // Map to store CFs for each disease
  const diseaseCFs: Record<string, number> = {};

  // Group inputs/rules by disease to process sequentially
  // We need to iterate over all rules to see which ones trigger
  const diseasesList = diseases;

  diseasesList.forEach((disease) => {
    let cf_combine = 0;

    // Find all rules for this disease
    const diseaseRules = rules.filter((r) => r.disease_id === disease.id);

    // Calculate CF for each matching rule + user input
    // Only process rules where the user has selected the corresponding symptom
    const applicableRules = diseaseRules.filter((rule) => activeInputs.some((input) => input.symptom_id === rule.symptom_id));

    if (applicableRules.length > 0) {
      // Iterate through applicable rules to calculate sequential CF
      applicableRules.forEach((rule, index) => {
        const userInput = activeInputs.find((i) => i.symptom_id === rule.symptom_id);
        if (!userInput) return;

        // CF Gejala = CF User * CF Expert
        const cf_symptom = userInput.cf_user * rule.cf_expert;

        if (index === 0) {
          cf_combine = cf_symptom;
        } else {
          // CF Combine = CF Old + CF New * (1 - CF Old)
          cf_combine = cf_combine + cf_symptom * (1 - cf_combine);
        }
      });
    }

    diseaseCFs[disease.id] = cf_combine;
  });

  // Convert to array and sort
  const results: DiagnosisResult[] = Object.entries(diseaseCFs)
    .map(([diseaseId, cf]) => {
      const disease = diseases.find((d) => d.id === diseaseId)!;
      return {
        disease,
        percentage: cf * 100, // Convert to percentage
      };
    })
    .filter((result) => result.percentage > 0) // Filter out diseases with 0% chance
    .sort((a, b) => b.percentage - a.percentage);

  return results;
}
