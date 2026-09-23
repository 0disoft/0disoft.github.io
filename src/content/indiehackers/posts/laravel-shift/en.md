---
{
  "title": "It started as a script that did version upgrades for you",
  "summary": "How Laravel Shift grew from a hackathon upgrade script into an independent business helping developers with maintenance."
}
---

In November 2015, Jason McCreary was preparing a talk at a PHP developer event about upgrading Laravel versions. While gathering material, he found that moving a Laravel 4.2 project to 5.0 had official guides but no tool that actually performed the process. Many of the changes could be handled by fixed rules. As a contract web developer, it looked like an idea that could also reduce his own work.

He asked Laravel creator Taylor Otwell, who was at the event, whether an automatic upgrade tool existed. Otwell said he knew of none, but would use such a product if it existed. At the event hackathon, McCreary narrowed the scope and built PHP and shell scripts that converted Laravel 5.0 to 5.1. Short on projects to test against, he got help when Otwell recruited early users on Twitter, giving the prototype a chance to meet other developers' code.

Laravel Shift launched on December 23, 2015. On a one-page site with GitHub login and Stripe payments, it charged $3, $5, or $7 depending on the upgrade path. Over the Christmas holidays, about 20 upgrades ran, for $80 in revenue. A script started at an event a few weeks earlier now had customers actually paying for it.

The flow fit developers' existing way of working. Once a customer connected a repository and purchased an upgrade, Shift created a separate branch, edited the code, and submitted a pull request. The pull request contained the changed code and items to verify. The customer reviewed it, then merged and deployed through their own process.

Parts it could not handle automatically still carried value. When it met project-specific custom code or uncertain changes, Shift left detailed notes on what the developer should check and how to fix it. McCreary thought even those parts should be automated, but customers valued the explanations themselves. It saved them the effort of reading the whole upgrade guide to pick out what applied to their project.

The early product was rough. Jeffrey Way, who ran the Laravel education service Laracasts, liked the idea but judged it buggy. McCreary kept fixing it from real usage, setting 100, 250, 500, and 1,000 upgrade runs as thresholds for investing further in the product. While reaching 1,000 upgrades in the first year after launch, the prototype was refined into a commercial tool that could handle diverse projects.

Promotion also happened inside the Laravel community. At Laracon 2016 he stood before about 400 developers, and across subsequent Laravel releases monthly revenue jumped from hundreds of dollars to thousands. About ten months after launch, it reached $3,000 a month. Getting shown directly to the people who needed it played an important role in early growth.

In April 2017 he signed a one-year consulting contract with Papa John's while continuing Shift. After one extension, he decided in October 2018 to focus on Shift. Around the turn into 2019, monthly revenue held above $6,000, and he also had savings built from contract work. He set a rule: give the business more time, but look for a job again if he ever had to start spending the savings.

Going full-time meant rethinking pricing. Because he had previously sold low-priced apps on the App Store, he had priced Shift low and felt uneasy charging for work customers could do themselves. But customers also spent costly development time doing upgrades on their own. Having handled about 15,000 upgrades by April 2019 gave him the confidence to raise prices.

The price list reflected Laravel's support policy. The latest version had a low $9 entry price, supported versions cost $19, and versions out of support cost $29. Customers keeping old projects alive and customers staying current paid different prices. That made the basis for pricing clearer than charging a few dollars more per version.

Next to per-use payments, he added a subscription called Shifty Plans. It served both customers who bought once when an upgrade was needed and customers who wanted projects kept current. Subscriptions bundled upgrades with routine maintenance work, tiered by the scope of repositories managed. Customers could set a maintenance budget in advance, and Shift had less need to persuade them to buy again with every new release.

He also widened the product into adjacent work for the same customers. Workbench let people run upgrade-time automation steps individually for code cleanup and refactoring. McCreary collaborated with Jess Archer as a contractor, and together they launched the Workbench desktop app in 2021. A separate revenue-sharing arrangement secured the development capacity he needed.

He also ran Human Shifts, where a person handled the project directly. McCreary looked at the customer's code and carried out the upgrade, taking work the automation tool alone could not finish. The process became a channel for using his own tool in real customer environments and finding improvements. But even two or three a week took considerable time, so there was a clear limit to expanding direct work.

For companies that could not hand code to an outside service, he offered a Docker path that ran locally. Upgrades could run inside the customer's own environment, reducing lost purchases caused by repository access policies. It kept the same upgrade functionality while changing delivery to match the conditions customers hit during adoption.

The business gradually grew. According to records McCreary published, 2020 revenue grew 112% over the previous year. In September 2021 cumulative upgrade runs passed 50,000, and in November of that year cumulative revenue since launch passed $1 million. That was about six years after starting to sell few-dollar upgrade products.

Sales opportunities were tied to Laravel's release schedule. In 2021 Laravel changed its major release cadence from twice a year to once, and pushed the Laravel 9 release to 2022. That mattered for Shift, where each new version generated upgrade demand. McCreary adjusted pricing to the new cadence, including limiting the $9 latest-upgrade price to an early-release benefit.

He strengthened operations automation only after volume grew enough. In 2022 he set processing servers to scale up automatically when queued work grew and to clean up when work shrank. As a result, weekly jobs run for subscription customers fell from about four hours to 32 minutes. It was not built from the start; McCreary delayed it by about two years and implemented it when real demand grew.

As products grew, some had to be cut back. When Jess Archer joined the Laravel team in 2022, McCreary returned to developing Shift alone. In 2023 he retired the Workbench desktop app and the Shifty Coders community, which had contributed only a few percent of revenue. That year total Shift revenue still grew about 25%.

In 2025 revenue growth stalled for the first time since launch. McCreary named fewer required changes in recent Laravel upgrades as the main cause: if services could keep running without following every new feature or recommended style, customers had less reason to buy a paid upgrade. He suspected the shift toward developers handing upgrades to AI also had an effect.

He managed pricing enforcement more strictly. When support for a Laravel version ended, he moved that product into the higher price tier and limited the discount period for the latest version. In June 2025 he adjusted regional pricing and introduced local-currency payments. These were price and payment terms that are easy to neglect while waiting for sales to grow on their own.

He applied the same standard to expansion products. Products widened to PHP, Tailwind, and Pest did not grow revenue as hoped, and he also retired a CLI aimed at frequently used developer tools. He kept the web-based Workbench because users remained and it reused existing upgrade automation. That reduced the burden of managing many products and freed capacity to focus on Laravel upgrades.

In January 2026 he started sending Monthly Shifts to subscription customers. Each month, selected code improvements were performed automatically and delivered as pull requests; customers merged needed changes or closed unwanted requests. With the earlier Workbench and CLI, customers had to figure out what to run and open the tool themselves. Monthly Shifts reduced the effort of use by sending maintenance results to the customer's repository first.

In the AI Review beta released in June 2026, AI work was attached after existing automation. After Shift performed the upgrade by fixed rules, AI read the code and detailed comments and handled the remaining changes. At launch it was offered as an optional $9 add-on, with AI edits also left as reviewable commits and summaries. Change rules and explanations McCreary had accumulated over years became the material guiding the AI's work. While keeping human review of the final result, it widened the scope finished before handing work to the customer.
