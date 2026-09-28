---
{
  "title": "Valentin Hinov turned the office card into a business with Thankbox",
  "summary": "How Thankbox turned paper office cards into an online service for messages and gift collections, found paying customers through clearer positioning and online group card ads, handled gift-payment fraud and storage costs, lifted signup conversion and bundle sales, and grew into a family-run business with a per-card, bundle, and team pricing mix."
}
---

## Repeated Purchases of a Single Celebration Card

Valentin Hinov's Thankbox is an online card service that gathers messages from many people and collects a gift contribution, then delivers them together. In a June 2022 interview he said typical monthly sales were about $25,000. The service grew by selling a card each time an occasion came up, such as a birthday, a departure, or a retirement.

Hinov grew up in Bulgaria, studied game programming in Scotland, and then built games and mobile apps. In 2016 he built a social media app that recommended content with a cofounder, but the product was too large for two people to handle. They also lacked a monetization plan and burned through their money, and that experience led him to study businesses he could run at a small scale.

The idea for Thankbox came from an inconvenience he ran into repeatedly while working as a contract developer at various companies. To mark a colleague's birthday or departure, someone had to buy a paper card, walk around the office collecting signatures, and gather cash for a gift. People who were away found it hard to take part, and anyone without cash had to go withdraw some. In November 2019 he imagined a service that handled messages and contributions together online.

At first, contract work and other activities kept him from making progress. When remote work spread in March 2020, the paper-card routine left a gap, and Hinov hurried the launch. The first product, with a narrowed scope, was released two months later, in May 2020.

The early build involved designer Barbara and web developer Joe. Hinov paid for the design and struck a deal with Joe to share a year of revenue once the product reached a certain sales level, which reduced the upfront development cost. Hinov, who had little web development experience, learned from Joe and took over code management.

The initial technical setup was kept simple around Laravel, Vue, and MySQL. According to the development notes he published, the web application and database ran on a single $10-a-month DigitalOcean server. The criterion for choosing tools was whether he could build and fix features quickly, and he used existing tools for deployment and server management as well.

## Reducing the Effort for the Person Making the Card

The user flow centers on a single card. The organizer sets the recipient and a title and shares a link, and colleagues or friends add messages, photos, and GIFs. If needed, they also run a gift collection, and the finished card is either sent right away or scheduled for later. The organizer starts writing the card and pays when it is ready to send.

The initial prices were $5.99 for a standard card and $9.99 for a premium card, and in a 2023 interview he said those prices had stayed the same since launch. The number of people writing messages on one card was not limited, so there was no need to charge per participant. People preparing an occasional event bought card by card, while frequent customers bought several in prepaid bundles.

First-month sales were six, and cumulative revenue through the end of August 2020 was only $350. Even excluding his own labor, the service was losing more than $1,200 a month. He had to turn users' positive feedback into acquiring new customers.

Social media ads and LinkedIn promotion were tried but produced little. The team reworked the landing page so first-time visitors understood the purpose of the service quickly, and in October 2020 it attached ads to search terms like "online group card." Card creation, which had been around three or four a day, rose to more than thirty a day in November. Growth changed pace after the product description and the paths customers used to find it were changed together.

Thankbox turned profitable about eight months after launch, and 2021 annual revenue reached $140,000. About a year and a half after launch, he was able to pay himself more than his previous contract development work.

In 2022, 35 to 40 percent of monthly sales came from existing customers, and about 30 percent of new customers arrived through referrals. Someone who had joined a colleague's card became the buyer for the next occasion, so repeat purchases and introductions accumulated even with per-card sales.

Reliance on Google ads was also heavy. In 2022 ad spend was about $150 a day, his largest expense, and about five part-time external people handled design, development, customer support, and marketing. As sales grew, the costs of acquiring customers and running the service had to be managed as well.

## A Service That Must Manage Gift Funds and Storage Costs

The gift collection broadened the product's use but also brought payment risk. In June 2021, a fraud occurred in which money collected with a stolen credit card was withdrawn as a gift card. After spotting the suspicious transaction, Hinov paused gift-card payouts and refunded the suspicious transactions. The loss, including dispute fees, was about $3,000.

Afterward he set up a process to assess the risk of each collection and to approve or reject suspicious ones. He also strengthened blocking rules at the payment stage using Stripe Radar. The incident showed the responsibility of managing gift money from the moment it comes in to the moment it is paid out to the recipient. Behind the simplicity of selling a card lay operational work such as payouts, refunds, and fraud response.

Keeping a cheap single card for a long time also meant managing storage costs. Hinov first stored uploaded images on Cloudinary, but he found that keeping older images around pushed costs up. He then moved media older than 30 days to cheaper S3 storage. It was a design that reflected how viewing drops after a card is sent into the cost structure.

## Refining the Purchase Flow and Expanding to Organizational Customers

In a 2023 follow-up interview he reported average monthly sales of about $35,000. In a market with more competitors, he focused on expanding search traffic and improving the purchase flow. He set a long-term plan with an SEO specialist and increased content, and in the interview he said site traffic grew 200 percent over a year.

The signup flow was reworked too. In early 2023 he ran about ten comparison tests over six to eight weeks, and he said two of them helped lift signup conversion from 15 percent to 30 percent. They cut steps, turned part of the copy into images, and showed users right on the screen what their card would look like.

A similar change appeared in prepaid bundle sales. Previously customers had to follow a small prompt on the checkout screen to a separate pricing page, but the change let them choose and pay for a bundle right there. According to Hinov, bundle sales rose 180 percent in a month. It also nudged customers who already had a card for an upcoming event to return.

As the business grew, Hinov's own role changed. In a September 2024 post he wrote that time spent on ad budgets, customer support, marketing, and people management had cut his direct development time to around 20 percent. To recover his satisfaction with the work, he set aside at least four uninterrupted hours for development on Tuesdays and Fridays. He later brought development back to about 40 percent and balanced operations against building.

In the official description as of September 2026, Thankbox runs as a family business led by Hinov and his wife Tsvetelina Hinova. The published cumulative figures are more than 300,000 cards sent, more than 6 million messages, and more than 19 million pounds in gifts delivered. The gift amount here is the total customers collected and passed on, so it must be distinguished from service revenue.

The way it sells has broadened as well. The official pricing at the same point lists per-card purchases and prepaid bundles along with an unlimited team plan used by an entire organization. The setup lets everyone from an individual who sends a card occasionally to an organization managing events across several departments choose according to purchase frequency. It expanded from the early per-card sales to also accept demand at the organizational level.

Thankbox's viability can be read from how the low price of a single card met the recurring demand of organizations that handle many people's occasions. It kept the burden of a single purchase small and offered prepaid bundles and a team plan to customers who used it often. It is a case of widening the purchase options so that preparing one celebration can lead to the next order.
