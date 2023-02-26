import { ReactNode, DetailedHTMLProps, HTMLAttributes } from 'react';

export interface BoxProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>{
	children: ReactNode;
	color?: 'white' | 'blue';
}