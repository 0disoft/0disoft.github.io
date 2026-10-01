---
{
  "title": "Uku Täht Turned a Simple Paid Web Analytics Tool into a Business",
  "summary": "How Uku Täht built Plausible and grew it with Marko Saric into a paid web analytics company. In a market with free competitors, they used usability and privacy as differentiators and connected content, subscriptions, and operations."
}
---

## In a Market with Free Analytics Tools, Building a Simpler Paid Product

Uku Täht is the founder who first built the web analytics service Plausible Analytics. He started the product alone in 2018, and in 2020 the marketing co-founder Marko Saric joined him; from there it grew into a small company funded by customers' subscriptions. This case is therefore both the success of a product built by one person and an example of two co-founders dividing development and marketing to expand the business.

## A Product That Started with Everyday Frustration

The starting point was an ordinary work request at his job. In December 2018, while working at Gigride, Uku was asked to install Google Analytics on a landing page, but he did not like its complicated use, its heavy script, or the way it tracked visitors. He looked for other products, but the alternatives available at the time did not sufficiently provide the information he needed, such as statistics by browser version. Rather than copy an existing product as it was, he decided to build the analytics tool he actually wanted to use.

At the center of Plausible is a dashboard that lets you understand a website's situation on a single screen. It reduced the need to build complicated reports or move through many menus to check information such as visitor numbers, traffic sources, and popular pages. It also developed the product in a direction that does not use cookies or persistent identifiers and does not track people individually across multiple sites or devices. Instead of collecting more data, its differentiator was letting operators get the information they needed with little effort.

Uku built a prototype over about two months and started a public beta in early 2019. In the launch post that April, he explained that more than 60 people had used the product and that feedback and feature requests had set the direction for future development. But he did not wait until every requested feature was finished. He judged that checking whether people were actually willing to pay mattered more than continuing to develop.

At launch in 2019, pricing was 6 dollars a month up to 10,000 pageviews, 12 dollars up to 100,000 pageviews, and 36 dollars up to 1 million pageviews. Early on, he did not divide features into tiers; billing followed traffic volume, and there was a low entry price so that personal sites could use it too. On the other hand, he did not create a permanent free cloud plan. This was because, while handling development and customer support alone, he judged it would be hard to bear the time and upkeep of continuing to support free users as well.

## What Changed When a Marketing Co-founder Joined

It did not grow quickly right after paid plans began. According to the company's growth retrospective, after receiving the first paying customer in May 2019, it took 324 days for monthly recurring revenue, or MRR, to reach about 400 dollars. At the time, some potential customers worried about whether the product would keep going, and Uku himself admitted he had not improved the homepage and his explanations to the outside enough compared with feature development. Work was needed to build trust and customer inflow, not just product features.

After reading Marko Saric's article on how to remove Google products from a website, Uku sent him an email first. Marko, who shared the product's direction, joined as co-founder on March 16, 2020. Uku focused on design and development, and Marko took on marketing, community management, and customer support. This was not hiring a marketer for an already well-known company; it was accepting a partner to grow the business together at a point when revenue was small and growth had stalled.

After he joined, they changed how they introduced the product. Instead of a vague "simple web analytics," they put forward the description "a simple, privacy-focused alternative to Google Analytics." They showed the actual dashboard large on the homepage, created comparison material against Google Analytics and Matomo, and also carried out a product overhaul that works without cookies. They explained what was different based on the product customers already knew, aligning the promotional wording with the actual features.

In April 2020, an article on why you should stop using Google Analytics drew attention on Hacker News. In the first week after overhauling the product and homepage, the site had more than 48,000 visitors and 166 new trial signups. Given that cumulative visitors over the previous roughly 15 months had been 27,300, this was a significant change. Trial signups were also more than the previous four months combined, and interest began to turn into actual product use.

That said, "grew without advertising" should not be taken to mean "did not go looking for customers." Marko contacted relevant media and people, proposed podcast appearances, and took part in conversations among people looking for analytics tools. In a July 2020 retrospective that collected these activities, the company said MRR grew from about 400 dollars to 2,750 dollars over 135 days. Instead of paid ads or affiliate fees, it was an approach that invested time in producing content and building relationships.

## Combining Public Code with Paid Operations

Plausible released its code under the MIT license in September 2019. It was a choice meant to let people verify which code a company promising privacy actually runs, and to let users control their own data more directly. Later, it offered both free software that you install on your own server and a paid cloud service in which the company handles server operation, updates, and maintenance. The core of the early revenue model was selling the convenience and responsibility of operations rather than access to the code.

It was far from a model that covered development costs with donations alone. According to a December 2020 retrospective, donations received over about half a year were six, at 5 dollars each, but at the same point the cloud service's MRR had passed 8,500 dollars. This experience became the company's basis for the view that open source sustainability needs not only voluntary support but a product that customers pay for because they feel clear value. It was a structure in which the paid service supported development, and the results of that development also reached users who installed it themselves.

Technically, the central tools Uku chose were Elixir and Phoenix. In a 2020 interview, he explained that at the time he had handled 60 million pageviews in the previous month and that he kept information about running visitor sessions in memory to reduce the burden of querying the database for every event. He also spoke highly of how using Elixir's capabilities let him handle some requirements without adding a separate in-memory store or message queue. It was a choice that considered both reducing the components required of people who install it themselves and simplifying service operation.

During growth, he also changed the analytics data processing structure. According to Uku's May 2020 development retrospective, after moving analytics data from PostgreSQL to ClickHouse, the load time of the main graph in the public demo dropped from the previous 5 to 6 seconds to about 500 milliseconds. This is not a general performance comparison of every feature but an improvement figure observed in his own service at the time. Including the fact that it became possible to take on larger sites, this work was a foundation improvement for expanding customers, not a mere technical preference.

## From Covering Living Costs to $1 Million in ARR

Operating without outside investment does not mean there were no initial costs. The two co-founders lived on personal savings without salaries for a while, and they said the savings that shrank while growing the business totaled more than 50,000 dollars. In September 2020 they paid themselves a salary from the company for the first time, but the salary then was lower than what they could earn at another job. Later, as MRR reached 10,000 dollars, they began covering costs and recovering the savings they had drawn down.

As customers increased, how to handle support work also became important. In a 2021 customer support retrospective, they described the experience of the two of them handling more than 4,000 subscribers and more than 1,000 trial signups a month. When the same question repeated, rather than adding people to answer from the start, they fixed the feature or the on-screen explanation, strengthened documentation, and made it easy for users to find the guidance they needed. It was an approach that handled customer inquiries while reducing the cause of the next inquiry.

That said, it was not that the two of them could keep running it on their own. Marko checked the inbox almost every day, including weekends, after joining, and he confided that it was hard for the two of them to fully rest from work at the same time. In 2021 they brought Robert on board so that technical customer inquiries and development could be shared. The need to secure rest and cover for work gaps, as well as the efficiency of a small team, was effectively what pushed the hire.

In 2022, a change at a competitor also became an opportunity. Google announced on March 16 that the standard properties of the existing Universal Analytics would stop processing new data from July 2023, and Plausible said interest in its product increased after that news. The company introduced a feature to import existing Google Analytics statistics in April of the same year. It was a response that not only told people looking for an alternative about the product but also reduced the switching burden of potentially losing their previous data.

The actual date ARR passed 1 million dollars was June 2, 2022, and the publication date of the official retrospective was June 22. At the time, MRR was 83,637 dollars, and the company said that with a team of four it had more than 7,000 paid subscribers. ARR is a metric that annualizes recurring revenue, so it does not mean that 1 million dollars in cash was already earned that year or that the amount was net profit. Nor should it be interpreted as Uku's personal income or wealth.

## After Growth, Adjusting the Boundaries of Openness and Business

Open source raised trust but also created a new burden. The company said it experienced cases where other companies took the code to build closed-source competing products or tried to resell it without contributing. So in October 2020 it changed the license from MIT to AGPL. It was a choice meant to reduce situations where other companies took only the development results while keeping development open.

In February 2024, it distinguished the version you install yourself as Plausible Community Edition, or Plausible CE. CE was kept as a free AGPL-based version, but some large-scale service operation features and advanced features of the time, such as funnel and e-commerce revenue analysis, were left on the official cloud side. So describing the business afterward as "a model where the paid and free editions offer exactly the same features" is inaccurate. The company combined the published core product with commercial features under separate terms and treated support for the free self-hosted environment as community-centered.

In the official introduction checked on October 1, 2026, the team size is given as 10 and paid subscribers as more than 21,000. In an April 2026 retrospective, it explained that after reaching 1 million dollars in ARR it grew that scale several times over about three years, but it did not present a new exact ARR figure. So there is not enough basis to treat the 1 million dollars of 2022 as current revenue or to calculate the latest revenue from subscriber numbers alone and assert it. What is clear is that an early one-person project became a company that keeps running through shared ownership and a growing team.

## How to Read This Case

In 2026 as well, Plausible explains that it runs on subscription revenue without outside investment so that it can decide the direction of the company and the product for itself. Rather than refusing growth, its position is to grow at a pace its revenue can support and to avoid being forced to expand unnecessarily just to maintain the organization. The lesson is to build a product that reduces a specific frustration and keep explaining its value, rather than try to beat free competitors on every feature. Uku's achievement lies less in doing everything alone than in putting in place a co-founder, a revenue model, and an operating structure so that the product he built could keep operating.
