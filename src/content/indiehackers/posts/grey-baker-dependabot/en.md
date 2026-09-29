---
{
  "title": "Grey Baker turned recurring dependency updates into Dependabot, reached $14,000 a month, and sold it to GitHub",
  "summary": "How Grey Baker and Harry Marr built Dependabot from the dependency-update work Baker repeated at GoCardless and its predecessor Bump, won their first users with hand-written outreach, ran into repository permission objections from a target project, reached about $14,000 in monthly recurring revenue without outside investment, and ended up as a free part of GitHub after the 2019 acquisition."
}
---

## Turning Recurring Dependency Updates into a Business

Grey Baker built Dependabot with Harry Marr, a service that automates software dependency updates. The business the two grew without outside investment reached about $14,000 in monthly recurring revenue and was acquired by GitHub in 2019. It is a co-founding case of turning the maintenance work developers handled every day into a paid service.

## The Recurring Work the Founder Handled Himself

Baker worked as a strategy consultant at McKinsey before teaching himself to program. He then took on product and engineering work at the payments company GoCardless, where he experienced the headcount growing from six people to more than a hundred. After leaving the company to travel the world by bicycle, he pursued a startup in healthcare, and along the way started Dependabot as a side project in the field he knew well.

The product began with the dependency-update work Baker repeated at GoCardless. Its predecessor, Bump, was a tool GoCardless built in 2015: it checked for new versions of libraries, edited the dependency files, and opened a pull request (PR) proposing the code change. GoCardless's public repository records that from 2017 Dependabot met the same need while offering a broader set of features.

Dependabot connected that work to the GitHub flow the development team already used. When it found a library to update, it opened a PR and presented the changelog, the release notes, and related security information together to help the review. Developers could check and merge the change through their usual code review process. Cutting the repeated work from spotting an update to preparing the fix was the product's core value.

Baker and Marr lived on their savings and took over Bump's intellectual property from GoCardless. They built a first beta in about four weeks and spent roughly another month polishing it. They also had to deal with the flood of edit requests from old repositories, merge conflicts, and updates that were regenerated after being declined.

## The First Users Came from the Founder's Own Outreach

Getting listed on the GitHub Marketplace early on required at least 250 users, but Dependabot had only 22. A promotional post prepared over two days and put on Hacker News and Reddit brought in a single subscriber.

Baker searched GitHub for PRs with "update" in the title and pitched the product to their authors. He spent an hour a day on this and gained two or three subscribers, and about half of the people he contacted signed up. It was a way of using work the other person had actually done by hand as the basis for introducing the product.

After the Marketplace listing, the signup rate became roughly ten times the earlier pace. GitHub collected Dependabot's fee on the existing invoice, and the fee at the time was 25% of revenue. Listing changed customer acquisition and the payment process at the same time.

The 2017 pricing was $15 a month for five private repositories and $50 a month for unlimited. It was free for individuals and open source, and there were cases where a developer satisfied with it on a personal project recommended it to their workplace.

The monthly revenue he disclosed in a December 2017 interview was $740. The previous month's service operating cost was $50, mostly hosting and email. It has to be read together with the fact that both founders were living on their savings at that stage.

## The Trust Problem in Selling Developer Tools

Baker's direct selling continued after the product had grown. In October 2018 he approached the community of the open source forum software Discourse to propose adopting Dependabot. Showing a Dependabot PR he had prepared himself, he explained both a mode that receives a fix only when a security vulnerability is found and a mode that also receives regular version updates. He also stated frankly his expectation that adoption by a well-known project would raise Dependabot's profile.

What the other side worried about, however, was repository access permission. Discourse asked whether it was possible to send PRs from a forked repository instead of granting write access to the original. Baker answered that it was hard to support easily because of the permission model of the GitHub App at the time, and the adoption discussion was put on hold. The exchange shows that in automation products for developers, permission scope affects the buy and adoption decision alongside the convenience of the feature.

Dependabot went through this process and grew to about $14,000 in monthly recurring revenue. The interview introduction on the podcast "Marketing Mashup" published on July 1, 2019 explains that Baker grew the business to that scale and then sold it to GitHub. Here monthly recurring revenue means revenue that recurs on a regular basis, and it is not a figure that represents the founder's personal income or net profit.

## Expanding into GitHub's Security Features

GitHub announced the acquisition of Dependabot in May 2019. The official announcement at the time explained that it was acquiring and integrating Dependabot to make the work of resolving dependency security vulnerabilities easier. That announcement did not disclose the acquisition price.

The functional connection with GitHub was clear. When a vulnerable library was found in a repository, Dependabot could prepare an update PR that resolved it. For security fixes it used the approach of upgrading to the minimum version needed to clear the vulnerability, narrowing the scope of change a developer had to review. Dependabot added the role of supplying an actual fix to GitHub's vulnerability detection.

After the acquisition, Dependabot was offered for free on the GitHub Marketplace. Co-founder Harry Marr said on the official GitHub blog on July 25, 2019 that the cumulative number of merged Dependabot PRs had reached one million. From April 2017, when the first PR was merged, over about two years, it was a record showing the scale of automatically prepared updates that were actually reflected in real projects.

In June 2020 the general version-update feature was also released as something natively integrated into GitHub. Users could specify the package manager and the run schedule in the repository's configuration file and receive update PRs. GitHub stated in that announcement that it was providing all Dependabot features to all repositories for free. A service that had charged independently had become a common development feature of GitHub.

## When Recurring Work Became a Platform Default Feature

Dependabot's business strength lay in handling work that recurs whenever an update appears inside the developer's existing review process. Automation that individual development teams paid for widened its distribution to the whole platform as it combined with GitHub's security features. It is a case of a small maintenance tool built by two co-founders expanding into part of a larger development environment.
