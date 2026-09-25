---
{
  "title": "Building a Service for Job Seekers While Holding a Full-Time Job: Erik Chavez and Jobric",
  "summary": "How Jobric, built while Erik Chavez worked at Microsoft, grew from a recommendation service that saves job seekers time into a paid business with paying customers."
}
---

## Starting a Job Service Without Leaving the Day Job

In June 2026, Erik Chavez was working as a senior solution architect at Microsoft while running Jobric, a service for job seekers. He spent his own time and money on development, and days of juggling his job and his business often ran from 5 a.m. to 10 p.m. Without leaving his employer first, he built a business that helps working people change jobs.

The starting point was someone close to him who was worn out by work. That person wanted out of their current job but lacked the time and energy to look for a new one, and existing tools did not help enough. Chavez began building a tool to find opportunities suited to that person. The problem Jobric set out to solve was that looking into a better job is itself an added burden.

Users upload a resume and set their preferences. Jobric reviews postings across multiple job platforms, recommends roles that match experience, skills, and stated preferences, and explains how well they fit. Users decide whether to apply after seeing which requirements they meet and which they lack. It does not offer a feature that submits applications in bulk automatically.

## Handling Recommendation Accuracy and Operating Costs

When he tested it with his own resume, Chavez was recommended jobs with titles he would not normally search for. Wanting to apply himself gave him a reason to show the tool to others.

A problem surfaced when he tried a friend's resume. The system read the title "Security Officer" of a friend working in cybersecurity as a security guard. Chavez spent early time and money on researching data and validating with a range of resumes to separate job titles from actual work.

His experience of more than 15 years in cloud and platform work went into lowering operating costs. For large volumes of classification work he used small language models he ran himself, and assigned high-performance models to complex reasoning. The fixed cost of running his small models, as he disclosed, was around $20 a month.

Posting recommendations and fit analysis were split into separate services that run on demand. They are connected through a job queue and stop running once processing finishes. The design cuts the cost of keeping unused computing resources alive.

For judgments beyond technology, he brought in part-time advisors in security, legal, and finance. Hanim Dogan, a board member and advisor, also supported the business. While building the product himself, he set up relationships that let him borrow experience from other fields.

## From Free Trial to Paid Subscription

The first test users were recruited publicly on LinkedIn. After a free beta from March to April 2026, the paid service launched on May 1. Before taking payments, he verified that recommendations worked properly across many resumes.

In an interview published on June 26, Chavez reported monthly recurring revenue of $3,300. The revenue came from job seekers who had subscribed with their own money after the public beta.

As of September 2026, the plans consist of a free Seeker tier, Candidate at $29 a month, and Contender at $49 a month. Paid plans unlock all recommendation results, and the main difference is weekly versus daily refreshes. The standard for recommendation quality is the same across all plans. The structure leads people who need to check for new opportunities more often to choose a higher tier.

New sign-ups get a 7-day free trial of the top tier. The trial starts counting when the first recommendation results arrive, and no credit card is required. Waiting time after sign-up does not consume the trial, so people can see actual results before deciding whether to pay.

The choice to serve job seekers is also reflected in the principles for handling personal data. Jobric uses resumes and profiles for job recommendations, and states that it does not sell personal data or hand it to third parties for marketing. To keep collecting subscription fees under this structure, it has to provide recommendations useful to users and maintain their trust.

## Explaining the Data and Widening Recommendations

The information the product works with also fed the posts he put on LinkedIn. Topics included how often job postings disclose salaries and what skills can carry over when moving to a different occupation. It is a way of explaining market information job seekers need while showing what Jobric analyzes. From a marketing standpoint, the data the service uses also became material for content that reaches potential customers.

Recommendation quality also covered the reliability of the postings themselves. By looking at patterns of postings that stay up a long time or get reposted, he alerted users to the risk of spending time on postings with unclear hiring intent. Jobric does not promise to determine whether a posting is genuine, and explains that it provides signals for deciding whether to apply.

Referral partnerships were added to the customer acquisition paths. The Advocates program running as of September 2026 pays referrers 25% of what referred customers actually pay, from the first payment for 12 months. It targets people who have contact with job seekers, such as career coaches, newsletter writers, and community operators. Because a fee arises when a customer pays, customer acquisition cost can be tied to revenue.

## Value That Remains After the Job Search Ends

A subscription business still faces the problem that landing a job leads to churn. Chavez also wrestled with what value to offer in the period until the next job search. Jobric proposes a service that keeps watching the market even for people who are employed. Even without plans to move right away, they can be notified when an opportunity matching their conditions appears. It is an attempt to serve not only people in urgent need of a job but also those who want to explore options while staying employed.

He also prepared career counseling delivered by people. As of September 2026, Jobric was recruiting the initial coaches for Career Guides, and booking a session as a user had not yet started. The idea is for job seekers to pick a coach suited to their situation and consult that person, extending from job posting recommendations toward a service that helps with individual career decisions.

Chavez and the person he first wanted to help had something in common: too little time outside their day jobs. Chavez built a product in that limited time, and offered customers a way to cut the time they spend job hunting. In using his expertise to reduce a burden others face repeatedly, he found the possibility of a business to run while holding down a job.
