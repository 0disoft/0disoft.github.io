---
{
  "title": "Jack Ellis Turned a Web Analytics Service and a Developer Course into a Business",
  "summary": "How Jack Ellis joined Fathom Analytics as technical co-founder and turned his operating experience into the Serverless Laravel course. It separates the analytics service's subscription revenue from the course's cumulative sales, and covers the co-founder buyout and the technical rebuild."
}
---

Jack Ellis is a co-founder of Fathom Analytics, a privacy-focused web analytics service, and the creator of Serverless Laravel, a developer course. At Fathom he provides analytics to website operators, and in the course he taught developers how to deploy and scale an application. The two businesses are connected by the same technical experience, but their customers, their pricing, and their revenue records have to be read separately.

## From a Failed Solo Product to Co-Founding

Ellis, who is from the United Kingdom, learned web development starting with PHP at the age of thirteen. He wanted to build his own business even after he started working, and in 2013, at twenty, he quit his job and began developing Raw Gains, a bodybuilding and coaching app. He built the service alone, managing diet nutrients and workout plans and letting clients share information with a coach, and planned to earn money from usage fees and affiliate sales.

The problem lay in the order in which he ran the business, not in his development ability. He got stuck on detailed design and spent more than a year before showing the product to anyone. He expected people to come once he launched, but he had no real strategy for gathering customers, and he later said he should have released the core feature in a small form and checked the reaction.

The starting point of Fathom was not Ellis but an idea from Paul Jarvis. In April 2018 Jarvis showed screens of a simple, reliable web analytics tool, then built an open source version and a paid hosted version together with Danny van Kooten. When Danny stepped back to focus on other work, the service's survival became uncertain, and Ellis joined as technical co-founder in early 2019.

Ellis and Jarvis were also developing Pico, a publishing platform, at the time. But they decided to focus on Fathom, which already had paying customers, rather than a new project with a waiting list and no revenue.

The collaboration became the moment that filled in what Ellis lacked on his own. Jarvis was strong at design and marketing, and Ellis was strong at software development and infrastructure operations. Ellis, who had treated co-founding as a loss of control and income, admitted that looking back at the Raw Gains failure, that belief had held him back for a long time.

## Software That Sells Privacy and Operating Convenience

Fathom is a product that shows website operators the statistics they need, such as visitors, pageviews, and referral sources, in a concise form. Rather than endlessly adding features, it made an easy-to-understand screen and privacy protection its differentiators. Even when reviewing customer feature requests, the company used fit with the product's simplicity and privacy principles as an important criterion.

Not using cookies does not mean processing no information, though. Fathom says it calculates a per-site visitor identifier that changes daily using the IP address and browser information, and that it does not store the original IP in a separate field in ordinary analytics records. It is a design that limits long-term tracking of visitors while still providing the statistics website operations need.

The revenue model is not selling user data but charging website operators a fee for the software. On the pricing page checked on October 1, 2026, the tier of 100,000 pageviews a month costs $15 a month, 50 sites are included by default, and additional sites can be purchased separately. The company stresses that it is an independent business that runs on customer payments without outside investment.

The value of the paid product is not explained by the statistics screen alone. If customers run an open source analytics tool themselves, they have to take on server installation, database management, security checks, and failure response. Fathom handles that work instead, so it could be a paid service that saves time even for developers capable of installing it themselves.

## Rebuilding the Technology and Acquiring Customers

The first thing Ellis touched after joining was the existing technical structure. The early Fathom was written in Go, but he rebuilt the paid product, Fathom Pro, with Laravel, a PHP framework he knew well. This was a decision to pick technology he could improve quickly and operate responsibly with, rather than treating a new language itself as a competitive advantage.

The infrastructure transition was not a single step either. First he moved from a structure centered on dedicated servers to Heroku, where automatic scaling was possible, and separated the API, data collection, and billing so each could scale on its own. Later he adopted Laravel Vapor and moved to serverless operations on AWS, and the experience he accumulated along the way became the material for the course later.

In acquiring the first customers, the newsletter readers and Twitter followers Jarvis already had played an important role. Releasing the source and launching on Product Hunt drew attention too, but the founders explained that awareness and customer numbers accumulated steadily rather than exploding from one particular event. So reading Fathom as a case of succeeding by building a product alone, without an existing audience or distribution channel, misses the starting conditions.

As the service grew, content that disclosed real operating experience became important. Technical writing such as the story of the DDoS attack, and the Above Board podcast about running a business, put what a reader could learn ahead of product advertising. Adding other channels such as an affiliate program on top, they tried to build a product brand that did not depend only on the founders' personal fame.

## Turning Operating Experience into a Developer Course

Demand for Serverless Laravel appeared as Ellis published Fathom's technical problems and how he solved them. As questions and emails from developers arrived, he decided to turn his operating experience into a structured educational product.

The audience for the course was closer to developers who wanted to run a Laravel application as a real service than to someone learning PHP syntax for the first time. The platform it uses, Laravel Vapor, is a serverless deployment service on AWS, and the product Ellis made is a course that teaches how to use that platform. The material covered not only deployment but also initial response latency, database scaling, preventing duplicate job runs, failure response, and cost management.

Promotional material that ran in Laravel News in May 2021 introduced 49 lessons at a price of $249. Buyers also received a private Slack community, future additional material, and lifetime updates. Unlike Fathom, which provides an analytics service every month, this was an educational product that packaged expertise and sold it.

While preparing the sale, he built a waiting list and published short technical tips and the production process. He continued promoting after launch and did not consider the sales finished after a single announcement. The order was different from Raw Gains, where he had looked for users only after finishing the product.

In an Indie Bites interview published on October 28, 2021, Ellis said the course had produced $150,000 in cumulative revenue since its launch in March 2020. That amount is not Fathom's monthly or annual recurring revenue, nor is it the course's monthly revenue. It was not presented as net profit after costs and taxes, and it is a figure the founder disclosed himself in the interview.

Ellis explained that the course income helped him reduce consulting work and focus on Fathom. While Fathom could not immediately replace his existing consulting income, revenue from a separate product cushioned the income gap during the transition.

## Ownership and Growth After Co-Founding

There was an important change in Fathom's ownership structure in 2024. Ellis bought out the stake of Jarvis, who wanted to retire, and from December 1, 2024, Ellis owned and controlled the company entirely. The title of the post published the next day was news of a company acquisition, but it was not a sale to an outside company. It was a transaction that settled ownership between co-founders, and the price was not disclosed. Jarvis agreed to keep helping with design as a part-time freelancer afterward.

In 2026 Fathom moved in the other direction and acquired another analytics service. On April 15 it acquired Gauges, a real-time web analytics service, and migration inquiries from customers whose service was about to shut down became the trigger for the deal. An update on August 21 said the customers and historical data had been migrated to Fathom, so a growth method of taking over an existing customer base, not just recruiting new signups, has been added to the mix.

The technical structure did not stay where the earlier course left it either. In a post published in July 2026, Ellis described migrating more than 65 billion data records and separating analytics data into ClickHouse and transaction and operational data into PlanetScale. This is closer to a case of changing the structure he had built as the business scale and requirements changed than a case of sticking with one technology.

The point of Ellis's case is not the formula that attaching a course to software automatically increases revenue. Fathom sold the convenience of running an analytics system on the customer's behalf, and Serverless Laravel sold knowledge that helps developers solve similar operating problems. The reason to look at the two businesses together is that the same expertise can become separate products depending on whose burden it reduces and which burden it reduces.
