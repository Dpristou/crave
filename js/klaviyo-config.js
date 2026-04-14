/**
 * CRAVE Meal Prep Co. — Klaviyo Configuration
 *
 * Klaviyo is used for email marketing, subscriber collection, and
 * event tracking on the promo landing page.
 *
 * ─── SETUP ───────────────────────────────────────────────────
 * 1. Log in to Klaviyo → Account → Settings → API Keys
 * 2. Copy your **Public API Key** (also called "Site ID")
 *    — it looks like a 6-character alphanumeric string (e.g. "AbCdEf")
 * 3. Paste it below as the `publicApiKey` value
 * 4. (Optional) Create a List in Klaviyo for promo subscribers,
 *    copy the List ID, and paste it below as `listId`
 *
 * The public API key is safe to include in client-side code — it
 * can only be used for tracking and subscribe operations, not for
 * reading data or managing your account.
 */

var KLAVIYO_CONFIG = {
  // Your Klaviyo public API key (Site ID) — found in Account → Settings → API Keys
  publicApiKey: "YOUR_KLAVIYO_PUBLIC_API_KEY",

  // (Optional) Klaviyo List ID for the promo email signup form.
  // Found in Klaviyo → Audience → Lists & Segments → click your list → Settings.
  // Leave empty to use Klaviyo's default list behavior.
  listId: ""
};
