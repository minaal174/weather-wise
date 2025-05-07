# Adding the WeatherWise Logo as your App Icon

Follow these steps to update your app with the new WeatherWise logo:

## Step 1: Prepare your logo image

1. Save the WeatherWise logo image from the chat to your local computer
2. Make sure it has a transparent background (PNG format recommended)
3. The logo should be square, ideally 1024x1024 pixels

## Step 2: Replace the app icon files

Replace the following files in your project:

- `assets/images/icon.png` - Main app icon (1024x1024px)
- `assets/images/adaptive-icon.png` - Android adaptive icon (1024x1024px)
- `assets/images/favicon.png` - Web favicon (196x196px)
- `assets/images/splash-icon.png` - Splash screen icon (1024x1024px)

## Step 3: Resize the images appropriately

For best results:
- Keep the important content of your icon centered
- For Android adaptive icons, keep the main content within the center 512x512px area
- Make smaller versions of the icon as needed for different platforms

## Step 4: Testing the app icon

Run your app to see the new icon in action:

```bash
# Start the development server
npm start

# Or build for specific platforms
expo build:android
expo build:ios
```

## Icon Resources

The WeatherWise logo features:
- Light blue background (#B3E5FC)
- Yellow sun
- Blue cloud
- AI icon with circuit-like decoration
- "WeatherWise" text in dark gray

## Using Online Icon Generators

You can also use these online tools to generate all the necessary icon sizes from your master image:
- [EasyAppIcon](https://easyappicon.com/)
- [AppIcon](https://appicon.co/)
- [Expo Icon Generator](https://expo.dev/tools/icon-generator)

## Note

The app.json file has been updated with the appropriate background color (#B3E5FC) to match the WeatherWise logo. This ensures a cohesive look between your icon and the splash screen. 