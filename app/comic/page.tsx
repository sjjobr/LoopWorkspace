'use client'

import { useState, useCallback } from 'react'

// ─── Characters ──────────────────────────────────────────────────────────────

type Character = {
  id: string
  name: string
  role: string
  anchor: string
  prompt: string
  seed: number
}

const CHARACTERS: Character[] = [
  {
    id: 'hardpan',
    name: 'Hardpan',
    role: 'The Vigilante',
    anchor: 'Hardpan the vigilante: face entirely wrapped in grimy ash-stained medical gauze like a mummy, heavy tattered oilskin duster coat billowing like a cape, battered wide-brimmed slouch hat casting face in pitch-black shadow, only piercing white eyes visible, massive soot-stained leather mason\'s gloves reinforced with iron, gripping rusted iron brick-hammer, 1880s San Diego',
    prompt: '/imagine prompt: A terrifying 1880s vigilante named Hardpan swinging through a dark alley in San Diego\'s Stingaree district. His face is entirely wrapped in grimy, ash-stained medical gauze like a mummy. He wears a heavy, tattered oilskin duster coat blowing violently in the wind like a cape, and a battered wide-brimmed slouch hat casting his face in pitch-black shadow with only piercing white eyes visible. He has massive soot-stained leather mason\'s gloves reinforced with iron, gripping a rusted iron brick-hammer. Comic book art style of Neal Adams and Jim Aparo, heavy inking, deep oppressive shadows, 1970s Bronze Age DC horror comics, Joe Kubert gritty pulp, 1880s San Diego Stingaree district, coastal fog, sickly yellow gaslight, raw ink, aggressive crosshatching --ar 2:3 --v 6.1 --style raw --seed 42601',
    seed: 42601,
  },
  {
    id: 'shen',
    name: 'Shen',
    role: 'The Informant — Steam Vats',
    anchor: 'Shen: older Chinese laundry owner, calm observant expression, inside massive multi-story laundry operation, surrounding huge boiling copper vats, thick heavy steam filling room, holding waterlogged ledger book, 1880s San Diego Chinatown, shrewd intelligent eyes',
    prompt: '/imagine prompt: An older 1880s Chinese laundry owner named Shen standing inside a massive, multi-story laundry operation in San Diego\'s Chinatown. He is surrounded by huge, boiling copper vats. Thick, heavy steam fills the room, blending with the coastal fog rolling through the wooden windows. Shen looks calm but observant, holding a waterlogged ledger book. Comic book art style of Neal Adams and Jim Aparo, heavy inking, deep oppressive shadows, 1970s Bronze Age DC horror comics, Joe Kubert gritty pulp, 1880s San Diego Stingaree district, raw ink, heavy crosshatching on his face, dark atmospheric lighting --ar 2:3 --v 6.1 --style raw --seed 31847',
    seed: 31847,
  },
  {
    id: 'sadie',
    name: 'Sadie',
    role: 'The Canary — Golden Poppy',
    anchor: 'Sadie the streetwalker: hardened survivor, heavy exhausted facial lines showing trauma, frayed coarse wool shawl, faded 1880s street clothes, standing nervously in pitch-black alleyway under sickly flickering gaslamp, defiant but broken eyes, 1880s San Diego',
    prompt: '/imagine prompt: Sadie, an 1880s streetwalker and hardened survivor at the Golden Poppy brothel in the Stingaree district of San Diego. She has heavy, exhausted facial lines showing the trauma of living in a slum. She wears a frayed, coarse wool shawl and faded 1880s street clothes. She is standing nervously in a pitch-black alleyway of rotting wood and mud under the sickly glow of a single flickering gaslamp. Comic book art style of Joe Kubert Weird War Tales and Jim Aparo, heavy inking, deep oppressive shadows, 1970s Bronze Age DC horror comics, gritty pulp, 1880s San Diego Stingaree district, thick coastal fog, raw ink, extreme crosshatching --ar 2:3 --v 6.1 --style raw --seed 58293',
    seed: 58293,
  },
  {
    id: 'wyatt',
    name: 'Wyatt Earp',
    role: 'The Lion in Winter',
    anchor: 'Wyatt Earp 1880s: older hardened gambling tycoon, sitting in heavy smoky shadows of high-end Victorian saloon, rugged but impeccably tailored 1880s suit, prominent mustache, customized silver Peacemaker revolver on mahogany desk, open ledger, lion in winter expression',
    prompt: '/imagine prompt: The historical 1880s Wyatt Earp depicted as an older, hardened gambling tycoon in San Diego. He is sitting in the heavy, smoky shadows of a high-end Victorian saloon called the Oyster Bar. He wears a rugged but impeccably tailored 1880s suit with a prominent mustache. On the mahogany desk in front of him rests a customized silver Peacemaker revolver and an open ledger. Comic book art style of Neal Adams and Jim Aparo, heavy inking, deep oppressive shadows, 1970s Bronze Age DC comics, Joe Kubert gritty pulp, raw ink, heavy crosshatching, dramatic noir lighting --ar 2:3 --v 6.1 --style raw --seed 19047',
    seed: 19047,
  },
  {
    id: 'sterling',
    name: 'Silas Sterling',
    role: 'The Architect — The Villain',
    anchor: 'Silas Sterling villain: arrogant wealthy 1880s real estate developer, sharp sinister angular facial features, immaculate expensive tailored Victorian suit contrasting with city soot, standing over ornate architectural scale model of 1915 exposition, cold calculating eyes',
    prompt: '/imagine prompt: Silas Sterling, an arrogant, wealthy 1880s real estate developer and the secret protector of the Surgeon of Stingaree in San Diego. He has sharp, sinister, angular facial features. He wears an immaculate, expensive tailored Victorian suit that starkly contrasts with the soot of the city. He is standing over an ornate architectural scale model of a beautiful 1915 Panama-California Exposition. Comic book art style of Neal Adams, classic comic book villain, heavy inking, deep oppressive shadows, 1970s Bronze Age DC comics, raw ink, heavy crosshatching, stark lighting --ar 2:3 --v 6.1 --style raw --seed 77203',
    seed: 77203,
  },
  {
    id: 'obannon',
    name: "Det. O'Bannon",
    role: 'The Honest Cop',
    anchor: "Detective O'Bannon: exhausted desperate 1880s police detective, heavy soaked trench coat, battered bowler hat, suffocated by corruption, standing alone on muddy foggy harbor docks, holding classified coroner's folder, good man in impossible situation",
    prompt: "/imagine prompt: Detective O'Bannon, an exhausted and desperate 1880s police detective in San Diego. He wears a heavy, soaked trench coat and a battered bowler hat. He looks suffocated by corruption, standing alone on the muddy, foggy harbor docks holding a classified coroner's folder. Comic book art style of Jim Aparo and Joe Kubert, heavy inking, deep oppressive shadows, 1970s Bronze Age DC horror comics, gritty pulp noir, 1880s San Diego Stingaree district, coastal fog, sickly gaslight, raw ink, thick crosshatching --ar 2:3 --v 6.1 --style raw --seed 54702",
    seed: 54702,
  },
  {
    id: 'surgeon',
    name: 'The Surgeon',
    role: 'The Killer — Jack the Ripper',
    anchor: 'The Surgeon of Stingaree villain: tall extremely lanky phantom-like figure, dark Victorian trench coat and tall top hat, face completely obscured in absolute pitch-black shadow, leather medical doctor\'s bag in one hand, razor-sharp gleaming scalpel in other, slipping through thick alleyway fog',
    prompt: '/imagine prompt: The Surgeon of Stingaree, a terrifying Jack the Ripper serial killer archetype in 1880s San Diego. A tall, extremely lanky, phantom-like figure in a dark Victorian trench coat and tall top hat. His face is completely obscured in absolute pitch-black shadow. He holds a classic leather medical doctor\'s bag in one hand and a razor-sharp gleaming scalpel in the other, slipping through a thick alleyway fog. Comic book art style of Jim Aparo, heavy inking, deep oppressive shadows, 1970s Bronze Age DC horror comics, raw ink, extreme contrast, terrifying silhouette --ar 2:3 --v 6.1 --style raw --seed 63918',
    seed: 63918,
  },
]

// ─── Panel Layouts ────────────────────────────────────────────────────────────

type PanelLayout = {
  id: string
  name: string
  description: string
  mjAR: string
  composition: string
}

const PANEL_LAYOUTS: PanelLayout[] = [
  {
    id: 'splash',
    name: 'Splash Page',
    description: 'Full page',
    mjAR: '2:3',
    composition: 'full page splash panel, hero shot, maximum dramatic impact, single full bleed image, cinematic composition, comic book splash page',
  },
  {
    id: 'wide',
    name: 'Wide Action',
    description: 'Cinematic',
    mjAR: '3:1',
    composition: 'wide cinematic panel, panoramic composition, horizontal storytelling, landscape comic panel, establishing shot',
  },
  {
    id: 'portrait',
    name: 'Portrait',
    description: 'Tall panel',
    mjAR: '1:2',
    composition: 'tall vertical panel, portrait composition, vertical comic panel, figure study',
  },
  {
    id: 'standard',
    name: 'Standard',
    description: '3:2 panel',
    mjAR: '3:2',
    composition: 'standard comic book panel, classic composition, sequential art panel',
  },
  {
    id: 'closeup',
    name: 'Close-Up',
    description: 'Face / detail',
    mjAR: '1:1',
    composition: 'extreme close up panel, face filling frame, intimate detail shot, comic book close up, intense expression',
  },
  {
    id: 'widescreen',
    name: 'Widescreen',
    description: '4:3 panel',
    mjAR: '4:3',
    composition: 'widescreen comic panel, action scene composition, dynamic comic panel, 4:3 ratio',
  },
]

// ─── Scene Templates ──────────────────────────────────────────────────────────

const SCENE_TEMPLATES = [
  { label: 'Stingaree Alley', value: 'rain-slicked alley in the Stingaree District at night, rotting wood buildings, sickly yellow gaslight reflections in puddles, thick coastal fog, San Diego 1895' },
  { label: 'Demolition Site', value: 'half-demolished building in the Stingaree District, rubble and broken timber, wrecking balls, scaffolding, chaos of urban clearance for the 1915 Exposition' },
  { label: 'Shen\'s Laundry', value: 'massive multi-story laundry operation, boiling copper vats, thick steam filling the air, coastal fog through wooden windows, shadowy corners, Chinatown San Diego' },
  { label: 'Golden Poppy', value: 'smoky interior of the Golden Poppy brothel, red velvet, oil lamps, worn wooden floors, desperate characters in the shadows' },
  { label: 'Oyster Bar', value: 'Wyatt Earp\'s high-end Victorian saloon the Oyster Bar, dark mahogany, cigarette smoke, gambling tables, dangerous men, 1880s San Diego' },
  { label: 'Harbor Docks', value: 'muddy foggy harbor docks at night, dead man\'s point, cold ocean wind, gas lamps in the distance, fishing boats, isolation' },
  { label: 'Balboa Park', value: 'towering ornate architecture of Balboa Park under construction, scaffolding, 1915 Panama-California Exposition buildings rising, dreamlike contrast with Stingaree squalor' },
  { label: 'Caliche Kiln', value: 'terrifying brick kiln and cement works in the 1880s, caustic caliche dust, industrial hellscape, massive furnaces, workers dwarfed by machinery' },
]

// ─── Style ────────────────────────────────────────────────────────────────────

const STYLE_ANCHOR = 'comic book art style of Neal Adams and Jim Aparo, heavy inking, deep oppressive shadows, 1970s Bronze Age DC horror comics, Joe Kubert gritty pulp war comics, heavy crosshatching, raw ink linework, dramatic perspective, noir atmosphere'

const NEGATIVE = '--no photorealistic, 3D render, anime, manga, photograph, CGI, steampunk gears, digital art, oil painting, watercolor realism, modern setting'

// ─── Component ────────────────────────────────────────────────────────────────

export default function ComicBuilderPage() {
  const [selectedCharacters, setSelectedCharacters] = useState<string[]>([])
  const [selectedLayout, setSelectedLayout] = useState<PanelLayout>(PANEL_LAYOUTS[3])
  const [sceneDescription, setSceneDescription] = useState('')
  const [activeTab, setActiveTab] = useState<'builder' | 'characters' | 'story'>('builder')
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [savedPrompts, setSavedPrompts] = useState<{ label: string; prompt: string }[]>([])

  const toggleCharacter = useCallback((id: string) => {
    setSelectedCharacters(prev =>
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    )
  }, [])

  const buildPrompt = useCallback(() => {
    const chars = CHARACTERS.filter(c => selectedCharacters.includes(c.id))
    const charAnchors = chars.map(c => c.anchor).join(', ')
    const seed = chars.length > 0 ? chars[0].seed : 42601

    const parts = [
      sceneDescription.trim() || 'dramatic scene in the Stingaree District, San Diego 1895',
      charAnchors,
      selectedLayout.composition,
      STYLE_ANCHOR,
    ].filter(Boolean)

    return `/imagine prompt: ${parts.join(', ')} ${NEGATIVE} --ar ${selectedLayout.mjAR} --v 6.1 --style raw --seed ${seed}`
  }, [selectedCharacters, selectedLayout, sceneDescription])

  const builtPrompt = buildPrompt()

  const copyText = useCallback((text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }, [])

  const savePrompt = useCallback(() => {
    const label = sceneDescription.slice(0, 40) || `Panel ${savedPrompts.length + 1}`
    setSavedPrompts(prev => [...prev, { label, prompt: builtPrompt }])
  }, [builtPrompt, sceneDescription, savedPrompts.length])

  return (
    <div style={s.root}>
      {/* ── Header ── */}
      <div style={s.header}>
        <div>
          <div style={s.headerTitle}>THE STINGAREE PHANTOM</div>
          <div style={s.headerSub}>Midjourney Prompt Builder · Neal Adams / Jim Aparo / Joe Kubert Style</div>
        </div>
        <div style={s.tabs}>
          {(['builder', 'characters', 'story'] as const).map(tab => (
            <button
              key={tab}
              style={{ ...s.tab, ...(activeTab === tab ? s.tabActive : {}) }}
              onClick={() => setActiveTab(tab)}
            >
              {tab.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* ── Builder Tab ── */}
      {activeTab === 'builder' && (
        <div style={s.body}>
          {/* Left */}
          <div style={s.leftCol}>

            <section style={s.section}>
              <div style={s.sectionLabel}>PANEL LAYOUT</div>
              <div style={s.layoutGrid}>
                {PANEL_LAYOUTS.map(layout => (
                  <button
                    key={layout.id}
                    style={{ ...s.layoutBtn, ...(selectedLayout.id === layout.id ? s.layoutBtnActive : {}) }}
                    onClick={() => setSelectedLayout(layout)}
                  >
                    <LayoutPreview ratio={layout.mjAR} active={selectedLayout.id === layout.id} />
                    <div style={s.layoutBtnName}>{layout.name}</div>
                    <div style={s.layoutBtnAR}>{layout.mjAR}</div>
                  </button>
                ))}
              </div>
            </section>

            <section style={s.section}>
              <div style={s.sectionLabel}>CHARACTERS IN PANEL</div>
              <div style={s.charGrid}>
                {CHARACTERS.map(c => (
                  <button
                    key={c.id}
                    style={{ ...s.charBtn, ...(selectedCharacters.includes(c.id) ? s.charBtnActive : {}) }}
                    onClick={() => toggleCharacter(c.id)}
                  >
                    <div style={s.charBtnName}>{c.name}</div>
                    <div style={s.charBtnRole}>{c.role}</div>
                  </button>
                ))}
              </div>
            </section>

            <section style={s.section}>
              <div style={s.sectionLabel}>SCENE / ACTION</div>
              <div style={s.sceneTemplates}>
                {SCENE_TEMPLATES.map(t => (
                  <button
                    key={t.label}
                    style={s.sceneBtn}
                    onClick={() => setSceneDescription(t.value)}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
              <textarea
                style={s.textarea}
                placeholder='Describe the panel action, or click a scene template above...'
                value={sceneDescription}
                onChange={e => setSceneDescription(e.target.value)}
                rows={4}
              />
            </section>
          </div>

          {/* Right */}
          <div style={s.rightCol}>
            <section style={s.section}>
              <div style={s.sectionLabel}>GENERATED PROMPT</div>
              <div style={s.promptBox}>{builtPrompt}</div>
              <div style={s.promptActions}>
                <button style={{ ...s.btn, ...s.btnPrimary }} onClick={() => copyText(builtPrompt, 'main')}>
                  {copiedId === 'main' ? '✓ COPIED!' : 'COPY PROMPT'}
                </button>
                <button style={{ ...s.btn, ...s.btnSecondary }} onClick={savePrompt}>
                  SAVE TO PAGE
                </button>
                <a href="https://www.midjourney.com/imagine" target="_blank" rel="noopener noreferrer" style={{ ...s.btn, ...s.btnLink }}>
                  OPEN MIDJOURNEY ↗
                </a>
              </div>
            </section>

            <section style={s.section}>
              <div style={s.sectionLabel}>STYLE LOCKED — 1970s BRONZE AGE DC</div>
              <div style={s.styleInfo}>
                <div style={s.styleTag}>Neal Adams</div>
                <div style={s.styleTag}>Jim Aparo</div>
                <div style={s.styleTag}>Joe Kubert</div>
                <div style={s.styleTag}>Weird War Tales</div>
                <div style={s.styleTag}>DC Horror Comics</div>
                <div style={s.styleTag}>Heavy Crosshatching</div>
                <div style={s.styleTag}>Bronze Age</div>
                <div style={s.styleTag}>No Steampunk</div>
              </div>
            </section>

            {savedPrompts.length > 0 && (
              <section style={s.section}>
                <div style={{ ...s.sectionLabel, display: 'flex', justifyContent: 'space-between' }}>
                  <span>SAVED ({savedPrompts.length} PANELS)</span>
                  <button
                    style={{ ...s.btn, ...s.btnSecondary, fontSize: 10, padding: '2px 8px' }}
                    onClick={() => copyText(savedPrompts.map((p, i) => `── Panel ${i + 1}: ${p.label} ──\n${p.prompt}`).join('\n\n'), 'all')}
                  >
                    {copiedId === 'all' ? '✓ COPIED!' : 'COPY ALL'}
                  </button>
                </div>
                {savedPrompts.map((p, i) => (
                  <div key={i} style={s.savedItem}>
                    <div style={s.savedLabel}>Panel {i + 1}: {p.label}</div>
                    <div style={s.savedPrompt}>{p.prompt}</div>
                    <button
                      style={{ ...s.btn, ...s.btnSecondary, fontSize: 10, padding: '2px 8px', marginTop: 6 }}
                      onClick={() => copyText(p.prompt, `saved-${i}`)}
                    >
                      {copiedId === `saved-${i}` ? '✓ COPIED!' : 'COPY'}
                    </button>
                  </div>
                ))}
              </section>
            )}

            <section style={s.section}>
              <div style={s.sectionLabel}>CONSISTENCY TIPS</div>
              <div style={s.tips}>
                <div style={s.tip}><span style={s.tipDot}>◆</span> Each character has a locked <strong>seed number</strong> — keep it consistent across all panels for that character</div>
                <div style={s.tip}><span style={s.tipDot}>◆</span> Once you get a face you like, add <code style={s.code}>--cref [image URL]</code> to lock it in future panels</div>
                <div style={s.tip}><span style={s.tipDot}>◆</span> Use <code style={s.code}>--sref [image URL]</code> from your best panel to maintain consistent style across all panels</div>
                <div style={s.tip}><span style={s.tipDot}>◆</span> Hardpan's gauze wrapping and oilskin duster are his key visual anchors — include them in every prompt</div>
                <div style={s.tip}><span style={s.tipDot}>◆</span> Import into Comic Life → add speech bubbles → use a 1970s-era comic lettering style</div>
              </div>
            </section>
          </div>
        </div>
      )}

      {/* ── Characters Tab ── */}
      {activeTab === 'characters' && (
        <div style={s.charListBody}>
          {CHARACTERS.map(c => (
            <div key={c.id} style={s.charCard}>
              <div style={s.charCardHeader}>
                <div>
                  <div style={s.charCardName}>{c.name}</div>
                  <div style={s.charCardRole}>{c.role}</div>
                </div>
                <div style={s.charCardSeed}>seed: {c.seed}</div>
              </div>
              <div style={s.charCardSection}>
                <div style={s.charCardLabel}>CHARACTER ANCHOR</div>
                <div style={s.charCardText}>{c.anchor}</div>
              </div>
              <div style={s.charCardSection}>
                <div style={s.charCardLabel}>FULL MIDJOURNEY PROMPT</div>
                <div style={s.charCardPrompt}>{c.prompt}</div>
              </div>
              <button
                style={{ ...s.btn, ...s.btnPrimary, marginTop: 8 }}
                onClick={() => copyText(c.prompt, c.id)}
              >
                {copiedId === c.id ? '✓ COPIED!' : 'COPY PROMPT'}
              </button>
            </div>
          ))}
        </div>
      )}

      {/* ── Story Tab ── */}
      {activeTab === 'story' && (
        <div style={s.storyBody}>
          <div style={s.storyCard}>
            <div style={s.storyTitle}>THE STINGAREE PHANTOM</div>
            <div style={s.storySubtitle}>A Graphic Novel · Pre-1915 San Diego</div>
            <div style={s.storySetting}>
              San Diego's Stingaree District — 1895. As the city's elite prepare to host the Panama-California Exposition, they bulldoze this lawless stretch between 1st and 5th Avenues, home to opium dens, brothels like the Golden Poppy, and saloons like Wyatt Earp's Oyster Bar. A serial killer, The Surgeon of Stingaree, stalks its streets — protected by developer Silas Sterling, who uses the murders to terrorize residents and drive down land values.
            </div>
          </div>

          <div style={s.storyGrid}>
            <div style={s.storyBlock}>
              <div style={s.storyBlockTitle}>THE VIGILANTE'S ORIGIN</div>
              <div style={s.storyBlockText}>
                A young laborer is caught in a catastrophic structural collapse at a brickyard and cement works. Trapped when a high-heat kiln ruptures into a vat of caustic raw limestone and caliche — he barely survives, emerging from the hardened toxic slurry as ash and scarred flesh. His nervous system is irreparably damaged, leaving him with unnatural immunity to physical pain. He wraps his chemical burns in layers of grimy medical gauze, dons a heavy oilskin duster, and becomes the district's nightmare.
              </div>
            </div>

            <div style={s.storyBlock}>
              <div style={s.storyBlockTitle}>THE NAME: HARDPAN</div>
              <div style={s.storyBlockText}>
                "Hardpan" was the local miners' and builders' term for caliche — an impenetrable layer of sedimentary limestone that broke iron shovels and shattered pickaxes. The underworld whispers it in terror. He leaves no symbol, no calling card. Only shattered brickwork, the lingering smell of caustic caliche dust, and the bone-deep blunt-force trauma left on his targets.
              </div>
            </div>

            <div style={s.storyBlock}>
              <div style={s.storyBlockTitle}>ART STYLE</div>
              <div style={s.storyBlockText}>
                Heavy, slashing inks and deep oppressive shadows. Neal Adams' gothic dynamic geometry. Jim Aparo's kinetic sweeping action. Joe Kubert's gritty war-torn aesthetic from Weird War Tales. The environment is palpably filthy — every wooden beam splintered, every brick slick with ocean dampness. NOT steampunk. Dark Victorian pulp horror.
              </div>
            </div>

            <div style={s.storyBlock}>
              <div style={s.storyBlockTitle}>KEY LOCATIONS</div>
              <div style={s.storyBlockText}>
                • Stingaree District — alleys, rotting wood, stingray barbs in mud<br />
                • Golden Poppy Brothel — where Sadie works<br />
                • Shen's Steam Vats — laundry/intelligence network<br />
                • Wyatt Earp's Oyster Bar — neutral ground<br />
                • Dead Man's Point — waterfront burial ground<br />
                • Balboa Park — Expo construction, the villain's dream<br />
                • Caliche Kiln / Brickworks — Hardpan's origin site
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// ─── Layout Preview ───────────────────────────────────────────────────────────

function LayoutPreview({ ratio, active }: { ratio: string; active: boolean }) {
  const [w, h] = ratio.split(':').map(Number)
  const maxW = 44, maxH = 28
  const scale = Math.min(maxW / w, maxH / h)
  const pw = Math.round(w * scale)
  const ph = Math.round(h * scale)
  return (
    <svg width={maxW} height={maxH} style={{ display: 'block', margin: '0 auto 4px' }}>
      <rect x={(maxW - pw) / 2} y={(maxH - ph) / 2} width={pw} height={ph}
        fill={active ? RED : '#2a2a2a'} stroke={active ? '#fff' : '#444'} strokeWidth={1} rx={1} />
    </svg>
  )
}

// ─── Theme ────────────────────────────────────────────────────────────────────

const BLACK = '#080808'
const WHITE = '#eeeeee'
const RED = '#b81818'
const DIM = '#777'
const BORDER = '#242424'
const SURFACE = '#121212'
const SURFACE2 = '#1c1c1c'

const s: Record<string, React.CSSProperties> = {
  root: { minHeight: '100vh', backgroundColor: BLACK, color: WHITE, fontFamily: "'Courier New', Courier, monospace" },

  header: { borderBottom: `1px solid ${BORDER}`, padding: '14px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', backgroundColor: '#0a0a0a', flexWrap: 'wrap', gap: 12 },
  headerTitle: { fontSize: 18, fontWeight: 900, letterSpacing: '0.12em', color: RED, lineHeight: 1 },
  headerSub: { fontSize: 10, color: DIM, letterSpacing: '0.06em', marginTop: 4 },

  tabs: { display: 'flex', gap: 4 },
  tab: { background: 'transparent', border: `1px solid ${BORDER}`, color: DIM, fontFamily: "'Courier New', Courier, monospace", fontSize: 11, letterSpacing: '0.08em', padding: '6px 14px', cursor: 'pointer', borderRadius: 2 },
  tabActive: { borderColor: RED, color: WHITE, background: '#1a0505' },

  body: { display: 'flex', alignItems: 'flex-start' },
  leftCol: { flex: '0 0 380px', borderRight: `1px solid ${BORDER}`, padding: 20, display: 'flex', flexDirection: 'column', gap: 24 },
  rightCol: { flex: 1, padding: 20, display: 'flex', flexDirection: 'column', gap: 24 },

  section: { display: 'flex', flexDirection: 'column', gap: 10 },
  sectionLabel: { fontSize: 9, fontWeight: 700, letterSpacing: '0.18em', color: RED, borderBottom: `1px solid ${BORDER}`, paddingBottom: 5 },

  layoutGrid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6 },
  layoutBtn: { background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 3, padding: '8px 4px', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', transition: 'border-color 0.15s' },
  layoutBtnActive: { borderColor: RED, background: '#150505' },
  layoutBtnName: { fontSize: 9, color: WHITE, fontWeight: 700, marginTop: 2, letterSpacing: '0.04em' },
  layoutBtnAR: { fontSize: 8, color: DIM },

  charGrid: { display: 'flex', flexDirection: 'column', gap: 5 },
  charBtn: { background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 3, padding: '7px 10px', cursor: 'pointer', textAlign: 'left', display: 'flex', justifyContent: 'space-between', alignItems: 'center', transition: 'border-color 0.15s' },
  charBtnActive: { borderColor: RED, background: '#1a0505' },
  charBtnName: { fontSize: 12, fontWeight: 700, color: WHITE },
  charBtnRole: { fontSize: 9, color: DIM },

  sceneTemplates: { display: 'flex', flexWrap: 'wrap', gap: 5 },
  sceneBtn: { background: SURFACE2, border: `1px solid ${BORDER}`, borderRadius: 3, color: '#bbb', fontSize: 10, padding: '4px 8px', cursor: 'pointer', fontFamily: "'Courier New', Courier, monospace", letterSpacing: '0.04em' },

  textarea: { background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 3, color: WHITE, fontFamily: "'Courier New', Courier, monospace", fontSize: 11, padding: '10px 12px', resize: 'vertical', outline: 'none', lineHeight: 1.6 },

  promptBox: { background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 3, padding: 14, fontSize: 11, lineHeight: 1.7, color: '#ccc', wordBreak: 'break-word', whiteSpace: 'pre-wrap', fontFamily: "'Courier New', Courier, monospace", minHeight: 100 },
  promptActions: { display: 'flex', gap: 8, flexWrap: 'wrap' },

  btn: { fontFamily: "'Courier New', Courier, monospace", fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', padding: '8px 16px', borderRadius: 2, cursor: 'pointer', border: 'none', textDecoration: 'none', display: 'inline-block' },
  btnPrimary: { background: RED, color: WHITE },
  btnSecondary: { background: SURFACE2, color: WHITE, border: `1px solid ${BORDER}` },
  btnLink: { background: 'transparent', color: DIM, border: `1px solid ${BORDER}` },

  styleInfo: { display: 'flex', flexWrap: 'wrap', gap: 6 },
  styleTag: { background: '#1a0505', border: `1px solid ${RED}22`, borderRadius: 2, color: '#cc6666', fontSize: 10, padding: '3px 8px', letterSpacing: '0.06em' },

  savedItem: { background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 3, padding: '10px 12px', marginBottom: 4 },
  savedLabel: { fontSize: 11, fontWeight: 700, color: RED, marginBottom: 4 },
  savedPrompt: { fontSize: 10, color: '#888', lineHeight: 1.6, wordBreak: 'break-word' },

  tips: { display: 'flex', flexDirection: 'column', gap: 8 },
  tip: { fontSize: 11, color: '#aaa', lineHeight: 1.6, display: 'flex', gap: 8, alignItems: 'flex-start' },
  tipDot: { color: RED, flexShrink: 0, marginTop: 2 },
  code: { background: '#1a1a1a', border: `1px solid ${BORDER}`, borderRadius: 2, padding: '1px 4px', fontSize: 10, color: '#ccc', fontFamily: "'Courier New', Courier, monospace" },

  // Characters tab
  charListBody: { padding: 20, display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(480px, 1fr))', gap: 16 },
  charCard: { background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 4, padding: 16, display: 'flex', flexDirection: 'column', gap: 12 },
  charCardHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' },
  charCardName: { fontSize: 16, fontWeight: 900, color: WHITE, letterSpacing: '0.06em' },
  charCardRole: { fontSize: 11, color: RED, marginTop: 2 },
  charCardSeed: { fontSize: 10, color: DIM, fontWeight: 700 },
  charCardSection: { display: 'flex', flexDirection: 'column', gap: 4 },
  charCardLabel: { fontSize: 9, color: RED, letterSpacing: '0.15em', fontWeight: 700 },
  charCardText: { fontSize: 11, color: '#bbb', lineHeight: 1.6 },
  charCardPrompt: { fontSize: 10, color: '#999', lineHeight: 1.7, wordBreak: 'break-word', background: '#0e0e0e', padding: '8px 10px', borderRadius: 3, border: `1px solid ${BORDER}` },

  // Story tab
  storyBody: { padding: 24, maxWidth: 1100, display: 'flex', flexDirection: 'column', gap: 20 },
  storyCard: { border: `1px solid ${RED}44`, background: '#0f0505', borderRadius: 4, padding: 24 },
  storyTitle: { fontSize: 28, fontWeight: 900, color: RED, letterSpacing: '0.1em', marginBottom: 4 },
  storySubtitle: { fontSize: 12, color: DIM, letterSpacing: '0.08em', marginBottom: 16 },
  storySetting: { fontSize: 13, color: '#ccc', lineHeight: 1.8 },
  storyGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16 },
  storyBlock: { background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 4, padding: 16 },
  storyBlockTitle: { fontSize: 10, color: RED, letterSpacing: '0.15em', fontWeight: 700, marginBottom: 10, borderBottom: `1px solid ${BORDER}`, paddingBottom: 6 },
  storyBlockText: { fontSize: 12, color: '#bbb', lineHeight: 1.8 },
}
