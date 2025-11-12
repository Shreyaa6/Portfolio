import React, { useEffect, useMemo, useState } from 'react'
import './home.css'
import pic from './assets/pic.jpeg'

const LETTER_STEP_MS = 120
const HOLD_DURATION_MS = 1500

function Home() {
  const roles = useMemo(
    () => [
      'Web Developer',
      // 'Enthusiast',
      'Photographer',
      'Creative Thinker',
      'Fast Learner',
      'Freelancer',
    ],
    [],
  )

  const [roleIndex, setRoleIndex] = useState(0)
  const [displayedRole, setDisplayedRole] = useState('')

  useEffect(() => {
    const role = roles[roleIndex]
    const timers = []

    setDisplayedRole('')

    role.split('').forEach((_, index) => {
      timers.push(
        setTimeout(() => {
          setDisplayedRole(role.slice(0, index + 1))
        }, index * LETTER_STEP_MS),
      )
    })

    timers.push(
      setTimeout(() => {
        setRoleIndex((prev) => (prev + 1) % roles.length)
      }, role.length * LETTER_STEP_MS + HOLD_DURATION_MS),
    )

    return () => {
      timers.forEach((timerId) => clearTimeout(timerId))
    }
  }, [roleIndex, roles])

  return (
    <main className="home-container">
      <nav className="home-nav" aria-label="Primary">
        <a href="#about" className="home-nav__link">About me</a>
        <a href="#tech" className="home-nav__link">Tech stacks</a>
        <a href="#projects" className="home-nav__link">Projects</a>
        <a href="#contact" className="home-nav__link">Contact me</a>
      </nav>
      <div className="home-left">
        <div className="home-title-row">
          <h1 className="home-title">
            <span className="first-name">Shreya</span>
            <br />
            <span className="last-name">Narayani</span>
          </h1>
          <span className="home-title-line" aria-hidden="true" />
        </div>
      </div>
      <div className="home-greeting">
        Hello I am<br />
        <span className="greeting-name">Shreya!</span>
      </div>
      <div className="home-roles">
        <span className="home-roles__label">I am</span>
        <span className="home-roles__text" aria-live="polite">
          {displayedRole}
          <span className="home-roles__cursor" aria-hidden="true" />
        </span>
        <span className="visually-hidden">
          I am {roles[roleIndex]}.
        </span>
      </div>
      <div className="home-social">
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="home-social__link" aria-label="LinkedIn">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
          </svg>
        </a>
        <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="home-social__link" aria-label="GitHub">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
        </a>
        <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="home-social__link" aria-label="X (Twitter)">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M18.243 3H21l-6.41 7.332L21 21h-5.936l-3.88-5.18L7.7 21H3.942l6.852-7.829L3.3 3h6.063l3.489 4.741L18.243 3zm-2.09 15.6h1.106L7.918 4.279H6.72l9.433 14.321z"/>
          </svg>
        </a>
        <a href="https://leetcode.com" target="_blank" rel="noopener noreferrer" className="home-social__link" aria-label="LeetCode">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M16.102 17.93l-2.697 2.607c-.466.467-1.111.662-1.823.662s-1.357-.195-1.824-.662L2.867 13.988c-.467-.467-.702-1.15-.702-1.863s.235-1.357.702-1.824l4.676-4.676c.467-.467 1.111-.702 1.824-.702s1.357.235 1.823.702L16.102 10.7c.467.467.702 1.111.702 1.824s-.235 1.357-.702 1.824l-1.8 1.837zm.799-2.786l2.982-2.982c.392-.392.392-1.023 0-1.414L12.622 4.257c-.392-.392-1.023-.392-1.414 0L4.257 11.336c-.392.392-.392 1.023 0 1.414l7.951 7.951c.392.392 1.023.392 1.414 0l5.277-5.277c.392-.392.392-1.023 0-1.414zm-5.277-5.277l-1.414 1.414-1.414-1.414 1.414-1.414 1.414 1.414zm-2.828 2.828l-1.414 1.414-1.414-1.414 1.414-1.414 1.414 1.414zm5.656 0l-1.414 1.414-1.414-1.414 1.414-1.414 1.414 1.414z"/>
          </svg>
        </a>
      </div>
      <figure className="home-right">
        <div className="home-arch">
          <img className="home-photo" src={pic} alt="Shreya portrait" />
        </div>
      </figure>
    </main>
  )
}

export default Home


