---
{
  "title": "Building a Business Out of the Operations Behind a Screenshot API: ScreenshotOne",
  "summary": "How Dmytro Krasun refined the monitoring, caching, server operations, and customer support behind ScreenshotOne into an API business that customers keep coming back to."
}
---

## An Alert Customers Never Saw

On July 17, 2025, an odd alert reached Dmytro Krasun, who ran ScreenshotOne. It was a notification that a check which loads a web page in a real browser and captures the screen had timed out. The other monitors showed no problems, and customer requests were being handled as usual. Krasun lost sleep for several days tracking down a problem no customer could see.

He checked request volume and server load, rolled back recently changed code, and even tested the network connection. Narrowing down the cause showed that an external website used as the check target had unstable connectivity. When he switched the capture target to his own product page, it worked normally. That incident confirmed the need for a check environment he controlled directly, and he improved his diagnostic tools.

## The Processing Behind a Single Screenshot

ScreenshotOne, which Krasun launched in May 2022, was an API that returned results such as screenshots or PDFs when another program sent it a web address or HTML. Before founding the company, he had spent more than ten years developing systems that handled servers and large volumes of requests. He chose a screenshot market where people already paid to use the service, and took on the problems that arise from running browsers and generating images. Customers could request the images their own products needed and hand the work happening behind them to ScreenshotOne.

The tools for building screenshot features yourself were already available. Driving a browser automatically with Puppeteer or Playwright could open a web page and save an image. Capturing a full page on top of that meant loading images that appear only after scrolling, and handling cookie consent dialogs that cover the content. Once viewport size and storage location also had to match customer requirements, the short code from the beginning grew into a service that handled many conditions.

ScreenshotOne built up the experience of handling these conditions inside the product. According to its official product description, the rules and detection methods it uses to clean up cookie banners number more than 50,000. Customers can hide ads or chat windows and adjust a page's styles and behavior when needed. Instead of each development team solving similar problems separately, they shared the handling methods one specialist service had built up.

The case of BugSmash, a feedback tool for collaboration, shows where development teams end up paying. When a user entered the address of a website to review, BugSmash had to generate preview images for its dashboard and share links. Since users see those images immediately, it mattered that they not be hidden by popups or generated late. BugSmash used ScreenshotOne for this work. For a separate website assessment feature, it was using Puppeteer, and in a case study published in April 2025 it described managing servers and handling several captures at once as a burden.

When BugSmash recorded the screen at the moment a user left feedback, it used another approach. Because it had to capture the position of moving elements or open popups, it captured inside the user's browser or used an extension. Even within the same product, generating preview images and recording a user's current screen had different requirements. The area ScreenshotOne covered was opening web pages repeatedly on a server and reliably producing images for a product to use.

The integration process was also set up to save developers time. The getting-started guide shows an example request with a web address and an access key, and provides integration code for each programming language. Customers can change options on the playground screen in the dashboard and check the results. When an error occurs, the API returns an error code the program can distinguish along with a human-readable description, which makes it easier for the customer's development team to handle the cause of the failure.

## Infrastructure That Aligns Usage and Costs

The pricing was designed so customers can start with small usage and scale up according to actual need. As of September 2026, it provides 100 free captures per month; the basic plan at $17 per month includes 2,000, and the growth plan at $79 per month includes 10,000. Beyond the included usage, customers pay extra at the rate for their plan. The basic plan also includes features such as full-page capture, blocking ads and cookie banners, and PDF generation, so customers can decide their spending around the throughput they need.

The billing rules reflect failures and reuse as well. Requests that fail because of a network or browser error are not deducted from usage, and cached responses that return a stored result as-is are not counted as new captures. In this structure, work that lowers the failure rate and reuses images already generated affects customer satisfaction and the operator's costs at the same time. Krasun had to learn this relationship while running the service.

In the beginning, requests were forwarded through Cloudflare, and screenshots that had already been generated were stored in a cache and reused. But when a stored image disappeared from the cache, the browser had to run again to handle the same request. Cache requests that were free to customers at the time were incurring real image generation costs, and Krasun said he was losing money because of it. He added the file storage service R2 as a second storage layer so that an image could be found in storage and returned even when the nearest cache did not have it.

After that, the role of Cloudflare Workers, which handle requests at the front, also widened. They checked invalid requests and invalid access keys first, and verified whether a caller had exceeded the allowed request volume, so unnecessary work never reached the browser servers. If the main server was overloaded or failed to generate an image, requests went to another data center. While a customer sent a single web address, work was happening inside the service to decide where to handle the request and which result to reuse.

## An API That Became Part of Customers' Work

On this foundation, dealings with the same customer could continue for years. RepliQ, which builds personalized sales videos, said in a case study published in July 2026 that it had used ScreenshotOne for about four years. The purpose was turning a prospect's website or profile into images and animated GIFs for video backgrounds. RepliQ said it could cut down the work of managing its own capture system and focus on video personalization, and that it maintained the integration while its own service grew.

Krasun also published how to build a screenshot API yourself. His development guide covers request validation, cookie banner handling, full-page capture, and storage upload and deployment. Readers see both the scope they can implement themselves and the work they would have to manage on top. Documentation like this explains the technology to potential customers and gives them the material to judge whether to run it themselves or hand it to a specialist service.

Consistently publishing the development process affected product adoption as well. Orlando Kalossakas, co-founder of the AI task automation service Toolhouse, had watched Krasun's activity on X and Indie Hackers from the early days. He said ScreenshotOne was the first thing that came to mind when he needed web page capture, and that he felt almost no need to compare other services. It was a case of someone who had no reason to buy right away watching the product change and choosing it when it became necessary for his work.

In Toolhouse's integration, the documentation and playground played a role again. Kalossakas gave ScreenshotOne's documentation to an AI tool to organize the implementation steps and tested options in the dashboard. After the integration, Toolhouse users could connect their own ScreenshotOne access key and have AI workers capture and analyze web pages. An existing screen generation feature had expanded into a way to supply visual material to an AI service.

## Deciding What One Person Can Run Alone

Even when people offered to pay, Krasun weighed requests against the product's scope. He tested a feature for comparing screenshots over time several times, but concluded that it was hard to reduce the errors that read meaningless differences as changes, and that it was closer to a separate product. He also did not add a feature that crawls through and archives an entire website, on the grounds that customer needs and operating methods would differ. He said he chose to focus on making the existing features work properly.

Understanding customers took longer than he expected. In a 2026 interview, Krasun said it took him two years to figure out whom he was selling the product to, and that this understanding affected his marketing copy, content, development items, and pricing. Afterward, he examined how visitors signed up and how signups became paying customers, broken down by acquisition channel. He said that distinguishing a shortage of visitors from visitors who do not sign up, and fixing the stage where the problem appeared first, helped revenue grow.

To keep operating, Krasun also had to reduce his own routine involvement. He shared that in March 2024 he set up a card dedicated to business expenses and configured payouts to be deposited automatically into that card's payment account. He built an environment that scales servers with request volume and prepared a standby runtime on another cloud. The work automated recurring needs such as paying costs and adding servers so the service would keep running when he stepped away for a while.

He also used outside help for specialized work. In his current official description, Krasun explains that he develops and operates the product himself and collaborates with experts on specific projects. It is a founder-centered way of operating: he owns the product direction and customer relationships and adds other people's capabilities to the work that needs them.

At the time of a March 2026 interview, ScreenshotOne had more than 800 paying customers and monthly recurring revenue (MRR) of more than $25,000. The figures published later for its fourth anniversary were more than 1,000 paying customers and $33,000 in monthly recurring revenue. Cumulative API calls had also passed 100 million. As the feature that turns web pages into images became part of daily work in many products, repeat use by customers sustained the subscription business.

In his fourth-anniversary retrospective, Krasun listed rarely missing his children's important events as one of his achievements. In an interview that year, he also stated a goal of automating operations enough to go hiking for a week without connecting to the internet. In a business that gave other development teams back the time they spent on capture systems, securing more of his own time was now the next task.
