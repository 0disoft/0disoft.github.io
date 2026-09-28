---
{
  "title": "Andy Cloke Built Data Fetcher by Selling Airtable Data Connections as a Subscription",
  "summary": "How Andy Cloke turned the recurring chore of pulling outside API data into Airtable into the Data Fetcher extension, funded it with the $55,000 sale of his earlier TikTok directory Influence Grid, grew it to $20,000 in monthly recurring revenue by September 2023 and $23,000 by 2024, and kept running it as a one-person business tied to Airtable's marketplace."
}
---

## Turning an Airtable Data Connection Problem into a Subscription Business

Andy Cloke's Data Fetcher is an extension app that pulls API data from outside services into Airtable. An Indie Bites interview published on September 28, 2023 introduced it as a business that had reached $20,000 in monthly recurring revenue (MRR). It solved the friction Airtable users felt when collecting and refreshing data, and grew into a subscription business an independent developer could run.

## From Early Projects to the Airtable Idea

Cloke studied engineering at Oxford, then taught himself programming and worked as a developer at startups in London. Early on he built a Spanish learning site and a football quiz app, but the experience of acquiring free users did not turn into stable income. Going through several projects taught him about the difficulty of user retention and monetization as well as development.

The first product to earn meaningful revenue was Influence Grid, a directory service for finding TikTok influencers. He grew it to about $3,000 in MRR and then sold it for $55,000 in mid-2020. The sale proceeds became the funds that covered living costs and server bills while he developed his next product.

While looking for the next idea he conceived a newsletter covering IPO schedules. He tried to manage the content in Airtable, but it was hard to pull financial data such as stock prices into it easily. The friction he hit himself became the starting point for Data Fetcher.

The shape of the product took form from the API Connector for Google Sheets that he found on Product Hunt. Cloke used the approach of taking a tool whose demand was proven on a mature platform and providing it on another fast-growing platform. With Influence Grid he applied the business opportunity around Instagram to TikTok, and with Data Fetcher he implemented a Google Sheets API connection tool adapted to Airtable.

Even then it was possible to connect outside data using Zapier or Integromat. The difference Cloke focused on was the convenience of setting up and running API requests without leaving Airtable. He built a feature that mapped each item of the API response to Airtable's record and field formats, so imported data could go straight into the table being worked on.

## Building, Pricing, and Launching on the Airtable Marketplace

Actual demand was not limited to one industry. Customers pulled stock prices, exchange rates, cryptocurrency prices, and marketing metrics, and one case connected a vineyard's customer management system. At the time of a 2022 interview, the applications users had connected numbered more than 1,000. It was a structure where a single general-purpose connection tool absorbed many small business needs at once.

For the early development he used his existing React experience. The first version implemented the core API connection feature first, and the marketplace review took longer than the development. Because updates also needed approval, he put care into testing and help documentation before launch. For a business that enters a platform, even the pace of deployment was affected by outside procedures.

The early free plan offered 100 runs a month, and paid plans started at $12 a month. He bundled larger run volumes and scheduled runs as paid features, charging for recurring data refreshes. At the time the Airtable marketplace had no payment feature, so subscriptions were handled through a separate website and Stripe.

On November 12, 2020 he announced the launch on the Airtable marketplace, and on November 15 he shared news of the first paid conversion. By the time he launched on Product Hunt on December 15 of the same year, he had recorded more than 300 users, 10 paying customers, and more than 5,000 cumulative API requests. He confirmed real usage in the marketplace, improved the product, and then widened exposure to a broader developer community.

Early growth was slow. When MRR stalled at about $600, Cloke went back to freelance work and developed the product at night and on weekends. In June 2021, when it reached about $2,500, he adjusted his freelance schedule flexibly, and at the end of the year he finished his remaining contracts and moved to full-time.

## Growing Through the Marketplace and Content

The center of customer acquisition was the Airtable marketplace. In a 2022 interview Cloke explained that about 70 to 80% of customers discovered the product there. He strengthened the feature description and customer reviews on the listing page and added Google login to reduce friction in the signup process. He also said the conversion rate from free trial to paying customer was about 10% at the time.

Outside the marketplace he made blog and YouTube content explaining customers' specific tasks. He chose topics whose problem was clear, such as how to pull stock prices or Google Maps data into Airtable. Cloke disclosed a case where a video with about 1,000 views brought in more than 30 paying customers, showing that even a small view count can reach users with high purchase intent.

The product also widened its use from the early customer base who understood APIs to non-developers. He provided pre-built connections for commonly used services, while technically knowledgeable users could work with REST and GraphQL APIs directly through Custom requests. Basic connections were easy to start, yet the flexibility remained to connect services not on the prepared list.

In a March 2022 interview he disclosed 190 paying customers and $6,500 in MRR, and in September of the same year he announced reaching $10,000 in MRR. At the time in March, server and business tool costs were about $500 a month, and Cloke described the profit margin excluding his own salary as about 90%. This figure had not yet deducted the founder's own labor, and that point must be included to understand the business's profitability accurately.

As operations accumulated, handling unusual data also became an important asset. He had to fix problems real customers brought in, such as large response files or irregular CSV formats, and failed scheduled runs sometimes led to cancellations. Cloke saw this accumulated error-handling experience as a part competitors could not easily copy.

## Plateaus, a Failed Second Product, and Platform Dependency

Even after reaching $20,000 in MRR, growth stalls came. Cloke said that from August 2023 new subscriptions and cancellations offset each other for about five months and churn stayed at 10 to 11%. In December he applied a 50% discount to annual plans and changed the default choice on the pricing page to annual billing. He reported that churn then fell to 7% and MRR rose again.

In a follow-up interview in 2024 he disclosed $23,000 in MRR. The only full-time operator was Cloke, but he used part-time collaborators for video production and development. He kept the operation small while outsourcing the specialist work he needed.

Attempts to sell other products to existing customers saw little success. Charts & Reports, an Airtable visualization extension app launched under the same brand, stayed at $300 in MRR for about a year. Cloke judged it a second product released too early and a distraction of focus.

Platform dependency also emerged as a real risk. Cloke explained that after Airtable excluded extension apps from its free plan and changed its pricing policy, Data Fetcher's new signups fell. He also had to respond to changes in Airtable API limits. The platform that supplied customers also determined customer access and the product's operating conditions.

The business significance of Data Fetcher lies in focusing on a small friction that people who had already chosen a work tool experienced repeatedly. It built a flow of meeting customers in the marketplace, creating additional traffic with specific how-to content, and charging continuously for data refreshes. This case shows that a narrow feature inside a platform can become an independent business, while also revealing the importance of the operational capacity to keep connections stable and usage recurring.
