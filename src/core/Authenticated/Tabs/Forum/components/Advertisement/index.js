import React from 'react'
import PropTypes from 'prop-types'

import { Ad } from './ad'
import { SponsorshipAd } from './sponsorshipAd'

export const Advertisement = ({ ad, navigateWithToken }) => {
  if (ad.ad_type === 'sponsorship') {
    return <SponsorshipAd ad={ad} navigateWithToken={navigateWithToken} />
  } else {
    return <Ad ad={ad} navigateWithToken={navigateWithToken} />
  }
}

Advertisement.propTypes = {
  ad: PropTypes.object.isRequired,
  navigateWithToken: PropTypes.func.isRequired,
}

Advertisement.displayName = 'Advertisement'
