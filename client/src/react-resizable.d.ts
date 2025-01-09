declare module 'react-resizable' {
  import * as React from 'react';

  export interface ResizableBoxProps {
    width?: number;
    height?: number;
    minConstraints?: [number, number];
    maxConstraints?: [number, number];
    resizeHandles?: Array<'s' | 'w' | 'e' | 'n' | 'sw' | 'nw' | 'se' | 'ne'>;
    onResizeStop?: (e: React.SyntheticEvent, data: { size: { width: number; height: number } }) => void;
    children?: React.ReactNode;
  }

  export class ResizableBox extends React.Component<ResizableBoxProps> {}

  export interface ResizableProps {
    children?: React.ReactNode;
  }

  export class Resizable extends React.Component<ResizableProps> {}
}