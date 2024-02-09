import { Container } from '@mantine/core';
import { CardCollection, HomeHeader, ModalAddEntry } from './components';

const Home = () => (
  <Container size="xl">
    <HomeHeader />
    <ModalAddEntry />
    <CardCollection />
  </Container>
);

export default Home;
