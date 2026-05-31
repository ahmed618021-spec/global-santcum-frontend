export type Article = {
  slug: string;
  category: string;
  categoryLabel: string;
  title: string;
  excerpt: string;
  date: string;
  read: string;
  body: string[];
};

export const featuredArticle: Article = {
  slug: "the-quiet-rise-of-regenerative-tourism",
  category: "horizons",
  categoryLabel: "Horizons",
  title:
    "The Quiet Rise of Regenerative Tourism — And Why It Matters More Than Sustainability",
  excerpt:
    "Beyond leaving no trace lies a more radical proposition: travel that actively restores. From rewilding estates in Scotland to coral regeneration programmes in the Maldives, a new generation of venues is rewriting the relationship between tourism and the land it inhabits.",
  date: "February 2026",
  read: "12 min read",
  body: [
    "Sustainability has long been framed as a goal of doing less harm. Regenerative tourism asks a different question entirely: can a stay leave a place measurably healthier than it was before the first guest arrived? Across a small but growing set of venues, the answer is becoming a quiet, practical yes.",
    "On rewilding estates in the Scottish Highlands, guest fees fund the return of native woodland and the species that depend on it. In the Maldives, resorts have folded coral regeneration into the rhythm of a stay, so that a week of rest also becomes a contribution to a reef. The common thread is intention — the deliberate design of hospitality around restoration rather than extraction.",
    "For the traveller, the shift is subtle but profound. It reframes a retreat not as a withdrawal from the world but as a small act of repair within it — and it sets a standard that the most thoughtful venues are increasingly eager to meet.",
  ],
};

export const gridArticles: Article[] = [
  {
    slug: "psychedelic-assisted-wellness",
    category: "horizons",
    categoryLabel: "Horizons",
    title:
      "Psychedelic-Assisted Wellness: The Venues Quietly Leading a Revolution",
    excerpt:
      "From psilocybin retreats in Jamaica to ketamine-assisted therapy in Costa Rica, how a new wave of clinically-informed venues is navigating the space between ancient ceremony and modern science.",
    date: "Jan 2026",
    read: "14 min read",
    body: [
      "The conversation around psychedelic-assisted wellness has moved decisively out of the fringes and into clinics, research institutions, and a carefully regulated set of retreat venues. What distinguishes this new wave is rigour: medical screening, trained facilitators, and structured integration are becoming the baseline rather than the exception.",
      "The venues leading this shift tend to share a sensibility — a respect for the ceremonial traditions these medicines come from, paired with an insistence on safety and informed consent. It is a delicate balance, and the best operators treat it as an ongoing responsibility rather than a marketing position.",
    ],
  },
  {
    slug: "the-breath-as-architecture",
    category: "practice",
    categoryLabel: "The Practice",
    title:
      "The Breath as Architecture: Holotropic Breathing and the Spaces Designed for It",
    excerpt:
      "Why the rooms in which we breathe matter as much as the technique itself — and the venues reimagining breathwork environments from the floor up.",
    date: "Jan 2026",
    read: "9 min read",
    body: [
      "Breathwork is often described in terms of technique, but practitioners know that environment is half the experience. Acoustics, light, temperature, and the simple feeling of safety all shape how deeply a person is willing to let go.",
      "A handful of venues have begun designing rooms specifically for the work — soundproofed, softly lit, and built to hold a group through intensity without distraction. The result is a reminder that the spaces we build quietly instruct the practices we bring to them.",
    ],
  },
  {
    slug: "after-the-retreat-integration",
    category: "pathways",
    categoryLabel: "Pathways",
    title: "After the Retreat: A Gentle Guide to Integration",
    excerpt:
      "The most transformative part of any retreat often happens after you leave. Practical wisdom for carrying what you've learned back into the architecture of everyday life.",
    date: "Dec 2025",
    read: "8 min read",
    body: [
      "The days immediately after a retreat are deceptively important. Insights that felt unshakeable on the final morning can dissolve within a week of ordinary life unless they are given somewhere to land.",
      "Integration is less about willpower than about design: small, repeatable practices, a little protected time, and a willingness to let the experience change something concrete rather than remain a pleasant memory. The aim is continuity, not perfection.",
    ],
  },
  {
    slug: "custodians-of-fivelements-bali",
    category: "portraits",
    categoryLabel: "Portraits",
    title: "A Conversation with the Custodians of Fivelements Bali",
    excerpt:
      "How a bamboo compound on the Ayung River became one of the world's most respected healing sanctuaries — and what its founders believe the wellness industry still gets wrong.",
    date: "Dec 2025",
    read: "11 min read",
    body: [
      "Set along the Ayung River, Fivelements grew from a conviction that healing and beauty are inseparable. Its bamboo architecture, plant-based kitchen, and Balinese healing traditions were never amenities to be itemised — they were the point.",
      "Its custodians are candid about what they believe the wider industry still misses: that depth cannot be scaled carelessly, and that hospitality rooted in genuine reverence for place and culture is difficult to imitate and impossible to fake.",
    ],
  },
  {
    slug: "pricing-transparency-venue-costs",
    category: "craft",
    categoryLabel: "The Craft",
    title:
      "Pricing Transparency: What Retreat Hosts Actually Need to Know About Venue Costs",
    excerpt:
      "A candid breakdown of how venue pricing works, what's negotiable, and the questions every facilitator should ask before signing a booking agreement.",
    date: "Nov 2025",
    read: "10 min read",
    body: [
      "Venue pricing is one of the most opaque parts of running a retreat, and that opacity costs facilitators dearly. Nightly rates rarely tell the whole story; deposits, minimum stays, exclusivity fees, and catering arrangements often matter more.",
      "The most useful thing a host can do is ask precise questions early — about what is included, what is negotiable, and what happens if plans change. Clarity at the outset protects the relationship and the retreat alike.",
    ],
  },
  {
    slug: "onsens-of-tohoku",
    category: "destinations",
    categoryLabel: "Destinations",
    title: "The Onsens of Tohoku: Japan's Quietly Extraordinary Thermal North",
    excerpt:
      "Forget Hakone. The hot spring country north of Tokyo — ancient, unhurried, largely unknown to Western travellers — offers something closer to the soul of Japanese bathing culture.",
    date: "Nov 2025",
    read: "13 min read",
    body: [
      "Tohoku, the mountainous north of Honshu, holds some of Japan's oldest and least commercialised hot springs. Here, bathing is woven into daily life rather than staged for visitors, and the rituals around it remain quietly intact.",
      "To soak in a centuries-old wooden bath as snow falls outside is to understand onsen culture as the Japanese do — not as a spa treatment, but as a seasonal, communal, and deeply ordinary kind of grace.",
    ],
  },
];

export const editorialPairs: Article[][] = [
  [
    {
      slug: "stillness-as-resistance",
      category: "philosophy",
      categoryLabel: "Philosophy",
      title: "On Stillness as Resistance: A Case for Doing Nothing",
      excerpt:
        "In a wellness industry increasingly obsessed with optimisation, the most radical act may be the simplest one — the deliberate practice of rest without purpose.",
      date: "Oct 2025",
      read: "7 min read",
      body: [
        "Much of modern wellness has quietly adopted the language of productivity — optimise, track, improve. Rest is permitted only insofar as it makes us more effective afterwards.",
        "Stillness without purpose pushes against that logic. To do nothing, deliberately and without guilt, is to reclaim a kind of time that resists being measured — and that may be exactly what restores us.",
      ],
    },
    {
      slug: "wellness-travel-2026-data-points",
      category: "field-notes",
      categoryLabel: "Field Notes",
      title:
        "Wellness Travel in 2026: Five Data Points That Will Shape the Year Ahead",
      excerpt:
        "From the US$1.2 trillion global wellness economy to the rise of solo female travel, the numbers behind the trends reshaping how we choose to heal.",
      date: "Oct 2025",
      read: "6 min read",
      body: [
        "The numbers tell a clear story: wellness travel is no longer a niche category but a defining force in how people choose to spend their time and money.",
        "Behind the headline figures are quieter shifts — solo travellers seeking community, shorter and more intentional stays, and a growing preference for venues that can demonstrate, rather than merely claim, their values.",
      ],
    },
  ],
  [
    {
      slug: "building-a-morning-practice",
      category: "living-well",
      categoryLabel: "Living Well",
      title: "Between Retreats: Building a Morning Practice That Lasts",
      excerpt:
        "The gap between retreat and reality doesn't have to feel like a loss. How to design a daily rhythm that honours what you've learned without requiring a mountaintop.",
      date: "Sep 2025",
      read: "6 min read",
      body: [
        "A morning practice does not need to be elaborate to be transformative. The difference between one that lasts and one that fades is usually scale: ten honest minutes beats an hour you will never repeat.",
        "The aim is to translate the spaciousness of a retreat into something portable — a small, dependable ritual that can survive a busy week and still feel like your own.",
      ],
    },
    {
      slug: "why-we-built-a-marketplace-that-shows-the-price",
      category: "inside-tgs",
      categoryLabel: "Inside The Sanctum",
      title: "Why We Built a Marketplace That Shows You the Price",
      excerpt:
        "An honest reflection on why pricing transparency became a founding principle — and what it means for venue owners, facilitators, and the people who trust us to guide their journey.",
      date: "Sep 2025",
      read: "8 min read",
      body: [
        "Pricing transparency was not a feature we added; it was a principle we started from. Too much of the retreat world hides its costs until a guest is already emotionally committed.",
        "Showing the price is a small act of respect. It trusts people to make their own decisions, and it holds venues to a standard of clarity that, in our experience, the best of them welcome.",
      ],
    },
  ],
];

export const allArticles: Article[] = [
  featuredArticle,
  ...gridArticles,
  ...editorialPairs.flat(),
];

export function getArticleBySlug(slug: string): Article | undefined {
  return allArticles.find((article) => article.slug === slug);
}
