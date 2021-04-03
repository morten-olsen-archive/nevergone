import React from 'react';
import Page from 'containers/Page';
import Button from 'components/Button';
import useLogin from 'hooks/useLogin';

const SettingsOverviewContainer: React.FC = () => {
  const { logout } = useLogin();

  return (
    <Page>
      <Button onPress={logout} title="Logout" />
    </Page>
  );
};

export default SettingsOverviewContainer;
