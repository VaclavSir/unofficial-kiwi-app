// @flow

import * as React from 'react';
import { QueryRenderer } from 'react-relay';

import createEnvironment from '../../src/relay/Environment';
import FullPageLoading from '../../components/visual/loaders/FullPageLoading';
import GeneralError from '../../components/errors/GeneralError';

type Props = {
  accessToken: string,
  query: string,
  render: ({ error: Object, props: Object }) => React.Node,
  variables?: Object,
  cacheConfig?: {
    offline: boolean,
  },
};

export default function publicApiRenderer({
  accessToken,
  query,
  render,
  variables,
  cacheConfig,
}: Props) {
  return (
    <QueryRenderer
      environment={createEnvironment(accessToken)}
      query={query}
      variables={variables}
      render={({ error, props }) => {
        // FIXME: it does not catch errors?
        if (error) {
          return <GeneralError errorMessage={error.message} />;
        } else if (props) {
          return render(props);
        }
        return <FullPageLoading />;
      }}
      cacheConfig={cacheConfig}
    />
  );
}
