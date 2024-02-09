import { Box, Loader } from '@mantine/core';

const CustomLoader = () => (
  <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    <Loader color="blue" type="dots" size="xl" />
  </Box>
);

export default CustomLoader;
