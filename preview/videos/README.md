# Videos

`hero.mp4` is the AJC brand film, played as the full-screen background on the
home page (`src/components/home/Hero.tsx`).

It's been compressed for web (1080p H.264, CRF 28, faststart) from the original
~57 MB master down to ~16 MB. To re-encode from a new master:

```bash
ffmpeg -i master.mp4 -c:v libx264 -preset slow -crf 28 -pix_fmt yuv420p \
  -c:a aac -b:a 96k -movflags +faststart hero.mp4
```

The poster frame (`public/images/hero-poster.jpg`) is a still from the film,
shown before the video loads and as the reduced-motion fallback. Regenerate with:

```bash
ffmpeg -ss 45 -i hero.mp4 -frames:v 1 -q:v 3 -vf "scale=1920:-2" \
  ../images/hero-poster.jpg
```
