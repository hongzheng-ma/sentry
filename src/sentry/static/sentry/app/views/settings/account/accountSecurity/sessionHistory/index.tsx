import React from 'react';
import styled from '@emotion/styled';
import {RouteComponentProps} from 'react-router/lib/Router';

import {Panel, PanelBody, PanelHeader} from 'app/components/panels';
import {t} from 'app/locale';
import AsyncView from 'app/views/asyncView';
import ListLink from 'app/components/links/listLink';
import NavTabs from 'app/components/navTabs';
import SettingsPageHeader from 'app/views/settings/components/settingsPageHeader';
import recreateRoute from 'app/utils/recreateRoute';

import SessionRow from './sessionRow';
import {tableLayout} from './utils';

type Props = RouteComponentProps<{}, {}>;

type State = {
  ipList: Array<any> | null;
} & AsyncView['state'];

class AccountSecuritySessionHistory extends AsyncView<Props, State> {
  getTitle() {
    return t('Session History');
  }

  getEndpoints(): ReturnType<AsyncView['getEndpoints']> {
    return [['ipList', '/users/me/ips/']];
  }

  renderBody() {
    const {ipList} = this.state;

    if (!ipList) {
      return null;
    }

    const {routes, params, location} = this.props;
    const recreateRouteProps = {routes, params, location};

    return (
      <React.Fragment>
        <SettingsPageHeader
          title="Security"
          tabs={
            <NavTabs underlined>
              <ListLink
                to={recreateRoute('', {...recreateRouteProps, stepBack: -1})}
                index
              >
                {t('Settings')}
              </ListLink>
              <ListLink to={recreateRoute('', recreateRouteProps)}>
                {t('Session History')}
              </ListLink>
            </NavTabs>
          }
        />

        <Panel>
          <SessionPanelHeader>
            <div>{t('Sessions')}</div>
            <div>{t('First Seen')}</div>
            <div>{t('Last Seen')}</div>
          </SessionPanelHeader>

          <PanelBody>
            {ipList.map(ipObj => (
              <SessionRow key={ipObj.id} {...ipObj} />
            ))}
          </PanelBody>
        </Panel>
      </React.Fragment>
    );
  }
}

export default AccountSecuritySessionHistory;

const SessionPanelHeader = styled(PanelHeader)`
  ${tableLayout}
  justify-content: initial;
`;
