---
{
  "title": "Kyle Gawley turned the SaaS code he kept rewriting into Gravity, reached about $25,000 a month, and later passed $1 million in cumulative sales",
  "summary": "How Kyle Gawley went from co-founding the investor-backed ticketing service Get Invited and burning out under fundraising pressure to packaging the login-and-payments code he rewrote for every idea into the Gravity SaaS starter, how a $99 launch in September 2018 grew to a $895 price by May 2021 and about $25,000 a month by a November 2022 interview, why that monthly figure counts one-time code sales and update fees rather than pure subscription revenue, and how a 2023 customer fraud case showed what post-sale maintenance is worth."
}
---

## Turning Recurring SaaS Development into a Product

Gravity, built by Kyle Gawley, is a developer starter codebase that pre-implements the features SaaS products need again and again, including login, payments, and user management, and sells them as a product. A November 2022 Indie Bites interview introduced it as a business bringing in more than $25,000 a month. Kyle, who had already run a company on outside investment, packaged his own development experience into something reusable and moved the center of his work to building and selling products on his own.

## The Limits He Found While Running an Invested Company

Kyle co-founded the event registration and ticketing service Get Invited with colleagues during his master's at Ulster University. With the university's support the team raised outside investment, and he took the CEO role. The service won international events as customers, and his personal site describes the ticket volume processed through it as reaching $5 million, which is the value of the tickets sold rather than the company's own revenue.

Running the company brought growing pressure to raise money, manage a team, and secure the next round before the cash ran out. Kyle had long suffered from a stomach condition, and in February 2016 he was hospitalized with bleeding. Looking back at the period when a late diagnosis overlapped with business stress, he began to question whether he could keep running a company in a way that sacrificed his health and his life.

After recovering he experimented with working remotely from Thailand for a month, and in 2017 he traveled through several parts of Asia while running the business. In Chiang Mai he met developers running their own businesses from laptops. That experience made his conditions for work clear: build the product himself, stay free of any single location, and run a business at a scale that supported his life.

## The Common Code He Prepared to Build Many Products

In 2018 Kyle wrote a shared codebase so he could experiment with new software ideas. Whatever the product, it needed features like authentication and payments, and preparing those first meant he could ship quickly once an idea appeared. A developer he met at a shared office suggested selling that code itself. As he confirmed that similar products written in other languages already sold for $1,000 or more, he began to look at its potential as a standalone product.

Gravity's first release was September 18, 2018. Kyle packaged the code, made a simple sales page, introduced it on Indie Hackers as a $99 product, and had the first sale within about two weeks. The early version was a rough build using jQuery, and he fixed its problems after buyers pointed them out.

Early results were small. According to figures Kyle published in 2021, Gravity's 2018 revenue was $396. In 2019 he raised the price to $297 and then to $397, and from around then the product began to help cover living costs and rent.

The product later grew into a Node.js server and React interface providing authentication, Stripe payments, user invitations and permissions, email, and admin screens. Buyers take the code from GitHub and add the features their own service needs. Because they can start from common features that are already wired together, they spend less time reassembling a base structure for each new product.

Of the buyers Kyle described in a 2022 interview, 80 to 90 percent already had a product in mind and were starting development, and he estimated that about 5 to 10 percent were learning-oriented buyers interested in software structure. The main customer was a developer able to write code but unwilling to spend the time before launch on repetitive work.

## Raising the Price Changed the Scale of the Business

In 2020 Kyle treated Gravity as a serious business and experimented with higher prices. By his account, growth accelerated once the price passed $500, and within a few months it recorded $10,000 in monthly revenue. The price he published in May 2021 was $895, well above the original $99.

Each time he raised the price Kyle worried that sales would fall, but after talking with buyers he concluded that price and brand shape trust. Customers cared about the quality of the code they would build their business on and about the support around it. The higher unit price also gave him room to spend more time on product development, explanatory content, the customer community, and support.

The revenue model combined code license sales with update revenue. In 2021 Kyle said he charged $97 a year for updates, and the current terms still separate a perpetual license from optional annual updates. The $25,000 in monthly revenue introduced in 2022 therefore includes one-time code sales, and it should not be read entirely as the monthly recurring revenue of a subscription SaaS.

## The Trust It Takes to Sell to Developers

Early customers came from developer communities such as Indie Hackers, with search and Twitter continuing the flow. Kyle explained that at launch there was little competition for Node.js SaaS starters, so he could rank for the relevant search terms relatively quickly. In 2021 he experimented with ads but got better results from organic traffic, and he said sales came from buyers finding him on their own.

The main obstacle in the sales process was that buyers could not be sure in advance of the quality of the code they would receive after paying. Kyle limited trials and refunds because downloaded source code is hard to recover, so he had to establish trust before payment. To do that he presented customer counts, real testimonials, external reviews on Trustpilot, and a working demo together.

To help with technical review he spent about 20 minutes walking through Gravity's API, its model and controller structure, and the client code in a video. On Twitter he shared development under his own name and showed himself building other products with Gravity. Buyers could judge by the product screens, the author's explanation, and real usage cases together.

## Product Development That Continued After the Code Was Sold

In 2022 Kyle also produced a course on building SaaS. The official course runs about 25 hours across 17 modules and covers authentication and payments, data modeling, security, testing, and deployment. Offering Gravity to people who want to use the code right away and the course to people who want to learn the implementation, he expanded his products for the same developer audience.

The value of maintenance also showed up in a real customer's operational problem. In a case Kyle published in May 2023, CodeTutor, which was built with Gravity, took on more than 300 fake accounts and 30 fraudulent payments made with stolen cards. Email verification, which already ranked high in customer voting, had just been added, and that customer applied the changes from the repository. Kyle said the measure stopped the fake account creation and fraudulent payments at the time.

Kyle also set limits on how he worked. In the 2022 interview he said he worked five to seven hours a day, and that focused programming generally lost its efficiency beyond three or four hours. Traveling and changing residence every few weeks also hurt productivity, so he adjusted toward moving between two or three places and keeping a steady work environment and daily rhythm.

## A Software Product That Can Be Sold for Years

The official site, as checked in September 2026, says more than 1,200 developers use Gravity. The lineup includes a Node.js and React version, a Next.js version, the course, and a custom SaaS development service. Pricing is not fixed either: the sales page at that time showed three tiers at $199, $299, and $499. The high-price strategy of 2021 is best understood as a choice made at a particular growth stage.

In July 2026 Kyle disclosed that he had passed $1 million in cumulative revenue selling non-subscription software such as Gravity. By his account some customers bought new versions and add-ons, paying $2,000 to $3,000 across the whole relationship. Some relationships ended with a single code sale, but there was also room to sell follow-ups to customers who kept using the product.

The unit of the business Kyle built with Gravity was a bundle of work developers perform again and again. He packaged it as code several customers could use, explained its structure and quality before purchase, and provided updates and support after the sale. Through that process he connected building software directly to his income and the way he wanted to live. Gravity was an independent product business that designed reusable development work, buyer trust, and post-sale improvement together.
