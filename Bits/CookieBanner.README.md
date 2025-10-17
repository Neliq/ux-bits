# Cookie Banner with Real Cookie Management

A fully functional cookie consent banner that **actually manages real cookies** in your Next.js application. This is not just a UI component - it actively detects, categorizes, and controls cookies based on user consent.

## Features

✅ **Automatic Cookie Detection** - Scans and detects all cookies in your application
✅ **Real Cookie Management** - Actually deletes cookies when users deny consent
✅ **Script Blocking** - Blocks Google Analytics, Facebook Pixel, and other tracking scripts
✅ **Live Cookie Count** - Shows how many cookies are in each category
✅ **GDPR/CCPA Compliant** - Implements proper consent management
✅ **Plug and Play** - Just add to your layout and it works
✅ **Persistent Preferences** - Remembers user choices across sessions
✅ **Customizable** - Easy to add your own cookie configurations

## Installation

1. Add the component to your app layout:

```tsx
// app/layout.tsx
import CookieBanner from "@/Bits/CookieBanner";

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <CookieBanner />
      </body>
    </html>
  );
}
```

That's it! The component will automatically detect and manage cookies.

## How It Works

### 1. Cookie Detection

The component scans all cookies in your browser and categorizes them into:

- **Essential** - Required for core functionality (always allowed)
- **Analytics** - Website analytics (Google Analytics, etc.)
- **Marketing** - Advertising and tracking (Facebook Pixel, Google Ads)
- **Functional** - Enhanced features (language preferences, etc.)

### 2. Consent Enforcement

When a user denies a category:

- All cookies in that category are immediately deleted
- Tracking scripts are blocked via consent APIs
- Future cookies in that category are prevented

### 3. Persistent Storage

User preferences are stored in localStorage and enforced on every page load.

## Customization

### Adding Your Own Cookies

Edit `lib/cookie-manager.ts` and add to `DEFAULT_COOKIE_CONFIGS`:

```typescript
export const DEFAULT_COOKIE_CONFIGS: CookieConfig[] = [
  // Your custom cookie
  {
    name: "my_custom_cookie",
    category: "analytics",
    description: "My custom analytics cookie",
  },

  // Pattern matching for multiple cookies
  {
    name: "session_*",
    category: "essential",
    pattern: /^session_/,
    description: "Session cookies",
  },

  // Existing configs...
];
```

### Supported Properties

```typescript
interface CookieConfig {
  name: string; // Cookie name
  category: ConsentKey; // "essential" | "marketing" | "analytics" | "functional"
  description?: string; // Human-readable description
  domain?: string; // Cookie domain (for deletion)
  pattern?: RegExp; // Pattern to match multiple cookies (e.g., /^ga_/)
}
```

### Integrating with Analytics

The cookie manager automatically integrates with Google Analytics:

```typescript
// When user accepts analytics
gtag("consent", "update", {
  analytics_storage: "granted",
});

// When user denies analytics
gtag("consent", "update", {
  analytics_storage: "denied",
});
```

### Listening to Consent Changes

You can listen for consent changes in your app:

```typescript
import { onConsentChange } from "@/lib/cookie-manager";

useEffect(() => {
  const cleanup = onConsentChange((consents, decision) => {
    console.log("Consent changed:", consents);

    if (consents.analytics) {
      // Initialize analytics
    }

    if (consents.marketing) {
      // Initialize marketing scripts
    }
  });

  return cleanup;
}, []);
```

## API Reference

### Cookie Manager Functions

```typescript
// Get all current cookies
getAllCookies(): Record<string, string>

// Detect and categorize cookies
detectCookies(configs?: CookieConfig[]): Map<ConsentKey, Set<string>>

// Delete a specific cookie
deleteCookie(name: string, domain?: string): void

// Enforce consent (delete non-consented cookies)
enforceConsent(consents: ConsentMap, configs?: CookieConfig[]): void

// Get stored consent from localStorage
getStoredConsent(): { consents: ConsentMap; decision: ConsentDecision } | null

// Save consent to localStorage
saveConsent(consents: ConsentMap, decision: ConsentDecision): void

// Get cookie statistics
getCookieStats(configs?: CookieConfig[]): Record<ConsentKey, number>

// Listen for consent changes
onConsentChange(callback: (consents, decision) => void): () => void
```

## Testing

1. **Clear cookies and localStorage** in your browser
2. **Refresh the page** - you should see the banner
3. **Click "Consent Settings"** - see detected cookies with counts
4. **Toggle different categories** - try denying analytics
5. **Open DevTools** → Application → Cookies - watch cookies being deleted
6. **Refresh the page** - your preferences should be remembered
7. **Check console** - see enforcement logs

## Advanced Usage

### Custom Privacy Policy Link

```tsx
<Link
  href="/privacy-policy" // Update this
  target="_blank"
  rel="noopener noreferrer"
  className="text-sm font-medium text-primary hover:underline"
>
  Privacy Policy
</Link>
```

### Custom Categories

You can modify `CONSENT_CATEGORIES` in `CookieBanner.tsx` to add/remove categories or change descriptions.

### Programmatic Consent

```typescript
import { saveConsent } from "@/lib/cookie-manager";

// Accept all
saveConsent(
  {
    essential: true,
    marketing: true,
    analytics: true,
    functional: true,
  },
  "accepted-all"
);

// Reject all (except essential)
saveConsent(
  {
    essential: true,
    marketing: false,
    analytics: false,
    functional: false,
  },
  "rejected-all"
);
```

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- All modern browsers with localStorage support

## License

Open source and free to use.

## Compliance Notes

This component helps with GDPR/CCPA compliance by:

- ✅ Requiring explicit consent before non-essential cookies
- ✅ Providing granular control over cookie categories
- ✅ Actually enforcing user preferences
- ✅ Allowing users to change preferences
- ✅ Documenting what each cookie does

**Note:** This is a technical implementation. Please consult with legal counsel to ensure full compliance with GDPR, CCPA, and other privacy regulations.
