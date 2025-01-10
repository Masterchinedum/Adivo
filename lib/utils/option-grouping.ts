// lib/utils/option-grouping.ts

interface Option {
  id: string;
  text: string;
}

interface GroupedOptions {
  leftGroup: Option[];
  rightGroup: Option[];
  middleOption?: Option;
}

export const groupOptions = (options: Option[]): GroupedOptions => {
  const totalOptions = options.length;
  const isEven = totalOptions % 2 === 0;
  const groupSize = Math.floor(totalOptions / 2);

  if (isEven) {
    return {
      leftGroup: options.slice(0, groupSize),
      rightGroup: options.slice(groupSize)
    };
  } else {
    return {
      leftGroup: options.slice(0, groupSize),
      middleOption: options[groupSize],
      rightGroup: options.slice(groupSize + 1)
    };
  }
};

export const getOptionSize = (
  option: Option, 
  groupType: 'left' | 'middle' | 'right', 
  position: number,
  totalInGroup: number
): 'sm' | 'md' | 'lg' => {
  if (groupType === 'middle') return 'sm';

  // Handle larger groups (more than 3 options per side)
  if (totalInGroup > 3) {
    // For groups with more than 3 options, create a gradual size decrease
    const sizeRatio = position / totalInGroup;
    
    if (groupType === 'left') {
      if (sizeRatio <= 0.33) return 'lg';
      if (sizeRatio <= 0.66) return 'md';
      return 'sm';
    } else {
      // For right group, reverse the ratio
      const reversedRatio = 1 - sizeRatio;
      if (reversedRatio <= 0.33) return 'lg';
      if (reversedRatio <= 0.66) return 'md';
      return 'sm';
    }
  }

  // Original logic for 3 or fewer options per side
  if (groupType === 'left') {
    return position === 1 ? 'lg' : position === 2 ? 'md' : 'sm';
  } else {
    const reversedPosition = totalInGroup - position + 1;
    return reversedPosition === 1 ? 'lg' : reversedPosition === 2 ? 'md' : 'sm';
  }
};