import { Dispatch, SetStateAction, ReactNode } from 'react';

export interface ModalWindowProps {
	active: boolean,
	setActive: Dispatch<SetStateAction<boolean>>
	children: ReactNode
}