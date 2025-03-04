import styled from 'styled-components/native'
import { Text, TextSemibold } from '@fpf/components/Text'

export const ErrorContainer = styled.View`
  width: 100%;
  height: 100%;
  background-color: #fff;
  justify-content: center;
  align-items: center;
`
export const ErrorText = styled(Text)`
  font-size: 16px;
  margin-top: 32px;
`

// Placeholder content for loading WebViews mirroring the style of frontporchforum.com

export const Title = styled(TextSemibold)`
  font-size: 28px;
  letter-spacing: -0.08px;
  color: #333;
`

export const Container = styled.View`
  padding: 15px;
`

export const H3 = styled(TextSemibold)`
  margin-top: 4px;
  margin-bottom: 6px;
  font-size: 22px;
  letter-spacing: -0.08px;
  color: #6c757d;
`

export const Label = styled(TextSemibold)`
  margin-bottom: 8px;
  font-size: 16px;
  letter-spacing: -0.08px;
  color: #333;
`

export const Card = styled.View`
  border-radius: 6px;
  height: 56px;
  margin-bottom: 10px;
  background-color: #fff;
  border-width: 1px;
  border-color: #d2d6e1;
`

export const WebColors = {
  blue600: '#355768',
  gray100: '#f5f5f9',
  gray190: '#ebecf1',
  gray200: '#e8e9f2',
  gray800: '#333',
  green: '#3a860c',
}
