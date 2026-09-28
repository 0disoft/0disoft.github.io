---
{
  "title": "Michele Hansen built Geocodio with her husband Mathias and grew it without outside investment",
  "summary": "How Michele and Mathias Hansen turned the geocoding burden behind a store hours app into Geocodio, charged small users by usage and heavy users through unlimited plans, kept the first API version working, and reached hundreds of thousands of users and a security incident response after twelve years."
}
---

## Geocodio

Geocodio, built by Michele Hansen with her husband Mathias Hansen, is a service that turns addresses into coordinates and attaches demographic and administrative district information for that location. The couple started it as a side project in 2014 and grew the company on customer revenue without outside investment. It is a case of supplying a feature that other software needs repeatedly and building a business a small team can run for the long term.

## How a Problem They Faced Started the Business

The two met as colleagues at a web development agency and learned each other's ways of working. Michele was a project manager and Mathias was a developer. After each moved to different companies they still built products together, and after their daughter was born they needed extra income to help with rising childcare costs. Planning products and organizing customer requests on one side, and the ability to actually implement software on the other, were both in place within the couple's collaboration.

The direct starting point for Geocodio was an app that told people which nearby convenience stores and grocery stores were currently open. Store addresses had to be converted into coordinates, but going past the free limit of the service they were then using would have meant considering a contract of more than $10,000 a year. There were also constraints on storing the calculated coordinates in a database. The couple built their own geocoder that they could keep using at a cost they could afford.

Geocodio, released in January 2014, reached the front page of Hacker News and drew developers' attention. First-month revenue was $31, enough to cover the cost of a small server. What mattered to the couple was confirmation that people with the same inconvenience they had would actually pay.

Even after launch the two kept juggling day jobs and the business for several years. By 2018 they were both working on Geocodio full time, and the cumulative revenue since founding that they disclosed that year passed $1 million. This figure is total revenue accumulated since starting the business and is distinct from annual revenue or net profit.

## Providing the Information Customers Needed After the Address

Geocodio grew by focusing on demand for linking U.S. and Canadian addresses with analytical data. Among people who needed coordinates, beyond developers wanting to display maps, there were analysts and researchers who needed census tracts, congressional districts, or time zones. The product's scope widened so that converting an address into coordinates and then separately finding and combining related information could be handled in one place.

The case of the real estate data service SimplyRETS shows what customers paid for. The company reviewed public geographic data, its own in-house tools, and other commercial services, but ran into the burden of development and maintenance and limits on data storage. Using Geocodio let it clean up addresses coming from multiple sources, attach coordinates and related information, and keep the results in its own database. The value confirmed in this customer case is that it reduces the burden of running an address processing system yourself.

It launched first as an API for developers, but requests also came in from non-developers who wanted to process files containing addresses. The couple added a feature to upload a CSV file and download the processed results, offering the same underlying technology to a wider customer base. From early on Michele sorted feature requests into email folders to watch for repeated needs, and when she built file upload or reverse geocoding she guided the customers who had requested it to try it first. It was a simple way of operating in which customer inquiries led to product development and early validation of use.

What Michele emphasized in customer research was hearing about actual experience and behavior. Beyond what feature someone wanted, she tried to understand how they currently handled the problem and where they spent time and money. Connecting the behavior seen in usage records with the reasons gained in interviews made it possible to define more concretely which features to build and what value to explain.

She did not limit research subjects to customers who had complained or churned either. She also asked long-time satisfied customers and customers who had recently switched from another product about their reasons for choosing it and how they used it. Michele organized these customer interview methods into the 2021 book "Deploy Empathy," explaining questions and the way to conduct interviews so that founders with little interview experience could use them.

## Charging Small Users and Heavy Users Differently

Geocodio's pricing structure still carries the founding concern of letting small projects start without strain. As of September 2026, the pay-as-you-go plan for the United States, Canada, and Mexico provides the first 2,500 credits each day for free and charges $1 per 1,000 credits beyond that. A basic address lookup and each additional data field are each counted as usage. For example, requesting coordinates and time zone information together for 1,000 addresses is calculated as 2,000 lookups in total.

For heavy-volume customers the company offers Unlimited, a flat-rate plan that provides a dedicated instance. At the same time the North America price starts at $1,350 a month, and geocoding throughput can be used within the performance range of the dedicated hardware. It is a structure that reduces for customers the problem of bills swinging widely as throughput rises, and gives the company regular recurring revenue. It is not, however, a product in which even the separate distance calculation API is entirely included without limit.

In a 2020 interview the couple explained that customer inflow is search-driven and that they do not use direct cold calls or sales emails. A developer inside a company discovered the product through search and started using it for free or at a low cost. When it later grew into an organization-level annual contract, the person who had already experienced the product played a role in supporting internal adoption.

There were also trials and errors with enterprise products. They built a separate service to meet HIPAA, the requirement for handling medical information, but right after launch there were almost no customers, so the dedicated infrastructure cost became a burden. The couple stopped offering it on a pay-as-you-go basis and maintained it mainly as a dedicated plan that incurs cost only once customers exist. For real demand to turn into revenue, they had to wait for a company's legal review and purchasing process, and some contracts took more than a year from the first conversation to signing.

## The Cost of Keeping the Company Running

There was a clear reason the couple chose to operate as a two-person company for a long time. They liked the autonomy of deciding through conversation between the two of them without coordinating schedules with many teams or going through many meetings. They did not treat adding employees as a necessary condition for success, and they wanted a business that let them work steadily and support a family.

But while operating with just the two of them, they had to be ready for customer inquiries and server failures even on vacation. Mathias recalled connecting to the server by phone while waiting in line for a ride at an amusement park, and the couple explained that for about eight years they had no vacation fully away from work. After hiring their first employee around 2022, the team was four people as of a 2024 interview. In September 2026 the official about page lists ten people including the cofounders, so "two-person couple business" refers to the early and long-lasting form of operations.

They valued a configuration that could be maintained for a long time in technical operations as well. The development principles Mathias published in 2025 included using familiar and proven technology, readable code, tests that confirm actual features, and small and frequent deployments. Servers had to be replaceable quickly when needed, and the principles also set out keeping redundant configurations so that one component failing would not stop the entire service. The policy was to control costs without sacrificing the performance and response time customers feel.

This operating philosophy also shows in the compatibility policy offered to customers. Geocodio still supports the API version it first released and explains that changes that would break existing integrations are separated into new versions. The promise that customers can keep using programs they have already built is important product value in a business that supplies an underlying feature.

In actual operations, there was also a situation that required responding to a security incident. On September 17, 2026 the company disclosed unauthorized access to a cache server on its platform for general customers, and it stated that after an interrupted deployment the firewall remained disabled and the monitoring system did not detect this immediately. According to the company's explanation, some API keys may have been exposed, but no evidence of data exfiltration or misuse was confirmed, and the separately isolated enterprise infrastructure was not affected. The company carried out blocking access, notifying customers, and strengthening security checks.

## Why a Small Underlying Feature Became a Long-Lasting Business

According to a twelfth-anniversary retrospective published in February 2026, Geocodio has been used by more than 100,000 users in total and address processing has exceeded 166 billion records. In a MicroConf speaker introduction Geocodio is also described as a SaaS with annual recurring revenue in the millions of dollars. A side project that covered the first month's server cost grew into a business that sits inside the data processing of many organizations.

The share of long-term customers also shows the nature of the business. In the same twelfth-anniversary retrospective the company stated that more than 80% of its Unlimited subscribers at the time had kept the customer relationship for more than three years and more than half for more than five years. It means the current subscriber base includes many long-term customers, and it shows the shape of an underlying service used for a long time after adoption.

What stands out about Geocodio is that it focused on the repetitive task of address processing, and by combining that data and offering plans matched to different usage levels, it increased the reasons customers had to pay. Customers reduced the burden of building and running a system themselves, and the company was paid for continuously taking on that work. The couple kept the autonomy of running small while reinforcing staff when needed, and they included maintenance and support after development as the core of the business.
