---
{
  "title": "Wilhelm Klopp — Turning a small feature inside Slack into a business with Simple Poll",
  "summary": "The process of monetizing a free Slack polling app, supporting organizations’ recurring feedback collection and enterprise operating requirements, and growing it into a small-team business."
}
---

Simple Poll, created by Wilhelm Klopp, is an app for creating questions, collecting votes, and checking results inside Slack. The core of the product is that it lets employees respond directly in the channel where they normally converse, without moving to an external survey link. It is an example of developing simple feedback collection into a paid service that companies use repeatedly.

## The small inconvenience a college student discovered

While majoring in business administration at university, Klopp also spent time with computer science majors and built side projects. In the process of deciding something together on Slack, he felt the need for a polling feature, and this became the starting point for Simple Poll. According to his own development retrospective, he wrote the first code in late December 2015.

In the early days, there was also a motivation to get hired at Slack. He explained that he was attracted to how Slack was enterprise software yet smooth and easy to use like a consumer app. Simple Poll likewise aimed to be a product that was convenient not only for buyers but also for the employees who actually used it every day.

The way it works can be explained with a short command. For example, entering `/poll "When should we meet?" "Tuesday" "Wednesday"` creates a poll with a question and choices. You can also enter just `/poll` to open a settings window, so even people who are not familiar with commands can fill it out while looking at the screen.

An interview Slack published in 2021 described how early Simple Poll spread to hundreds of workspaces within days. In a 2024 DjangoCon talk, Klopp later presented as key lessons how to build a product on top of an existing platform and the importance of distribution channels. It was effectively entering a market where the place to discover and the place to use the product already existed.

## Monetizing a Free Project and Leaving GitHub

Simple Poll was initially a free project. While working at GitHub, Wilhelm Klopp began thinking about his financial options after Microsoft acquired GitHub, and he decided to monetize an app that already had users. According to a 2024 retrospective, about a year after he began charging, the business's revenue surpassed the salary he had been earning at GitHub.

He left GitHub in September 2019. He kept his job while running the product and confirming paid demand, and then shifted to focusing full time on Simple Poll.

The difficulty of running it alongside a job was a lack of development time. Klopp recalled that while employed he lacked the energy to work on weekdays, and even on weekends he spent much of his time on customer support. After introducing paid plans, finance and legal work were added as well.

Results immediately after the switch to full time also differed from expectations. He thought that devoting 40 hours to a business he had been spending about 10 hours or less per week on would greatly accelerate growth, but the month after quitting he experienced a revenue decline for the first time. In later recounting this experience, he emphasized that what you focus on matters more than the number of hours you put in.

An October 24, 2020 Indie Bites interview introduction stated that Simple Poll was supporting the full-time livelihoods of Klopp and a small team. What began as a free tool had become a business covering the founder's personal living costs and team operations. The introduction did not disclose specific monthly recurring revenue (MRR) or net profit figures.

## From Lunch Menu Polls to Regular Organizational Feedback

An early representative use case was lightweight team decision-making, such as “Where should we eat lunch today?” As remote work spread, the range of uses expanded to recurring tasks such as checking who planned to come into the office or running team status checks. In a 2021 interview, Klopp described an example in which a poll asking whether people would be in the office was automatically posted every day at 7 a.m.

Users also asked for longer questions and private feedback, and Simple Surveys was developed in response. According to descriptions at the time, it could send surveys to specified employees, only the creator could view the results, and it supported anonymous responses and free-form text, among other features. The product expanded from one-off polls to collecting opinions within organizations.

## A Structure Separating Free Use from Organizational Billing

The pricing plans were also reorganized to match product expansion. The company introduced the Premium plan in 2021, and from January 2024 it transitioned previous plans such as Manager, Director, and Small Business to Premium at renewal. The official notice cited the growing difficulty of continuing to support new features for each legacy plan as the reason for the change.

In the official pricing table checked on October 4, 2026, the free plan provides 100 responses per month. Polls can be created without a limit on the number, but each poll can have up to 5 options, and basic features such as anonymous polls and voting for multiple options are also included. An important criterion separating free from paid is the volume of responses actually collected rather than the number of polls created.

Premium applies to the entire workspace, and pricing varies by member-count tier. For the 1–24 member tier, annual billing is shown as a monthly equivalent of 49 USD and an annual charge of 588 USD. This plan includes unlimited responses, recurring and scheduled polls, surveys with up to 20 questions, result exports, and API access.

Under this pricing structure, the more often a team gathers opinions, the greater the need to upgrade becomes. For example, if 20 people each respond to 5 questions, they use up the free allowance of 100 responses. A single payment lets all workspace members use paid features, aligning the billing unit with the organization.

## The enterprise operations needed behind a small screen

The technical stack Wilhelm Klopp disclosed in 2020 was Django and PostgreSQL. Klopp explained that it had to distinguish among users and app installation information, access tokens, and poll data across multiple workspaces, and even handle Slack Enterprise Grid, which connects multiple workspaces at large enterprises. A foundation for accurately handling organization-specific data and permissions was needed.

In enterprise adoption, administrators and security were also important. Klopp cited the small amount of data needed early on as a success factor, and advised collaborating so that Slack administrators could help employees use it. It was an approach aimed at providing both a convenient experience for employees and an explainable scope of data access for administrators.

The current official security page states ISO 27001 certification, external penetration testing, encryption at rest and in transit, and login through Slack accounts. The Enterprise plan adds organization-wide deployment, security reviews, dedicated customer support, and enterprise purchasing processes such as purchase orders and invoice payments. The product thus includes operational requirements that allow companies to continue adopting and maintaining it.

Platform dependence is a major constraint on this business. Structurally, the business must respond to changes in Slack's features, permissions, and distribution policies, and the path for delivering the product to customers is also tied to Slack. In a 2020 Indie Bites interview, the risk of building a business on another platform was also discussed as a separate topic.

## Building a team and moving on to the next product

In the introduction to a 2024 DjangoCon Europe talk, Simple Poll was described as a SaaS company run by a seven-person team. What began as a personal project in the early startup days became a team business in which multiple people handled development and operations as it grew.

In an interview published in May 2024, Wilhelm Klopp said he had handed day-to-day operations of Simple Poll to a new CEO and was focusing full time on Kolo. Kolo was a tool he began building while developing Simple Poll to improve his own development experience. The frustrations he discovered while running his first product became the starting point for the next product.

The strategy that can be read from Simple Poll is to enter with a small feature into a work environment where users are already gathered, and to monetize the parts needed for repeated use and organizational operations. Through this, Klopp turned a personal project into his profession, and later had a team to take over operations, securing time to build the next product.
