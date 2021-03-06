import React from 'react'
import tw, { styled } from 'twin.macro'
import GitHubCalendar from 'react-github-calendar'
import { TwitterTimelineEmbed } from 'react-twitter-embed'
import { useWindowSize } from 'react-use'
import LazyLoad from 'react-lazyload'

import config from '../../../data/SiteConfig'
import style from '../../../data/styleConfig'
import Daylio from '../Daylio/index'
import { DaylioVariants } from '../Daylio/types'
import DaylioChart from '../Daylio/Chart'
import Paper from '../Shared/Paper'
import Reading from '../Reading'

const Section = styled(Paper.section)`
  ${tw`sm:mx-2 md:mx-2`}

  & h2 {
    ${tw`text-teal-500 italic`}
  }

  & .bookshelf {
    display: grid;
    align-items: center;
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    column-gap: 1vw;
    margin: 1vw;
    text-align: center;

    & img {
      min-width: 75px;
    }
  }

  &.introduction-hero {
    display: flex;
    flex-direction: row;

    & > .text-column {
      align-self: center;
      margin-right: 1em;
    }

    & > .headshot {
      width: 150px;
      height: 191px;
    }
  }

  &.listening {
    & > .listening-media {
      ${tw`flex flex-col sm:flex-row`}

      & > iframe {
        ${tw`mr-4 sm:mb-4`}
      }
    }
  }
`

const Home: React.FC = () => {
  const { width } = useWindowSize()
  const twitterTimelineHeight = width >= style.breakPoints.tabletPx ? 600 : 375

  return (
    <>
      <Section className="introduction-hero" fullWidth>
        <div className="text-column">
          <h2>Hello there!</h2>
          <p>
            <a
              href="https://hipsum.co/"
              title="A little bit of hipster ipsum while I figure out what to say"
            >
              I'm baby try-hard slow-carb dreamcatcher
            </a>
            , selfies affogato copper mug brunch trust fund green juice irony
            portland asymmetrical polaroid. You probably haven't heard of them
            selfies street art organic hammock, seitan sartorial lomo affogato.
            Enamel pin woke authentic godard shaman retro locavore leggings
            umami farm-to-table raclette jianbing banh mi. Af hexagon put a bird
            on it fashion axe butcher keffiyeh polaroid kombucha cliche irony.
            Listicle synth next level quinoa.
          </p>
        </div>
        <img
          src="/img/eli-gundry-headshot.jpg"
          alt="Eli Gundry's Headshot"
          className="headshot"
        />
      </Section>
      <Section className="feeling">
        <h2>Feeling</h2>
        <p className="summary">
          Recently, I decided to start journaling my feelings. Being a software
          engineer, I made an API out of it and put it on my website. You can
          read more about this project <a href="/blog/feelings-api">here</a>.
        </p>
        <Daylio variant={DaylioVariants.home} />
        <DaylioChart />
      </Section>
      <Section className="coding">
        <h2>Coding</h2>
        <p className="summary">
          I make a living developing web applications. I jump all around the
          stack and will do whatever it takes to ship. Need me to do some devops
          to get this feature out? I gotcha. Some CSS is making a button look
          bad? I'll do my best. A query running to slow? Stop, I can't deal with
          all this excitment.
        </p>
        <GitHubCalendar username="eligundry" dateFormat="yyyy-MM-dd" />
      </Section>
      <Section className="reading">
        <h2>Reading</h2>
        <p className="summary">
          I wish I read more, but there are only so many hours in the day. These
          are the books that I'm reading right now.
        </p>
        <div className="bookshelf">
          <Reading
            shelf="currently-reading"
            accountID={config.goodreads.userID}
          />
        </div>
      </Section>
      <Section className="triva">
        <h2>Trivia</h2>
        <ul>
          <li>
            Vim user but I actively encourage everyone to use something else.
            Using Vim in {new Date().getFullYear()} is a cool bar trick.
          </li>
          <li>
            Die hard Cleveland Browns fan and am convinced that we will win a
            Super Bowl one of these years.
          </li>
          <li>
            I currently live in Astoria, Queens. I didn't think I would settle
            down in Queens and love it as much as I do, but life is like that
            sometimes, I guess.
          </li>
          <li>
            I have a fat cat named Fonzie and I sorta have{' '}
            <a href="https://twitter.com/EliGundry/status/1055933062125703168">
              a tattoo of him on my arm
            </a>
            .
          </li>
        </ul>
      </Section>
      <Section className="listening">
        <h2>Listening</h2>
        <p className="summary">
          I listen to way too much music and I love to listen to full albums.
          Below is my current playlist of songs I have on repeat and the top
          albums I've listened to this week.
        </p>
        <div className="listening-media">
          <iframe
            title="Spotify playlist that I have on repeat"
            src="https://open.spotify.com/embed/playlist/1gD4BMDtHdnUnIDmxOCV5w"
            width="300"
            height="380"
            frameBorder="0"
            allowTransparency
            allow="encrypted-media"
          />
          <a href="https://www.last.fm/user/eli_pwnd">
            <img
              className="listening-img"
              src="https://www.tapmusic.net/collage.php?user=eli_pwnd&type=7day&size=3x3"
              alt="My top 9 albums for the past 7 days"
            />
          </a>
        </div>
      </Section>
      <Section className="tweets">
        <h2>Twitter</h2>
        <p className="summary">
          Twitter is my <del>vice</del> social network of choice. It's been
          instrumental in developing my career. I started following other
          developers years ago, read their blog posts, followed the people they
          retweeted, and stayed up to date with the latest technologies. It also
          has funny memes, which are equally important to keeping up to date
          with tech.
        </p>
        <LazyLoad height={twitterTimelineHeight}>
          <TwitterTimelineEmbed
            sourceType="profile"
            screenName={config.userTwitter}
            options={{ height: twitterTimelineHeight }}
          />
        </LazyLoad>
      </Section>
    </>
  )
}

export default Home
