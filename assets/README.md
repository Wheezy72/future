# Assets

Place your icons, splash and fonts here.

## Fonts (Cyberpunk Theme)
Recommended 3 fonts:
- Orbitron.ttf (headline/display, sci-fi geometric)
- Rajdhani.ttf (body text, clean condensed)
- ShareTechMono.ttf (mono/accent, tech feel)

Map them in src/hooks/useFonts.js:
{
  "Orbitron": require("./fonts/Orbitron.ttf"),
  "Rajdhani": require("./fonts/Rajdhani.ttf"),
  "ShareTechMono": require("./fonts/ShareTechMono.ttf")
}

If your filenames differ, adjust the requires accordingly.

## Images
Update app.json to point at your icon/splash assets:
- assets/images/icon.png
- assets/images/splash.png
- assets/images/adaptive-icon.png