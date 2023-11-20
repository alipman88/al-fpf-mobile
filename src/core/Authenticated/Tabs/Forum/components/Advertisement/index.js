import React from 'react'
import PropTypes from 'prop-types'

import { Ad } from './ad'
import { SponsorshipAd } from './sponsorshipAd'

export const Advertisement = ({ ad, areaName, navigateWithToken }) => {
  if (ad.ad_type === 'sponsorship') {
    return (
      <SponsorshipAd
        ad={ad}
        areaName={areaName}
        navigateWithToken={navigateWithToken}
      />
    )
  } else {
    return <Ad ad={ad} navigateWithToken={navigateWithToken} />
  }
}

Advertisement.propTypes = {
  ad: PropTypes.object.isRequired,
  areaName: PropTypes.string,
  navigateWithToken: PropTypes.func.isRequired,
}

Advertisement.displayName = 'Advertisement'
