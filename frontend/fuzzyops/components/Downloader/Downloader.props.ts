import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface DownloaderProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	file: object;
	forWhat: string;
}