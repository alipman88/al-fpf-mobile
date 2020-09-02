import { Platform } from 'react-native'

// Hard-coded list of IAP SKUs, by platform
export const subscriptionSkus = Platform.select({
  ios: [
    'standard_business_monthly',
    'standard_business_yearly',
    'enhanced_business_monthly',
    'enhanced_business_yearly',
    'standard_government_monthly',
    'standard_government_yearly',
    'standard_nonprofit_monthly',
    'standard_nonprofit_yearly',
    'enhanced_nonprofit_monthly',
    'enhanced_nonprofit_yearly'
  ]
})
