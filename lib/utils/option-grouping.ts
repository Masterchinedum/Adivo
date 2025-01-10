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
): 'xl' | 'lg' | 'md' | 'sm' => {
  if (groupType === 'middle') return 'sm';

  // Handle larger groups (4 or more options per side)
  if (totalInGroup >= 4) {
    if (groupType === 'left') {
      if (position === 1) return 'xl';
      if (position === 2) return 'lg';
      if (position === 3) return 'md';
      return 'sm';
    } else {
      // For right group, reverse the positions
      const reversedPosition = totalInGroup - position + 1;
      if (reversedPosition === 1) return 'xl';
      if (reversedPosition === 2) return 'lg';
      if (reversedPosition === 3) return 'md';
      return 'sm';
    }
  }

  // For 3 or fewer options per side
  if (groupType === 'left') {
    return position === 1 ? 'xl' : position === 2 ? 'lg' : 'md';
  } else {
    const reversedPosition = totalInGroup - position + 1;
    return reversedPosition === 1 ? 'xl' : reversedPosition === 2 ? 'lg' : 'md';
  }
};