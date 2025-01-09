// lib/constants/option-labels.ts

export const OPTION_COLORS = {
  agree: '#2563eb',    // Blue for agree group
  neutral: '#71717a',  // Gray for neutral/middle
  disagree: '#dc2626'  // Red for disagree group
} as const;

export const OPTION_LABELS = {
  agree: [
    'Completely Agree',
    'Largely Agree',
    'Somewhat Agree'
  ],
  disagree: [
    'Completely Disagree',
    'Largely Disagree', 
    'Somewhat Disagree'
  ],
  neutral: ['Neutral']
} as const;

export const getOptionLabel = (
  option: { id: string; text: string },
  groupType: 'left' | 'middle' | 'right',
  position: number
): string => {
  if (groupType === 'middle') return OPTION_LABELS.neutral[0];
  
  const labels = groupType === 'left' 
    ? OPTION_LABELS.agree 
    : OPTION_LABELS.disagree;
    
  return labels[position] || option.text;
};