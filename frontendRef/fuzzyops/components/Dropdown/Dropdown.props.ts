import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface DropdownProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	elems: string[];
	forWhat: string;
	click?: (item: string) => void;
}