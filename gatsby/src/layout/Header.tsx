import React, { useState } from 'react'
import styled, { css } from 'styled-components'
import { useWindowSize } from 'react-use'

import style from '../../data/styleConfig'

const HeaderElm = styled.header`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  & h1 {
    margin: 0.25em 0;
  }
`

interface NavProps {
  mobile?: boolean
  expanded?: boolean
}

const Nav = styled.nav<NavProps>`
  align-self: center;

  & .nav-page-link {
    margin-right: 1em;
  }

  & > .hamburger {
    font-size: 2em;
    text-decoration: none;
  }

  @media print {
    display: none;
  }

  ${props =>
    props.mobile &&
    !props.expanded &&
    css`
      & .nav-links {
        display: none;
      }
    `}

  ${props =>
    props.mobile &&
    props.expanded &&
    css`
      position: fixed;
      z-index: 10000;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(255, 255, 255, 0.8);

      & > .hamburger {
        position: absolute;
        top: 1.5em;
        right: 1em;
      }

      & > .nav-links {
        height: 60%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
      }

      & .nav-page-link {
        font-size: 2em;
        margin-right: 0;
      }
    `}
`

const BetaBanner = styled.h6`
  margin-bottom: 0.25em;

  @media print {
    display: none;
  }
`

const navLinks = {
  '/': {
    title: 'Home',
    emoji: '🏠',
    emojiLabel: 'little house to denote the home page',
  },
  '/blog/': {
    title: 'Blog',
    emoji: '📝',
    emojiLabel: 'note to denote my blog',
  },
  '/feelings/': {
    title: 'Feelings',
    emoji: '🥺',
    emojiLabel: 'emotional looking emoji face to denote my feelings',
  },
  '/talks/': {
    title: 'Talks',
    emoji: '🗣',
    emojiLabel: 'silhouette of person speaking',
  },
  '/resume/': {
    title: 'Resume',
    emoji: '📄',
    emojiLabel: 'piece of paper representing my resume',
  },
}

const Header: React.FC = () => {
  const [hamburgerExpanded, setHamburgerExpanded] = useState(false)
  const { width } = useWindowSize()
  const showHamburger = width <= style.breakPoints.tabletPx

  return (
    <>
      <BetaBanner>
        <strong>Beta:</strong> I am developing this site in the open. Please
        excuse my mess while I figure out styles.
      </BetaBanner>
      <HeaderElm>
        <h1>
          <a href="/">Eli Gundry</a>
        </h1>
        <Nav
          role="navigation"
          expanded={hamburgerExpanded}
          mobile={showHamburger}
          onClick={() => hamburgerExpanded && setHamburgerExpanded(false)}
        >
          {showHamburger && (
            <a
              className="hamburger"
              href="#menu"
              aria-label={`${
                hamburgerExpanded ? 'close' : 'open'
              } the nav menu`}
              onClick={e => {
                e.preventDefault()
                setHamburgerExpanded(exp => !exp)
              }}
            >
              {hamburgerExpanded ? '🙅' : '🍔'}
            </a>
          )}
          <div className="nav-links">
            {Object.entries(navLinks).map(
              ([path, { title, emoji, emojiLabel }]) => (
                <a
                  href={path}
                  key={path}
                  onClick={() => setHamburgerExpanded(false)}
                  className="nav-page-link"
                >
                  <span role="img" aria-label={emojiLabel}>
                    {emoji}
                  </span>
                  {title}
                </a>
              )
            )}
          </div>
        </Nav>
      </HeaderElm>
    </>
  )
}

export default Header