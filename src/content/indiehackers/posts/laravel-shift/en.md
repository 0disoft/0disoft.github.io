---
{
  "title": "From Upgrade Automation to Ongoing Maintenance: Laravel Shift",
  "summary": "How Jason McCreary grew Laravel Shift from a version upgrade tool into subscription maintenance and AI code review."
}
---

In November 2015, Jason McCreary found a business opportunity while preparing a talk at a PHP developer event. The subject was the new version of Laravel, the framework used to build web services, and how to upgrade to it. Official guides and a few explanatory posts existed, but a tool that changed code automatically according to those guides was hard to find. He noticed that a large share of the changes between versions could be handled by fixed rules.

McCreary asked Laravel creator Taylor Otwell, who was at the event, whether he knew of such a tool. Otwell knew of none, and showed interest in trying one himself. At the event hackathon McCreary built the first tool that converted Laravel 5.0 projects to 5.1, and found early test users through a Twitter mention from Otwell.

On December 23, 2015, Shift launched as a paid service. Prices were $3, $5, or $7 depending on the upgrade path. Over the Christmas holidays, about twenty runs earned $80.

The way it worked fit how developers already did their jobs. A customer signed in with a GitHub or Bitbucket account, specified a code repository, and paid, and Shift ran the upgrade. The result was saved to a branch, a working space separate from the original, and delivered as a pull request where the changes could be reviewed and merged. Customers could see what had changed in the code review screen they were already used to.

Where automation could not handle something reliably, it left explanations behind. Developers could read those notes, finish the remaining edits, and then merge the result, and the design had them check each step even when moving up several versions. This way the edits were left to an outside tool while the development team still decided what was finally merged.

The early product had bugs. Jeffrey Way, who ran the Laravel education service Laracasts, sent feedback that the idea was good but the tool had errors. McCreary set 100, 250, 500, and 1,000 runs as thresholds for investing more development work, fixing errors and expanding features at each stage. In September 2016 he announced 1,000 upgrades completed.

He asked customers who had finished using it how the result turned out, what they had fixed themselves, and where they had heard about Shift. The answers revealed both the gaps in the automation and the channels that brought customers in. Customer support doubled as product improvement and marketing research.

Early customers came mostly from Twitter. Otwell's mention was the starting point, and a 2016 Laracon talk put him in front of about 400 potential customers. Revenue jumped around events and new releases, reaching about $3,000 a month ten months after launch.

Even so, he did not go full-time right away. In 2017 he chose a well-paid consulting contract with Papa John's. When the contract ended in October 2018, he decided to commit to Shift, giving himself one year on the condition that he would protect his savings.

His earlier experience selling apps shaped the way he set prices. McCreary was used to charging little to reach many users, and he carried that thinking into Shift. The fact that developers could spend their own time on an upgrade also made him hesitate to raise prices. But in April 2019, with cumulative upgrades reaching 15,000, he judged that the service had proven its value and announced another increase.

In 2019, on Adam Wathan's advice, he organized pricing into three tiers. Upgrades to the latest version cost $9, supported versions cost $19, and versions past the end of support cost $29. Customers could understand the expected cost more easily, and revenue from handling old projects increased.

After going full-time he also introduced a subscription. He expected both customers' upgrade costs and his own revenue to become easier to predict. The early response was weak, and he later reflected that many customers felt little need to move to a new version quickly and stayed on long-term support releases.

Attempts to widen the market continued. He built version upgrade tools for PHP, the language Laravel is built on, but retired those products because few people used them. He also looked at JavaScript, but judged it hard to choose where to enter because the frameworks and public tools are so scattered. Supporting familiar technology alone did not bring a new customer base with it.

The pricing change and the subscription led to later results. In September 2019, when Laravel 6 shipped, monthly revenue reached $20,312. Subscription payments made up nearly half of revenue at that point.

In 2020 he widened the product scope into maintenance work for Laravel developers. He added Shift Workbench, which runs selected code cleanup tasks on demand, and introduced 'Can I Upgrade Laravel?', which checks which Laravel versions the packages in use support. Jess Archer joined the development on contract and helped with these extensions. The product began covering the work that happens before and after a version upgrade.

Educational products also connected to problems he found in customer support. Frequent questions about Git led to the 'Getting Git' course, and 'Confident Laravel', a course on writing tests, was made to help developers verify the results of an upgrade. In 2020 he released the basic edition of 'BaseLaravel', a course on working with Laravel, for free, and it recorded more than 10,000 downloads. Teaching content gave customers the knowledge they needed to use the tools well and widened his audience at the same time.

Revenue and usage accumulated together. According to records McCreary published, 2020 revenue grew 112% over the previous year, and in September 2021 cumulative runs passed 50,000. In November of that year, cumulative revenue since the business started passed $1 million.

As the number of products grew, deciding the operating scope became important too. In 2021 he expanded collaboration with outside developers, but in 2022, after Jess Archer joined the Laravel team, he went back to running Shift alone. McCreary tried to reduce the burden of switching between many tasks by cutting the products and technologies he supported. It was a choice to shape a grown business into a size he could keep handling himself.

He also created a way to run the service for customers who could not send code to an outside service. The standard Shift keeps customer code on its servers only during processing and deletes it when the job finishes, but for some organizations policy made uploading impossible in the first place. For those customers he offered 'Shift for Docker', which runs the upgrade in their own environment. It let them buy the same automation under terms that matched how their code had to be handled.

In 2025 annual revenue growth stopped for the first time since launch. McCreary named as the main cause the run of releases like Laravel 12 that required few changes, which weakened the need for paid upgrades. He also mentioned the possibility that developers had begun handling the work themselves with AI. It was a point where the structure of customers returning with each new release needed another look.

He started by adjusting how prices were managed. Products for versions past the end of support were moved into the higher price tier, and the low introductory price for the latest version was limited to a set period. In June 2025 he expanded regional pricing and local currency payments, reworking payment terms for each market. McCreary estimated that without these adjustments, that year's revenue would have fallen by about 10%.

He also looked back on earlier attempts to increase how often the product was used. The Workbench desktop app and command line tool were removed after falling short of expectations, and he noted that customers had to think of the task they needed, open the tool, and run it themselves. Making the execution environment more convenient was not enough of a reason for customers to come back to the product.

In January 2026 he started 'Monthly Shifts'. Each month, subscription customers received a curated set of code improvements as a pull request. They reviewed the changes that arrived and merged or closed them, and the next month brought a new set of improvements. The way the product was used shifted from customers finding work and running it to the product delivering work to them first.

The subscription's unit of purchase was also matched to what development teams manage. There is a plan for a single repository and an unlimited plan covering several repositories, and the upgrades included are separated by how old a project is. Teams running several services could pay for recurring maintenance costs as a bundle and receive weekly dependency updates and monthly code improvements.

In June 2026 he added a beta of 'AI Review'. The existing Shift performed the upgrade by fixed rules, and then AI read the context of the code and the explanations Shift had left behind and carried out further changes. It combined change rules accumulated over a long time with the ability to interpret context. It was an attempt to bring part of the work developers used to finish themselves after reading the explanations inside the product.

Shift bundled the upgrade decisions and repeated edits developers had to make every time into a single purchasable job. McCreary kept delivering the result straight into the customer's code repository while widening the moment of use from one-time upgrades to ongoing maintenance.
