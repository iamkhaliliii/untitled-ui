declare module 'react-step-progress-bar' {
  import { ReactNode } from 'react';

  interface StepProps {
    accomplished?: boolean;
    position?: number;
    index?: number;
    transitionState?: string;
  }

  interface ProgressBarProps {
    percent: number;
    children?: ReactNode;
    stepPositions?: number[];
    unfilledBackground?: string;
    filledBackground?: string;
    width?: number;
    height?: number;
    hasStepZero?: boolean;
    text?: string;
  }

  interface StepComponentProps {
    transition?: string;
    transitionDuration?: string;
    children: (props: StepProps) => ReactNode;
  }

  export const ProgressBar: React.FC<ProgressBarProps>;
  export const Step: React.FC<StepComponentProps>;
}
