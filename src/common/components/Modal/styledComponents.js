import styled from 'styled-components/native'

export const Container = styled.View`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  align-items: center;
  background-color: ${({ dark }) =>
    dark ? 'rgba(0, 0, 0, 0.8)' : 'rgba(255, 255, 255, 0.8)'};
  justify-content: center;
`

export const ContentWrapper = styled.View`
  border-radius: 6px;
  background-color: white;
  width: 90%;
  overflow: hidden;
`
