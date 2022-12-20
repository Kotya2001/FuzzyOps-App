import { HtagProps } from './Htag.props';


export const Htag = ({ className, tag, click, children }: HtagProps): JSX.Element => {
	switch (tag) {
		case 'h1':
			return <h1 className={className} onClick={click}>{children}</h1>;
		case 'h2':
			return <h2 className={className} onClick={click}>{children}</h2>;
		case 'h3':
			return <h3 className={className} onClick={click}>{children}</h3>;
		default:
			return <></>;
	}
};