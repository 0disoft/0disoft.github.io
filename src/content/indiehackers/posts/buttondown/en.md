---
{
  "title": "Starting from a newsletter's annoyances",
  "summary": "How Buttondown grew on word of mouth from TinyLetter's annoyances."
}
---

Justin Duke started Buttondown from frustration with TinyLetter, the newsletter service he used. TinyLetter kept writing and sending simple, but its Markdown handling was unreliable and image resizing was weak. The editor went unimproved for a long time. Duke wanted to keep that spare way of working while fixing the problems he kept hitting.

In January and February 2017, he posted on Twitter about the newsletter tool he wanted. By late April he decided to build it himself, and by late May he had a version that could actually send email. After a formal launch in late June, he had a few paying customers by July. In that year's retrospective he wrote that he spent enough time on features and bug fixes but not enough on promoting the product. Launch and first payments came fast, but growing customers started there.

Buttondown's editing experience respected writers' existing habits. Bodies written in Markdown could hold headings, emphasis, links, and code, with HTML for more complex expression. Developers and bloggers used to Markdown had less new editing to learn for newsletters. Adding those features to TinyLetter's simple writing flow shaped the product Duke wanted.

The market was already crowded. By Duke's later count, eight other newsletter platforms also launched the year Buttondown appeared, many with funding or press attention. He developed alone at nights and weekends with no funding or real marketing budget. Watching competitors appear in famous media or partner with large platforms shrank him, and first-year monthly recurring revenue stayed below $500. His day job covered living costs, so Buttondown carried no pressure to pay his own salary right away.

Direct responses kept early customers. He originally dreaded both receiving inquiries and sending replies, wanting to avoid writing answers customers would dislike or interrupting development. But faster replies changed reactions. In 2018 he explained publicly that quite a few people chose paid upgrades because of fast support. Requests from waiting customers went into a small Notion table so nothing slipped.

Support also became a path to features. Buttondown's import feature started as a roughly 20-line Django script reading CSV files. Each time TinyLetter and Mailchimp users moved data over, code for different formats and exceptions attached. When a one-off request arrived, Duke made a small script reusable for the next request, refining it as the same work repeated. Code written to move one customer grew into the feature handling later customers' migrations.

Growing free users also exposed operating burden. In his 2019 retrospective Duke wrote that supporting free users consumed much of his time, and without a support hire even the joy of making the product shrank. He announced plans to shift toward a paid-centered model and improve the writing and editing experience. He was living, in his own product, the problem that a business cannot keep growing unless the founder's time and operating costs are covered as users grow.

He also limited development scope. In plans for the next year published in late 2020, he prioritized letting users handle frequent requests themselves, such as importing subscribers and past issues and setting domains. The most-requested sequential drip campaigns he excluded for large development and screen costs. Enterprise single sign-on and team features also missed that priority list. Limited development time went to reducing already-occurring operating burden.

The product's character showed in defaults too. In March 2021 Duke changed new accounts to turn off email-open and link-click tracking by default. Existing accounts kept their settings, while new publishers would turn tracking on when needed. He admitted the old default had not survived enough review and fixed the code. A small setting carried the judgment of how much reader behavior to collect.

For about five years Buttondown added paying customers little by little. Some months added two paying customers with no churn, some months competitors closed. Duke kept the product alive while word of mouth and search inflow accumulated time. In April 2022 he left Stripe. He had enough savings plus a spouse's income, no children yet, and saw no reason to delay working independently further.

In December 2022 Buttondown's monthly recurring revenue reached about $15,000. In that year's retrospective Duke was satisfied with revenue growth and technical progress but judged he had not finished planned large features and business operations. He set the next year's goal as settling Buttondown as a stably growing business. Atop customers and revenue secured while employed, he moved to spending more time on product and company operations.

Buttondown's revenue structure centered on fees newsletter publishers pay. On the September 2026 price list, basic features stay free up to 100 subscribers, with charges by active receiving subscribers and extra features used. Analytics, paid subscriptions, and RSS auto-send can be added as needed. Nobody pays merely for a name sitting in a contact list; actual send targets set the billing basis.

Even when publishers charge readers, Buttondown takes no share of that revenue. Publishers pay payment-processing fees apart from Buttondown fees, and can run monthly and yearly subscriptions or multiple price tiers. With equal readers and features, raising subscription prices alone never sends Buttondown an extra cut. A migration feature for paid subscriptions already using the same Stripe account spares readers re-entering payment details.

Operations leaned actively on outside services. At the 2023 cost disclosure Buttondown used Heroku for hosting, with Postmark, Mailgun, and AWS together for sending email. A separate sending path for outages stayed ready. Heroku then cost about $500 a month, much of it from async-work configuration, Duke explained. Tools first chosen to save time managing servers directly came under cost-and-efficiency review as the business grew.

In April 2024 he bought the buttondown.com domain for $85,000 with cash the business had made. Moving web traffic from buttondown.email to the new address finished that August. Duke valued that, unlike acquiring another company or greatly expanding a marketing org, a domain purchase was a fixed one-time investment with ongoing management burden attached to the alternatives. He recorded that search inflow did not fall as feared after the move and had rather improved by then.

Change came inside the company too. 2024 was the first year in Buttondown history when most new code came from someone other than Duke. Customers likewise talked more often with other teammates than the founder when asking. A February 2025 interview introduced a team grown to eight. Work once done alone — developing everything and sending every reply — started spreading to colleagues.

In 2025 revenue grew 61% over the prior year. Active publishers actually sending within the last 30 days rose 45%, and unique subscribers receiving email rose 72%. The company said it kept cash-flow positive while expanding support and infrastructure. Beyond joined account counts, it checked business health with actual sending activity, reached readers, and revenue as key metrics.

Support numbers came along. Answered inquiries in 2025 numbered 5,247, up 34% from 3,906 the year before, while median time to first answer fell from 7 hours to 5. Inquiry growth ran below revenue growth in the same period. Explaining support operations later, Duke stressed watching how much extra support work arrives as revenue grows.

For that, inquiries piling in a personal inbox moved to a dedicated tool with a duty rotation. Owners answer fast and fix short problems, while logging time-heavy bugs to judge priority alongside other development work. Small tools showing customer and payment history on the inquiry screen got investment too. Writers built the habit of checking docs first, filling gaps found missing or thin. Each customer helped meant operating tools and instructions improved together.

Why people choose Buttondown also shows in customer migration records. Software engineering writer Will Larson published his January 2026 move from Mailchimp to Buttondown. Paying Mailchimp $326 a month, he still struggled to find menus editing welcome mail or contact details and suffered domain-verification setup. Moving to Buttondown went smoothly, with expected fees at $79 or $139 a month. The product fit owning writing on his own domain and delivering it as wanted.

Duke's February 2026 customer-source analysis split half to word of mouth, a quarter to search, and the remaining quarter to large-language-model inflow. By revenue instead of customer count, word-of-mouth customers took about two-thirds. Competitor-comparison pages drew less than core price-and-feature pages. Duke judged time spent improving the product then earned more than marketing-page optimization and allocated resources accordingly.

That spring, AI-recommended signups rose fast. New users naming language models as their path rose from 15% in January to 32% in February to 49% in March. Duke said monthly growth in Q1 2026 doubled the prior quarter, with most above-trend extra growth from model inflow. He pointed to Buttondown's admin screens being designed to use a public API. Real product-driving features lived in the API and docs too, suiting outside tools.

New inflow also demanded operating readjustment. AI-arriving customers converted to paid at lower rates than existing groups and sometimes expected uses Buttondown did not support. Support spent time answering complex inquiries only to receive machine-generated replies back. Duke pulled forward internal-tool and infrastructure investment and reinforced the API, while managing time spent on prospects and free users. He also stated rising revenue would not immediately justify permanently expanded spending.

Small screen fixes paid off during growth. In a July 2026 experiment the team moved the signup button inside the price calculator from outside and removed guidance copy that read only for first-time newsletter starters. Customers moving subscriber lists from other services could flow naturally into signup too. Price-page visitor signup completion rose from 6.7% on the old screen to 9.5% on the revised one. The team left both winning and losing experiments in the public record.

In April 2026, four years independent, Duke wrote that many customers now never knew him and related to Buttondown through other teammates. Colleagues received inquiries and outage alerts, and revenue had grown over a week of travel. He valued setting time with family himself, accepting that the choice meant not growing the company at the maximum possible speed. The newsletter tool he made to use himself had become a company colleagues improved together and customers' fees operated.
