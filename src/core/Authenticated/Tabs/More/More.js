import React from 'react'
import PropTypes from 'prop-types'
import { Platform, ScrollView } from 'react-native'

import { ExternalLink } from '@components/ExternalLink'
import { ScreenContainer } from '@components/ScreenContainer'
import {
  PageWrapper,
  PageHeader,
  Card,
  CenterImgContainer,
  CardIcon,
  CardTitle,
  CardContent,
  CopyrightText,
  RightIcon,
  FooterLinkWrapper,
  FooterLink,
  FooterText,
} from './styledComponents'
import calendarIcon from '@assets/images/more-section/calendar-icon.png'
import donateIcon from '@assets/images/more-section/donate-icon.png'
import openBookIcon from '@assets/images/more-section/open-book-icon.png'
import speakerIcon from '@assets/images/more-section/speaker-icon.png'
import linkIcon from '@assets/images/global-assets/external-link-icons/external-link-icon-blue.png'

export class More extends React.Component {
  render() {
    const { chooseMailApp, navigateWithToken } = this.props

    return (
      <ScreenContainer withPadding={false} grey>
        <ScrollView>
          <PageWrapper>
            <PageHeader>
              Check out additional services and features from FPF below!
            </PageHeader>

            <Card>
              <CenterImgContainer>
                <CardIcon source={calendarIcon} />
              </CenterImgContainer>
              <CardTitle>Community Calendar</CardTitle>
              <CardContent>
                Learn about local events posted by your neighbors.
              </CardContent>
              <ExternalLink
                content='Browse local events'
                onPress={() =>
                  navigateWithToken(
                    `/areas/${this.props.currentAreaId}/calendar`
                  )
                }
              />
            </Card>

            {Platform.OS !== 'ios' && (
              <Card>
                <CenterImgContainer>
                  <CardIcon source={donateIcon} />
                </CenterImgContainer>
                <CardTitle>Donate</CardTitle>
                <CardContent>
                  Your contribution will help us maintain, improve and grow our
                  community-building service.
                </CardContent>
                <ExternalLink
                  content='Donate Now'
                  onPress={() => navigateWithToken('/supporting-members')}
                />
              </Card>
            )}

            <Card>
              <CenterImgContainer>
                <CardIcon source={speakerIcon} />
              </CenterImgContainer>
              <CardTitle>Tell us what you think</CardTitle>
              <CardContent>
                As we work to improve this app, we would love to hear about your
                experience!
              </CardContent>
              <ExternalLink
                content='Share your feedback'
                onPress={() => {
                  chooseMailApp({
                    title: 'Email FPF',
                    subject: 'FPF mobile app feedback',
                    toEmail: 'membersupport@frontporchforum.com',
                  })
                }}
              />
            </Card>

            <Card>
              <CenterImgContainer>
                <CardIcon source={openBookIcon} />
              </CenterImgContainer>
              <CardTitle>Learn more about FPF</CardTitle>
              <CardContent>
                See a list of local participating officials, peruse our FAQ,
                learn about advertising opportunities, contact customer support,
                and more.
              </CardContent>
              <ExternalLink
                content='Go to FrontPorchForum.com'
                onPress={() => navigateWithToken('')}
              />
            </Card>

            <CopyrightText>
              © Copyright 2021 Front Porch Forum®. All rights reserved. FRONT
              PORCH FORUM® is the registered trademark of Front Porch Forum,
              Inc.
            </CopyrightText>

            <FooterLinkWrapper>
              <FooterLink>
                <FooterText
                  onPress={() => navigateWithToken('/privacy-policy')}
                >
                  Privacy Policy
                </FooterText>
                <RightIcon source={linkIcon} />
              </FooterLink>
              <FooterLink>
                <FooterText onPress={() => navigateWithToken('/terms-of-use')}>
                  Terms of Use
                </FooterText>
                <RightIcon source={linkIcon} />
              </FooterLink>
              <FooterLink>
                <FooterText
                  onPress={() => {
                    chooseMailApp({
                      title: 'Email FPF',
                      toEmail: 'membersupport@frontporchforum.com',
                    })
                  }}
                >
                  Member Support
                </FooterText>
                <RightIcon source={linkIcon} />
              </FooterLink>
            </FooterLinkWrapper>
          </PageWrapper>
        </ScrollView>
      </ScreenContainer>
    )
  }
}

More.propTypes = {
  chooseMailApp: PropTypes.func.isRequired,
  currentAreaId: PropTypes.number,
  navigateWithToken: PropTypes.func.isRequired,
}
