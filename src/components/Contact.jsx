import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'

const contactOptions = [
  { code: 'TYO', label: 'Tokyo', note: 'Main studio' },
  { code: 'KYO', label: 'Kyoto', note: 'Cultural desk' },
  { code: 'OSA', label: 'Osaka', note: 'Regional office' },
]

export default function Contact() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 })
  const [sent, setSent] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <section id="contact" className="contact-section" ref={sectionRef}>

      <motion.div
        className="contact-chapter"
        initial={{ opacity: 0, x: -30 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <span className="contact-chapter__label">Write to Us</span>
      </motion.div>

      <motion.div
        className="contact-headline-row"
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9, delay: 0.15 }}
      >
        <h2 className="contact-headline">
          Every great<br />
          journey begins<br />
          with a <em className="contact-headline__em">letter.</em>
        </h2>

        <div className="contact-form-side">
          {sent ? (
            <motion.div
              className="contact-sent"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="contact-sent__kanji">ありがとう</span>
              <p className="contact-sent__msg">Your message has been received.<br />We'll write back within 48 hours.</p>
            </motion.div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="contact-field">
                <label className="contact-label">Your name</label>
                <input className="contact-input" type="text" placeholder="e.g. Sakura Yamamoto" required />
              </div>
              <div className="contact-field">
                <label className="contact-label">Your email</label>
                <input className="contact-input" type="email" placeholder="you@example.com" required />
              </div>
              <div className="contact-field">
                <label className="contact-label">Your dream trip</label>
                <textarea className="contact-input contact-textarea" placeholder="Tell us where you want to go, how long, what matters most to you..." rows={4} />
              </div>
              <button type="submit" className="contact-submit">
                <span>Send your letter</span>
                <span className="contact-submit__arrow">→</span>
              </button>
            </form>
          )}
        </div>
      </motion.div>

      <motion.div
        className="contact-offices"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.5 }}
      >
        {contactOptions.map((office) => (
          <div key={office.code} className="contact-office">
            <span className="contact-office__code">{office.code}</span>
            <span className="contact-office__label">{office.label}</span>
            <span className="contact-office__note">{office.note}</span>
          </div>
        ))}
        <div className="contact-office contact-office--email">
          <span className="contact-office__code">✉</span>
          <span className="contact-office__label">hello@toriitravel.jp</span>
          <span className="contact-office__note">Always open</span>
        </div>
      </motion.div>

    </section>
  )
}