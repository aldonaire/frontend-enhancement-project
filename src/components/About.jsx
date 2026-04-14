import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const philosophyItems = [
  { kanji: '旅', romaji: 'Tabi', meaning: 'Journey' },
  { kanji: '道', romaji: 'Michi', meaning: 'The Way' },
  { kanji: '美', romaji: 'Bi', meaning: 'Beauty' },
  { kanji: '静', romaji: 'Shizuka', meaning: 'Stillness' },
  { kanji: '縁', romaji: 'En', meaning: 'Fate / Connection' },
]

const stats = [
  { number: '47', label: 'Prefectures covered' },
  { number: '2,000+', label: 'Sacred shrines' },
  { number: '4', label: 'Distinct seasons' },
  { number: '1,200+', label: 'Years of history' },
]

const journalPosts = [
  { tag: 'Kyoto', title: 'The last geisha district you haven\'t heard of', read: '4 min' },
  { tag: 'Hokkaido', title: 'Powder snow and onsen: a winter itinerary', read: '6 min' },
  { tag: 'Tokyo', title: 'Eating through Golden Gai at midnight', read: '3 min' },
]

export default function About() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 })

  return (
    <section id="about" className="about-section" ref={sectionRef}>

      <motion.div
        className="about-chapter"
        initial={{ opacity: 0, x: -30 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <span className="about-chapter__number">01</span>
        <span className="about-chapter__label">About Torii</span>
      </motion.div>

      <motion.div
        className="about-headline-row"
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <h2 className="about-headline">
          Japan doesn't just<br />
          <em className="about-headline__em">reveal itself</em> — it<br />
          unfolds.
        </h2>
        <div className="about-headline-aside">
          <p className="about-headline-aside__body">
            Torii was born from a single belief: that Japan is not a destination — 
            it's a conversation between the ancient and the electric. Between moss-covered 
            stone steps and neon-soaked alleyways. We exist to help you hear both.
          </p>
          <div className="about-divider" />
          <p className="about-headline-aside__sub">
            From Hokkaido's powder snow to Okinawa's coral reefs, we curate 
            experiences that leave a mark long after the journey ends.
          </p>
        </div>
      </motion.div>

      <motion.div
        className="about-marquee-wrapper"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <div className="about-marquee">
          <div className="about-marquee__track">
            {[...philosophyItems, ...philosophyItems, ...philosophyItems].map((item, i) => (
              <span key={i} className="about-marquee__item">
                <span className="about-marquee__kanji">{item.kanji}</span>
                <span className="about-marquee__romaji">{item.romaji}</span>
                <span className="about-marquee__meaning">{item.meaning}</span>
                <span className="about-marquee__dot">·</span>
              </span>
            ))}
          </div>
        </div>
      </motion.div>

      <div className="about-stats">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            className="about-stat"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 + i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <span className="about-stat__number">{stat.number}</span>
            <span className="about-stat__label">{stat.label}</span>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="about-journal"
        initial={{ opacity: 0, y: 24 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.75, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <div className="about-journal__header">
          <span className="about-journal__eyebrow">From the Journal</span>
          <a href="#journal" className="about-journal__cta">Read all stories →</a>
        </div>
        <div className="about-journal__grid">
          {journalPosts.map((post, i) => (
            <a key={i} href="#journal" className="about-journal__card">
              <span className="about-journal__tag">{post.tag}</span>
              <p className="about-journal__title">{post.title}</p>
              <span className="about-journal__read">{post.read} read</span>
            </a>
          ))}
        </div>
      </motion.div>

      <motion.div
        className="about-closing"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <span className="about-closing__line" />
        <p className="about-closing__text">
          "We believe the best journeys are the ones that change 
          what you thought you knew about yourself."
        </p>
        <span className="about-closing__attr">— The Torii Philosophy</span>
      </motion.div>

    </section>
  )
}