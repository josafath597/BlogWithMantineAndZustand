import {
  Container, Title,
} from '@mantine/core';
import classes from './Header.module.css';

const Header = () => (
  <header className={classes.header}>
    <Container size="md" className={classes.inner}>
      <Title size="h1" order={1}>Blog</Title>
    </Container>
  </header>
);

export default Header;
