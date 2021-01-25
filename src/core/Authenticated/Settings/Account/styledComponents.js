import styled from 'styled-components/native'

import { Text } from '@components/Text'

export const Notifications = styled.View`
  background-color: white;
  border-top-width: 1px;
  border-bottom-width: 1px;
  border-color: #c5c5c5;
  padding: 20px;
`

export const SettingsLabel = styled(Text)`
  color: #355768;
  font-size: 14px;
`

export const SettingsPair = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;
`

export const SettingsDescription = styled(Text)`
  color: #4a4a4a;
  font-size: 14px;
`

export const CloseAccountText = styled(Text)`
  color: #4a4a4a;
  font-size: 16px;
  text-decoration: underline;
  text-align: center;
`

export const LinkContainer = styled.View`
  margin-top: 60px;
`
