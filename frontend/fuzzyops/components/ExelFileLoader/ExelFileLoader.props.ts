import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface ExelFileLoaderProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	name: string;
	i: string;
	f: string;
	n: string;
}