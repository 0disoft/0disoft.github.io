---
{
  "title": "From Question Generation to Memes: How Ramsri Golla Turned AI Output into Products",
  "summary": "How Ramsri Goutham Golla developed Questgen's question generation and Supermeme's meme creation into a web app and an API."
}
---

## Moving Research into a Usable Product

Ramsri Goutham Golla studied electrical engineering and signal processing in the United States and worked in Silicon Valley, learning deep learning through online courses. After returning to India in 2018, he freelanced while developing products, looking for a chance to turn his skills into a business. In his first attempt, a text-based image generation service, he learned how hard it was to handle both solving a research problem and finding customers alone. After that he focused on work he could implement with the resources he had and whose use was concrete.

In 2019, while planning a business in Singapore with a founder in the education technology field, he noticed that education companies outsourced the production of exam questions. The two founded Aurora, which generates questions with AI, and received investment from the early-stage investor Entrepreneur First. Conflict between the co-founders, however, led them to wind down the company and return the remaining investment. Ramsri kept researching question generation afterward.

One channel for publishing the research results was an open-source library called Questgen. Developers could run example code to generate multiple-choice or yes-or-no questions from a passage, and rewrite existing questions in different wording. The repository also linked to a course explaining installation, example runs, and how to build and deploy the model. It was material that reduced the burden on other developers of researching question generation from scratch.

The first web app for general users was a simple layout with an input box beside an output box. Ramsri learned the no-code tool Bubble to build the screens, adding the needed features one by one, starting with payments. The work moved the published research code into a service that teachers and educational content creators could use directly.

In a June 2022 interview, the monthly recurring revenue he reported for Questgen was $500. Later, when he introduced the product on Reddit, one user proposed an advertising model, saying $20 a month was too much for teachers. Ramsri replied that monthly recurring revenue was $1,200 at the time and that he would keep the paid model. He chose the next step based on demand confirmed by actual payments.

## Connecting the Work After Question Generation

Questgen's flow follows the order of work of the person creating the questions. A user enters a passage or document and picks a question type; the service generates the questions, and the user edits the results and exports them. Teachers can make practice problems from class material, publishers can write assessment questions to attach to textbooks, and corporate HR staff can prepare tests that check understanding of internal rules. The product was aimed at people who already had the material to draw questions from.

The ability to move finished questions into existing education tools also mattered. Questgen offers a range of export formats beyond PDF, including Moodle XML, QTI, and CSV tailored to several education services. If education staff had to re-enter the generated results into a learning management system, the automation would lose much of its value. The export feature reduced the repetitive work that follows question generation.

Technical articles he had published earlier helped bring in customers. Ramsri linked Questgen from the articles he had written about question generation, and search traffic turned into product visits. The launch did not draw much attention, but the product grew gradually through the existing content and search.

He later learned more web development and rebuilt the service with Next.js. In an August 2024 retrospective, he reported Questgen's monthly recurring revenue at $3,000 to $4,000 and its profit margin at about 70 percent. He said the service had by then reached a stage where it could run without much time spent on maintenance.

## Three Founders Solve the Friction of Making Memes

While running Questgen, Ramsri became interested in another kind of content creation. Sanjeev NC, who worked in product and marketing, was building a database that searched memes by emotion, and Ramsri was experimenting with an AI meme generator. The two came across each other's work on LinkedIn and discussed collaborating. Developer Nico Botha, whom Ramsri had met on Twitter, joined them, and the Supermeme team was formed.

Roles were split according to the three people's experience. Ramsri took AI development, Nico took web service development, and Sanjeev took meme-making experience plus product and marketing work. They started development in January 2022, launched the product in February, and got their first customer. Early on they collaborated through a WhatsApp group and regular video calls, without meeting in person.

Making a meme involved much that image editing alone could not solve. You had to find an image that fit the situation you wanted to convey, understand the context in which that image is used, and connect the situation and the humor with a short line. Even a familiar image was hard to search for if you did not know its name, and after finishing the line you had to adjust the position and size of the text. The Supermeme team moved this process into product features one step at a time.

Supermeme finds a suitable meme template when a user describes a situation in a sentence, and writes a line that fits that format. According to the product description published now, it analyzes the meaning of the whole input, compares it with the template information, and picks an appropriate candidate. Users do not need to know the meme's name or format first, and they can edit the generated line and layout. Reflecting the context carried by templates in the search and generation process is an important component of the product.

## Turning Interest into Paying Customers

At first it was largely an experiment in making memes with AI, but the team gradually settled on marketing work as the main use. A direction published in January 2023 included a plan to reduce the effort marketing staff spend searching, writing lines, and resizing. The target customers were people who wanted to use humor in social media posts, presentations, and blogs. The product's use became more concrete, moving from a one-time experience of making something funny to a tool used in repeated content production.

The founders' existing audiences helped the early distribution. The three had roughly 100,000 social media followers combined, and the overlap between them was not large. As they introduced the product on their own channels, Supermeme could reach different groups of users. Sanjeev later recalled that this audience was an important asset that accelerated the early spread.

Supermeme, launched in February 2022, reached 100,000 cumulative signups in February 2023. As interest in generative AI grew, it was included in lists of AI tools that various content creators introduced, and people who saw those lists searched for the product and came to it. When the team began appearing for search terms like "AI meme generator," it put more effort into search optimization and content publishing. It was a way to turn interest generated on social media into search traffic.

In the first quarter of 2023, it recorded 150,000 cumulative signups and 10 million memes generated. But while usage grew quickly, the model usage charges increased along with it. A post published in early April of the same year also reported reaching 100 paying customers. The records from this period show the reality that running a product many people try out requires watching both the growth of paying customers and generation costs.

Sanjeev later said in an interview that Supermeme's monthly recurring revenue was about $5,000 and that paying customers had passed 250. Even then, the three co-founders ran the product alongside other work and had no separate employees. The structure let customers try the product themselves and pay, without needing a demo or sales call for each purchase. It was a case of increasing revenue while staying within the scope a small team could operate.

## Selling the Web App's Feature as an API Too

Supermeme also offers its meme generation feature as an API so other developers can call it from their own products. When a developer sends a situation or topic, the service picks a template, writes a line, and returns the result. Connecting this feature to an internal chat bot, for example, lets users generate memes during a conversation without going to a separate website. Developers can focus on the connection instead of implementing template search and line generation themselves.

The results the API returns also differ by how they are used. You can get a finished image to display right away, get the line and template separately to put into your own editing screen, or use only the template search feature. This design lets the customer's developers choose how far they control the process themselves. Features used in Supermeme's web app are also used as components of other products.

The pricing plans consider personal creation, team use, and integration with outside services together. As of September 2026, paid plans include watermark removal, brand settings, and API access, and higher plans allow more brands and higher API request limits. By separating the generation credits of the regular web app from the API request limit, the scope of use is set separately for people using it on screen and for programs calling it repeatedly. The structure can charge not only customers who make more memes but also those who produce content for several brands or attach the feature to their own tools.

Looking at the two products together reveals how Ramsri turns technology into a product. With Questgen he connected the whole path of editing generated questions and moving them into education tools, and with Supermeme he provided the ability to find an image that fits a situation and write a line as both a web app and an API. The common thread is that he connected the work a user starts through to a result they can actually use. His research and model skills became a service that saves customers time and development cost when he implements the steps in between as a product.
