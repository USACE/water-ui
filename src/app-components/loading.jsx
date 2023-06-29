import BarLoader from 'react-spinners/BarLoader';

const LoadingBar = ({ isLoading = false }) => {
  return (
    <BarLoader
      cssOverride={{ width: '100%' }}
      height={4}
      color={'#457be6'}
      loading={isLoading}
      speedMultiplier={1.5}
      aria-label="Loading Bar"
      data-testid="loader"
    />
  );
};

export { LoadingBar };
