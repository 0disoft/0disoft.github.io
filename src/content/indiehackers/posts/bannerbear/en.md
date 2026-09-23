---
{
  "title": "From many launches to focusing on image automation",
  "summary": "How Bannerbear grew from a monthly product-launch experiment into an independent business automating image and video production for companies."
}
---

In September 2018, Jon Yongfook announced a plan to ship 12 products in 12 months. After two and a half years at a company, he wanted to recover the sense of building and releasing products himself. He had piled up projects stopped halfway, and tried to break the habit with a deadline to release something by the end of each month. The approach was to spend one month per product and test the market response.

He released in succession Zipsell, a platform for selling digital files, Promomatic, a tool for making App Store promotional images, and Tropic, which showed the time zones of remote workers, among others. The number of launched products grew to seven, but none produced direct revenue. He had savings meant to last about two years, but after spending almost one year he started focusing on how to earn money. From experience across several areas, what especially remained in his hands was image-generation technology.

Past work experience also connected to image automation. At the e-commerce company where Yongfook had worked, people made promotional images by hand every time a new product was listed, and he wanted to automate that repetitive work. Previewmojo, which he focused on in the second half of 2019, generated the preview images shown when a webpage link is shared. It started as a small service making fixed-size images from set templates.

The initial price was $9 per month. He gained his first paying customer a few days after launch, but that customer soon cancelled, and Yongfook reconsidered pricing and customer segment. In November 2019 he raised the lowest plan to $49 per month, focusing development on features companies would need enough to pay $50-100 each month. Existing customers kept their previous prices.

In early 2020 he renamed it Bannerbear and refreshed the marketing site. The program's functionality stayed largely the same, and revenue growth was slight compared with the attention the new name drew. Yongfook started widening the product's uses beyond the limited purpose of share images.

User requests gathered in two directions. One was to add more templates so they could make the designs they wanted, and the other was to connect to other services such as social-media scheduling tools. At the time Yongfook alone had to add templates, and building integrations for each outside service would keep growing without end. He designed a structure where users create templates themselves and call them from other programs.

In March 2020, Bannerbear released a new editor and API. Users arrange text and photos on screen to make a base design, then send what to change through the program to generate images. For example, once the spots for a product photo, product name, and price are fixed, changing only the product data produces countless banners. The editor also included sample code and a run feature to test a template immediately.

This structure widened who it could sell to. E-commerce agencies could make per-product banners in bulk, and marketing teams could generate email images with different content per recipient. Online service operators could automatically provide different images per user inside their own products. Uses Yongfook had not expected also had room to emerge as customers connected the API.

There were businesses closed during the transition. The Shopify app did not meet expectations so he withdrew it, and the shift toward an API-centered direction led some early customers to leave. He kept access to existing features, but later development focused on the API.

Once the product direction was set, Yongfook split his working time half between development and marketing. For one week he built features, and the next week he published posts about how to use those features and what he had learned while building them. At the end of the two weeks he summarized the changes in a newsletter. The schedule linked what he built to the next week's promotional material.

In June 2020 paid customers reached about 40. By then he had launched major features on Product Hunt three times, stayed active in a founder community, and contacted early users directly for feedback. Newsletter subscribers grew to 1,500, and dozens of posts explaining how to use the product had piled up. A refer-a-friend credit scheme did not work, and an affiliate program produced small results.

At the end of 2020 he reorganized the product messaging around customers' purposes. One group of customers automated repetitive work with Zapier, while the other processed large volumes of images by connecting the API directly. Yongfook described these two purposes as 'marketing automation' and 'scaling', and applied the same distinction to the tagline, plans, and docs.

The importance of docs also became clear while dealing with customers. Yongfook had expected users to naturally understand how to use it from the features and screens, but in practice they needed enough explanations and examples. He recalled that the more time he put into docs and tutorials, the more paid conversions grew. He focused on providing information so people could see how to handle their own tasks even before signing up.

In 2021 he doubled monthly recurring revenue in about six months. Workload grew together, making it hard to handle both development and content production alone. In May that year he hired a freelance writer to help write tutorials. At the time Yongfook still wrote all the program code himself.

Feature priorities gradually followed customer requests. He kept his own ideas on the development list, but when customers mentioned the same need he moved the actual work order forward. After confirming that low-tier customers churned quickly while mid- and high-tier customers stayed long, he paid more attention to winning larger customers. Improving the work of customers already paying became the center of product development.

Sharing the business's progress publicly also gathered visitors. A growth retrospective written in January 2021 reached the front page of Hacker News, and follow-up retrospectives he later published were also widely shared. On his revenue disclosure page he added a meter showing how much was left until he could buy the motorcycle he wanted. With revenue numbers tied to a personal goal, people gained a reason to keep watching his business.

The development experience itself became material that met customers through search. When he wrote up the Puppeteer and FFmpeg problems he had hit while building Bannerbear, developers trying to solve the same problems came to him. On the product site he offered demos to try image generation or auto-cropping without signing up. At the end of 2021 he brought in a dedicated content writer to increase how-to content production.

Free tools were another way to show the product's features outside. With the PDF-generation feature he made a free certificate maker, and also offered a tool converting Twitter posts into Instagram-ready images. These tools produced steady visits and links from outside sites. Yongfook judged free tools' results not only by paid conversion but including the effect of increasing search traffic and chances for the product to be discovered.

Technically he used the familiar Ruby on Rails to build features quickly. But the template editor at the product's core became hard to keep improving on its initial external-library-based structure. Yongfook spent two to three months patching workaround code before moving to his own implementation, and the migration also took months. He later recalled that adding new features to the editor became much easier afterward.

He funded the business with savings and customer subscriptions. Early on he talked with investors and considered raising funds, but within months revenue reached a level sustaining his living, and the idea of growing it independently solidified. He preferred the pace of reinvesting income arriving with each new customer into the team, product, and marketing. Keeping full equity and running the company his own way was also an important criterion.

In August 2022 he had grown to a seven-person full-time remote team serving more than 500 customers. In hiring, handing over roles that already had too much work proved effective. Roles with clear tasks such as customer support were easy to hand over, but hiring for work he wanted to try next needed more direction and management time. Yongfook leaned toward hiring based on work he was actually handling himself.

In 2023 he almost misread signup data and set the wrong growth task. When the paid conversion rate fell to 1%, he suspected the post-signup onboarding, but checking the most recent 200 signups revealed many inactive suspicious accounts. After applying CAPTCHA to the signup step, the measured conversion rate rose to about 7-8%, with little change in the number of new paying customers. He concluded he had to focus on bringing in more visitors with real purchase intent.

In November 2024, Yongfook disclosed monthly recurring revenue at about S$81,800. The next month he explained that additional payments from existing customers had contributed greatly to business growth. Alongside activities bringing in new customers, revenue was also accumulating as customers already using the product spent more.

The automation scope kept widening. The V5 announcement published in September 2026 described connecting image generation, animation, and video-editing work into one workflow. While keeping customer-defined designs, it changes data and output formats, and connects so tasks can also run from AI agents. Starting from share images, Bannerbear had grown into a service handling the production of visual materials companies repeatedly publish across media.
