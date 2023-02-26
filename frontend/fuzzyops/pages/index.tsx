import { GetStaticProps } from 'next';
import { Button, Htag } from '../components';
import { withLayout } from '../layout/Layout';
import axios from 'axios';
import { MenuItem } from '../interfaces/menu.interface';


function Home({ menu }: HomeProps): JSX.Element {
  return (
    <>
    </>
  );
}


export default withLayout(Home);


export interface HomeProps extends Record<string, unknown>{
  menu: MenuItem[];
  firstCategory: number;
}