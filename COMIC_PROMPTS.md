# Midjourney Comic Prompt System
## Styles: Joe Kubert · Frank Miller · Golden Age Comics
## Workflow: Midjourney → Comic Life

---

## HOW TO USE THIS SYSTEM

The key to consistency across panels is **locking three things**:
1. **Style anchor** — paste the same style block into every prompt
2. **Character anchor** — paste the same character block for each character
3. **Seed** — use `--seed XXXXXX` (same number per character) + `--cref` once you have a good reference image

---

## STYLE ANCHORS

Pick one and paste it at the END of every prompt.

### Joe Kubert Style
```
joe kubert comic art style, expressive ink linework, dramatic shadows, war comic aesthetic, rough crosshatching, dynamic figure drawing, editorial illustration, 1960s DC comics, gritty realism, bold outlines, noir atmosphere
```

### Frank Miller Style
```
frank miller comic art style, high contrast black and white, stark shadows, sin city aesthetic, noir, hard boiled, brutal linework, heavy blacks, minimal color, graphic novel, crime noir, chiaroscuro
```

### Golden Age Comics Style
```
golden age comic book art, 1940s newspaper comic style, bold primary colors, clean ink outlines, flat color fills, benday dots, four color printing aesthetic, vintage superhero art, pulp illustration, Jack Kirby inspired, classic americana
```

### Combined Style (all three influences)
```
golden age comic art meets frank miller noir, joe kubert expressive inks, 1940s comic book aesthetic, dramatic chiaroscuro, bold outlines, vintage pulp illustration, graphic novel paneling, classic sequential art
```

---

## PANEL COMPOSITION TEMPLATES

Replace `[SUBJECT]`, `[ACTION]`, `[SETTING]` with your specifics.

### Establishing Shot (wide)
```
wide establishing shot, [SETTING], [SUBJECT] small in frame, cinematic composition, sequential art panel, [STYLE ANCHOR] --ar 3:2
```

### Action Panel (dynamic)
```
dynamic action panel, [SUBJECT] [ACTION], motion lines, extreme perspective, sequential art, [STYLE ANCHOR] --ar 3:2
```

### Close-Up / Reaction
```
extreme close up face, [SUBJECT], intense expression, [EMOTION], dramatic lighting, comic book close up panel, [STYLE ANCHOR] --ar 2:3
```

### Two-Character Dialogue
```
two characters facing each other, [CHARACTER 1] and [CHARACTER 2], dialogue composition, over the shoulder shot, comic panel, [STYLE ANCHOR] --ar 3:2
```

### Splash Page / Hero Shot
```
full body hero shot, [SUBJECT] [ACTION], [SETTING] background, dramatic angle, comic book splash page, [STYLE ANCHOR] --ar 2:3
```

### Fight / Combat Panel
```
combat scene, [CHARACTER 1] vs [CHARACTER 2], [ACTION], impact, motion blur, comic book fight panel, [STYLE ANCHOR] --ar 3:2
```

---

## CHARACTER ANCHORS

**Create one anchor block per character. Copy/paste it into every panel that features that character.**

### Template — fill in and save
```
[CHARACTER NAME]: [height/build], [hair color and style], [eye color], [skin tone], [signature clothing description], [any distinguishing features like scars, beard, etc.]
```

### Example — "The Detective"
```
Jake Morrow detective: tall lean muscular build, dark slicked back hair, chiseled jaw with stubble, steel blue eyes, worn brown trench coat, white dress shirt open collar, shoulder holster, scar above left eyebrow
```

### Example — "The Villain"
```
Victor Crane villain: heavyset imposing build, bald head, cruel thin lips, cold grey eyes, black double-breasted suit, gold watch, thick hands, sinister expression
```

### Example — "The Hero (Golden Age)"
```
Captain Liberty hero: broad shouldered athletic build, square jaw, blond crew cut, blue eyes, red white blue costume with star emblem on chest, cape, confident heroic expression
```

---

## FULL PROMPT EXAMPLES

### Example 1 — Noir Establishing Shot (Miller style)
```
/imagine wide establishing shot, rain soaked city alley at night, tall lean detective in worn trench coat standing under a flickering streetlamp, lone figure, fog, puddles reflecting neon light, frank miller comic art style, high contrast black and white, stark shadows, sin city aesthetic, noir, heavy blacks, graphic novel --ar 3:2 --seed 42601
```

### Example 2 — War Action Panel (Kubert style)
```
/imagine dynamic action panel, WWII soldier charging through mud and barbed wire, artillery explosions in background, extreme low angle, motion lines, sequential art panel, joe kubert comic art style, expressive ink linework, dramatic shadows, war comic aesthetic, rough crosshatching, dynamic figure drawing, 1960s DC comics, gritty realism, bold outlines --ar 3:2 --seed 18844
```

### Example 3 — Golden Age Hero Splash
```
/imagine full body hero shot, caped golden age superhero punching through a stone wall, dramatic upward angle, rubble flying, golden age comic book art, 1940s newspaper comic style, bold primary colors, clean ink outlines, flat color fills, benday dots, four color printing aesthetic, vintage superhero art, Jack Kirby inspired --ar 2:3 --seed 77203
```

### Example 4 — Villain Close-Up
```
/imagine extreme close up face, menacing bald villain, cruel thin lips curled in sneer, cold grey eyes, shadows across face, dramatic lighting from below, comic book close up panel, golden age comic art meets frank miller noir, joe kubert expressive inks, bold outlines, vintage pulp illustration --ar 2:3 --seed 18844
```

---

## CONSISTENCY TIPS

### Character Consistency Across Panels
1. **Write out your character anchor once** and paste the full description into every prompt
2. **Use the same `--seed`** for each character (pick a random number and stick with it per character)
3. **Use `--cref [image URL]`** once you have a panel you like — Midjourney will match the character face/look
4. Keep the character description in the **same position** in every prompt (right after the composition description)

### Style Consistency
- **Always end prompts with the same style anchor** — don't vary it
- Add `--style raw` if Midjourney is adding too much of its own interpretation
- Add `--stylize 50` to `--stylize 150` range for comics (lower = less stylized)

### Avoiding Hallucination / Unwanted Changes
Add these **negative prompts** (`--no`) to keep Midjourney on track:
```
--no photorealistic, 3D render, anime, manga, modern digital art, photograph, realistic skin, oil painting
```

### Recommended Midjourney Parameters
```
--ar 3:2        (landscape panels)
--ar 2:3        (portrait / tall panels)  
--ar 1:1        (square panels)
--v 6.1         (current best version)
--style raw     (reduces MJ's own style influence)
--stylize 75    (moderate stylization)
--seed XXXXXX   (lock per character)
```

---

## PANEL SEQUENCE WORKFLOW

1. **Write your story beat list** (what happens in each panel)
2. **Assign composition type** from the templates above to each beat
3. **Insert character anchor** + **style anchor** into each prompt
4. **Generate 4 variants** per panel, pick the best
5. **Lock the seed** from your favorite result and regenerate similar panels
6. **Use `--cref`** with your best character image for facial/character consistency
7. **Import into Comic Life** and add speech bubbles / captions

---

## QUICK COPY BLOCKS

### Miller Noir — paste as-is for quick start
```
frank miller comic art style, high contrast black and white, stark shadows, sin city aesthetic, noir, heavy blacks, graphic novel --no photorealistic, 3D render, anime, photograph --ar 3:2 --v 6.1 --style raw --stylize 75
```

### Kubert War — paste as-is for quick start
```
joe kubert comic art style, expressive ink linework, dramatic shadows, war comic aesthetic, rough crosshatching, bold outlines, 1960s DC comics --no photorealistic, 3D render, anime, photograph --ar 3:2 --v 6.1 --style raw --stylize 75
```

### Golden Age Hero — paste as-is for quick start
```
golden age comic book art, 1940s style, bold primary colors, clean ink outlines, flat color fills, benday dots, Jack Kirby inspired --no photorealistic, 3D render, anime, photograph --ar 3:2 --v 6.1 --style raw --stylize 75
```
