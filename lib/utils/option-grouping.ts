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
  groupLength: number
): 'sm' | 'md' | 'lg' => {
  if (groupType === 'middle') return 'sm';
  
  const position = groupType === 'left' ? groupLength : 1;
  const sizes = ['lg', 'md', 'sm'];
  return sizes[position - 1] as 'sm' | 'md' | 'lg';
};