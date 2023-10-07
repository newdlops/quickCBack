interface KakaoUserMeResponse {
  id: number
  has_signed_up?: boolean
  connected_at?: Date
  synched_at?: Date
  properties?: JSON
  kakao_account?: KakaoAccount
  for_partner?: KakaoPartner
}

interface KakaoAccount {
  profile_needs_agreement?: boolean
  profile_nickname_needs_agreement?: boolean
  profile_image_needs_agreement?: boolean
  profile?: KakaoProfile
  name_needs_agreement?: boolean
  name?: string
  email_needs_agreement?: boolean
  is_email_valid?: boolean
  is_email_verified?: boolean
  email?: string
  age_range_needs_agreement?: boolean
  age_range?: string
  birthyear_needs_agreement?: boolean
  birthyear?: string // YYYY
  birthday_needs_agreement?: boolean
  birthday?: string // MMDD
  birthday_type?: string // SOLAR, LUNAR
  gender_needs_agreement?: boolean
  gender?: string // male, female
  phone_number_needs_agreement?: boolean
  phone_number?: string
  ci_needs_agreement?: boolean
  ci?: string
  ci_authenticated_at?: Date
}

interface KakaoProfile {
  nickname?: string
  thumbnail_image_url?: string
  profile_image_url?: string
  is_default_image?: boolean
}

interface KakaoPartner {
  uuid?: string
}
