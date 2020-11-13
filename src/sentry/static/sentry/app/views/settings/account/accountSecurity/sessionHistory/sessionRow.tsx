import React from 'react';
import styled from '@emotion/styled';

import {PanelItem} from 'app/components/panels';
import TimeSince from 'app/components/timeSince';
import space from 'app/styles/space';

import {tableLayout} from './utils';

type Props = {
  ipAddress: string;
  lastSeen: string;
  firstSeen: string;
  countryCode?: string;
  regionCode?: string;
};

function SessionRow({ipAddress, lastSeen, firstSeen, countryCode, regionCode}: Props) {
  return (
    <SessionPanelItem>
      <IpAndLocation>
        <div>
          <IpAddress>{ipAddress}</IpAddress>
          {countryCode && regionCode && (
            <CountryCode>{`${countryCode} (${regionCode})`}</CountryCode>
          )}
        </div>
      </IpAndLocation>
      <StyledTimeSince date={firstSeen} />
      <StyledTimeSince date={lastSeen} />
    </SessionPanelItem>
  );
}

export default SessionRow;

const IpAddress = styled('div')`
  margin-bottom: ${space(0.5)};
  font-weight: bold;
`;
const CountryCode = styled('div')`
  font-size: ${p => p.theme.fontSizeRelativeSmall};
`;

const StyledTimeSince = styled(TimeSince)`
  font-size: ${p => p.theme.fontSizeRelativeSmall};
`;

const IpAndLocation = styled('div')`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const SessionPanelItem = styled(PanelItem)`
  ${tableLayout};
`;
