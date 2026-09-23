---
{
  "title": "Turning Notion Docs into Support Sites: HelpKit",
  "summary": "How Dominik Sobe turned his own customer-support burden into HelpKit, and grew from two preorders to $10,000 in monthly recurring revenue."
}
---

## A Support Problem in His Own Products

Dominik Sobe wanted to spend less time on customer support while running his own products. Every mobile app and SaaS release forced him to explain usage and fixes, and handling inquiries alone took serious time. Customers wanted answers the moment something broke. He wanted a help site that gathered answers to common questions where customers could find them on their own.

Sobe, who is from Austria, studied economics and strategic management, then built products while studying information systems at Nova University in Lisbon. He picked up development and design by doing the work himself. He already kept his business docs in Notion, so he wanted to use the same tool for help content. Writing in a familiar editor and carrying it through to publishing for customers, he thought, would make docs much easier to manage.

At the time he was shaping the idea, Notion public pages fell short as a company help site. The Notion URL and branding showed through, and restyling the screen for a company was limited. The HelpKit he set out to build turns docs written in Notion into a support site with the company's own brand and address. Writing and collaboration stay in Notion, while HelpKit owns the customer-facing screens and navigation.

## Two Preorders and One Long Email

Sobe did not start building as soon as the idea arrived. Earlier projects had taught him that early excitement guarantees no real demand, so he watched for about two months to see whether he still wanted to solve the problem. When his interest did not fade, he drew product screens in Figma and put up a landing page. He attached a Gumroad payment button offering a one-year license for $39 as a preorder.

In July 2021, he shared the page with about 300 Twitter followers. Interest from the Notion community added about 100 followers in a day, but the first week brought zero preorders. His threshold for starting development was ten preorders. Two came in the next week, then none the week after.

Around then, someone who had found HelpKit sent a long email. It held enough advice and suggestions to take more than ten minutes to read, from a person with no personal connection to Sobe. He read it as concrete interest in the product. Short of the preorder goal, he decided to build the first version on the strength of two paid orders and that detailed feedback.

The first working product took about a month. While building, Sobe shared his progress in public, talked with Notion users, and paid close attention to what others were making. By the August 2021 launch, people already knew his name and his process. Those relationships turned into early signups and referrals.

## Connecting Writing and the Customer-Facing Screen

Using HelpKit starts by duplicating a Notion template into your own workspace. You write help content in the template and connect the public Notion page URL to HelpKit. Then you set brand elements such as the logo and colors, and the customer-facing site is ready. The source stays in Notion afterward, so owners keep writing in the environment they know.

Display comes in two forms: a standalone help site and a widget embedded in a website. With the widget, customers can search and read help without leaving the service screen they were using. HelpKit also offers a help-center layout suited to general support and a docs-style layout suited to product and API references. The same doc base appears at several touchpoints, shortening the path to an answer.

That simple flow took substantial engineering. Sobe built the early HelpKit himself on Nuxt and Node, working hard to render Notion's varied blocks naturally on an outside site. He also revised the early setup screen for connecting a Notion page several times. Taking feedback from early customers, he fixed connection and display snags one by one.

Email Love, an email design tool, shows how it works in practice. The company organized help around tasks customers perform often, such as adding images, styling components, and inserting links. It then used HelpKit analytics and customer reactions to improve the docs. Founder Andy King said in a 2024 interview that fewer support requests left more time for new features and product improvements.

## From Eleven Customers to $10,000 in MRR

A free tool for Notion users also helped bring in early customers. To fix the annoyance of making simple tables in Notion at the time, Sobe built "Notion Simple Table". It generated code users could paste into Notion after composing a table, and its site carried a link to HelpKit. People who came for the free tool discovered a paid product built for the same Notion environment.

In records Sobe published in November 2021, HelpKit had eleven paying customers and $241 in MRR. Most customers were on the higher plan. Some recent signups had paid the annual fee in one lump sum. Sobe took that payment as a sign of trust in the product.

He also reworked turning signups into active users. At first he contacted people who joined the 7-day free trial directly for opinions, but replies were thin for the time spent. Then he spent a day assembling five onboarding emails sent during the trial. Asking users to reach out when stuck, that sequence drew answers from more customers.

When a large company asked for a feature he did not have yet, he suggested a short call. He listened to what job needed the feature, then explained what was available now and what was planned. According to Sobe, demands that first looked like deal-breakers often turned out not to block signup after a conversation. Through those contacts he learned what customers actually cared about.

On February 28, 2022, he disclosed 51 paying customers and $1,020 in MRR. Plans then were Essential at $19 per month and Premium at $29 per month. With 65% of paying customers on Premium, it was clear that many customers would pay extra for additional features.

That April, MRR reached $2,000, with more than 90 customers running more than 3,000 help docs. By Sobe's account, the first $1,000 took about five months, and the next $1,000 took about a month and a half. In June, paying customers passed 130 and MRR reached $3,000. He said that income let him finish his studies while committing to independent product development.

The Product Hunt launch came on August 25, 2022, about a year after the product shipped. Sobe chose that timing because he wanted to see the reaction once he already had real customers. Existing customers left usage stories and recommendations in the comments, placing real user reviews beside the product description.

In May 2023, he reached $10,000 in MRR. Announcing a solo bootstrapped business at that scale with no outside investment, Sobe said hundreds of companies were turning Notion docs into support sites and documentation with HelpKit. In a July 2025 interview, he said customers had passed 400, including universities and large enterprises.

## Solving the Same Problem More Deeply

In September 2023, he launched HelpKit AI. When a customer types a question, it finds relevant material in existing help content, composes an answer, and links to the source docs. The feature put already-written docs to work in conversational support. Priced as a paid add-on to the base subscription, it widened what he could sell to existing customers.

In 2025, he spent weeks reworking the codebase for multilingual support. Sobe said it was the most requested feature from customers. He then released a React Native SDK for using HelpKit inside mobile apps. As the languages and screens needing docs grew, the product stretched so the same support system could follow.

He also published retention numbers. By his account in August 2025, churn in some recent months was under 2%, and monthly average churn over the prior 12 months was about 2.5%. Several customers from the earliest cohort were still using the service roughly four years on.

Sobe said he still answered incoming support inquiries personally in his fourth year as a founder. Help, search, and chatbot handled repeat questions, while he dealt personally with what those paths could not resolve. Explaining the situation to customers hit by errors and checking that fixes worked, he treated that as an important part of retention. While HelpKit reduced support work for the companies using it, he kept a direct relationship with his own customers.

The nature of a help-site product also helped retention. Sobe explained that once a company writes docs, connects them to its service, and settles how owners manage them, moving to another tool takes substantial work again. So keeping publishing, search, and brand settings stable as customers expected mattered. Fixing frictions found in real use sat at the center of operating the product.

What HelpKit bundled as one product was the whole path from writing docs to solving customer problems. Client companies wrote explanations in familiar Notion, published them through HelpKit, and watched usage to fill gaps. Sobe ran the service so that loop kept working, and collected subscriptions. Easing other businesses' recurring support burden became his recurring revenue.
