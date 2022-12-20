import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface FileLoaderProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	name: string;
	i: string;
	f: string;
	n: string;
}