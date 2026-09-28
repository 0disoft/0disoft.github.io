---
{
  "title": "Adrian Horning Turned Scraping Code into the Scrape Creators API and Passed $10,000 a Month",
  "summary": "How Adrian Horning reused collection code from earlier experiments to build the Scrape Creators social media data API, sold it through usage credits, found customers himself, and passed $10,000 in monthly revenue about a year after committing to the business."
}
---

## Selling Social Media Data Collection as a Developer API

Adrian Horning built Scrape Creators, a developer API that collects social media data. After committing to the business in earnest in June 2024, he said in an Indie Hackers interview published on July 31, 2025 that monthly revenue had passed $10,000 in about a year.

## Learning the Skills and Preparing to Go Independent

He studied psychology at university. An encounter with Uber during an internship drew his interest to the tech industry, and he moved to San Francisco to attend a coding bootcamp. While there he worked at Lyft and delivered food by bicycle to cover living costs, and later worked as a software engineer in Utah for about three years.

When he left his job in 2022 he had $30,000 in the bank and one small app was bringing in $500 a month. Even so, he came close to running out of money several times after going independent, and he got by on freelance work and sales of a scraping course. Until a product could cover his living costs, outside income bought him time to build.

One early experiment was Auto Apply, which found recruiters on LinkedIn and sent them emails. It relied on Puppeteer to drive a browser, and he struggled with frequent blocks and unreliable collection.

The technical turning point came at his friend Jake's request. Asked to send a text when Lululemon items his friend's wife wanted came back in stock, he started examining the APIs the website called internally. He learned to find data requests in the browser's developer tools and receive JSON responses directly, and he later applied that experience to freelance work and his course as well.

## Packaging Existing Code into a Sellable API

Another company's sale listing shaped how he set up the business. A follower sent him a social media scraping API business listed on MicroAcquire, and he confirmed that a market already paid for similar features. He concluded that he could package the collection features he had built across several projects and sell them.

At first he ran a TikTok creator database and the scraping API side by side for about six months. The creator database carried heavy maintenance costs and operational burden, while the API showed a clearer chance of earning money. He wound down the database business and chose to focus on the API.

Scrape Creators' basic function is to collect public profiles, posts, comments, video information, and the like and return them as JSON. Customers connect that data to their own programs, while the service operator manages the collection method for each platform and the response to failures. Transcripts of YouTube and TikTok videos and ad library data were also part of the important product range.

The customer base includes developers building social media analytics tools, marketing agencies, researchers, and content creators. An agency might compare competitors' ads, for example, and a developer might build a dashboard that gathers figures from several platforms. Video transcripts are used to rework content or build a searchable library.

Actual usage revealed the nature of the demand as well. In figures Horning published in September 2025, Instagram profile lookups reached 4.31 million and TikTok video transcript requests 3.82 million. The data showed that both checking an account's size and basic information and analyzing video content were major uses.

## Credits Priced to Match Usage

Payment works by buying credits in advance, as many as needed, and spending them on API calls. The interview used the term MRR, but the figure needs to be read as monthly revenue from a usage-based credit product. That income behaves differently from a subscription that charges the same amount each month, and repeat purchases by customers who keep collecting data become the important driver.

The official price list checked in September 2026 offers one-time purchases of 25,000 credits for $47 and 500,000 credits for $497. Most features spend one credit per call, while some require more. New users can test the response data and how the service works with 100 free credits.

## Going to Customers Directly and Focusing on One Product

His first customer came from technical content. When Horning posted on Twitter how to scrape a certain company's website, that company's CTO responded and asked about his API. A post that demonstrated the work itself proved his technical ability and led to a real sale.

After that he looked for products that seemed to need social media data and reached out himself. Seeing another founder's promotional video or post, he offered 10,000 free credits to try the API, and he won customers that way. He sent the messages himself and did not rely on automated bulk outreach.

He named X direct messages and Google search as his main acquisition channels. The reputation he built with free content helped, but this was not an operation that tracked performance precisely by channel.

He also built a free tool to demonstrate the product. The YouTube Comment Analyzer he published on LinkedIn analyzes comments once a video URL is entered, using his own YouTube comment collection API. It was an example that let users see for themselves what results the API made possible.

The important change in growth came after he cut the time he was spending on other work. Having juggled several projects and freelance jobs, he focused on Scrape Creators, and after a few hard months the business was covering most of his living costs by March 2025. That summer monthly revenue passed $10,000.

Customer responsiveness was the competitive approach he emphasized. A customer, Gil Hildebrand, said in a comment on the interview that Horning answers almost instantly and provides the features he needs. Horning likewise explained that in the API business, a founder who is easy to reach and quick support become the competitive edge.

## A Small Infrastructure Business That Includes Maintenance

According to a technical write-up published in September 2025, the core server used Node.js and Express, with Redis handling credit state and caching. Where possible the work is done with direct HTTP requests, and browser execution is limited to cases that need it, such as certain TikTok Shop features. In effect he prioritized a simple setup he could trace and fix on his own.

The heaviest operational burden was proxy quality and the reliability of collection on each platform. He switched proxy providers to reduce reliability problems and described an operation that watches success rates, response times, and error patterns by feature. Even a service that looks like a single simple call to the customer carries ongoing maintenance costs.

The risk of depending on outside platforms remains. Scrape Creators' terms of service state that features may stop working because an external site changes or blocks automated access, and they place responsibility on the user for complying with the target site's terms and with privacy laws. Even when you buy an API that supplies public data, you still need to review the conditions for collecting and using it.

Work to widen access continued. In September 2025 he introduced a dedicated node that lets people use the service in n8n without writing complex HTTP requests by hand, and it now appears as a verified node in n8n's official integrations list. It was an expansion that connected a developer's collection features to users of a workflow automation tool.

The official about page checked in September 2026 lists a team of three. It has grown from a one-person product in 2025 to a small team operation, while the statement that it runs without outside investment remains.

Scrape Creators grew by reusing collection code accumulated across several experiments and selling directly to developers who needed that data. The value Horning sold lay in a service that makes the desired data easy to fetch and keeps fixing things when collection methods change.
