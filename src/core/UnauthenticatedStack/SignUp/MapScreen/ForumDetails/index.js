import React from 'react'
import PropTypes from 'prop-types'
import format from 'date-fns/format'

import { Checkbox } from '@fpf/components/Checkbox'

import {
  Container,
  Contents,
  Header,
  JoinContainer,
  JoinText,
  Label,
  Row,
  Value,
} from './styledComponents'

export const ForumDetails = ({
  area,
  onPress,
  hasForumCheckbox,
  checkboxValue,
}) => (
  <Container hasForumCheckbox={hasForumCheckbox}>
    <Contents>
      <Header>{area.name}</Header>
      <Row>
        <Label>Launched</Label>
        <Value>{format(new Date(area.launch_date), 'MMM DD, YYYY')}</Value>
      </Row>
      <Row>
        <Label>Members</Label>
        <Value>{area.members}</Value>
      </Row>
      <Row>
        <Label>Households in this forum</Label>
        <Value>{area.households}</Value>
      </Row>
      <Row>
        <Label>Postings</Label>
        <Value>{area.postings}</Value>
      </Row>
    </Contents>
    {hasForumCheckbox && (
      <JoinContainer>
        <JoinText>Join this forum</JoinText>
        <Checkbox onPress={onPress} value={checkboxValue} />
      </JoinContainer>
    )}
  </Container>
)

ForumDetails.propTypes = {
  area: PropTypes.object.isRequired,
  checkboxValue: PropTypes.bool,
  hasForumCheckbox: PropTypes.bool,
  onPress: PropTypes.func.isRequired,
}
