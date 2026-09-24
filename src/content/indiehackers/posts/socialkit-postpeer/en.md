---
{
  "title": "From Data Collection to Publishing: How Jonathan Geiger Grew Two APIs",
  "summary": "How Jonathan Geiger built SocialKit and PostPeer into businesses through search traffic, usage-based billing, and customer support, then sold one of them."
}
---

## Starting Over with Familiar Technology

Jonathan Geiger worked as a developer at a small startup and built his own products at night and on weekends. In a side project that lasted three years, he settled into APIs for data collection and workflow automation, the functions other programs call. SocialKit grew into a business that pulls data out of social media, and PostPeer one that posts content to several social platforms.

He had already built and sold LectureKit, a learning management tool, and CaptureKit, a web page capture and collection API. For SocialKit he reused CaptureKit's login and payment, API key management, documentation structure, and landing page framework. That let him concentrate on the feature unique to the new product: handling social media data.

His criteria for choosing a product changed too. Geiger looked for competing products in areas he understood that were already earning revenue, and targeted parts he could improve himself, such as fast support. His experience knowing which integration work developers find tedious backed that choice.

## Delivering Social Media Data Through a Common API

The problem SocialKit addresses appears when social media content needs to be used inside another program. Analyzing a video means obtaining the video information and transcript, collecting comments or engagement metrics as needed, and connecting a summarization model. SocialKit bundles these tasks so that sending a video address and a request returns the needed result. Customers could cut down on the work of connecting a platform-specific collection tool, a transcription service, and an AI model one by one.

Delivering results in JSON that programs can read easily also mattered. Customers can feed transcripts and comments into an analysis service, or move view counts and channel information into reports and dashboards, combining it with their own products. To build a service that compares the response across channels, for example, they can leave data collection to SocialKit and spend development time on the comparison criteria and screen design. That is how he sold a common function that goes into a different finished product for each customer.

Before payment, customers could try real work. Both SocialKit and PostPeer offer 20 test credits, and paid use splits into usage-based subscriptions and one-time credit purchases. That structure accommodates customers who run jobs regularly and customers who only fetch data when they need it. The free trial had a clear role: checking whether the API fits their own data and tasks.

## Meeting Real Customers Through Search

Finding customers ran alongside development. Geiger wrote one or two related articles a week and created landing pages for each API feature, use cases, and comparison pages for people looking for alternatives to competing services. He searched using the phrases customers would search, then filled in documentation and usage instructions answering those questions. In the growth retrospective he published, organic search traffic was the most important customer acquisition channel.

A free YouTube transcript extractor became the entrance to the paid API. Some of the people who found the tool through search converted into paying customers, and the usage content was produced as both articles and videos. He reused the same material as short videos and social media posts so that one piece of work would be found in several places. Some customers encountered a comparison page against competing products through an AI search and recommendation service and then paid.

The people who actually paid were broader than the developer audience Geiger had first assumed. A large share of paying customers were people who connected their work through no-code tools without writing code. Because SocialKit could also be used from automation tools like Zapier and Make, it could reach people with recurring content collection work beyond developers who knew how to use an API. That experience shows customers should be understood by the task they want to perform rather than by job title.

## Bundling Publishing Work with Platform Costs

PostPeer, launched in April 2026, took on the work of sending content to social media. It offered posting and scheduling across several platforms through one API, so customers could attach social media posting to their own services. Where SocialKit supplied the material for analysis and reprocessing, PostPeer took a place at the stage of distributing finished content.

A service using PostPeer first connects a social account with the account owner's consent. It then sends the content to publish and the target account, and can either publish immediately or schedule it by time zone and time. It also offers a way to group connected accounts per customer, which suits agencies managing accounts for several companies or services with many users. Organizing account connection and posting procedures for each platform into a common way of working was the heart of the product.

PostPeer was developed with a partner from the start. The two split the platform integrations, so development could continue while Geiger focused on SocialKit. TikTok's approval process in particular demanded more effort than expected.

The approach of converting usage into credits also reflected the different costs of each platform. In PostPeer's September 2026 pricing, most platforms deduct 1 credit per post, but X deducts 5 credits when the body has no link and 50 credits when it does. The company explains that this difference comes from the request cost it pays to X. Customers get one API, while the cost differences arising inside are left in the billing unit.

Customer support was also a factor that shaped the difference buyers feel. PostPeer's pricing page carries testimonials mentioning fast responses and fix speed, and the founder of Kalizzle AI Studio said Geiger applied a fix within hours. When something goes wrong in an external API connection, the customer's development can stop, so how quickly problems get solved enters the purchase decision alongside the integration feature itself.

Geiger also paid attention to AI agents using APIs directly. He introduced connecting the two products to agents as a growth experiment, and SocialKit supports MCP, the connection standard agents use to call external tools, along with skills that provide usage instructions. He widened the access path so that the same data collection feature could be used by both human-written programs and agents.

He tried this way of working on his own X account. He set it up so that an agent wrote five posts a day with Claude, split the schedule across US time zones, and PostPeer handled scheduling and posting. After a run, he received the planned content by email and could edit or cancel it from the dashboard before publication. In this experiment, writing the posts and actually publishing them to an account were separate, and PostPeer handled the latter.

## Growing the Product Left After the Sale

Figures published in July 2026 show the roles of the two products. SocialKit's monthly recurring revenue was about $2,800 and PostPeer's about $2,400, with one-time payments adding about $700 and $500 a month respectively. The total was about $5,200 in recurring revenue plus about $1,200 in one-time revenue, roughly $6,400 a month. He quit his job that month to focus on product development.

The next turning point was the sale of SocialKit in August 2026. At the time of the sale, the monthly recurring revenue Geiger published was $3,290, and credit bundle sales were adding about $700 a month on average. The deal size reported by Tiny Startups was $85,000, combining a $75,000 sale price and $10,000 in consulting fees. An API that generated revenue while it operated became an asset that could be transferred to another business.

After the SocialKit sale, PostPeer's subscription business continued. As of September 24, 2026, the public revenue dashboard showed monthly recurring revenue of $4,403 and 122 active subscriptions. From the revenue of running two products together, he moved to a stage of selling one and growing the recurring revenue of the one that remained.

PostPeer also put a separate price on the experience built up in platform integration. One example is an agency service that sets up the account connection app showing the customer company's name and logo on its behalf and handles the platform review. The September 2026 offering was a one-time setup fee of $100 to $600 per platform plus a $99 monthly support fee, with a minimum three-month term for the support. Beyond charges for API calls, he expanded the revenue sources to initial onboarding and review and ongoing operational support.

In Geiger's case, the boundary of the product followed the work customers repeatedly bear. He provided data collection and publishing through a common API and sold per-customer setup and review handling as a separate service. Separating functions reusable across many customers from the effort that grows with each customer and pricing them accordingly was the heart of turning a small development business into a sustainable revenue structure.
