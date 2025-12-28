export type AnswerType = 'myth' | 'fact'

export interface MythData {
  id: number
  statement: string
  correctAnswer: AnswerType
  explanation: {
    title: string
    facts: string[]
    whyItMatters?: string
    icon?: string
  }
}

export const MYTHS: MythData[] = [
  {
    id: 1,
    statement: "Mixing beer and vodka gets you drunker than just beer",
    correctAnswer: 'myth',
    explanation: {
      title: "Mixing drinks doesn't create chemical reactions",
      facts: [
        "The ONLY variable that matters is total ethanol consumed + rate of consumption",
        "Your liver processes all alcohol identically (1 drink/hour regardless of source)",
        "Mixing feels worse because sweet mixers mask alcohol taste → you drink more without realizing",
        "Dark liquors (whiskey, rum) have 40x more congeners than vodka/gin, causing worse hangovers"
      ],
      whyItMatters: "The danger: Easy to lose track of total alcohol consumed when mixing drinks",
      icon: "🍷"
    }
  },
  {
    id: 2,
    statement: "Alcohol warms up your body",
    correctAnswer: 'myth',
    explanation: {
      title: "Vasodilation = Surface warmth + Core heat loss",
      facts: [
        "Alcohol expands blood vessels → blood rushes to skin",
        "You FEEL warm but your internal temperature drops",
        "Alcohol blocks shivering (your body's natural heater)",
        "Result: Hypothermia without realizing it"
      ],
      whyItMatters: "Real-world impact: Homeless individuals in winter face increased hypothermia deaths. Drunk snowboarders experience severe frostbite because they don't feel cold.",
      icon: "🌡️"
    }
  },
  {
    id: 3,
    statement: "Drinking water doesn't prevent hangover",
    correctAnswer: 'fact',
    explanation: {
      title: "Hangovers are caused by alcohol's toxins, not fluid loss",
      facts: [
        "Your liver breaks down ethanol → acetaldehyde (toxic byproduct)",
        "Acetaldehyde damages cells → headache, nausea, fatigue",
        "Alcohol disrupts sleep quality (you 'sleep' but don't rest)",
        "B-vitamins depleted (needed for energy metabolism)"
      ],
      whyItMatters: "Study of 826 college students: water had minimal hangover relief. Dehydration and hangovers are separate effects of alcohol.",
      icon: "💧"
    }
  },
  {
    id: 4,
    statement: "Carbonation doesn't matter, only total alcohol",
    correctAnswer: 'myth',
    explanation: {
      title: "Fizz = Faster absorption",
      facts: [
        "CO2 bubbles increase pressure in your stomach",
        "Pressure forces alcohol through stomach lining faster",
        "Result: Peak BAC 10-15 minutes earlier than flat beverages",
        "University of Manchester study: 60-70% faster absorption with carbonation"
      ],
      whyItMatters: "Examples: Gin & tonic hits faster than straight gin. Champagne much faster than still wine (same ABV%). Beer (carbonated) faster than wine.",
      icon: "🥤"
    }
  },
  {
    id: 5,
    statement: "Gender doesn't affect how fast you get drunk",
    correctAnswer: 'myth',
    explanation: {
      title: "Women reach legal impairment faster",
      facts: [
        "Female bodies: 52% water vs Male bodies: 61% water",
        "Same alcohol = Higher concentration in female bodies",
        "Female (160 lbs): 3 drinks in 2 hours = 0.09% BAC (legally drunk)",
        "Male (160 lbs): 3 drinks in 2 hours = 0.06% BAC (not legally drunk)"
      ],
      whyItMatters: "Women can't drink 'the same' as men and stay safe. Age compounds this: Young females are most at-risk demographic for rapid impairment.",
      icon: "⚖️"
    }
  },
  {
    id: 6,
    statement: "Teen bodies process alcohol like adult bodies",
    correctAnswer: 'myth',
    explanation: {
      title: "Young teens get dangerously drunk much faster",
      facts: [
        "Adult liver fully developed",
        "Teen liver still developing (improves until age 25)",
        "Slower alcohol breakdown = alcohol stays in system longer",
        "15-year-old (120 lbs, female): 3 drinks in 2 hours = 0.24% BAC (4X adult level)"
      ],
      whyItMatters: "Same drinks. 4X the impairment level. Developing brain more vulnerable to alcohol damage. This is why teens black out where adults just feel drunk.",
      icon: "🧠"
    }
  },
  {
    id: 7,
    statement: "All alcohol causes the same hangover",
    correctAnswer: 'myth',
    explanation: {
      title: "Dark liquors = 40X more toxic byproducts",
      facts: [
        "Congeners = flavor + color compounds",
        "Dark liquors (whiskey, rum, brandy): High congeners",
        "Clear liquors (vodka, gin): Low congeners",
        "Bourbon drinkers (same BAC): 37% worse hangovers than vodka drinkers"
      ],
      whyItMatters: "Your body has to process both alcohol AND congeners. Premium whiskey looks sophisticated but hits harder next day.",
      icon: "🥃"
    }
  },
  {
    id: 8,
    statement: "Alcohol gives you energy",
    correctAnswer: 'myth',
    explanation: {
      title: "Alcohol is a CNS depressant disguised as stimulation",
      facts: [
        "Dopamine release: Feels good (but not energy)",
        "GABA increase: Feels relaxed (but you're slower)",
        "Disinhibition: Social anxiety gone = feels confident (but judgment impaired)",
        "Your reaction time: Slowed by ~200ms. Your balance: Impaired"
      ],
      whyItMatters: "Alcohol + energy drinks = WORST combination. Caffeine masks depressant effects. You feel 'energized' while critically impaired.",
      icon: "⚡"
    }
  }
]

export const TOTAL_MYTHS = MYTHS.length

