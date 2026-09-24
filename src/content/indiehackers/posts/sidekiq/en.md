---
{
  "title": "From a Free Background Job Tool to a One-Person Business: How Mike Perham Built Sidekiq",
  "summary": "Mike Perham released Sidekiq as a free Ruby background job tool in 2012, then sold Pro and Enterprise licenses and subscriptions to maintain it for over a decade, reaching 1,850 customers and $13.5 million in cumulative revenue."
}
---

## Building a Background Job Tool

In 2012, Mike Perham released Sidekiq, a tool that handles background jobs for Ruby applications. The base version was distributed for free, and companies that wanted different terms could buy a commercial license for $50. The first license sales came to 33 licenses, or $1,650 in total. To keep maintaining a tool he had put hundreds of hours into, he needed a product that customers would pay for with a clearer reason.

Sidekiq's job was the repetitive work that runs behind the screens of a web service. When tasks such as sending order confirmation emails or syncing data with outside services are handled separately, users do not have to wait at the screen until that work finishes. Development teams get a common foundation for putting jobs into a queue, retrying them when they fail, and checking how they are progressing.

Perham was a developer who had built this kind of system himself at several workplaces. In 2008 he built a job queue at FiveRuns, and afterward he developed several background processing tools while changing storage methods and execution structures. Sidekiq carried the experience he accumulated in that process, along with design choices meant to cut down on the pain points of earlier tools.

The key choice was a structure that processes jobs with multiple threads inside a single process. The focus was on reducing the resource burden that comes from adding more processes whenever you need to handle more work at once. For adoption, he emphasized tight integration with Rails and compatibility that made it easy for existing Resque users to migrate.

The ecommerce company where he worked, The Clymb, used the early product in a real service. In October 2012, Perham said the company had been running Sidekiq in production for six months and that it was faster and more stable than its previous Delayed Job setup. The experience from running it in a live service became the basis for improving the product and designing its paid features.

## Sidekiq Pro Starts Bringing In Revenue

Sidekiq Pro, released in October 2012, was priced at $500 per company. It included batches that group many jobs and track their progress, notifications sent when a batch finishes, and features that collect operational metrics. A developer could set up a flow such as processing hundreds of images and then running the next step. Paid extensions layered onto the base processing tool the features that companies would find tedious to build and maintain themselves.

Pro sold about 140 licenses in its first year, bringing in $70,000. At the October 2013 sales pace, the annualized figure worked out to around $100,000, so turning a side project into a full-time job began to look possible. In the same retrospective, Perham recorded that he had shipped Sidekiq 34 times over the past year. With income coming in, the reason to keep investing time in features and bug fixes became clear as well.

Early sales spread on the trust he had built among Ruby developers. Perham had been writing a technical blog since 2007 and met developers and answered their questions at RubyConf and RailsConf. Developers who had used the product recommended it to colleagues, or brought it into the next company they joined. He cited developers who had bought Pro at two or three different jobs as an important part of the growth.

About 18 months after Pro launched, monthly revenue had climbed to around $10,000. Once the side income passed his salary from his day job, Perham prepared to go independent, and in July 2014 he left The Clymb. That same month he founded Contributed Systems and made Sidekiq development and support his full-time work. The order was to change how he worked only after the product had reached the point of covering his living costs.

## Subscriptions and Enterprise

The paid editions moved toward supporting companies' workflows more deeply. In February 2015, Pro 2.0 reworked the structure so batches could be nested inside other batches, making it possible to manage work that runs in multiple stages. The window where jobs could be lost while scheduled work was moved into a queue was also improved with a new scheduler. Control over complex work and operational stability accumulated together in the value customers were buying.

The sales model also shifted to subscriptions to match ongoing maintenance. In a 2016 interview, Perham called offering lifetime support for a one-time payment his biggest mistake. When Ruby and Rails change, the product has to change too, and as users grow the support work keeps coming. By then he was selling annual subscriptions, matching the nature of a product that lives inside an application for years.

In August 2015 he released Sidekiq Enterprise for larger companies. It added features such as rate limiting to keep requests from flooding an external API, running jobs on a set schedule, and suppressing duplicate jobs. These features targeted the operational problems that appear as throughput grows and more systems get connected. The customer group and the use cases that could justify a higher price than Pro came into focus.

With Enterprise, the purchasing process was also adapted to corporate requirements. Pro kept credit card payment, while Enterprise opened a path through quotes, purchase orders, and invoices. At launch it also offered contract negotiation and a one-hour onboarding consultation that Perham ran himself. In effect, the product developers wanted to use got a process that companies could actually buy through.

Pricing was split by operating scale. At the time, Pro cost $950 a year with no limit on job throughput, while Enterprise's price rose with the number of worker threads used in production. Small companies got a simple flat rate, while companies running at large scale paid an amount that matched their scale.

Revenue in 2015, the year Enterprise launched, grew to 2.6 times the previous year, and the average selling price doubled. Perham said he had initially set a goal of selling 2,000 units of a $500 product for $1 million in total. Running the business taught him it was more realistic to get 500 customers paying $2,000 each. It was a lesson that in a niche enterprise product, the ceiling on customer count has to be solved with high utility and appropriate pricing.

## Setting a Solo Operating Scope

The same approach did not lead to enough revenue with his second product. Inspeqtor, a process monitoring tool he introduced in late 2014, and its paid edition fell short of expectations in both usage and sales. In a 2015 retrospective on winding the business down, Perham said he would leave the existing product usable but would not add new features. He stopped assigning development time to a product with a weak sales response.

With Faktory, released in October 2017, he expanded into the background job processing field he knew well. He separated the job server from the worker programs so the design he had built up in Sidekiq could be used from other programming languages. At launch he provided workers for Ruby and Go, making it possible for systems built from several languages to exchange jobs the same way.

The way the product is delivered also helped him keep the business at a size one person could run. Because Sidekiq runs on the customer's servers, the infrastructure Perham operates for sales could focus on distributing the paid software and managing access. The deployment setup he shared in 2016 used a $5-a-month server instance and Apache, with two instances running in case of failure. The servers that ran customers' actual work were separate from the server that sold the software.

Repetitive work after a payment was automated only after sales grew. For the first two years, he received sales notifications and added customer access by hand. Later he wired Stripe payment notifications to create accounts, send installation instructions by email, and remove download access when a subscription ended. The need for the founder to step in as customers went from purchase to installation shrank.

Support work that required a person remained. Perham said that even on vacation he took his laptop and answered email for about an hour in the morning before spending the rest of the day. Seeing that adding employees would increase management work and operating costs, he designed the business around what he could handle efficiently or automate himself.

## Development After Ten Years

In January 2022, marking ten years of Sidekiq development, he shared that Contributed Systems had 1,850 customers. The company's cumulative revenue was $13.5 million, and its only employee was Perham himself. He said supporting users of Sidekiq and Faktory took up most of his working time. The income from commercial extensions had settled into a structure for maintaining the product over the long term.

Product improvements continued after that. Sidekiq 8.0, released in March 2025, included features to profile the performance of running jobs and a redesigned administrative interface, and the feature for splitting long-running jobs into smaller units was refined as well. With official support for Valkey and DragonflyDB alongside Redis, the storage options available to customers widened. On top of the early processing efficiency, the product evolved so that companies already using it would find it easy to keep running.

After growing, he also redefined the scope for accepting individual corporate requirements. In a 2026 commercial FAQ, he stated that he had stopped negotiating separate contract terms and that security and compliance documentation would be provided only to Enterprise customers above a certain size. If the early Enterprise edition opened the door to corporate purchasing, the later operating terms limited the scope of repeated negotiations and paperwork. This kind of standardization becomes a control on the non-development work that appears as customers increase.

Sidekiq's business grew by taking over the job processing that companies would otherwise have to implement and maintain themselves. Customers had reason to count development time, incident response burden, and the cost of continued improvement together, and Perham gained the income to maintain that capability over the long term. He combined free distribution of the tool, sales of enterprise features, pricing tied to usage scale, and a limited operating scope to turn a developer tool into his long-term livelihood.
