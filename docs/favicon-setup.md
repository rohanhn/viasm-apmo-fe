# Favicon Configuration

This project uses a comprehensive favicon setup that supports all modern browsers and devices.

## Files Structure

```
public/
├── favicon.ico                 # Main favicon (16x16, 32x32, 48x48)
├── favicon-16x16.png          # 16x16 PNG favicon
├── favicon-32x32.png          # 32x32 PNG favicon
├── apple-touch-icon.png       # 180x180 Apple touch icon
├── android-chrome-192x192.png # 192x192 Android icon
├── android-chrome-512x512.png # 512x512 Android icon
├── manifest.json              # Web App Manifest for PWA
└── browserconfig.xml          # Microsoft Tile configuration
```

## Configuration Files

### 1. Favicon Utility (`src/utils/favicon.ts`)
- Centralized favicon configuration
- SEO metadata setup
- Open Graph and Twitter Card support
- PWA manifest integration

### 2. Web App Manifest (`public/manifest.json`)
- PWA support
- App installation on mobile devices
- Theme colors and branding

### 3. Browser Config (`public/browserconfig.xml`)
- Microsoft Tile support
- Windows Start Menu integration

## Usage

The favicon configuration is automatically applied through the root layout:

```typescript
import { getAppMetadata } from '@/src/utils/favicon';

export const metadata: Metadata = getAppMetadata();
```

## Supported Devices & Browsers

✅ **Desktop Browsers**
- Chrome, Firefox, Safari, Edge
- All favicon sizes (16x16, 32x32, ICO)

✅ **Mobile Devices**  
- iOS Safari (Apple Touch Icon)
- Android Chrome (192x192, 512x512)
- Progressive Web App support

✅ **Operating Systems**
- Windows Tiles (browserconfig.xml)
- macOS Touch Bar
- Linux desktop environments

## Customization

To update favicons:
1. Replace image files in `/public/` directory
2. Update colors in `manifest.json` and `favicon.ts`
3. Modify metadata in `favicon.ts` utility

## Generated HTML Tags

The configuration automatically generates these tags:

```html
<link rel="icon" href="/favicon.ico" sizes="any">
<link rel="icon" href="/favicon-16x16.png" sizes="16x16" type="image/png">
<link rel="icon" href="/favicon-32x32.png" sizes="32x32" type="image/png">
<link rel="apple-touch-icon" href="/apple-touch-icon.png" sizes="180x180">
<link rel="manifest" href="/manifest.json">
<meta name="theme-color" content="#073890">
<meta name="msapplication-config" content="/browserconfig.xml">
```