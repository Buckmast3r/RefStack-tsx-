# File Structure Checklist

- [ ] .env.example
- [ ] .gitignore
- [ ] next.config.js
- [ ] package.json
- [ ] postcss.config.js
- [ ] tailwind.config.js
- [ ] tsconfig.json
- [ ] vercel.json
- [ ] README.md
- [x] public/favicon.ico
- [x] public/logo.svg
- [x] public/og-image.png
- [x] public/robots.txt
- [x] src/app/layout.tsx
- [x] src/app/page.tsx
- [x] src/app/pricing/page.tsx
- [x] src/app/login/page.tsx
- [ ] src/app/register/page.tsx
- [ ] src/app/forgot-password/page.tsx
- [ ] src/app/confirm-email/page.tsx
- [ ] src/app/reset-password/page.tsx
- [ ] src/app/dashboard/layout.tsx
- [ ] src/app/dashboard/page.tsx
- [ ] src/app/dashboard/cards/page.tsx
- [ ] src/app/dashboard/settings/page.tsx
- [ ] src/app/dashboard/analytics/page.tsx
- [ ] src/app/dashboard/subscription/page.tsx
- [ ] src/app/u/[username]/page.tsx
- [ ] src/app/admin/layout.tsx
- [ ] src/app/admin/page.tsx
- [ ] src/app/admin/users/page.tsx
- [ ] src/app/admin/cards/page.tsx
- [ ] src/app/admin/reports/page.tsx
- [ ] src/app/terms/page.tsx
- [ ] src/app/privacy/page.tsx
- [ ] src/app/contact/page.tsx
- [ ] src/app/blog/page.tsx
- [ ] src/app/blog/[slug]/page.tsx
- [ ] src/app/updates/page.tsx
- [ ] src/components/AddReferralModal.tsx
- [ ] src/components/AvatarUploader.tsx
- [x] src/components/Navbar.tsx
- [ ] src/components/Button.tsx
- [ ] src/components/CardEditorModal.tsx
- [ ] src/components/CardStats.tsx
- [x] src/components/Footer.tsx
- [ ] src/components/PlanComparison.tsx
- [ ] src/components/ReferralCard.tsx
- [ ] src/components/ReferralGrid.tsx
- [ ] src/components/SettingsForm.tsx
- [ ] src/components/StripePricingTable.tsx
- [ ] src/components/Toast.tsx
- [ ] src/components/UserAvatar.tsx
- [ ] src/context/AuthContext.tsx
- [ ] src/context/UserContext.tsx
- [ ] src/lib/supabaseClient.ts
- [ ] src/lib/stripeClient.ts
- [ ] src/lib/auth.ts
- [ ] src/lib/analytics.ts
- [ ] src/lib/roles.ts
- [ ] src/lib/validateSlug.ts
- [ ] src/middleware/withAuth.ts
- [ ] src/middleware/withRole.ts
- [ ] src/types/user.ts
- [ ] src/types/referral.ts
- [ ] src/types/subscription.ts
- [ ] src/types/plan.ts
- [ ] src/constants/roles.ts
- [ ] src/constants/plans.ts
- [ ] src/constants/pricing.ts
- [ ] src/hooks/useAuth.ts
- [ ] src/hooks/useSubscription.ts
- [ ] src/hooks/useReferralStats.ts
- [ ] src/utils/insertProfile.ts
- [ ] src/utils/updateSubscription.ts
- [ ] src/utils/getCustomDomain.ts
- [ ] src/api/track-click/route.ts
- [ ] src/api/get-user-stack/route.ts
- [ ] src/api/create-referral/route.ts
- [ ] src/api/webhook-stripe/route.ts

# Deployment & Feature Checklist

## Authentication & Access
- [ ] Register page exists and works
- [ ] Signin page exists and works
- [ ] Public page containing referral cards exists
- [ ] Users can log out from any screen
- [ ] Password reset flow works
- [ ] Accessing `/dashboard` while logged out redirects or blocks access
- [ ] Accessing `/admin` as non-admin redirects or blocks access
- [ ] Email confirmation required before dashboard access
- [ ] Auth persists on page refresh

## User Profile
- [ ] Users can change username or slug
- [ ] Users can change email or password
- [ ] Users can upload an avatar
- [ ] Users can update bio/profile text

## Referral Cards
- [ ] Users can add a card
- [ ] Users can delete a card
- [ ] Users can edit/update a card
- [ ] Users can reorder cards
- [ ] Users can toggle card visibility (hide certain cards)
- [ ] Users can set a card as "featured"
- [ ] Cards track clicks and/or views
- [ ] Per-day or chart view of card performance
- [ ] Export stats (CSV or copy)

## Plans & Billing
- [ ] Users can view current plan
- [ ] Users can upgrade or downgrade
- [ ] Users can cancel plan
- [ ] Users can view billing history/receipts

## Public Page
- [ ] Public link is copyable/shareable
- [ ] Users can preview their public page
- [ ] Users can customize page style (color, title, etc)
- [ ] Users can disable their public page
- [ ] Public page is mobile responsive

## Security & Admin
- [ ] Rate limiting on referral click API
- [ ] Role checks for admin routes
- [ ] RLS (Row Level Security) enabled in Supabase

## Referral Card UI/UX
- [ ] Cards have clear CTAs
- [ ] Cards display brand icons
- [ ] Cards show meta previews or thumbnails

## Email & Notifications
- [ ] Users receive email confirmation
- [ ] Users receive welcome email
- [ ] Users receive billing receipts
- [ ] Users receive password reset email

## Developer/Pro Features (if dev plan enabled)
- [ ] API key is available
- [ ] Docs for using `/api/get-user-stack`

## Admin/Moderation
- [ ] Admins can ban a user
- [ ] Admins can flag or remove referral cards
- [ ] Admins can reset passwords for users
- [ ] Admins can see abuse reports or spam 